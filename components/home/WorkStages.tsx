"use client";

export default function WorkStages() {
    const stages = [
        {
            number: "01",
            title: "Консультация и анализ",
            text: "Определяем задачи заказчика и проводим техническое обследование объекта.",
        },
        {
            number: "02",
            title: "Проектирование",
            text: "Разрабатываем проектную документацию и готовим оптимальные инженерные решения.",
        },
        {
            number: "03",
            title: "Поставка оборудования",
            text: "Комплектуем объект современным оборудованием ведущих мировых производителей.",
        },
        {
            number: "04",
            title: "Монтаж и сборка",
            text: "Выполняем монтаж подстанций, шкафов и систем электроснабжения объекта.",
        },
        {
            number: "05",
            title: "Пуско-наладка и обучение",
            text: "Настраиваем оборудование, тестируем системы и обучаем персонал заказчика.",
        },
        {
            number: "06",
            title: "Сервис и модернизация",
            text: "Предоставляем обслуживание, реконструкцию и техническое перевооружение объектов.",
        },
    ];

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Этапы работ
                </h2>
                <div className="h-1 w-32 bg-[#009999] mb-10"></div>

                {/* Сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stages.map((stage, i) => (
                        <div
                            key={i}
                            className="bg-[#F2F2F2] rounded-lg p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-2xl mb-3 flex items-center gap-2">
                                    {stage.title}
                                </h3>
                                <div className="h-1 w-16 bg-[#009999] mb-3"></div>
                                <p className="text-medium text-[#374151]">{stage.text}</p>
                            </div>
                            <div className="mt-6 text-right font-bold text-2xl">
                                {stage.number}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}