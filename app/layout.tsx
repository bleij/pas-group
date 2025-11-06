import "./globals.css";
import {Montserrat} from "next/font/google";
import type {Metadata} from "next";
import ParticleCursor from "@/components/ParticleCursor";

export const metadata: Metadata = {
    title: "PAS Group",
    description: "Энергетика и автоматизация под ключ",
};

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-sans",
    display: "swap",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" className={montserrat.variable}>
        <body className="font-sans antialiased bg-white text-gray-900">
        <ParticleCursor/>
        {children}
        </body>
        </html>
    );
}