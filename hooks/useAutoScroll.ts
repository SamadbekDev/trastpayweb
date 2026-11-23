"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Slow endless auto-scroll of a horizontal strip (marquee-like, on native scrolling, so drag/swipe
 * keep working). The caller renders its `count` items, and once `loop` turns true renders them a
 * second time (aria-hidden): scrolling past the first set jumps back by its width without a visible seam.
 *
 * Pauses while the pointer is over the strip, while it has focus, during touch/drag/wheel (and
 * a moment after), when off screen or in a background tab; never runs with prefers-reduced-motion.
 */
export function useAutoScroll(el: HTMLElement | null, count: number, speed = 28) {
  const [loop, setLoop] = useState(false);
  const loopRef = useRef(false);
  loopRef.current = loop;

  // Loop only when one set of items overflows the strip.
  useEffect(() => {
    if (!el || count < 2) return;
    const measure = () => {
      const items = Array.from(el.children) as HTMLElement[];
      const first = items[0];
      const last = items[count - 1];
      if (!first || !last) return;
      const setWidth = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      setLoop(setWidth > el.clientWidth + 4);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [el, count]);

  useEffect(() => {
    if (!el || !loop) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hover = false;
    let focus = false;
    let visible = true;
    let holdUntil = 0;
    let pos = el.scrollLeft;
    let lastSet = -1;
    let prev = 0;
    let raf = 0;

    let cachedPeriod = 0;
    const measurePeriod = () => {
      const items = el.children as HTMLCollectionOf<HTMLElement>;
      cachedPeriod =
        items[count] && items[0]
          ? items[count].offsetLeft - items[0].offsetLeft
          : 0;
    };
    measurePeriod();
    const ro = new ResizeObserver(measurePeriod);
    ro.observe(el);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = prev ? Math.min(now - prev, 64) : 0;
      prev = now;
      if (!cachedPeriod || hover || focus || !visible || document.hidden || reduced.matches || now < holdUntil) {
        lastSet = -1;
        return;
      }
      const currentScroll = el.scrollLeft;
      // the user scrolled since our last step → continue from where they left it
      if (lastSet < 0 || Math.abs(currentScroll - lastSet) > 2) pos = currentScroll;
      pos += (speed * dt) / 1000;
      if (pos >= cachedPeriod) pos -= cachedPeriod;
      el.scrollLeft = pos;
      lastSet = Math.round(pos);
    };
    raf = requestAnimationFrame(tick);

    const hold = (ms: number) => () => {
      holdUntil = performance.now() + ms;
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hover = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hover = false;
    };
    const onFocusIn = () => (focus = true);
    const onFocusOut = () => (focus = false);
    const onTouch = hold(3000);
    const onWheel = hold(2500);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("wheel", onWheel);
    };
  }, [el, loop, count, speed]);

  return { loop };
}

export default useAutoScroll;
