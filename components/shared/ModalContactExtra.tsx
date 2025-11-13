"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface ModalContactExtraProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { service: string; email: string; telegram?: string }) => void;
}

export default function ModalContactExtra({
                                              isOpen,
                                              onClose,
                                              onSubmit,
                                          }: ModalContactExtraProps) {
    const [service, setService] = useState("");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({ service, email, telegram });
    }

    // 💡 если документа нет (SSR) — не рендерим
    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative bg-white rounded-2xl p-6 sm:p-8 w-[90%] max-w-md shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <h3 className="text-xl font-bold mb-4">Дополнительные данные</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Тип услуги (по желанию)"
                                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email (по желанию)"
                                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Telegram (по желанию, @username)"
                                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                                value={telegram}
                                onChange={(e) => setTelegram(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#009999] hover:bg-[#007A7A] text-white rounded-xl font-medium transition"
                            >
                                Отправить
                            </button>
                        </form>

                        <button
                            onClick={onClose}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ×
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body // 🔥 теперь рендерится прямо в <body>, а не в родителя Contact
    );
}