"use client";

import Image from "next/image";
import logo from "@/app/assets/img/logo.svg";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb/client";
import { defineChain } from "thirdweb";
import { useState } from "react";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-300"
            onClick={() => {
              router.push("/");
              closeMobileMenu();
            }}
          >
            <Image 
              src={logo} 
              alt="Rootstock Logo" 
              className="h-6 w-auto sm:h-7 md:h-10"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex gap-8 text-sm font-medium">
              <li>
                <Link
                  href="/deploy-token"
                  className={clsx(
                    "relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-orange-500/10",
                    pathname === "/deploy-token" 
                      ? "text-orange-500 bg-orange-500/10" 
                      : "text-gray-300 hover:text-orange-500"
                  )}
                >
                  Deploy Token
                  {pathname === "/deploy-token" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></div>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/my-tokens"
                  className={clsx(
                    "relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-orange-500/10",
                    pathname === "/my-tokens" 
                      ? "text-orange-500 bg-orange-500/10" 
                      : "text-gray-300 hover:text-orange-500"
                  )}
                >
                  My Tokens
                  {pathname === "/my-tokens" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"></div>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop Connect Button */}
          <div className="hidden md:block">
            <ConnectButton 
              client={client} 
              chain={defineChain(31)} 
              chains={[defineChain(31)]} 
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Connect Button - Compact */}
            <div className="[&>button]:!h-9 [&>button]:!min-h-9 [&>button]:!min-w-[120px] [&>button]:!text-sm [&>button]:!px-1">
              <ConnectButton 
                client={client} 
                chain={defineChain(31)} 
                chains={[defineChain(31)]}
                connectButton={{
                  style: {
                    height: "36px",
                    minHeight: "36px", 
                    maxWidth: "120px",
                    fontSize: "12px",
                    padding: "0 12px"
                  }
                }}
                detailsButton={{
                  style: {
                    height: "36px",
                    minHeight: "36px",
                    maxWidth: "120px", 
                    fontSize: "12px",
                    padding: "0 12px"
                  }
                }}
              />
            </div>
            
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              aria-label="Toggle mobile menu"
            >
              <div className="flex flex-col space-y-1">
                <span 
                  className={clsx(
                    "block w-4 h-0.5 bg-gray-300 transition-all duration-300",
                    isMobileMenuOpen && "rotate-45 translate-y-1.5"
                  )}
                ></span>
                <span 
                  className={clsx(
                    "block w-4 h-0.5 bg-gray-300 transition-all duration-300",
                    isMobileMenuOpen && "opacity-0"
                  )}
                ></span>
                <span 
                  className={clsx(
                    "block w-4 h-0.5 bg-gray-300 transition-all duration-300",
                    isMobileMenuOpen && "-rotate-45 -translate-y-1.5"
                  )}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black backdrop-blur-md border-t border-gray-800/30 shadow-xl z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="space-y-3">
                <Link
                  href="/deploy-token"
                  onClick={closeMobileMenu}
                  className={clsx(
                    "block px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium",
                    pathname === "/deploy-token" 
                      ? "text-orange-500 bg-orange-500/10 border-l-2 border-orange-500" 
                      : "text-gray-300 hover:text-orange-500 hover:bg-orange-500/5"
                  )}
                >
                  Deploy Token
                </Link>
                <Link
                  href="/my-tokens"
                  onClick={closeMobileMenu}
                  className={clsx(
                    "block px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium",
                    pathname === "/my-tokens" 
                      ? "text-orange-500 bg-orange-500/10 border-l-2 border-orange-500" 
                      : "text-gray-300 hover:text-orange-500 hover:bg-orange-500/5"
                  )}
                >
                  My Tokens
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
