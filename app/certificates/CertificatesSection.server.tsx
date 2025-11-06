import {wpRequest} from "@/lib/wp-client";
import {GET_CERTIFICATES, CertificatesResp} from "@/lib/queries/certificates";
import CertificatesModal from "./CertificatesModal.client";

export const revalidate = 60;

export default async function CertificatesSection() {
    const data = await wpRequest<CertificatesResp>(GET_CERTIFICATES, {first: 40});
    const items = data.certificates?.nodes ?? [];

    return (
        <section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-6">
                <CertificatesModal items={items}/>
            </div>
        </section>
    );
}