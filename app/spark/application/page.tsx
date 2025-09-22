// "use client";
// import { useState } from "react";
// import { Button, Input, Progress } from "@heroui/react";
// import { Alert } from "@heroui/react";
// import { addToast, cn } from "@heroui/react";

// import { Card, CardHeader, CardFooter, CardBody, Tabs, Tab, Link } from "@heroui/react";
// import { Form } from "@heroui/form";


// export default function Home() {
//     const [step, setStep] = useState(1);
//     const totalSteps = 2;
//     const [showAlert, setShowAlert] = useState(false);

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         accountType: "",
//         email: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = () => {
//         console.log("Submitting data:", formData);
//         // alert("Form submitted successfully!");

//         setShowAlert(true);

//         addToast({
//             title: "Successfull!",
//             description: "Document uploaded to cloud successfully.",
//             classNames: {
//                 base: cn([
//                     "bg-default-50 dark:bg-background shadow-sm",
//                     "border border-l-8 rounded-md rounded-l-none",
//                     "flex flex-col items-start",
//                     "border-primary-200 dark:border-primary-100 border-l-primary",
//                 ]),
//                 icon: "w-6 h-6 fill-current",
//             },
//             endContent: (
//                 <div className="ms-11 my-2 flex gap-x-2">
//                     <Button color={"primary"} size="sm" variant="bordered">
//                         View Document
//                     </Button>
//                     <Button className="underline-offset-2" color={"primary"} size="sm" variant="light">
//                         Maybe Later
//                     </Button>
//                 </div>
//             ),
//             color: "primary",
//         })

//     };

//     return (
//         <div className="max-w-xl mx-auto p-6 space-y-6">

//             <Card isFooterBlurred className="col-span-12 sm:col-span-5 row-span-2 bg-white/40 backdrop-blur-none" radius='lg'>
//                 <CardBody>
//                     <CardHeader className="flex justify-center">
//                         <span className="text-3xl text-purple-900 font-bold">
//                             Account Application
//                         </span>
//                     </CardHeader>

//                     <Progress
//                         classNames={{
//                             track: "drop-shadow-md border border-default",
//                             indicator: "bg-linear-to-r from-blue-800 to-pink-600",
//                         }}
//                         radius="sm"
//                         size="lg"
//                         value={(step / totalSteps) * 100}
//                     />
//                     {/* progress names status... */}
//                     <div className="flex justify-between m-2">
//                         <span
//                             id="step1"
//                             className={`font-bold ${step >= 1 ? "text-purple-800" : "text-gray-400"}`}
//                         >
//                             Get Started
//                         </span>
//                         <span
//                             id="step2"
//                             className={`font-bold ${step >= 2 ? "text-purple-800" : "text-gray-400"}`}
//                         >
//                             Account Details
//                         </span>
//                     </div>
//                     {showAlert && (
//                         <Alert
//                             color="success"
//                             isVisible={showAlert}
//                             onVisibleChange={(visible) => setShowAlert(visible)}
//                             className="mt-4"
//                         >
//                             Form submitted successfully!
//                         </Alert>
//                     )}


//                     {/* Step 1 Form */}
//                     {step === 1 && (
//                         <div className="space-y-4">
//                             <Input
//                                 label="First Name"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                             />
//                             <Input
//                                 label="Last Name"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                             />
//                             <Button
//                                 color="primary"
//                                 className="w-full"
//                                 onPress={() => setStep(2)}
//                             >
//                                 Next
//                             </Button>
//                         </div>
//                     )}

//                     {/* Step 2 Form */}
//                     {step === 2 && (
//                         <div className="space-y-4">
//                             <Input
//                                 label="Account Type"
//                                 name="accountType"
//                                 value={formData.accountType}
//                                 onChange={handleChange}
//                             />
//                             <Input
//                                 label="Email Address"
//                                 name="email"
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                             <div className="flex justify-between">
//                                 <Button color="secondary" onPress={() => setStep(1)}>
//                                     Back
//                                 </Button>
//                                 <Button color="success" onPress={handleSubmit}>
//                                     Submit
//                                 </Button>
//                             </div>
//                         </div>
//                     )}
//                 </CardBody>
//             </Card>
//         </div>
//     );
// }

"use client";
import { useState } from "react";
import { Button, Input, Progress } from "@heroui/react";
import { Alert } from "@heroui/react";
import { addToast, cn } from "@heroui/react";

import { Spinner } from "@heroui/react";

export default function Home() {
    const [step, setStep] = useState(1);
    const totalSteps = 2;
    const [showAlert, setShowAlert] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        accountType: "",
        email: "",
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
            <div className="max-w-xl mx-auto p-6 space-y-6">

                <div className="flex justify-center">
                    <span className="text-3xl text-purple-900 font-bold">
                        Account Application
                    </span>
                </div>

                <Progress
                    classNames={{
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-linear-to-r from-blue-800 to-pink-600",
                    }}
                    radius="sm"
                    size="lg"
                    value={(step / totalSteps) * 100}
                />
                {/* progress names status... */}
                <div className="flex justify-between m-2">
                    <span
                        id="step1"
                        className={`font-bold ${step >= 1 ? "text-purple-800" : "text-gray-400"}`}
                    >
                        Get Started
                    </span>
                    <span
                        id="step2"
                        className={`font-bold ${step >= 2 ? "text-purple-800" : "text-gray-400"}`}
                    >
                        Account Details
                    </span>
                </div>
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
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        {showSpinner ? (
                            <Spinner className="flex justify-center" label="Loading...(sending OTP)" color="danger" size="lg" />
                        ) : (
                            <Button
                                color="primary"
                                className="w-full"
                                onPress={() => {
                                    setShowSpinner(true);
                                    setTimeout(() => {
                                        setShowSpinner(false);
                                        setStep(2);
                                    }, 1000);
                                }}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                )}

                {/* Step 2 Form */}
                {step === 2 && (
                    <div className="space-y-4">
                        <Input
                            label="Account Type"
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className="flex justify-between">
                            <Button color="secondary" onPress={() => setStep(1)}>
                                Back
                            </Button>
                            <Button color="success" onPress={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                )}

            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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
