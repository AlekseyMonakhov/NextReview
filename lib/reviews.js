import { readdir, readFile } from "node:fs/promises";
import { marked } from "marked";
import mater from "gray-matter";

export async function getReview(slug) {
    const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
    const {
        content,
        data: { title, date, image },
    } = mater(text);

    const html = marked(text, {
        headerIds: false,
        mangle: false,
    });

    return {
        slug,
        content,
        title,
        date,
        image,
        html,
    };
}

export async function getFeaturedReview() {
    const [featured] = await getReviews();
    return featured;
}

export async function getReviews() {
    const slugs = await getSlugs();
    const reviews = await Promise.all(slugs.map((slug) => getReview(slug)));
    return reviews.sort((a, b) => b.date.toLocaleString().localeCompare(a.date));
}

export async function getSlugs() {
    const files = await readdir("./content/reviews");
    return files.filter((file) => file.endsWith(".md")).map((file) => file.slice(0, -3));
}
