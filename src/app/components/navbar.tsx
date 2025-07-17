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
    <nav className="bg-background text-primary h-24 p-8 px-24">
      <div className="flex h-full items-center justify-between">
        <div
          className={`flex items-center pr-12 text-4xl whitespace-nowrap ${arizonia.className}`}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ISAAC TEA"
              width={300}
              height={40}
              className="h-full w-auto"
            />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-16 text-lg font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-secondary ${pathname === link.href ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
