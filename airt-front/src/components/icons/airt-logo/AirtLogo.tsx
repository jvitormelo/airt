import { Routes } from "@/routes";
import Image from "next/image";
import Link from "next/link";

export const AirtLogo = () => {
  return (
    <Link passHref href={Routes.Home}>
      <Image alt="Logo" width={72} height={30} src="/airt-logo.png" />
    </Link>
  );
};
