import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";

const items = [
  {
    name: "Instagram",
    picture: "https://avatars.githubusercontent.com/u/97225946?v=4",
    amount: "45000 INR",
    date: "14/7/2024",
  },
  {
    name: "Facebook",
    picture: "https://avatars.githubusercontent.com/u/168414350?s=200&v=4",
    amount: "40500 INR",
    date: "12/7/2024",
  },
  {
    name: "News Paper",
    picture: "https://avatars.githubusercontent.com/u/97225946?v=4",
    amount: "31500 INR",
    date: "11/7/2024",
  },
  {
    name: "Youtube",
    picture: "https://avatars.githubusercontent.com/u/168414350?s=200&v=4",
    amount: "11500 INR",
    date: "10/7/2024",
  },
  {
    name: "Twitter",
    picture: "https://avatars.githubusercontent.com/u/168414350?s=200&v=4",
    amount: "6500 INR",
    date: "08/7/2024",
  },
];

export const CardTransactions = () => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Latest Scans
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 ">
          {items.map((item) => (
            <div key={item.name} className="grid grid-cols-4 w-full">
              <div className="w-full">
                <Avatar
                  isBordered
                  color="secondary"
                  src={item.picture}
                />
              </div>

              <span className="text-default-900  font-semibold">
                {item.name}
              </span>
              <div>
                <span className="text-success text-xs">Success</span>
              </div>
              <div>
                <span className="text-default-500 text-xs">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
