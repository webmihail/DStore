import { ReactNode } from "react";

export interface AppButtonOwnProps {
  type?: "WHITE" | "GOLD";
  children: ReactNode;
  style?: string;
}
