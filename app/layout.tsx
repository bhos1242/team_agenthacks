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
  description: "Empowering lives through education and care in Pune. We provide free study rooms, education sponsorships, and run a dignified old age home.",
  keywords: ["NGO", "NGO near me", "best NGO near me", "Pune", "Pune", "Education", "Old Age Home", "Charity", "Social Work", "Seva Samarpan"],
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
              "logo": "https://sevasamarpan.org/logo.png",
              "description": "Seva Samarpan is a dedicated NGO in Pune, empowering lives through education and holistic elderly care.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "General Support"
              }
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
