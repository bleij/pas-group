"use client";

import {useEffect, useState, useCallback} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import type {CertificateNode} from "@/lib/queries/certificates";
import {ChevronLeft, ChevronRight, X} from "lucide-react";

type Props = {
    items: CertificateNode[];
    title?: string;
    showMoreHref?: string;
    greyBg?: boolean; // оставил на будущее, но не используем
};

export default function CertificatesClient({
                                               items,
                                               title,
                                               showMoreHref,
                                           }: Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="w-full py-16">{/* белый фон */}
            <div className="max-w-7xl mx-auto px-6">
                {title && (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
                        <div className="h-1 w-32 bg-[#009999] mb-8"/>
                    </>
                )}

                {/* mobile: свайпер по одному */}
                <div className="md:hidden">
                    <Swiper spaceBetween={16} slidesPerView={1.08}>
                        {items.map((c, i) => (
                            <SwiperSlide key={c.id}>
                                <button
                                    className="group rounded-xl overflow-hidden bg-white w-full"
                                    onClick={() => setActiveIndex(i)}
                                >
                                    <Thumb item={c}/>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* desktop: сетка 4 колонки */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((c, i) => (
                        <button
                            key={c.id}
                            className="group rounded-xl overflow-hidden bg-white"
                            onClick={() => setActiveIndex(i)}
                        >
                            <Thumb item={c}/>
                        </button>
                    ))}
                </div>

                {showMoreHref && (
                    <div className="mt-10">
                        <a
                            href={showMoreHref}
                            className="inline-block px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium text-xl text-[#374151]"
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
        <div className="relative w-full h-64 md:h-56 lg:h-56 bg-white">
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

/* -------- Lightbox with slide/swipe ---------- */

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
    const [swiper, setSwiper] = useState<any>(null);

    // sync when opening a different image
    useEffect(() => {
        if (typeof index === "number") {
            setCurrent(index);
            if (swiper) swiper.slideTo(index, 0);
        }
    }, [index, swiper]);

    // lock body scroll
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
                className="fixed inset-0 z-50"
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
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/90 hover:bg-white"
                        aria-label="Закрыть"
                    >
                        <X className="w-5 h-5"/>
                    </button>

                    {/* Prev/Next — только на md+ */}
                    <button
                        onClick={() => swiper?.slidePrev()}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white"
                        aria-label="Предыдущий"
                    >
                        <ChevronLeft className="w-6 h-6"/>
                    </button>
                    <button
                        onClick={() => swiper?.slideNext()}
                        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white"
                        aria-label="Следующий"
                    >
                        <ChevronRight className="w-6 h-6"/>
                    </button>

                    {/* Swiper — даёт слайд-переход + свайпы на мобилке */}
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
