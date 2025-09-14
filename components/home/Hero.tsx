"use client";

import Image from "next/image";

type HeroProps = {
    title?: string;
    description?: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
    heroImage?: string;
    partners?: { id: number; logo: string; alt: string }[];
};

export default function Hero({
                                 title = "Энергетика и автоматизация «под ключ»",
                                 description = "Поставка, сборка и монтаж трансформаторных подстанций, распределительных устройств и систем электроснабжения. Команда с 29+ годами экспертизы. 12+ лет без инцидентов эксплуатации.",
                                 ctaPrimary = "Получить консультацию",
                                 ctaSecondary = "Получить КП",
                                 heroImage = "/placeholder-hero.png",
                                 partners = [
                                     {id: 1, logo: "/partner1.png", alt: "Партнер 1"},
                                     {id: 2, logo: "/partner2.png", alt: "Партнер 2"},
                                     {id: 3, logo: "/partner3.png", alt: "Партнер 3"},
                                     {id: 4, logo: "/partner4.png", alt: "Партнер 4"},
                                 ],
                             }: HeroProps) {
    return (
        <section className="w-full px-6 py-12 lg:py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Левая колонка */}
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
                        {title}
                    </h1>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="bg-black text-white px-6 py-3 rounded-md text-sm sm:text-base font-medium hover:bg-gray-900 transition">
                            {ctaPrimary}
                        </button>
                        <button
                            className="bg-gray-200 text-black px-6 py-3 rounded-md text-sm sm:text-base font-medium hover:bg-gray-300 transition">
                            {ctaSecondary}
                        </button>
                    </div>
                </div>

                {/* Правая колонка */}
                <div className="flex justify-center lg:justify-end">
                    <div className="w-72 h-72 sm:w-96 sm:h-96 bg-gray-200 rounded-2xl overflow-hidden">
                        <Image
                            src={heroImage}
                            alt="Hero Image"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Партнёры */}
            <div className="mt-12">
                <h2 className="text-center text-lg font-medium mb-6">Наши партнеры</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="w-28 h-12 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden"
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.alt}
                                width={100}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
