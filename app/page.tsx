// import Image from "next/image";
import { Button } from '@heroui/button';

import { Image } from "@heroui/image";

export default function Home() {
  return (
    <>








    
    {/* nav area */}
      <section className="flex flex-col sm:flex-row flex-wrap items-center justify-center p-4">
        {/* <div className="w-1/2 aspect-[4/1]"> */}
        <div className="w-1/2">
          <Image
            alt="HeroUI hero Image"
            src="/images/logo_sebl.png"
            className="object-contain"
          />
        </div>
        {/* hidden sm: (test by adding before..)*/}
        {/* <div className="flex w-1/2 aspect-[4/1] justify-end"> */}
        <div className="flex w-1/2 justify-end">
          <Image
            alt="HeroUI hero Image"
            src="/images/instapay_name.png"

            className="h-auto w-auto"
          />
        </div>
      </section>
    {/* nav area */}











    </>

  );
}
