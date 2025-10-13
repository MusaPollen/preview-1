"use client";

import { Image } from "@heroui/react";

export default function BrandingLogoNav() {
    return (
        // nav area logo branding

        <section className="flex flex-col sm:flex-row flex-wrap items-center justify-center p-0">
            {/* <div className="w-1/2 aspect-[4/1]"> */}
            <div className="w-1/2">
                <Image
                    alt="HeroUI hero Image"
                    src="/images/logo_sebl.png"
                    className="object-contain scale-70"
                />
            </div>
            {/* hidden sm: (test by adding before..)*/}
            {/* <div className="flex w-1/2 aspect-[4/1] justify-end"> */}
            <div className="flex w-1/2 justify-end">
                <Image
                    alt="HeroUI hero Image"
                    src="/images/instapay_name.png"
                    className="h-auto w-auto scale-70"
                />
            </div>
        </section>

        // end - nav area logo branding
    );
}
