"use client";

import { useCallback, useRef } from "react";

/**
 * Horizontal drag-to-scroll with mouse (hold + move).
 * Touch keeps native swipe. Suppresses accidental link clicks after a drag.
 * Scroll snapping and smooth scrolling are switched off while dragging (they would fight every
 * scrollLeft change) and restored on release, so the strip settles on the nearest card.
 */
export function useDragScroll<T extends HTMLElement>() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const ref = useCallback((el: T | null) => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    if (!el) return;

    const state = {
      dragging: false,
      moved: false,
      startX: 0,
      scrollLeft: 0,
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      state.dragging = true;
      state.moved = false;
      state.startX = e.pageX;
      state.scrollLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!state.dragging) return;
      e.preventDefault();
      const dx = e.pageX - state.startX;
      if (Math.abs(dx) > 3) state.moved = true;
      el.scrollLeft = state.scrollLeft - dx;
    };

    const onMouseUp = () => {
      if (!state.dragging) return;
      state.dragging = false;
      el.style.cursor = "grab";
      el.style.userSelect = "";
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
    };

    const onClickCapture = (e: MouseEvent) => {
      if (!state.moved) return;
      e.preventDefault();
      e.stopPropagation();
      state.moved = false;
    };

    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart, true);

    cleanupRef.current = () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart, true);
      el.style.cursor = "";
      el.style.userSelect = "";
    };
  }, []);

  return {
    ref,
    className:
      "cursor-grab select-none [-webkit-user-drag:none] [&_a]:[-webkit-user-drag:none] [&_img]:pointer-events-none",
  };
}

export default useDragScroll;
