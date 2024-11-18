import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Is Ovechkin There Yet?",
  description:
    "How close is the Capitals captain to breaking Wayne Gretzky's record?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" />
      <body>{children}</body>
    </html>
  );
}
