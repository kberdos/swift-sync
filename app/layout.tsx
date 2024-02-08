import type { Metadata } from "next";
import { Inter, Fira_Sans, Anek_Odia } from "next/font/google";
import { AuthProvider } from "@/contexts/authContext";
import "./globals.css";
import AuthShell from "@/components/authShell";

const fira_sans = Fira_Sans({
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
      <body className={fira_sans.className}>
        <AuthProvider>
          <AuthShell>
            {children}
          </AuthShell>
        </AuthProvider>
      </body>
    </html>
  );
}
