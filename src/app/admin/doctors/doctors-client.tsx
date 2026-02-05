"use client";

import { useState, useTransition, useEffect } from "react";
import { Card, Button, Input, Modal, Textarea, ImageUpload } from "@/components/ui";
import { Doctor, DoctorVacation } from "@/types";
import {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorVacations,
    addDoctorVacation,
    deleteDoctorVacation
} from "@/lib/actions/doctors";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Calendar,
    Loader2,
    User,
    Plane
} from "lucide-react";

interface DoctorsClientProps {
    initialDoctors: Doctor[];
}

export default function DoctorsClient({ initialDoctors }: DoctorsClientProps) {
    // Doctors State
    const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const [doctorForm, setDoctorForm] = useState({
        name: "",
        title: "",
        bio: "",
        education: "",
        specializations: "",
        image: "",
    });

    // Vacation State
    const [showVacationModal, setShowVacationModal] = useState(false);
    const [selectedDoctorForVacation, setSelectedDoctorForVacation] = useState<Doctor | null>(null);
    const [vacations, setVacations] = useState<DoctorVacation[]>([]);
    const [vacationForm, setVacationForm] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [isLoadingVacations, setIsLoadingVacations] = useState(false);

    const [isPending, startTransition] = useTransition();

    // Effect to update doctors when prop changes (revalidation)
    useEffect(() => {
        setDoctors(initialDoctors);
    }, [initialDoctors]);

    const filteredDoctors = doctors.filter(
        (doc) =>
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Doctor CRUD ---

    const handleEditDoctor = (doctor: Doctor) => {
        setEditingDoctor(doctor);
        setDoctorForm({
            name: doctor.name,
            title: doctor.title,
            bio: doctor.bio,
            education: doctor.education || "",
            specializations: doctor.specializations.join(", "),
            image: doctor.image || "",
        });
        setShowDoctorModal(true);
    };

    const handleAddDoctor = () => {
        setEditingDoctor(null);
        setDoctorForm({ name: "", title: "", bio: "", education: "", specializations: "", image: "" });
        setShowDoctorModal(true);
    };

    const handleSaveDoctor = () => {
        startTransition(async () => {
            try {
                const specializationsArray = doctorForm.specializations
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s !== "");

                if (editingDoctor) {
                    await updateDoctor(editingDoctor.id, {
                        ...doctorForm,
                        specializations: specializationsArray,
                    });
                } else {
                    await createDoctor({
                        ...doctorForm,
                        specializations: specializationsArray,
                        image: doctorForm.image || "/images/team/placeholder.jpg",
                        isActive: true,
                        sortOrder: 0,
                    });
                }
                setShowDoctorModal(false);
            } catch (error) {
                console.error("Failed to save doctor:", error);
                alert("Failed to save doctor.");
            }
        });
    };

    const handleDeleteDoctor = (id: string) => {
        if (confirm("Are you sure? This will delete the doctor and their history.")) {
            startTransition(async () => {
                await deleteDoctor(id);
            });
        }
    };

    // --- Vacation Management ---

    const handleManageVacation = (doctor: Doctor) => {
        setSelectedDoctorForVacation(doctor);
        setShowVacationModal(true);
        loadVacations(doctor.id);
        setVacationForm({ startDate: "", endDate: "", reason: "" });
    };

    const loadVacations = async (doctorId: string) => {
        setIsLoadingVacations(true);
        try {
            const data = await getDoctorVacations(doctorId);
            setVacations(data);
        } catch (error) {
            console.error("Failed to load vacations", error);
        } finally {
            setIsLoadingVacations(false);
        }
    };

    const handleAddVacation = async () => {
        if (!selectedDoctorForVacation) return;
        if (!vacationForm.startDate || !vacationForm.endDate) {
            alert("Please select dates");
            return;
        }

        startTransition(async () => {
            try {
                await addDoctorVacation({
                    doctorId: selectedDoctorForVacation.id,
                    startDate: vacationForm.startDate,
                    endDate: vacationForm.endDate,
                    reason: vacationForm.reason,
                });
                await loadVacations(selectedDoctorForVacation.id);
                setVacationForm({ startDate: "", endDate: "", reason: "" });
                alert("Vacation added. Availability slots in this period have been removed.");
            } catch (error) {
                console.error(error);
                alert("Failed to add vacation");
            }
        });
    };

    const handleDeleteVacation = async (id: string) => {
        if (!selectedDoctorForVacation) return;
        if (confirm("Remove this vacation? availability slots won't be automatically regenerated.")) {
            startTransition(async () => {
                await deleteDoctorVacation(id);
                await loadVacations(selectedDoctorForVacation.id);
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Doctors</h1>
                    <p className="text-neutral-500">Manage dental team and vacations</p>
                </div>
                <Button variant="primary" onClick={handleAddDoctor}>
                    <Plus className="h-4 w-4 mr-2" /> Add Doctor
                </Button>
            </div>

            <Card className="p-4">
                <Input
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                />
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden">
                                    {doc.image && doc.image !== "/images/team/placeholder.jpg" ? (
                                        <img src={doc.image} alt={doc.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-8 w-8 text-neutral-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{doc.name}</h3>
                                    <p className="text-sm text-primary-600">{doc.title}</p>
                                </div>
                            </div>
                            <div className="text-sm text-neutral-600 mb-4 line-clamp-2">
                                {doc.bio}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditDoctor(doc)}>
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleManageVacation(doc)} title="Manage Vacation">
                                    <Plane className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteDoctor(doc.id)} className="text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Doctor Modal */}
            <Modal
                isOpen={showDoctorModal}
                onClose={() => setShowDoctorModal(false)}
                title={editingDoctor ? "Edit Doctor" : "Add Doctor"}
            >
                <div className="space-y-4">
                    <ImageUpload
                        value={doctorForm.image}
                        onChange={(url) => setDoctorForm({ ...doctorForm, image: url })}
                        onRemove={() => setDoctorForm({ ...doctorForm, image: "" })}
                        label="Profile Photo"
                    />
                    <Input label="Name" value={doctorForm.name} onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} placeholder="Dr. Name" />
                    <Input label="Title" value={doctorForm.title} onChange={(e) => setDoctorForm({ ...doctorForm, title: e.target.value })} placeholder="e.g. Lead Dentist" />
                    <Textarea label="Bio" value={doctorForm.bio} onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })} />
                    <Input label="Education" value={doctorForm.education} onChange={(e) => setDoctorForm({ ...doctorForm, education: e.target.value })} />
                    <Textarea label="Specializations (comma separated)" value={doctorForm.specializations} onChange={(e) => setDoctorForm({ ...doctorForm, specializations: e.target.value })} />
                    <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => setShowDoctorModal(false)}>Cancel</Button>
                        <Button variant="primary" className="flex-1" onClick={handleSaveDoctor} isLoading={isPending}>Save</Button>
                    </div>
                </div>
            </Modal>

            {/* Vacation Modal */}
            <Modal
                isOpen={showVacationModal}
                onClose={() => setShowVacationModal(false)}
                title={`Vacations - ${selectedDoctorForVacation?.name}`}
            >
                <div className="space-y-6">
                    {/* Add Vacation Form */}
                    <div className="bg-neutral-50 p-4 rounded-lg space-y-3">
                        <h4 className="font-semibold text-sm">Add Vacation Period</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <Input label="Start Date" type="date" value={vacationForm.startDate} onChange={(e) => setVacationForm({ ...vacationForm, startDate: e.target.value })} />
                            <Input label="End Date" type="date" value={vacationForm.endDate} onChange={(e) => setVacationForm({ ...vacationForm, endDate: e.target.value })} />
                        </div>
                        <Input label="Reason (Optional)" value={vacationForm.reason} onChange={(e) => setVacationForm({ ...vacationForm, reason: e.target.value })} />
                        <Button variant="primary" size="sm" onClick={handleAddVacation} isLoading={isPending} className="w-full">
                            Add Vacation & Block Slots
                        </Button>
                    </div>

                    {/* List */}
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Upcoming Vacations</h4>
                        {isLoadingVacations ? (
                            <div className="text-center py-4"><Loader2 className="animate-spin mx-auto" /></div>
                        ) : vacations.length === 0 ? (
                            <p className="text-sm text-neutral-500 text-center py-2">No active vacations found.</p>
                        ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {vacations.map(vac => (
                                    <div key={vac.id} className="flex justify-between items-center p-3 border rounded bg-white text-sm">
                                        <div>
                                            <div className="font-medium">{vac.startDate} to {vac.endDate}</div>
                                            {vac.reason && <div className="text-neutral-500 text-xs">{vac.reason}</div>}
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => handleDeleteVacation(vac.id)} className="text-red-500 h-8 w-8 p-0">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
