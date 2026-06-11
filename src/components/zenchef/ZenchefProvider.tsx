"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isZenchefConfigured } from "@/lib/zenchef/config";
import type { ReservationRecordInput } from "@/lib/reservations/types";

type ZenchefStatus = "idle" | "ready";

interface ZenchefContextValue {
  status: ZenchefStatus;
  isReady: boolean;
  isConfigured: boolean;
}

export const ZenchefContext = createContext<ZenchefContextValue | null>(null);

async function syncReservationToSheet(detail: ReservationRecordInput) {
  try {
    await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detail),
    });
  } catch (error) {
    console.error("[Zenchef] Failed to sync reservation to Google Sheets", error);
  }
}

function waitForZenchefWidget(timeoutMs = 30000) {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.ZenchefWidget) {
    return Promise.resolve(true);
  }

  return new Promise<boolean>((resolve) => {
    const startedAt = Date.now();

    const checkReady = () => {
      if (window.ZenchefWidget) {
        resolve(true);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        resolve(false);
        return;
      }

      window.setTimeout(checkReady, 200);
    };

    checkReady();
  });
}

export default function ZenchefProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ZenchefStatus>("idle");
  const configured = isZenchefConfigured();

  const markReady = useCallback(() => {
    setStatus("ready");
  }, []);

  useEffect(() => {
    if (!configured) return;

    let cancelled = false;

    waitForZenchefWidget().then((ready) => {
      if (!cancelled && ready) {
        markReady();
      }
    });

    const handleWidgetOpened = () => markReady();
    window.addEventListener("zc-widget-opened", handleWidgetOpened);

    return () => {
      cancelled = true;
      window.removeEventListener("zc-widget-opened", handleWidgetOpened);
    };
  }, [configured, markReady]);

  useEffect(() => {
    if (!configured) return;

    const handleBookingCompleted = (event: Event) => {
      const customEvent = event as CustomEvent<ReservationRecordInput>;
      syncReservationToSheet(customEvent.detail ?? {});
    };

    window.addEventListener("zc-widget-booking-completed", handleBookingCompleted);

    return () => {
      window.removeEventListener(
        "zc-widget-booking-completed",
        handleBookingCompleted
      );
    };
  }, [configured]);

  const value = useMemo(
    () => ({
      status,
      isReady: status === "ready",
      isConfigured: configured,
    }),
    [status, configured]
  );

  return (
    <ZenchefContext.Provider value={value}>{children}</ZenchefContext.Provider>
  );
}
