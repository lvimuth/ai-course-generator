import localFont from "next/font/local";
import "./globals.css";
import { Open_Sans, Roboto } from "next/font/google";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <GoogleOneTap />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
