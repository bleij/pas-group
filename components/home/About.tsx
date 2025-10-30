"use client";

import Image from "next/image";

export default function About() {
    return (
        <section className="w-full bg-white py-8 sm:py-12 md:pt-32 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start">
                {/* левая колонка с текстом */}
                <div className="flex flex-col justify-between order-2 md:order-1 h-full">
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                            О нашей компании
                        </h2>
                        <div className="h-1 w-24 sm:w-32 bg-[#009999] mb-5 sm:mb-8"></div>

                        <div className="space-y-4 sm:space-y-6 text-gray-800">
                            <div>
                                <p className="text-base sm:text-lg font-semibold mb-1">
                                    Гарантируем качество и надежность
                                </p>
                                <p className="text-sm sm:text-base leading-snug">
                                    В эпоху цифровизации важно грамотно организовать работу сложных систем: обеспечить
                                    бесперебойность, предотвратить риски и заложить запас мощности. Мы делаем это силами одной профессиональной команды.
                                </p>
                            </div>

                            <div>
                                <p className="text-base sm:text-lg font-semibold mb-1">Наша миссия</p>
                                <p className="text-sm sm:text-base leading-snug">
                                    Предоставлять современные и высокотехнологичные решения, повышать качество и
                                    надежность объектов, быть вашим надежным энергетическим партнёром.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* подпись — десктоп */}
                    <div className="hidden md:flex flex-col mt-auto">
                        <p className="text-lg text-[#374151]">Основатель</p>
                        <p className="font-bold text-xl">Александр Пауκ</p>
                    </div>
                </div>

                {/* фото — десктоп */}
                <div className="hidden md:flex justify-end order-1 md:order-2">
                    <div className="w-96 rounded-xl overflow-hidden shadow-md">
                        <Image
                            src="/founder.jpg"
                            alt="Основатель компании"
                            width={600}
                            height={800}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                </div>

                {/* мобильная версия */}
                <div className="md:hidden order-3 mt-6">
                    <div className="w-full rounded-xl overflow-hidden shadow-md mb-3">
                        <Image
                            src="/founder.jpg"
                            alt="Основатель компании"
                            width={600}
                            height={800}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-xs text-gray-600">Основатель</p>
                        <p className="font-bold text-base">Александр Пауκ</p>
                    </div>
                </div>
            </div>
        </section>
    );
}