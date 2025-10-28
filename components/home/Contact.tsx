"use client";

import Image from "next/image";

export default function Contact() {
    return (
        <section id="contact" className="w-full bg-white py-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* заголовок и форма */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* текстовая часть */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Бесплатная консультация от PAS
                        </h2>
                        <div className="h-1 w-24 bg-[#009999] mb-6"></div>

                        <p className="text-gray-700 mb-8 text-lg">
                            Оставьте заявку и получите подробную консультацию о наших услугах
                        </p>
                    </div>

                    {/* форма */}
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                className="flex-1 px-5 py-4 bg-gray-100 text-black text-lg rounded-xl focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Номер телефона"
                                className="flex-1 px-5 py-4 bg-gray-100 text-black text-lg rounded-xl focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-[#009999] hover:bg-[#007A7A] text-white rounded-xl text-lg transition font-medium self-start"
                            >
                                Отправить
                            </button>
                            <p className="text-sm text-gray-600 leading-snug sm:max-w-[300px]">
                                Нажимая на кнопку “Отправить”, вы соглашаетесь с{" "}
                                <a
                                    href="#"
                                    className="text-[#009999] hover:text-[#007A7A] underline underline-offset-2"
                                >
                                    политикой конфиденциальности
                                </a>
                            </p>
                        </div>
                    </form>
                </div>

                {/* карта */}
                <div className="relative mt-14">
                    <a
                        href="https://go.2gis.com/OFnSC"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="relative w-full h-80 md:h-[560px] rounded-2xl overflow-hidden">
                            <Image
                                src="/map.jpg"
                                alt="Карта PAS"
                                fill
                                className="object-cover object-[80%_center] md:object-center"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    </a>

                    {/* карточка с контактами */}
                    <div
                        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 bg-white p-10 rounded-2xl shadow-md w-[420px] h-[440px] hidden md:flex flex-col justify-center">
                        <div>
                            <p className="mb-4 leading-loose">
                                <span className="font-medium">Адрес:</span> Казахстан, г. Актау, 5 «А» мкр., БЦ
                                «Каспий-Grand», офис 10
                            </p>
                            <p className="mb-4 leading-loose">
                                <span className="font-medium">Телефон:</span> +7 701 98 98 200<br/>+7 771 30 82 800
                            </p>
                            <p className="leading-loose">
                                <span className="font-medium">Email:</span> director@pasgroup.kz<br/>zakup@pasgroup.kz
                            </p>
                        </div>

                        <div className="flex gap-4 mt-8 items-center">
                            {[
                                {
                                    href: "https://www.facebook.com/POWER-AUTOMATION-SOLUTIONS-LLP-114956666727830/",
                                    src: "/facebook.svg",
                                    alt: "facebook"
                                },
                                {
                                    href: "https://www.instagram.com/power_and_automation/",
                                    src: "/instagram.svg",
                                    alt: "instagram"
                                },
                                {
                                    href: "https://www.youtube.com/channel/UC4_7_eaWfuoiPOH9y7BlUXA/videos",
                                    src: "/youtube.svg",
                                    alt: "youtube"
                                },
                                {
                                    href: "https://www.linkedin.com/in/alexandr-pauk-7b225138/",
                                    src: "/linkedin.svg",
                                    alt: "linkedin"
                                },
                                {
                                    href: "https://www.tiktok.com/@power_and_automation",
                                    src: "/tiktok.svg",
                                    alt: "tiktok"
                                },
                            ].map((icon) => (
                                <a key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer"
                                   className="w-6 h-6 relative">
                                    <Image
                                        src={icon.src}
                                        alt={icon.alt}
                                        fill
                                        className="object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}