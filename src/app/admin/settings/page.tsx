"use client";

import { useState } from "react";
import { Card, Button, Input, Textarea, Badge } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { Save, Building, Clock, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        name: SITE_CONFIG.name,
        email: SITE_CONFIG.email,
        phone: SITE_CONFIG.phone,
        street: SITE_CONFIG.address.street,
        city: SITE_CONFIG.address.city,
        state: SITE_CONFIG.address.state,
        zip: SITE_CONFIG.address.zip,
        weekdays: SITE_CONFIG.hours.weekdays,
        saturday: SITE_CONFIG.hours.saturday,
        sunday: SITE_CONFIG.hours.sunday,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-neutral-500">Manage clinic settings</p>
                </div>
                <Button variant="primary"><Save className="h-4 w-4 mr-2" />Save Changes</Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Building className="h-5 w-5" />Clinic Info</h2>
                    <div className="space-y-4">
                        <Input label="Clinic Name" name="name" value={settings.name} onChange={handleChange} />
                        <Input label="Email" name="email" type="email" value={settings.email} onChange={handleChange} leftIcon={<Mail className="h-5 w-5" />} />
                        <Input label="Phone" name="phone" value={settings.phone} onChange={handleChange} leftIcon={<Phone className="h-5 w-5" />} />
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin className="h-5 w-5" />Address</h2>
                    <div className="space-y-4">
                        <Input label="Street" name="street" value={settings.street} onChange={handleChange} />
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="City" name="city" value={settings.city} onChange={handleChange} />
                            <Input label="State" name="state" value={settings.state} onChange={handleChange} />
                            <Input label="ZIP" name="zip" value={settings.zip} onChange={handleChange} />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock className="h-5 w-5" />Business Hours</h2>
                    <div className="space-y-4">
                        <Input label="Weekdays" name="weekdays" value={settings.weekdays} onChange={handleChange} />
                        <Input label="Saturday" name="saturday" value={settings.saturday} onChange={handleChange} />
                        <Input label="Sunday" name="sunday" value={settings.sunday} onChange={handleChange} />
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Globe className="h-5 w-5" />Quick Links</h2>
                    <div className="space-y-3">
                        <a href="/" target="_blank" className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100">View Website →</a>
                        <a href="/booking" target="_blank" className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100">View Booking Page →</a>
                        <a href="/blog" target="_blank" className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100">View Blog →</a>
                    </div>
                </Card>
            </div>
        </div>
    );
}
