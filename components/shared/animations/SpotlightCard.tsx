"use client";

import React, { useRef, useState } from "react";

interface Position {
    x: number;
    y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
    className?: string;
    spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
                                                         children,
                                                         className = "",
                                                         spotlightColor = "rgba(0, 153, 153, 0.55)", // фирменный цвет
                                                     }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState<number>(0);
    const [isHover, setIsHover] = useState<boolean>(false);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                setIsHover(true);
                setOpacity(1);
            }}
            onMouseLeave={() => {
                setIsHover(false);
                setOpacity(0);
            }}
            className={`
        relative rounded-2xl overflow-hidden isolate transition-all duration-500
        ${isHover ? "bg-[#FFFFFF]" : "bg-[#F3F4F6]"}
        ${className}
      `}
            style={{
                boxShadow: isHover
                    ? "0 0 28px rgba(0, 153, 153, 0.25)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
            }}
        >
            {/* ✨ световое пятно теперь обрезается по border-radius */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out rounded-2xl overflow-hidden"
                style={{
                    opacity,
                    background: `
            radial-gradient(
              circle at ${position.x}px ${position.y}px,
              ${spotlightColor} 0%,
              rgba(0, 153, 153, 0.3) 40%,
              transparent 80%
            )
          `,
                    WebkitMaskImage:
                        "radial-gradient(circle, white 98%, transparent 100%)", // делает края мягкими
                    maskImage: "radial-gradient(circle, white 98%, transparent 100%)",
                }}
            />

            {/* контент */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default SpotlightCard;