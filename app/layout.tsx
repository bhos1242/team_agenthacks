import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sevasamarpan.org"),
  title: {
    default: "Seva Samarpan | NGO in Pune",
    template: "%s | Seva Samarpan",
  },
  description: "Seva Samarpan is a leading NGO in Pune dedicated to empowering students through free libraries and providing dignified care for elders in our old age home.",
  keywords: ["NGO in Pune", "best NGO near me", "free library Pune", "old age home Pune", "charity for students Pune", "Seva Samarpan NGO", "Pune social work", "NGO for elderly Pune"],
  authors: [{ name: "Seva Samarpan" }],
  creator: "Seva Samarpan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Seva Samarpan | NGO in Pune",
    description: "Empowering lives through education and care in Pune.",
    siteName: "Seva Samarpan",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Seva Samarpan")}&description=${encodeURIComponent("Empowering lives through education and care in Pune.")}`,
        width: 1200,
        height: 630,
        alt: "Seva Samarpan NGO"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Seva Samarpan | NGO in Pune",
    description: "Empowering lives through education and care in Pune.",
    images: [`/api/og?title=${encodeURIComponent("Seva Samarpan")}&description=${encodeURIComponent("Empowering lives through education and care in Pune.")}`],
  },
  verification: {
    google: "BwI_9JRy2KhlYRbLuy3laTHKkfMfq_bSRsFlNv0WDSo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "@id": "https://sevasamarpan.org/#organization",
              "name": "Seva Samarpan",
              "url": "https://sevasamarpan.org",
              "logo": "https://sevasamarpan.org/logo/logo_high.png",
              "description": "Seva Samarpan is a leading NGO in Pune, Maharashtra, providing a free library and study room for students and a compassionate old age home for elders.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pune district",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9422262499",
                "contactType": "General inquiries",
                "email": "sevasamarpanngo@gmail.com"
              },
              "sameAs": [
                "https://www.facebook.com/sevasamarpan",
                "https://www.instagram.com/sevasamarpan"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://sevasamarpan.org/#website",
              "url": "https://sevasamarpan.org",
              "name": "Seva Samarpan",
              "publisher": { "@id": "https://sevasamarpan.org/#organization" }
            })
          }}
        />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >

            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
