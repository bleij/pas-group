import Header from "@/components/layout/Header";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export default function ContactsPage() {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Header/>

            {/* Основной блок контактов */}
            <section className="w-full py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-[32px] md:text-[38px] font-bold mb-8">
                        Контакты
                    </h1>

                    <div className="space-y-3 text-[16px] leading-relaxed">
                        <p>
                            <strong>Адрес:</strong> Казахстан, г. Актау, 5&nbsp;
                            &quot;А&quot;&nbsp;мкр, БЦ «Каспий-Grand», офис&nbsp;10
                        </p>

                        <p>
                            <strong>Телефон:</strong>{" "}
                            <a
                                href="tel:+77019898200"
                                className="text-[#009999] hover:underline"
                            >
                                +7&nbsp;701&nbsp;98&nbsp;98&nbsp;200
                            </a>{" "}
                            /{" "}
                            <a
                                href="tel:+77713082800"
                                className="text-[#009999] hover:underline"
                            >
                                +7&nbsp;771&nbsp;30&nbsp;82&nbsp;800
                            </a>
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            <a
                                href="mailto:director@pasgroup.kz"
                                className="text-[#009999] hover:underline"
                            >
                                director@pasgroup.kz
                            </a>{" "}
                            /{" "}
                            <a
                                href="mailto:zakup@pasgroup.kz"
                                className="text-[#009999] hover:underline"
                            >
                                zakup@pasgroup.kz
                            </a>
                        </p>
                    </div>

                    {/* Кнопки */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <a
                            href="https://go.2gis.com/lyrGi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-md bg-[#009999] hover:bg-[#007A7A] text-white font-medium transition"
                        >
                            Посмотреть в&nbsp;2ГИС
                        </a>

                        <a
                            href="https://yandex.com/maps/-/CLb8FTmV"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-md bg-[#E5E7EB] hover:bg-[#A5A7AA] text-[#374151] font-medium transition"
                        >
                            Посмотреть в&nbsp;Яндекс&nbsp;картах
                        </a>
                    </div>
                </div>
            </section>

            {/* Форма и карта */}
            <Contact/>

            {/* Футер */}
            <Footer/>
        </main>
    );
}