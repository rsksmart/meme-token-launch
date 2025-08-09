"use client";

import Image from "next/image";
import logo from "@/app/assets/img/logo.svg";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb/client"; // adjust this import if different
import { defineChain } from "thirdweb";
import { chains } from "thirdweb/bridge";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between py-6 px-6">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={logo} alt="rootstock-logo" />
      </div>
      <ul className="flex gap-8 text-sm font-medium">
        <li>
          <Link
            href="/deploy-token"
            className={clsx(
              "hover:text-orange-500 transition-colors",
              pathname === "/deploy-token" && "text-orange-500"
            )}
          >
            Deploy Token
          </Link>
        </li>
        <li>
          <Link
            href="/my-tokens"
            className={clsx(
              "hover:text-orange-500 transition-colors",
              pathname === "/my-tokens" && "text-orange-500"
            )}
          >
            My Tokens
          </Link>
        </li>
      </ul>
      <div>
        <ConnectButton client={client} chain={defineChain(31)} chains={[defineChain(31)]} />
      </div>
    </nav>
  );
}

export default Navbar;
