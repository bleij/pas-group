"use client";

import Image from "next/image";
import Link from "next/link";
import {SolutionNode} from "@/lib/queries/solutions";

export default function SolutionsClient({solutions}: { solutions: SolutionNode[] }) {
    return (
        <section id="solutions" className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Что мы предлагаем</h2>

                {/* фирменная линия */}
                <div className="h-1 w-32 bg-[#009999] mb-8"></div>

                {/* подзаголовок */}
                <h3 className="text-lg md:text-xl font-bold mb-8">Отраслевые решения</h3>

                {/* сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {solutions.map((s) => (
                        <div
                            key={s.id}
                            className="group bg-[#F2F2F2] rounded-2xl p-4 flex flex-col transition-all hover:bg-[#E5E7EB]"
                        >
                            <div className="relative w-full overflow-hidden rounded-lg mb-4">
                                {s.featuredImage?.node?.sourceUrl && (
                                    <Image
                                        src={s.featuredImage.node.sourceUrl}
                                        alt={s.featuredImage.node.altText || s.title}
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                                    />
                                )}
                            </div>

                            <h3 className="font-semibold text-base mb-2 line-clamp-2">
                                {s.title}
                            </h3>

                            {s.solutionFields?.shortDescription && (
                                <p className="text-sm font-medium text-gray-600 line-clamp-3 mb-4">
                                    {s.solutionFields.shortDescription}
                                </p>
                            )}

                            <Link
                                href={`/solutions/${s.slug}`}
                                className="mt-auto inline-block text-large px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-sm font-medium self-start"
                            >
                                Подробнее
                            </Link>
                        </div>
                    ))}
                </div>

                {/* кнопка “Все решения” */}
                <div className="mt-10">
                    <Link
                        href="/solutions"
                        className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                    >
                        Все решения
                    </Link>
                </div>
            </div>
        </section>
    );
}