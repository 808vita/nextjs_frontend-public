import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance1 = () => {
  return (
    <Card className="xl:max-w-sm bg-primary-400 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Ads Checked</span>
            <span className="text-white text-xs">This Week</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">5,910</span>
          <span className="text-success text-xs">+ 8.5%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success text-xs">{"↓"}</span>
              <span className="text-xs text-white">30,123</span>
            </div>
            <span className="text-white text-xs">Last Month</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs text-white">54,120</span>
            </div>
            <span className="text-white text-xs">This Month</span>
          </div>
          {/* 
          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs text-white">125</span>
            </div>
            <span className="text-white text-xs">OSINT</span>
          </div> */}
        </div>
      </CardBody>
    </Card>
  );
};
