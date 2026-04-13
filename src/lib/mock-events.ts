import { BeLoveEvent } from "./types";

export const mockEvents: BeLoveEvent[] = [
  // ─── APRIL ───────────────────────────────────────────────────────────────
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
      "One of Houston's premier running events through scenic Memorial Park.",
    brandFitScore: 9,
    audienceFit: "Health-conscious adults 25–45, strong wellness orientation",
    samplingViability: "High",
    activationIdea:
      "Set up a recovery hydration station at the finish line. Pair Be Love with post-run messaging. Branded cups + QR code to Instagram.",
    permitConsiderations:
      "City of Houston Special Event Permit required — apply 60 days prior. Coordinate with race director for booth placement.",
    reasoning:
      "Post-race audience is maximally receptive to hydration products. Health-forward demographic aligns perfectly with Be Love brand values.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "2",
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
      "UH's annual spring celebration featuring live music, food, games, and campus-wide activities.",
    brandFitScore: 8,
    audienceFit: "College students 18–24, diverse, social and trend-conscious",
    samplingViability: "High",
    activationIdea:
      "High-energy sampling booth with branded merch giveaway. Run a social media challenge — tag @belove for a free can.",
    permitConsiderations:
      "Requires UH Student Affairs vendor approval. Apply through Office of Student Activities.",
    reasoning:
      "Core target demographic at scale. Outdoor campus quad, highly social atmosphere. Students share experiences heavily on social media.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "3",
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
      "Houston's coolest monthly night market in the vibrant EaDo neighborhood. Local vendors, street food, live DJ, art installations.",
    brandFitScore: 8,
    audienceFit: "Trendy young creatives 21–35, diverse, social media active, early adopters",
    samplingViability: "High",
    activationIdea:
      "Neon-lit Be Love pop-up station. Limited edition night market can design. Partner with a local DJ for a Be Love set.",
    permitConsiderations:
      "Contact EaDo Night Market organizers directly for vendor spots. Monthly recurring means you can test once and scale.",
    reasoning:
      "Monthly cadence allows for testing and optimization. Trendy crowd with high social media presence = earned media multiplier.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },

  // ─── MAY ─────────────────────────────────────────────────────────────────
  {
    id: "4",
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
      "One of the top 10 outdoor fine arts festivals in the US. Three days of art, food, live music, and family activities.",
    brandFitScore: 8,
    audienceFit: "Affluent arts patrons, young professionals, families 28–50",
    samplingViability: "High",
    activationIdea:
      "Branded sampling station near food vendor row. Create an 'art of refreshment' Instagram moment. Offer 3-day sampling with day-over-day loyalty reward.",
    permitConsiderations:
      "Vendor applications open Dec–Feb. Booth fee approx $500–$1,500. Apply through Bayou City Art Festival vendor portal.",
    reasoning:
      "Massive attendance over 3 days. Outdoor festival atmosphere, all-day foot traffic, mix of demographics.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "5",
    name: "Houston Triathlon",
    date: "2026-05-17T06:00:00",
    endDate: "2026-05-17T14:00:00",
    location: "Sylvan Beach Park",
    address: "400 Sylvan Beach Dr, La Porte, TX 77571",
    estimatedAttendance: 2200,
    eventType: "Fitness",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.houstontriathlon.com",
    source: "Eventbrite",
    description:
      "Annual triathlon drawing serious athletes and fitness enthusiasts from across Texas.",
    brandFitScore: 9,
    audienceFit: "Elite fitness enthusiasts 28–45, high income, health-obsessed, premium product buyers",
    samplingViability: "High",
    activationIdea:
      "Recovery station at transition zones and finish line. 'Fuel the Finish' campaign with Be Love. Partner for official hydration partner status.",
    permitConsiderations:
      "Coordinate with race director for official vendor/sponsor status. La Porte city permit may be required.",
    reasoning:
      "Highly engaged fitness audience with maximum brand alignment. Triathlon community is influential, tight-knit, and vocal about products they love.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "6",
    name: "Discovery Green Picnic in the Park",
    date: "2026-05-09T17:00:00",
    endDate: "2026-05-09T21:00:00",
    location: "Discovery Green Park",
    address: "1500 McKinney St, Houston, TX 77010",
    estimatedAttendance: 4000,
    eventType: "Concert",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Monthly (spring/summer)",
    sourceUrl: "https://www.discoverygreen.com",
    source: "Discovery Green",
    description:
      "Free outdoor concert series in the heart of downtown Houston at Discovery Green. Families, young professionals, and locals gather on the lawn for live music and food trucks.",
    brandFitScore: 9,
    audienceFit:
      "Downtown professionals, young families, active lifestyle 22–40. Health-conscious urban crowd",
    samplingViability: "High",
    activationIdea:
      "Blanket-side sampling cart weaving through picnic areas. 'Sip & Chill' activation with branded blankets and cups. Perfect backdrop for lifestyle content creation.",
    permitConsiderations:
      "Contact Discovery Green events team for vendor/sponsor partnerships. As a park venue, requires Discovery Green management approval. Relatively low barrier.",
    reasoning:
      "Discovery Green attracts exactly the Be Love demographic — health-conscious, social, downtown Houston crowd. Relaxed outdoor setting with high dwell time is perfect for sampling.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "7",
    name: "GRB Health & Wellness Expo",
    date: "2026-05-15T09:00:00",
    endDate: "2026-05-16T17:00:00",
    location: "George R. Brown Convention Center",
    address: "1001 Avenida De Las Americas, Houston, TX 77010",
    estimatedAttendance: 18000,
    eventType: "Festival",
    isOutdoor: false,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.grbhouston.com",
    source: "GRB Convention Center",
    description:
      "Houston's largest health and wellness expo featuring fitness brands, nutrition products, wellness services, and keynote speakers on healthy living.",
    brandFitScore: 10,
    audienceFit:
      "Health enthusiasts, nutrition-focused consumers, fitness professionals 20–50. Highest possible brand alignment.",
    samplingViability: "High",
    activationIdea:
      "Prime vendor booth placement in the nutrition/beverage aisle. Product demo station with branded health messaging. Collect leads via QR code for loyalty program sign-up.",
    permitConsiderations:
      "Booth rental through GRB exhibitor program. Apply 3–4 months in advance. Standard exhibitor insurance required ($1M liability). Booth fee ~$1,500–$3,000.",
    reasoning:
      "Perfect brand-event alignment — attendees are specifically seeking health products. High intent audience with purchase mindset. Two full days of exposure.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "8",
    name: "Houston Yoga Festival",
    date: "2026-05-25T08:00:00",
    endDate: "2026-05-25T17:00:00",
    location: "Buffalo Bayou Park",
    address: "105 Sabine St, Houston, TX 77007",
    estimatedAttendance: 3500,
    eventType: "Fitness",
    isOutdoor: true,
    isRecurring: false,
    sourceUrl: "https://www.houstonyogafestival.com",
    source: "Eventbrite",
    description:
      "A full-day outdoor yoga and wellness festival on the banks of Buffalo Bayou. Multiple stages, sound baths, wellness vendors, and healthy food.",
    brandFitScore: 10,
    audienceFit:
      "Wellness-focused females 25–40, mindful consumers, premium brand affinities",
    samplingViability: "High",
    activationIdea:
      "Positioned as official hydration partner. Sampling between yoga sessions with 'restore with Be Love' messaging. Collaborate with instructors for product mentions.",
    permitConsiderations:
      "Buffalo Bayou Park events require Houston Parks Board approval. Coordinate with festival organizers for official sponsorship or vendor slot.",
    reasoning:
      "Highest possible brand alignment — wellness, outdoor, mindful lifestyle audience. A natural extension of Be Love's brand values.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "9",
    name: "Heights Farmers Market",
    date: "2026-05-02T08:00:00",
    endDate: "2026-05-02T12:00:00",
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
    brandFitScore: 9,
    audienceFit:
      "Health-conscious locals 25–40, strong organic/wellness orientation, high disposable income",
    samplingViability: "High",
    activationIdea:
      "Weekly sampling table with loyalty punch card for repeat visitors. Partner with complementary vendors for cross-promotion bundles.",
    permitConsiderations:
      "Vendor fee ~$75/week. Contact Heights Mercantile directly. No city permit needed for recurring private market vendors.",
    reasoning:
      "Perfect weekly recurring touchpoint with exactly the right demographic. Wellness-aligned community, high receptivity, low cost to activate.",
    status: "approved",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: true,
  },

  // ─── JUNE ────────────────────────────────────────────────────────────────
  {
    id: "10",
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
      "Houston's beloved 2-day indie music festival along Buffalo Bayou with multiple stages, local food vendors, and a cool creative crowd.",
    brandFitScore: 7,
    audienceFit: "Indie music fans 21–35, creative professionals, culturally engaged",
    samplingViability: "Medium",
    activationIdea:
      "Sponsor the 'chill zone' near the smaller stage. Cold sampling on hot summer days. Be Love music playlist tie-in on Spotify promoted at the event.",
    permitConsiderations:
      "Official vendor/sponsor application through Free Press Houston. Ensure no exclusivity conflicts with official sponsors.",
    reasoning:
      "Strong demographic fit with 35K attendance. Summer heat makes cold beverage sampling very effective. Creative crowd aligns with Be Love aesthetic.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "11",
    name: "Discovery Green Summer Movie Series",
    date: "2026-06-12T20:00:00",
    endDate: "2026-06-12T23:00:00",
    location: "Discovery Green Park",
    address: "1500 McKinney St, Houston, TX 77010",
    estimatedAttendance: 3000,
    eventType: "Community",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Weekly (June–Aug)",
    sourceUrl: "https://www.discoverygreen.com/movies",
    source: "Discovery Green",
    description:
      "Free outdoor movie screenings every Friday night at Discovery Green all summer long. Houstonians bring blankets and picnic setups to watch films under the stars.",
    brandFitScore: 8,
    audienceFit:
      "Young professionals and families 22–40, social and relaxed, downtown Houston residents",
    samplingViability: "High",
    activationIdea:
      "Pre-movie sampling station at park entrance. 'Movie Night Kit' — Be Love + branded popcorn bag combo. Great branded photo op with movie screen backdrop.",
    permitConsiderations:
      "Partner directly with Discovery Green management for vendor spots. Weekly recurring event makes this a cost-effective summer-long activation.",
    reasoning:
      "Recurring weekly event = consistent touchpoint all summer. Relaxed, social atmosphere with high dwell time. Ideal for building brand familiarity over the season.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "12",
    name: "GRB Houston Food & Wine Festival",
    date: "2026-06-20T14:00:00",
    endDate: "2026-06-21T21:00:00",
    location: "George R. Brown Convention Center",
    address: "1001 Avenida De Las Americas, Houston, TX 77010",
    estimatedAttendance: 22000,
    eventType: "Festival",
    isOutdoor: false,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.grbhouston.com",
    source: "GRB Convention Center",
    description:
      "Two days of curated food, wine, and beverage experiences featuring Houston's top chefs, sommeliers, and artisan brands inside the GRB.",
    brandFitScore: 9,
    audienceFit:
      "Affluent foodies and beverage enthusiasts 28–55, high disposable income, premium brand buyers",
    samplingViability: "High",
    activationIdea:
      "Featured beverage booth in the artisan drinks section. Pair Be Love with local food pairings. Offer a 'clean refreshment' angle alongside wine and spirits.",
    permitConsiderations:
      "Exhibitor application through GRB events team. Beverage sampling may require Texas TABC license. Standard liability insurance required.",
    reasoning:
      "Premium audience actively seeking new beverage experiences. Be Love fits perfectly in the artisan/craft beverage category. High purchase intent and media coverage.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "13",
    name: "Houston Pride Festival",
    date: "2026-06-27T12:00:00",
    endDate: "2026-06-27T22:00:00",
    location: "Downtown Houston",
    address: "500 Bagby St, Houston, TX 77002",
    estimatedAttendance: 700000,
    eventType: "Festival",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.pridehouston.org",
    source: "Houston Press",
    description:
      "One of the largest Pride celebrations in the US, drawing hundreds of thousands to downtown Houston for a parade, festival, and live performances.",
    brandFitScore: 8,
    audienceFit:
      "Extremely broad — LGBTQ+ community, allies, young adults 18–45, love and inclusion-focused",
    samplingViability: "High",
    activationIdea:
      "Be Love Pride activation — 'Love is the Ingredient' campaign. Branded rainbow cups, high-energy street sampling. Potential parade float or booth partnership with community org.",
    permitConsiderations:
      "Vendor applications through Pride Houston. Very competitive — apply 4–6 months early. City street vendor permit required. Massive logistics — bring large team.",
    reasoning:
      "Be Love's name is perfectly aligned with Pride's message of love. Massive scale (700K). Brand values of love and community fit naturally. Exceptional earned media opportunity.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "14",
    name: "Discovery Green Yoga in the Park",
    date: "2026-06-07T08:00:00",
    endDate: "2026-06-07T10:00:00",
    location: "Discovery Green Park",
    address: "1500 McKinney St, Houston, TX 77010",
    estimatedAttendance: 600,
    eventType: "Fitness",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Weekly (Sundays)",
    sourceUrl: "https://www.discoverygreen.com/yoga",
    source: "Discovery Green",
    description:
      "Free weekly Sunday morning yoga classes on the Discovery Green lawn. Led by local instructors, open to all skill levels.",
    brandFitScore: 10,
    audienceFit:
      "Health-focused urban professionals 25–40, wellness lifestyle, predominantly female, high brand affinity",
    samplingViability: "High",
    activationIdea:
      "Post-class recovery sampling — 'Restore with Be Love.' Set up right at the mat pickup area. Small, intimate setting = high personal connection with the brand.",
    permitConsiderations:
      "Partner with Discovery Green directly. Low-cost activation. Recurring weekly means high cumulative reach throughout summer.",
    reasoning:
      "Perfect micro-activation opportunity. Weekly cadence builds a loyal Be Love association with the yoga community. Intimate setting creates genuine brand relationships.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "15",
    name: "Houston Dragon Boat Festival",
    date: "2026-06-13T08:00:00",
    endDate: "2026-06-13T17:00:00",
    location: "Buffalo Bayou Park",
    address: "105 Sabine St, Houston, TX 77007",
    estimatedAttendance: 15000,
    eventType: "Sports",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.houstondragonboat.org",
    source: "Houston Chronicle Events",
    description:
      "Annual dragon boat racing festival on Buffalo Bayou celebrating Asian culture, athletic competition, and community spirit.",
    brandFitScore: 7,
    audienceFit: "Active adults 25–45, diverse, community-oriented, athletic",
    samplingViability: "High",
    activationIdea:
      "Sampling tent near spectator viewing areas. 'Power Your Paddle' messaging. Great multicultural brand exposure.",
    permitConsiderations:
      "Vendor application through Houston Dragon Boat Festival org. Buffalo Bayou Park permit required.",
    reasoning:
      "Active outdoor event with healthy, community-driven crowd. Good attendance with a mix of participants and spectators. Strong community feel aligns with Be Love values.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },

  // ─── JULY ────────────────────────────────────────────────────────────────
  {
    id: "16",
    name: "GRB Comic Con Houston",
    date: "2026-07-10T10:00:00",
    endDate: "2026-07-12T19:00:00",
    location: "George R. Brown Convention Center",
    address: "1001 Avenida De Las Americas, Houston, TX 77010",
    estimatedAttendance: 95000,
    eventType: "Festival",
    isOutdoor: false,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.comicconhouston.com",
    source: "GRB Convention Center",
    description:
      "Houston's massive 3-day pop culture convention featuring comics, gaming, celebrity panels, cosplay, and fan experiences.",
    brandFitScore: 6,
    audienceFit: "Geek culture fans 16–40, broad demographics, high energy and social",
    samplingViability: "Medium",
    activationIdea:
      "Fun branded pop culture angle — 'The Drink of Heroes.' Booth near food court area. Partner with artist alley for limited edition Be Love fan art can design.",
    permitConsiderations:
      "Exhibitor application through GRB. Very high traffic — bring large team and high volume of samples. 3-day commitment. Booth fee $2,000–$5,000+.",
    reasoning:
      "Massive scale (95K over 3 days) gives exceptional volume. Younger demographic skew is valuable. Indoor climate-controlled = sampling-friendly. Be Love brand can be playful here.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "17",
    name: "Discovery Green 4th of July Celebration",
    date: "2026-07-04T17:00:00",
    endDate: "2026-07-04T23:00:00",
    location: "Discovery Green Park",
    address: "1500 McKinney St, Houston, TX 77010",
    estimatedAttendance: 25000,
    eventType: "Festival",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.discoverygreen.com/july4",
    source: "Discovery Green",
    description:
      "Houston's beloved downtown 4th of July celebration at Discovery Green with live music, food, family activities, and fireworks over the city skyline.",
    brandFitScore: 9,
    audienceFit:
      "Broad Houston community, families and young adults 21–45, patriotic and celebratory mood",
    samplingViability: "High",
    activationIdea:
      "Patriotic Be Love activation — red, white, and love branding. Ice-cold sampling in peak July heat. Fireworks-viewing branded experience. Family-friendly sampling area.",
    permitConsiderations:
      "Partner with Discovery Green management. High-demand event — secure vendor spot 6+ months in advance. July heat requires substantial ice/cooling logistics.",
    reasoning:
      "25,000 attendees at a free outdoor event in July heat = perfect conditions for cold beverage sampling. Downtown Houston location reaches diverse, broad demographic.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "18",
    name: "Houston Summer Splash 5K",
    date: "2026-07-18T07:00:00",
    endDate: "2026-07-18T12:00:00",
    location: "Hermann Park",
    address: "6001 Fannin St, Houston, TX 77030",
    estimatedAttendance: 3500,
    eventType: "Fitness",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.houstonrunningclub.com",
    source: "Eventbrite",
    description:
      "Summer fun run through Hermann Park with water stations, post-race festival, food trucks, and live music. A community favorite for casual runners.",
    brandFitScore: 9,
    audienceFit:
      "Casual fitness enthusiasts 22–40, community-oriented, health-conscious, family-friendly",
    samplingViability: "High",
    activationIdea:
      "Official post-race hydration partner. 'Beat the Heat with Be Love' campaign. Set up at finish line festival area with ice-cold cans and branded cooling towels.",
    permitConsiderations:
      "Hermann Park Conservancy event permit required. Coordinate with race organizers. July heat — logistics need extra cooling infrastructure.",
    reasoning:
      "Post-run in July heat = maximum receptivity to cold beverages. Community fun run draws approachable, friendly crowd. Casual fitness angle perfectly fits Be Love's accessible wellness brand.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "19",
    name: "GRB Houston International Boat Show",
    date: "2026-07-24T10:00:00",
    endDate: "2026-07-27T20:00:00",
    location: "George R. Brown Convention Center",
    address: "1001 Avenida De Las Americas, Houston, TX 77010",
    estimatedAttendance: 40000,
    eventType: "Festival",
    isOutdoor: false,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.grbhouston.com/boat-show",
    source: "GRB Convention Center",
    description:
      "One of the largest boat shows in the South. Four days of marine life, luxury boats, outdoor gear, and active lifestyle brands.",
    brandFitScore: 7,
    audienceFit:
      "Active outdoor/water sports enthusiasts, higher income adults 30–55, Texas lifestyle",
    samplingViability: "Medium",
    activationIdea:
      "Sampling near the outdoor/marine lifestyle section. 'Lake Life, Be Love' campaign angle. Pair with sunscreen/sunglasses brands for a summer lifestyle bundle giveaway.",
    permitConsiderations:
      "Exhibitor application through GRB or boat show organizers. Standard vendor insurance required. 4-day commitment with high foot traffic.",
    reasoning:
      "Active lifestyle audience with outdoor, adventurous mindset. Be Love fits the active recreation demographic. Good volume at 40K over 4 days.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "20",
    name: "Discovery Green Food Truck Friday",
    date: "2026-07-10T17:00:00",
    endDate: "2026-07-10T21:00:00",
    location: "Discovery Green Park",
    address: "1500 McKinney St, Houston, TX 77010",
    estimatedAttendance: 2000,
    eventType: "Pop-up",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Every Friday (summer)",
    sourceUrl: "https://www.discoverygreen.com/foodtrucks",
    source: "Discovery Green",
    description:
      "Weekly summer Friday food truck gathering at Discovery Green with rotating local trucks, live DJ, and an after-work social vibe.",
    brandFitScore: 9,
    audienceFit:
      "Young downtown professionals 22–38, after-work social crowd, trend-conscious, urban",
    samplingViability: "High",
    activationIdea:
      "Weekly sampling partner — 'Friday Refresh' with Be Love. Set up adjacent to food truck queue for maximum impulse trial. Pair with a food truck for a Be Love combo meal deal.",
    permitConsiderations:
      "Recurring partnership with Discovery Green management. Weekly commitment throughout summer. Very low barrier — Discovery Green actively seeks beverage partners.",
    reasoning:
      "Weekly after-work crowd is exactly the young professional demographic Be Love targets. Food truck pairing creates natural consumption moment. Low cost for high recurring reach.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },

  // ─── AUGUST ──────────────────────────────────────────────────────────────
  {
    id: "21",
    name: "Houston Back to School Bash",
    date: "2026-08-08T12:00:00",
    endDate: "2026-08-08T20:00:00",
    location: "NRG Park Parking Lot C",
    address: "8400 Kirby Dr, Houston, TX 77054",
    estimatedAttendance: 20000,
    eventType: "Community",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.houstontx.gov/events",
    source: "Visit Houston",
    description:
      "Massive free back-to-school event for Houston families providing school supplies, food, activities, and entertainment for kids and parents.",
    brandFitScore: 6,
    audienceFit: "Families, parents 25–45, community-focused, broad demographic",
    samplingViability: "Medium",
    activationIdea:
      "Family-friendly sampling table. 'Start the Year with Love' campaign. Partner with school supply giveaway booth for a branded Be Love + school kit bundle.",
    permitConsiderations:
      "City of Houston managed event — contact Parks & Recreation for vendor spots. Outdoor summer event needs cooling logistics.",
    reasoning:
      "Large community event with engaged parents. Be Love can reinforce its community values. Good awareness play even if conversion is lower than fitness events.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "22",
    name: "GRB Houston Auto Show",
    date: "2026-08-14T10:00:00",
    endDate: "2026-08-16T20:00:00",
    location: "George R. Brown Convention Center",
    address: "1001 Avenida De Las Americas, Houston, TX 77010",
    estimatedAttendance: 55000,
    eventType: "Festival",
    isOutdoor: false,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.grbhouston.com/auto-show",
    source: "GRB Convention Center",
    description:
      "One of the largest auto shows in Texas featuring new model unveilings, electric vehicles, test drives, and automotive lifestyle brands.",
    brandFitScore: 5,
    audienceFit: "Auto enthusiasts, broad 25–60 demographics, lifestyle aspirational buyers",
    samplingViability: "Medium",
    activationIdea:
      "Sampling near EV/lifestyle vehicle section. 'Drive Clean, Drink Clean' angle tying Be Love to the clean energy movement.",
    permitConsiderations:
      "Exhibitor application through GRB. 3-day commitment. Standard insurance required. Booth fee $1,500–$3,000.",
    reasoning:
      "Decent volume at 55K but demographic fit is weaker than pure wellness events. Works best as broad awareness play. EV section creates a natural 'clean lifestyle' hook.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
  {
    id: "23",
    name: "Houston Wellness Weekend",
    date: "2026-08-22T09:00:00",
    endDate: "2026-08-23T18:00:00",
    location: "Discovery Green Park",
    address: "1500 McKinney St, Houston, TX 77010",
    estimatedAttendance: 8000,
    eventType: "Festival",
    isOutdoor: true,
    isRecurring: true,
    recurringPattern: "Annual",
    sourceUrl: "https://www.discoverygreen.com/wellness",
    source: "Discovery Green",
    description:
      "Two-day wellness festival at Discovery Green featuring fitness classes, meditation, holistic health vendors, plant-based food, and wellness speakers.",
    brandFitScore: 10,
    audienceFit:
      "Wellness-devoted adults 22–45, health-first mindset, premium product buyers, influencer-adjacent",
    samplingViability: "High",
    activationIdea:
      "Headline beverage sponsor. 'Be Love, Be Well' campaign. Sampling at every session transition. Collaborate with wellness speakers for product mentions. Live social media content creation.",
    permitConsiderations:
      "Early sponsorship/vendor application to Discovery Green management. Premium placement opportunity as official beverage partner. Negotiate signage rights.",
    reasoning:
      "Best possible event for Be Love — 100% wellness audience, outdoor, 2-day format, influencer attendance likely. This event could define Be Love's Houston presence.",
    status: "pending",
    discoveredAt: "2026-04-07T08:00:00",
    calendarAdded: false,
  },
];
