"use client";

import { useCallback, useEffect, useState } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";

/**
 * Horizontal card strip on native scrolling: mouse drag, touch swipe, trackpad/wheel,
 * plus prev/next arrows that move by one card. Arrow state follows the real scroll position,
 * and `overflow` is false when everything fits (the arrows can then be hidden).
 */
export function useHScroll<T extends HTMLElement = HTMLDivElement>() {
  const drag = useDragScroll<T>();
  const dragRef = drag.ref; // stable callback (the returned object is new on every render)
  const [el, setEl] = useState<T | null>(null);
  const [state, setState] = useState({ canPrev: false, canNext: false, overflow: false });

  const ref = useCallback(
    (node: T | null) => {
      dragRef(node);
      setEl(node);
    },
    [dragRef]
  );

  useEffect(() => {
    if (!el) return;
    // cheap reads; setState bails out when nothing changed, so no frame throttling is needed
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next = { canPrev: el.scrollLeft > 2, canNext: el.scrollLeft < max - 2, overflow: max > 2 };
      setState((s) =>
        s.canPrev === next.canPrev && s.canNext === next.canNext && s.overflow === next.overflow ? s : next
      );
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [el]);

  /** Scroll by one card (first card width + gap); at the edges the browser clamps. */
  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      if (!el) return;
      const [a, b] = Array.from(el.children) as HTMLElement[];
      const step = a ? (b ? b.offsetLeft - a.offsetLeft : a.offsetWidth) : el.clientWidth * 0.8;
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    },
    [el]
  );

  return {
    ref,
    dragClassName: drag.className,
    ...state,
    prev: () => scrollByCard(-1),
    next: () => scrollByCard(1),
  };
}

export default useHScroll;
