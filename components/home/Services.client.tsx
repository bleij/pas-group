"use client";

import {useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronLeft, ChevronRight} from "lucide-react";
import type {ServiceNode} from "@/lib/queries/services";

type Group = {
    title: string;
    items: ServiceNode[];
};

export default function ServicesClient({
                                           groups,
                                           limitGroups,
                                       }: {
    groups: Group[];
    limitGroups?: number;
}) {
    const visibleGroups = limitGroups ? groups.slice(0, limitGroups) : groups;
    const pathname = usePathname(); // <-- добавили

    return (
        <section id="services" className="w-full bg-white py-6 sm:py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 md:space-y-16">
                {visibleGroups.map((g, idx) => (
                    <ServiceRow key={idx} title={g.title} items={g.items}/>
                ))}

                {/* показываем кнопку только если мы НЕ на странице /services */}
                {pathname !== "/services" && (
                    <div className="text-start mt-6 sm:mt-10">
                        <Link
                            href="/services"
                            className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                        >
                            Смотреть все услуги
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

function ServiceRow({title, items}: { title: string; items: ServiceNode[] }) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <div>
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-[18px] sm:text-lg md:text-2xl font-semibold">{title}</h2>

                {/* стрелки — только на планшете и выше */}
                <div className="hidden sm:flex gap-2">
                    <button
                        onClick={() =>
                            scrollRef.current?.scrollBy({left: -300, behavior: "smooth"})
                        }
                        className="p-2 rounded-full bg-[#009999] hover:bg-[#007A7A] text-white transition"
                    >
                        <ChevronLeft size={20}/>
                    </button>
                    <button
                        onClick={() =>
                            scrollRef.current?.scrollBy({left: 300, behavior: "smooth"})
                        }
                        className="p-2 rounded-full bg-[#009999] hover:bg-[#007A7A] text-white transition"
                    >
                        <ChevronRight size={20}/>
                    </button>
                </div>
            </div>

            {/* фирменная полоска (не уменьшали) */}
            <div className="h-1 w-24 md:w-32 bg-[#009999] mb-6 sm:mb-8"></div>

            {/* карточки */}
            <div
                ref={scrollRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-1 sm:pb-2"
                style={{justifyContent: "flex-start", flexWrap: "nowrap"}}
            >
                {items
                    .slice()
                    .reverse()
                    .map((s) => (
                        <div
                            key={s.id}
                            className="flex-none min-w-[260px] sm:min-w-[300px] max-w-[320px] bg-[#F2F2F2] rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-[#E5E7EB] transition"
                        >
                            <div>
                                <div
                                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-[#009999] mb-3 sm:mb-4">
                                    {s.serviceFields?.serviceIcon?.node?.sourceUrl ? (
                                        <Image
                                            src={s.serviceFields.serviceIcon.node.sourceUrl}
                                            alt={s.title}
                                            width={26}
                                            height={26}
                                            unoptimized
                                        />
                                    ) : (
                                        <span className="text-white text-xl sm:text-2xl font-bold">
                      ⚙️
                    </span>
                                    )}
                                </div>

                                <h4 className="font-semibold text-base mb-2 leading-tight">
                                    {s.title}
                                </h4>

                                <p className="text-sm font-medium text-gray-700 leading-snug">
                                    {s.serviceFields?.shortDescription}
                                </p>
                            </div>

                            <Link
                                href="#contact"
                                scroll={true}
                                className="mt-4 px-4 py-2 rounded-md bg-[#E5E7EB] text-[#374151] font-medium text-sm hover:bg-[#A5A7AA] transition self-start"
                            >
                                Подробнее
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}