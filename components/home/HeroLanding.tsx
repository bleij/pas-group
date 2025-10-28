"use client";

import Image from "next/image";

type Props = {
    bg?: string;
    title?: string;
    description?: string;
    primaryText?: string;
    secondaryText?: string;

    // позиционирование фона
    imgPosMobile?: string;
    imgPosDesktop?: string;

    // плашка desktop
    overlayDesktopColor?: string;
    overlayDesktopOpacity?: number;
    overlayDesktopBlur?: string;
    overlayDesktopClip?: string;
    overlayDesktopWidth?: string;

    // плашка mobile
    overlayMobileColor?: string;
    overlayMobileOpacity?: number;
    overlayMobileBlur?: string;
    overlayMobileClip?: string;
    overlayMobileWidth?: string;

    // шрифты
    titleSize?: string;
    titleWeight?: string;
    descSize?: string;
    descWeight?: string;
};

export default function HeroLanding({
                                        bg = "/hero-bg.png",
                                        title = "Энергетика и автоматизация «под ключ»",
                                        description = "Поставка, сборка и монтаж трансформаторных подстанций, распределительных устройств и систем электроснабжения. Команда с 29+ годами экспертизы. 12+ лет без инцидентов эксплуатации.",
                                        primaryText = "Получить консультацию",
                                        secondaryText = "Получить КП",

                                        imgPosMobile = "87% center",
                                        imgPosDesktop = "center",

                                        // desktop
                                        overlayDesktopColor = "#215491",
                                        overlayDesktopOpacity = 0.3,
                                        overlayDesktopBlur = "2px",
                                        overlayDesktopClip = "polygon(-14% 0, 48% 0, 74% 100%, 10% 100%)",
                                        overlayDesktopWidth = "86%",

                                        // mobile
                                        overlayMobileColor = "#215491",
                                        overlayMobileOpacity = 0.3,
                                        overlayMobileBlur = "2px",
                                        overlayMobileClip = "polygon(0 0, 75% 0, 100% 100%, 0 100%)",
                                        overlayMobileWidth = "100%",

                                        // текст
                                        titleSize = "46px",
                                        titleWeight = "700",
                                        descSize = "20px",
                                        descWeight = "400",
                                    }: Props) {
    return (
        <section
            className="relative w-full min-h-[100svh] md:min-h-screen overflow-hidden font-sans"
            style={
                {
                    "--hero-pos-m": imgPosMobile,
                    "--hero-pos-d": imgPosDesktop,
                } as React.CSSProperties
            }
        >
            {/* фон */}
            <Image
                src={bg}
                alt="Hero background"
                fill
                priority
                className="object-cover [object-position:var(--hero-pos-m)] md:[object-position:var(--hero-pos-d)]"
            />

            {/* затемнение */}
            <div className="absolute inset-0 bg-black/20"/>

            {/* плашка desktop */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
                <div
                    className="absolute left-0 top-0 h-full"
                    style={{
                        width: overlayDesktopWidth,
                        background: `${overlayDesktopColor}${Math.round(
                            overlayDesktopOpacity * 255
                        )
                            .toString(16)
                            .padStart(2, "0")}`,
                        backdropFilter: `blur(${overlayDesktopBlur})`,
                        clipPath: overlayDesktopClip,
                    }}
                />
            </div>

            {/* плашка mobile */}
            <div className="pointer-events-none absolute inset-0 md:hidden">
                <div
                    className="absolute left-0 top-0 h-full"
                    style={{
                        width: overlayMobileWidth,
                        background: `${overlayMobileColor}${Math.round(
                            overlayMobileOpacity * 255
                        )
                            .toString(16)
                            .padStart(2, "0")}`,
                        backdropFilter: `blur(${overlayMobileBlur})`,
                        clipPath: overlayMobileClip,
                    }}
                />
            </div>

            {/* контент */}
            <div className="absolute inset-0 z-10">
                <div className="h-full max-w-[1240px] mx-auto px-6 md:px-0 flex items-center">
                    <div className="text-white max-w-[480px] md:max-w-[500px] lg:max-w-[520px]">
                        <h1
                            style={{
                                fontSize: titleSize,
                                fontWeight: titleWeight,
                            }}
                            className="text-[28px] sm:text-[30px] md:text-[32px] leading-[1.12]"
                        >
                            {title}
                        </h1>

                        <p
                            style={{
                                fontSize: descSize,
                                fontWeight: descWeight,
                            }}
                            className="mt-6 text-[14px] sm:text-[16px] md:text-[20px] leading-relaxed opacity-95"
                        >
                            {description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-lg">
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