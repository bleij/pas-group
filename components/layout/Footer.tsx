"use client";

import Image from "next/image";
import {ArrowUp} from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t py-10 relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                {/* Логотип */}
                <div className="flex flex-col gap-4">
                    <Image
                        src="/logo.png"
                        alt="PAS Group Logo"
                        width={180}
                        height={60}
                        className="object-contain"
                    />
                </div>

                {/* Адрес и контакты */}
                <div className="text-sm text-gray-800">
                    <p className="mb-4">
                        Казахстан, г. Актау 5 "А" мкр, БЦ «Каспий-Grand», офис 2-10
                    </p>
                    <p className="mb-2">
                        <a href="tel:+77019898200" className="hover:underline">
                            +7 701 98 98 200
                        </a>
                    </p>
                    <p className="mb-2">
                        <a href="tel:+77713082800" className="hover:underline">
                            +7 771 30 82 800
                        </a>
                    </p>
                    <p className="mb-2">
                        <a href="mailto:director@pasgroup.kz" className="hover:underline">
                            director@pasgroup.kz
                        </a>
                    </p>
                    <p>
                        <a href="mailto:zakup@pasgroup.kz" className="hover:underline">
                            zakup@pasgroup.kz
                        </a>
                    </p>
                </div>

                {/* Меню + соцсети */}
                <div className="flex flex-col gap-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <a href="#" className="hover:underline">
                                Наши решения
                            </a>
                            <a href="#" className="hover:underline">
                                Наш опыт
                            </a>
                            <a href="#" className="hover:underline">
                                Отзывы
                            </a>
                            <a href="#" className="hover:underline">
                                Услуги
                            </a>
                            <a href="#" className="hover:underline">
                                Новости
                            </a>
                            <a href="#" className="hover:underline">
                                О компании
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="hover:underline">
                                Instagram
                            </a>
                            <a href="#" className="hover:underline">
                                Facebook
                            </a>
                            <a href="#" className="hover:underline">
                                YouTube
                            </a>
                            <a href="#" className="hover:underline">
                                LinkedIn
                            </a>
                            <a href="#" className="hover:underline">
                                TikTok
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Низ футера */}
            <div
                className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                <a href="#" className="hover:underline mb-2 md:mb-0">
                    Политика конфиденциальности
                </a>
                <p>© 2025 PAS Group. All rights reserved.</p>
            </div>

            {/* Кнопка "вверх" */}
            <button
                onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                className="absolute right-6 bottom-6 p-3 rounded-full bg-blue-900 text-white hover:bg-blue-700 transition"
            >
                <ArrowUp size={20}/>
            </button>
        </footer>
    );
}
