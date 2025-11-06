"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Keyboard } from "swiper/modules"
import { X } from "lucide-react"
import Link from "next/link"
import "swiper/css"
import "swiper/css/navigation"
import type { Swiper as SwiperClass } from "swiper"
import type { CertificateNode } from "@/lib/queries/certificates"

/* ---------- Универсальная анимация ---------- */
const blurFade = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
    },
    exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
    },
}

export default function CertificatesClient({ items, title, showMoreHref }: { items: CertificateNode[]; title?: string; showMoreHref?: string }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveIndex(null)
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    return (
        <section id="certificates" className="w-full py-8 sm:py-10 md:py-16">
            <motion.div
                variants={blurFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-7xl mx-auto px-4 sm:px-6"
            >
                {/* Заголовок */}
                {title && (
                    <motion.div variants={blurFade}>
                        <h2 className="text-[20px] sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-5">
                            {title}
                        </h2>
                        <motion.div
                            className="h-1 w-24 sm:w-32 bg-[#009999] mb-5"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            style={{ originX: 0 }}
                        />
                    </motion.div>
                )}

                {/* Mobile */}
                <motion.div variants={blurFade} className="md:hidden w-full overflow-hidden">
                    <Swiper
                        slidesPerView={1.3}
                        spaceBetween={10}
                        breakpoints={{
                            480: { slidesPerView: 1.8, spaceBetween: 12 },
                            640: { slidesPerView: 2.5, spaceBetween: 14 },
                            768: { slidesPerView: 3, spaceBetween: 16 },
                        }}
                        className="w-full"
                    >
                        {items.map((c, i) => (
                            <SwiperSlide key={c.id} className="flex items-center justify-center">
                                <motion.button
                                    onClick={() => setActiveIndex(i)}
                                    className="cursor-pointer w-full"
                                    whileHover={{
                                        scale: 1.04,
                                        boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
                                        transition: { duration: 0.15 },
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <Thumb item={c} />
                                </motion.button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Desktop */}
                <motion.div
                    variants={blurFade}
                    className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {items.map((c, i) => (
                        <motion.button
                            key={c.id}
                            onClick={() => setActiveIndex(i)}
                            className="cursor-pointer bg-white"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
                                transition: { duration: 0.15 },
                            }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <Thumb item={c} />
                        </motion.button>
                    ))}
                </motion.div>

                {/* кнопка */}
                {showMoreHref && (
                    <motion.div
                        className="mt-6 sm:mt-10 flex justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 180, damping: 10 }}
                        >
                            <Link
                                href={showMoreHref}
                                className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
                            >
                                Посмотреть все
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            <Lightbox items={items} index={activeIndex} onClose={() => setActiveIndex(null)} />
        </section>
    )
}

/* ---------- Превью ---------- */
function Thumb({ item }: { item: CertificateNode }) {
    const src = item.featuredImage?.node?.sourceUrl
    const alt = item.featuredImage?.node?.altText || item.title || ""
    return (
        <div className="relative w-full h-[220px] sm:h-[260px] bg-white">
            {src && (
                <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 768px) 100vw, 25vw" draggable={false} />
            )}
        </div>
    )
}

/* ---------- Модалка ---------- */
function Lightbox({ items, index, onClose }: { items: CertificateNode[]; index: number | null; onClose: () => void }) {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null)
    const isOpen = index !== null

    useEffect(() => {
        if (isOpen && typeof index === "number") swiper?.slideTo(index, 0)
    }, [isOpen, index, swiper])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
    }, [isOpen])

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") swiper?.slidePrev()
            if (e.key === "ArrowRight") swiper?.slideNext()
        },
        [isOpen, swiper, onClose]
    )

    useEffect(() => {
        document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [handleKey])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="overlay"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={blurFade}
                    className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-auto"
                    onClick={onClose}
                    style={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <motion.div
                        key="modal"
                        onClick={(e) => e.stopPropagation()}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={blurFade}
                        className="relative w-[92vw] max-w-[880px] rounded-xl bg-white shadow-xl overflow-hidden"
                    >
                        <motion.button
                            onClick={onClose}
                            whileHover={{ rotate: 90, scale: 1.08 }}
                            transition={{ duration: 0.25 }}
                            className="absolute top-3 right-3 z-10 p-2 text-gray-500 hover:text-gray-800"
                        >
                            <X size={24} />
                        </motion.button>

                        <Swiper
                            modules={[Navigation, Keyboard]}
                            navigation
                            keyboard={{ enabled: true }}
                            initialSlide={index ?? 0}
                            slidesPerGroup={1}
                            slidesPerView={1}
                            spaceBetween={0}
                            className="relative h-[60vh] md:h-[64vh]"
                        >
                            {items.map((c) => {
                                const src = c.featuredImage?.node?.sourceUrl || ""
                                const alt = c.featuredImage?.node?.altText || c.title || ""
                                return (
                                    <SwiperSlide key={c.id}>
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={blurFade}
                                            className="flex items-center justify-center h-full w-full p-6"
                                        >
                                            <Image
                                                src={src}
                                                alt={alt}
                                                fill
                                                className="object-contain select-none"
                                                draggable={false}
                                                priority
                                            />
                                        </motion.div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}