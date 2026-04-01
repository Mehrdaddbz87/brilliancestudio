import type { Metadata } from "next";
import { Cinzel_Decorative, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/header";
import "@/styles/globals.css";

const classic = Cormorant_Garamond({
  variable: "--font-classic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fantasy = Cinzel_Decorative({
  variable: "--font-fantasy",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Brilliance Studio",
  description: "Modern Next.js starter for Brilliance Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${classic.variable} ${fantasy.variable}`}>
      <body className="bg-background font-classic text-text antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
