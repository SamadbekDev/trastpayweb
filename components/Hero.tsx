import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full pb-15 pt-8">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="relative mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[620px] overflow-hidden rounded-[28px] lg:rounded-[36px] text-white shadow-2xl bg-gradient-to-r from-[#08243f] via-[#0f3d68] to-[#1b5a96]">
          <div className="relative z-10 flex flex-col justify-center items-start w-full lg:w-[55%] h-full px-6 sm:px-12 lg:pl-[90px] lg:pr-0 py-12 lg:py-0">
            <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-white mb-6">
              Откройте банковский счет бесплатно
              <br />
              <span className="bg-gradient-to-r from-[#82c9ff] to-[#b3e0ff] bg-clip-text text-transparent">
                в мобильном приложении
              </span>
            </h1>

            <a
              href="#mobile-app"
              className="inline-flex h-[52px] items-center justify-center rounded-[14px] bg-white px-8 text-[16px] font-bold text-[#08243f] shadow-lg hover:shadow-xl hover:bg-[#f3f7fc] active:scale-95 transition-all duration-200"
            >
              Скачать приложение
            </a>
          </div>

          <div className="relative w-full lg:w-[45%] h-[300px] sm:h-[380px] lg:h-full flex items-center justify-center px-6 lg:px-0 pb-8 lg:pb-0 z-10">
            <div className="relative w-[320px] h-[260px] sm:w-[400px] sm:h-[330px] lg:w-[490px] lg:h-[460px] transition-transform duration-700 hover:scale-105">
              <Image
                src="/images/hero_bank_account.svg"
                alt="Откройте банковский счет бесплатно"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 490px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
