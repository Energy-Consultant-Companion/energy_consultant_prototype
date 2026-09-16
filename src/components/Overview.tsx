"use client";

import { AnimatePresence, motion } from "motion/react";
import { CHAPTERS, SCREENS } from "@/lib/screens";

export function Overview({
  open,
  current,
  onPick,
  onClose,
}: {
  open: boolean;
  current: string;
  onPick: (slug: string) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0b0d10]/55 p-6 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-5xl rounded-2xl border border-border bg-surface p-7 shadow-2xl"
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline justify-between pb-5">
              <div>
                <div className="font-mono text-2xs tracking-caps text-fg-subtle">
                  ENSERA · KLICK-PROTOTYP
                </div>
                <div className="pt-1 text-xl font-semibold tracking-tight text-fg">
                  Alle {SCREENS.length} Ansichten
                </div>
              </div>
              <div className="font-mono text-2xs tracking-caps text-fg-subtle">
                ESC SCHLIESSEN
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {CHAPTERS.map((chapter) => {
                const screens = SCREENS.filter((s) => s.chapter === chapter.id);
                if (!screens.length) return null;
                return (
                  <div key={chapter.id} className="flex flex-col">
                    <div className="flex items-baseline gap-2 border-b border-border pb-2">
                      <span className="font-mono text-2xs tracking-caps text-fg">
                        {chapter.title.toUpperCase()}
                      </span>
                      <span className="font-mono text-2xs tracking-caps text-fg-subtle">
                        {chapter.persona}
                      </span>
                    </div>
                    <div className="flex flex-col pt-1">
                      {screens.map((screen) => {
                        const active = screen.slug === current;
                        return (
                          <button
                            key={screen.slug}
                            onClick={() => onPick(screen.slug)}
                            className={`flex items-center gap-2 rounded-md px-2 py-[7px] text-left text-sm transition-colors ${
                              active
                                ? "bg-brand-surface font-medium text-brand"
                                : "text-fg-muted hover:bg-surface-sunken hover:text-fg"
                            }`}
                          >
                            <span
                              className={`size-[5px] shrink-0 rounded-full ${
                                active ? "bg-brand" : "bg-border-strong"
                              }`}
                            />
                            {screen.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
