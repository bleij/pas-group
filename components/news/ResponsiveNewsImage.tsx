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
    const [isVertical, setIsVertical] = useState(false);

    return (
        <div
            className={`mb-12 w-full flex items-center justify-center rounded-2xl overflow-hidden bg-gray-100 ${
                isVertical ? "aspect-[3/4]" : "aspect-video"
            }`}
            style={{maxHeight: isVertical ? "65vh" : "50vh"}}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <Image
                    src={src}
                    alt={alt || ""}
                    width={1400}
                    height={700}
                    className={`rounded-2xl ${
                        isVertical
                            ? "object-cover object-top h-full w-auto"
                            : "object-contain w-auto max-h-[70vh]"
                    }`}
                    priority
                    onLoadingComplete={(img) => {
                        if (img.naturalHeight > img.naturalWidth) setIsVertical(true);
                    }}
                />
            </div>
        </div>
    );
}