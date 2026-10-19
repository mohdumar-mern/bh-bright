import { NextResponse } from "next/server";


export default function robots() {
    const production = process.env.NODE_ENV === "production";
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";
  
    return {
      rules: {
        userAgent: "*",
        allow: production ? "/" : [],
      },
      ...(production && {
        sitemap: `${siteUrl}/sitemap.xml`,
      }),
    };
  }