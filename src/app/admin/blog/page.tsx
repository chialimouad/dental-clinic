"use client";

import { useState } from "react";
import { Card, Button, Badge, Input, Modal, Textarea } from "@/components/ui";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Search, Plus, Edit, Trash2, Eye, FileText } from "lucide-react";

export default function BlogAdminPage() {
    const [posts, setPosts] = useState(BLOG_POSTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<typeof BLOG_POSTS[0] | null>(null);
    const [formData, setFormData] = useState({ title: "", excerpt: "", content: "", author: "", tags: "" });

    const filteredPosts = posts.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleEdit = (post: typeof BLOG_POSTS[0]) => {
        setEditingPost(post);
        setFormData({ title: post.title, excerpt: post.excerpt, content: post.content, author: post.author || "", tags: post.tags.join(", ") });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingPost(null);
        setFormData({ title: "", excerpt: "", content: "", author: "", tags: "" });
        setShowModal(true);
    };

    const handleSave = () => {
        const newPost = {
            id: editingPost?.id || String(Date.now()),
            title: formData.title,
            slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
            excerpt: formData.excerpt,
            content: formData.content,
            author: formData.author,
            featuredImage: editingPost?.featuredImage || "/images/blog/default.jpg",
            publishedAt: editingPost?.publishedAt || new Date().toISOString(),
            tags: formData.tags.split(",").map((t) => t.trim()),
        };
        if (editingPost) {
            setPosts(posts.map((p) => (p.id === editingPost.id ? newPost : p)));
        } else {
            setPosts([newPost, ...posts]);
        }
        setShowModal(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Blog Posts</h1>
                    <p className="text-neutral-500">Create and manage blog content</p>
                </div>
                <Button variant="primary" onClick={handleAdd}><Plus className="h-4 w-4 mr-2" />New Post</Button>
            </div>

            <Card className="p-4">
                <Input placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} leftIcon={<Search className="h-5 w-5" />} />
            </Card>

            <div className="grid gap-4">
                {filteredPosts.map((post) => (
                    <Card key={post.id} className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex gap-2 mb-2">{post.tags.map((tag) => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}</div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-2">{post.title}</h3>
                                <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                    <span>{post.author}</span>
                                    <span>{formatDate(post.publishedAt)}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingPost ? "Edit Post" : "New Post"} size="lg">
                <div className="space-y-4">
                    <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <Input label="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                    <Input label="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
                    <Textarea label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={2} />
                    <Textarea label="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={8} />
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" className="flex-1" onClick={handleSave}>Save Post</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
