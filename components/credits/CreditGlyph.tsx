import { CreditIconName } from "@/types/credits";

interface CreditGlyphProps {
  name: CreditIconName;
}

const stroke = {
  fill: "none",
  stroke: "white",
  strokeWidth: 4.12,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function CreditGlyph({ name }: CreditGlyphProps) {
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden>
      {name === "car" && (
        <>
          <path d="M14 42h48l-6-16H22L14 42Z" {...stroke} />
          <path d="M18 42v8h8v-8M50 42v8h8v-8" {...stroke} />
          <circle cx="26" cy="50" r="4" {...stroke} />
          <circle cx="50" cy="50" r="4" {...stroke} />
        </>
      )}
      {name === "home" && (
        <path
          d="M16 33.5 38 16l22 17.5V60H16V33.5Z"
          {...stroke}
        />
      )}
      {name === "link" && (
        <>
          <rect x="12.3" y="12.3" width="29" height="29" rx="4" {...stroke} />
          <rect x="34.7" y="34.7" width="29" height="29" rx="4" {...stroke} />
        </>
      )}
      {name === "briefcase" && (
        <>
          <rect x="11" y="25.3" width="54" height="34.9" rx="4" {...stroke} />
          <path d="M28.5 25.3V18.2a9.5 9.5 0 0 1 19 0v7.1" {...stroke} />
          <path d="M11 38h54" {...stroke} />
        </>
      )}
      {name === "bag" && (
        <>
          <path d="M19 28.5h38l-4 31.7H23L19 28.5Z" {...stroke} />
          <path d="M28.5 28.5v-7.2a9.5 9.5 0 0 1 19 0v7.2" {...stroke} />
        </>
      )}
      {name === "sun" && (
        <>
          <circle cx="38" cy="38" r="12.6" {...stroke} />
          <circle cx="38" cy="38" r="26.9" {...stroke} />
        </>
      )}
      {name === "file" && (
        <>
          <rect x="9.5" y="19" width="57" height="38" rx="4" {...stroke} />
          <path d="M9.5 31.7h57" {...stroke} />
          <path d="M20.6 45.9h12.7" {...stroke} />
        </>
      )}
    </svg>
  );
}
