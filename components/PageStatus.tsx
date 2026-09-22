"use client";

import Image from "next/image";
import { AlertCircle, RefreshCw } from "lucide-react";

export function TrastbankLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Glowing animated spinner ring */}
        <div className="h-24 w-24 rounded-full border-4 border-slate-100 border-t-[#08243f] border-r-[#126df7] animate-spin" />

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Trastbank Logo"
            width={48}
            height={48}
            className="object-contain animate-pulse"
            priority
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-1.5">
        <h3 className="font-bold text-[#08243f] text-lg tracking-wide uppercase">
          TRASTBANK
        </h3>
      </div>
    </div>
  );
}

interface TrastbankErrorProps {
  onRetry?: () => void;
}

export function TrastbankError({ onRetry }: TrastbankErrorProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(8,36,63,0.12)] border border-slate-100 flex flex-col items-center text-center">
      <div className="mb-6 flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Trastbank Logo"
          width={110}
          height={36}
          className="object-contain"
        />
      </div>

      <div className="h-16 w-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6">
        <AlertCircle size={36} />
      </div>

      <h2 className="text-2xl font-bold text-[#08243f] mb-3">
        Сервис временно недоступен
      </h2>

      <p className="text-slate-500 text-sm leading-relaxed mb-8">
        К сожалению, не удалось загрузить данные страницы. Пожалуйста, проверьте
        подключение к сети или повторите попытку позже.
      </p>

      <button
        onClick={onRetry || (() => window.location.reload())}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#08243f] text-white font-bold text-sm hover:bg-[#0c345a] active:scale-[0.98] transition-all cursor-pointer shadow-md"
      >
        <RefreshCw size={18} />
        <span>Повторить попытку</span>
      </button>
    </div>
  );
}
