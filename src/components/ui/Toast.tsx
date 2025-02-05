import React, { useState, useEffect } from "react";

interface ToastProps {
  title: string;
  description: string;
  color: "success" | "danger";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  title,
  description,
  color,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const backgroundColor = color === "success" ? "bg-green-200" : "bg-red-200";
  const textColor = color === "success" ? "text-green-800" : "text-red-800";
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${backgroundColor} ${textColor} flex flex-col gap-1 z-20`}
    >
      <span className="font-semibold">{title}</span>
      <p>{description}</p>
    </div>
  );
};

export default Toast;
