import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { OOFLOGO } from "./OOFLOGO";
export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <OOFLOGO />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/admin"}
              href="/admin"
            />
            <SidebarMenu title="Main Menu">
              {/* <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              /> */}

              <SidebarItem
                isActive={pathname === "/admin/stats"}
                title="Stats"
                icon={<BalanceIcon />}
                href="/admin/stats"
              />
              <SidebarItem
                isActive={pathname === "/admin/search-terms"}
                title="Search Terms"
                icon={<FilterIcon />}
                href="/admin/search-terms"
              />
              <SidebarItem
                isActive={pathname === "/admin/scanned"}
                title="Scanned Ads"
                icon={<ChangeLogIcon />}
                href="/admin/scanned"
              />
              <SidebarItem
                isActive={pathname === "/admin/reports"}
                title="Reports"
                icon={<ReportsIcon />}
                href="/admin/reports"
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
                href="/admin/settings"
              />
              <SidebarItem
                isActive={pathname === "/admin/awareness"}
                title="Awareness"
                icon={<ViewIcon />}
                href="/admin/awareness"
              />
              <SidebarItem
                isActive={pathname === "/docs/index.html"}
                title="Documentation"
                icon={<DevIcon />}
                href="/docs/index.html"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
