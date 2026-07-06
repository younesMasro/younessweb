/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://younessweb.me",
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  alternateRefs: [
    {
      href: (process.env.SITE_URL || "https://younessweb.me") + "/fr",
      hreflang: "fr",
    },
    {
      href: (process.env.SITE_URL || "https://younessweb.me") + "/ar",
      hreflang: "ar",
    },
    {
      href: process.env.SITE_URL || "https://younessweb.me",
      hreflang: "en",
    },
  ],
};
