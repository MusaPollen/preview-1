"use client";
import { useState } from "react";
import { Button, Input, Progress, Card, CardBody, CardHeader } from "@heroui/react";
import { Alert } from "@heroui/react";
import { addToast, cn } from "@heroui/react";

import { Spinner } from "@heroui/react";

export default function Home() {


    return (
        <>
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="flex justify-center bg-sky-100">
                <Spinner label="default>>>>>" variant="default" color="danger" size="md" />
                <Spinner label="simple>>>>>" variant="simple" color="secondary" size="lg" />
                <Spinner label="gradient>>>>>" variant="gradient" color="secondary" size="lg" />
                <Spinner label="spinner>>>>>" variant="spinner" color="secondary" size="lg" />
                <Spinner label="wave>>>>>" variant="wave" color="secondary" size="lg" />
                <Spinner label="dots>>>>>" variant="dots" color="secondary" size="lg" />
            </div>

        </>
    );
}
