import { createClient } from "next-sanity";

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET as string,
    token: process.env.SANITY_RW_TOKEN as string,
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION as string,
});

export default sanityClient;