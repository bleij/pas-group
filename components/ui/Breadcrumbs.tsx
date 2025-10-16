"use client";

import Link from "next/link";

interface Crumb {
    label: string;
    href: string;
}

export default function Breadcrumbs({items}: { items: Crumb[] }) {
    return (
        <nav className="text-sm text-gray-500 mb-6">
            <ol className="flex flex-wrap gap-1">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                        <Link href={item.href} className="hover:underline">
                            {item.label}
                        </Link>
                        {i < items.length - 1 && <span>/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}