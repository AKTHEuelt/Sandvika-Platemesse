import { ReactNode } from "react";
import { Bebas_Neue } from "next/font/google";
import StyledComponentsRegistry from "../registry";
import "./globals.css"; // Ensure global styles are imported

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

interface RootLayoutProps {
  children: ReactNode;
}

// Updated Metadata specifically for the Sandvika Platemesse event
export const metadata = {
  title: "Sandvika Platemesse - 31. August 2025",
  description:
    "Velkommen til Sandvika Platemesse 31. august! En hel dag dedikert til vinyl, musikk og kultur på Kadettangen 18, arrangert av Høl i CV'en. Se kule artister, finn sjeldne plater, og nyt god stemning. Gratis bord for selgere!",
  keywords:
    "Sandvika Platemesse, platemesse Bærum, vinylmesse, salg av vinyl, LP-plater, musikkarrangement, 31. august 2025, Kadettangen 18, Høl i CV'en, live musikk, DJ, platesamlere, retro, kultur Sandvika, hva skjer i Bærum",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Changed language to Norwegian for better accessibility and SEO
    <html lang="no">
      <head>
        {/* These two meta tags are standard and should remain */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* The manual <meta name="title">, <meta name="description">, and <meta name="keywords">
          have been removed because the `metadata` object above handles this automatically.
          This prevents duplicate tags in your final HTML.
        */}

        {/* Google Analytics Script with your specific tracking ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3423EF1KKM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3423EF1KKM');
            `,
          }}
        />
      </head>
      <body className={`${bebas.className} antialiased`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}