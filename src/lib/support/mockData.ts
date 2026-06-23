export interface SupportApp {
  id: string;
  name: string;
  description: string;
  category: string;
  badge: string;
  rating: number;
  reviews: number;
  logo: string;
  link: string;
}

export interface SupportBook {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  recommendedBy: string;
  cover: string;
  link: string;
}

export interface SupportPodcast {
  id: string;
  title: string;
  description: string;
  topic: string;
  logo: string;
  link: string;
}

export interface SupportOrganisation {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  description: string;
  keyFeatures: string[];
  link: string;
}

export const MOCK_APPS: SupportApp[] = [
  {
    id: "app1",
    name: "Headspace for Responders",
    description:
      "Guided meditation and mindfulness specifically tailored for the high-stress environment of first responders.",
    category: "Mental Health",
    badge: "Most Popular",
    rating: 4.8,
    reviews: 1240,
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop",
    link: "https://www.headspace.com",
  },
  {
    id: "app2",
    name: "Pocket Sergeant",
    description:
      "The essential app created by police, for police. Includes wellbeing resources alongside operational guidance.",
    category: "Wellbeing & Operational",
    badge: "Official Supporter",
    rating: 4.9,
    reviews: 50000,
    logo: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=400&auto=format&fit=crop",
    link: "https://pocketsergeant.co.uk",
  },
  {
    id: "app3",
    name: "Calm",
    description:
      "Helps you manage stress, sleep better, and live a happier, healthier life with guided meditations and sleep stories.",
    category: "Sleep & Anxiety",
    badge: "Staff Pick",
    rating: 4.7,
    reviews: 3200,
    logo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
    link: "https://www.calm.com",
  },
];

export const MOCK_BOOKS: SupportBook[] = [
  {
    id: "book1",
    title: "Emotional Survival for Law Enforcement",
    author: "Dr. Kevin M. Gilmartin",
    description:
      "The definitive guide on the psychological toll of police work and how to protect your personal life and mental health.",
    category: "Psychology",
    recommendedBy: "Police Federation Wellbeing Lead",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com/dp/0971725403",
  },
  {
    id: "book2",
    title: "Trauma Stewardship",
    author: "Laura van Dernoot Lipsky",
    description:
      "An everyday guide to caring for self while caring for others, perfect for front-line public service workers.",
    category: "Self-Care",
    recommendedBy: "Mental Health Specialists",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com",
  },
  {
    id: "book3",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    description:
      "Brain, mind, and body in the healing of trauma. A fundamental read for understanding PTSD.",
    category: "Medical & Trauma",
    recommendedBy: "IOPC Reform Coalition",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com",
  },
];

export const MOCK_PODCASTS: SupportPodcast[] = [
  {
    id: "pod1",
    title: "The Pocket Sergeant Podcast",
    description:
      "Real conversations with serving and retired officers about trauma, investigations, and finding a path forward.",
    topic: "Wellbeing & Law",
    logo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  },
  {
    id: "pod2",
    title: "Police Care UK Wellbeing Cast",
    description:
      "Advice, resources, and shared experiences from the national charity dedicated to police welfare.",
    topic: "Welfare Support",
    logo: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  },
  {
    id: "pod3",
    title: "First Responder Wellness",
    description:
      "Experts discuss mental health strategies tailored for the extreme stress of frontline emergency work.",
    topic: "Mental Health",
    logo: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  },
];

export const MOCK_ORGANISATIONS: SupportOrganisation[] = [
  {
    id: "pfoa",
    title: "Police Firearms Officers Association (PFOA)",
    author: "National Support Network",
    rating: 5.0,
    reviews: 95,
    category: "Legal & Support",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop",
    description:
      "The PFOA was created to support all those involved in firearms operations, and their families. They provide comprehensive welfare packages, counseling services, and immediate support following a critical incident.",
    keyFeatures: [
      "24/7 welfare support helpline",
      "NLP coaching and trauma counseling",
      "Legal and disciplinary procedure guidance",
      "Support for officer families",
    ],
    link: "https://pfoa.co.uk",
  },
  {
    id: "police-care",
    title: "Police Care UK",
    author: "Registered Charity",
    rating: 4.9,
    reviews: 210,
    category: "Welfare & Trauma",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop",
    description:
      "Police Care UK supports serving and former officers, staff, and their families through injury, illness, and bereavement with practical and emotional support.",
    keyFeatures: [
      "Bereavement and injury support",
      "Grants and practical assistance",
      "Trauma-informed counselling pathways",
      "Family liaison services",
    ],
    link: "https://www.policecare.org.uk",
  },
];

export type SupportDetailType = "apps" | "books" | "podcasts" | "organisations";

export interface SupportDetailRecord {
  type: SupportDetailType;
  title: string;
  author: string;
  rating?: number;
  reviews?: number;
  category: string;
  image: string;
  description: string;
  keyFeatures: string[];
  link: string;
  externalLabel: string;
}

export function getSupportDetail(type: string, slug: string): SupportDetailRecord | null {
  if (type === "apps") {
    const app = MOCK_APPS.find((a) => a.id === slug);
    if (!app) return null;
    return {
      type: "apps",
      title: app.name,
      author: app.category,
      rating: app.rating,
      reviews: app.reviews,
      category: app.category,
      image: app.logo,
      description: app.description,
      keyFeatures: [app.badge, `${app.rating} star rating`, `${app.reviews.toLocaleString()} reviews`],
      link: app.link,
      externalLabel: "Visit App",
    };
  }
  if (type === "books") {
    const book = MOCK_BOOKS.find((b) => b.id === slug);
    if (!book) return null;
    return {
      type: "books",
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.cover,
      description: book.description,
      keyFeatures: [`Recommended by ${book.recommendedBy}`, book.category],
      link: book.link,
      externalLabel: "Buy / View Book",
    };
  }
  if (type === "podcasts") {
    const pod = MOCK_PODCASTS.find((p) => p.id === slug);
    if (!pod) return null;
    return {
      type: "podcasts",
      title: pod.title,
      author: pod.topic,
      category: pod.topic,
      image: pod.logo,
      description: pod.description,
      keyFeatures: [pod.topic, "Available on major podcast platforms"],
      link: pod.link,
      externalLabel: "Listen Now",
    };
  }
  if (type === "organisations") {
    const org = MOCK_ORGANISATIONS.find((o) => o.id === slug);
    if (!org) return null;
    return {
      type: "organisations",
      title: org.title,
      author: org.author,
      rating: org.rating,
      reviews: org.reviews,
      category: org.category,
      image: org.image,
      description: org.description,
      keyFeatures: org.keyFeatures,
      link: org.link,
      externalLabel: "Open Link",
    };
  }
  return null;
}
