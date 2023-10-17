import Heading from "@/components/Heading";
import Image from "next/image";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";

export async function generateStaticParams() {
    const slugs = await getSlugs();

    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
    const { title } = await getReview(slug);

    return {
        title,
    };
}

export default async function ReviewPage({ params: { slug } }) {
    const { content, date, image, title, html } = await getReview(slug);

    return (
        <>
            <Heading>{title}</Heading>
            <div className={"flex pb-2 gap-3 items-baseline"}>
                <p>
                    {new Date(date).toLocaleDateString("fr-CA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                </p>
                <ShareLinkButton />
            </div>
            <Image className={"rounded mb-2"} src={image} width={640} height={360} alt={"image"} />
            <article
                className={"prose prose-slate max-w-screen-sm"}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </>
    );
}
