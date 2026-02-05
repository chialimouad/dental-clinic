"use client";

import { useState } from "react";
import { Card, Button, Badge, Input, Modal } from "@/components/ui";
import { Search, Plus, Eye, Mail, Phone, Calendar, User } from "lucide-react";
import { format } from "date-fns";

const mockPatients = [
    { id: "1", name: "Jennifer Adams", email: "jennifer@example.com", phone: "(555) 123-4567", createdAt: "2024-01-15", totalVisits: 5 },
    { id: "2", name: "Robert Martinez", email: "robert@example.com", phone: "(555) 234-5678", createdAt: "2024-01-20", totalVisits: 3 },
    { id: "3", name: "Sarah Kim", email: "sarah@example.com", phone: "(555) 345-6789", createdAt: "2024-02-01", totalVisits: 2 },
    { id: "4", name: "David Wilson", email: "david@example.com", phone: "(555) 456-7890", createdAt: "2024-02-03", totalVisits: 1 },
    { id: "5", name: "Emily Chen", email: "emily@example.com", phone: "(555) 567-8901", createdAt: "2024-02-05", totalVisits: 4 },
];

export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);

    const filteredPatients = mockPatients.filter(
        (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Patients</h1>
                    <p className="text-neutral-500">View and manage patient records</p>
                </div>
                <Button variant="primary"><Plus className="h-4 w-4 mr-2" />Add Patient</Button>
            </div>

            <Card className="p-4">
                <Input placeholder="Search patients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} leftIcon={<Search className="h-5 w-5" />} />
            </Card>

            <Card>
                <table className="w-full">
                    <thead className="bg-neutral-50">
                        <tr className="border-b">
                            <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">Patient</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">Contact</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">Member Since</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">Visits</th>
                            <th className="text-right py-4 px-6 text-sm font-medium text-neutral-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} className="border-b hover:bg-neutral-50">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center font-bold text-primary-700">
                                            {patient.name.charAt(0)}
                                        </div>
                                        <span className="font-medium">{patient.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm"><div className="flex items-center gap-1"><Mail className="h-3 w-3" />{patient.email}</div>
                                        <div className="flex items-center gap-1 text-neutral-500"><Phone className="h-3 w-3" />{patient.phone}</div></div>
                                </td>
                                <td className="py-4 px-6 text-neutral-600">{format(new Date(patient.createdAt), "MMM d, yyyy")}</td>
                                <td className="py-4 px-6"><Badge variant="primary">{patient.totalVisits}</Badge></td>
                                <td className="py-4 px-6 text-right">
                                    <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}><Eye className="h-4 w-4" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title="Patient Details">
                {selectedPatient && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-2xl font-bold text-primary-700">
                                {selectedPatient.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                                <p className="text-neutral-500">{selectedPatient.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-neutral-50 rounded-lg"><p className="text-sm text-neutral-500">Phone</p><p className="font-medium">{selectedPatient.phone}</p></div>
                            <div className="p-4 bg-neutral-50 rounded-lg"><p className="text-sm text-neutral-500">Total Visits</p><p className="font-medium">{selectedPatient.totalVisits}</p></div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
