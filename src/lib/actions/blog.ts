"use server";

import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/types";
import { revalidatePath } from "next/cache";

// Map DB snake_case to frontend camelCase
function mapPost(item: any): BlogPost {
    return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        coverImage: item.featured_image, // Mapped to coverImage
        author: {
            name: item.author || "Admin",
            avatar: "/images/team/placeholder.jpg" // Fallback or fetch admin profile
        },
        date: item.published_at || item.created_at,
        category: item.tags?.[0] || "General", // Simple mapping
        tags: item.tags || [],
        readTime: "5 min read", // Placeholder or calc
        isPublished: item.is_published
    };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return data.map(mapPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) return null;
    return mapPost(data);
}

export async function createBlogPost(post: Partial<BlogPost>) {
    const supabase = await createClient();

    // Generate slug from title if missing
    const slug = post.slug || post.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "untitled";

    const { error } = await supabase.from("blog_posts").insert({
        title: post.title,
        slug: slug,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.coverImage,
        author: post.author?.name,
        tags: post.tags,
        is_published: post.isPublished ?? false,
        published_at: post.isPublished ? new Date().toISOString() : null,
    });

    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
    const supabase = await createClient();
    const updates: any = {};
    if (post.title !== undefined) updates.title = post.title;
    if (post.slug !== undefined) updates.slug = post.slug;
    if (post.excerpt !== undefined) updates.excerpt = post.excerpt;
    if (post.content !== undefined) updates.content = post.content;
    if (post.coverImage !== undefined) updates.featured_image = post.coverImage;
    if (post.author !== undefined) updates.author = post.author.name;
    if (post.tags !== undefined) updates.tags = post.tags;
    if (post.isPublished !== undefined) {
        updates.is_published = post.isPublished;
        if (post.isPublished) updates.published_at = new Date().toISOString();
    }

    const { error } = await supabase.from("blog_posts").update(updates).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function deleteBlogPost(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}
