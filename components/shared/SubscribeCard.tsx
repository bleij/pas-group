"use client";

import {useState} from "react";

export default function SubscribeCard() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_WP_URL}/graphql`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: `
          mutation AddSubscriber($email: String!) {
            addSubscriber(input: { email: $email }) {
              success
            }
          }
        `,
                variables: {email},
            }),
        });

        const data = await res.json();
        if (data?.data?.addSubscriber?.success) {
            setSent(true);
            setEmail("");
            setTimeout(() => setSent(false), 4000);
        } else {
            alert("Ошибка при подписке. Попробуйте позже.");
        }
    }

    return (
        <aside className="rounded-2xl bg-[#009999] p-6 text-white">
            <h3 className="text-xl md:text-2xl font-medium leading-snug mb-5">
                Будьте в курсе наших <br/> новостей и акций!
            </h3>

            <form
                onSubmit={handleSubmit}
                className="flex items-stretch bg-transparent rounded-2xl overflow-hidden border border-white/70 focus-within:border-white transition"
            >
                <input
                    type="email"
                    placeholder="Ваш Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 text-white bg-transparent placeholder:text-white/80 outline-none"
                    required
                />
                <button
                    type="submit"
                    className="bg-white flex items-center justify-center rounded-xl"
                    style={{width: "3.2rem", aspectRatio: "1 / 1"}}
                >
                    <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.3923 0.00093721C1.64948 -0.0168699 1.90718 0.0329288 2.14083 0.144492L2.14132 0.143515L20.1413 8.64352L20.1418 8.644C20.3666 8.75031 20.5608 8.9106 20.7077 9.10982L20.7678 9.19771L20.8215 9.28902C20.9388 9.50701 21.0007 9.75129 21.0007 9.99996C21.0007 10.2841 20.9198 10.5626 20.7678 10.8027C20.6158 11.0427 20.3986 11.2345 20.1418 11.3559L20.1413 11.3564L2.14132 19.8564L2.14083 19.8559C1.87278 19.9836 1.57292 20.029 1.27902 19.9858C0.981733 19.9421 0.704327 19.8102 0.483117 19.6069C0.261874 19.4035 0.106808 19.1378 0.038293 18.8452C-0.0293355 18.5561 -0.0091446 18.2537 0.0954219 17.976H0.0949336L2.93722 10.3486C3.02087 10.1237 3.02088 9.87623 2.93722 9.65133L0.0988399 2.03512C-0.00962441 1.75432 -0.0312245 1.44737 0.0373164 1.15426C0.105882 0.861227 0.260947 0.595585 0.482629 0.392051L0.568566 0.318808C0.77438 0.156633 1.01987 0.0510051 1.28048 0.0131442L1.3923 0.00093721ZM4.81124 11.0468V11.0473L2.39816 17.5229L16.2121 11H4.82736C4.82185 11.0155 4.81701 11.0313 4.81124 11.0468ZM4.81124 8.9526V8.95309C4.81701 8.96858 4.82185 8.9844 4.82736 8.99996H16.2121L2.39718 2.47603L4.81124 8.9526Z"
                            fill="#009999"
                        />
                    </svg>
                </button>
            </form>

            <p className="text-xs mt-4 text-white/90 leading-relaxed">
                Нажимая кнопку, вы даёте согласие на{" "}
                <span className="underline decoration-white/70">
          обработку персональных данных
        </span>
            </p>

            {sent && (
                <div className="mt-3 text-sm bg-white/20 py-2 px-3 rounded-lg">
                    ✅ Спасибо! Вы подписаны.
                </div>
            )}
        </aside>
    );
}