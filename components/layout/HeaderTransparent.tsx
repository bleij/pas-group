"use client";

import Image from "next/image";
import Link from "next/link";
import {Mail, Phone, MapPin, Menu, X} from "lucide-react";
import {useState, useEffect, useRef} from "react";

export default function HeaderTransparent() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onScroll = () => {
            const headerHeight = headerRef.current?.offsetHeight || 0;
            if (window.scrollY > window.innerHeight - headerHeight) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const Nav = ({onClick}: { onClick?: () => void }) => (
        <nav className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <Link href="/#services" onClick={onClick} className="hover:opacity-80">Услуги</Link>
            <Link href="/news" onClick={onClick} className="hover:opacity-80">Новости</Link>
            <Link href="/#experience" onClick={onClick} className="hover:opacity-80">Наш опыт</Link>
            <Link href="/#about" onClick={onClick} className="hover:opacity-80">О компании</Link>
            <Link href="/#testimonials" onClick={onClick} className="hover:opacity-80">Отзывы</Link>
            <Link href="/#contact" onClick={onClick} className="hover:opacity-80">Контакты</Link>
        </nav>
    );

    return (
        <header
            ref={headerRef}
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
                scrolled ? "bg-white text-black" : "bg-transparent text-white"
            }`}
        >
            {/* верхняя контактная полоса */}
            <div className="hidden md:block bg-gray-200 text-black">
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
            <div className="border-b border-white/30">
                <div className="mx-auto max-w-7xl px-6 h-[72px] md:h-[84px] flex items-center justify-between">
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
                <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
                    <div className="absolute right-0 top-0 h-full w-[82%] max-w-[360px] bg-slate-900 text-white p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Image src="/logo.svg" alt="PAS Group" width={140} height={45}/>
                            <button aria-label="Закрыть меню" onClick={() => setOpen(false)}>
                                <X/>
                            </button>
                        </div>
                        <div className="space-y-6">
                            <Nav onClick={() => setOpen(false)}/>
                        </div>
                    </div>
                    <button className="absolute inset-0" onClick={() => setOpen(false)} aria-label="Закрыть"/>
                </div>
            )}
        </header>
    );
}
