"use client";

import {useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import {ChevronLeft, ChevronRight} from "lucide-react";
import type {ServiceNode} from "@/lib/queries/services";

type Group = {
    title: string;
    items: ServiceNode[];
};

export default function ServicesClient({groups}: { groups: Group[] }) {
    return (
        <section id="services" className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 space-y-16">
                {groups.map((g, idx) => (
                    <ServiceRow key={idx} title={g.title} items={g.items}/>
                ))}

                {/* кнопка внизу */}
                <div className="text-start mt-10">
                    <Link
                        href="/services"
                        className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                    >
                        Смотреть все услуги
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ServiceRow({title, items}: { title: string; items: ServiceNode[] }) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <div>
            <div>
                {/* верхняя строка — заголовок и стрелки */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => scrollRef.current?.scrollBy({left: -300, behavior: "smooth"})}
                            className="p-2 rounded-full bg-[#009999] hover:bg-[#007A7A] text-white transition"
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        <button
                            onClick={() => scrollRef.current?.scrollBy({left: 300, behavior: "smooth"})}
                            className="p-2 rounded-full bg-[#009999] hover:bg-[#007A7A] text-white transition"
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </div>
                </div>

                {/* плашка */}
                <div className="h-1 w-24 md:w-32 bg-[#009999] mb-8"></div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                style={{justifyContent: "flex-start", flexWrap: "nowrap"}}
            >
                {items.slice().reverse().map((s) => (
                    <div
                        key={s.id}
                        className="flex-none min-w-[300px] max-w-[320px] bg-[#F2F2F2] rounded-2xl p-5 flex flex-col justify-between hover:bg-[#E5E7EB] transition"
                    >
                        <div>
                            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#009999] mb-4">
                                {s.serviceFields?.serviceIcon?.node?.sourceUrl ? (
                                    <Image
                                        src={s.serviceFields.serviceIcon.node.sourceUrl}
                                        alt={s.title}
                                        width={30}
                                        height={30}
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-white text-2xl font-bold">⚙️</span>
                                )}
                            </div>
                            <h4 className="font-semibold text-base mb-3 leading-tight">{s.title}</h4>
                            <p className="text-sm font-medium text-gray-700 leading-snug">
                                {s.serviceFields?.shortDescription}
                            </p>
                        </div>

                        <Link
                            href="#contact" // 👈 якорь на блок с формой
                            scroll={true}   // smooth scroll
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