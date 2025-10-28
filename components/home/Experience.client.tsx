// components/home/Experience.client.tsx
"use client";

import {useState} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import type {CaseNode} from "@/lib/queries/experience";

type Props = { items: CaseNode[] };

export default function ExperienceClient({items}: Props) {
    const [active, setActive] = useState<CaseNode | null>(null);

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Наш опыт</h2>
                <div className="h-1 w-32 bg-[#009999] mb-8"></div>

                {/* mobile slider */}
                <div className="md:hidden">
                    <Swiper spaceBetween={16} slidesPerView={1.08}>
                        {items.map((c) => (
                            <SwiperSlide key={c.id}>
                                <Card data={c} onMore={() => setActive(c)}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* desktop grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-10">
                    {items.map((c) => (
                        <Card key={c.id} data={c} onMore={() => setActive(c)}/>
                    ))}
                </div>
            </div>

            {/* modal */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 z-50"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <div
                            className="absolute inset-0 bg-black/60"
                            onClick={() => setActive(null)}
                            aria-hidden
                        />
                        <motion.div
                            className="relative z-10 mx-auto max-w-3xl w-[92%] md:w-[80%] bg-white rounded-2xl p-6 md:p-8"
                            initial={{y: 24, scale: 0.98, opacity: 0}}
                            animate={{y: 0, scale: 1, opacity: 1}}
                            exit={{y: 24, scale: 0.98, opacity: 0}}
                            transition={{duration: 0.18}}
                        >
                            {active.featuredImage?.node?.sourceUrl && (
                                <div className="relative w-full h-56 md:h-80 mb-6">
                                    <Image
                                        src={active.featuredImage.node.sourceUrl}
                                        alt={active.featuredImage.node.altText || active.title}
                                        fill
                                        className="object-cover rounded-xl"
                                        priority
                                    />
                                </div>
                            )}
                            <h4 className="text-xl md:text-2xl font-bold mb-3">{active.title}</h4>
                            <p className="text-gray-700 whitespace-pre-line mb-6">
                                {active.caseFields?.fullDescription ||
                                    active.caseFields?.shortDescription}
                            </p>
                            <button
                                onClick={() => setActive(null)}
                                className="px-5 py-2 rounded-[12px] bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
                            >
                                Закрыть
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function Card({data, onMore}: { data: CaseNode; onMore: () => void }) {
    return (
        <div className="flex flex-col">
            <div className="relative w-full h-56 md:h-[260px] rounded-2xl overflow-hidden">
                {data.featuredImage?.node?.sourceUrl ? (
                    <Image
                        src={data.featuredImage.node.sourceUrl}
                        alt={data.featuredImage.node.altText || data.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-200"/>
                )}
            </div>

            <h3 className="font-semibold text-lg md:text-xl mt-5 mb-2">
                {data.title}
            </h3>

            <p className="text-sm text-gray-700 mb-4">
                {data.caseFields?.shortDescription}
            </p>

            <button
                onClick={onMore}
                className="mt-4 px-4 py-2 rounded-md bg-gray-200 text-black font-medium text-sm hover:bg-gray-300 transition self-start"
            >
                Подробнее
            </button>
        </div>
    );
}
