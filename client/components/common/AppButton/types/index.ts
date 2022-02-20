import { ReactNode } from "react";

export interface AppButtonOwnProps {
  type?: "WHITE" | "GOLD";
  children: ReactNode;
  className?: string;
}
