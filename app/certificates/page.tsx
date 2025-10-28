// app/certificates/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {wpRequest} from "@/lib/wp-client";
import {
    GET_CERTIFICATES,
    CertificatesResp,
} from "@/lib/queries/certificates";
import CertificatesClient from "@/components/home/Certificates.client";

export const revalidate = 60;

export default async function CertificatesPage() {
    const data = await wpRequest<CertificatesResp>(GET_CERTIFICATES, {first: 40});
    const items = data.certificates?.nodes ?? [];

    return (
        <main className="flex min-h-screen flex-col">
            <Header/>
            <section className="w-full bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Сертификаты</h1>
                    <div className="h-1 w-16 bg-[#009999] mb-8"></div>
                </div>
                <CertificatesClient items={items}/>
            </section>
            <Footer/>
        </main>
    );
}
