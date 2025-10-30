"use client";

import Image from "next/image";
import {ArrowUp} from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-white relative">
            {/* ===== MOBILE (<= md) ===== */}
            <div className="md:hidden px-4 py-10">
                <div className="bg-[#F2F2F2] rounded-[24px] p-6">
                    <Image
                        src="/logo.png"
                        alt="PAS Group"
                        width={360}
                        height={180}
                        className="h-[48px] w-auto mb-6"
                        priority
                    />

                    <p className="text-[16px] leading-snug text-[#0A142F] mb-8 font-medium">
                        Казахстан, г. Актау 5 "А" мкр,<br/>
                        БЦ «Каспий-Grand», офис 2-10
                    </p>

                    {/* телефоны — БЛОКИ, чтобы не склеивались */}
                    <div className="space-y-4 mb-8">
                        <a href="tel:+77019898200" className="block text-[14px] leading-snug underline font-medium">
                            +7 701 98 98 200
                        </a>
                        <a href="tel:+77713082800" className="block text-[14px] leading-snug underline font-medium">
                            +7 771 30 82 800
                        </a>
                    </div>

                    {/* почта — БЛОКИ + перенос длинных строк */}
                    <div className="space-y-4 mb-10">
                        <a
                            href="mailto:director@pasgroup.kz"
                            className="block break-words text-[14px] leading-snug underline font-medium"
                        >
                            director@pasgroup.kz
                        </a>
                        <a
                            href="mailto:zakup@pasgroup.kz"
                            className="block break-words text-[14px] leading-snug underline font-medium"
                        >
                            zakup@pasgroup.kz
                        </a>
                    </div>

                    {/* меню — БЛОКИ */}
                    <nav className="space-y-4 text-[14px] leading-snug text-[#0A142F] mb-10">
                        <a href="/solutions" className="block">Наши решения</a>
                        <a href="/#experience" className="block">Наш опыт</a>
                        <a href="/letters" className="block">Отзывы</a>
                        <a href="/services" className="block">Услуги</a>
                        <a href="/news" className="block">Новости</a>
                        <a href="/#about" className="block">О компании</a>
                    </nav>

                    {/* соцсети одинакового размера */}
                    <div className="flex items-center gap-6 mb-8">
                        <a href="https://www.facebook.com/POWER-AUTOMATION-SOLUTIONS-LLP-114956666727830/"
                           target="_blank" aria-label="Facebook">
                            <Image src="/facebook.svg" alt="" width={40} height={40} className="w-10 h-10"/>
                        </a>
                        <a href="https://www.instagram.com/power_and_automation/" target="_blank"
                           aria-label="Instagram">
                            <Image src="/instagram.svg" alt="" width={40} height={40} className="w-10 h-10"/>
                        </a>
                        <a href="https://www.youtube.com/channel/UC4_7_eaWfuoiPOH9y7BlUXA/videos" target="_blank"
                           aria-label="YouTube">
                            <Image src="/youtube.svg" alt="" width={40} height={40} className="w-10 h-10"/>
                        </a>
                        <a href="https://www.linkedin.com/in/alexandr-pauk-7b225138/" target="_blank"
                           aria-label="LinkedIn">
                            <Image src="/linkedin.svg" alt="" width={40} height={40} className="w-10 h-10"/>
                        </a>
                        <a href="https://www.tiktok.com/@power_and_automation" target="_blank" aria-label="TikTok">
                            <Image src="/tiktok.svg" alt="" width={40} height={40} className="w-10 h-10"/>
                        </a>
                    </div>

                    <a href="/privacy" className="underline text-[12px]">Политика конфиденциальности</a>
                    <p className="mt-4 text-[14px] text-[#444]">© 2025 PAS All rights reserved.</p>
                </div>
            </div>

            {/* ===== DESKTOP (md+) ===== */}
            <div className="hidden md:block">
                <div
                    className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-3 gap-12 items-start text-[#111] leading-snug">
                    {/* лого ЧУТЬ БОЛЬШЕ */}
                    <div className="flex items-start">
                        <Image
                            src="/logo.png"
                            alt="PAS Group"
                            width={360}
                            height={240}
                            className="h-[80px] w-auto"
                            priority
                        />
                    </div>

                    {/* адрес ЧУТЬ МЕНЬШЕ */}
                    <div className="text-[18px]">
                        <p className="text-2xl leading-snug mb-8">
                            Казахстан, г. Актау 5 "А" мкр,<br/>
                            БЦ «Каспий-Grand», офис 2-10
                        </p>
                        <div className="space-y-3 mb-6">
                            <a href="tel:+77019898200" className="block hover:underline">+7 701 98 98 200</a>
                            <a href="tel:+77713082800" className="block hover:underline">+7 771 30 82 800</a>
                        </div>
                        <div className="space-y-3">
                            <a href="mailto:director@pasgroup.kz"
                               className="block hover:underline">director@pasgroup.kz</a>
                            <a href="mailto:zakup@pasgroup.kz" className="block hover:underline">zakup@pasgroup.kz</a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 text-[18px]">
                        <div className="flex flex-col gap-2">
                            <a href="/solutions" className="hover:underline">Наши решения</a>
                            <a href="/experience" className="hover:underline">Наш опыт</a>
                            <a href="/letters" className="hover:underline">Отзывы</a>
                            <a href="/services" className="hover:underline">Услуги</a>
                            <a href="/news" className="hover:underline">Новости</a>
                            <a href="/about" className="hover:underline">О компании</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href="https://www.instagram.com/power_and_automation/" target="_blank"
                               className="hover:underline">Instagram</a>
                            <a href="https://www.facebook.com/POWER-AUTOMATION-SOLUTIONS-LLP-114956666727830/"
                               target="_blank" className="hover:underline">Facebook</a>
                            <a href="https://www.youtube.com/channel/UC4_7_eaWfuoiPOH9y7BlUXA/videos" target="_blank"
                               className="hover:underline">Youtube</a>
                            <a href="https://www.linkedin.com/in/alexandr-pauk-7b225138/" target="_blank"
                               className="hover:underline">LinkedIN</a>
                            <a href="https://www.tiktok.com/@power_and_automation" target="_blank"
                               className="hover:underline">Tiktok</a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pb-12 flex justify-between items-center text-[14px] text-[#444]">
                    <a href="/privacy" className="hover:underline">Политика конфиденциальности</a>
                    <p>© 2025 PAS All rights reserved.</p>
                </div>
            </div>

            {/* кнопка вверх */}
            <button
                onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                className="fixed right-6 bottom-6 p-3 rounded-full bg-[#009999] hover:bg-[#007A7A] text-white shadow-md transition"
                aria-label="Наверх"
            >
                <ArrowUp size={20}/>
            </button>
        </footer>
    );
}