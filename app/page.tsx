"use client"

// import Image from "next/image";
import { Button } from '@heroui/button';


import { Image } from "@heroui/image";
import { Card, CardHeader, CardFooter, CardBody, Tabs, Tab } from "@heroui/react";
import { Form } from "@heroui/form";
import React from "react";
import { Input } from "@heroui/input";

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';




export default function Home() {

  const [submitted, setSubmitted] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data)
    setSubmitted(data);
  };

  return (
    <>








      have to change logo size later
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




        {/* login form card */}
        <Card isFooterBlurred className="col-span-12 sm:col-span-5 row-span-2 bg-white/10 backdrop-blur-md" radius='none'>
          <Tabs aria-label="Options" variant='underlined' color='primary' className="flex w-full flex-col items-end">
            {/* ENGLISH */}
            <Tab key="english" title="English" className="flex flex-col items-center">
              <p className="text-lg text-purple-600 font-bold">SIGN IN</p>
              <Tabs aria-label="Options" size="lg" radius="full" color="secondary">
                <Tab key="ibank" title="IBank">
                  <Form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-y-4">
                      <Input
                        name="username"
                        isRequired
                        labelPlacement="outside"
                        placeholder="Username"
                        endContent={
                          <UserCircleIcon className="w-6 h-6 text-purple-600" />
                        }
                      />
                      <Input
                        name="password"
                        isRequired
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-solid outline-transparent"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <EyeIcon className="w-6 h-6 text-purple-600" />
                            ) : (
                              <EyeSlashIcon className="w-6 h-6 text-purple-600" />
                            )}
                          </button>
                        }
                        placeholder="Password"
                        type={isVisible ? "text" : "password"}
                      />
                      <Button color="secondary" variant="ghost" type="submit">
                        Submit
                      </Button>
                      {submitted && (
                        <div className="text-small text-default-500">
                          You submitted: <code>{JSON.stringify(submitted)}</code>
                        </div>
                      )}
                    </div>
                  </Form>
                </Tab>
                <Tab key="card" title="Card">
                  <Card>
                    <CardBody>
                      Ut enim ad minim veniam, quis nostr
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Tab>
            {/* BANGLA+++++++++++++++++++++++++++++++++++++++++++++++++ */}
            <Tab key="bangla" title="বাংলা" className="flex flex-col items-center">
              <p className="text-lg text-purple-600 font-bold">সাইন ইন</p>
            </Tab>
          </Tabs>
          {/* card header */}
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
