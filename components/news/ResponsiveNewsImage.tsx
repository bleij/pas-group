"use client";

import {useState} from "react";
import Image from "next/image";

export default function ResponsiveNewsImage({
                                                src,
                                                alt,
                                            }: {
    src: string;
    alt?: string;
}) {
    const [orientation, setOrientation] = useState<"landscape" | "portrait" | "square">("landscape");

    return (
        <div
            className={`mb-12 w-full flex items-center justify-center rounded-2xl overflow-hidden bg-gray-100 ${
                orientation === "portrait" ? "aspect-[3/4]" : "aspect-video"
            }`}
            style={{maxHeight: orientation === "portrait" ? "85vh" : "70vh"}}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <Image
                    src={src}
                    alt={alt || ""}
                    width={1400}
                    height={700}
                    className={`rounded-2xl ${
                        orientation === "portrait"
                            ? "object-cover object-top h-full w-auto"
                            : orientation === "square"
                                ? "object-cover object-[center_35%] h-full w-auto"
                                : "object-contain w-auto max-h-[70vh]"
                    }`}
                    priority
                    onLoadingComplete={(img) => {
                        const {naturalWidth: w, naturalHeight: h} = img;
                        if (h > w * 1.1) setOrientation("portrait");
                        else if (Math.abs(h - w) / w < 0.1) setOrientation("square");
                        else setOrientation("landscape");
                    }}
                />
            </div>
        </div>
    );
}