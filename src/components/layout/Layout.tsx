import { Providers } from "../providers/ProviderNextUI";
import React from "react";
/**
 *
 * @param param0
 * @returns React.JSX.Element
 *
 * layout
 *
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="flex justify-center content-center">
        <div className="w-full xl:max-w-[2000px]">
          {children}
        </div>
      </div>
    </Providers>
  );
};

export default Layout;
