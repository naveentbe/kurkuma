"use client";

import { useCallback, useContext } from "react";
import { ZenchefContext } from "@/components/zenchef/ZenchefProvider";

interface ZenchefOpenParams {
  offerId?: string;
  day?: string;
  pax?: number;
  roomId?: string;
}

export function useZenchef() {
  const context = useContext(ZenchefContext);

  if (!context) {
    throw new Error("useZenchef must be used within a ZenchefProvider");
  }

  const open = useCallback(() => {
    if (window.ZenchefWidget?.open) {
      window.ZenchefWidget.open();
      return;
    }

    window.location.hash = "zc-action-open";
  }, []);

  const close = useCallback(() => {
    if (window.ZenchefWidget?.close) {
      window.ZenchefWidget.close();
      return;
    }

    window.location.hash = "zc-action-close";
  }, []);

  const openWith = useCallback(
    (params: ZenchefOpenParams) => {
      if (window.ZenchefWidget?.openWith) {
        window.ZenchefWidget.openWith(params);
        return;
      }

      open();
    },
    [open]
  );

  return {
    ...context,
    open,
    close,
    openWith,
  };
}
