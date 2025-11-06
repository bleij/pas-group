"use client";

import Image from "next/image";
import Link from "next/link";
import {Variants, motion} from "framer-motion";

type Props = {
    bg?: string;
    title?: string;
    description?: string;
    primaryText?: string;
    secondaryText?: string;
    imgPosMobile?: string;
    imgPosDesktop?: string;
    overlayDesktopColor?: string;
    overlayDesktopOpacity?: number;
    overlayDesktopBlur?: string;
    overlayDesktopClip?: string;
    overlayDesktopWidth?: string;
    overlayMobileColor?: string;
    overlayMobileOpacity?: number;
    overlayMobileBlur?: string;
    overlayMobileClip?: string;
    overlayMobileWidth?: string;
    titleSize?: string;
    descSize?: string;
    titleSizeDesktop?: string;
    titleSizeMobile?: string;
    titleWeight?: string;
    descSizeDesktop?: string;
    descSizeMobile?: string;
    descWeight?: string;
};

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 40},
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {delay: i * 0.2, duration: 0.6, ease: "easeOut"},
    }),
};

export default function HeroLanding({
                                        bg = "/hero-bg.png",
                                        title = "Энергетика и автоматизация «под ключ»",
                                        description = "Поставка, сборка и монтаж трансформаторных подстанций, распределительных устройств и систем электроснабжения. Команда с 29+ годами экспертизы. 12+ лет без инцидентов эксплуатации.",
                                        primaryText = "Получить консультацию",
                                        secondaryText = "Получить КП",
                                        imgPosMobile = "87% center",
                                        imgPosDesktop = "center",
                                        overlayDesktopColor = "#215491",
                                        overlayDesktopOpacity = 0.3,
                                        overlayDesktopBlur = "6px",
                                        overlayDesktopClip = "polygon(-4% 0, 48% 0, 74% 100%, 20% 100%)",
                                        overlayDesktopWidth = "86%",
                                        overlayMobileColor = "#215491",
                                        overlayMobileOpacity = 0.3,
                                        overlayMobileBlur = "6px",
                                        overlayMobileClip = "polygon(0 0, 75% 0, 100% 100%, 0 100%)",
                                        overlayMobileWidth = "100%",
                                        titleSize = "46px",
                                        descSize = "20px",
                                        titleSizeDesktop = "46px",
                                        titleSizeMobile = "28px",
                                        titleWeight = "700",
                                        descSizeDesktop = "20px",
                                        descSizeMobile = "14px",
                                        descWeight = "400",
                                    }: Props) {
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
            {/* фоновая анимация */}
            <motion.div
                className="absolute inset-0"
                initial={{filter: "blur(18px)", opacity: 0.3}}
                animate={{filter: "blur(0px)", opacity: 1}}
                transition={{duration: 0.8, ease: "easeOut"}}
            >
                <Image
                    src={bg}
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover [object-position:var(--hero-pos-m)] md:[object-position:var(--hero-pos-d)]"
                />

                {/* затемнение */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none"/>
            </motion.div>

            {/* desktop overlay */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
                <motion.div
                    className="absolute left-0 top-0 h-full"
                    initial={{opacity: 0, x: -320, scale: 1.02}}
                    animate={{opacity: 1, x: 0, scale: 1}}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                    }}
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

            {/* mobile overlay */}
            <div className="pointer-events-none absolute inset-0 md:hidden">
                <motion.div
                    className="absolute left-0 top-0 h-full"
                    initial={{opacity: 0, x: -100, scale: 1.05}}
                    animate={{opacity: 1, x: 0, scale: 1}}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        delay: 0.25,
                    }}
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
                    <div className="text-white max-w-[520px] mr-20">
                        <motion.h1
                            className="leading-[1.12]"
                            initial="hidden"
                            whileInView="visible"
                            variants={fadeUp}
                            viewport={{once: true}}
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
                        </motion.h1>

                        <motion.p
                            className="mt-6 leading-relaxed opacity-95"
                            variants={fadeUp}
                            custom={1.2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true}}
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
                        </motion.p>

                        {/* кнопки */}
                        <motion.div
                            className="mt-8 flex flex-wrap gap-y-4 gap-x-4 text-lg"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.4}}
                            viewport={{once: true}}
                        >
                            <motion.div
                                className="flex"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                transition={{type: "spring", stiffness: 180, damping: 10}}
                            >
                                <Link
                                    href="/contacts"
                                    className="inline-flex items-center justify-center rounded-[12px] px-6 py-3 bg-[#009999] text-white font-medium hover:bg-[#007A7A] transition whitespace-nowrap min-h-[48px]"
                                >
                                    {primaryText}
                                </Link>
                            </motion.div>

                            <motion.div
                                className="flex"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                transition={{type: "spring", stiffness: 180, damping: 10}}
                            >
                                <Link
                                    href="/contacts"
                                    className="inline-flex items-center justify-center rounded-[12px] px-6 py-3 bg-[#E5E7EB] text-[#374151] font-medium hover:bg-[#A5A7AA] transition whitespace-nowrap min-h-[48px]"
                                >
                                    {secondaryText}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}