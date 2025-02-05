import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance2 = () => {
  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-default-900">OSINT Sent To Authorities</span>
            <span className="text-default-900 text-xs">+240 </span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-900 text-xl font-semibold">
            1,234
          </span>
          <span className="text-danger text-xs">- 4.5%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success-600 text-xs">
                {"↓"}
              </span>
              <span className="text-xs">4,567</span>
            </div>
            <span className="text-default-900 text-xs">Last Month</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs">6,478</span>
            </div>
            <span className="text-default-900 text-xs">This Month</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs">150</span>
            </div>
            <span className="text-default-900 text-xs">Validated</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
