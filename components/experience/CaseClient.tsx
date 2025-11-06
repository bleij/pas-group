"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SubscribeCard from "@/components/shared/SubscribeCard";

const fadeUp = {
    hidden: {opacity: 0, y: 30, filter: "blur(10px)"},
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {duration: 0.6, ease: "easeOut", delay: i * 0.15},
    }),
};

export default function CaseClient({post, moreCases}: any) {
    const cover = post.featuredImage?.node?.sourceUrl || null;
    const coverAlt = post.featuredImage?.node?.altText || post.title;

    return (
        <motion.main
            className="max-w-7xl mx-auto px-6 py-12"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {opacity: 0, y: 50, filter: "blur(10px)"},
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {duration: 0.8, ease: "easeOut"},
                },
            }}
        >
            {/* хлебные крошки */}
            <motion.nav
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-sm text-gray-500 mb-5"
            >
                Главная <span className="mx-1">/</span>
                <Link href="/experience" className="hover:underline">
                    Наш опыт
                </Link>
                <span className="mx-1">/</span>
                <span dangerouslySetInnerHTML={{__html: post.title || ""}}/>
            </motion.nav>

            {/* заголовок */}
            <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                dangerouslySetInnerHTML={{__html: post.title || ""}}
            />

            {/* изображение */}
            {cover && (
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mb-12 w-full flex justify-center bg-gray-100 rounded-2xl overflow-hidden"
                >
                    <Image
                        src={cover}
                        alt={coverAlt || ""}
                        width={1400}
                        height={700}
                        className="w-auto max-h-[70vh] object-contain"
                        priority
                    />
                </motion.div>
            )}

            {/* контент + форма */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 mb-12"
            >
                <div className="prose max-w-none">
                    {post.caseFields?.shortDescription && (
                        <p className="text-lg text-gray-700 mb-6">
                            {post.caseFields.shortDescription}
                        </p>
                    )}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.caseFields?.fullDescription || "",
                        }}
                    />
                </div>

                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <SubscribeCard/>
                    </div>
                </aside>
            </motion.div>

            {/* форма на мобилке */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-10 lg:hidden"
            >
                <SubscribeCard/>
            </motion.div>

            {/* “Смотреть больше” */}
            <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="w-full bg-white py-16"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Смотреть больше</h2>
                    <div className="h-1 w-16 bg-[#009999] mb-8"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {moreCases.map((p: any, i: number) => (
                            <motion.div
                                key={p.id}
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true}}
                            >
                                <Link
                                    href={`/experience/${p.slug}`}
                                    className="group bg-[#F3F4F6] rounded-2xl p-4 flex flex-col transition-all hover:bg-[#E5E7EB]"
                                >
                                    <div className="relative w-full overflow-hidden rounded-lg mb-4">
                                        {p.featuredImage?.node?.sourceUrl && (
                                            <Image
                                                src={p.featuredImage.node.sourceUrl}
                                                alt={p.title || ""}
                                                width={400}
                                                height={250}
                                                className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                                            />
                                        )}
                                        <div className="absolute top-3 right-3 bg-white rounded-md p-1.5">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-700"
                                            >
                                                <path d="M7 17L17 7M7 7h10v10"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-base mb-2 line-clamp-2">
                                        {p.title}
                                    </h3>
                                    {p.caseFields?.shortDescription && (
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                            {p.caseFields.shortDescription}
                                        </p>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link
                            href="/experience"
                            className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                        >
                            Все кейсы →
                        </Link>
                    </div>
                </div>
            </motion.section>
        </motion.main>
    );
}