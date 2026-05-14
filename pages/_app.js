import { Cormorant_Garamond, Inter } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { SEO } from "@/components/seo";
import "@/styles/globals.css";

const classic = Cormorant_Garamond({
  variable: "--font-classic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fantasy = Inter({
  variable: "--font-fantasy",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps, router }) {
  const isAdminRoute = router.pathname.startsWith("/admin");

  return (
    <div className={`dark ${classic.variable} ${fantasy.variable}`}>
      <div className="min-h-screen bg-background font-classic text-text antialiased">
        <SEO />
        {isAdminRoute ? null : <Analytics />}
        {isAdminRoute ? null : <Header />}
        <Component {...pageProps} />
        {isAdminRoute ? null : <Footer />}
        {isAdminRoute ? null : <CookieConsentBanner />}
        {isAdminRoute ? null : <ScrollIndicator />}
      </div>
    </div>
  );
}
