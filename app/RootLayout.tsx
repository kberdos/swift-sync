import { AuthProvider } from "@/contexts/authContext";
import { fira_sans } from "./layout";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <AuthProvider>
                <AuthShell>
                    <body className={fira_sans.className}>{children}</body>
                </AuthShell>
            </AuthProvider>
        </html>
    );
}
