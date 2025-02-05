import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const UserDropdown = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  }, [router]);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://avatars.githubusercontent.com/u/168414350?s=200&v=4"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{session?.user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="settings"
          as={Link}
          href="/admin/settings"
          onPress={() => {}}
        >
          My Settings
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
