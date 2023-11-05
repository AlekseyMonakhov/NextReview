import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews, getSerchableReviews } from "@/lib/reviews";
import Image from "next/image";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

export const metadata = {
    title: "Reviews",
};

export default async function ReviewsPage({ searchParams }) {
    const page = parsePageParam(searchParams.page);
    const { reviews, pageCount } = await getReviews(6, page);



    return (
        <>
            <Heading>Reviews</Heading>
            <div className={"flex justify-between pb-3"}>
                <PaginationBar page={page} pageCount={pageCount} href={"/reviews"} />
                <SearchBox />
            </div>
            <ul className={"flex flex-row flex-wrap gap-3"}>
                {reviews.map((review, index) => (
                    <li
                        className={"bg-white border shadow w-80 hover:shadow-xl transition-all"}
                        key={review.title}
                    >
                        <Link href={"/reviews/" + review.slug} prefetch={false}>
                            <Image
                                className={"rounded-t"}
                                src={review.image}
                                width={320}
                                height={180}
                                alt={"image"}
                                priority={index === 0}
                            />
                            <h2 className={"font-orbitron font-semibold text-center py-1"}>
                                {review.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1;
}
