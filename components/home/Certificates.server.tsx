import { wpRequest } from "@/lib/wp-client";
import { GET_CERTIFICATES, CertificatesResp } from "@/lib/queries/certificates";
import CertificatesClient from "./Certificates.client";

export const revalidate = 60;

export default async function CertificatesSection() {
    const data = await wpRequest<CertificatesResp>(GET_CERTIFICATES, { first: 4 });
    const items = data.certificates?.nodes ?? [];

    return (
        <CertificatesClient
            items={items}
            title="Сертификаты"
            showMoreHref="/certificates"
            /* фон белый по умолчанию */
        />
    );
}
