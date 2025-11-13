import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const message = `
📄 <b>Новая заявка на коммерческое предложение (PAS Group)</b>

👤 <b>Имя:</b> ${data.name || "—"}
📞 <b>Телефон:</b> ${data.phone || "—"}
📧 <b>Email:</b> ${data.email || "—"}
💬 <b>Telegram:</b> ${data.telegram || "—"}
🧩 <b>Услуга:</b> ${data.service || "—"}
📝 <b>Комментарий:</b> ${data.details || "—"}
`;

        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

        const res = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: "HTML",
                }),
            }
        );

        const telegramResponse = await res.json();

        if (!telegramResponse.ok) {
            console.error("Telegram error:", telegramResponse);
            return NextResponse.json({success: false}, {status: 500});
        }

        return NextResponse.json({success: true});
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({success: false}, {status: 500});
    }
}