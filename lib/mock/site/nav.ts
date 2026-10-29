// Sitemap for the main website. Labels are i18n keys under site.nav.

export type NavItem = { href: string; key: string };
export type NavSection = NavItem & { children?: NavItem[] };

export const primaryNav: NavSection[] = [
  { href: "/products/", key: "products" },
  {
    href: "/investor-relations/",
    key: "investors",
    children: [
      { href: "/investor-relations/", key: "irOverview" },
      { href: "/investor-relations/financial-reports/", key: "irReports" },
      { href: "/investor-relations/disclosures/", key: "irDisclosures" },
      { href: "/investor-relations/governance/", key: "irGovernance" },
      { href: "/investor-relations/share-information/", key: "irShare" },
      { href: "/investor-relations/contact/", key: "irContact" },
    ],
  },
  {
    href: "/about/",
    key: "about",
    children: [
      { href: "/about/", key: "aboutCompany" },
      { href: "/about/leadership/", key: "aboutLeadership" },
      { href: "/about/history/", key: "aboutHistory" },
    ],
  },
  {
    href: "/partners/",
    key: "partners",
    children: [
      { href: "/partners/", key: "partnersOverview" },
      { href: "/partners/distribution/", key: "partnersDistribution" },
      { href: "/partners/bancassurance/", key: "partnersBank" },
      { href: "/partners/corporate/", key: "partnersCorporate" },
      { href: "/partners/become-a-partner/", key: "partnersJoin" },
    ],
  },
];

export const irNav = primaryNav[1].children!;
export const aboutNav = primaryNav[2].children!;
export const partnersNav = primaryNav[3].children!;
