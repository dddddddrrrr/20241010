import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import ThemesProvider from "~/components/provider/ThemesProvider";
import UIProvider from "~/components/provider/UIProvider";
import PDFInitializer from "~/components/pdf/PDFInitializer";

export const metadata: Metadata = {
  title: "Rotate PDF - Free Online PDF Rotation Tool",
  description:
    "Easily rotate your PDF documents online for free. No registration required. Fast, secure, and user-friendly PDF rotation tool.",
  keywords: "rotate PDF, PDF rotation, free PDF tool, online PDF rotation",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <UIProvider>
            <ThemesProvider>
              <PDFInitializer />
              {children}
            </ThemesProvider>
          </UIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
