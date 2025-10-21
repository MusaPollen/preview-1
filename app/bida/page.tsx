"use client";
import { useState } from "react";
import { Button, Input, Progress, Card, CardBody, CardHeader, ButtonGroup } from "@heroui/react";
import { Alert, Image } from "@heroui/react";
import { addToast, cn } from "@heroui/react";
import { Divider } from "@heroui/react";

import { Spinner } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { DateInput } from "@heroui/date-input";
import { DatePicker } from "@heroui/react";
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
            {/* nav area */}
            <section className="flex flex-col sm:flex-row flex-wrap items-center justify-center p-0">
                {/* <div className="w-1/2 aspect-[4/1]"> */}
                <div className="w-1/2 sm:w-1/3 flex justify-center">
                    <Image
                        alt="HeroUI hero Image"
                        src="/images/logo_sebl.png"
                        className="object-contain scale-70"
                    />
                </div>

                <div className="w-1/2 sm:w-1/3 flex justify-center">
                    <Image
                        alt="HeroUI hero Image"
                        src="/images/instapay_name.png"
                        className="object-contain scale-70"
                    />
                </div>

                {/* hidden sm: (test by adding before..)*/}
                {/* <div className="flex w-1/2 aspect-[4/1] justify-end"> */}
                <div className="w-1/2 sm:w-1/3 flex justify-center">
                    <Image
                        alt="HeroUI hero Image"
                        src="/images/bida.svg"
                        className="h-auto w-auto scale-70"
                        radius="none"
                    />
                </div>
            </section>
            {/* nav area */}

            {/* <div className="max-w-3xl mx-auto p-1 space-y-1"> */}
            <div className="max-w-5xl mx-auto p-1 space-y-1">
                <Card isFooterBlurred className="bg-white/40 backdrop-blur-none" radius='lg'>
                    <CardHeader className="flex justify-center">
                        <span className="font-liter text-2xl text-red-700 font-bold">
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

                            size="md"
                            value={(step / totalSteps) * 100}
                        />





                        {/* steps.. */}
                        <div className="flex flex-wrap justify-center items-center p-4">
                            <span className={`font-liter ${step >= 1 ? "text-red-700" : "text-zinc-300"}`}>1. Bank Information</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-liter ${step >= 2 ? "text-red-700" : "text-zinc-300"}`}>2. Institutional Information</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-liter ${step >= 3 ? "text-red-700" : "text-zinc-300"}`}>3. Personal Information</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-liter ${step >= 4 ? "text-red-700" : "text-zinc-300"}`}>4. Declaration & Submit</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-liter ${step >= 5 ? "text-red-700" : "text-zinc-300"}`}>section</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-liter ${step >= 6 ? "text-red-700" : "text-zinc-300"}`}>section</span>
                        </div>






                        {/* Step 1 Form */}
                        {step === 1 && (
                            <div className="space-y-2">
                                <p className="flex justify-center font-liter text-xl font-bold">Bank Information</p>
                                <p className="flex justify-center font-liter text-xl font-bold">Account Info</p>





                                <Button
                                    color="primary"
                                    className="w-full"
                                    onPress={() => {
                                        setStep(2);
                                    }}
                                >
                                    Send OTP
                                </Button>

                            </div>
                        )}















                        {/* Step 2 Form , enter otp*/}
                        {step === 2 && (
                            <div className="space-y-4">
                                <br></br>
                                <p className="flex justify-center text-2xl font-bold">Kindly verify your mobile number to continue ℹ️</p>
                                <p className="flex justify-center text-xl">Enter the OTP you just received</p>








                                {/* otp input */}
                                <Input
                                    name="otp"
                                    radius="none"
                                    value={otp.otp}
                                    label="Enter 6 digit OTP"
                                    variant="faded"
                                    type="tel"
                                    maxLength={6}
                                    onValueChange={(value) => {
                                        const onlyDigits = value.replace(/\D/g, "");
                                        setotp({ ...otp, otp: onlyDigits });
                                    }}
                                />

                                <div className="flex justify-center w-full">
                                    <ButtonGroup className="w-full">
                                        <Button className="flex-1" color="primary" variant="ghost" size="lg" onPress={() => setStep(1)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            isDisabled={!otp.otp || otp.otp.length !== 6}
                                            color="primary"
                                            size="lg"
                                            onPress={() => {
                                                setStep(3);            // go directly to Step 3
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

                                <br></br>
                                <p className="flex justify-center text-3xl font-bold">Tell Us About You 🧑‍🎓</p>
                                <p className="flex justify-center text-xl">We need some basic information to set up your account</p>

                                <Input
                                    variant="underlined"
                                    label="Full Name"
                                    name="fullname"
                                    value={formData.fullname}
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
                    </CardBody>
                </Card>
            </div>
            <br></br>


        </>
    );
}
