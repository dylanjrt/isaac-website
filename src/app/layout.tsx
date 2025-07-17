import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

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
        <Footer />
      </body>
    </html>
  );
}
