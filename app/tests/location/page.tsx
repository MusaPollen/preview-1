"use client";

import { useEffect, useRef, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

import { Skeleton } from "@heroui/skeleton";
import { Progress, Spinner } from "@heroui/react";
import { data } from "framer-motion/client";

export default function Home() {

    const router = useRouter();
    // const recaptchaRef = useRef<ReCAPTCHA>(null);
    // called when user completes the reCAPTCHA checkbox
    const handleVerify = async (token: string | null) => {
        if (!token) return;

        // ✅ Send token to backend for verification
        const res = await fetch("/api/verify-recaptcha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.success) {
            // ✅ Only navigate if backend verifies
            router.push("/dashboard");
        } else {
            alert("Verification failed. Try again.");
        }
    };

    //---------------------------------------geolocation check
    // check browser console for user ocation

    // useEffect(() => {
    //   // log User-Agent
    //   console.log("User-Agent:", navigator.userAgent);
    //   console.log("User-Agent:", navigator);

    //   // try geolocation
    //   if ("geolocation" in navigator) {
    //     navigator.geolocation.getCurrentPosition(
    //       (p) => console.log("Browser coords:", p.coords),
    //       (e) => console.error("Location error:", e)
    //     );
    //   } else {
    //     console.log("Geolocation not supported");
    //   }
    // }, []);

    // ---------------------------------------geolocation check




    //--------------------------------ipbased location check
    const [locationData, setLocationData] = useState<any>(null);
    useEffect(() => {
        // Call ipwhois.io to get client IP and location
        console.log("--------------------------------------------------------");
        fetch("https://ipwhois.app/json/") // CORS-friendly API
            .then((res) => res.json())
            .then((data) => {
                console.log("IPWHOIS Location Data:", data);
                setLocationData(data); // Save to state

                // Example: access latitude and longitude
                console.log("Latitude:", data.latitude);
                console.log("--------------------------------------------------------");
            })
            .catch((err) => {
                console.error("Failed to fetch IP location:", err);
            });
    }, []);

    //--------------------------------ipbased location check
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <p className="text-3xl">SPAM PROTECTION TEST</p>
            <br /><br /><br /><br />

            <div className="flex justify-center">
                <Progress aria-label="Loading..." className="w-[304px]" color="success" isIndeterminate size="sm" />
            </div>
            {/* Google reCAPTCHA v2 Checkbox */}
            <div className="flex justify-center items-center w-full relative">
                {/* <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} // your site key
                    ref={recaptchaRef}
                    onChange={handleVerify} // triggers when checkbox is checked
                /> */}
            </div>
            <div>
                {locationData ? (
                    <p>Latitude: {locationData.latitude}</p>
                ) : (
                    <p>Loading location...</p>
                )}

            </div>
            <div className="flex justify-center">
                <Progress aria-label="Loading..." className="w-[304px]" color="success" isIndeterminate size="sm" />
            </div>






        </div>
    );
}
