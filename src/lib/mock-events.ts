import { BeLoveEvent } from "./types";

export const mockEvents: BeLoveEvent[] = [
  {
    id: "1",
    name: "Houston Half Marathon",
    date: "2026-04-19T07:00:00",
    endDate: "2026-04-19T13:00:00",
    location: "Memorial Park",
    address: "6501 Memorial Dr, Houston, TX 77007",
    estimatedAttendance: 8000,
    eventType: "Fitness",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.houstonhalf.com",
    source: "Eventbrite",
    description:
      "One of Houston's premier running events through scenic Memorial Park. Thousands of runners of all skill levels come together for a morning of fitness and community.",
    imageUrl:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    brandFitScore: 9,
    audienceFit:
      "Health-conscious adults 25–45, primarily female, strong wellness orientation",
    samplingViability: "High",
    activationIdea:
      "Set up a recovery hydration station at the finish line. Pair Be Love with post-run messaging. Offer branded cups + QR code to Instagram. Consider a '1 Mile Feels Like Love' sign for photo ops.",
    permitConsiderations:
      "City of Houston Special Event Permit required — apply 60 days prior. Coordinate with race director for booth placement near finish line.",
    reasoning:
      "Post-race audience is maximally receptive to hydration products. Health-forward demographic aligns perfectly with Be Love brand values. Outdoor, high foot traffic, long dwell time at finish area.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "2",
    name: "Bayou City Art Festival",
    date: "2026-05-02T10:00:00",
    endDate: "2026-05-04T18:00:00",
    location: "Memorial Park",
    address: "6501 Memorial Dr, Houston, TX 77007",
    estimatedAttendance: 75000,
    eventType: "Festival",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual (Spring + Fall)",
    sourceUrl: "https://www.bayoucityartfestival.com",
    source: "Houston365",
    description:
      "One of the top 10 outdoor fine arts festivals in the US. Three days of art, food, live music, and family activities drawing tens of thousands of Houstonians.",
    imageUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    brandFitScore: 8,
    audienceFit:
      "Affluent arts patrons, young professionals, families — broad but skewing educated 28–50",
    samplingViability: "High",
    activationIdea:
      "Branded sampling station near food vendor row. Create an 'art of refreshment' Instagram moment with a mural backdrop. Offer 3-day sampling with day-over-day loyalty reward.",
    permitConsiderations:
      "Vendor applications open Dec–Feb. Booth fee approx $500–$1,500. Apply through Bayou City Art Festival vendor portal.",
    reasoning:
      "Massive attendance over 3 days gives exceptional volume. Outdoor festival atmosphere, all-day foot traffic, and mix of demographics creates broad brand awareness opportunity.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "3",
    name: "Heights Farmers Market",
    date: "2026-04-11T08:00:00",
    endDate: "2026-04-11T12:00:00",
    location: "Heights Mercantile",
    address: "714 Yale St, Houston, TX 77007",
    estimatedAttendance: 2000,
    eventType: "Market",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Every Saturday",
    sourceUrl: "https://www.theheightshouston.com/market",
    source: "Meetup",
    description:
      "Houston's most beloved weekly farmers market in the heart of the Heights neighborhood. Local produce, artisan goods, food trucks, and a strong wellness community.",
    imageUrl:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
    brandFitScore: 9,
    audienceFit:
      "Health-conscious locals 25–40, strong organic/wellness orientation, high disposable income",
    samplingViability: "High",
    activationIdea:
      "Weekly sampling table with loyalty punch card for repeat visitors. Partner with complementary vendors (local honey, granola) for cross-promotion bundles.",
    permitConsiderations:
      "Vendor fee ~$75/week. Contact Heights Mercantile directly. No city permit needed for recurring private market vendors.",
    reasoning:
      "Perfect weekly recurring touchpoint with exactly the right demographic. Wellness-aligned community, high receptivity, low cost to activate. Builds brand familiarity over time.",
    status: "approved",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: true,
  },
  {
    id: "4",
    name: "UH Spring Fest",
    date: "2026-04-18T11:00:00",
    endDate: "2026-04-18T20:00:00",
    location: "University of Houston Campus",
    address: "4800 Calhoun Rd, Houston, TX 77004",
    estimatedAttendance: 12000,
    eventType: "College",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://uh.edu/events",
    source: "Meetup",
    description:
      "UH's annual spring celebration featuring live music, food, games, and campus-wide activities. One of the largest student events in Houston.",
    imageUrl:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    brandFitScore: 8,
    audienceFit: "College students 18–24, diverse, social and trend-conscious",
    samplingViability: "High",
    activationIdea:
      "High-energy sampling booth with branded merch giveaway (tote bags, stickers, phone wallets). Run a social media challenge — tag @belove for a free can.",
    permitConsiderations:
      "Requires UH Student Affairs vendor approval. Apply through Office of Student Activities. Food/bev vendors may need campus food handling certification.",
    reasoning:
      "Core target demographic (18–24) at scale. Outdoor campus quad, all-day event, highly social atmosphere. Students share experiences heavily on social media — great earned media potential.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "5",
    name: "Houston Yoga Festival",
    date: "2026-04-25T08:00:00",
    endDate: "2026-04-25T17:00:00",
    location: "Buffalo Bayou Park",
    address: "105 Sabine St, Houston, TX 77007",
    estimatedAttendance: 3500,
    eventType: "Fitness",
    isOutdoor: true,
    isRecurring: false,
    sourceUrl: "https://www.houstonyogafestival.com",
    source: "Eventbrite",
    description:
      "A full-day outdoor yoga and wellness festival on the banks of Buffalo Bayou. Multiple stages, instructors, meditation, sound baths, wellness vendors, and healthy food.",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    brandFitScore: 10,
    audienceFit:
      "Wellness-focused females 25–40, mindful consumers, premium brand affinities",
    samplingViability: "High",
    activationIdea:
      "Positioned as official hydration partner. Sampling between yoga sessions — 'restore with Be Love' messaging. Collaborate with instructors for product mentions. Scenic bayou backdrop for content creation.",
    permitConsiderations:
      "Buffalo Bayou Park events require Houston Parks Board approval. Coordinate with festival organizers for official sponsorship or vendor slot.",
    reasoning:
      "Highest possible brand alignment — wellness, outdoor, mindful lifestyle audience. A natural extension of Be Love's brand values. Attendees are exactly the repeat purchaser profile.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "6",
    name: "Houston Livestock Show & Rodeo",
    date: "2026-03-03T10:00:00",
    endDate: "2026-03-22T23:00:00",
    location: "NRG Park",
    address: "1 NRG Pkwy, Houston, TX 77054",
    estimatedAttendance: 2500000,
    eventType: "Festival",
    isOutdoor: false,
    isRecurring: true,
    recurringPattern: "Annual (Feb–Mar)",
    sourceUrl: "https://www.rodeohouston.com",
    source: "Ticketmaster",
    description:
      "The world's largest livestock exhibition and rodeo. 20 days of concerts, carnival, BBQ, and Western culture. One of Houston's defining annual events.",
    imageUrl:
      "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?w=800&q=80",
    brandFitScore: 6,
    audienceFit:
      "Very broad — families, tourists, country music fans, all ages and demographics",
    samplingViability: "Medium",
    activationIdea:
      "Vendor booth in the carnival/shopping area. Western-themed Be Love activation — 'The Drink of the Wild West.' Branded cowboy hats as giveaway item.",
    permitConsiderations:
      "Vendor spots are extremely competitive and expensive ($3,000–$10,000+). Apply 6+ months in advance through HLSR vendor program.",
    reasoning:
      "Massive scale but broad demographic reduces targeting precision. Indoor setting limits spontaneous sampling. High cost and competition. Best as awareness play rather than core activation.",
    status: "skipped",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "7",
    name: "EaDo Night Market",
    date: "2026-04-17T18:00:00",
    endDate: "2026-04-17T22:00:00",
    location: "East Downtown (EaDo)",
    address: "2500 Commerce St, Houston, TX 77003",
    estimatedAttendance: 2500,
    eventType: "Pop-up",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Monthly",
    sourceUrl: "https://www.eadonightmarket.com",
    source: "Do713",
    description:
      "Houston's coolest monthly night market in the vibrant EaDo neighborhood. Local vendors, street food, live DJ, art installations, and a strong young creative crowd.",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    brandFitScore: 8,
    audienceFit:
      "Trendy young creatives 21–35, diverse, social media active, early adopters",
    samplingViability: "High",
    activationIdea:
      "Neon-lit Be Love pop-up station. Limited edition night market can design. Partner with a local DJ for a Be Love set. Create a shareable photo moment with neon signage.",
    permitConsiderations:
      "Contact EaDo Night Market organizers directly for vendor spots. Monthly recurring means you can test once and scale if successful.",
    reasoning:
      "Monthly cadence allows for testing and optimization. Trendy crowd with high social media presence = earned media multiplier. Outdoor evening event with great energy.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "8",
    name: "Houston Triathlon",
    date: "2026-05-17T06:00:00",
    endDate: "2026-05-17T14:00:00",
    location: "Sylvan Beach Park, La Porte",
    address: "400 Sylvan Beach Dr, La Porte, TX 77571",
    estimatedAttendance: 2200,
    eventType: "Fitness",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.houstontriathlon.com",
    source: "Eventbrite",
    description:
      "Annual triathlon drawing serious athletes and fitness enthusiasts from across Texas. Swim, bike, and run competition with strong community atmosphere.",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    brandFitScore: 9,
    audienceFit:
      "Elite fitness enthusiasts 28–45, high income, health-obsessed, premium product buyers",
    samplingViability: "High",
    activationIdea:
      "Recovery station at transition zones and finish line. 'Fuel the Finish' campaign with Be Love. Partner with race sponsors for official hydration partner status.",
    permitConsiderations:
      "Coordinate with race director for official vendor/sponsor status. La Porte city permit may be required for beach area activation.",
    reasoning:
      "Highly engaged fitness audience with maximum brand alignment. Triathlon community is influential, tight-knit, and vocal about products they love — high word-of-mouth potential.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "9",
    name: "Free Press Summer Fest",
    date: "2026-06-06T12:00:00",
    endDate: "2026-06-07T23:00:00",
    location: "Eleanor Tinsley Park",
    address: "3300 Allen Pkwy, Houston, TX 77019",
    estimatedAttendance: 35000,
    eventType: "Concert",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.freepresssummerfest.com",
    source: "Ticketmaster",
    description:
      "Houston's beloved 2-day indie music festival along Buffalo Bayou with multiple stages, local food vendors, and a cool, creative crowd.",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    brandFitScore: 7,
    audienceFit:
      "Indie music fans 21–35, creative professionals, culturally engaged",
    samplingViability: "Medium",
    activationIdea:
      "Sponsor the 'chill zone' near the smaller stage. Cold sampling on hot summer days. Create a Be Love music playlist tie-in on Spotify promoted at the event.",
    permitConsiderations:
      "Official vendor/sponsor application through Free Press Houston. Beverage vendors compete with official sponsors — ensure no exclusivity conflicts.",
    reasoning:
      "Strong demographic fit with 35K attendance over 2 days. Summer heat makes cold beverage sampling very effective. Creative crowd aligns with Be Love aesthetic.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "10",
    name: "Houston Astros vs. Yankees",
    date: "2026-04-22T19:10:00",
    endDate: "2026-04-22T22:30:00",
    location: "Minute Maid Park",
    address: "501 Crawford St, Houston, TX 77002",
    estimatedAttendance: 42000,
    eventType: "Sports",
    isOutdoor: false,
    isRecurring: false,
    sourceUrl: "https://www.mlb.com/astros",
    source: "Ticketmaster",
    description:
      "High-profile MLB matchup between the Houston Astros and New York Yankees at Minute Maid Park.",
    imageUrl:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80",
    brandFitScore: 5,
    audienceFit: "Broad sports fans, all ages, families, groups",
    samplingViability: "Low",
    activationIdea:
      "Pre-game activation outside stadium gates (Astros permission required). 'Game Day Hydration' angle with Astros orange color tie-in.",
    permitConsiderations:
      "Indoor stadium — no sampling without official MLB/Astros sponsorship deal. Pre-game outside is possible but requires city sidewalk permit. High barrier to entry.",
    reasoning:
      "Massive attendance but indoor venue and existing beverage contracts make sampling nearly impossible without a formal sponsorship. Better as social media content opportunity.",
    status: "skipped",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
];
