import React from "react";

const featuresData = [
  {
    title: "Proactive AI Scam Detection",
    description:
      "Utilizes Gemini Flash 1.5's multimodal capabilities to analyze text, images, and website screenshots for identifying scam threats proactively.",
  },
  {
    title: "Self-Learning Capabilities",
    description:
      "Detects, extracts, learns, and evolves, making it highly adaptable to new scam trends and patterns automatically.",
  },
  {
    title: "Multilingual Support",
    description:
      "Supports major Indic languages (Tamil, Hindi, Telugu, etc.), enabling a broader reach and inclusivity for diverse Indian users.",
  },
  {
    title: "Automated Public Awareness",
    description:
      "Dynamically generates and updates a public awareness page with the latest scam detections, providing user safety and real-time information.",
  },
  {
    title: "Wide Scan Coverage",
    description:
      "Covers Facebook, Instagram, Messenger, and Audience Network providing a wide scan coverage and protection of about 3 crore Tamil Nadu users.",
  },
  {
    title: "User-Friendly Dashboard",
    description:
      "Provides a user-friendly dashboard that makes it easier to understand the data and analysis results, and to report or monitor any scams. ",
  },
];

export const Features = () => {
  return (
    <section className="py-16  px-4 bg-default-50 rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold text-default-900 text-center mb-8">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-md shadow-sm flex flex-col gap-4"
          >
            <h3 className="text-xl font-semibold text-default-900">
              {feature.title}
            </h3>
            <p className="text-default-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
