"use client";

import Image from "next/image";

type Props = {
    bg?: string;
    title?: string;
    description?: string;
    primaryText?: string;
    secondaryText?: string;
};

export default function HeroLanding({
                                        bg = "/hero-bg.png",
                                        title = "Энергетика и автоматизация «под ключ»",
                                        description = "Поставка, сборка и монтаж трансформаторных подстанций, распределительных устройств и систем электроснабжения. Команда с 29+ годами экспертизы. 12+ лет без инцидентов эксплуатации.",
                                        primaryText = "Получить консультацию",
                                        secondaryText = "Получить КП",
                                    }: Props) {
    return (
        <section className="relative w-full min-h-[100svh] md:min-h-screen overflow-hidden font-sans">
            {/* фон */}
            <Image src={bg} alt="Hero background" fill priority className="object-cover"/>

            {/* затемнение фона 20% */}
            <div className="absolute inset-0 bg-black/20"/>

            {/* диагональная плашка — desktop */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
                <div
                    className="absolute left-0 top-0 h-full w-[86%]"
                    style={{
                        background: "#2154914D",
                        backdropFilter: "blur(2px)",
                        clipPath: "polygon(-10% 0, 62% 0, 86% 100%, 6% 100%)",
                    }}
                />
            </div>

            {/* диагональная плашка — mobile */}
            <div className="pointer-events-none absolute inset-0 md:hidden">
                <div
                    className="absolute left-0 top-0 h-full w-[90%]"
                    style={{
                        background: "#2154914D",
                        backdropFilter: "blur(2px)",
                        clipPath: "polygon(0 0, 70% 0, 90% 100%, 0 100%)",
                    }}
                />
            </div>

            {/* контент */}
            <div className="absolute inset-0 z-10">
                <div className="h-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-12 flex items-center">
                    <div className="text-white max-w-[720px]">
                        <h1 className="text-[28px] md:text-[46px] font-bold leading-[1.12]">
                            {title}
                        </h1>

                        <p className="mt-6 text-[15px] md:text-[18px] leading-relaxed opacity-95 font-regular">
                            {description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button
                                className="rounded-[12px] px-6 py-3 bg-[#009999] text-white font-medium hover:bg-[#007A7A] transition">
                                {primaryText}
                            </button>

                            <button
                                className="rounded-[12px] px-6 py-3 bg-[#E5E7EB] text-[#374151] font-medium hover:bg-[#A5A7AA] transition">
                                {secondaryText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}