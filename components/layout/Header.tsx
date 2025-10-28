"use client";

import Image from "next/image";
import Link from "next/link";
import {Mail, Phone, MapPin, Menu, X} from "lucide-react";
import {useState} from "react";

export default function Header() {
    const [open, setOpen] = useState(false);

    const Nav = ({onClick}: { onClick?: () => void }) => (
        <nav className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <Link href="/news" onClick={onClick} className="hover:opacity-80">Новости</Link>
            <Link href="/services" onClick={onClick} className="hover:opacity-80">Услуги</Link>
            <Link href="/solutions" onClick={onClick} className="hover:opacity-80">Наши решения</Link>
            <Link href="/experience" onClick={onClick} className="hover:opacity-80">Наш опыт</Link>
            <Link href="/about" onClick={onClick} className="hover:opacity-80">О компании</Link>
            <Link href="/letters" onClick={onClick} className="hover:opacity-80">Отзывы</Link>
            <Link href="/contacts" onClick={onClick} className="hover:opacity-80">Контакты</Link>
        </nav>
    );

    return (
        <header className="w-full bg-white text-black">
            {/* верхняя контактная полоса */}
            <div className="hidden md:block bg-gray-200 text-black">
                <div
                    className="mx-auto max-w-[1400px] px-6 py-3 flex justify-between items-center text-[13px]
                     whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {/* почта */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Mail size={14}/>
                        <a href="mailto:director@pasgroup.kz" className="hover:underline">
                            director@pasgroup.kz
                        </a>
                        <span className="opacity-60">/</span>
                        <a href="mailto:zakup@pasgroup.kz" className="hover:underline">
                            zakup@pasgroup.kz
                        </a>
                    </div>

                    {/* телефоны */}
                    <div className="flex items-center gap-2 justify-center shrink-0">
                        <Phone size={14}/>
                        <a href="tel:+77019898200" className="hover:underline">
                            +7 701 98 98 200
                        </a>
                        <span className="opacity-60">/</span>
                        <a href="tel:+77713082800" className="hover:underline">
                            +7 771 30 82 800
                        </a>
                    </div>

                    {/* адрес */}
                    <div className="flex items-center gap-2 justify-end shrink-0">
                        <MapPin size={14} className="shrink-0"/>
                        <span className="truncate">
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
                            src="/logo.png"
                            alt="PAS Group"
                            width={180}
                            height={60}
                            priority
                            className="h-10 md:h-12 w-auto"
                        />
                    </Link>

                    {/* навигация */}
                    <div className="hidden md:block">
                        <Nav/>
                    </div>

                    {/* бургер */}
                    <button
                        className="md:hidden"
                        aria-label="Открыть меню"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={28}/>
                    </button>
                </div>
            </div>

            {/* мобильное меню */}
            {open && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
                    <div className="absolute right-0 top-0 h-full w-[82%] max-w-[360px] bg-gray-100 text-black p-6">
                        <div className="flex items-center justify-between mb-6">
                            <img src="/logo.svg" alt="PAS Group" width={140} height={45}/>
                            <button aria-label="Закрыть меню" onClick={() => setOpen(false)}>
                                <X/>
                            </button>
                        </div>
                        <div className="space-y-6">
                            <Nav onClick={() => setOpen(false)}/>
                        </div>
                    </div>
                    <button
                        className="absolute inset-0"
                        onClick={() => setOpen(false)}
                        aria-label="Закрыть"
                    />
                </div>
            )}
        </header>
    );
}