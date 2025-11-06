"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import SpotlightCard from "@/components/shared/animations/SpotlightCard";
import type { ServiceNode } from "@/lib/queries/services";

type Group = { title: string; items: ServiceNode[] };

export default function ServicesClient({
                                           groups,
                                           limitGroups,
                                       }: {
    groups: Group[];
    limitGroups?: number;
}) {
    const visibleGroups = limitGroups ? groups.slice(0, limitGroups) : groups;
    const pathname = usePathname();

    return (
        <section id="services" className="w-full bg-white py-6 md:py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
                {visibleGroups.map((g, idx) => (
                    <ServiceRow key={idx} title={g.title} items={g.items} />
                ))}

                {pathname !== "/services" && (
                    <motion.div
                        className="mt-8 sm:mt-12 flex justify-start pl-4 sm:pl-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium whitespace-nowrap min-h-[48px]"
                            >
                                Смотреть все услуги
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function ServiceRow({ title, items }: { title: string; items: ServiceNode[] }) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const fadeOnly = {
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Заголовок */}
            <motion.div
                variants={fadeOnly}
                className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-6"
            >
                <h2 className="text-[18px] sm:text-lg md:text-2xl font-semibold">{title}</h2>

                <div className="hidden sm:flex gap-2">
                    <button
                        onClick={() =>
                            scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
                        }
                        className="p-2 rounded-full bg-[#009999] hover:bg-[#007A7A] text-white transition active:scale-95"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() =>
                            scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
                        }
                        className="p-2 rounded-full bg-[#009999] hover:bg-[#007A7A] text-white transition active:scale-95"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </motion.div>

            {/* Полоска */}
            <motion.div
                className="h-1 w-24 md:w-32 bg-[#009999] mb-6 sm:mb-8 origin-left ml-4 sm:ml-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            />

            {/* Карточки */}
            <motion.div
                ref={scrollRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-0 pl-4 sm:pl-6 pr-4 sm:pr-0"
            >
                {items
                    .slice()
                    .reverse()
                    .map((s) => (
                        <motion.div key={s.id} variants={fadeOnly}>
                            <SpotlightCard
                                spotlightColor="rgba(0,153,153,0.55)"
                                className="
                  flex-none w-[320px] rounded-2xl bg-[#F3F4F6] p-5
                  flex flex-col justify-between
                  transition-all cursor-pointer
                  hover:bg-[#E5E7EB] active:bg-[#D1D5DB]
                  h-[320px]
                "
                            >
                                {/* верхняя часть */}
                                <div className="flex flex-col flex-grow">
                                    <Link href='#contact' scroll={true} className="block flex-grow">
                                        <div>
                                            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#009999] mb-4">
                                                {s.serviceFields?.serviceIcon?.node?.sourceUrl ? (
                                                    <Image
                                                        src={s.serviceFields.serviceIcon.node.sourceUrl}
                                                        alt={s.title}
                                                        width={26}
                                                        height={26}
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span className="text-white text-2xl font-bold">⚙️</span>
                                                )}
                                            </div>

                                            <h4 className="font-semibold text-base mb-2 leading-tight">
                                                {s.title}
                                            </h4>

                                            <p className="text-sm font-medium text-gray-700 leading-snug">
                                                {s.serviceFields?.shortDescription}
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                {/* нижняя часть */}
                                <div className="mt-auto pt-4">
                  <span className="inline-block px-5 py-2 rounded-md bg-[#E5E7EB] text-[#374151] font-medium text-sm hover:bg-[#A5A7AA] transition">
                    Подробнее
                  </span>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
            </motion.div>
        </motion.div>
    );
}