"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

import {PartnerNode} from "@/lib/queries/partners";

export default function PartnersClient({partners}: { partners: PartnerNode[] }) {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Наши партнёры</h2>
                <div className="h-1 w-16 bg-blue-900 mb-8"></div>

                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={2}
                    spaceBetween={20}
                    loop
                    autoplay={{delay: 2000, disableOnInteraction: false}}
                    breakpoints={{
                        640: {slidesPerView: 3},
                        1024: {slidesPerView: 5},
                    }}
                >
                    {partners.map((p) => (
                        <SwiperSlide key={p.id}>
                            {p.featuredImage?.node?.sourceUrl && (
                                <div className="flex items-center justify-center h-24">
                                    <Image
                                        src={p.featuredImage.node.sourceUrl}
                                        alt={p.featuredImage.node.altText || p.title}
                                        width={150}
                                        height={80}
                                        className="object-contain max-h-24"
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* кнопка */}
                {partners.length > 0 && (
                    <div className="mt-10">
                        <Link
                            href="/partners"
                            className="inline-block px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                        >
                            Смотреть всех
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
