import Head from "next/head";
import { useRouter } from "next/router";

const DEFAULT_TITLE = "Brilliance Studio | Premium Home Renovation & Design in Canada";
const DEFAULT_DESCRIPTION =
  "Brilliance Studio is a premium renovation and design studio in Canada specializing in custom homes, kitchen remodeling, bathroom renovations, home additions, basement finishing, and structural transformations. Refined craftsmanship. Precise execution.";
const DEFAULT_KEYWORDS =
  "home renovation Canada, custom home design build, kitchen remodeling Canada, bathroom renovation, home additions, basement finishing, interior design Canada, luxury renovation, Brilliance Studio";
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
  const homeUrl = normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || "https://brilliancestudio.ca",
  );
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Brilliance Studio",
    url: homeUrl,
    image: imageUrl,
    description: DEFAULT_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    knowsAbout: [
      "Home Renovation",
      "Custom Home Design",
      "Kitchen Remodeling",
      "Bathroom Renovation",
      "Home Additions",
      "Basement Finishing",
      "Interior Design",
      "Structural Modifications",
    ],
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
