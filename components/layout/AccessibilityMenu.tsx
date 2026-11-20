"use client";

import { useEffect, useRef, useState } from "react";
import { EyeOff, Glasses, Smartphone, Volume2, VolumeX, X } from "lucide-react";
import { pickText, useLang } from "@/hooks/useLang";
import type { Language } from "@/types/pageConfig";

type A11yTheme = "normal" | "grayscale" | "contrast-dark" | "contrast-yellow";
type FontScale = 100 | 115 | 130;

interface A11yState {
  specialMode: boolean;
  fontScale: FontScale;
  theme: A11yTheme;
  voiceEnabled: boolean;
  mobileView: boolean;
}

const DEFAULT_STATE: A11yState = {
  specialMode: false,
  fontScale: 100,
  theme: "normal",
  voiceEnabled: false,
  mobileView: false,
};

const STORAGE_KEY = "trastbank_a11y_v1";
/** Query flag of the page shown inside the «mobile version» frame. */
const EMBED_FLAG = "a11y-mobile";
const MOBILE_FRAME_WIDTH = 390;

/**
 * Speech voice for the UI language. Browsers rarely ship an Uzbek voice, so Uzbek (Latin)
 * falls back to Turkish, whose pronunciation of Latin letters is close, then to Russian.
 */
function pickVoice(lang: Language): { lang: string; voice?: SpeechSynthesisVoice } {
  const voices = window.speechSynthesis.getVoices();
  const prefs = lang === "uz" ? ["uz", "tr", "ru"] : lang === "en" ? ["en"] : ["ru"];
  for (const p of prefs) {
    const voice = voices.find((v) => v.lang.toLowerCase().startsWith(p));
    if (voice) return { lang: voice.lang, voice };
  }
  return { lang: lang === "uz" ? "uz-UZ" : lang === "en" ? "en-US" : "ru-RU" };
}

function speakText(text: string, lang: Language) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(cleaned.slice(0, 600));
  const { lang: voiceLang, voice } = pickVoice(lang);
  utter.lang = voiceLang;
  if (voice) utter.voice = voice;
  utter.rate = 1;
  window.speechSynthesis.speak(utter);
}

/** Accessible name of an element: aria-label, alt of an image, or its text. */
function readableText(el: HTMLElement): string {
  return (
    el.getAttribute("aria-label") ||
    (el instanceof HTMLImageElement ? el.alt : "") ||
    (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
      ? `${el.labels?.[0]?.textContent ?? ""} ${el.value || el.placeholder}`
      : "") ||
    el.textContent ||
    ""
  );
}

