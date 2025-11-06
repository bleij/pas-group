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
    const headerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

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
        setOpen(false);
        setTimeout(() => router.push(href), 350);
    };

    const fadeIn = {
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: { opacity: 1, filter: "blur(0)", transition: { duration: 0.5, ease: "easeOut" } },
    };

    const Nav = ({ mobile = false }: { mobile?: boolean }) => (
        <nav
            className={`flex ${
                mobile ? "flex-col gap-6 text-lg" : "flex-row items-center gap-6 md:gap-10"
            }`}
        >
            {[
                { href: "/news", label: "Новости" },
                { href: "/services", label: "Услуги" },
                { href: "/solutions", label: "Наши решения" },
                { href: "/experience", label: "Наш опыт" },
                { href: "/about", label: "О компании" },
                { href: "/letters", label: "Отзывы" },
                { href: "/contacts", label: "Контакты" },
            ].map((link, i) => (
                <motion.button
                    key={link.href}
                    onClick={() => handleNavigate(link.href)}
                    className="text-left hover:opacity-80 transition"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.05 * i }}
                >
                    {link.label}
                </motion.button>
            ))}
        </nav>
    );

    return (
        <>
            <motion.header
                ref={headerRef}
                style={{ zIndex: 1000 }}
                className={`fixed top-0 left-0 right-0 w-full transition-colors duration-300 [transform:translateZ(0)] ${
                    scrolled
                        ? "bg-white text-black border-b border-gray-200"
                        : "bg-transparent text-white"
                }`}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Верхняя контактная полоса */}
                <div className="hidden md:block bg-gray-200 text-black">
                    <div className="mx-auto max-w-[1400px] px-6 py-3 flex justify-between items-center text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">
                        <div className="flex items-center gap-2 shrink-0">
                            <Mail size={14} />
                            <a href="mailto:director@pasgroup.kz" className="hover:underline">
                                director@pasgroup.kz
                            </a>
                            <span className="opacity-60">/</span>
                            <a href="mailto:zakup@pasgroup.kz" className="hover:underline">
                                zakup@pasgroup.kz
                            </a>
                        </div>
                        <div className="flex items-center gap-2 justify-center shrink-0">
                            <Phone size={14} />
                            <a href="tel:+77019898200" className="hover:underline">
                                +7 701 98 98 200
                            </a>
                            <span className="opacity-60">/</span>
                            <a href="tel:+77713082800" className="hover:underline">
                                +7 771 30 82 800
                            </a>
                        </div>
                        <div className="flex items-center gap-2 justify-end shrink-0">
                            <MapPin size={14} className="shrink-0" />
                            <span className="truncate">
                                Казахстан, г. Актау, 5 «А» мкр., БЦ «Каспий-Grand», офис 2-10
                            </span>
                        </div>
                    </div>
                </div>

                {/* Основная линия */}
                <motion.div className="border-b border-white/30" initial="hidden" animate="visible" variants={fadeIn}>
                    <div className="mx-auto max-w-7xl px-6 h-[72px] md:h-[84px] flex items-center justify-between">
                        <motion.div variants={fadeIn}>
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
                        </motion.div>

                        <motion.div className="hidden md:block" variants={fadeIn}>
                            <Nav />
                        </motion.div>

                        <motion.button
                            className="md:hidden"
                            aria-label="Открыть меню"
                            onClick={() => setOpen(true)}
                            variants={fadeIn}
                        >
                            <Menu size={28} />
                        </motion.button>
                    </div>
                </motion.div>
            </motion.header>

            {/* мобильное меню */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999]"
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
                            className="h-full w-[82%] max-w-[360px] bg-slate-900 text-white p-6 shadow-xl fixed top-0 right-0 flex flex-col"
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
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Закрыть меню"
                                    onClick={() => setOpen(false)}
                                >
                                    <X />
                                </motion.button>
                            </div>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { staggerChildren: 0.07 },
                                    },
                                }}
                            >
                                <Nav mobile />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}