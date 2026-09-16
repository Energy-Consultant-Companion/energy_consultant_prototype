"use client";

import { AnimatePresence, motion } from "motion/react";
import { chapterOf, type Screen } from "@/lib/screens";

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-[4px] border border-border bg-surface-sunken px-[5px] py-px font-mono text-[10px] leading-[14px] text-fg-subtle">
      {children}
    </kbd>
  );
}

export function DemoBar({
  screen,
  index,
  total,
  hotspotCount,
  revealed,
  onToggleReveal,
  onPrev,
  onNext,
  onOverview,
}: {
  screen: Screen;
  index: number;
  total: number;
  hotspotCount: number;
  revealed: boolean;
  onToggleReveal: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOverview: () => void;
}) {
  const chapter = chapterOf(screen.chapter);
  const client = chapter.persona === "Kundschaft";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4">
      <motion.div
        layout
        className="pointer-events-auto flex max-w-[min(1160px,100%)] items-center gap-4 rounded-full border border-border bg-surface/90 py-2 pl-3 pr-2 shadow-[0_10px_40px_rgba(18,22,27,0.14),0_1px_2px_rgba(18,22,27,0.08)] backdrop-blur-xl"
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className={`shrink-0 rounded-full px-[10px] py-[5px] font-mono text-[10px] tracking-caps ${
            client
              ? "bg-accent-sky-wash text-accent-sky-ink"
              : "bg-brand-surface text-brand"
          }`}
        >
          {chapter.persona.toUpperCase()}
        </span>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-[14px] font-medium leading-[18px] text-fg">
              {screen.title}
            </span>
            <span className="hidden shrink-0 font-mono text-[10px] tracking-caps text-fg-subtle sm:inline">
              {chapter.title.toUpperCase()}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={screen.slug}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18 }}
              className="hidden truncate text-xs leading-md text-fg-muted md:block"
            >
              {screen.note || `${hotspotCount} klickbare Stellen`}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            onClick={onToggleReveal}
            title="Klickbare Stellen zeigen (H)"
            className={`flex h-8 items-center gap-[7px] rounded-full px-[11px] text-sm font-medium transition-colors ${
              revealed
                ? "bg-brand text-brand-fg"
                : "border border-border text-fg-muted hover:text-fg"
            }`}
          >
            <span
              className={`size-[6px] rounded-full ${
                revealed ? "bg-brand-fg" : "bg-brand"
              }`}
            />
            <span className="hidden sm:inline">{hotspotCount}</span>
            <span className="hidden lg:inline">Hotspots</span>
          </button>

          <button
            onClick={onOverview}
            title="Alle Ansichten (O)"
            className="hidden h-8 items-center gap-2 rounded-full border border-border px-[11px] text-sm font-medium text-fg-muted transition-colors hover:text-fg sm:flex"
          >
            Übersicht
            <Key>O</Key>
          </button>

          <div className="flex items-center gap-1 rounded-full bg-surface-sunken p-1">
            <button
              onClick={onPrev}
              title="Zurück (←)"
              className="flex size-7 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M14.5 5.5 8 12l6.5 6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="min-w-[46px] text-center font-mono text-[11px] tracking-mono text-fg-muted">
              {index + 1} / {total}
            </span>
            <button
              onClick={onNext}
              title="Weiter (→)"
              className="flex size-7 items-center justify-center rounded-full bg-fg text-fg-inverse transition-transform hover:scale-105"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M9.5 5.5 16 12l-6.5 6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
