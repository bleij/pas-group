import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CertificatesSection from "./CertificatesSection.server";

export default function CertificatesPage() {
    return (
        <main className="flex min-h-screen flex-col bg-gray-100">
            <Header />
            <CertificatesSection />
            <Footer />
        </main>
    );
}