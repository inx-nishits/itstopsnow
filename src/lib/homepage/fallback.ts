import type { HomepageData } from "./types";

/** Static fallback — used until Sanity documents are published or when CMS is unavailable */
export const HOMEPAGE_FALLBACK: HomepageData = {
  fromSanity: false,
  stats: [
    {
      id: "officers",
      label: "Officers Supported",
      endValue: 42850,
      suffix: "+",
      duration: 2.0,
      description:
        "Policing professionals and first responders supported nationwide through our mental health and welfare advocacy networks.",
    },
    {
      id: "lives",
      label: "Lives Saved",
      endValue: 12,
      suffixText: " of 13",
      duration: 4.5,
      isPulsing: true,
      description:
        "Active interventions preventing officer suicide during traumatic multi-year misconduct investigations.",
    },
    {
      id: "victories",
      label: "Legal Victories",
      endValue: 38,
      duration: 2.0,
      description:
        "Successful challenges against disproportionate suspension terms and unsubstantiated misconduct charges.",
    },
    {
      id: "funds",
      label: "Funds Secured",
      endValue: 14.2,
      prefix: "£",
      suffix: "M",
      duration: 2.0,
      description:
        "In welfare grants, psychological therapy funding, and legal aid secured for officers and their families.",
    },
  ],
  voices: [
    {
      id: "v1",
      name: "Margaret Harper",
      relationship: "Wife of PC Andrew Harper",
      quote:
        "He wore the uniform with pride, but behind it he was the kindest man I ever knew. When the system failed him, our family was left in the dark. No officer's family should ever feel that alone.",
      imageUrl: "/images/quote-bg.png",
      featured: true,
    },
    {
      id: "v2",
      name: "Sgt. David Miller",
      relationship: "Police Federation Representative",
      quote:
        "I've stood beside officers through investigations that dragged on for years. It Stops Now gives them something we never had — a voice, and people who actually listen.",
      imageUrl: "/images/mission-support.png",
    },
    {
      id: "v3",
      name: "James R.",
      relationship: "Serving Officer, West Midlands",
      quote:
        "You can feel isolated the moment you're suspended. Knowing this movement exists — that someone sees the person behind the warrant card — it keeps you going.",
      imageUrl: "/bannerBg.png",
    },
  ],
  rollPreview: [],
  events: [
    {
      id: "e1",
      title: "National Lobby Day at Westminster",
      date: "July 15, 2026",
      time: "10:00 AM – 4:00 PM",
      location: "Houses of Parliament, London",
      description:
        "Join us in person to speak directly with MPs about the statutory 12-month misconduct investigation limit.",
      badge: "Key Action",
      href: "/events",
    },
    {
      id: "e2",
      title: "Online Campaign Briefing & Strategy",
      date: "June 28, 2026",
      time: "7:00 PM – 8:30 PM",
      location: "Zoom Virtual Meeting",
      description:
        "An interactive strategy briefing detailing the next phase of our campaign and legal reform updates.",
      badge: "Public Webinar",
      href: "/events",
    },
    {
      id: "e3",
      title: "Officer Wellbeing & Advocacy Memorial",
      date: "September 10, 2026",
      time: "2:00 PM – 3:30 PM",
      location: "National Memorial Arboretum, Staffordshire",
      description:
        "A remembrance service for families, friends, and colleagues of officers lost during lengthy investigation proceedings.",
      badge: "Memorial",
      href: "/events",
    },
  ],
};
