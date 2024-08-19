import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashQ",
  description: "Automated AI Flashcard Generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} style={{ backgroundColor: "black", color: "white" }}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
