"use client";

import { useEffect, useRef } from "react";

export default function ParticleCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        alpha: number;
        size: number;
        color: string;
    }[] = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const addParticle = (x: number, y: number, speedMul = 1, sizeMul = 1) => {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 1.1 + 0.3) * speedMul; // немного быстрее
            const size = (Math.random() * 3 + 1.5) * sizeMul; // чуть крупнее
            const hue = 185 + Math.random() * 15; // бирюзовый диапазон
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.4 * speedMul,
                alpha: 0.75 + Math.random() * 0.2, // умеренная прозрачность
                size,
                color: `hsl(${hue}, 80%, 60%)`,
            });
        };

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.018;
                p.alpha -= 0.015; // живут чуть дольше
                p.size *= 0.97;

                if (p.alpha <= 0.05 || p.size < 0.3) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.fillStyle = `${p.color.replace("hsl", "hsla").replace(")", `,${p.alpha})`)}`;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6; // чуть сильнее свечение
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(update);
        };
        update();

        // лёгкий след — 2 частицы на движение
        const move = (e: MouseEvent) => {
            for (let i = 0; i < 2; i++) addParticle(e.clientX, e.clientY);
        };

        // мягкий, но заметный взрыв
        const click = (e: MouseEvent) => {
            const burstCount = 30;
            for (let i = 0; i < burstCount; i++) {
                addParticle(e.clientX, e.clientY, 2.5, 1.3);
            }
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("click", click);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("click", click);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10] opacity-75"
        />
    );
}