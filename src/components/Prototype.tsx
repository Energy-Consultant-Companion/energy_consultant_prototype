"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SCREENS, SLUGS, screenAt } from "@/lib/screens";
import { HOTSPOTS } from "@/lib/hotspots";
import { useHotspots } from "@/components/useHotspots";
import { Stage } from "@/components/Stage";
import { DemoBar } from "@/components/DemoBar";
import { Overview } from "@/components/Overview";

/** Opening the folder is a zoom rather than a slide — it should read as one. */
const FOLDER_PAIR = new Set(["fall-unterlagen-ordner", "fall-unterlagen-geoeffnet"]);

export function Prototype({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const [direction, setDirection] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [overview, setOverview] = useState(false);
  const [hotspotCount, setHotspotCount] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const previous = useRef(initialSlug);

  const screen = screenAt(slug);
  const index = Math.max(0, SLUGS.indexOf(screen.slug));
  const hotspots = useMemo(() => HOTSPOTS[screen.slug] ?? [], [screen.slug]);

  const go = useCallback(
    (next: string, dir = 1) => {
      if (!SLUGS.includes(next)) return;
      setDirection(dir);
      setSlug((current) => {
        previous.current = current;
        return next;
      });
      setOverview(false);
      window.history.pushState({ slug: next }, "", `/${next}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const step = useCallback(
    (delta: number) => {
      const next = SLUGS[(index + delta + SLUGS.length) % SLUGS.length];
      go(next, delta);
    },
    [go, index]
  );

  const navigate = useCallback((to: string) => go(to, 1), [go]);
  useHotspots(stageRef, hotspots, navigate, revealed, setHotspotCount);

  // On the first visit, flash the clickable regions once so it is obvious the
  // screens respond to clicks rather than only to the toolbar.
  useEffect(() => {
    if (sessionStorage.getItem("ensera:hinted")) return;
    sessionStorage.setItem("ensera:hinted", "1");
    const on = window.setTimeout(() => setRevealed(true), 700);
    const off = window.setTimeout(() => setRevealed(false), 3200);
    return () => {
      window.clearTimeout(on);
      window.clearTimeout(off);
    };
  }, []);

  useEffect(() => {
    const onPop = () => {
      const fromPath = window.location.pathname.replace(/^\//, "");
      setDirection(-1);
      setSlug(SLUGS.includes(fromPath) ? fromPath : SLUGS[0]);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key.toLowerCase() === "h") setRevealed((v) => !v);
      else if (event.key.toLowerCase() === "o") setOverview((v) => !v);
      else if (event.key === "Escape") setOverview(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const zooming = FOLDER_PAIR.has(screen.slug) && FOLDER_PAIR.has(previous.current);

  return (
    <div className="min-h-dvh pb-28">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen.slug}
          ref={stageRef}
          initial={
            zooming
              ? { opacity: 0, scale: 0.975 }
              : { opacity: 0, x: direction >= 0 ? 26 : -26 }
          }
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={
            zooming
              ? { opacity: 0, scale: 1.015 }
              : { opacity: 0, x: direction >= 0 ? -18 : 18 }
          }
          transition={{ duration: zooming ? 0.42 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="origin-top"
        >
          <Stage>
            <screen.Component />
          </Stage>
        </motion.div>
      </AnimatePresence>

      <DemoBar
        screen={screen}
        index={index}
        total={SCREENS.length}
        hotspotCount={hotspotCount}
        revealed={revealed}
        onToggleReveal={() => setRevealed((v) => !v)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onOverview={() => setOverview(true)}
      />

      <Overview
        open={overview}
        current={screen.slug}
        onPick={(next) => go(next, 1)}
        onClose={() => setOverview(false)}
      />
    </div>
  );
}
