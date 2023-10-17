import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
    const featuredReview = await getFeaturedReview();
    return (
        <>
            <Heading>Inner text</Heading>
            <p className={"pb-3"}>Only the best games, review for you</p>
            <div className={"bg-white border shadow w-80 hover:shadow-xl transition-all sm:w-full"}>
                <Link className={"flex flex-col sm:flex-row"} href={"/reviews/" + featuredReview.slug} prefetch={false}>
                    <Image
                        className={"rounded-t sm:rounded-l sm:rounded-t-none"}
                        src={featuredReview.image}
                        width={320}
                        height={180}
                        alt={"image"}
                    />
                    <h2 className={"font-orbitron font-semibold text-center py-1 sm:px-2"}>{featuredReview.title}</h2>
                </Link>
            </div>
        </>
    );
}
