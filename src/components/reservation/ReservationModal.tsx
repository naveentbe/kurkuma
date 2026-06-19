"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Armchair,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  DINNER_SLOTS,
  LUNCH_SLOTS,
  SEATING_OPTIONS,
  formatDisplayDate,
  formatTimeSlot,
  getLabels,
  getPolicyText,
  getSeatingLabel,
  type ReservationLang,
} from "@/lib/reservation/content";
import {
  ReservationSubmitError,
  getClientSheetsWebAppUrl,
  submitReservationToSheet,
} from "@/lib/reservations/submitReservation";
import { SITE } from "@/lib/constants";

type AccordionSection = "guests" | "date" | "seating" | "time";
type ModalStep = "booking" | "contact" | "success" | "error";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toISODate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const titleId = useId();
  const [lang, setLang] = useState<ReservationLang>("fr");
  const [step, setStep] = useState<ModalStep>("booking");
  const [expanded, setExpanded] = useState<AccordionSection>("guests");
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [customDate, setCustomDate] = useState("");
  const [seating, setSeating] = useState("none");
  const [time, setTime] = useState<string | null>(null);
  const [showLargeGroupNotice, setShowLargeGroupNotice] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "loading">("idle");
  const [errorCode, setErrorCode] = useState<"generic" | "access_denied">("generic");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const labels = getLabels(lang);
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const isToday = toISODate(selectedDate) === toISODate(today);
  const isTomorrow = toISODate(selectedDate) === toISODate(tomorrow);

  const resetState = useCallback(() => {
    setStep("booking");
    setExpanded("guests");
    setGuests(2);
    setSelectedDate(new Date());
    setCustomDate("");
    setSeating("none");
    setTime(null);
    setShowLargeGroupNotice(false);
    setSubmitState("idle");
    setErrorCode("generic");
    setContact({ name: "", email: "", phone: "" });
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    window.setTimeout(resetState, 300);
  }, [onClose, resetState]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const toggleSection = (section: AccordionSection) => {
    setExpanded(section);
  };

  const handleGuestSelect = (value: number | "plus") => {
    if (value === "plus") {
      setShowLargeGroupNotice(true);
      setGuests(9);
      return;
    }
    setShowLargeGroupNotice(false);
    setGuests(value);
    setExpanded("date");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCustomDate("");
    setExpanded("seating");
  };

  const handleCustomDateChange = (value: string) => {
    setCustomDate(value);
    if (value) {
      setSelectedDate(new Date(`${value}T12:00:00`));
      setExpanded("seating");
    }
  };

  const handleSeatingSelect = (id: string) => {
    setSeating(id);
    setExpanded("time");
  };

  const handleTimeSelect = (slot: string) => {
    setTime(slot);
  };

  const canReserve = Boolean(time && !showLargeGroupNotice);

  const handleReserveClick = () => {
    if (!canReserve) return;
    setStep("contact");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitState("loading");
    setErrorCode("generic");

    try {
      await submitReservationToSheet({
        date: toISODate(selectedDate),
        pax: guests,
        slot: time ?? undefined,
        room: getSeatingLabel(seating, lang),
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: "",
        sourceUrl: window.location.href,
      });
      setStep("success");
    } catch (error) {
      if (
        error instanceof ReservationSubmitError &&
        error.code === "ACCESS_DENIED"
      ) {
        setErrorCode("access_denied");
      }
      setStep("error");
    } finally {
      setSubmitState("idle");
    }
  };

  const sheetsTestUrl = getClientSheetsWebAppUrl();

  const dateLabel = isToday
    ? labels.today
    : isTomorrow
      ? labels.tomorrow
      : formatDisplayDate(selectedDate, lang);

  const seatingLabel = getSeatingLabel(seating, lang);
  const timeLabel = time ? formatTimeSlot(time, lang) : labels.time;

  const renderTimeSlots = (slots: readonly string[], sectionLabel: string) => (
    <div className="mb-4 last:mb-0">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold">{sectionLabel}</span>
        <BookOpen size={16} className="opacity-70" />
      </div>
      <div className="space-y-2">
        {slots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => handleTimeSelect(slot)}
            className={`flex w-full items-center gap-3 rounded-md border-2 px-4 py-3 text-left text-sm font-semibold transition-colors ${
              time === slot
                ? "border-kurkuma-green bg-kurkuma-green/10"
                : "border-kurkuma-green/50 bg-kurkuma-yellow/20 hover:bg-kurkuma-yellow/40"
            }`}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
            {formatTimeSlot(slot, lang)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-stretch sm:justify-end">
          <motion.button
            type="button"
            aria-label="Close reservation"
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex h-[100dvh] w-full flex-col bg-kurkuma-yellow text-kurkuma-green sm:max-w-[420px] sm:shadow-2xl"
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.8 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-kurkuma-green/20 px-5 pb-4 pt-[calc(1rem+env(safe-area-inset-top))]">
              <div className="w-10" />
              <h2
                id={titleId}
                className="font-display text-lg font-bold uppercase tracking-[0.12em] text-kurkuma-green"
              >
                {SITE.name}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                  className="text-xs font-semibold uppercase tracking-wider text-kurkuma-green/80 hover:text-kurkuma-green"
                >
                  {lang === "fr" ? "EN" : "FR"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-kurkuma-green hover:bg-kurkuma-green/10"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
              {step === "booking" && (
                <>
                  <p className="py-4 text-sm leading-relaxed text-kurkuma-green/90">
                    {getPolicyText(lang)}
                  </p>

                  {/* Guests */}
                  <div className="border-t border-kurkuma-green/25">
                    <button
                      type="button"
                      onClick={() => toggleSection("guests")}
                      className="flex w-full items-center gap-3 py-4 text-left"
                    >
                      <UtensilsCrossed size={18} strokeWidth={2} className="shrink-0" />
                      <span className="flex-1 text-base font-bold">{labels.guests(guests)}</span>
                      {expanded === "guests" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expanded === "guests" && (
                      <div className="pb-5">
                        <div className="grid grid-cols-5 gap-2.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => handleGuestSelect(n)}
                              className={`flex h-11 items-center justify-center rounded-md border-2 text-sm font-semibold transition-colors ${
                                guests === n && !showLargeGroupNotice
                                  ? "border-kurkuma-green bg-kurkuma-green text-kurkuma-yellow"
                                  : "border-kurkuma-green/70 bg-kurkuma-yellow/30 hover:bg-kurkuma-yellow/50"
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleGuestSelect("plus")}
                            className={`flex h-11 items-center justify-center rounded-md border-2 text-lg font-semibold transition-colors ${
                              showLargeGroupNotice
                                ? "border-kurkuma-green bg-kurkuma-green text-kurkuma-yellow"
                                : "border-kurkuma-green/70 bg-kurkuma-yellow/30 hover:bg-kurkuma-yellow/50"
                            }`}
                          >
                            +
                          </button>
                        </div>
                        {showLargeGroupNotice && (
                          <p className="mt-3 text-xs leading-relaxed text-kurkuma-green/80">
                            {labels.largeGroup}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="border-t border-kurkuma-green/25">
                    <button
                      type="button"
                      onClick={() => toggleSection("date")}
                      className="flex w-full items-center gap-3 py-4 text-left"
                    >
                      <Calendar size={18} strokeWidth={2} className="shrink-0" />
                      <span className="flex-1 text-base font-bold">{dateLabel}</span>
                      {expanded === "date" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expanded === "date" && (
                      <div className="pb-5">
                        <span className="mb-3 inline-block rounded-full bg-kurkuma-green/15 px-3 py-1 text-xs font-medium">
                          {labels.nextAvailability}
                        </span>
                        <div className="grid grid-cols-3 gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleDateSelect(today)}
                            className={`flex flex-col items-center justify-center rounded-md border-2 px-2 py-3 text-center transition-colors ${
                              isToday && !customDate
                                ? "border-kurkuma-green bg-kurkuma-green text-kurkuma-yellow"
                                : "border-kurkuma-green/70 bg-kurkuma-yellow/30 hover:bg-kurkuma-yellow/50"
                            }`}
                          >
                            <span className="text-sm font-bold leading-tight">
                              {formatDisplayDate(today, lang)}
                            </span>
                            <span className="mt-0.5 text-xs opacity-80">{labels.today}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDateSelect(tomorrow)}
                            className={`flex flex-col items-center justify-center rounded-md border-2 px-2 py-3 text-center transition-colors ${
                              isTomorrow && !customDate
                                ? "border-kurkuma-green bg-kurkuma-green text-kurkuma-yellow"
                                : "border-kurkuma-green/70 bg-kurkuma-yellow/30 hover:bg-kurkuma-yellow/50"
                            }`}
                          >
                            <span className="text-sm font-bold leading-tight">
                              {formatDisplayDate(tomorrow, lang)}
                            </span>
                            <span className="mt-0.5 text-xs opacity-80">{labels.tomorrow}</span>
                          </button>
                          <label
                            className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 px-2 py-3 text-center transition-colors ${
                              customDate
                                ? "border-kurkuma-green bg-kurkuma-green text-kurkuma-yellow"
                                : "border-kurkuma-green/70 bg-kurkuma-yellow/30 hover:bg-kurkuma-yellow/50"
                            }`}
                          >
                            <Calendar size={16} className="mb-1" />
                            <span className="text-xs font-bold">{labels.other}</span>
                            <input
                              type="date"
                              value={customDate}
                              min={toISODate(today)}
                              onChange={(e) => handleCustomDateChange(e.target.value)}
                              className="sr-only"
                              aria-label={labels.selectDate}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Seating */}
                  <div className="border-t border-kurkuma-green/25">
                    <button
                      type="button"
                      onClick={() => toggleSection("seating")}
                      className="flex w-full items-center gap-3 py-4 text-left"
                    >
                      <Armchair size={18} strokeWidth={2} className="shrink-0" />
                      <span className="flex-1 text-base font-bold">{seatingLabel}</span>
                      {expanded === "seating" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expanded === "seating" && (
                      <div className="space-y-2 pb-5">
                        {SEATING_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSeatingSelect(option.id)}
                            className={`flex w-full items-center justify-center rounded-md border-2 px-4 py-3 text-sm font-bold transition-colors ${
                              seating === option.id
                                ? "border-kurkuma-green bg-kurkuma-green text-kurkuma-yellow"
                                : "border-kurkuma-green/70 bg-kurkuma-yellow/30 hover:bg-kurkuma-yellow/50"
                            }`}
                          >
                            {option[lang]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <div className="border-t border-kurkuma-green/25">
                    <button
                      type="button"
                      onClick={() => toggleSection("time")}
                      className="flex w-full items-center gap-3 py-4 text-left"
                    >
                      <Clock size={18} strokeWidth={2} className="shrink-0" />
                      <span className="flex-1 text-base font-bold">{timeLabel}</span>
                      {expanded === "time" ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {expanded === "time" && (
                      <div className="pb-5">
                        {renderTimeSlots(LUNCH_SLOTS, `${labels.lunch} / Lunch`)}
                        {renderTimeSlots(DINNER_SLOTS, `${labels.dinner} / Dinner`)}
                      </div>
                    )}
                  </div>
                </>
              )}

              {step === "contact" && (
                <form id="reservation-contact-form" onSubmit={handleSubmit} className="py-4">
                  <h3 className="mb-4 text-lg font-bold">{labels.contactTitle}</h3>
                  <div className="space-y-3">
                    <input
                      required
                      type="text"
                      value={contact.name}
                      onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                      placeholder={labels.name}
                      className="w-full rounded-md border-2 border-kurkuma-green/50 bg-kurkuma-yellow/30 px-4 py-3 text-sm font-medium placeholder:text-kurkuma-green/50 focus:border-kurkuma-green focus:outline-none"
                    />
                    <input
                      required
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      placeholder={labels.email}
                      className="w-full rounded-md border-2 border-kurkuma-green/50 bg-kurkuma-yellow/30 px-4 py-3 text-sm font-medium placeholder:text-kurkuma-green/50 focus:border-kurkuma-green focus:outline-none"
                    />
                    <input
                      required
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                      placeholder={labels.phone}
                      className="w-full rounded-md border-2 border-kurkuma-green/50 bg-kurkuma-yellow/30 px-4 py-3 text-sm font-medium placeholder:text-kurkuma-green/50 focus:border-kurkuma-green focus:outline-none"
                    />
                  </div>
                  <div className="mt-4 rounded-md bg-kurkuma-green/10 px-4 py-3 text-xs leading-relaxed">
                    {labels.guests(guests)} · {dateLabel} · {time && formatTimeSlot(time, lang)} ·{" "}
                    {seatingLabel}
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-kurkuma-green text-kurkuma-yellow">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-lg font-bold">{labels.success}</h3>
                  <p className="mt-2 text-sm text-kurkuma-green/80">{labels.successDetail}</p>
                </div>
              )}

              {step === "error" && (
                <div className="flex flex-col items-center justify-center py-10 text-center px-2">
                  <p className="text-sm font-medium leading-relaxed">
                    {errorCode === "access_denied" ? labels.accessDenied : labels.error}
                  </p>
                  {errorCode === "access_denied" && sheetsTestUrl ? (
                    <a
                      href={sheetsTestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-sm font-bold underline underline-offset-4"
                    >
                      {labels.testUrl}
                    </a>
                  ) : null}
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="mt-4 text-sm font-bold underline underline-offset-4"
                  >
                    {SITE.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="shrink-0 border-t border-kurkuma-green/20 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4">
              {step === "booking" && (
                <button
                  type="button"
                  disabled={!canReserve}
                  onClick={handleReserveClick}
                  className={`w-full rounded-lg py-4 text-base font-bold uppercase tracking-wide transition-colors ${
                    canReserve
                      ? "bg-kurkuma-green text-kurkuma-yellow hover:bg-kurkuma-green-dark"
                      : "cursor-not-allowed bg-kurkuma-cream-dark/80 text-kurkuma-green/50"
                  }`}
                >
                  {labels.reserve}
                </button>
              )}

              {step === "contact" && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("booking")}
                    className="flex-1 rounded-lg border-2 border-kurkuma-green py-4 text-sm font-bold"
                  >
                    {labels.back}
                  </button>
                  <button
                    type="submit"
                    form="reservation-contact-form"
                    disabled={submitState === "loading"}
                    className="flex-[2] rounded-lg bg-kurkuma-green py-4 text-sm font-bold text-kurkuma-yellow hover:bg-kurkuma-green-dark disabled:opacity-70"
                  >
                    {submitState === "loading" ? labels.loading : labels.confirm}
                  </button>
                </div>
              )}

              {(step === "success" || step === "error") && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-lg bg-kurkuma-green py-4 text-base font-bold text-kurkuma-yellow"
                >
                  {lang === "en" ? "Close" : "Fermer"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
