import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DocumentsSection from "./DocumentsSection.server";

export default function DocumentsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-white">
            <Header/>
            <DocumentsSection/>
            <Footer/>
        </main>
    );
}