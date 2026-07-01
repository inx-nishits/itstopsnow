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

export interface SupportWebsite {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
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
  {
    id: "app4",
    name: "Wysa",
    description: "An AI-based mental health chatbot providing immediate CBT-based support and resilience exercises.",
    category: "Mental Health",
    badge: "",
    rating: 4.6,
    reviews: 1800,
    logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop",
    link: "https://www.wysa.io",
  },
  {
    id: "app5",
    name: "Ten Percent Happier",
    description: "Meditation for fidgety skeptics. Practical, straightforward mindfulness tools without the fluff.",
    category: "Meditation",
    badge: "",
    rating: 4.8,
    reviews: 2100,
    logo: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=400&auto=format&fit=crop",
    link: "https://www.tenpercent.com",
  },
  {
    id: "app6",
    name: "Insight Timer",
    description: "The largest free library of guided meditations on earth. Perfect for quick shifts breaks.",
    category: "Meditation",
    badge: "",
    rating: 4.9,
    reviews: 5000,
    logo: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=400&auto=format&fit=crop",
    link: "https://insighttimer.com",
  },
  {
    id: "app7",
    name: "PTSD Coach",
    description: "Designed by the VA to help veterans and responders learn about and manage symptoms of trauma.",
    category: "Trauma Support",
    badge: "Clinical Tool",
    rating: 4.7,
    reviews: 890,
    logo: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop",
    link: "https://mobile.va.gov/app/ptsd-coach",
  },
  {
    id: "app8",
    name: "Day One",
    description: "A secure, private journaling app perfect for offloading thoughts after a difficult shift.",
    category: "Journaling",
    badge: "",
    rating: 4.8,
    reviews: 3400,
    logo: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?q=80&w=400&auto=format&fit=crop",
    link: "https://dayoneapp.com",
  }
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
  {
    id: "book4",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    description: "A psychiatrist's memoir of life in Nazi death camps and its lessons for spiritual survival.",
    category: "Philosophy",
    recommendedBy: "Support Network",
    cover: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com",
  },
  {
    id: "book5",
    title: "Why We Sleep",
    author: "Matthew Walker",
    description: "Unlocking the power of sleep and dreams, essential for shift workers.",
    category: "Health & Science",
    recommendedBy: "Medical Advisors",
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com",
  },
  {
    id: "book6",
    title: "Tribe: On Homecoming and Belonging",
    author: "Sebastian Junger",
    description: "Explores the vital role of community and connection in human survival and mental health.",
    category: "Sociology",
    recommendedBy: "Peer Support Teams",
    cover: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com",
  },
  {
    id: "book7",
    title: "Daring Greatly",
    author: "Brené Brown",
    description: "How the courage to be vulnerable transforms the way we live, love, parent, and lead.",
    category: "Self-Help",
    recommendedBy: "Therapists",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com",
  },
  {
    id: "book8",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy and proven way to build good habits and break bad ones.",
    category: "Self-Improvement",
    recommendedBy: "Wellbeing Coaches",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    link: "https://www.amazon.com",
  }
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
  {
    id: "pod4",
    title: "Behind the Shield",
    description: "An incredible deep dive into the lives and mental health of first responders around the globe.",
    topic: "First Responders",
    logo: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  },
  {
    id: "pod5",
    title: "Huberman Lab",
    description: "Neuroscience: how our brain and its connections with the organs of our body control our perceptions.",
    topic: "Neuroscience",
    logo: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  },
  {
    id: "pod6",
    title: "On Purpose with Jay Shetty",
    description: "Fascinating conversations with insightful people, designed to make you wiser and happier.",
    topic: "Self-Improvement",
    logo: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  },
  {
    id: "pod7",
    title: "The Trauma Therapist",
    description: "Interviews with thought leaders in the fields of trauma, addiction, mindfulness, and yoga.",
    topic: "Therapy",
    logo: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  },
  {
    id: "pod8",
    title: "Ten Percent Happier",
    description: "Dan Harris explores happiness from all angles with experts, monks, and scientists.",
    topic: "Meditation",
    logo: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=800&auto=format&fit=crop",
    link: "https://spotify.com",
  }
];

export const MOCK_WEBSITES: SupportWebsite[] = [
  {
    id: "web1",
    name: "Mind.org.uk",
    description: "Information and support for anyone experiencing a mental health problem. Resources specific to emergency responders available.",
    category: "Charity",
    logo: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=400&auto=format&fit=crop",
    link: "https://www.mind.org.uk",
  },
  {
    id: "web2",
    name: "Oscar Kilo",
    description: "The National Police Wellbeing Service, providing evidence-based support, resources, and assessments for all forces.",
    category: "Wellbeing Service",
    logo: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    link: "https://oscarkilo.org.uk",
  },
  {
    id: "web3",
    name: "Police Care UK",
    description: "The charity for police and their families, offering practical, emotional, and financial support for trauma and injury.",
    category: "Charity",
    logo: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&auto=format&fit=crop",
    link: "https://www.policecare.org.uk",
  },
  {
    id: "web4",
    name: "Samaritans",
    description: "Whatever you're going through, a Samaritan will face it with you, 24/7. Completely confidential support line.",
    category: "Crisis Support",
    logo: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400&auto=format&fit=crop",
    link: "https://www.samaritans.org",
  }
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
