'use client'
import Image from "next/image";
import { Button } from '@heroui/button';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";

import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Home() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Navbar className="bg-purple-300 text-black">
        <NavbarBrand>
          <AcmeLogo />
          <Button onPress={onOpen} color="secondary" variant="bordered">Open Drawer</Button>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="danger" href="#" >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="left" size="sm">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
              <DrawerBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>



    </div>
  );
}
