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

    // desktop-плашка
    overlayDesktopColor?: string;
    overlayDesktopOpacity?: number;
    overlayDesktopBlur?: string;
    overlayDesktopClip?: string;
    overlayDesktopWidth?: string;

    // mobile-плашка
    overlayMobileColor?: string;
    overlayMobileOpacity?: number;
    overlayMobileBlur?: string;
    overlayMobileClip?: string;
    overlayMobileWidth?: string;

    // шрифты
    titleSize?: string; // ✅ универсальный вариант
    descSize?: string;  // ✅ универсальный вариант
    titleSizeDesktop?: string;
    titleSizeMobile?: string;
    titleWeight?: string;
    descSizeDesktop?: string;
    descSizeMobile?: string;
    descWeight?: string;
};

export default function HeroLanding({
                                        bg = "/hero-bg.png",
                                        title = "Энергетика и автоматизация «под ключ»",
                                        description = "Поставка, сборка и монтаж трансформаторных подстанций...",
                                        primaryText = "Получить консультацию",
                                        secondaryText = "Получить КП",

                                        imgPosMobile = "87% center",
                                        imgPosDesktop = "center",

                                        overlayDesktopColor = "#215491",
                                        overlayDesktopOpacity = 0.3,
                                        overlayDesktopBlur = "2px",
                                        overlayDesktopClip = "polygon(-14% 0, 48% 0, 74% 100%, 10% 100%)",
                                        overlayDesktopWidth = "86%",

                                        overlayMobileColor = "#215491",
                                        overlayMobileOpacity = 0.3,
                                        overlayMobileBlur = "2px",
                                        overlayMobileClip = "polygon(0 0, 75% 0, 100% 100%, 0 100%)",
                                        overlayMobileWidth = "100%",

                                        titleSize = "46px",  // ✅ fallback
                                        descSize = "20px",   // ✅ fallback
                                        titleSizeDesktop = "46px",
                                        titleSizeMobile = "28px",
                                        titleWeight = "700",
                                        descSizeDesktop = "20px",
                                        descSizeMobile = "14px",
                                        descWeight = "400",
                                    }: Props) {
    // автоматически применяем короткие параметры (если есть)
    const finalTitleDesktop = titleSize || titleSizeDesktop;
    const finalDescDesktop = descSize || descSizeDesktop;

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
            <Image
                src={bg}
                alt="Hero background"
                fill
                priority
                className="object-cover [object-position:var(--hero-pos-m)] md:[object-position:var(--hero-pos-d)]"
            />

            <div className="absolute inset-0 bg-black/20"/>

            {/* desktop-плашка */}
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

            {/* mobile-плашка */}
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
                    <div className="text-white max-w-[520px]">
                        <h1
                            className="leading-[1.12]"
                            style={{
                                fontWeight: titleWeight,
                                fontSize: titleSizeMobile,
                            }}
                        >
              <span
                  className="hidden md:inline"
                  style={{fontSize: finalTitleDesktop}}
              >
                {title}
              </span>
                            <span className="md:hidden">{title}</span>
                        </h1>

                        <p
                            className="mt-6 leading-relaxed opacity-95"
                            style={{
                                fontWeight: descWeight,
                                fontSize: descSizeMobile,
                            }}
                        >
              <span
                  className="hidden md:inline"
                  style={{fontSize: finalDescDesktop}}
              >
                {description}
              </span>
                            <span className="md:hidden">{description}</span>
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