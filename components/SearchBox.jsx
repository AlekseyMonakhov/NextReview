"use client";

import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";



const SearchBox = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const handleChange = (review) => {
        router.push("/reviews/" + review.slug);
    };
    const [debouncedQuery] = useDebounce(query, 300);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (debouncedQuery.length > 1) {
            const controller = new AbortController();
            (async () => {
                const url = "/api/search?query=" + encodeURIComponent(debouncedQuery);

                const response = await fetch(url, {
                    signal: controller.signal,
                });
                const reviews = await response.json();

                setReviews(reviews);
            })();

            return () => {
                controller.abort();
            };
        } else {
            setReviews([]);
        }
    }, [debouncedQuery]);

    return (
        <div className={"relative w-48"}>
            <Combobox onChange={handleChange}>
                <Combobox.Input
                    placeholder={"Search..."}
                    className={"border rounded p-1 w-full"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Combobox.Options className={"absolute bg-white w-full"}>
                    {reviews.map((review) => (
                        <Combobox.Option key={review.slug} value={review}>
                            {({ active }) => (
                                <span
                                    className={`block px-2 truncate w-full ${
                                        active ? "bg-orange-100" : ""
                                    }`}
                                >
                                    {review.title}
                                </span>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>
    );
};

export default SearchBox;
