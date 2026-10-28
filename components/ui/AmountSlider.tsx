"use client";

import { useState } from "react";
import FintechRangeSlider from "./FintechRangeSlider";

const DEFAULT_MIN = 1_000_000;
const DEFAULT_MAX = 50_000_000;
const DEFAULT_STEP = 500_000;
const DEFAULT_VALUE = 5_000_000;

export type AmountSliderProps = {
  /** Current value (controlled). If omitted, component is uncontrolled. */
  value?: number;
  /** Default value for uncontrolled mode */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Currency suffix after the formatted number */
  currency?: string;
  label?: string;
  className?: string;
  onChange?: (value: number) => void;
};

/** Formats integer with spaces as thousand separators: `5 000 000`. */
export function formatAmount(n: number): string {
  return Math.round(n)
    .toLocaleString("ru-RU")
    .replace(/,/g, " ")
    .replace(/\u00A0/g, " ");
}

/**
 * Isolated fintech amount range slider (React + Tailwind).
 * Thin track + flat capsule thumb; controlled or uncontrolled.
 */
export default function AmountSlider({
  value: valueProp,
  defaultValue = DEFAULT_VALUE,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
  currency = "сум",
  label = "Какая сумма вас интересует?",
  className = "",
  onChange,
}: AmountSliderProps) {
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const value = isControlled ? valueProp : inner;

  function handleChange(next: number) {
    if (!isControlled) setInner(next);
    onChange?.(next);
  }

  return (
    <FintechRangeSlider
      className={className}
      label={label}
      value={value}
      min={min}
      max={max}
      step={step}
      displayValue={`${formatAmount(value)} ${currency}`}
      minLabel={`от ${formatAmount(min)} ${currency}`}
      maxLabel={`до ${formatAmount(max)} ${currency}`}
      onChange={handleChange}
    />
  );
}
