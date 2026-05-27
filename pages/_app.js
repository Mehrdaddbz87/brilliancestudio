import { Cormorant_Garamond, Inter, Raleway } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { AdminSessionGuard } from "@/components/admin/session-guard";
import { BackToTop } from "@/components/back-to-top";
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

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps, router }) {
  const isAdminRoute =
    router.pathname.startsWith("/admin") || router.pathname === "/login" || router.pathname === "/forgot-password" || router.pathname === "/reset-password";

  return (
    <div className={`dark ${classic.variable} ${fantasy.variable} ${raleway.variable}`}>
      <div className="min-h-screen bg-background font-classic text-text antialiased">
        <SEO />
        {isAdminRoute ? null : <Analytics />}
        {isAdminRoute ? null : <Header />}
        <Component {...pageProps} />
        {isAdminRoute ? null : <Footer />}
        {isAdminRoute ? null : <CookieConsentBanner />}
        {isAdminRoute ? null : <ScrollIndicator />}
        {isAdminRoute ? null : <BackToTop />}
        {isAdminRoute ? <AdminSessionGuard /> : null}
      </div>
    </div>
  );
}
