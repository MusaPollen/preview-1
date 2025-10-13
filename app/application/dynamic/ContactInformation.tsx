"use client";
import React from "react";
import { Input } from "@heroui/react";
import { FormDataType } from "./page";

// --- Type Definitions for Props ---
type ContactInformationProps = {
    formData: FormDataType; // The central state object passed from the parent (READ access).
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // The state setter function for updating parent's formData (WRITE access).
};

// --- ContactInformation Component Definition ---
export default function ContactInformation({ formData, handleChange }: ContactInformationProps) {
    // This component is a controlled input form, managed by state lifted to the parent (page.tsx).

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">

            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">Contact Details Entry</h1>

            {/* Input Field 1:  Name/Detail */}
            <Input
                label="Contact Information Field 1 (e.g., Full Name)"
                name="section6input1" // Name must match the key in parent's formData.
                value={formData.section6input1 || ""} // Value is read from parent state.
                onChange={handleChange} // Calls parent's handleChange to push updates up.
                variant="bordered"
            />

            {/* Input Field 2: Relationship/Detail */}
            <Input
                label="Contact Information Field 2 (e.g., Relationship)"
                name="section6input2"
                value={formData.section6input2 || ""}
                onChange={handleChange}
                variant="bordered"
            />

            {/* Scalability Note: Future fields can be added here, ensuring their 'name' property matches the parent's formData structure. */}
        </div>
    );
}