"use client";

import { useState, useTransition, useEffect } from "react";
import { Card, Button, Badge, Input, Modal, Textarea, ImageUpload } from "@/components/ui";
import { BlogPost } from "@/types";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/actions/blog";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    FileText,
    Loader2
} from "lucide-react";

interface BlogClientProps {
    initialPosts: BlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        tags: "",
        authorName: "Dr. Admin",
        isPublished: false
    });

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage || "",
            tags: post.tags ? post.tags.join(", ") : "",
            authorName: post.author.name,
            isPublished: post.isPublished ?? false
        });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingPost(null);
        setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            coverImage: "",
            tags: "",
            authorName: "Dr. Admin",
            isPublished: false
        });
        setShowModal(true);
    };

    const handleSave = () => {
        startTransition(async () => {
            try {
                const tagsArray = formData.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t !== "");

                const postData = {
                    title: formData.title,
                    slug: formData.slug || undefined,
                    excerpt: formData.excerpt,
                    content: formData.content,
                    coverImage: formData.coverImage,
                    tags: tagsArray,
                    author: { name: formData.authorName, avatar: "" },
                    isPublished: formData.isPublished
                };

                if (editingPost) {
                    await updateBlogPost(editingPost.id, postData);
                } else {
                    await createBlogPost(postData);
                }
                setShowModal(false);
            } catch (error) {
                console.error("Failed to save post:", error);
                alert("Failed to save post.");
            }
        });
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this blog post?")) {
            startTransition(async () => {
                await deleteBlogPost(id);
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Blog Posts</h1>
                    <p className="text-neutral-500">Manage articles and news</p>
                </div>
                <Button variant="primary" onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" /> New Post
                </Button>
            </div>

            <Card className="p-4">
                <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                />
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden flex flex-col">
                        <div className="h-48 bg-neutral-100 relative">
                            {post.coverImage ? (
                                <img src={post.coverImage} className="w-full h-full object-cover" alt={post.title} />
                            ) : (
                                <div className="flex items-center justify-center h-full text-neutral-400">
                                    <FileText className="h-12 w-12" />
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <Badge variant={post.isPublished ? "primary" : "outline"} className={post.isPublished ? "bg-green-500 text-white border-green-600" : "bg-white"}>
                                    {post.isPublished ? "Published" : "Draft"}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-sm text-neutral-500 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

                            <div className="flex gap-2 mt-auto pt-4 border-t border-neutral-100">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(post)}>
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingPost ? "Edit Post" : "New Post"}
                size="lg"
            >
                <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                    <ImageUpload
                        value={formData.coverImage}
                        onChange={(url) => setFormData({ ...formData, coverImage: url })}
                        onRemove={() => setFormData({ ...formData, coverImage: "" })}
                        label="Cover Image"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Article Title" />
                        <Input label="Slug (Optional)" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="article-title" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Author" value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} />
                        <Input label="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
                    </div>

                    <Textarea label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
                    <Textarea label="Content (HTML/Markdown)" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="h-48 font-mono text-sm" />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-700">Publish Immediately</label>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" className="flex-1" onClick={handleSave} isLoading={isPending}>Save</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
