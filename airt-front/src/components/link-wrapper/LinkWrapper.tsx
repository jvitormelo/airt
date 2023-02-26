import Link from "next/link";
import { FC } from "react";

interface Props {
  href?: string;
  children: React.ReactNode;
}

export const LinkWrapper: FC<Props> = ({ href, children }) => {
  if (href)
    return (
      <Link style={{ textDecoration: "none" }} href={href} passHref>
        {children}
      </Link>
    );

  return <>{children}</>;
};
