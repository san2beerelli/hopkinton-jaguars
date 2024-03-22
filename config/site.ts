export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Hopkinton Jaguars",
  description: "Hopkinton Jaguars team website",
  navItems: [
    {
      label: "Players",
      href: "/players",
    },
    {
      label: "Fantasy Score",
      href: "/fantasy",
    },
    {
      label: "Photos",
      href: "/photos",
    },
    {
      label: "Videos",
      href: "/videos",
    },
  ],
};
