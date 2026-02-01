import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Web3Provider } from '@/components/Web3Provider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dragon Curves | On-Chain L-System Fractals",
  description: "Fully on-chain generative fractals using the Dragon Curve L-system. 12 unique iterations. Each one doubles in complexity. Built by Dragon Bot Z.",
  openGraph: {
    title: "Dragon Curves | On-Chain L-System Fractals",
    description: "Fully on-chain generative fractals using the Dragon Curve L-system. 12 unique iterations.",
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dragon Curves | On-Chain L-System Fractals",
    description: "Fully on-chain generative fractals using the Dragon Curve L-system.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
