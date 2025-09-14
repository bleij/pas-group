"use client";

import Image from "next/image";
import {Globe} from "lucide-react";

export default function Testimonials() {
    const textReviews = [
        {
            company: "Buzachi Neft",
            text: "За время сотрудничества с ТОО «Power & Automation Solutions» был показан высокий профессионализм сотрудников компании в решении технических задач. Хотелось бы выразить благодарность за сотрудничество и надеемся на дальнейшее развитие отношений с компанией «Power & Automation Solutions»",
        },
        {
            company: "Jupiter Energy PTE LTD",
            text: "За время сотрудничества с ТОО «Power & Automation Solutions» был показан высокий профессионализм сотрудников компании в решении поставленных задач. Хотелось бы выразить благодарность за сотрудничество и надеемся на дальнейшее развитие отношений с компанией «Power & Automation Solutions»",
        },
        {
            company: "Jupiter Energy PTE LTD",
            text: "За время сотрудничества с ТОО «Power & Automation Solutions» был показан высокий профессионализм сотрудников компании в решении поставленных задач. Хотелось бы выразить благодарность за сотрудничество и надеемся на дальнейшее развитие отношений с компанией «Power & Automation Solutions»",
        },
    ];

    const imageReviews = [
        {src: "/review1.jpg", alt: "Отзыв 1"},
        {src: "/review2.jpg", alt: "Отзыв 2"},
        {src: "/review3.jpg", alt: "Отзыв 3"},
        {src: "/review4.jpg", alt: "Отзыв 4"},
    ];

    return (
        <section className="w-full bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-10">Наши отзывы</h2>

                {/* Текстовые отзывы */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {textReviews.map((review, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div
                                className="bg-blue-950 text-white w-10 h-10 flex items-center justify-center rounded-md mb-4">
                                <Globe className="w-5 h-5"/>
                            </div>
                            <h3 className="font-semibold mb-2">{review.company}</h3>
                            <p className="text-sm text-gray-700">{review.text}</p>
                        </div>
                    ))}
                </div>

                {/* Картинки отзывов */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    {imageReviews.map((review, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <Image
                                src={review.src}
                                alt={review.alt}
                                width={400}
                                height={300}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Кнопка */}
                <div className="flex justify-center">
                    <button className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                        Посмотреть все отзывы
                    </button>
                </div>
            </div>
        </section>
    );
}
