"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({ href, children, prefetch }) => {
    const pathname = usePathname();

    if (href === pathname) {
        return <span className={"text-orange-800"}>{children}</span>;
    }

    return (
        <Link className={"text-orange-800 hover:underline"} href={href} prefetch={prefetch}>
            {children}
        </Link>
    );
};
