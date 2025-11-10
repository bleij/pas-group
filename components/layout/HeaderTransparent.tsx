"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderTransparent() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        // определить, мобильный ли экран
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const updateScroll = () => {
            const headerHeight = headerRef.current?.offsetHeight || 0;
            setScrolled(window.scrollY > window.innerHeight - headerHeight);
        };
        updateScroll();
        window.addEventListener("scroll", updateScroll);
        window.addEventListener("resize", updateScroll);
        return () => {
            window.removeEventListener("scroll", updateScroll);
            window.removeEventListener("resize", updateScroll);
        };
    }, []);

    const handleNavigate = (href: string) => {
        setHovered(null); // ✅ убираем блюр при нажатии
        setOpen(false);
        // если уже на этой странице — не перезагружать
        if (window.location.pathname === href) return;
        setTimeout(() => router.push(href), 300);
    };

    return (
        <>
            <motion.header
                ref={headerRef}
                style={{ zIndex: 1000 }}
                className={`fixed top-0 left-0 right-0 w-full font-[Montserrat] transition-colors duration-300 ${
                    scrolled
                        ? "bg-white text-black border-b border-gray-200"
                        : "bg-transparent text-white"
                }`}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* верхняя полоса */}
                <div className="hidden md:block bg-gray-200 text-black font-[Montserrat]">
                    <div className="mx-auto max-w-[1400px] px-6 py-3 flex justify-between items-center text-[13px]">
                        <div className="flex items-center gap-2 shrink-0">
                            <Mail size={14} />
                            <a href="mailto:director@pasgroup.kz">director@pasgroup.kz</a>
                            <span className="opacity-60">/</span>
                            <a href="mailto:zakup@pasgroup.kz">zakup@pasgroup.kz</a>
                        </div>
                        <div className="flex items-center gap-2 justify-center shrink-0">
                            <Phone size={14} />
                            <a href="tel:+77019898200">+7 701 98 98 200</a>
                            <span className="opacity-60">/</span>
                            <a href="tel:+77713082800">+7 771 30 82 800</a>
                        </div>
                        <div className="flex items-center gap-2 justify-end shrink-0">
                            <MapPin size={14} className="shrink-0" />
                            <span>
                Казахстан, г. Актау, 5А мкр., БЦ «Каспий-Grand», офис 2-10
              </span>
                        </div>
                    </div>
                </div>

                {/* основная линия */}
                <div className="border-b border-white/30 font-[Montserrat]">
                    <div className="mx-auto max-w-7xl px-6 h-[72px] md:h-[84px] flex items-center justify-between">
                        <Link href="/" className="shrink-0">
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Image
                                    src="/logo.png"
                                    alt="PAS Group"
                                    width={180}
                                    height={60}
                                    priority
                                    className="h-10 md:h-12 w-auto"
                                />
                            </motion.div>
                        </Link>

                        <div className="hidden md:block">
                            <Nav
                                handleNavigate={handleNavigate}
                                hovered={hovered}
                                setHovered={setHovered}
                                scrolled={scrolled}
                                hoverTimeout={hoverTimeout}
                                isMobile={isMobile}
                            />
                        </div>

                        <motion.button
                            className="md:hidden"
                            aria-label="Открыть меню"
                            onClick={() => setOpen(true)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Menu size={28} />
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* блюр при hover — отключаем на мобилке */}
            <AnimatePresence>
                {!isMobile && hovered && (
                    <motion.div
                        className="fixed inset-0 backdrop-blur-[4px] bg-black/25 z-[50]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    />
                )}
            </AnimatePresence>

            {/* мобильное меню */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="h-full w-[82%] max-w-[360px] bg-white text-black p-6 shadow-xl fixed top-0 right-0 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <Image
                                    src="/logo.png"
                                    alt="PAS Group"
                                    width={140}
                                    height={45}
                                    className="h-10 w-auto"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Закрыть меню"
                                    onClick={() => setOpen(false)}
                                >
                                    <X />
                                </motion.button>
                            </div>

                            <Nav
                                handleNavigate={handleNavigate}
                                mobile
                                hovered={hovered}
                                setHovered={setHovered}
                                scrolled={true}
                                hoverTimeout={hoverTimeout}
                                isMobile={isMobile}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ---------- навигация ---------- */
function Nav({
                 mobile = false,
                 handleNavigate,
                 hovered,
                 setHovered,
                 scrolled,
                 hoverTimeout,
                 isMobile,
             }: any) {
    const links = [
        { href: "/", label: "Главная" },
        { href: "/news", label: "Новости" },
        { href: "/services", label: "Услуги" },
        { href: "/solutions", label: "Наши решения" },
        { href: "/experience", label: "Наш опыт" },
        { href: "/about", label: "О компании" },
        { href: "/letters", label: "Отзывы" },
        { href: "/contacts", label: "Контакты" },
    ];

    return (
        <ul
            className={`flex ${
                mobile ? "flex-col gap-6 text-lg" : "flex-row items-center gap-8"
            } font-[Montserrat]`}
            onMouseLeave={() => setHovered(null)}
        >
            {links.map((link: any) => (
                <li key={link.href} className="list-none relative">
                    <motion.button
                        onMouseEnter={() => {
                            if (isMobile) return;
                            if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                            setHovered(link.href);
                        }}
                        onMouseLeave={() => {
                            if (isMobile) return;
                            hoverTimeout.current = setTimeout(() => setHovered(null), 120);
                        }}
                        onClick={() => handleNavigate(link.href)}
                        className={`relative px-1 text-[16px] ${
                            hovered && hovered !== link.href ? "opacity-50" : "opacity-100"
                        }`}
                        whileHover={
                            !isMobile
                                ? {
                                    scale: 1.15,
                                    transition: { duration: 0.18, ease: [0.25, 1, 0.5, 1] },
                                }
                                : {}
                        }
                        whileTap={
                            !isMobile
                                ? {
                                    scale: 0.9,
                                    transition: { duration: 0.1, ease: "easeInOut" },
                                }
                                : {}
                        }
                    >
            <span
                className={`relative z-10 inline-block transition-colors duration-300 ${
                    !isMobile
                        ? "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-l-[10px] after:border-r-[10px] after:border-transparent after:border-b-[10px] after:border-b-[#009999]/70 after:scale-y-0 after:transition-all after:duration-300 hover:after:scale-y-100"
                        : ""
                }`}
                style={{
                    color:
                        hovered === link.href
                            ? "#fff"
                            : scrolled
                                ? "#000"
                                : "#fff",
                    textShadow:
                        hovered === link.href
                            ? "0 0 12px rgba(0,255,255,0.6), 0 0 24px rgba(0,255,255,0.3)"
                            : "none",
                }}
            >
              {link.label}
            </span>

                        {!isMobile && (
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: hovered === link.href ? 1 : 0,
                                    transformOrigin:
                                        hovered === link.href ? "left center" : "right center",
                                }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="absolute top-0 left-0 w-full h-full bg-[#009999]/60 rounded-md z-0"
                            />
                        )}
                    </motion.button>
                </li>
            ))}
        </ul>
    );
}