import { writeFileSync } from "node:fs";
import qs from "qs";


const url = "http://localhost:1337/api/reviews/8"
  + "?" + qs.stringify({
    filters: { slug: { $eq: "test" } },
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: {
      image: {
        fields: ["url"]
      }
    },
    pagination: {
      pageSize: 1,
      withCount: false
    }
  }, {
    encodeValuesOnly: true
  });

const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);


const file = "scripts/strapi-response.json";
writeFileSync(file, formatted, "utf8");