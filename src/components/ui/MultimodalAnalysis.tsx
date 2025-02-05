import React, { useState, useCallback, useRef } from "react";
import { Input, Button, Textarea, Image } from "@nextui-org/react";
import Toast from "./Toast";

interface CustomFileInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  label,
  onChange,
  accept,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="file-input"
        className="block text-sm font-medium text-default-900"
      >
        {label}
      </label>
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={onChange}
        accept={accept}
        ref={fileInputRef}
      />
      <Button
        variant="bordered"
        onClick={handleClick}
        className="w-full border-dashed"
      >
        Select File
      </Button>
    </div>
  );
};

export const MultimodalAnalysis = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description: string;
    color: "success" | "danger" | undefined;
  } | null>(null);

  const handleCloseToast = () => {
    setToastProps(null);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString()?.split(",")[1] || "";
        const mimeType = file.type;
        setMimeType(mimeType);
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = useCallback(async () => {
    if (!text.trim() && !image) {
      setError("Please add text or image to analyze");
      setToastProps({
        title: "Error",
        description: "Please add text or image to analyze",
        color: "danger",
      });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/analyze/multimodal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            image_base64: `data:${mimeType};base64,${image}`,
            mime_type: mimeType,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setAnalysisResult(data);
      setToastProps({
        title: "Analysis Success",
        description: "Analysis success",
        color: "success",
      });
    } catch (error: any) {
      setError(error.message || "Failed to analyze text");
      setToastProps({
        title: "Error",
        description: error.message || "Failed to analyze",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  }, [image, text, mimeType]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      {toastProps && <Toast {...toastProps} onClose={handleCloseToast} />}
      <Textarea
        label="Enter Text for analysis"
        variant="bordered"
        value={text}
        onChange={handleTextChange}
      />
      <CustomFileInput
        label="Upload Image for analysis"
        onChange={handleImageChange}
        accept="image/*"
      />
      {image && (
        <Image
          width={200}
          height={200}
          src={`data:${mimeType};base64,${image}`}
          alt="Uploaded Image"
          className="mt-4 rounded-md shadow-sm"
        />
      )}
      {error && <div className="text-red-500">{error}</div>}
      <Button color="primary" onPress={handleAnalysis} isLoading={loading}>
        Analyze
      </Button>

      {analysisResult && (
        <div className="mt-4 p-4 bg-default-100 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold text-default-900">
            Analysis Result
          </h3>
          <pre className="mt-2 text-sm text-default-700 overflow-auto whitespace-pre-wrap">
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
