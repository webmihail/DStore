import Link from "next/link";
import { FC } from "react";
import { NavLinkOwnProps } from "./types";

const NavLink: FC<NavLinkOwnProps> = ({ style, href, children }): JSX.Element => {
  return (
    <Link href={href}>
      <a className={style}>{children}</a>
    </Link>
  );
};

export default NavLink;
