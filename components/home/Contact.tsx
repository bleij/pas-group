"use client";

export default function Contact() {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Левая колонка с формой и контактами */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        Бесплатная консультация от PAS group
                    </h2>
                    <p className="mb-6 text-gray-700">
                        Оставьте заявку и получите подробную консультацию о наших услугах
                    </p>

                    {/* Форма */}
                    <form className="flex flex-col sm:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            className="flex-1 px-4 py-3 bg-gray-100 rounded-md focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Номер телефона"
                            className="flex-1 px-4 py-3 bg-gray-100 rounded-md focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                        >
                            Отправить
                        </button>
                    </form>

                    <p className="text-xs text-gray-500 mb-10">
                        Нажимая на кнопку &quot;Отправить&quot;, вы соглашаетесь с политикой
                        конфиденциальности
                    </p>

                    {/* Контакты */}
                    <div className="bg-blue-100 p-6 rounded-lg mb-6">
                        <p className="mb-3">
                            <span className="font-bold">Адрес:</span> Казахстан, г. Актау 5
                            &quot;А&quot; мкр., БЦ «Каспий-Grand», офис 10
                        </p>
                        <p className="mb-3">
                            <span className="font-bold">Телефон:</span> +7 701 98 98 200 <br/>
                            +7 771 30 82 800
                        </p>
                        <p className="mb-3">
                            <span className="font-bold">Email:</span> director@pasgroup.kz{" "}
                            <br/>
                            zakup@pasgroup.kz
                        </p>

                        {/* Соцсети */}
                        <div className="flex gap-4 text-lg mt-4">
                            <a href="#" aria-label="Facebook">
                                f
                            </a>
                            <a href="#" aria-label="Instagram">
                                in
                            </a>
                            <a href="#" aria-label="YouTube">
                                yt
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                ln
                            </a>
                            <a href="#" aria-label="TikTok">
                                tt
                            </a>
                        </div>
                    </div>
                </div>

                {/* Правая колонка с картой */}
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                    {/* TODO: Подключить карту (например, Google Maps iframe или react-map-gl) */}
                    <span className="text-gray-600">Здесь будет карта</span>
                </div>
            </div>
        </section>
    );
}
