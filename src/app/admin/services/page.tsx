"use client";

import { useState } from "react";
import { Card, Button, Badge, Input, Modal, Textarea } from "@/components/ui";
import { SERVICES_DATA } from "@/lib/constants";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Clock,
    DollarSign,
    GripVertical,
    Stethoscope,
} from "lucide-react";

export default function ServicesPage() {
    const [services, setServices] = useState(SERVICES_DATA);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingService, setEditingService] = useState<typeof SERVICES_DATA[0] | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: 60,
        price: 0,
    });

    const filteredServices = services.filter(
        (service) =>
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (service: typeof SERVICES_DATA[0]) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            duration: service.duration,
            price: service.price,
        });
        setShowAddModal(true);
    };

    const handleAdd = () => {
        setEditingService(null);
        setFormData({ title: "", description: "", duration: 60, price: 0 });
        setShowAddModal(true);
    };

    const handleSave = () => {
        if (editingService) {
            setServices(
                services.map((s) =>
                    s.id === editingService.id ? { ...s, ...formData } : s
                )
            );
        } else {
            const newService = {
                id: String(Date.now()),
                ...formData,
                image: "",
                icon: "Stethoscope",
            };
            setServices([...services, newService]);
        }
        setShowAddModal(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            setServices(services.filter((s) => s.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Services</h1>
                    <p className="text-neutral-500">
                        Manage your dental services and pricing
                    </p>
                </div>
                <Button variant="primary" onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                </Button>
            </div>

            {/* Search */}
            <Card className="p-4">
                <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                />
            </Card>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <Card key={service.id} className="overflow-hidden group">
                        <div className="h-32 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                            <Stethoscope className="h-12 w-12 text-primary-600" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-bold text-neutral-900">
                                    {service.title}
                                </h3>
                                <Badge variant="primary">${service.price}</Badge>
                            </div>
                            <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{service.duration} min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span>${service.price}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleEdit(service)}
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(service.id)}
                                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredServices.length === 0 && (
                <Card className="p-12 text-center text-neutral-500">
                    <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No services found matching your search.</p>
                </Card>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title={editingService ? "Edit Service" : "Add New Service"}
                size="md"
            >
                <div className="space-y-4">
                    <Input
                        label="Service Title"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="e.g., Teeth Whitening"
                    />
                    <Textarea
                        label="Description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Describe the service..."
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Duration (minutes)"
                            type="number"
                            value={formData.duration}
                            onChange={(e) =>
                                setFormData({ ...formData, duration: parseInt(e.target.value) })
                            }
                        />
                        <Input
                            label="Price ($)"
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: parseFloat(e.target.value) })
                            }
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowAddModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" className="flex-1" onClick={handleSave}>
                            {editingService ? "Save Changes" : "Add Service"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
