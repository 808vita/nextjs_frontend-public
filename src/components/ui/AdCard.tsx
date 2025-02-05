import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";

interface AdCardProps {
  ad: any;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <Card className="bg-default-50 rounded-xl shadow-md  flex flex-col ">
      <CardHeader className="p-4">
        <h4 className="text-lg font-semibold text-default-900">
          {ad?.page_name || "Ad"}
        </h4>
      </CardHeader>
      <CardBody className="p-4">
        <div className="flex flex-col gap-4 h-80 overflow-scroll">
          {ad.ad_screenshot_base64 && (
            <>
              <p>AD Screenshot</p>
              <Image
                src={"data:image/png;base64," + ad.ad_screenshot_base64}
                // width={500}
                className="rounded-md object-contain h-64 w-full"
              />
              <hr />
            </>
          )}
          {ad.web_screenshot_base64 && (
            <>
              <p>CTA Link Screenshot</p>
              <Image
                src={"data:image/png;base64," + ad.web_screenshot_base64}
                // width={500}
                className="rounded-md object-contain h-64 w-full"
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <p className="text-default-700 text-sm font-medium">
            Publisher Platforms:
          </p>
          <p className="text-default-700 text-xs">
            {ad?.publisher_platforms?.join(", ") || "N/A"}
          </p>
        </div>
        {ad?.gemini_analysis?.is_scam !== undefined && (
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-default-700 text-sm font-medium">Is Scam:</p>
            <p className="text-default-700 text-xs">
              {String(ad?.gemini_analysis?.is_scam)}
            </p>
          </div>
        )}
        {ad?.ad_creative_link_captions?.length > 0 && (
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-default-700 text-sm font-medium">Captions:</p>
            {ad.ad_creative_link_captions.map(
              (caption: string, index: number) => (
                <p key={index} className="text-default-700 text-xs">
                  {caption}
                </p>
              )
            )}
          </div>
        )}
        {ad?.ad_creative_link_descriptions?.length > 0 && (
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-default-700 text-sm font-medium">Description:</p>
            {ad.ad_creative_link_descriptions.map(
              (description: string, index: number) => (
                <p key={index} className="text-default-700 text-xs">
                  {description}
                </p>
              )
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
