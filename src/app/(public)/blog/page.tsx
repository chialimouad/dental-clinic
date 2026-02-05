import { Metadata } from "next";
import Link from "next/link";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Calendar, ArrowRight, User, Tag, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Read our latest dental health articles, tips, and news from SmileCare Dental Clinic. Stay informed about oral health and dental care.",
};

export default function BlogPage() {
    const featuredPost = BLOG_POSTS[0];
    const otherPosts = BLOG_POSTS.slice(1);

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Badge variant="accent" className="mb-4">
                            Our Blog
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Dental Health Insights & Tips
                        </h1>
                        <p className="text-xl text-white/90">
                            Stay informed with the latest dental health articles, tips, and
                            news from our expert team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Badge variant="primary" className="mb-2">
                            Featured Article
                        </Badge>
                    </div>
                    <Card className="overflow-hidden">
                        <div className="grid lg:grid-cols-2">
                            <div className="h-64 lg:h-auto bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
                                <div className="text-primary-600 text-6xl font-bold">
                                    {featuredPost.title.charAt(0)}
                                </div>
                            </div>
                            <CardContent className="p-8 flex flex-col justify-center">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {featuredPost.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-neutral-600 mb-6">{featuredPost.excerpt}</p>
                                <div className="flex items-center gap-6 text-sm text-neutral-500 mb-6">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>{featuredPost.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(featuredPost.publishedAt)}</span>
                                    </div>
                                </div>
                                <Link href={`/blog/${featuredPost.slug}`}>
                                    <Button
                                        variant="primary"
                                        rightIcon={<ArrowRight className="h-4 w-4" />}
                                    >
                                        Read Full Article
                                    </Button>
                                </Link>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </section>

            {/* All Posts */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                        Latest Articles
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post) => (
                            <Card key={post.id} hover className="group">
                                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                    <div className="text-primary-500 text-5xl font-bold">
                                        {post.title.charAt(0)}
                                    </div>
                                </div>
                                <CardContent className="pt-6">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h3>
                                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-neutral-500">
                                        <span>{post.author}</span>
                                        <span>{formatDate(post.publishedAt)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-neutral-600 mb-8">
                            Get the latest dental health tips and updates delivered straight
                            to your inbox.
                        </p>
                        <form className="flex gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                            />
                            <Button variant="primary">Subscribe</Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
