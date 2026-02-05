"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./Button";
import { Image as ImageIcon, Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
    bucket?: "images"; // Limit to specific buckets if needed
    label?: string;
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    bucket = "images",
    label = "Upload Image",
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const supabase = createClient();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
            onChange(data.publicUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please ensure you are logged in and have permission.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4 w-full">
            <div className="block text-sm font-medium text-neutral-700 mb-1">
                {label}
            </div>

            {value ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img
                        src={value}
                        alt="Uploaded image"
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onRemove}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {isUploading ? (
                                <Loader2 className="h-8 w-8 text-neutral-400 animate-spin mb-2" />
                            ) : (
                                <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                            )}
                            <p className="mb-2 text-sm text-neutral-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-neutral-500">
                                SVG, PNG, JPG or GIF (MAX. 2MB)
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={isUploading}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
