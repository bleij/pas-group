"use client";

import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

// ✅ добавляем типизацию пропсов
interface ModalContactExtraProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { service: string; email: string }) => void;
}

export default function ModalContactExtra({
                                              isOpen,
                                              onClose,
                                              onSubmit,
                                          }: ModalContactExtraProps) {
    const [service, setService] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({service, email});
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-6 sm:p-8 w-[90%] max-w-md shadow-xl relative"
                        onClick={(e) => e.stopPropagation()}
                        initial={{scale: 0.95, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.95, opacity: 0}}
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
        </AnimatePresence>
    );
}