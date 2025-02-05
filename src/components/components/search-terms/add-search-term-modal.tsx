import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useCallback } from "react";
import Toast from "@/components/ui/Toast";

interface AddSearchTermModalProps {
  onSearchTermAdded: () => void;
}

export const AddSearchTermModal: React.FC<AddSearchTermModalProps> = ({
  onSearchTermAdded,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translatedTerms, setTranslatedTerms] = useState<string[]>([]); // State for storing translated terms
  const [toastProps, setToastProps] = useState<{
    title: string;
    description: string;
    color: "success" | "danger" | undefined;
  } | null>(null);

  const handleCloseToast = () => {
    setToastProps(null);
  };

  // Function to handle the translation seeding
  const handleSeedTranslation = async () => {
    if (!searchTerm.trim()) {
      setError("Search term cannot be empty for translation.");
      setToastProps({
        title: "Error",
        description: "Search term cannot be empty for translation.",
        color: "danger",
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // API call to /api/translate
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: searchTerm }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const translationData = await response.json();
      const translations = [];
      if (translationData.tamil) translations.push(translationData.tamil);
      if (translationData.hindi) translations.push(translationData.hindi);
      if (translationData.telugu) translations.push(translationData.telugu);

      setTranslatedTerms(translations);
      setToastProps({
        title: "Translation Success",
        description: "Search term translated successfully",
        color: "success",
      });
    } catch (error: any) {
      setError(error.message || "Failed to translate the search term");
      setToastProps({
        title: "Error",
        description: error.message || "Failed to translate the search term",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Function to handle the creation of the search term
  const handleCreateSearchTerm = useCallback(async () => {
    if (!searchTerm.trim()) {
      setError("Search term cannot be empty.");
      setToastProps({
        title: "Error",
        description: "Search term cannot be empty.",
        color: "danger",
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // API call to create the search term /api/search-terms
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/search-terms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Include the translated terms array in the request body
          body: JSON.stringify({
            term: searchTerm,
            translated_terms: translatedTerms,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      setSearchTerm("");
      setTranslatedTerms([]);
      onOpenChange();
      onSearchTermAdded();
      setToastProps({
        title: "Success",
        description: "Search term created",
        color: "success",
      });
    } catch (error: any) {
      setError(error.message || "Failed to create search term");
      setToastProps({
        title: "Error",
        description: error.message || "Failed to create search term",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    searchTerm,
    onOpenChange,
    onSearchTermAdded,
    translatedTerms,
    toastProps,
  ]);
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Search Term
      </Button>
      {toastProps && <Toast {...toastProps} onClose={handleCloseToast} />}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Search Term
              </ModalHeader>
              <ModalBody>
                {error && <div className="text-red-500">{error}</div>}
                <Input
                  label="Search Term"
                  variant="bordered"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  color="primary"
                  onPress={handleSeedTranslation}
                  isLoading={isLoading}
                >
                  Seed Translation
                </Button>
                {translatedTerms.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold">Translations:</p>
                    <ul>
                      {translatedTerms.map((translation, index) => (
                        <li key={index}>{translation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleCreateSearchTerm}
                  isLoading={isLoading}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
