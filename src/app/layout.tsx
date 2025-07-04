import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const georama = Georama({
  variable: "--font-georama",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Isaac Tea",
  description: "Producer and beat maker based in Toronto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${georama.className} text-primary flex min-h-screen flex-col antialiased`}
      >
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="bg-background mt-auto flex w-full items-center justify-end pr-24 pb-8 text-lg">
          <span>
            site by:{" "}
            <a
              href="https://dylanrt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Dylan RT
            </a>
          </span>
        </footer>
      </body>
    </html>
  );
}
