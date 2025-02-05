import {
  User,
  Tooltip,
  Chip,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { EyeIcon } from "../../components/icons/table/eye-icon";
import { EditIcon } from "../../components/icons/table/edit-icon";
import { DeleteIcon } from "../../components/icons/table/delete-icon";

interface Props {
  item: any;
  columnKey: string | React.Key;
}
export const RenderCell: React.FC<Props> = ({ item, columnKey }) => {
  // @ts-ignore
  const cellValue = item[columnKey];
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { ad_screenshot_base64, web_screenshot_base64, ...ad_data } = item;

  switch (columnKey) {
    case "id":
      return <span>{cellValue}</span>;
    case "search_term":
      return <span>{cellValue}</span>;
    case "publisher_platforms":
      return (
        <div>
          {cellValue.map((platform: string, key: any) => (
            <span key={key}>{platform} , </span>
          ))}
        </div>
      );
    case "gemini_analysis":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={cellValue?.is_scam === true ? "danger" : "default"}
        >
          {String(cellValue?.is_scam)}
        </Chip>
      );

    case "actions":
      return (
        <div>
          <Tooltip content="Details">
            <button onClick={handleOpen}>
              <EyeIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent className="max-w-2xl">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Ad Details
                  </ModalHeader>
                  <ModalBody>
                    <Accordion>
                      {(item?.ad_screenshot_base64 ||
                        item.web_screenshot_base64) && (
                        <AccordionItem title="Screenshots">
                          <div className="flex flex-col gap-4 h-80 overflow-scroll">
                            {item.ad_screenshot_base64 && (
                              <>
                                <p>AD Screenshot</p>
                                <Image
                                  src={
                                    "data:image/png;base64," +
                                    item.ad_screenshot_base64
                                  }
                                  width={500}
                                />
                                <hr />
                              </>
                            )}
                            {item.web_screenshot_base64 && (
                              <>
                                <p>CTA Link Screenshot</p>
                                <Image
                                  src={
                                    "data:image/png;base64," +
                                    item.web_screenshot_base64
                                  }
                                  width={500}
                                />
                              </>
                            )}
                          </div>
                        </AccordionItem>
                      )}
                      <AccordionItem title="Ad Data">
                        {item.id && (
                          <pre className="h-80 overflow-scroll">
                            {JSON.stringify(ad_data, null, 2)}
                          </pre>
                        )}
                      </AccordionItem>
                      {item.gemini_analysis && (
                        <AccordionItem title="Gemini Analysis">
                          {item.gemini_analysis && (
                            <pre className="h-80 overflow-scroll">
                              {JSON.stringify(item.gemini_analysis, null, 2)}
                            </pre>
                          )}
                        </AccordionItem>
                      )}
                    </Accordion>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      );
    default:
      return cellValue;
  }
};
