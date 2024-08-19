/* import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

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
 */

import { Inter } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';

// Import the Inter font with the desired settings
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Define the metadata for the document
export const metadata = {
  title: 'FlashQ',
  description: 'Automated AI Flashcard Generator',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Metadata such as title and description */}
          <meta name="description" content={metadata.description} />
          <title>{metadata.title}</title>
        </head>
        <body className={inter.className} style={{ backgroundColor: 'black', color: 'white' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
