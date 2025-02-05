import React, { useState } from "react";
import { Hero } from "@/components/components/home/hero";
import { Features } from "@/components/components/home/features";
import { Demo } from "@/components/components/home/demo";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const PublicHomePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className=" flex flex-col gap-6 items-center p-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4">
          <Link
            href="/awareness"
            className="bg-primary-500 px-4 py-2 text-white rounded-md"
          >
            Public Awareness Page
          </Link>
          <Link href="/signup" className="bg-default-200  px-4 py-2 rounded-md">
            Signup
          </Link>
          <Link href="/login" className="bg-default-200  px-4 py-2 rounded-md">
            Login
          </Link>
        </div>
      </div>
      <Hero onOpen={onOpen} />
      <Features />
      <Demo />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                About AdShield
              </ModalHeader>
              <ModalBody>
                <p>
                  AdShield is developed as part of the TN Police Hackathon 2024.
                  It's designed to identify and analyze social media targeted
                  advertisements for cyber scams.
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PublicHomePage;
