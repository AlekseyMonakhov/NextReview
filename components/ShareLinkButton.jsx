"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

export const ShareLinkButton = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href);

        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 1500);
    };

    return (
        <button
            onClick={handleClick}
            className={
                "flex " +
                "gap-1 " +
                "items-center " +
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
            <LinkIcon className={"w-4 h-4"} />
            {clicked ? "Copied!" : "Share Link"}
        </button>
    );
};

export default ShareLinkButton;
