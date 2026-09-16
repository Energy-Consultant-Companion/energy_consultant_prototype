"use client";

import { useEffect } from "react";
import type { Hotspot } from "@/lib/hotspots";

const norm = (s: string | null) => (s ?? "").replace(/\s+/g, " ").trim();

/**
 * Returns the innermost elements rendering exactly `text` — i.e. matches that
 * have no descendant with the same text, so we tag the label rather than the
 * page.
 */
function findByText(root: HTMLElement, text: string): HTMLElement[] {
  const wanted = norm(text);
  const out: HTMLElement[] = [];
  for (const el of Array.from(root.querySelectorAll<HTMLElement>("*"))) {
    if (norm(el.textContent) !== wanted) continue;
    const deeper = Array.from(el.children).some(
      (child) => norm(child.textContent) === wanted
    );
    if (!deeper) out.push(el);
  }
  return out;
}

function climb(el: HTMLElement, up: number, root: HTMLElement): HTMLElement {
  let node = el;
  for (let i = 0; i < up; i++) {
    const parent = node.parentElement;
    if (!parent || parent === root) break;
    node = parent;
  }
  return node;
}

/**
 * Tags the clickable regions of the current screen and routes clicks on them.
 * Re-runs whenever the screen changes.
 */
export function useHotspots(
  rootRef: React.RefObject<HTMLElement | null>,
  hotspots: Hotspot[],
  onNavigate: (slug: string) => void,
  revealed: boolean,
  onCount?: (count: number) => void
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    for (const stale of Array.from(root.querySelectorAll<HTMLElement>("[data-hotspot]"))) {
      stale.removeAttribute("data-hotspot");
      stale.removeAttribute("data-to");
      stale.removeAttribute("data-reveal");
    }

    for (const rule of hotspots) {
      let matches: HTMLElement[] = [];
      if (rule.text) {
        matches = findByText(root, rule.text);
      } else if (rule.selector) {
        matches = Array.from(root.querySelectorAll<HTMLElement>(rule.selector));
      }
      if (!matches.length) continue;

      const chosen = rule.all ? matches : [matches[rule.nth ?? 0]].filter(Boolean);
      for (const match of chosen) {
        const target = climb(match, rule.up ?? 0, root);
        // First rule to claim a node wins, so specific rules can precede the rail.
        if (target.hasAttribute("data-hotspot")) continue;
        target.setAttribute("data-hotspot", "");
        target.setAttribute("data-to", rule.to);
      }
    }

    onCount?.(root.querySelectorAll("[data-hotspot]").length);
  }, [rootRef, hotspots, onNavigate, onCount]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    for (const el of Array.from(root.querySelectorAll<HTMLElement>("[data-hotspot]"))) {
      if (revealed) el.setAttribute("data-reveal", "on");
      else el.removeAttribute("data-reveal");
    }
  }, [rootRef, revealed, hotspots]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onClick = (event: MouseEvent) => {
      const hit = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-hotspot]");
      const to = hit?.getAttribute("data-to");
      if (!to) return;
      event.preventDefault();
      onNavigate(to);
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [rootRef, onNavigate]);
}
