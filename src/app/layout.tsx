import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vocational Practice Management — Software for voc firm owners",
  description:
    "Run updates, requests, L&I guidance, payroll, and HR in one platform built for Washington vocational rehabilitation firms. Request a demo.",
  openGraph: {
    title: "Vocational Practice Management",
    description:
      "The operating platform for vocational rehab firm owners and managers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${sourceSans.variable} antialiased font-sans text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
