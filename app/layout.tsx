import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientRoot } from "../components/layouts/RootLayout";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prism Mindmap",
  description: "From scratch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientRoot>{children}</ClientRoot>
        </Providers>
      </body>
    </html>
  );
}
