export type FeaturedProject = {
  id: string;
  index: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  metric: string;
  services: string[];
  href: string;
  videoSrc?: string;
  imageSrc?: string;
  /** cover = cinematic still; contain = logos / brand lockups */
  imageFit?: "cover" | "contain";
  gradient: string;
};

export const FEATURED_CLIENTS = [
  "JD Nova Corp",
  "Chitale Bandhu",
  "Boldfit",
  "Rapido",
  "Scapia",
  "SKYi Developers",
  "SuperYou",
  "Go Zero",
  "Vilas Javdekar",
  "Chitale Bandhu",
  "JD Nova Corp",
  "Boldfit",
] as const;

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "jd-nova",
    index: "01",
    title: "JD Nova Corp",
    category: "Real Estate",
    headline: "Luxury properties deserve more than generic ads.",
    description:
      "Complete brand identity and lead generation for premium real estate — built to convert intent, not just impressions.",
    metric: "300% increase in qualified leads",
    services: ["Brand Identity", "Property Films", "Performance Marketing"],
    href: "/work/jd-nova",
    imageSrc: "/portfolio/thumbs/jd-nova.webp",
    gradient:
      "radial-gradient(ellipse 80% 70% at 30% 40%, rgba(72, 108, 160, 0.45) 0%, transparent 55%), linear-gradient(145deg, #141c28 0%, #0a0e14 48%, #12100e 100%)",
  },
  {
    id: "chitale",
    index: "02",
    title: "Chitale Bandhu",
    category: "FMCG",
    headline: "Heritage brand. Modern feed.",
    description:
      "Social transformation for one of India's most loved FMCG names — content that respects legacy and still stops the scroll.",
    metric: "2.5M+ reach · 35% follower growth",
    services: ["Content Strategy", "Reels", "Community Management"],
    href: "/work/chitale",
    imageSrc: "/portfolio/thumbs/chitale.webp",
    imageFit: "contain",
    gradient:
      "radial-gradient(ellipse 75% 65% at 70% 35%, rgba(196, 132, 58, 0.4) 0%, transparent 55%), linear-gradient(145deg, #1f140c 0%, #120d08 50%, #0e0c0a 100%)",
  },
  {
    id: "boldfit",
    index: "03",
    title: "Boldfit",
    category: "D2C",
    headline: "Fitness culture, creator-powered.",
    description:
      "Influencer-led growth and UGC at scale for a fitness D2C brand competing in one of India's noisiest categories.",
    metric: "500+ creator partnerships · 8M+ impressions",
    services: ["Influencer Marketing", "UGC Content", "Performance Ads"],
    href: "/work/boldfit",
    videoSrc: "/portfolio/videos/bold-fit.mov",
    gradient:
      "radial-gradient(ellipse 70% 60% at 40% 50%, rgba(253, 103, 50, 0.42) 0%, transparent 55%), linear-gradient(145deg, #1a100c 0%, #0f0a08 50%, #0a0908 100%)",
  },
];
