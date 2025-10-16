"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SolutionNode } from "@/lib/queries/solutions";

type Props = { solutions: SolutionNode[] };

export default function SolutionsClient({ solutions }: Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Что мы предлагаем</h2>
                <div className="h-1 w-16 bg-[#163045] mb-8"></div>
                <h3 className="text-xl font-semibold mb-10">Отраслевые решения</h3>

                {/* mobile */}
                <div className="md:hidden">
                    <Swiper spaceBetween={16} slidesPerView={1.08}>
                        {solutions.map((s, i) => (
                            <SwiperSlide key={s.id}>
                                <Card solution={s} onClick={() => setActiveIndex(i)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* desktop */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((s, i) => (
                        <Card key={s.id} solution={s} onClick={() => setActiveIndex(i)} />
                    ))}
                </div>
            </div>

            {/* modal как в услугах */}
            <AnimatePresence>
                {activeIndex !== null && solutions[activeIndex] && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        onClick={() => setActiveIndex(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white max-w-lg w-full rounded-xl p-6 shadow-lg mx-4"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="space-y-4">
                                {solutions[activeIndex].featuredImage?.node?.sourceUrl && (
                                    <div className="relative w-full h-56 md:h-72">
                                        <Image
                                            src={solutions[activeIndex].featuredImage!.node!.sourceUrl!}
                                            alt={
                                                solutions[activeIndex].featuredImage!.node!.altText ||
                                                solutions[activeIndex].title
                                            }
                                            fill
                                            className="object-cover rounded-xl"
                                            priority
                                        />
                                    </div>
                                )}

                                <h4 className="text-xl md:text-2xl font-bold">
                                    {solutions[activeIndex].title}
                                </h4>

                                <p className="text-gray-700 whitespace-pre-line">
                                    {solutions[activeIndex].solutionFields?.fullDescription ||
                                        solutions[activeIndex].solutionFields?.shortDescription}
                                </p>

                                <button
                                    onClick={() => setActiveIndex(null)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function Card({
                  solution,
                  onClick,
              }: {
    solution: SolutionNode;
    onClick: () => void;
}) {
    return (
        <div className="rounded-2xl bg-gray-100 overflow-hidden flex flex-col">
            {solution.featuredImage?.node?.sourceUrl ? (
                <div className="relative h-44 w-full">
                    <Image
                        src={solution.featuredImage.node.sourceUrl}
                        alt={solution.featuredImage.node.altText || solution.title}
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="h-44 w-full bg-[#163045] opacity-90" />
            )}

            <div className="p-4 flex flex-col flex-1">
                <h4 className="font-semibold text-lg mb-2">{solution.title}</h4>
                <p className="text-sm text-gray-700 flex-1">
                    {solution.solutionFields?.shortDescription}
                </p>
                <button
                    onClick={onClick}
                    className="mt-4 px-4 py-2 rounded-md bg-gray-200 text-black font-medium text-sm hover:bg-gray-300 transition self-start"
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}
