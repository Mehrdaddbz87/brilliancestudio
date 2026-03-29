"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { enCA } from "react-day-picker/locale";
import { createPortal } from "react-dom";

import { cn, formatIsoDate } from "@/lib/utils";

type DatePickerProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
  placeholder?: string;
  error?: boolean;
  disablePastDates?: boolean;
  name?: string;
};

type PanelPosition = {
  top: number;
  left: number;
  width: number;
  openDirection: "top" | "bottom";
};

/**
 * Reusable calendar picker that renders and returns dates in `YYYY-MM-DD` format.
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  error = false,
  disablePastDates = false,
  name,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const formattedValue = useMemo(
    () => (value ? formatIsoDate(value) : ""),
    [value],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function updatePanelPosition() {
    if (!rootRef.current || typeof window === "undefined") {
      return;
    }

    const triggerRect = rootRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const panelWidth = Math.min(Math.max(triggerRect.width, 320), viewportWidth - 24);
    const estimatedPanelHeight = panelRef.current?.offsetHeight || 392;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const shouldOpenAbove =
      spaceBelow < estimatedPanelHeight + 24 && spaceAbove > spaceBelow;
    const unclampedLeft = triggerRect.left;
    const left = Math.min(
      Math.max(12, unclampedLeft),
      Math.max(12, viewportWidth - panelWidth - 12),
    );
    const top = shouldOpenAbove
      ? Math.max(12, triggerRect.top - estimatedPanelHeight - 12)
      : Math.min(triggerRect.bottom + 12, viewportHeight - estimatedPanelHeight - 12);

    setPanelPosition({
      top,
      left,
      width: panelWidth,
      openDirection: shouldOpenAbove ? "top" : "bottom",
    });
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePanelPosition();

    const handlePointerDown = (event: MouseEvent) => {
      const targetNode = event.target as Node;

      if (
        !rootRef.current?.contains(targetNode) &&
        !panelRef.current?.contains(targetNode)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleViewportChange = () => {
      updatePanelPosition();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isOpen]);

  const today = useMemo(() => {
    const currentDate = new Date();
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {name ? <input type="hidden" name={name} value={formattedValue} /> : null}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-invalid={error ? "true" : undefined}
        onClick={() => {
          if (!isOpen) {
            updatePanelPosition();
          }

          setIsOpen((open) => !open);
        }}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-2xl border bg-white/[0.04] px-4 py-3 text-left text-base text-text outline-none transition duration-300",
          "hover:border-accent/60 hover:bg-white/[0.06] focus:border-accent focus:bg-white/[0.06] focus:ring-2 focus:ring-accent/50",
          error
            ? "border-red-300/70 focus:border-red-300 focus:ring-red-300/40"
            : "border-white/10",
        )}
      >
        <span className={formattedValue ? "text-text" : "text-text/45"}>
          {formattedValue || placeholder}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "text-sm text-accent transition duration-300",
            isOpen ? "rotate-180" : "",
          )}
        >
          ▼
        </span>
      </button>

      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isOpen && panelPosition ? (
                <motion.div
                  ref={panelRef}
                  role="dialog"
                  aria-modal="false"
                  initial={{
                    opacity: 0,
                    y: panelPosition.openDirection === "top" ? 10 : -10,
                    scale: 0.98,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: panelPosition.openDirection === "top" ? 8 : -8,
                    scale: 0.98,
                  }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "fixed",
                    top: panelPosition.top,
                    left: panelPosition.left,
                    width: panelPosition.width,
                  }}
                  className="z-[9999] rounded-[1.5rem] border border-accent/20 bg-black/95 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl"
                >
                  <DayPicker
                    mode="single"
                    locale={enCA}
                    selected={value ?? undefined}
                    onSelect={(nextDate) => {
                      onChange(nextDate ?? null);
                      if (nextDate) {
                        setIsOpen(false);
                      }
                    }}
                    disabled={disablePastDates ? { before: today } : undefined}
                    fromDate={disablePastDates ? today : undefined}
                    showOutsideDays
                    fixedWeeks
                    autoFocus
                    classNames={{
                      root: "w-full",
                      months: "flex w-full",
                      month: "w-full",
                      caption: "mb-4 flex items-center justify-between gap-3",
                      caption_label:
                        "font-fantasy text-base uppercase tracking-[0.12em] text-text",
                      nav: "flex items-center gap-2",
                      button_previous:
                        "grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-text transition hover:border-accent hover:text-accent",
                      button_next:
                        "grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-text transition hover:border-accent hover:text-accent",
                      month_grid: "w-full border-collapse",
                      weekdays: "mb-2 grid grid-cols-7 gap-1",
                      weekday:
                        "text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-text/40",
                      week: "grid grid-cols-7 gap-1",
                      weeks: "grid gap-1",
                      day: "flex justify-center",
                      day_button:
                        "grid h-11 w-11 place-items-center rounded-xl text-sm text-text transition duration-200 hover:bg-accent/15 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50",
                      today: "text-accent",
                      selected:
                        "rounded-xl bg-accent text-primary hover:bg-accent hover:text-primary",
                      outside: "text-text/25",
                      disabled:
                        "cursor-not-allowed text-text/20 hover:bg-transparent",
                      hidden: "invisible",
                    }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}
