import { Poppins } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  preload: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEO OPTIMIZED TITLE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
