"use client";

import {useState} from "react";
import Image from "next/image";
import {ChevronLeft, ChevronRight, Globe} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";

type ServiceNode = {
    id: string;
    slug: string;
    title: string;
    featuredImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
    serviceFields?: { shortDescription?: string | null; fullDescription?: string | null } | null;
};

type Group = {
    title: string;
    items: ServiceNode[];
};

export default function ServicesClient({groups}: { groups: Group[] }) {
    const [active, setActive] = useState<ServiceNode | null>(null);

    const ServiceRow = ({title, items}: { title: string; items: ServiceNode[] }) => {
        const scrollRef = useState<HTMLDivElement | null>(null)[0];

        return (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scrollRef?.scrollBy({left: -300, behavior: "smooth"})}
                            className="p-2 rounded-full bg-[#163045] hover:bg-[#1f4768] text-white"
                        >
                            <ChevronLeft/>
                        </button>
                        <button
                            onClick={() => scrollRef?.scrollBy({left: 300, behavior: "smooth"})}
                            className="p-2 rounded-full bg-[#163045] hover:bg-[#1f4768] text-white"
                        >
                            <ChevronRight/>
                        </button>
                    </div>
                </div>
                <div
                    ref={scrollRef as any}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                >
                    {items.map((s) => (
                        <div
                            key={s.id}
                            className="min-w-[300px] max-w-[340px] bg-gray-100 rounded-2xl p-4 flex flex-col justify-between"
                        >
                            <div className="mb-4">
                                <div
                                    className="bg-[#163045] text-white w-14 h-14 flex items-center justify-center rounded-xl mb-4">
                                    <Globe className="w-7 h-7"/>
                                </div>
                                <h4 className="font-semibold text-lg mb-2">{s.title}</h4>
                                <p className="text-sm text-gray-700">{s.serviceFields?.shortDescription}</p>
                            </div>
                            <button
                                onClick={() => setActive(s)}
                                className="mt-4 px-4 py-2 rounded-md bg-gray-200 text-black font-medium text-sm hover:bg-gray-300 transition self-start"
                            >
                                Подробнее
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 space-y-16">
                {groups.map((g, idx) => (
                    <ServiceRow key={idx} title={g.title} items={g.items}/>
                ))}
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        onClick={() => setActive(null)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white max-w-lg w-full rounded-xl p-6 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            <h4 className="text-xl font-bold mb-4">{active.title}</h4>
                            {active.featuredImage?.node?.sourceUrl && (
                                <Image
                                    src={active.featuredImage.node.sourceUrl}
                                    alt={active.featuredImage.node.altText || active.title}
                                    width={600}
                                    height={400}
                                    className="mb-4 rounded-lg object-cover"
                                />
                            )}
                            <p className="text-gray-700 whitespace-pre-line mb-6">
                                {active.serviceFields?.fullDescription}
                            </p>
                            <button
                                onClick={() => setActive(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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
