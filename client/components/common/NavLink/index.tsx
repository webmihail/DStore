import Link from "next/link";
import { FC } from "react";
import { NavLinkOwnProps } from "./types";

const NavLink: FC<NavLinkOwnProps> = ({ className, href, children }): JSX.Element => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default NavLink;
