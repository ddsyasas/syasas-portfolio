import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PersonStructuredData, { WebsiteStructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sajana Yasas - Physics Scholar | SEO Expert | Developer",
  description: "Personal portfolio of Sajana Yasas - Material Physics Researcher, SEO Expert at IDER Solutions, Full-stack Developer, and Indie Maker",
  keywords: ["Sajana Yasas", "Physics Researcher", "SEO Expert", "Full-stack Developer", "Material Physics", "IDER Solutions", "Portfolio"],
  authors: [{ name: "Sajana Yasas" }],
  creator: "Sajana Yasas",
  openGraph: {
    title: "Sajana Yasas - Physics Scholar | SEO Expert | Developer",
    description: "Personal portfolio of Sajana Yasas - Material Physics Researcher, SEO Expert at IDER Solutions, Full-stack Developer, and Indie Maker",
    type: "website",
    images: [
      {
        url: "/Sajana-yasas-me.png",
        width: 1200,
        height: 630,
        alt: "Sajana Yasas - Physics Scholar | SEO Expert | Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajana Yasas - Physics Scholar | SEO Expert | Developer",
    description: "Personal portfolio of Sajana Yasas - Material Physics Researcher, SEO Expert at IDER Solutions, Full-stack Developer, and Indie Maker",
    images: ["/Sajana-yasas-me.png"],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://yasas.dev/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (!theme) {
                    var hour = new Date().getHours();
                    if (hour < 6 || hour >= 18) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <PersonStructuredData
          name="Sajana Yasas"
          jobTitle="Material Physics Researcher | SEO Expert | Full-stack Developer"
          description="Personal portfolio of Sajana Yasas - Material Physics Researcher, SEO Expert at IDER Solutions, Full-stack Developer, and Indie Maker"
          image="https://yasas.dev/Sajana-yasas-me.png"
          url="https://yasas.dev"
          sameAs={[
            "https://linkedin.com/in/sajana-yasas",
            "https://github.com/sajana-yasas",
            "https://twitter.com/sajana_yasas"
          ]}
        />
        <WebsiteStructuredData
          name="Sajana Yasas - Portfolio"
          description="Personal portfolio of Sajana Yasas - Material Physics Researcher, SEO Expert at IDER Solutions, Full-stack Developer, and Indie Maker"
          url="https://yasas.dev"
        />
        {children}
      </body>
    </html>
  );
}
