import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Le Val-d’Oise à la loupe",
  description: "Explorez les données des 183 communes du Val-d’Oise.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
