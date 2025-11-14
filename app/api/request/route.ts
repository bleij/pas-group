import {NextRequest, NextResponse} from "next/server";

// простая утилита форматирования телефона
function formatPhone(phone: string) {
    const digits = phone.replace(/\D/g, "");

    // Казахстан / Россия (+7)
    if (digits.startsWith("7") && digits.length === 11) {
        return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
    }

    // США (+1)
    if (digits.startsWith("1") && digits.length === 11) {
        return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }

    // Великобритания, Европа, прочее
    if (digits.length > 7 && digits.length <= 15) {
        return `+${digits}`;
    }

    return digits; // fallback
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // 🔹 очистка и форматирование телефона
        const cleanPhone = (data.phone || "").replace(/\D/g, "");
        if (cleanPhone.length < 10 || cleanPhone.length > 15) {
            return NextResponse.json(
                {success: false, error: "Некорректный номер телефона"},
                {status: 400}
            );
        }
        const formattedPhone = formatPhone(cleanPhone);

        // 🔹 составляем сообщение
        const message = `
📄 <b>Новая заявка на коммерческое предложение (PAS Group)</b>

👤 <b>Имя:</b> ${data.name || "—"}
📞 <b>Телефон:</b> ${formattedPhone}
📧 <b>Email:</b> ${data.email || "—"}
💬 <b>Telegram:</b> ${data.telegram || "—"}
🧩 <b>Услуга:</b> ${data.service || "—"}
📝 <b>Комментарий:</b> ${data.details || "—"}
`;

        // 🔹 отправка в Telegram
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