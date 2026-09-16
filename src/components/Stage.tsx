"use client";

import { useEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 1440;

/**
 * The Paper artboards are drawn at a fixed 1440px width. The stage scales that
 * canvas to the viewport instead of reflowing it, so the prototype matches the
 * design at any window size.
 */
export function Stage({
  children,
  onScale,
}: {
  children: React.ReactNode;
  onScale?: (scale: number) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(900);

  useEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    if (!frame || !content) return;

    const measure = () => {
      const next = Math.min(1, frame.clientWidth / DESIGN_WIDTH);
      setScale(next);
      setHeight(content.scrollHeight);
      onScale?.(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(content);
    return () => ro.disconnect();
  }, [onScale, children]);

  return (
    <div ref={frameRef} className="w-full">
      <div
        className="mx-auto overflow-hidden"
        style={{ width: DESIGN_WIDTH * scale, height: height * scale }}
      >
        <div
          ref={contentRef}
          style={{
            width: DESIGN_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
