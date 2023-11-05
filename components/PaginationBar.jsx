import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const PaginationBar = ({ page, pageCount, href }) => {
    return (
        <div className={"flex gap-2 items-center"}>
            <PaginationLink
                href={{
                    pathname: href,
                    query: { page: page - 1 },
                }}
                enabled={page > 1}
            >
                <ChevronLeftIcon className={"w-4 h-4"} />
                <span className={'sr-only'}>Previous Page</span>
            </PaginationLink>

            <span>
                Page {page} of {pageCount}
            </span>

            <PaginationLink
                enabled={page < pageCount}
                href={{
                    pathname: href,
                    query: { page: page + 1 },
                }}
            >
                <ChevronRightIcon className={"w-4 h-4"} />
                <span className={'sr-only'}>Next Page</span>
            </PaginationLink>
        </div>
    );
};

const PaginationLink = ({ children, href, enabled }) => {
    if (!enabled) {
        return (
            <span
                className={
                    "cursor-not-allowed " +
                    "border " +
                    "rounded " +
                    "text-slate-300 " +
                    "text-sm " +
                    "px-2 " +
                    "py-1 "
                }
            >
                {children}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className={
                "border " +
                "px-2 " +
                "py-1 " +
                "rounded " +
                "text-slate-500 " +
                "text-sm " +
                "hover:bg-orange-100 " +
                "hover:text-slate-700 " +
                "transition"
            }
        >
            {children}
        </Link>
    );
};

export default PaginationBar;
