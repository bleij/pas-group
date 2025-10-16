"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Presentation = {
    id: string;
    title: string;
    cover?: string;
    alt?: string;
    pdf?: string;
};

export default function PresentationsClient({
                                                items,
                                                showMoreHref,
                                            }: {
    items: Presentation[];
    showMoreHref?: string;
}) {
    return (
        <section className="w-full bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Презентации</h2>
                <div className="h-1 w-16 bg-blue-900 mb-8"></div>

                {/* Сетка (desktop) */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {items.map((p) => (
                        <div
                            key={p.id}
                            className="relative bg-white rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() =>
                                p.pdf ? window.open(p.pdf, "_blank") : alert("PDF не прикреплён")
                            }
                        >
                            {p.cover && (
                                <Image
                                    src={p.cover}
                                    alt={p.alt || p.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-60 object-cover"
                                />
                            )}
                            {/* оверлей при наведении */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                                Открыть
                            </div>
                        </div>
                    ))}
                </div>

                {/* Слайдер (mobile) */}
                <div className="md:hidden">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1}
                        pagination
                    >
                        {items.map((p) => (
                            <SwiperSlide key={p.id}>
                                <div
                                    className="relative bg-white rounded-lg overflow-hidden cursor-pointer group"
                                    onClick={() =>
                                        p.pdf
                                            ? window.open(p.pdf, "_blank")
                                            : alert("PDF не прикреплён")
                                    }
                                >
                                    {p.cover && (
                                        <Image
                                            src={p.cover}
                                            alt={p.alt || p.title}
                                            width={400}
                                            height={300}
                                            className="w-full h-60 object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                                        Открыть
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* кнопка снизу слева */}
                {showMoreHref && (
                    <div className="mt-8">
                        <a
                            href={showMoreHref}
                            className="inline-block px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition text-md"
                        >
                            Все презентации →
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
