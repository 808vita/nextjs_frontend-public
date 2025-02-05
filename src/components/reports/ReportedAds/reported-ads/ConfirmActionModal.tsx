import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Action
            </ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
