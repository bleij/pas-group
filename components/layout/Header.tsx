"use client";

import Image from "next/image";
import {Mail, Phone, MapPin} from "lucide-react";

export default function Header() {
    return (
        <header className="w-full bg-white border-b">
            {/* Верхняя полоса с контактами */}
            <div className="bg-gray-100 text-sm text-gray-800">
                <div
                    className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center py-2 gap-2">
                    <div className="flex items-center gap-2">
                        <Mail size={16}/>
                        <span>
              <a href="mailto:director@pasgroup.kz" className="hover:underline">
                director@pasgroup.kz
              </a>{" "}
                            /{" "}
                            <a href="mailto:zakup@pasgroup.kz" className="hover:underline">
                zakup@pasgroup.kz
              </a>
            </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={16}/>
                        <span>
              <a href="tel:+77019898200" className="hover:underline">
                +7 701 98 98 200
              </a>{" "}
                            /{" "}
                            <a href="tel:+77713082800" className="hover:underline">
                +7 771 30 82 800
              </a>
            </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16}/>
                        <span>
              Казахстан, г. Актау, 5 «А» мкр., БЦ «Каспий-Grand», офис 2-10
            </span>
                    </div>
                </div>
            </div>

            {/* Нижняя полоса с логотипом и навигацией */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center py-4">
                {/* Лого */}
                <div className="mb-4 md:mb-0">
                    <Image
                        src="/logo.png"
                        alt="PAS Group Logo"
                        width={180}
                        height={60}
                        className="object-contain"
                    />
                </div>

                {/* Навигация */}
                <nav className="flex flex-wrap gap-6 text-sm font-medium">
                    <a href="#" className="hover:underline">
                        Услуги
                    </a>
                    <a href="#" className="hover:underline">
                        Новости
                    </a>
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
                        О компании
                    </a>
                    <a href="#" className="hover:underline">
                        Контакты
                    </a>
                </nav>
            </div>
        </header>
    );
}
