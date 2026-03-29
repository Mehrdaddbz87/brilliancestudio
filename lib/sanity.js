import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { getFallbackCmsPage } from "@/lib/cms";
import { getDatabaseCmsPage } from "@/lib/prisma-cms";

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2023-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

const hasSanityConfig = Boolean(projectId && dataset);

const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

const pageQueries = {
  services: `*[_type == "servicesPage"][0]{
    eyebrow,
    title,
    description,
    seoTitle,
    seoDescription,
    "primaryAction": {
      "label": primaryCtaLabel,
      "href": primaryCtaHref
    },
    "secondaryAction": {
      "label": secondaryCtaLabel,
      "href": secondaryCtaHref
    },
    items[]{
      eyebrow,
      title,
      description,
      image{
        asset->{
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt
      }
    },
    sections[]{
      ...,
      _type == "gallerySection" => {
        ...,
        items[]{
          ...,
          image{
            asset->{
              _id,
              url,
              metadata {
                lqip
              }
            },
            alt
          }
        }
      }
    }
  }`,
  references: `*[_type == "referencesPage"][0]{
    eyebrow,
    title,
    description,
    seoTitle,
    seoDescription,
    "primaryAction": {
      "label": primaryCtaLabel,
      "href": primaryCtaHref
    },
    "secondaryAction": {
      "label": secondaryCtaLabel,
      "href": secondaryCtaHref
    },
    items[]{
      category,
      title,
      summary,
      image{
        asset->{
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt
      }
    },
    sections[]{
      ...,
      _type == "gallerySection" => {
        ...,
        items[]{
          ...,
          image{
            asset->{
              _id,
              url,
              metadata {
                lqip
              }
            },
            alt
          }
        }
      }
    }
  }`,
  terms: `*[_type == "termsPage"][0]{
    eyebrow,
    title,
    description,
    seoTitle,
    seoDescription,
    sections[]{
      _key,
      eyebrow,
      heading,
      body,
      listItems,
      contactItems[]{
        label,
        value,
        href
      },
      note
    }
  }`,
  impressum: `*[_type == "impressumPage"][0]{
    eyebrow,
    title,
    description,
    seoTitle,
    seoDescription,
    sections[]{
      _key,
      eyebrow,
      heading,
      body,
      listItems,
      contactItems[]{
        label,
        value,
        href
      },
      note
    }
  }`,
};

/**
 * Normalizes Sanity image references into the image shape expected by the frontend.
 */
function buildImage(image, width = 1600) {
  if (!image) {
    return null;
  }

  if (image.url) {
    return {
      url: image.url,
      alt: image.alt || "",
      blurDataURL: image.blurDataURL || null,
    };
  }

  const asset = image.asset;

  if (!asset?.url) {
    return null;
  }

  const url = builder
    ? builder.image(image).width(width).fit("crop").auto("format").url()
    : asset.url;

  return {
    url,
    alt: image.alt || "",
    blurDataURL: asset.metadata?.lqip || null,
  };
}

/**
 * Merges Sanity content with local fallbacks so pages stay renderable when fields are missing.
 */
function normalizePage(page, fallbackSlug) {
  const fallback = getFallbackCmsPage(fallbackSlug);

  if (!page) {
    return {
      ...fallback,
      source: "fallback",
    };
  }

  return {
    eyebrow: page.eyebrow || fallback.eyebrow,
    title: page.title || fallback.title,
    description: page.description || fallback.description,
    seoTitle: page.seoTitle || fallback.seoTitle,
    seoDescription: page.seoDescription || fallback.seoDescription,
    primaryAction: page.primaryAction?.label
      ? page.primaryAction
      : fallback.primaryAction,
    secondaryAction: page.secondaryAction?.label
      ? page.secondaryAction
      : fallback.secondaryAction,
    items:
      page.items?.map((item) => ({
        ...item,
        image: buildImage(item.image) || item.image || null,
      })) || fallback.items,
    sections:
      page.sections?.map((section) => ({
        ...section,
        items: Array.isArray(section.items)
          ? section.items.map((item) => ({
              ...item,
              image: buildImage(item.image) || item.image || null,
            }))
          : section.items,
      })) || fallback.sections,
    source: "sanity",
  };
}

/**
 * Loads page content from Sanity first, then Prisma, and finally the static fallback dataset.
 */
export async function getPageContent(slug) {
  if (!hasSanityConfig || !client) {
    const databaseContent = await getDatabaseCmsPage(slug);

    if (databaseContent) {
      return databaseContent;
    }

    return {
      ...getFallbackCmsPage(slug),
      source: "fallback",
    };
  }

  try {
    const page = await client.fetch(pageQueries[slug]);
    return normalizePage(page, slug);
  } catch (error) {
    console.error(`Failed to fetch Sanity content for ${slug}:`, error);

    const databaseContent = await getDatabaseCmsPage(slug);

    if (databaseContent) {
      return databaseContent;
    }

    return {
      ...getFallbackCmsPage(slug),
      source: "fallback",
    };
  }
}

/**
 * Reports whether the Sanity client has enough configuration to be used at runtime.
 */
export function isSanityConfigured() {
  return hasSanityConfig;
}
