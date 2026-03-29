import Head from "next/head";
import { useRouter } from "next/router";

const DEFAULT_TITLE = "Brilliance Studio | Home Design Renovation Canada";
const DEFAULT_DESCRIPTION =
  "Brilliance Studio creates elevated home design and renovation experiences across Canada with a refined, premium visual approach.";
const DEFAULT_KEYWORDS =
  "Home Design Renovation, Canada, Brilliance Studio, luxury home design, premium renovation";
const DEFAULT_IMAGE_PATH = "/images/og-cover.svg";

/**
 * Removes a trailing slash so canonical URL generation stays consistent.
 */
function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

/**
 * Builds the canonical URL for the current route without query parameters or hashes.
 */
function buildCanonicalUrl(siteUrl: string, asPath: string) {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  const cleanPath = (asPath || "/").split("?")[0].split("#")[0];

  return cleanPath === "/"
    ? normalizedSiteUrl
    : `${normalizedSiteUrl}${cleanPath}`;
}

/**
 * Injects the site's default SEO metadata and LocalBusiness structured data.
 */
export function SEO() {
  const router = useRouter();
  const siteUrl = normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || "https://brilliancestudio.ca",
  );
  const canonicalUrl = buildCanonicalUrl(siteUrl, router.asPath);
  const imageUrl = `${siteUrl}${DEFAULT_IMAGE_PATH}`;
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Brilliance Studio",
    url: canonicalUrl,
    image: imageUrl,
    description: DEFAULT_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    keywords: ["Home Design Renovation", "Canada"],
  };

  return (
    <Head>
      <title>{DEFAULT_TITLE}</title>
      <meta name="description" content={DEFAULT_DESCRIPTION} />
      <meta name="keywords" content={DEFAULT_KEYWORDS} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:site_name" content="Brilliance Studio" key="og:site_name" />
      <meta property="og:locale" content="en_CA" key="og:locale" />
      <meta property="og:title" content={DEFAULT_TITLE} key="og:title" />
      <meta
        property="og:description"
        content={DEFAULT_DESCRIPTION}
        key="og:description"
      />
      <meta property="og:url" content={canonicalUrl} key="og:url" />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta
        property="og:image:alt"
        content="Brilliance Studio social preview"
        key="og:image:alt"
      />

      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={DEFAULT_TITLE} key="twitter:title" />
      <meta
        name="twitter:description"
        content={DEFAULT_DESCRIPTION}
        key="twitter:description"
      />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />

      <script
        key="localbusiness-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
    </Head>
  );
}
