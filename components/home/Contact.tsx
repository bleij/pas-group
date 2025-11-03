"use client";

import {useState} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";

export default function Contact() {
    const [form, setForm] = useState({name: "", phone: ""});
    const [modalOpen, setModalOpen] = useState(false);
    const [extra, setExtra] = useState({service: "", email: ""});
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleBaseSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!form.name || !form.phone) return;
        setModalOpen(true);
    }

    async function handleFinalSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);

        const payload = {...form, ...extra};

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        setPending(false);

        if (res.ok) {
            setSuccess(true);
            setForm({name: "", phone: ""});
            setExtra({service: "", email: ""});
            setModalOpen(false);

            setTimeout(() => setSuccess(false), 4000);
        } else {
            alert("Ошибка при отправке, попробуйте позже.");
        }
    }

    return (
        <section id="contact" className="w-full bg-white py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Заголовок и форма */}
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Бесплатная консультация от PAS
                        </h2>
                        <div className="h-1 w-24 bg-[#009999] mb-6"></div>
                        <p className="text-gray-700 mb-8 text-lg">
                            Оставьте заявку и получите подробную консультацию о наших услугах
                        </p>
                    </div>

                    <form onSubmit={handleBaseSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                value={form.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setForm({...form, name: e.target.value})
                                }
                                className="flex-1 px-5 py-4 bg-gray-100 text-black text-lg rounded-xl focus:outline-none"
                                required
                            />
                            <input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Номер телефона"
                                value={form.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setForm({
                                        ...form,
                                        phone: e.target.value.replace(/\D/g, ""),
                                    })
                                }
                                className="flex-1 px-5 py-4 bg-gray-100 text-black text-lg rounded-xl focus:outline-none"
                                required
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

                {/* Карта */}
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

                    {/* Карточка с контактами */}
                    <div
                        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 bg-white p-10 rounded-2xl shadow-md w-[420px] h-[440px] hidden md:flex flex-col justify-center">
                        <div>
                            <p className="mb-4 leading-loose">
                                <span className="font-medium">Адрес:</span> Казахстан, г. Актау,
                                5 «А» мкр., БЦ «Каспий-Grand», офис 10
                            </p>
                            <p className="mb-4 leading-loose">
                                <span className="font-medium">Телефон:</span> +7 701 98 98 200
                                <br/>+7 771 30 82 800
                            </p>
                            <p className="leading-loose">
                                <span className="font-medium">Email:</span> director@pasgroup.kz
                                <br/>
                                zakup@pasgroup.kz
                            </p>
                        </div>

                        <div className="flex gap-4 mt-8 items-center">
                            {[
                                {
                                    href: "https://www.facebook.com/POWER-AUTOMATION-SOLUTIONS-LLP-114956666727830/",
                                    src: "/facebook.svg",
                                    alt: "facebook",
                                },
                                {
                                    href: "https://www.instagram.com/power_and_automation/",
                                    src: "/instagram.svg",
                                    alt: "instagram",
                                },
                                {
                                    href: "https://www.youtube.com/channel/UC4_7_eaWfuoiPOH9y7BlUXA/videos",
                                    src: "/youtube.svg",
                                    alt: "youtube",
                                },
                                {
                                    href: "https://www.linkedin.com/in/alexandr-pauk-7b225138/",
                                    src: "/linkedin.svg",
                                    alt: "linkedin",
                                },
                                {
                                    href: "https://www.tiktok.com/@power_and_automation",
                                    src: "/tiktok.svg",
                                    alt: "tiktok",
                                },
                            ].map((icon) => (
                                <a
                                    key={icon.alt}
                                    href={icon.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-6 h-6 relative"
                                >
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

            {/* модалка */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 sm:p-8 w-[90%] max-w-md shadow-2xl relative"
                            initial={{y: 40, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: 40, opacity: 0}}
                            transition={{duration: 0.25}}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold mb-4">Дополнительные данные</h3>
                            <form onSubmit={handleFinalSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Тип услуги (по желанию)"
                                    value={extra.service}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setExtra({...extra, service: e.target.value})
                                    }
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Email (по желанию)"
                                    value={extra.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setExtra({...extra, email: e.target.value})
                                    }
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                />

                                <button
                                    type="submit"
                                    disabled={pending}
                                    className="w-full py-3 bg-[#009999] hover:bg-[#007A7A] text-white rounded-xl font-medium transition"
                                >
                                    {pending ? "Отправка..." : "Отправить"}
                                </button>
                            </form>

                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* уведомление об успехе */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        className="fixed bottom-6 right-6 bg-[#009999] text-white px-6 py-3 rounded-xl shadow-lg"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.3}}
                    >
                        ✅ Заявка успешно отправлена!
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}