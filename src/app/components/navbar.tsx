// isaac-website/src/app/Navbar.tsx
"use client";

import Link from "next/link";
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
    <nav className="bg-background text-primary h-full p-8 px-24">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center pr-12 text-4xl whitespace-nowrap ${arizonia.className}`}
        >
          <Link href="/">ISAAC TEA</Link>
        </div>
        <div className="flex items-center justify-end gap-16 text-lg font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={` ${pathname === link.href ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
