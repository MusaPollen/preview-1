"use client";
import { useState } from "react";
import { Button, Input, Progress, Card, CardBody, CardHeader, ButtonGroup } from "@heroui/react";
import { Alert } from "@heroui/react";
import { addToast, cn } from "@heroui/react";
import { Divider } from "@heroui/react";

import { Spinner } from "@heroui/react";

export default function Home() {
    const [step, setStep] = useState(1);
    const totalSteps = 6;
    const [showAlert, setShowAlert] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        accountType: "",
        accountType2: "",
        email: "",
        phone: "", // new field..
        // section1input2: "",
        // section2input1: "",
        // section2input2: "",
        section3input1: "",
        section3input2: "",
        section4input1: "",
        section4input2: "",
        section5input1: "",
        section5input2: "",
        section6input1: "",
        section6input2: "",


    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            endContent: (
                <div className="ms-11 my-2 flex gap-x-2">
                    <Button color={"primary"} size="sm" variant="bordered">
                        View Document
                    </Button>
                    <Button className="underline-offset-2" color={"primary"} size="sm" variant="light">
                        Maybe Later
                    </Button>
                </div>
            ),
            color: "primary",
        })

    };

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <Card isFooterBlurred className="bg-white/40 backdrop-blur-none" radius='lg'>
                    <CardHeader className="flex justify-center">
                        <span className="text-3xl text-purple-900 font-bold">
                            ✨SPARK Application
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
                            <span className={`font-bold ${step >= 1 ? "text-purple-800" : "text-gray-400"}`}>Get Started</span>
                            ➡️
                            <span className={`font-bold ${step >= 2 ? "text-purple-800" : "text-gray-400"}`}>Verify Phone</span>
                            ➡️
                            <span className={`font-bold ${step >= 3 ? "text-purple-800" : "text-gray-400"}`}>Details</span>
                            ➡️
                            <span className={`font-bold ${step >= 4 ? "text-purple-800" : "text-gray-400"}`}>Documents</span>
                            ➡️
                            <span className={`font-bold ${step >= 5 ? "text-purple-800" : "text-gray-400"}`}>Summary</span>
                            ➡️
                            <span className={`font-bold ${step >= 6 ? "text-purple-800" : "text-gray-400"}`}>🎉COMPLETE🎉</span>
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
                                <p className="flex justify-center text-3xl font-bold">Let&apos; Get Started! 🚀</p>
                                <p className="flex justify-center text-xl">Enter your phone number to begin your SPARK journey</p>

                                <Input
                                    isClearable
                                    name="phone"
                                    value={formData.phone}
                                    label="Phone Number"
                                    color="secondary"
                                    variant="bordered"
                                    type="tel"
                                    maxLength={11}
                                    isInvalid={formData.phone.length > 0 && formData.phone.length !== 11}
                                    errorMessage="Phone number must be exactly 11 digits."
                                    onValueChange={(value) => {
                                        const onlyDigits = value.replace(/\D/g, "");
                                        setFormData({ ...formData, phone: onlyDigits });
                                    }}
                                />

                                {showSpinner ? (
                                    <Spinner className="flex justify-center" label="Sending OTP to the Mobile Number..." color="danger" size="lg" />
                                ) : (
                                    <Button
                                        color="primary"
                                        className="w-full"
                                        onPress={() => {
                                            setShowSpinner(true);
                                            setTimeout(() => {
                                                setShowSpinner(false);
                                                setStep(2);
                                                // ✅ Show HeroUI toast here
                                                addToast({
                                                    title: "OTP Sent!",
                                                    description: "We have sent an OTP to your phone number.",
                                                    color: "success",
                                                    classNames: {
                                                        base: "bg-green-100 border border-green-300",
                                                        title: "text-green-800 font-semibold",
                                                        description: "text-green-700",
                                                    },
                                                });
                                            }, 3000);
                                        }}
                                    >
                                        Send OTP
                                    </Button>
                                )}
                            </div>
                        )}















                        {/* Step 2 Form */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <br></br>
                                <p className="flex justify-center text-2xl font-bold">Kindly verify your mobile number to continue ℹ️</p>
                                <p className="flex justify-center text-xl">Enter the OTP you just received</p>








                                {/* otp input */}
                                <Input
                                    name="phone"
                                    // value={formData.phone}
                                    label="6 digit OTP"
                                    color="secondary"
                                    variant="bordered"
                                    type="tel"
                                    maxLength={6}
                                // isInvalid={formData.phone.length > 0 && formData.phone.length !== 11}
                                // errorMessage="Phone number must be exactly 11 digits."
                                // onValueChange={(value) => {
                                //     const onlyDigits = value.replace(/\D/g, "");
                                //     setFormData({ ...formData, phone: onlyDigits });
                                // }}
                                />




                                <div className="flex justify-center w-full">
                                    <ButtonGroup className="w-full">
                                        <Button className="flex-1" color="primary" variant="ghost" size="lg" onPress={() => setStep(1)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            color="primary"
                                            size="lg"
                                            onPress={() => {
                                                setStep(3);             // go directly to Step 3
                                            }}
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
                                <Input
                                    label="section3input1"
                                    name="section3input1"
                                    value={formData.section3input1}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="section3input2"
                                    name="section3input2"
                                    value={formData.section3input2}
                                    onChange={handleChange}
                                />

                                <div className="flex justify-between">
                                    <Button color="secondary" onPress={() => setStep(2)}>
                                        ◁ Go Back
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => {
                                            setStep(4);
                                        }}
                                    >
                                        Next ▷
                                    </Button>
                                </div>
                            </div>
                        )}

















                        {/* Step 4 Form */}
                        {step === 4 && (
                            <div className="space-y-4">
                                <Input
                                    label="section4input1"
                                    name="section4input1"
                                    value={formData.section4input1}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="section4input2"
                                    name="section4input2"
                                    value={formData.section4input2}
                                    onChange={handleChange}
                                />

                                <div className="flex justify-between">
                                    <Button color="secondary" onPress={() => setStep(3)}>
                                        ◁ Go Back
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => {
                                            setStep(5);
                                        }}
                                    >
                                        Next ▷
                                    </Button>
                                </div>
                            </div>
                        )}















                        {/* Step 5 Form */}
                        {step === 5 && (
                            <div className="space-y-4">
                                <Input
                                    label="section5input1"
                                    name="section5input1"
                                    value={formData.section5input1}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="section5input2"
                                    name="section5input2"
                                    value={formData.section5input2}
                                    onChange={handleChange}
                                />

                                <div className="flex justify-between">
                                    <Button color="secondary" onPress={() => setStep(4)}>
                                        ◁ Go Back
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => {
                                            setStep(6);
                                        }}
                                    >
                                        Next ▷
                                    </Button>
                                </div>
                            </div>
                        )}


















                        {/* Step 6 Form */}
                        {step === 6 && (
                            <div className="space-y-4">
                                <Input
                                    label="section6input1"
                                    name="section6input1"
                                    value={formData.phone || ""}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="section6input2"
                                    name="section6input2"
                                    value={formData.phone || ""}
                                    onChange={handleChange}
                                />
                                <div className="flex justify-between">
                                    <Button color="secondary" className="flex-1" size="lg" radius="full" onPress={() => setStep(5)}>
                                        ◁ Go Back
                                    </Button>
                                    <Button className="flex-1" color="danger" variant="ghost" radius="full" size="lg" onPress={handleSubmit}>
                                        ✅ Submit
                                    </Button>
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
