"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "./index";

/**
 * Minimal GSAP integration hook. Runs the callback inside a `gsap.context`
 * (so any tweens/ScrollTriggers created are automatically reverted on
 * unmount) after layout, on the client only. Return an optional cleanup
 * function from the callback for anything context won't catch.
 */
export function useGSAP(
  callback: () => void | (() => void),
  deps: React.DependencyList = []
) {
  const cleanupRef = useRef<void | (() => void)>(undefined);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cleanupRef.current = callback();
    });
    return () => {
      if (typeof cleanupRef.current === "function") cleanupRef.current();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
