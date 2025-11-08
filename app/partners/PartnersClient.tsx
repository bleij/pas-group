// app/partners/PartnersClient.tsx
"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import type {PartnerNode} from "@/lib/queries/partners";

export default function PartnersClient({partners}: { partners: PartnerNode[] }) {
    const blurFade = {
        hidden: {opacity: 0, filter: "blur(12px)", y: 30},
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1], staggerChildren: 0.08},
        },
    };

    const item = {
        hidden: {opacity: 0, filter: "blur(10px)", y: 20},
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {duration: 0.5, ease: [0.33, 1, 0.68, 1]},
        },
    };

    return (
        <motion.section
            className="flex-1 py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={blurFade}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.h1 className="text-3xl font-bold mb-8" variants={item}>
                    Наши партнёры
                </motion.h1>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8"
                    variants={blurFade}
                >
                    {partners.map(
                        (p) =>
                            p.featuredImage?.node?.sourceUrl && (
                                <motion.div
                                    key={p.id}
                                    variants={item}
                                    whileHover={{scale: 1.05, transition: {duration: 0.3}}}
                                    className="flex items-center justify-center"
                                >
                                    <Image
                                        src={p.featuredImage.node.sourceUrl}
                                        alt={p.featuredImage.node.altText || p.title}
                                        width={200}
                                        height={100}
                                        className="object-contain max-h-24"
                                    />
                                </motion.div>
                            )
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
}