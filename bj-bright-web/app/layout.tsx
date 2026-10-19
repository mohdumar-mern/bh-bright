import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BJ Bright Enterprises | Recruitment Solutions",
    template: "%s | BJ Bright Enterprises",
  },
  description:
    "Discover recruitment solutions, connect with employers, and explore career opportunities with BJ Bright Enterprises.",
  applicationName: "BJ Bright Enterprises",
  openGraph: {
    type: "website",
    siteName: "BJ Bright Enterprises",
    title: "BJ Bright Enterprises | Recruitment Solutions",
    description:
      "Connecting businesses with talent and professionals with opportunities.",
    url: siteUrl,
  },
  robots:
    process.env.NODE_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101c2c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}