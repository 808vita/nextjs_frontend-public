import React, { useState, useCallback } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { MultimodalAnalysis } from "@/components/ui/MultimodalAnalysis";

export const Demo = () => {
  return (
    <section className="py-16 px-4 bg-default-50 rounded-xl shadow-md flex flex-col gap-6 items-center">
      <h2 className="text-3xl font-semibold text-default-900 text-center mb-8">
        Live Scam Detection Demo
      </h2>
      <MultimodalAnalysis />
    </section>
  );
};
