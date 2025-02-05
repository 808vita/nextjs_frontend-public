import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Spinner,
} from "@nextui-org/react";
import { AdCard } from "@/components/ui/AdCard";

interface AdDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  adId: string | null;
  onVisitAd?: (
    access_token_removed_url: string,
    access_token: string,
    adId: string
  ) => void;
}

export const AdDetailsModal: React.FC<AdDetailsModalProps> = ({
  isOpen,
  onOpenChange,
  adId,
  onVisitAd,
}) => {
  const [selectedAd, setSelectedAd] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adNotFound, setAdNotFound] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);

  const handleToggleShowDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  const fetchAdDetails = useCallback(async () => {
    if (!adId || !showFullDetails) return;
    setLoading(true);
    setError(null);
    setSelectedAd(null);
    setAdNotFound(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/checked-meta-ads/${adId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setAdNotFound(true);
          return;
        }
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const metaAdData = await response.json();
      if (metaAdData.ad) {
        setSelectedAd(metaAdData.ad);
      } else {
        setAdNotFound(true);
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch ad details.");
    } finally {
      setLoading(false);
    }
  }, [adId, showFullDetails]);

  useEffect(() => {
    if (isOpen) {
      fetchAdDetails();
    }
  }, [isOpen, adId, fetchAdDetails]);

  const handleVisitAd = () => {
    if (selectedAd?.access_token_removed_url) {
      onVisitAd &&
        onVisitAd(
          selectedAd?.access_token_removed_url,
          process.env.NEXT_PUBLIC_META_ACCESS_TOKEN || "",
          selectedAd?.id
        );
    } else {
      alert("Invalid Url");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Ad Details
            </ModalHeader>
            <ModalBody>
              {loading && (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              )}
              {error && <div className="text-red-500">{error}</div>}
              {adNotFound && (
                <div className="text-default-500">No Ad Found</div>
              )}

              {selectedAd && (
                <>
                  <AdCard ad={selectedAd} />
                  <div className="flex justify-between">
                    <Button color="primary" onClick={handleVisitAd}>
                      Visit Ad
                    </Button>
                    {!showFullDetails && (
                      <Button color="primary" onClick={handleToggleShowDetails}>
                        Load Full Details
                      </Button>
                    )}
                  </div>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
