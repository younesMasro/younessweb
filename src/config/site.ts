const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const siteConfig = {
  name: "Youness Web",
  url: "https://younessweb.me",
  description: {
    en: "Youness Web creates premium, modern, conversion-focused websites for businesses, brands, stores, and entrepreneurs.",
    fr: "Youness Web conçoit des sites web premium, modernes et orientés conversion pour les entreprises, marques, boutiques et entrepreneurs.",
    ar: "يونس ويب يصمم مواقع إلكترونية احترافية وعصرية تركز على التحويل للشركات والعلامات التجارية والمتاجر ورواد الأعمال.",
  },
  email: "younes.masroure@gmail.com",
  phone: whatsappNumber ? `+${whatsappNumber}` : "",
  whatsapp: whatsappNumber ? `https://wa.me/${whatsappNumber}` : "",
  instagram: "https://www.instagram.com/youness_web",
  instagramHandle: "@youness_web",
  logo: {
    icon: "/images/logo/LogoIcon.png",
    black: "/images/logo/Name Black logo.png",
    white: "/images/logo/Name white LOGO.png",
  },
} as const;
