"use client";

import Image from "next/image";
import Link from "next/link";
import {Mail, Phone, MapPin, Menu, X} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = (href: string) => {
        setOpen(false);
        router.push(href);
    };

    const Nav = ({mobile = false}: { mobile?: boolean }) => (
        <nav
            className={`flex ${
                mobile
                    ? "flex-col gap-6 text-lg"
                    : "flex-row items-center gap-6 md:gap-10"
            }`}
        >
            {[
                {href: "/news", label: "Новости"},
                {href: "/services", label: "Услуги"},
                {href: "/solutions", label: "Наши решения"},
                {href: "/experience", label: "Наш опыт"},
                {href: "/about", label: "О компании"},
                {href: "/letters", label: "Отзывы"},
                {href: "/contacts", label: "Контакты"},
            ].map((link) => (
                <button
                    key={link.href}
                    onClick={() => handleNavigate(link.href)}
                    className="text-left hover:opacity-80 transition"
                >
                    {link.label}
                </button>
            ))}
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
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
                    <div className="h-full w-[82%] max-w-[360px] bg-gray-100 text-black p-6 shadow-xl flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <Image
                                src="/logo.png"
                                alt="PAS Group"
                                width={140}
                                height={45}
                                className="h-10 w-auto"
                            />
                            <button
                                aria-label="Закрыть меню"
                                onClick={() => setOpen(false)}
                            >
                                <X/>
                            </button>
                        </div>

                        <Nav mobile/>
                    </div>
                </div>
            )}
        </header>
    );
}