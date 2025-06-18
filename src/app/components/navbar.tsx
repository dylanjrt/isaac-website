// isaac-website/src/app/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collaborations", label: "Collaborations" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ arizoniaClass }: { arizoniaClass: string }) {
  const pathname = usePathname();

  return (
    <nav className="bg-background text-primary h-full p-8">
      <div className="flex items-center justify-between">
        <div
          className={`font-arizonia flex items-center pr-12 text-4xl whitespace-nowrap ${arizoniaClass}`}
        >
          <Link href="/">ISAAC TEA</Link>
        </div>
        <div className="flex items-center justify-end gap-16 text-lg font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-accent ${pathname === link.href ? "text-accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
