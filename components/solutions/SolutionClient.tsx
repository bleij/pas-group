"use client";

import {Variants, motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SubscribeCard from "@/components/shared/SubscribeCard";

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 30, filter: "blur(10px)"},
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0)",
        transition: {delay: i * 0.1, duration: 0.6, ease: "easeOut"},
    }),
};

export default function SolutionClient({post, moreSolutions}: any) {
    const cover =
        post.solutionFields?.mainImage?.node?.sourceUrl ||
        post.featuredImage?.node?.sourceUrl ||
        null;
    const coverAlt =
        post.solutionFields?.mainImage?.node?.altText ||
        post.featuredImage?.node?.altText ||
        post.title;

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <motion.nav
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="text-sm text-gray-500 mb-5"
            >
                Главная <span className="mx-1">/</span>
                <Link href="/solutions" className="hover:underline">
                    Решения
                </Link>
                <span className="mx-1">/</span>
                <span dangerouslySetInnerHTML={{__html: post.title || ""}}/>
            </motion.nav>

            <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                dangerouslySetInnerHTML={{__html: post.title || ""}}
            />

            {cover && (
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                    className="mb-12 w-full flex justify-center bg-gray-100 rounded-2xl overflow-hidden"
                >
                    <Image
                        src={cover}
                        alt={coverAlt}
                        width={1400}
                        height={700}
                        className="w-auto max-h-[70vh] object-contain"
                        priority
                    />
                </motion.div>
            )}

            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 mb-12"
            >
                <article className="prose max-w-none w-full">
                    {/* короткое описание */}
                    {post.solutionFields?.shortDescription && (
                        <p className="text-lg font-medium text-gray-700 mb-6">
                            {post.solutionFields.shortDescription}
                        </p>
                    )}

                    {/* полное описание */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.solutionFields?.fullDescription || "",
                        }}
                    />
                </article>

                {/* форма справа */}
                <aside className="hidden lg:block">
                    <div className="sticky top-36">
                        <SubscribeCard />
                    </div>
                </aside>
            </motion.div>

            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.6}
                className="mb-10 lg:hidden"
            >
                <SubscribeCard/>
            </motion.div>

            <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.8}
                className="w-full bg-white py-16"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Смотреть больше
                    </h2>
                    <div className="h-1 w-16 bg-[#009999] mb-8"/>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {moreSolutions.map((s: any, i: number) => (
                            <motion.div
                                key={s.id}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={i * 0.15}
                            >
                                <Link
                                    href={`/solutions/${s.slug}`}
                                    className="group bg-[#F3F4F6] rounded-2xl p-4 flex flex-col transition-all hover:bg-[#E5E7EB]"
                                >
                                    <div className="relative w-full overflow-hidden rounded-lg mb-4">
                                        {s.solutionFields?.mainImage?.node?.sourceUrl && (
                                            <Image
                                                src={s.solutionFields.mainImage.node.sourceUrl}
                                                alt={s.title}
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
                                        {s.title}
                                    </h3>
                                    {s.solutionFields?.shortDescription && (
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {s.solutionFields.shortDescription}
                                        </p>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link
                            href="/solutions"
                            className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                        >
                            Все решения →
                        </Link>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}