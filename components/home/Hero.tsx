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
                                 heroImage = "/hero-bg.png",
                                 partners = [
                                     {id: 1, logo: "/partner1.png", alt: "Партнер 1"},
                                     {id: 2, logo: "/partner2.png", alt: "Партнер 2"},
                                     {id: 3, logo: "/partner3.png", alt: "Партнер 3"},
                                     {id: 4, logo: "/partner4.png", alt: "Партнер 4"},
                                 ],
                             }: HeroProps) {
    return (
        <section
            className="relative w-full h-[90vh] flex flex-col justify-between"
            style={{backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center"}}
        >
            {/* Overlay с диагональю */}
            <div className="absolute inset-0 bg-black/40"/>
            <div className="absolute inset-0 bg-[#D4AF37]/80 clip-diagonal"/>

            {/* Контент */}
            <div
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between h-full">
                {/* Текст */}
                <div className="text-white max-w-xl space-y-6 py-20 lg:py-0">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">{title}</h1>
                    <p className="text-base sm:text-lg leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            className="bg-[#D4AF37] text-white px-6 py-3 rounded-md text-sm sm:text-base font-medium hover:opacity-90 transition">
                            {ctaPrimary}
                        </button>
                        <button
                            className="bg-white text-gray-900 px-6 py-3 rounded-md text-sm sm:text-base font-medium hover:bg-gray-100 transition">
                            {ctaSecondary}
                        </button>
                    </div>
                </div>
            </div>

            {/* Партнёры */}
            <div className="relative z-10 bg-white/90 py-6">
                <h2 className="text-center text-lg font-medium mb-6">Наши партнёры</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="w-28 h-12 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden"
                        >
                            <Image src={partner.logo} alt={partner.alt} width={100} height={40}
                                   className="object-contain"/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}