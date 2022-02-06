import { ReactNode } from "react";

export interface AppLayoutOwnProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}