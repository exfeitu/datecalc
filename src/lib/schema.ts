/**
 * src/lib/schema.ts
 * Generate Schema.org JSON-LD for each page type.
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** BreadcrumbList — used on every page */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** WebApplication — used on homepage and hub pages */
export function webAppSchema(args: { name: string; url: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: args.name,
    url: args.url,
    description: args.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

/** WebPage + FAQPage — used on programmatic result pages */
export function resultPageSchema(args: {
  title: string;
  description: string;
  url: string;
  faqs: FaqItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: args.title,
    description: args.description,
    url: args.url,
    mainEntity: args.faqs.length
      ? {
          '@type': 'FAQPage',
          mainEntity: args.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : undefined,
  };
}

/** Standalone FAQPage — used on hub/index pages that render an FAQ block */
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/** Organization — used on homepage and about page */
export function organizationSchema(args: { name: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: args.name,
    url: args.url,
  };
}
