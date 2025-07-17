// isaac-website/src/app/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Arizonia } from "next/font/google";

const arizonia = Arizonia({
  variable: "--font-arizonia",
  subsets: ["latin"],
  weight: "400",
});

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collaborations", label: "Collaborations" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-background text-primary p-4 sm:p-6 md:p-8 lg:px-24">
      <div className="flex flex-col gap-4 sm:h-24 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        {/* Mobile Logo - centered above nav links */}
        <div
          className={`flex items-center justify-center text-2xl whitespace-nowrap sm:hidden ${arizonia.className}`}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ISAAC TEA"
              width={300}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Logo - left aligned */}
        <div
          className={`hidden items-center text-2xl whitespace-nowrap sm:flex sm:justify-start sm:pr-12 sm:text-3xl lg:text-4xl ${arizonia.className}`}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ISAAC TEA"
              width={300}
              height={40}
              className="h-8 w-auto sm:h-10 lg:h-full"
            />
          </Link>
        </div>

        <div className="flex flex-row items-center justify-center gap-6 text-base font-bold sm:justify-end sm:gap-16 sm:text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-secondary transition-colors duration-200 ${pathname === link.href ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
