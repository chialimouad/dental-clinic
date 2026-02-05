import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, Badge } from "@/components/ui";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/actions/blog"; // Use DB actions
import { SITE_CONFIG } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import {
    Calendar,
    User,
    ArrowLeft,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
} from "lucide-react";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author.name || SITE_CONFIG.name],
        },
    };
}

export const dynamic = "force-dynamic";

export const dynamicParams = true; // Allow new posts not in static params

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post || (post.isPublished === false)) {
        // Optionally allow admin preview if I implemented auth check here, but for now 404
        notFound();
    }

    const allPosts = await getBlogPosts();
    const relatedPosts = allPosts
        .filter((p) => p.id !== post.id && p.isPublished)
        .slice(0, 2);

    // Parse markdown-like content (simple version preserved)
    const contentHtml = post.content
        ? post.content.split("\n\n")
            .map((paragraph) => {
                const p = paragraph.trim();
                if (p.startsWith("# ")) {
                    return `<h1 class="text-3xl font-bold text-neutral-900 mb-4 mt-8">${p.slice(2)}</h1>`;
                }
                if (p.startsWith("## ")) {
                    return `<h2 class="text-2xl font-bold text-neutral-900 mb-3 mt-6">${p.slice(3)}</h2>`;
                }
                if (p.startsWith("### ")) {
                    return `<h3 class="text-xl font-bold text-neutral-900 mb-2 mt-4">${p.slice(4)}</h3>`;
                }
                if (p.startsWith("- ")) {
                    const items = p.split("\n").map((line) => `<li>${line.slice(2)}</li>`).join("");
                    return `<ul class="list-disc list-inside space-y-2 text-neutral-600 mb-4">${items}</ul>`;
                }
                return `<p class="text-neutral-600 leading-relaxed mb-4">${p}</p>`;
            })
            .join("")
        : "";

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="accent">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                                    {post.author.avatar ? <img src={post.author.avatar} alt={post.author.name} /> : <User className="h-5 w-5" />}
                                </div>
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>{formatDate(post.date)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <article className="lg:col-span-3">
                            {post.coverImage && (
                                <div className="mb-8 rounded-2xl overflow-hidden h-64 lg:h-96 w-full">
                                    <img src={post.coverImage} className="w-full h-full object-cover" alt={post.title} />
                                </div>
                            )}
                            <div className="prose prose-lg max-w-none">
                                <p className="text-xl text-neutral-600 mb-8 leading-relaxed font-medium">
                                    {post.excerpt}
                                </p>
                                <div
                                    dangerouslySetInnerHTML={{ __html: contentHtml || post.content }}
                                />
                            </div>

                            {/* Share */}
                            <div className="mt-12 pt-8 border-t border-neutral-200">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium text-neutral-700">
                                        Share this article:
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                                            <Facebook className="h-5 w-5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                                            <Twitter className="h-5 w-5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                                            <Linkedin className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-32">
                                <Card className="p-6 mb-8">
                                    <h3 className="font-bold text-neutral-900 mb-4">
                                        About the Author
                                    </h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                                            {post.author.avatar ? <img src={post.author.avatar} /> : <User className="h-8 w-8 text-neutral-400" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-neutral-900">{post.author.name}</p>
                                            <p className="text-sm text-neutral-500">Dental Expert</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-600">
                                        Our dental experts share their knowledge and experience to
                                        help you maintain optimal oral health.
                                    </p>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="font-bold text-neutral-900 mb-4">
                                        Related Articles
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedPosts.map((relatedPost) => (
                                            <Link
                                                key={relatedPost.id}
                                                href={`/blog/${relatedPost.slug}`}
                                                className="block group"
                                            >
                                                <h4 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-sm text-neutral-500 mt-1">
                                                    {formatDate(relatedPost.date)}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-500 text-white">
                {/* ... existing CTA ... */}
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Take Care of Your Smile?
                    </h2>
                    <Link href="/booking">
                        <Button variant="accent" size="xl">
                            Book Your Appointment
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
