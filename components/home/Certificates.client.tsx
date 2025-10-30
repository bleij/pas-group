"use client";

import {useEffect, useState, useCallback} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import type {Swiper as SwiperClass} from "swiper";
import "swiper/css";
import type {CertificateNode} from "@/lib/queries/certificates";
import {X} from "lucide-react";

type Props = {
    items: CertificateNode[];
    title?: string;
    showMoreHref?: string;
    greyBg?: boolean;
};

export default function CertificatesClient({
                                               items,
                                               title,
                                               showMoreHref,
                                           }: Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="certificates" className="w-full py-8 sm:py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {title && (
                    <>
                        <h2 className="text-[20px] sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-4">
                            {title}
                        </h2>
                        <div className="h-1 w-24 sm:w-32 bg-[#009999] mb-5 sm:mb-8"/>
                    </>
                )}

                {/* mobile */}
                <div className="md:hidden">
                    <Swiper
                        spaceBetween={8}
                        slidesPerView={2}
                        breakpoints={{
                            640: {slidesPerView: 3, spaceBetween: 12},
                            1024: {slidesPerView: 4, spaceBetween: 20},
                        }}
                    >
                        {items.map((c, i) => (
                            <SwiperSlide key={c.id}>
                                <button
                                    className="cursor-pointer w-full"
                                    onClick={() => setActiveIndex(i)}
                                >
                                    <Thumb item={c}/>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* desktop */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((c, i) => (
                        <button
                            key={c.id}
                            className="cursor-pointer bg-white"
                            onClick={() => setActiveIndex(i)}
                        >
                            <Thumb item={c}/>
                        </button>
                    ))}
                </div>

                {showMoreHref && (
                    <div className="mt-6 sm:mt-10 flex justify-start">
                        <a
                            href={showMoreHref}
                            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
                        >
                            Посмотреть все
                        </a>
                    </div>
                )}
            </div>

            <Lightbox
                items={items}
                index={activeIndex}
                onClose={() => setActiveIndex(null)}
            />
        </section>
    );
}

function Thumb({item}: { item: CertificateNode }) {
    const src = item.featuredImage?.node?.sourceUrl;
    const alt = item.featuredImage?.node?.altText || item.title || "";

    return (
        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] bg-white">
            {src && (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain"
                    draggable={false}
                />
            )}
        </div>
    );
}

/* -------- Lightbox ---------- */

function Lightbox({
                      items,
                      index,
                      onClose,
                  }: {
    items: CertificateNode[];
    index: number | null;
    onClose: () => void;
}) {
    const open = typeof index === "number" && index >= 0;
    const [current, setCurrent] = useState(index ?? 0);
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);

    useEffect(() => {
        if (typeof index === "number") {
            setCurrent(index);
            if (swiper) swiper.slideTo(index, 0);
        }
    }, [index, swiper]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const onKey = useCallback(
        (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") swiper?.slidePrev();
            if (e.key === "ArrowRight") swiper?.slideNext();
        },
        [open, onClose, swiper]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onKey]);

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[999]"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <div
                    className="absolute inset-0 bg-black/80"
                    onClick={onClose}
                    aria-hidden
                />
                <div className="relative z-10 h-full w-full flex items-center justify-center px-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/90 hover:bg-white"
                    >
                        <X className="w-5 h-5"/>
                    </button>

                    <motion.div
                        className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]"
                        initial={{scale: 0.98, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.98, opacity: 0}}
                        transition={{duration: 0.18}}
                    >
                        <Swiper
                            onSwiper={setSwiper}
                            initialSlide={current}
                            onSlideChange={(s) => setCurrent(s.activeIndex)}
                            slidesPerView={1}
                            spaceBetween={0}
                            allowTouchMove
                            className="w-full h-full"
                        >
                            {items.map((c) => {
                                const src = c.featuredImage?.node?.sourceUrl || "";
                                const alt = c.featuredImage?.node?.altText || c.title || "";
                                return (
                                    <SwiperSlide key={c.id}>
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={src}
                                                alt={alt}
                                                fill
                                                sizes="100vw"
                                                className="object-contain select-none"
                                                draggable={false}
                                                priority
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}