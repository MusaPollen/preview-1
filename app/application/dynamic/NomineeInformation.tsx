// nomineeinformation.tsx
"use client";
import React from "react";
// Import necessary UI components from the HeroUI library.
// These imports are for presentation and functionality within the component.
import {
    Button, Input, Progress, Card, CardBody, CardHeader, ButtonGroup,
    Alert, Image, addToast, cn, Divider, Spinner, Select, SelectItem,
    Tooltip, DatePicker
} from "@heroui/react";

// --- Type Definitions for Props ---
// This interface defines the expected structure of data passed from the parent component (page.tsx).
// This is crucial for Type Safety in a TypeScript/React environment.
type NomineeInformationProps = {
    /**
     * The central state object containing all form data from the parent.
     * The child component READS data from this object to populate input fields.
     * We use Record<string, any> to allow for dynamic field names across the multi-step form.
     */
    formData: Record<string, any>; 
    
    /**
     * The callback function used to update the central 'formData' state in the parent.
     * This adheres to the "Lifting State Up" pattern in React.
     * The child component calls this function to PUSH updated values to the parent.
     */
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// --- NomineeInformation Component Definition ---
/**
 * NomineeInformation component renders a dynamic step in the multi-step form.
 * It is fully controlled by the parent component (page.tsx) via props.
 * - Displays data from 'formData'.
 * - Uses 'handleChange' to update parent state, ensuring a Single Source of Truth.
 */
export default function NomineeInformation({ formData, handleChange }: NomineeInformationProps) {
    
    // Developer Note: Since this component is meant to be dynamically rendered
    // based on an API call, its data fields (section6input1, etc.) must match
    // the keys defined in the parent's `formData` state.

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
            
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">Nominee Details Entry</h1>

            {/* Input Field 1: Nominee Name/Detail */}
            <Input
                label="Nominee Information Field 1 (e.g., Full Name)"
                // The 'name' attribute MUST match a key in the parent's formData state 
                // for the universal 'handleChange' function to work correctly.
                name="section6input1" 
                // The 'value' is READ from the parent's state (formData)
                value={formData.section6input1 || ""} // Use || "" to handle null/undefined safely
                // The 'onChange' calls the parent's handleChange function, passing the event.
                // This is how data is "PUSHED" up to the parent.
                onChange={handleChange} 
                variant="underlined"
            />

            {/* Input Field 2: Nominee Relationship/Detail */}
            <Input
                label="Nominee Information Field 2 (e.g., Relationship)"
                name="section6input2"
                value={formData.section6input2 || ""}
                onChange={handleChange}
                variant="underlined"
            />

            {/* --- Scalability Note for Future Development --- */}
            {/* Later, if the API dictates more fields for this section,
            you simply add more <Input> components here and ensure their 
            'name' property corresponds to a field in the parent's formData.
            
            Example of adding a third field:
            
            <Input
                label="Nominee Address"
                name="section6input3"
                value={formData.section6input3 || ""}
                onChange={handleChange}
                variant="bordered"
            />
            */}
        </div>
    );
}