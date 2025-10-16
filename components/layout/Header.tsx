"use client";

import Image from "next/image";
import Link from "next/link";
import {Mail, Phone, MapPin} from "lucide-react";

export default function Header() {
    return (
        <header className="w-full bg-white text-black">
            {/* верхняя контактная полоса */}
            <div className="bg-gray-200">
                <div className="mx-auto max-w-[1400px] px-6 py-6 grid grid-cols-3 items-center text-sm">

                    {/* почта */}
                    <div className="flex items-center gap-2 justify-start whitespace-nowrap">
                        <Mail size={16}/>
                        <a href="mailto:director@pasgroup.kz" className="hover:underline">director@pasgroup.kz</a>
                        <span className="opacity-60">/</span>
                        <a href="mailto:zakup@pasgroup.kz" className="hover:underline">zakup@pasgroup.kz</a>
                    </div>

                    {/* телефоны */}
                    <div className="flex items-center gap-2 justify-center whitespace-nowrap">
                        <Phone size={16}/>
                        <a href="tel:+77019898200" className="hover:underline">+7 701 98 98 200</a>
                        <span className="opacity-60">/</span>
                        <a href="tel:+77713082800" className="hover:underline">+7 771 30 82 800</a>
                    </div>

                    {/* адрес */}
                    <div className="flex items-start gap-2 justify-end text-left">
                        <MapPin size={16} className="mt-0.5 shrink-0"/>
                        <span className="break-words">
                            Казахстан, г. Актау, 5 «А» мкр., БЦ «Каспий-Grand», офис 2-10
                        </span>
                    </div>

                </div>
            </div>

            {/* линия с логотипом и навигацией */}
            <div className="border-b border-gray-300">
                <div className="mx-auto max-w-7xl px-6 h-[72px] md:h-[84px] flex items-center justify-between">

                    {/* логотип */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/logo.svg"
                            alt="PAS Group"
                            width={180}
                            height={60}
                            priority
                            className="h-10 md:h-12 w-auto"
                        />
                    </Link>

                    {/* навигация */}
                    <nav className="hidden md:flex items-center gap-10 font-medium text-base">
                        <Link href="/#services" className="hover:underline">Услуги</Link>
                        <Link href="/news" className="hover:underline">Новости</Link>
                        <Link href="/#experience" className="hover:underline">Наш опыт</Link>
                        <Link href="/#about" className="hover:underline">О компании</Link>
                        <Link href="/#testimonials" className="hover:underline">Отзывы</Link>
                        <Link href="/#contact" className="hover:underline">Контакты</Link>
                    </nav>

                </div>
            </div>
        </header>
    );
}
