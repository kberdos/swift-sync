import { AuthProvider } from "@/contexts/authContext";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body>{children}</body>
        </html >
    );
}
