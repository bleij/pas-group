"use client";

import Image from "next/image";

export default function About() {
    return (
        <section className="w-full bg-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
                {/* Левая колонка с текстом */}
                <div className="flex flex-col justify-between order-2 md:order-1 h-full">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">О нашей компании</h2>
                        <div className="h-1 w-32 bg-[#009999] mb-8"></div>

                        <div className="space-y-6 text-gray-800">
                            <div>
                                <p className="text-xl font-bold mb-1">Гарантируем качество и надежность</p>
                                <p>
                                    В эпоху цифровизации важно грамотно организовать работу сложных систем: обеспечить
                                    бесперебойность, предотвратить риски и заложить запас мощности.
                                    Мы делаем это силами одной профессиональной команды.
                                </p>
                            </div>

                            <div>
                                <p className="text-xl font-bold mb-1">Наша миссия</p>
                                <p>
                                    Предоставлять современные и высокотехнологичные решения, повышать качество и
                                    надежность
                                    объектов, быть вашим надежным энергетическим партнёром.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* подпись — на десктопе снизу слева */}
                    <div className="hidden md:flex flex-col mt-auto">
                        <div className="mt-auto">
                            <p className="text-lg text-[#374151]">Основатель</p>
                            <p className="font-bold text-xl">Александр Пауκ</p>
                        </div>
                    </div>
                </div>

                {/* Правая колонка с фото (только на десктопе) */}
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

                {/* Фото и подпись — только на мобилке */}
                <div className="md:hidden order-3 mt-10">
                    <div className="w-full rounded-xl overflow-hidden shadow-md mb-4">
                        <Image
                            src="/founder.jpg"
                            alt="Основатель компании"
                            width={600}
                            height={800}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-sm text-gray-600">Основатель</p>
                        <p className="font-bold text-lg">Александр Пауκ</p>
                    </div>
                </div>
            </div>
        </section>
    );
}