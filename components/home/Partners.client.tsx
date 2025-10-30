"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

import {PartnerNode} from "@/lib/queries/partners";

export default function PartnersClient({partners}: { partners: PartnerNode[] }) {
    return (
        <section className="w-full bg-white py-4 sm:py-6 md:py-16">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                {/* заголовок */}
                <h2 className="text-xl sm:text-xl md:text-3xl font-bold mb-1 sm:mb-2 md:mb-4">
                    Наши партнёры
                </h2>
                <div className="h-[3px] w-20 sm:w-28 md:w-32 bg-[#009999] mb-4 sm:mb-6 md:mb-8"></div>

                {/* слайдер */}
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={2}
                    spaceBetween={8}
                    loop
                    autoplay={{delay: 2000, disableOnInteraction: false}}
                    breakpoints={{
                        640: {slidesPerView: 3, spaceBetween: 16},
                        1024: {slidesPerView: 5, spaceBetween: 20},
                    }}
                >
                    {partners.map((p) => (
                        <SwiperSlide key={p.id}>
                            {p.featuredImage?.node?.sourceUrl && (
                                <div className="flex items-center justify-center h-14 sm:h-16 md:h-24">
                                    <Image
                                        src={p.featuredImage.node.sourceUrl}
                                        alt={p.featuredImage.node.altText || p.title}
                                        width={100}
                                        height={60}
                                        className="object-contain max-h-14 sm:max-h-16 md:max-h-24"
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* кнопка */}
                {partners.length > 0 && (
                    <div className="mt-6 sm:mt-10 flex justify-start">
                        <Link
                            href="/partners"
                            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
                        >
                            Смотреть всех
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}