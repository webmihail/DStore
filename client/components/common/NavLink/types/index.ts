import { ReactNode } from "react";

export interface NavLinkOwnProps {
  children: ReactNode;
  href: string;
  className?: string;
}