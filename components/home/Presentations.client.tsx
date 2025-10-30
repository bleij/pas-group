"use client";

import Image from "next/image";

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
        <section id="presentations" className="w-full bg-gray-100 py-4 sm:py-8 md:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                    Презентации
                </h2>
                <div className="h-1 w-24 sm:w-32 bg-[#009999] mb-6 sm:mb-8"></div>

                {/* мобильная и пк сетка */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {items.map((p) => (
                        <button
                            key={p.id}
                            onClick={() =>
                                p.pdf ? window.open(p.pdf, "_blank") : alert("PDF не прикреплён")
                            }
                            className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
                        >
                            {p.cover && (
                                <div className="w-full h-44 sm:h-52 md:h-60 relative">
                                    <Image
                                        src={p.cover}
                                        alt={p.alt || p.title}
                                        fill
                                        sizes="(max-width:768px) 100vw, 33vw"
                                        className="object-cover object-top"
                                    />
                                </div>
                            )}

                            {/* оверлей при наведении (только на пк) */}
                            <div className="hidden md:flex absolute inset-0 bg-black/40 items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                                Открыть
                            </div>
                        </button>
                    ))}
                </div>

                {/* кнопка */}
                {showMoreHref && (
                    <div className="mt-6 sm:mt-8 md:mt-10 flex justify-start">
                        <a
                            href={showMoreHref}
                            className="inline-block px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition font-medium text-sm sm:text-base md:text-xl text-[#374151]"
                        >
                            Все презентации →
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}