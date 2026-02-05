import { getBlogPosts } from "@/lib/actions/blog";
import BlogClient from "./blog-client";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const posts = await getBlogPosts();
    return <BlogClient initialPosts={posts} />;
}
