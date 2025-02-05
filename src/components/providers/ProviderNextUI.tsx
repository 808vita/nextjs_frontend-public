import { NextUIProvider } from "@nextui-org/react";

/**
 *
 * @param param0
 * @returns  JSX.Element
 *
 * nextui provider
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
