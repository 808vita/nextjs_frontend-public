import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import { EditIcon } from "@/components/components/icons/table/edit-icon";
import { DeleteIcon } from "@/components/components/icons/table/delete-icon";
import { EyeIcon } from "@/components/components/icons/table/eye-icon";
import Toast from "@/components/ui/Toast";

interface SearchTerm {
  id: string;
  term: string;
  translated_terms: string[];
}

interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  term: string;
  translatedTerms: string[];
  onSave: (term: string, translatedTerms: string[]) => void;
  onCancel: () => void;
}
//edit modal
const EditSearchTermModal: React.FC<EditModalProps> = ({
  isOpen,
  onOpenChange,
  term,
  translatedTerms: initialTranslatedTerms,
  onSave,
  onCancel,
}) => {
  const [editTermValue, setEditTermValue] = useState(term);
  const [translatedTerms, setTranslatedTerms] = useState<string[]>(
    initialTranslatedTerms
  );

  useEffect(() => {
    setEditTermValue(term);
    setTranslatedTerms(initialTranslatedTerms);
  }, [term, initialTranslatedTerms]);

  const handleSeedTranslation = async () => {
    //   make api call to /api/translate with searchTerm
    //   extract "tamil", "hindi", and "telugu" values from the response
    //   store these translations in translatedTerms state
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: editTermValue }),
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
    } catch (error: any) {
      console.error(error, "failed to fetch");
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Search Term
            </ModalHeader>
            <ModalBody>
              <Input
                label="Search Term"
                variant="bordered"
                value={editTermValue}
                onChange={(e) => setEditTermValue(e.target.value)}
              />
              <Button color="primary" onPress={handleSeedTranslation}>
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
              <Button color="danger" variant="flat" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onSave(editTermValue, translatedTerms);
                  onClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}
const DeleteSearchTermModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete this search term?
            </ModalBody>
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

