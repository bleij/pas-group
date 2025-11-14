"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function RequestModal({
                                         isOpen,
                                         onClose,
                                         defaultService,
                                         title = "Получить коммерческое предложение",
                                     }: {
    isOpen: boolean;
    onClose: () => void;
    defaultService?: string | null;
    title?: string;
}) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        telegram: "",
        service: defaultService || "",
        details: "",
    });

    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);

    // 🔹 автоформатирование телефона
    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, "");
        if (!digits) return "";

        let formatted = "+";

        // Казахстан / Россия (+7)
        if (digits.startsWith("7")) {
            formatted = "+7";
            if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
            if (digits.length >= 5) formatted += `) ${digits.slice(4, 7)}`;
            if (digits.length >= 8) formatted += `-${digits.slice(7, 9)}`;
            if (digits.length >= 10) formatted += `-${digits.slice(9, 11)}`;
        } else {
            // остальные страны
            formatted += digits;
        }

        return formatted;
    };

    // 🔹 фильтр имени (только буквы и пробелы)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyLetters = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
        setForm({ ...form, name: onlyLetters });
    };

    // 🔹 обработка отправки формы
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);

        const payload = {
            ...form,
            service: form.service.trim() || defaultService || "Не указана",
        };

        const res = await fetch("/api/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setPending(false);

        if (res.ok) {
            setSuccess(true);
            setForm({
                name: "",
                phone: "",
                email: "",
                telegram: "",
                service: defaultService || "",
                details: "",
            });
            setTimeout(() => setSuccess(false), 4000);
            onClose();
        } else {
            alert("Ошибка при отправке, попробуйте позже.");
        }
    }

    return (
        <>
            {/* 🔹 Модалка */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 sm:p-8 w-[90%] max-w-md shadow-2xl relative"
                            initial={{ y: 60, opacity: 0, filter: "blur(8px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: 60, opacity: 0, filter: "blur(8px)" }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold mb-4">{title}</h3>

                            {/* если передана услуга — просто текст */}
                            {defaultService ? (
                                <p className="text-sm mb-4 text-gray-600">
                                    Услуга:{" "}
                                    <span className="font-semibold text-[#009999]">
                    {defaultService}
                  </span>
                                </p>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Введите услугу"
                                    value={form.service}
                                    onChange={(e) =>
                                        setForm({ ...form, service: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none mb-4"
                                    required
                                />
                            )}

                            {/* форма */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Ваше имя"
                                    value={form.name}
                                    onChange={handleNameChange}
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder="+7 (___) ___-__-__"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: formatPhone(e.target.value),
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Email (по желанию)"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                />

                                <input
                                    type="text"
                                    placeholder="Telegram (по желанию, @username)"
                                    value={form.telegram}
                                    onChange={(e) =>
                                        setForm({ ...form, telegram: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                />

                                <textarea
                                    placeholder="Кратко опишите задачу"
                                    value={form.details}
                                    onChange={(e) =>
                                        setForm({ ...form, details: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none min-h-[100px]"
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
                                onClick={onClose}
                                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 🔔 уведомление */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        className="fixed bottom-6 right-6 bg-[#009999] text-white px-6 py-3 rounded-xl shadow-lg z-[10000]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        ✅ Заявка успешно отправлена!
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}