export default function AccessibilityMenu() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [embedded, setEmbedded] = useState(false);
  const [frameSrc, setFrameSrc] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage; detect the page running inside the mobile-version frame
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<A11yState>;
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore storage errors
    }
    setEmbedded(new URLSearchParams(window.location.search).has(EMBED_FLAG));
    setHydrated(true);
  }, []);

  // Apply visual attributes to <html> (CSS in globals.css)
  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    if (state.specialMode) {
      html.setAttribute("data-a11y-font", String(state.fontScale));
      html.setAttribute("data-a11y-theme", state.theme);
    } else {
      html.removeAttribute("data-a11y-font");
      html.removeAttribute("data-a11y-theme");
    }
    const showFrame = state.mobileView && !embedded;
    html.toggleAttribute("data-mobile-view", showFrame);
    if (showFrame) {
      const url = new URL(window.location.href);
      url.searchParams.set(EMBED_FLAG, "1");
      setFrameSrc(url.pathname + url.search + url.hash);
    }
    if (!embedded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignore
      }
    }
  }, [state, hydrated, embedded]);

  // Voice assistant (Web Speech API): reads clicked / selected / keyboard-focused text
  useEffect(() => {
    if (!state.voiceEnabled || embedded || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    // Chrome loads the voice list asynchronously
    window.speechSynthesis.getVoices();

    const onMouseUp = () => {
      const selected = window.getSelection()?.toString().trim();
      if (selected) speakText(selected, lang);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || wrapRef.current?.contains(target)) return;
      if (window.getSelection()?.toString().trim()) return; // handled by mouseup
      const el = target.closest<HTMLElement>("a, button, h1, h2, h3, h4, p, li, label, td, th, summary, img");
      if (el) speakText(readableText(el), lang);
    };
    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || wrapRef.current?.contains(el) || !el.matches?.(":focus-visible")) return;
      speakText(readableText(el), lang);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.speechSynthesis.cancel();
    };

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("keydown", onKey);
      window.speechSynthesis.cancel();
    };
  }, [state.voiceEnabled, lang, embedded]);

  // Close popover on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Inside the mobile-version frame the page is a plain preview: no menu, no control bar
  if (embedded) return null;

  const isAnyActive = state.specialMode || state.voiceEnabled || state.mobileView;

  const toggleSpecialMode = () => {
    setState((prev) => ({
      ...prev,
      specialMode: !prev.specialMode,
      fontScale: !prev.specialMode ? 115 : 100,
      theme: !prev.specialMode ? "grayscale" : "normal",
    }));
    setOpen(false);
  };

  const toggleVoice = () => {
    setState((prev) => {
      const next = !prev.voiceEnabled;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        if (next) {
          speakText(
            pickText(
              lang,
              "Звуковое сопровождение включено. Нажмите, выделите текст или перейдите к элементу клавишей Tab, чтобы его озвучить.",
              "Ovozli olib borish yoqildi. O‘qib eshittirish uchun matnni bosing, belgilang yoki Tab tugmasi bilan elementga o‘ting.",
              "Voice assistant enabled. Click, select text or move to an element with Tab to hear it read aloud."
            ),
            lang
          );
        }
      }
      return { ...prev, voiceEnabled: next };
    });
    setOpen(false);
  };

  const toggleMobileView = () => {
    setState((prev) => ({ ...prev, mobileView: !prev.mobileView }));
    setOpen(false);
  };

  const resetAll = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setState(DEFAULT_STATE);
  };

  const itemCls = (active: boolean) =>
    `flex w-full cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[15px] font-medium transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-[#110C30] ${
      active ? "bg-black/10 font-bold" : ""
    }`;

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger button in Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={pickText(lang, "Специальные возможности", "Maxsus imkoniyatlar", "Accessibility options")}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors ${
          open || isAnyActive ? "bg-[#FFD95A] text-[#110C30]" : "text-[#110C30] hover:bg-[#F2F4F7]"
        }`}
      >
        <Glasses size={18} aria-hidden />
      </button>

      {/* Dropdown popover matching trustbank.uz special-version menu */}
      {open && (
        <div
          role="group"
          aria-label={pickText(lang, "Специальные возможности", "Maxsus imkoniyatlar", "Accessibility options")}
          className="absolute right-0 top-full z-[60] mt-2 w-[310px] max-w-[calc(100vw-32px)] rounded-[14px] bg-[#FFD95A] p-4 text-[#110C30] shadow-[0_14px_36px_rgba(17,12,48,0.18)]"
        >
          <div className="flex flex-col gap-2">
            <button type="button" onClick={toggleSpecialMode} aria-pressed={state.specialMode} className={itemCls(state.specialMode)}>
              <EyeOff size={20} className="shrink-0" aria-hidden />
              <span>{pickText(lang, "Версия для слабовидящих", "Ko‘z nuri pastlar uchun sayt talqini", "Visually impaired version")}</span>
            </button>

            <button type="button" onClick={toggleVoice} aria-pressed={state.voiceEnabled} className={itemCls(state.voiceEnabled)}>
              {state.voiceEnabled ? <VolumeX size={20} className="shrink-0" aria-hidden /> : <Volume2 size={20} className="shrink-0" aria-hidden />}
              <span>
                {pickText(
                  lang,
                  state.voiceEnabled ? "Выключить звуковое сопровождение" : "Звуковое сопровождение",
                  state.voiceEnabled ? "Ovozli olib borishni o‘chirish" : "Ovozli olib borish",
                  state.voiceEnabled ? "Disable voice assist" : "Voice assist"
                )}
              </span>
            </button>

            {/* On a phone the site already is the mobile version */}
            <button type="button" onClick={toggleMobileView} aria-pressed={state.mobileView} className={`${itemCls(state.mobileView)} max-md:hidden`}>
              <Smartphone size={20} className="shrink-0" aria-hidden />
              <span className="underline underline-offset-4">
                {pickText(
                  lang,
                  state.mobileView ? "Полная версия" : "Мобильная версия",
                  state.mobileView ? "To‘liq talqin" : "Mobil talqin",
                  state.mobileView ? "Full version" : "Mobile version"
                )}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* «Mobile version»: the current page in a phone-width frame, so the real mobile layout is shown */}
      {state.mobileView && frameSrc ? (
        <div className="fixed inset-0 z-[65] flex justify-center overflow-auto bg-[#E9EDF5] py-4">
          <iframe
            key={lang}
            src={frameSrc}
            title={pickText(lang, "Мобильная версия сайта", "Saytning mobil talqini", "Mobile version of the site")}
            style={{ width: MOBILE_FRAME_WIDTH }}
            className="h-full shrink-0 rounded-[28px] border-[10px] border-[#110C30] bg-white shadow-2xl"
          />
        </div>
      ) : null}

      {/* Floating Accessibility Control Bar when Special Mode / Voice / Mobile View is active */}
      {isAnyActive && (
        <div
          role="toolbar"
          aria-label={pickText(lang, "Панель специальных возможностей", "Maxsus imkoniyatlar paneli", "Accessibility toolbar")}
          className="fixed bottom-4 left-1/2 z-[70] flex max-w-[calc(100vw-24px)] -translate-x-1/2 flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#110C30]/15 bg-[#FFD95A] px-4 py-2.5 text-[13px] font-semibold text-[#110C30] shadow-2xl"
        >
          {state.specialMode && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] opacity-80">{pickText(lang, "Шрифт:", "Shrift:", "Font:")}</span>
                {([100, 115, 130] as FontScale[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setState((p) => ({ ...p, fontScale: s }))}
                    aria-pressed={state.fontScale === s}
                    aria-label={`${pickText(lang, "Размер шрифта", "Shrift o‘lchami", "Font size")} ${s}%`}
                    className={`cursor-pointer rounded-md px-2 py-1 ${state.fontScale === s ? "bg-[#110C30] text-white" : "bg-white/60 hover:bg-white"}`}
                  >
                    {s === 100 ? "A" : s === 115 ? "A+" : "A++"}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[12px] opacity-80">{pickText(lang, "Цвет:", "Rang:", "Theme:")}</span>
                {(
                  [
                    { id: "normal", label: ["Обычные цвета", "Oddiy ranglar", "Normal colours"], cls: "bg-white text-black" },
                    { id: "grayscale", label: ["Чёрно-белая", "Oq-qora", "Greyscale"], cls: "bg-neutral-300 text-black" },
                    { id: "contrast-dark", label: ["Тёмная контрастная", "Qorong‘i kontrast", "Dark high contrast"], cls: "bg-black text-white" },
                    { id: "contrast-yellow", label: ["Жёлтая на чёрном", "Qora fonda sariq", "Yellow on black"], cls: "bg-black text-[#FFD95A]" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setState((p) => ({ ...p, theme: t.id }))}
                    aria-pressed={state.theme === t.id}
                    aria-label={pickText(lang, t.label[0], t.label[1], t.label[2])}
                    className={`h-7 w-7 cursor-pointer rounded-md border border-black/20 font-bold ${t.cls} ${state.theme === t.id ? "ring-2 ring-[#2D68FF]" : ""}`}
                  >
                    A
                  </button>
                ))}
              </div>
            </>
          )}

          {state.voiceEnabled && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/10 px-2.5 py-1 text-[12px]">
              <Volume2 size={14} aria-hidden />
              {pickText(lang, "Озвучка активна", "Ovozli rejim yoqilgan", "Voice active")}
            </span>
          )}

          {state.mobileView && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/10 px-2.5 py-1 text-[12px]">
              <Smartphone size={14} aria-hidden />
              {pickText(lang, "Мобильный вид", "Mobil talqin", "Mobile view")}
            </span>
          )}

          <button
            type="button"
            onClick={resetAll}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-[#110C30] px-3 py-1 text-[12px] text-white hover:bg-black"
          >
            <X size={14} aria-hidden />
            <span>{pickText(lang, "Обычная версия", "Oddiy talqin", "Standard version")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
