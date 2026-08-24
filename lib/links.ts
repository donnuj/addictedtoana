export type Platform =
  | "onlyfans"
  | "fansly"
  | "instagram"
  | "tiktok"
  | "twitter"
  | "pinterest"
  | "reddit"
  | "youtube"
  | "link";

export type LinkItem = {
  id: string;
  label: string;
  url: string;
  platform: Platform;
  featured?: boolean;
  handle?: string;
  profilePhoto?: string;
};

export const profileData = {
  name: "Ana Verse",
  handle: "@addictedtoana",
  tagline: "Your favorite distraction",
  bio: "Professional Cosplayer & Content Creator",
  location: "United States",
  since: "2012",
  avatarUrl: "/avatar.jpg",
  tags: ["Cosplayer", "Fitness", "Content"],
};

export const links: LinkItem[] = [
  {
    id: "of-vip",
    label: "OnlyFans VIP",
    url: "#",
    platform: "onlyfans",
    featured: true,
  },
  {
    id: "of-free",
    label: "OnlyFans Free",
    url: "#",
    platform: "onlyfans",
  },
  {
    id: "fansly",
    label: "Fansly",
    url: "#",
    platform: "fansly",
  },
  {
    id: "ig-main",
    label: "Instagram",
    url: "#",
    platform: "instagram",
    handle: "@addictedtoana",
    profilePhoto: "/profiles/ig-main.jpg",
  },
  {
    id: "ig-alt",
    label: "Instagram",
    url: "#",
    platform: "instagram",
    handle: "@thatcringyga!",
    profilePhoto: "/profiles/ig-alt.jpg",
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "#",
    platform: "tiktok",
    handle: "@addictedtoana",
    profilePhoto: "/profiles/tiktok.jpg",
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    url: "#",
    platform: "twitter",
    handle: "@addictedtoana",
    profilePhoto: "/profiles/twitter.jpg",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    url: "#",
    platform: "pinterest",
    handle: "addictedtoana",
    profilePhoto: "/profiles/pinterest.jpg",
  },
  {
    id: "reddit",
    label: "Reddit",
    url: "#",
    platform: "reddit",
    handle: "u/addictedtoana",
    profilePhoto: "/profiles/reddit.jpg",
  },
  {
    id: "youtube",
    label: "YouTube",
    url: "#",
    platform: "youtube",
    handle: "@addictedtoana",
    profilePhoto: "/profiles/youtube.jpg",
  },
];

export const carouselSlides = [
  "https://picsum.photos/seed/cosplay-ana-1/800/600",
  "https://picsum.photos/seed/cosplay-ana-2/800/600",
  "https://picsum.photos/seed/cosplay-ana-3/800/600",
  "https://picsum.photos/seed/cosplay-ana-4/800/600",
  "https://picsum.photos/seed/cosplay-ana-5/800/600",
];
