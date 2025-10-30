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
        <section className="w-full bg-white py-8 sm:py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6">
                    Этапы работ
                </h2>
                <div className="h-1 w-24 sm:w-32 bg-[#009999] mb-6 sm:mb-10"></div>

                {/* сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {stages.map((stage, i) => (
                        <div
                            key={i}
                            className="bg-[#F2F2F2] rounded-lg p-4 sm:p-5 md:p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 leading-tight">
                                    {stage.title}
                                </h3>
                                <div className="h-[3px] w-14 sm:w-16 bg-[#009999] mb-2 sm:mb-3"></div>
                                <p className="text-sm sm:text-base text-[#374151] leading-snug">
                                    {stage.text}
                                </p>
                            </div>
                            <div
                                className="mt-4 sm:mt-6 text-right font-bold text-lg sm:text-xl md:text-2xl text-[#374151]">
                                {stage.number}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}