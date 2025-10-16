// components/shared/SubscribeCard.tsx
export default function SubscribeCard() {
    return (
        <aside className="rounded-2xl bg-[#D4AF37] p-6 text-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">
                Будьте в курсе наших новостей и акций!
            </h3>

            <div className="flex items-center gap-2">
                <input
                    type="email"
                    placeholder="Ваш Email"
                    className="w-full rounded-xl px-4 py-3 text-black placeholder:text-gray-500"
                />
                <button
                    className="shrink-0 rounded-xl bg-white text-black px-4 py-3 font-medium hover:bg-gray-100 transition"
                    aria-label="Подписаться"
                >
                    →
                </button>
            </div>

            <p className="text-xs mt-3 opacity-90">
                Нажимая кнопку, вы даёте согласие на обработку персональных данных
            </p>
        </aside>
    );
}