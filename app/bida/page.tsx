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
                            Bida Test Application
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
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 2 ? "text-purple-800" : "text-gray-400"}`}>Verify Phone</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 3 ? "text-purple-800" : "text-gray-400"}`}>Details</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 4 ? "text-purple-800" : "text-gray-400"}`}>Documents</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${step >= 5 ? "text-purple-800" : "text-gray-400"}`}>Summary</span>
                            <span className="mx-3">➡️</span>
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

                                <p className="flex justify-center text-3xl font-bold">Let&apos;s Get Started! 🚀</p>
                                <p className="flex justify-center text-xl">Enter your phone number to begin your BIDA journey</p>

                                <div className="flex justify-end">
                                    <Select
                                        className="max-w-[200]"
                                        radius="full"
                                        color="success"
                                        defaultSelectedKeys={["spark"]}
                                        disabledKeys={["bichokkhon", "udoy"]}
                                        label="Choose Product"
                                    >

                                        <SelectItem key="spark">SPARK</SelectItem>
                                        <SelectItem key="anannaya">ANANNAYA</SelectItem>
                                        <SelectItem key="bichokkhon">BICHOKKHON</SelectItem>
                                        <SelectItem key="udoy">UDOY</SelectItem>

                                    </Select>
                                </div>

                                <Input
                                    isClearable
                                    name="phone"
                                    radius="none"
                                    value={formData.phone}
                                    label="Enter Phone Number"
                                    variant="faded"
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
                                        isDisabled={!formData.phone || formData.phone.length !== 11}
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
                                            }, 1500);
                                        }}
                                    >
                                        Send OTP
                                    </Button>
                                )}
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


                                <DatePicker
                                    showMonthAndYearPickers
                                    variant="underlined"
                                    label="Date Of Birth"
                                    name="dateofbirth"
                                    value={formData.dateofbirth}
                                    onChange={(selectedDate) => {
                                        setFormData({ ...formData, dateofbirth: selectedDate });
                                    }}
                                />


                                <Input
                                    variant="underlined"
                                    label="Father's Name"
                                    name="fathersname"
                                    value={formData.fathersname}
                                    onChange={handleChange}
                                />



                                <Input
                                    variant="underlined"
                                    label="Mother's Name"
                                    name="mothersname"
                                    value={formData.mothersname}
                                    onChange={handleChange}
                                />
                                <Input
                                    isReadOnly
                                    color="success"
                                    radius="none"
                                    variant="underlined"
                                    label="Mobile Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <Input
                                    variant="underlined"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    variant="underlined"
                                    label="Present Address"
                                    name="presentaddress"
                                    placeholder="House/Flat, Road, Area, City"
                                    value={formData.presentaddress}
                                    onChange={handleChange}
                                />
                                <Input
                                    variant="underlined"
                                    label="Permanent Address"
                                    name="permanentaddress"
                                    placeholder="House/Flat, Road, Area, City"
                                    value={formData.permanentaddress}
                                    onChange={handleChange}
                                />
                                <Input
                                    variant="underlined"
                                    label="National ID (NID) Number "
                                    name="nid"
                                    value={formData.nid}
                                    onChange={handleChange}
                                />
                                <Input
                                    variant="underlined"
                                    label="Passport Number (Optional)"
                                    name="passport"
                                    value={formData.passport}
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
