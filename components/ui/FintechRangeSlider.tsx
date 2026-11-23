"use client";

import { useId, useMemo } from "react";

export type FintechRangeSliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  label: string;
  /** Formatted main value under the label */
  displayValue: string;
  minLabel: string;
  maxLabel: string;
  className?: string;
  onChange: (value: number) => void;
};

/**
 * Shared fintech range row (label + value + flat capsule thumb + thin track).
 */
export default function FintechRangeSlider({
  value,
  min,
  max,
  step = 1,
  label,
  displayValue,
  minLabel,
  maxLabel,
  className = "",
  onChange,
}: FintechRangeSliderProps) {
  const id = useId();
  const pct = useMemo(() => {
    if (max <= min) return 0;
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  }, [value, min, max]);

  return (
    <div className={`flex w-full flex-1 flex-col gap-3 ${className}`.trim()}>
      <label
        htmlFor={id}
        className="text-[14px] font-normal leading-[17px] text-[#8A93A3]"
      >
        {label}
      </label>

      <p className="text-[22px] font-semibold leading-[27px] text-[#1A2233] tabular-nums">
        {displayValue}
      </p>

      {/* Track 5px + capsule thumb 40×22 (Figma) */}
      <div className="relative flex h-[26px] w-full items-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 overflow-hidden rounded-[2.5px] bg-[#E3E8F0]"
          aria-hidden
        >
          <div
            className="h-full w-full origin-left rounded-[2.5px] bg-[#2F6BF0]"
            style={{ transform: `scaleX(${pct / 100})` }}
          />
        </div>

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={displayValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="amount-slider-range relative z-10 w-full touch-none"
        />
      </div>

      <div className="flex items-center justify-between text-[14px] font-medium leading-[17px] text-[#7A8699]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
