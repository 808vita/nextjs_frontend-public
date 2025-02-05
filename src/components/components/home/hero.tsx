import React from "react";

interface HeroProps {
  onOpen: () => void;
}
export const Hero: React.FC<HeroProps> = ({ onOpen }) => {
  return (
    <section className="py-16 bg-default-50 rounded-xl shadow-md px-4 flex flex-col gap-6 items-center text-center">
      <h1 className="text-4xl font-bold text-default-900">
        AdShield: Your Shield Against Social Media Ad Scams
      </h1>
      <p className="text-default-700 max-w-2xl">
        AdShield uses AI-powered analysis to proactively identify social media
        targeted advertisements and analyze potential cyber scams. Our
        multilingual approach and open source intelligence integration enhance
        detection accuracy and promote user awareness and online safety.
      </p>
      <button
        onClick={onOpen}
        className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        Learn More
      </button>
    </section>
  );
};
