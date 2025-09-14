"use client";

import Image from "next/image";

export default function Experience() {
    const cases = [
        {
            title: "Трансформаторные подстанции",
            text: "Поставка, сборка, монтаж силовых и комплектных трансформаторных подстанций",
            image: "/experience1.jpg",
        },
        {
            title: "Водоподготовка и водоотведение",
            text: "Энергообеспечение и автоматизация для всех процессов: опреснение, очистка сточных вод, орошение и защита водных путей.",
            image: "/experience2.jpg",
        },
        {
            title: "Водоподготовка и водоотведение",
            text: "Энергообеспечение и автоматизация для всех процессов: опреснение, очистка сточных вод, орошение и защита водных путей.",
            image: "/experience3.jpg",
        },
    ];

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-10">Наш опыт</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((c, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="w-full h-56 md:h-64 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={c.image}
                                    alt={c.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-semibold mb-2">{c.title}</h3>
                            <p className="text-sm text-gray-700 mb-4">{c.text}</p>
                            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm w-fit">
                                Подробнее
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
