import { siteAuthor, siteDescription, siteTitle, siteUrl } from './site';

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    description: siteDescription,
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: siteAuthor,
    },
  };
}

export function buildArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  keywords = [],
}: {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified ?? datePublished).toISOString(),
    author: {
      '@type': 'Person',
      name: siteAuthor,
    },
    publisher: {
      '@type': 'Person',
      name: siteAuthor,
    },
    keywords,
    isPartOf: {
      '@type': 'WebSite',
      name: siteTitle,
      url: siteUrl,
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
