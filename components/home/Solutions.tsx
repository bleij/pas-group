"use client";

import Image from "next/image";

export default function Solutions() {
    const solutions = [
        {
            title: "Энергетика и ЖКХ",
            text: "Комплексные решения по производству, передаче и распределению электроэнергии. Помогаем сбалансировать растущий спрос и экологические требования.",
        },
        {
            title: "Цементная промышленность",
            text: "Индивидуальные решения для новых и действующих заводов. Автоматизация и энергетика с данными в реальном времени для контроля процессов.",
        },
        {
            title: "Металлургическая промышленность",
            text: "Единый центр для продаж, обслуживания и исследований. Поддержка предприятий в условиях глобальной конкуренции.",
        },
        {
            title: "Водоподготовка и водоотведение",
            text: "Энергообеспечение и автоматизация для всех процессов: опреснение, очистка сточных вод, орошение и защита водных путей.",
        },
        {
            title: "Ветряная энергетика",
            text: "Полный цикл решений для ветроустановок — от поставки до обслуживания. Практический опыт и глубокие знания энергосистем.",
        },
        {
            title: "Нефтегаз и нефтехимия",
            text: "Автоматизация и управление процессами для повышения рентабельности добычи на всех этапах эксплуатации месторождений.",
        },
    ];

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Заголовки */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Что мы предлагаем</h2>
                <div className="h-1 w-16 bg-blue-900 mb-8"></div>
                <h3 className="text-xl font-semibold mb-10">Отраслевые решения</h3>

                {/* Сетка карточек */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((solution, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            {/* Заглушка под картинку */}
                            <div className="bg-blue-950 h-40 w-full"></div>

                            {/* Текст карточки */}
                            <div className="p-5">
                                <h4 className="font-semibold mb-2">{solution.title}</h4>
                                <p className="text-sm text-gray-700 mb-4">{solution.text}</p>
                                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
