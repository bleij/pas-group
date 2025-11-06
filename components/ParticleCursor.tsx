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

        // создаём частицы
        const addParticle = (x: number, y: number) => {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1.2 + 0.3;
            const size = Math.random() * 4 + 2; // 2–6 px
            const hue = 170 + Math.random() * 40; // оттенки между бирюзовым и голубым
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5,
                alpha: 1,
                size,
                color: `hsl(${hue}, 80%, 60%)`,
            });
        };

        // обновление
        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.02; // немного гравитации
                p.alpha -= 0.015;
                p.size *= 0.96; // уменьшаем размер

                if (p.alpha <= 0.05 || p.size < 0.5) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.fillStyle = `${p.color.replace("hsl", "hsla").replace(")", `,${p.alpha})`)}`;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 12;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(update);
        };

        update();

        // след при движении мыши
        const move = (e: MouseEvent) => {
            for (let i = 0; i < 4; i++) addParticle(e.clientX, e.clientY);
        };
        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
        />
    );
}