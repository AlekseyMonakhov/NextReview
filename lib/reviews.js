import "server-only";
import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.CMS_URL;
export const CACHE_TAG_REVIEWS = "reviews";

export async function getReview(slug) {
    const { data } = await fetchReviews({
        filters: { slug: { $eq: slug } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: {
            image: {
                fields: ["url"],
            },
        },
        pagination: {
            pageSize: 1,
            withCount: false,
        },
    });

    if (data.length === 0) {
        return null;
    }

    const [item] = data;

    return {
        ...toReview(item),
        body: marked(item.attributes.body, { headerIds: false, mangle: false }),
    };
}

export async function getReviews(pageSize = 6, page) {
    const { data, meta } = await fetchReviews({
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: {
            image: {
                fields: ["url"],
            },
        },
        sort: ["publishedAt:desc"],
        pagination: { pageSize, page },
    });

    return {
        pageCount: meta.pagination.pageCount,
        reviews: data.map(toReview),
    };
}

export async function getSlugs() {
    const { data } = await fetchReviews({
        fields: ["slug"],
        sort: ["publishedAt:desc"],
        pagination: {
            pageSize: 100,
        },
    });

    return data.map((item) => item.attributes.slug);
}

export async function searchReviews(query) {
    const { data } = await fetchReviews({
        filters: { title: { $containsi: query } },
        fields: ["slug", "title"],
        sort: ["title"],
        pagination: {
            pageSize: 5,
        },
    });

    return data.map((item) => ({
        slug: item.attributes.slug,
        title: item.attributes.title,
    }));
}

async function fetchReviews(params) {
    const url =
        `${CMS_URL}/api/reviews` +
        "?" +
        qs.stringify(params, {
            encodeValuesOnly: true,
        });

    const response = await fetch(url, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        },
    });

    if (!response.ok) {
        throw new Error("Some error" + response.status);
    }
    return await response.json();
}

function toReview(item) {
    const { attributes } = item;
    return {
        slug: attributes.slug,
        title: attributes.title,
        subtitle: attributes.subtitle,
        date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
        image: CMS_URL + attributes.image.data.attributes.url,
    };
}
