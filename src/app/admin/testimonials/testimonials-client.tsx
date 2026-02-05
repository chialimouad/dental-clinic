"use client";

import { useState, useTransition, useEffect } from "react";
import { Card, Button, Badge, Input, Modal, Textarea, Select, ImageUpload } from "@/components/ui";
import { Testimonial } from "@/types";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/actions/testimonials";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Star,
    MessageSquare,
    Loader2,
    User
} from "lucide-react";

interface TestimonialsClientProps {
    initialTestimonials: Testimonial[];
}

export default function TestimonialsClient({ initialTestimonials }: TestimonialsClientProps) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        text: "",
        rating: 5,
        treatment: "",
        image: "",
        isActive: true
    });

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setTestimonials(initialTestimonials);
    }, [initialTestimonials]);

    const filteredTestimonials = testimonials.filter(
        (t) =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (t: Testimonial) => {
        setEditingId(t.id);
        setFormData({
            name: t.name,
            text: t.text,
            rating: t.rating,
            treatment: t.treatment || "",
            image: t.image || "",
            isActive: t.isActive
        });
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            name: "",
            text: "",
            rating: 5,
            treatment: "",
            image: "",
            isActive: true
        });
        setShowModal(true);
    };

    const handleSave = () => {
        startTransition(async () => {
            try {
                if (editingId) {
                    await updateTestimonial(editingId, formData);
                } else {
                    await createTestimonial(formData);
                }
                setShowModal(false);
            } catch (error) {
                console.error("Failed to save testimonial:", error);
                alert("Failed to save testimonial.");
            }
        });
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this testimonial?")) {
            startTransition(async () => {
                await deleteTestimonial(id);
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Testimonials</h1>
                    <p className="text-neutral-500">Manage patient reviews</p>
                </div>
                <Button variant="primary" onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" /> Add Testimonial
                </Button>
            </div>

            <Card className="p-4">
                <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                />
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((t) => (
                    <Card key={t.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {t.image ? (
                                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                                        <User className="h-5 w-5 text-neutral-400" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-neutral-900">{t.name}</h3>
                                    <p className="text-xs text-neutral-500">{t.treatment}</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-600">
                                <Star className="h-3 w-3 fill-current mr-1" />
                                <span className="text-xs font-bold">{t.rating}</span>
                            </div>
                        </div>

                        <div className="mb-4 relative">
                            <MessageSquare className="absolute -top-2 -left-2 h-4 w-4 text-primary-200" />
                            <p className="text-sm text-neutral-600 line-clamp-4 pl-4 italic">
                                "{t.text}"
                            </p>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-neutral-100 mt-auto">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(t)}>
                                <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingId ? "Edit Testimonial" : "Add Testimonial"}
            >
                <div className="space-y-4">
                    <ImageUpload
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                        onRemove={() => setFormData({ ...formData, image: "" })}
                        label="Patient Photo (Optional)"
                    />

                    <Input label="Patient Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <Input label="Treatment" value={formData.treatment} onChange={(e) => setFormData({ ...formData, treatment: e.target.value })} placeholder="e.g. Dental Implants" />

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Rating</label>
                        <select
                            className="w-full rounded-md border border-neutral-300 p-2"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        >
                            {[5, 4, 3, 2, 1].map(r => (
                                <option key={r} value={r}>{r} Stars</option>
                            ))}
                        </select>
                    </div>

                    <Textarea label="Review Text" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" className="flex-1" onClick={handleSave} isLoading={isPending}>Save</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
