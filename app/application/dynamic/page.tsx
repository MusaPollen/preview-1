"use client";
import { useState, useEffect } from "react";
// HeroUI imports
import {
    Button, Input, Progress, Card, CardBody, CardHeader, ButtonGroup,
    Alert, Image, addToast, cn, Divider, Spinner, Select, SelectItem,
    Tooltip, DatePicker
} from "@heroui/react";
import { DateInput } from "@heroui/date-input";
// Other libraries
import { CalendarDate } from "@internationalized/date";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import forge from "node-forge";


// Local components
import NomineeInformation from "./NomineeInformation";
import BrandingLogoNav from "./BrandingLogoNav";
import ResetButton from "./ResetButton";
import ContactInformation from "./ContactInformation";

// ██████      ███    ██     ██████  
// ██   ██     ████   ██     ██   ██ 
// ██████      ██ ██  ██     ██   ██ 
// ██   ██     ██  ██ ██     ██   ██ 
// ██   ██     ██   ████     ██████  


//provided by fahmi vai
const RSA_PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
AgEAhwbp7uFL67uuPA3hq0BjSOBb5IEpDKuarNhP
LHhLH2SNSuxj3CN5kFeWuRsuvjFc1q+iX2yewNgR
Ra2EADjo9L9XqqQc3rEUGyL9ZQv7falPXT0kuVb7
EwS4fBJbm3F97jOJM+CIFHvy27zNmJzKYT/FsvJx
JI8r9FpdMafSEHNYZJCzYGt8cyGHNJLt6UjD1VgN
f8eFre0PzsmhPxQoZQ5u4Qg+6rUzsHEEoTLKzjfB
xCpgbgO39/Aw5GrSx4+hUEbimCv6OMp/OEVGsHss
zYgO5LOTNkXMQF2CaqV7ZdYXGnHPGQY+UgTWYB2M
5UQfcJcHZR9PeGAKfFfajk/3H98+rUnl3My85LTm
LGoQ2v8pgqFI1aawyPYdBRNGvsaHHvmZtFu2WrFo
cjiN5IW7uOKL4j+ItbpcjGL+oRmIvLfWSVFWPxjb
MUsfUZTfECijPqvkr4lHD/yXTYmz80KGc6hv2zZ2
We+ErxQTC7ORkCufKu/TVNgnpmXM+uagKRnu5cb3
fnsri9tCagFrUSF0FSfWxgVg2ZcEu366c24p3x9X
SWzdKr5b//ESD2Y1xT2HHKepLtw2omtW3Q5L6w7W
afHTAh68oJb29GNWvOEDXYZxFw3z0eq4I66YC
jMGey+A7VIjk9q3BQTu3VZnU6FOZbPys1G7VH
DewRfeF6fZl8cCAwEAAQ==
-----END PUBLIC KEY-----
`.trim();

export function generateKey(length = 16) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const array = new Uint8Array(length);
    crypto.getRandomValues(array); // cryptographically secure random bytes
    return Array.from(array, (byte) => chars[byte % chars.length]).join("");
    // explanation - Convert the Uint8Array of random bytes into an array of characters
    // return Array.from(
    //     array,                        // 1️⃣ The input array (typed array of random bytes)
    //     (byte) =>                     // 2️⃣ Arrow function: maps each byte to a character
    //         chars[                       // 3️⃣ Access a character from 'chars' string
    //         byte % chars.length         // 4️⃣ Use modulo to wrap byte (0–255) into valid index (0–61)
    //         ]
    // ).join("");                      // 5️⃣ Join the array of characters into a single string (final key)

}

export function aesDecrypt(aesKey: string, encryptedBase64: string): string {
    // 1️⃣ Convert AES key to binary string
    const keyBinary = forge.util.encodeUtf8(aesKey);
    if (keyBinary.length !== 16) throw new Error("AES-128 key must be 16 bytes");

    // 2️⃣ Decode Base64 ciphertext
    const encryptedBinary = forge.util.decode64(encryptedBase64);

    // 3️⃣ Create decipher and decrypt
    const decipher = forge.cipher.createDecipher("AES-ECB", keyBinary);
    decipher.start(); // ECB has no IV
    decipher.update(forge.util.createBuffer(encryptedBinary, "raw"));
    const ok = decipher.finish();
    if (!ok) throw new Error("Decryption failed (wrong key or corrupted ciphertext)");

    // 4️⃣ Convert binary string → UTF-8 JS string
    const plaintextBinary = decipher.output.getBytes();
    const u8 = new Uint8Array(plaintextBinary.length);
    for (let i = 0; i < plaintextBinary.length; i++) u8[i] = plaintextBinary.charCodeAt(i);

    return new TextDecoder().decode(u8); // return final plaintext
}

export async function getSession(): Promise<{ apiResponse: string } | { error: string }> {
    try {
        const action = "ACOPEN_SESSION_REQUEST";
        const aesKey = generateKey();
        const deviceId = "sdfgsd";
        const location = "asfd";
        const metaData = "asdf";

        const authParam = {
            action: action,
            aesKey: aesKey,
            deviceId,
            location,
            metaData: metaData
        };

        const payload = JSON.stringify(authParam);
        console.log("Payload to encrypt:", payload);

        // ✅ Encrypt payload using RSA (PKCS#1 v1.5)
        const publicKey = forge.pki.publicKeyFromPem(RSA_PUBLIC_KEY);
        const encryptedBytes = publicKey.encrypt(payload, "RSAES-PKCS1-V1_5");
        const encryptedBase64 = forge.util.encode64(encryptedBytes);
        console.log("Encrypted Base64:", encryptedBase64);

        // ✅ Send encrypted payload to server
        const response = await fetch("https://ecom.southeastbank.com.bd/instapayapi/acopen/xsi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "en"
            },
            body: encryptedBase64
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const responseData = await response.text();
        console.log("Server response:", responseData);

        try {
            const plaintext = aesDecrypt(aesKey, responseData);

            console.log("Decrypted plaintext:", plaintext);

            // Parse JSON
            const data = JSON.parse(plaintext);
            // console.log("Session ID:", data.sessionId);
            console.log("DATA -------", data);

            // Return decrypted plaintext as apiResponse
            return { apiResponse: plaintext || "(apiResponse not found)dummy-apiResponse" };
        } catch (decErr: unknown) {
            console.error("Decryption error:", decErr);

            return { error: `Decryption error: ${String(decErr)}` };
        }

    } catch (err: unknown) {
        console.error("Error in getSession:", err);

        let message = "Unknown error";
        if (err instanceof Error) message = err.message;

        return { error: message };
    }
}









// ██████      ███    ██     ██████  
// ██   ██     ████   ██     ██   ██ 
// ██████      ██ ██  ██     ██   ██ 
// ██   ██     ██  ██ ██     ██   ██ 
// ██   ██     ██   ████     ██████  








export type FormDataType = {
    product: string;
    phone: string;
    fullname: string;
    dateofbirth: CalendarDate | null;
    fathersname: string;
    mothersname: string;
    email: string;
    presentaddress: string;
    permanentaddress: string;
    nid: string;
    passport: string;
    section4input1: string;
    section4input2: string;
    section5input1: string;
    section5input2: string;
    section6input1: string;
    section6input2: string;
};

type SectionProps = {
    formData: FormDataType; // your main form state type
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const sectionComponents: Record<string, (props: SectionProps) => React.ReactNode> = {
    NomineeInformation: (props) => <NomineeInformation {...props} />,
    ContactInformation: (props) => <ContactInformation {...props} />,
    // Add other components here as needed
};

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(4);
    const [showAlert, setShowAlert] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [formData, setFormData] = useState({
        product: "",
        phone: "12345678910", // new field..
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

    const [otp, setotp] = useState({ otp: "123456" });

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
            color: "primary",
        })
    };




    type Product = {
        ProductID: string;
        ProductName: string;
        TotalSteps: number;
        StepNames: string;
    };


    // api call
    const [product, setproduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const [sectionsFromAPI, setSectionsFromAPI] = useState<string[]>([]); //to store the provided step names from the api
    const [sectionNamesCleaned, setSectionNamesCleaned] = useState<string[]>([]); // cleaned section names for easier component mapping.....without whitespace


    // demo api call to get some data
    const fetchProduct = async () => {
        setLoading(true); // show spinner while fetching
        try {
            const res = await fetch("https://localhost:7042/api/products");
            const data = await res.json();
            setproduct(data);
            console.log("Fetched product data:", data);
            // Calculate total steps (API steps + 4 fixed ones)
            const apiTotal = Number(data[0].totalSteps);
            const computedTotal = apiTotal + 4;
            setTotalSteps(computedTotal);

            // Split and trim step names from API
            const tempSectionsFromAPI = data[0].stepNames.split(",").map((name: string) => name.trim());
            setSectionsFromAPI(tempSectionsFromAPI);

            // Clean section names for easier component mapping(without spaces)
            const tempSectionNamesCleaned = tempSectionsFromAPI.map((name: string) => name.replace(/\s/g, "")); // ← Add : string type
            setSectionNamesCleaned(tempSectionNamesCleaned);


        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false); // hide spinner
        }
    };

    // if (loading) return <div><div className="flex justify-center items-center p-10 text-2xl">calling external api<Spinner variant="dots"></Spinner></div></div>;








    // ██████      ███    ██     ██████  
    // ██   ██     ████   ██     ██   ██ 
    // ██████      ██ ██  ██     ██   ██ 
    // ██   ██     ██  ██ ██     ██   ██ 
    // ██   ██     ██   ████     ██████  

    const handleGetSession = async () => {
        const result = await getSession();
        console.log("getSession result:", result);
        // alert(`Session Result:\n${JSON.stringify(result, null, 2)}`);
    };

    // ██████      ███    ██     ██████  
    // ██   ██     ████   ██     ██   ██ 
    // ██████      ██ ██  ██     ██   ██ 
    // ██   ██     ██  ██ ██     ██   ██ 
    // ██   ██     ██   ████     ██████  




    return (
        <>
            {/* ✅ New button to call getSession() */}
            <Button color="secondary" disableRipple onPress={handleGetSession}>
                Encrypt & Get Session
            </Button>

            {/* custom branding */}
            <BrandingLogoNav />

            {/* application area start */}
            <div className="max-w-3xl mx-auto p-1 space-y-1">
                <Card isFooterBlurred className="bg-blue-100 backdrop-blur-none" radius='lg'>

                    <CardHeader className="flex justify-center">
                        <span className="text-3xl text-purple-900 font-bold">
                            <p>(from api - {product[0]?.ProductName || "N/A"})</p>
                            {formData.product} Application Form
                        </span>
                        {/* showing the reset button */}
                        {currentStep >= 3 && currentStep <= 14 && (
                            <ResetButton />
                        )}
                    </CardHeader>
                    {/* 
██████  ██████   ██████   ██████  ██████  ███████ ███████ ███████     ██████   █████  ██████  
██   ██ ██   ██ ██    ██ ██       ██   ██ ██      ██      ██          ██   ██ ██   ██ ██   ██ 
██████  ██████  ██    ██ ██   ███ ██████  █████   ███████ ███████     ██████  ███████ ██████  
██      ██   ██ ██    ██ ██    ██ ██   ██ ██           ██      ██     ██   ██ ██   ██ ██   ██ 
██      ██   ██  ██████   ██████  ██   ██ ███████ ███████ ███████     ██████  ██   ██ ██   ██                                                                                                                                                                
*/}
                    <CardBody>
                        {/* progess bar */}
                        {!product || product.length === 0 ? (
                            <>
                                <Progress
                                    aria-label="Progress"
                                    classNames={{
                                        track: "drop-shadow-md border border-default",
                                        indicator: "bg-linear-to-r from-blue-800 to-pink-600",
                                    }}
                                    radius="md"
                                    size="md"
                                    isIndeterminate
                                // value={(step / totalSteps) * 100}
                                />
                            </>
                        ) : (
                            <>
                                <Progress
                                    aria-label="Progress"
                                    classNames={{
                                        track: "drop-shadow-md border border-default",
                                        indicator: "bg-linear-to-r from-blue-800 to-pink-600",
                                    }}
                                    radius="md"
                                    size="lg"
                                    value={((currentStep) / (product[0].TotalSteps + 4)) * 100}

                                />
                            </>

                        )}
                        {/* 
███████ ████████ ███████ ██████      ███    ██  █████  ███    ███ ███████ ███████ 
██         ██    ██      ██   ██     ████   ██ ██   ██ ████  ████ ██      ██      
███████    ██    █████   ██████      ██ ██  ██ ███████ ██ ████ ██ █████   ███████ 
     ██    ██    ██      ██          ██  ██ ██ ██   ██ ██  ██  ██ ██           ██ 
███████    ██    ███████ ██          ██   ████ ██   ██ ██      ██ ███████ ███████ 
*/}
                        {/* name of the steps.. */}
                        <div className="flex flex-wrap justify-center items-center p-4">
                            <span className={`font-bold ${currentStep >= 1 ? "text-purple-800" : "text-gray-400"}`}>Get Started</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${currentStep >= 2 ? "text-purple-800" : "text-gray-400"}`}>Verify Mobile No</span>
                            <span className="mx-3">➡️</span>
                            {/* dynamic steps from api */}
                            {sectionsFromAPI.length > 0
                                ? sectionsFromAPI.map((sectionName, sectionIndex) => {
                                    return (
                                        <span key={sectionIndex} className={`font-bold ${currentStep >= sectionIndex + 3 ? "text-purple-800" : "text-gray-300"}`}>
                                            {sectionName}
                                            {/* use below if needed to use without space. useful when rendering pages conditionally. will test later */}
                                            {/* {sectionName.replace(/\s/g, '')} */}
                                            {sectionIndex < sectionsFromAPI.length - 1 && <span className="mx-3">➡️</span>}
                                        </span>
                                    )
                                })
                                : <Spinner variant="dots"></Spinner>}
                            {/* dynamic steps from api */}

                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${currentStep >= (totalSteps - 1) ? "text-purple-800" : "text-gray-300"}`}>Summary</span>
                            <span className="mx-3">➡️</span>
                            <span className={`font-bold ${currentStep >= (totalSteps) ? "text-purple-800" : "text-gray-300"}`}>🎉COMPLETE🎉</span>
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
                        {/* 
███████ ████████ ███████ ██████       ██        ██████  
██         ██    ██      ██   ██     ███             ██ 
███████    ██    █████   ██████       ██         █████  
     ██    ██    ██      ██           ██        ██      
███████    ██    ███████ ██           ██ ▄█     ███████                                      
*/}
                        {/* Step 1 Form */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <br></br>
                                <p className="flex justify-center text-3xl font-bold">Let&apos;s Get Started! 🚀</p>
                                <p className="flex justify-center text-xl">Enter your phone number to begin your SPARK journey</p>

                                <div className="flex justify-end">
                                    <Select
                                        className="max-w-[200]"
                                        radius="full"
                                        color="success"
                                        // defaultSelectedKeys={["spark"]}
                                        selectedKeys={[formData.product]} // bind to formData.product
                                        onSelectionChange={(keys) => {
                                            const value = Array.from(keys)[0] as string; // HeroUI Select uses Set<string>
                                            setFormData({ ...formData, product: value });
                                            console.log(formData.product);
                                        }}
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
                                                setCurrentStep(2);
                                                // ✅ Show HeroUI toast here
                                                addToast({
                                                    title: "OTP Sent!",
                                                    description: "We have sent an OTP to your phone number.",
                                                    color: "success",
                                                });
                                            }, 500);
                                        }}
                                    >
                                        Send OTP
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Step 2 Form , enter otp */}
                        {currentStep === 2 && (
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
                                        <Button className="flex-1" color="primary" variant="ghost" size="lg" onPress={() => setCurrentStep(1)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            isDisabled={!otp.otp || otp.otp.length !== 6}
                                            color="primary"
                                            size="lg"
                                            onPress={async () => {
                                                setotp({ otp: "" })
                                                await handleGetSession();
                                                await fetchProduct();      // wait for API call to complete
                                                setCurrentStep(currentStep + 1);   // then move to next step
                                            }}
                                        >
                                            CONTINUE ▷
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        )}
                        {/*                       
██████  ██    ██ ███    ██  █████  ███    ███ ██  ██████     ███████ ████████ ███████ ██████  ███████ 
██   ██  ██  ██  ████   ██ ██   ██ ████  ████ ██ ██          ██         ██    ██      ██   ██ ██      
██   ██   ████   ██ ██  ██ ███████ ██ ████ ██ ██ ██          ███████    ██    █████   ██████  ███████ 
██   ██    ██    ██  ██ ██ ██   ██ ██  ██  ██ ██ ██               ██    ██    ██      ██           ██ 
██████     ██    ██   ████ ██   ██ ██      ██ ██  ██████     ███████    ██    ███████ ██      ███████ 
                                                               
 */}

                        {currentStep > 2 && currentStep < totalSteps - 1 && (
                            <div className="space-y-4">
                                <p className="flex justify-center text-2xl font-bold">
                                    Step {currentStep}: {sectionsFromAPI[currentStep - 3] || "Loading..."}
                                </p>
                                {/* Conditionally render based on section name  */}
                                {/* Dynamic component renderer: Show component if exists, else loading message */}
                                {sectionComponents[sectionNamesCleaned[currentStep - 3]] ?
                                    // ✅ Component exists - render it with props
                                    sectionComponents[sectionNamesCleaned[currentStep - 3]]({ formData, handleChange })
                                    :
                                    // ⏳ Component not ready - show loading state
                                    (
                                        <div className="text-center text-gray-500 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 animate-bounce mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>

                                            Section {sectionNamesCleaned[currentStep - 3] || '...'}, unavailabe...
                                        </div>
                                    )
                                }

                                <div className="flex justify-between">
                                    <ButtonGroup className="w-full">
                                        <Button className="flex-1" color="secondary" variant="ghost" size="lg" onPress={() => setCurrentStep(currentStep - 1)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button className="flex-1" color="secondary" size="lg" onPress={() => setCurrentStep(currentStep + 1)}>
                                            Continue ▷
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        )}

                        {/* 
███████ ██    ██ ███    ███ ███    ███  █████  ██████  ██    ██ ██   
██      ██    ██ ████  ████ ████  ████ ██   ██ ██   ██  ██  ██     ██  
███████ ██    ██ ██ ████ ██ ██ ████ ██ ███████ ██████    ████         ██ 
     ██ ██    ██ ██  ██  ██ ██  ██  ██ ██   ██ ██   ██    ██       ██  
███████  ██████  ██      ██ ██      ██ ██   ██ ██   ██    ██    ██                                                               
*/}
                        {/* summary Form */}
                        {currentStep === (totalSteps - 1) && (
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
                                    <ButtonGroup className="w-full">
                                        <Button className="flex-1" color="success" variant="ghost" size="lg" onPress={() => setCurrentStep(currentStep - 1)}>
                                            ◁ Go Back
                                        </Button>
                                        <Button
                                            className="flex-1"
                                            color="success"
                                            size="lg"
                                            onPress={() => {
                                                setCurrentStep(totalSteps);
                                            }}
                                        >
                                            ✅ Submit? / Next ▷
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        )}

                        {/* Step 6 Form */}
                        {currentStep === (totalSteps) && (
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
                                    <Button color="secondary" className="flex-1" size="lg" radius="full" onPress={() => setCurrentStep(currentStep - 1)}>
                                        ◁ Go Back / Start New Application 🌱 💡
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
