"use client";

import {useState} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {X, ChevronLeft, ChevronRight} from "lucide-react";
import type {LetterNode} from "@/lib/queries/letters";

export default function LettersModal({letters}: { letters: LetterNode[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const prev = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! - 1 + letters.length) % letters.length);
    };
    const next = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! + 1) % letters.length);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {letters.map((l, i) => {
                    const src = l.featuredImage?.node?.sourceUrl;
                    if (!src) return null;
                    return (
                        <button
                            key={l.id}
                            onClick={() => setActiveIndex(i)}
                            className="bg-white shadow-sm hover:shadow-md transition block overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={l.featuredImage?.node?.altText || l.title}
                                width={600}
                                height={800}
                                className="object-contain w-full h-auto"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </button>
                    );
                })}
            </div>

            {/* модалка */}
            <AnimatePresence>
                {activeIndex !== null && letters[activeIndex] && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setActiveIndex(null)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="relative p-0 max-w-5xl w-full flex justify-center items-center"
                            onClick={(e) => e.stopPropagation()}
                            initial={{scale: 0.96, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.96, opacity: 0}}
                            transition={{duration: 0.18}}
                        >
                            <button
                                onClick={() => setActiveIndex(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:shadow-md transition"
                            >
                                <X size={20}/>
                            </button>

                            <button
                                onClick={prev}
                                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white"
                            >
                                <ChevronLeft className="w-6 h-6"/>
                            </button>

                            <button
                                onClick={next}
                                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white"
                            >
                                <ChevronRight className="w-6 h-6"/>
                            </button>

                            <Image
                                src={letters[activeIndex].featuredImage?.node?.sourceUrl || ""}
                                alt={
                                    letters[activeIndex].featuredImage?.node?.altText ||
                                    letters[activeIndex].title
                                }
                                width={1200}
                                height={1600}
                                className="object-contain w-full max-h-[80vh] mx-auto"
                                sizes="90vw"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}