export default function sitemap() {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";
  
    // Only include public pages that currently exist.
    return [
      {
        url: siteUrl,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${siteUrl}/hire-talent`,
        changeFrequency: "monthly",
        priority: 0.7,
      },
    ];
  }