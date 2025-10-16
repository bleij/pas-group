"use client";

import Image from "next/image";
import {Globe} from "lucide-react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import type {TestimonialNode} from "@/lib/queries/testimonials";
import type {LetterNode} from "@/lib/queries/letters";

type Props = {
    testimonials: TestimonialNode[];
    letters: LetterNode[];
};

export default function TestimonialsClient({testimonials, letters}: Props) {
    return (
        <section className="w-full bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold">Наши отзывы</h2>
                <div className="h-1 w-16 bg-[#163045] mt-3 mb-10"/>

                {/* Отзывы */}
                <div className="relative mb-10">
                    <div className="absolute right-0 -top-14 hidden md:flex gap-2">
                        <button className="t-prev rounded-full p-2 bg-[#163045] text-white hover:bg-[#1f4768]">‹
                        </button>
                        <button className="t-next rounded-full p-2 bg-[#163045] text-white hover:bg-[#1f4768]">›
                        </button>
                    </div>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{prevEl: ".t-prev", nextEl: ".t-next"}}
                        breakpoints={{
                            0: {slidesPerView: 1.05, spaceBetween: 16},
                            768: {slidesPerView: 3, spaceBetween: 24},
                        }}
                    >
                        {testimonials.map((t) => (
                            <SwiperSlide key={t.id}>
                                <article className="bg-white rounded-2xl p-5 h-full">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-[#163045] text-white flex items-center justify-center mb-4">
                                        <Globe className="w-6 h-6"/>
                                    </div>
                                    <h4 className="font-semibold mb-3">{t.title}</h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-line">
                                        {t.testimonialFields?.reviewBody}
                                    </p>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Письма */}
                <div className="relative">
                    <div className="absolute right-0 -top-14 hidden md:flex gap-2">
                        <button className="l-prev rounded-full p-2 bg-[#163045] text-white hover:bg-[#1f4768]">‹
                        </button>
                        <button className="l-next rounded-full p-2 bg-[#163045] text-white hover:bg-[#1f4768]">›
                        </button>
                    </div>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{prevEl: ".l-prev", nextEl: ".l-next"}}
                        breakpoints={{
                            0: {slidesPerView: 1.05, spaceBetween: 16},
                            768: {slidesPerView: 4, spaceBetween: 24},
                        }}
                    >
                        {letters.map((l) => {
                            const src = l.featuredImage?.node?.sourceUrl;
                            if (!src) return null;
                            return (
                                <SwiperSlide key={l.id}>
                                    <div className="relative w-full aspect-[210/297] overflow-hidden rounded-xl">
                                        <Image
                                            src={src}
                                            alt={l.featuredImage?.node?.altText || l.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 90vw, 22vw"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                <div className="mt-8">
                    <button className="px-5 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition">
                        Посмотреть все отзывы
                    </button>
                </div>
            </div>
        </section>
    );
}
