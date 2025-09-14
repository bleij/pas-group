"use client";

import Image from "next/image";

export default function About() {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Левая колонка с текстом */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        О нашей компании
                    </h2>
                    <div className="h-1 w-16 bg-blue-900 mb-8"></div>

                    <p className="mb-6">
                        <span className="font-bold">Гарантируем качество и надежность</span>
                        <br/>
                        В эпоху цифровизации важно грамотно организовать работу сложных
                        систем: обеспечить бесперебойность, предотвратить риски и заложить
                        запас мощности. Мы делаем это силами одной профессиональной команды.
                    </p>

                    <p className="mb-6">
                        <span className="font-bold">Наша миссия</span> — предоставлять
                        современные и высокотехнологичные решения, повышать качество и
                        надежность объектов, быть вашим надежным энергетическим партнёром
                    </p>

                    <p className="mt-10">
                        <span className="block text-sm text-gray-600">Основатель</span>
                        <span className="font-bold text-lg">Александр Пауκ</span>
                    </p>
                </div>

                {/* Правая колонка с фото */}
                <div className="w-full h-auto flex justify-center">
                    <div className="w-72 md:w-96 rounded-lg overflow-hidden shadow">
                        <Image
                            src="/founder.jpg"
                            alt="Основатель компании"
                            width={600}
                            height={800}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
