import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteCopy } from "@/content/copy";
import { JsonLdSchema } from "@/components/json-ld";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StickyCallBar } from "@/components/sections/sticky-call-bar";

export const viewport: Viewport = {
  themeColor: "#0E4D4C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: siteCopy.meta.title,
  description: siteCopy.meta.description,
  metadataBase: new URL(siteCopy.meta.canonicalUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: siteCopy.meta.canonicalUrl,
    title: siteCopy.meta.title,
    description: siteCopy.meta.description,
    siteName: siteCopy.meta.siteName,
    locale: siteCopy.meta.locale,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteCopy.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteCopy.meta.title,
    description: siteCopy.meta.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload and load Fraunces 300, 400, 600 and Inter 400, 500, 600, 700 with display=swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLdSchema />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#FBF7F0] text-[#201D18]">
        {/* Skip to Content for WCAG 2.2 keyboard navigation */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* 1 Header */}
        <Header />

        {/* Semantic Main */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* 12 Footer */}
        <Footer />

        {/* Mobile Sticky Bar */}
        <StickyCallBar />
      </body>
    </html>
  );
}
