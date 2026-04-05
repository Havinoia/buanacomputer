import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Buana Computer | Premium Computer Repairs",
  description: "Platform pameran jasa service komputer dan laptop Buana Computer dengan layanan panggilan profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${manrope.variable} font-inter antialiased bg-slate-950 text-slate-200`}>
        {children}
      </body>
    </html>
  );
}
