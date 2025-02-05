import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";
import React from "react";

const pictureUsers = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
];

export const CardAgents = () => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
      <CardBody className="py-5 gap-6">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              {"⭐"}Agents
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-col">
          <span className="text-xs">
            Uses Round Robin to auto send collected OSINT to designated agents.
          </span>
          <AvatarGroup isBordered>
            <Avatar src="https://avatars.githubusercontent.com/u/97225946?v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/168414350?s=200&v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/97225946?v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/168414350?s=200&v=4" />
            <Avatar src="https://avatars.githubusercontent.com/u/97225946?v=4" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </AvatarGroup>
        </div>
      </CardBody>
    </Card>
  );
};
