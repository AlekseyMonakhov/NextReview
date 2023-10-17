import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";

export const metadata = {
    title: "Reviews",
};

export default async function ReviewsPage() {
    const reviews = await getReviews();
    return (
        <>
            <Heading>Reviews</Heading>
            <ul className={"flex flex-row flex-wrap gap-3"}>
                {reviews.map((review) => (
                    <li className={"bg-white border shadow w-80 hover:shadow-xl transition-all"} key={review.title}>
                        <Link href={"/reviews/" + review.slug} prefetch={false}>
                            <Image className={"rounded-t"} src={review.image} width={320} height={180} alt={"image"} />
                            <h2 className={"font-orbitron font-semibold text-center py-1"}>{review.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