interface ViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: SearchTerm | null;
}
const ViewSearchTermModal: React.FC<ViewModalProps> = ({
  isOpen,
  onOpenChange,
  searchTerm,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Search Term Details
            </ModalHeader>
            <ModalBody>
              {searchTerm && <pre>{JSON.stringify(searchTerm, null, 2)}</pre>}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const SearchTermTable: React.FC = () => {
  const [searchTerms, setSearchTerms] = useState<SearchTerm[]>([]);
  const [searchTermSearch, setSearchTermSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editTermId, setEditTermId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen: isEditModalOpen, onOpenChange: onEditModalOpenChange } =
    useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpenChange: onDeleteModalOpenChange } =
    useDisclosure();
  const { isOpen: isViewModalOpen, onOpenChange: onViewModalOpenChange } =
    useDisclosure();
  const [currentTermId, setCurrentTermId] = useState<string | null>(null);
  const [currentTermTranslations, setCurrentTermTranslations] = useState<
    string[]
  >([]);
  const rowsPerPage = 10;

  const [viewTerm, setViewTerm] = useState<SearchTerm | null>(null);
  const [toastProps, setToastProps] = useState<{
    title: string;
    description: string;
    color: "success" | "danger" | undefined;
  } | null>(null);
  const handleCloseToast = () => {
    setToastProps(null);
  };
  const fetchSearchTerms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/search-terms`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setSearchTerms(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch search terms");
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to handle updating a search term using PUT request
  const handleUpdateSearchTerm = useCallback(
    async (term: string, translatedTerms: string[]) => {
      if (!currentTermId) return;
      setIsUpdating(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/search-terms/${currentTermId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            // Include the translated terms array in the request body
            body: JSON.stringify({
              term: term,
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
        setCurrentTermId(null);
        setToastProps({
          title: "Success",
          description: "Search term updated",
          color: "success",
        });
        await fetchSearchTerms();
      } catch (error: any) {
        setError(error.message || "Failed to update the search term.");
        setToastProps({
          title: "Error",
          description: error.message || "Failed to update the search term.",
          color: "danger",
        });
      } finally {
        setIsUpdating(false);
      }
    },
    [fetchSearchTerms, currentTermId]
  );
  const handleOpenEditModal = useCallback(
    (id: string, term: string, translated_terms: string[]) => {
      setEditTermId(id);
      setCurrentTermId(id);
      setCurrentTermTranslations(translated_terms);
      onEditModalOpenChange(true);
    },
    [onEditModalOpenChange]
  );
  const handleDeleteSearchTerm = useCallback(
    async (id: string) => {
      setCurrentTermId(id);
      onDeleteModalOpenChange(true);
    },
    [onDeleteModalOpenChange]
  );
  const handleOpenViewModal = useCallback(
    (item: SearchTerm) => {
      setViewTerm(item);
      onViewModalOpenChange(true);
    },
    [onViewModalOpenChange]
  );
  // Function to handle deleting a search term
  const handleConfirmDelete = useCallback(async () => {
    if (!currentTermId) return;
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_API_URI}/api/search-terms/${currentTermId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }
      setToastProps({
        title: "Success",
        description: "Search term deleted",
        color: "success",
      });
      fetchSearchTerms();
    } catch (error: any) {
      setError(error.message || "Failed to delete search term");
      setToastProps({
        title: "Error",
        description: error.message || "Failed to delete search term",
        color: "danger",
      });
    } finally {
      setCurrentTermId(null);
    }
  }, [currentTermId, fetchSearchTerms]);
  const filteredTerms = useMemo(() => {
    if (!searchTermSearch) return searchTerms;
    return searchTerms.filter((item) =>
      item.term.toLowerCase().includes(searchTermSearch.toLowerCase())
    );
  }, [searchTermSearch, searchTerms]);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedItems = useMemo(() => {
    return filteredTerms.slice(startIndex, endIndex);
  }, [filteredTerms, startIndex, endIndex]);

  const pages = useMemo(() => {
    return Math.ceil(filteredTerms.length / rowsPerPage) || 1;
  }, [filteredTerms, rowsPerPage]);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    fetchSearchTerms();
  }, [fetchSearchTerms]);

  if (loading) {
    return <div>Loading search terms...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {toastProps && <Toast {...toastProps} onClose={handleCloseToast} />}
      <Input
        classNames={{
          input: "w-full",
          mainWrapper: "w-full",
        }}
        placeholder="Search search terms"
        value={searchTermSearch}
        onChange={(e) => setSearchTermSearch(e.target.value)}
      />
      <EditSearchTermModal
        isOpen={isEditModalOpen}
        onOpenChange={onEditModalOpenChange}
        term={
          editTermId
            ? searchTerms.find((item) => item.id === editTermId)?.term || ""
            : ""
        }
        translatedTerms={
          editTermId
            ? searchTerms.find((item) => item.id === editTermId)
                ?.translated_terms || []
            : []
        }
        onSave={handleUpdateSearchTerm}
        onCancel={() => {
          setEditTermId(null);
          onEditModalOpenChange(false);
        }}
      />
      <ViewSearchTermModal
        isOpen={isViewModalOpen}
        onOpenChange={onViewModalOpenChange}
        searchTerm={viewTerm}
      />
      <DeleteSearchTermModal
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setCurrentTermId(null);
          onDeleteModalOpenChange(false);
        }}
      />
      <Table aria-label="Search Terms Table">
        <TableHeader>
          <TableColumn key="id">ID</TableColumn>
          <TableColumn key="term">Search Term</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody items={paginatedItems}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.term}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip content="View" color="secondary">
                    <button onClick={() => handleOpenViewModal(item)}>
                      <EyeIcon size={20} fill="#979797" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Edit" color="secondary">
                    <button
                      onClick={() =>
                        handleOpenEditModal(
                          item.id,
                          item.term,
                          item.translated_terms
                        )
                      }
                    >
                      <EditIcon size={20} fill="#979797" />
                    </button>
                  </Tooltip>

                  <Tooltip content="Delete" color="danger">
                    <button onClick={() => handleDeleteSearchTerm(item.id)}>
                      <DeleteIcon size={20} fill="#FF0080" />
                    </button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        total={pages}
        initialPage={1}
        onChange={handlePageChange}
        page={page}
      />
    </div>
  );
};
