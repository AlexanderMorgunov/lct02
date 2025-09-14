import { JSX } from "react";

export type NavItem = {
  title: string;
  icon: React.ReactNode | JSX.Element;
  href: string;
};
