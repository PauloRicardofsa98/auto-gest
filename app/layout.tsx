import "./globals.css";

import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Toaster } from "@/app/_components/ui/sonner";

export const metadata: Metadata = {
  title: "Formotech by Kafcode",
  description: "Plataforma de gerenciamento de estéticas automotivas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <ClerkProvider localization={ptBR}>
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
