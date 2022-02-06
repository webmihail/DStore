import { ReactNode } from "react";
import { Placement } from "../constants";

export interface AppDrawerOwnProps {
  title?: string;
  placement: Placement;
  closable: boolean;
  children: ReactNode;
}
