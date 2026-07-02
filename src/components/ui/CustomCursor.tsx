"use client";

import { useEffect, useRef } from "react";
import { useHasPointer } from "@/hooks";

/**
 * A two-layer luxury cursor: a small gold dot that tracks 1:1 and a larger
 * ring that eases behind it. The ring grows and shows contextual labels when
 * hovering elements marked with [data-cursor] (e.g. "View", "Drag", "Book").
 */
export function CustomCursor() {
  const hasPointer = useHasPointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hasPointer) return;
    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const render = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (!target) {
        ring.dataset.state = "default";
        label.textContent = "";
        return;
      }
      const cursorLabel = target.getAttribute("data-cursor");
      if (cursorLabel && cursorLabel !== "true") {
        ring.dataset.state = "label";
        label.textContent = cursorLabel;
      } else {
        ring.dataset.state = "hover";
        label.textContent = "";
      }
    };

    const onDown = () => (ring.dataset.pressed = "true");
    const onUp = () => (ring.dataset.pressed = "false");
    const onLeave = () => (ring.style.opacity = "0");
    const onEnter = () => (ring.style.opacity = "1");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-state="default"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full mix-blend-difference"
      >
        <span
          ref={labelRef}
          className="text-[10px] uppercase tracking-[0.2em] text-ink"
        />
      </div>
      <style jsx global>{`
        .cursor-ring {
          height: 40px;
          width: 40px;
          margin-left: -20px;
          margin-top: -20px;
          border: 1px solid rgba(201, 169, 97, 0.9);
          transition: height 0.35s var(--ease-luxe),
            width 0.35s var(--ease-luxe), background 0.35s var(--ease-luxe),
            opacity 0.3s ease;
        }
        .cursor-ring[data-state="hover"] {
          height: 64px;
          width: 64px;
          margin-left: -32px;
          margin-top: -32px;
          background: rgba(201, 169, 97, 0.12);
        }
        .cursor-ring[data-state="label"] {
          height: 92px;
          width: 92px;
          margin-left: -46px;
          margin-top: -46px;
          background: var(--gold);
          border-color: var(--gold);
        }
        .cursor-ring[data-pressed="true"] {
          transform: scale(0.85);
        }
      `}</style>
    </>
  );
}
