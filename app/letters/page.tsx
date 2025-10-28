import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LettersSection from "./LettersSection.server";

export default function LettersPage() {
    return (
        <main className="flex min-h-screen flex-col bg-white">
            <Header/>
            <LettersSection/>
            <Footer/>
        </main>
    );
}