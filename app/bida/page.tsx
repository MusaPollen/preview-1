"use client";
import { useState } from "react";
import { Button, Input, Progress, Card, CardBody, CardHeader, ButtonGroup } from "@heroui/react";
import { Alert, Image } from "@heroui/react";
import { addToast, cn } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

export default function Home() {
    const [step, setStep] = useState(1);
    const totalSteps = 6;
    const [showAlert, setShowAlert] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [formData, setFormData] = useState({
        phone: "", // new field..
        fullname: "",
        dateofbirth: null as CalendarDate | null,
        fathersname: "",
        mothersname: "",
        email: "",
        presentaddress: "",
        permanentaddress: "",
        nid: "",
        passport: "",
        section4input1: "",
        section4input2: "",
        section5input1: "",
        section5input2: "",
        section6input1: "",
        section6input2: ""
    });

    const [otp, setotp] = useState({ otp: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const handleSubmit = () => {
        console.log("Submitting data:", formData);
        // alert("Form submitted successfully!");
        setShowAlert(true);

        addToast({
            title: "Successfull!",
            description: "Document uploaded to cloud successfully.",
            classNames: {
                base: cn([
                    "bg-default-50 dark:bg-background shadow-sm",
                    "border border-l-8 rounded-md rounded-l-none",
                    "flex flex-col items-start",
                    "border-primary-200 dark:border-primary-100 border-l-primary",
                ]),
                icon: "w-6 h-6 fill-current",
            },
            color: "primary",
        })

    };

    return (
        <>

            <div className="max-w-3xl mx-auto p-1 space-y-1 bg-white rounded-lg">
                <div className="flex justify-center">

                    <Image
                        isBlurred
                        width={500}
                        height={100}
                        src="https://www.southeastbank.com.bd/images/logo/logo_sebplc_new.jpg"
                        alt="SEBL Logo"
                        className="z-0 w-full h-full object-cover"
                        radius="none"
                    />
                    <Image
                        isBlurred
                        width={150}
                        height={100}
                        src="https://cdn.prod.website-files.com/677b6bb4f4d7d19e2c0575a9/6857d01a4b0cc9c2995ee763_Logo%20Icon-26.svg"
                        alt="BIDA Logo"
                        className="z-0 w-full h-full object-cover"
                        radius="none"
                    />
                </div>
                <Card isFooterBlurred className="bg-white/40 backdrop-blur-none" radius='lg'>
                    <CardHeader className="flex justify-center">


                        <span className="text-3xl text-purple-900 font-bold">
                            Application For New Bank Account
                        </span>
                    </CardHeader>
                    <CardBody>

                        {/* progess bar */}
                        <Progress
                            aria-label="Progress"
                            classNames={{
                                track: "drop-shadow-md border border-default",
                                indicator: "bg-linear-to-r from-blue-800 to-pink-600",
                            }}
                            radius="md"
                            size="lg"
                            value={(step / totalSteps) * 100}
                        />





                        {/* steps.. */}
                        <div className="flex flex-wrap justify-center items-center p-4">
                            <span className={`font-bold ${step >= 1 ? "text-purple-800" : "text-gray-400"}`}>1. Bank Information</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 2 ? "text-purple-800" : "text-gray-400"}`}>2. Institutional Information</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 3 ? "text-purple-800" : "text-gray-400"}`}>3. Personal Information</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 4 ? "text-purple-800" : "text-gray-400"}`}>4. Declaration & Submit</span>
                            {/* <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 5 ? "text-purple-800" : "text-gray-400"}`}>Summary</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 6 ? "text-purple-800" : "text-gray-400"}`}>🎉COMPLETE🎉</span> */}
                        </div>





                        {/* alert trigger */}
                        {showAlert && (
                            <Alert
                                color="success"
                                isVisible={showAlert}
                                onVisibleChange={(visible) => setShowAlert(visible)}
                                className="mt-4"
                            >
                                Form submitted successfully!
                            </Alert>
                        )}












                        {/* Step 1 Form */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <br></br>

                                <p className="flex justify-center text-2xl font-bold">Bank Information</p>

                                sdfgs
                                <p className="flex justify-center text-2xl font-bold">Account info</p>
                                asdff

                                <Button
                                    color="primary"
                                    className="w-full"
                                    onPress={() => { setStep(2); }}
                                >
                                    NEXT{">"}
                                </Button>
                            </div>
                        )}















                        {/* Step 2 Form , enter otp*/}
                        {step === 2 && (
                            <div className="space-y-4">
                                <br></br>
                                <p className="flex justify-center text-2xl font-bold">Bank Information</p>
                                sdfgs
                                <p className="flex justify-center text-2xl font-bold">Account info</p>
                                asdff
                                <div className="flex justify-center w-full">
                                    <ButtonGroup className="w-full">
                                        <Button className="flex-1" color="primary" variant="ghost" size="lg" onPress={() => setStep(1)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            color="primary"
                                            size="lg"
                                            onPress={() => { setStep(3); }}      // go directly to Step 3
                                        >
                                            CONTINUE ▷
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        )}
















                        {/* Step 3 Form */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <br></br>
                                <p className="flex justify-center text-2xl font-bold">Bank Information</p>
                                sdfgs
                                <p className="flex justify-center text-2xl font-bold">Account info</p>
                                asdff
                                <div className="flex justify-center w-full">
                                    <ButtonGroup className="w-full">
                                        <Button className="flex-1" color="primary" variant="ghost" size="lg" onPress={() => setStep(2)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            color="primary"
                                            size="lg"
                                            onPress={() => { setStep(4); }}      // go directly to Step 3
                                        >
                                            CONTINUE ▷
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        )}

















                        {/* Step 4 Form */}
                        {step === 4 && (
                            <div className="space-y-4">
                                <br></br>
                                <p className="flex justify-center text-2xl font-bold">Bank Information</p>
                                sdfgs
                                <p className="flex justify-center text-2xl font-bold">Account info</p>
                                asdff
                                <div className="flex justify-center w-full">
                                    <ButtonGroup className="w-full">
                                        <Button className="flex-1" color="primary" variant="ghost" size="lg" onPress={() => setStep(3)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            color="primary"
                                            size="lg"
                                            onPress={() => { console.log("last page button pressed") }}      // go directly to Step 3
                                        >
                                            CONTINUE ▷
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        )}




                    </CardBody>
                </Card>


            </div>
            <br></br>


        </>
    );
}
