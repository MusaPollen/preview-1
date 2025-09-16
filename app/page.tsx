"use client"

// import Image from "next/image";
import { Button } from '@heroui/button';


import { Image } from "@heroui/image";
import { Card, CardHeader, CardFooter, CardBody } from "@heroui/react";


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










      {/* CARD AREA TESTING */}

      <div className="gap-0 grid grid-cols-12 px-8 lg:px-48">
        {/* <div className="max-w-[1900px] gap-2 grid grid-cols-12 grid-rows-3 px-0"> */}
        <Card isFooterBlurred className="w-full h-[200px] col-span-12 sm:col-span-7" radius='none'>
          <Image
            radius='none'
            removeWrapper
            alt="Card background"
            // className="z-0 w-full h-full object-cover"
            className="z-0 w-full h-full object-cover object-center sm:object-center"
            src="/images/warning.png"
          />
        </Card>

        <Card isFooterBlurred className="col-span-12 sm:col-span-5 row-span-2 bg-white/10 backdrop-blur-md" radius='none'>
          {/* card header */}
          <CardHeader className="flex gap-3 items-center justify-center">
            <div className="flex flex-col">
              <p className="text-lg text-purple-600 font-bold">SIGN IN</p>
            </div>
          </CardHeader>
        </Card>

        <Card className="col-span-12 sm:col-span-7 h-[200px]" radius='none'>
          <Image
            radius='none'
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="/images/output.png"
          />
        </Card>
      </div>







      {/* CARD AREA TESTING */}














    </>

  );
}
