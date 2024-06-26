export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Hopkinton Jaguars",
  description: "Hopkinton Jaguars team website",
  navItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Players",
      href: "/players",
    },
    {
      label: "Games",
      href: "/games",
    },
    {
      label: "Schedule",
      href: "/schedule",
    },
    {
      label: "Practice",
      href: "/practice",
    },
    {
      label: "Ground",
      href: "/ground",
    },
    /* {
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
    }, */
  ],
};
