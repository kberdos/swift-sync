import type { Metadata } from "next";
import { Inter, Fira_Sans, Anek_Odia } from "next/font/google";
import "./globals.css";

export const inter = Inter({ subsets: ["latin"] });

export const fira_sans = Fira_Sans({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Swift Sync",
  description: "Created for Hack@Brown 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fira_sans.className}>{children}</body>
    </html>
  );
}
