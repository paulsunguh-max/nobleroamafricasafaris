import { SafariPackage, AdvisorReview } from '../types';

export const HERO_SLIDES = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThf8k4Y7Z2xMGK3sUB7euU0MiI9RN05_NH4ELh0ish1g&s=10",
    title: "Pink Flamingo Rift Lakes",
    tagline: "Behold Lake Nakuru and Naivasha water basins from clifftops turned pink by millions of lesser flamingos.",
    location: "Lake Nakuru & Great Rift Valley"
  },
  {
    image: "https://tse1.explicit.bing.net/th/id/OIP.CzXIzm_k58lams6Jm95M9wHaEb?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "The Air Sovereign Safari",
    tagline: "Glide above Kenya's classic gold-dusted Mara plains in dawn hot air balloons and private executive Cessna aircraft.",
    location: "Maasai Mara Airspace"
  },
  {
    image: "https://live.staticflickr.com/65535/48906177251_c7678bbd90_b.jpg",
    title: "Legends of the Savannah",
    tagline: "Observe majestic elephant families walking on the yellow grasslands of the legendary Maasai Mara.",
    location: "Maasai Mara Grasslands"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRh46o9Hx-KXMxZmgMBBaH6F5aI-6FN3o_7qCOyWoCPq5G6UHJuj7245g&s=10",
    title: "Amboseli's Colossal Tuskers",
    tagline: "Awaken to the dramatic rising snow peaks of Kilimanjaro as ancient herds gather in the marshes of Amboseli.",
    location: "Amboseli Wilderness & Swamps"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJuQV6vNL_stB534eZVHPuL24FlngerJxGeartSh6YCg&s=10",
    title: "Sovereign Leopard Territory",
    tagline: "Track the elusive and elegant african leopards resting high on yellow acacia tree branches.",
    location: "Samburu & Mara Conservancies"
  },
  {
    image: "https://media.istockphoto.com/id/154007163/photo/line-of-lions.jpg?s=612x612&w=0&k=20&c=_7qhkK-xWzNAvtU37aeA7Q6gnQYcQIIiBSG1hEaSpEs=",
    title: "Apex Prides of Maasai Mara",
    tagline: "Encounter legendary Panthera Leo prides resting on granite kopjes and surveying their sweeping territories.",
    location: "Maasai Mara Core"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLPaZ2-htnwoIYbqYLW94isVdgUijdvgc1yJXUKaC2zFnefeHGEX89cZ0O&s=10",
    title: "Lake Naivasha Zebra Oasis",
    tagline: "Watch graceful plains zebra herds quenching their thirst at Lake Naivasha's freshwater margins.",
    location: "Lake Naivasha Escarpment"
  },
  {
    image: "https://cheetahconservationinitiative.com/storage/2022/02/Serengeti_Cheetah_Project_01.jpg",
    title: "The Serengeti Cheetah Stalk",
    tagline: "Encounter the world's fastest land mammal surveying flat grasslands for optimal high-speed chases.",
    location: "Serengeti & Mara Basins"
  },
  {
    image: "https://tishfarrell.com/wp-content/uploads/2025/07/img519sq_thumb.jpg?w=1202&h=1202",
    title: "Tsavo's Red-Earth Colossus",
    tagline: "Witness majestic giant elephants dusting themselves in the iconic crimson soil of Tsavo's volcanic hills.",
    location: "Tsavo West Red Wilderness"
  },
  {
    image: "https://cdn.shortpixel.ai/spai2/q_lossless+w_1082+to_auto+ret_img/www.fauna-flora.org/wp-content/uploads/2017/09/AdobeStock_337103452.jpeg",
    title: "Lewa Black Rhino Domain",
    tagline: "Explore the highly secure private wildlife corridors where critically endangered black rhinos wander freely.",
    location: "Lewa Wildlife Conservancy"
  },
  {
    image: "https://as1.ftcdn.net/v2/jpg/09/02/10/64/1000_F_902106462_7FqucsJsYrw7QruRqnSNu8SMi9brzlSL.jpg",
    title: "The Great Savannah Sunset",
    tagline: "Admire a lively giraffe family silhouetted elegantly against a colossal glowing equatorial sun.",
    location: "Great Rift Valley Highlands"
  },
  {
    image: "/src/assets/images/african_fish_eagle_1783006787786.jpg",
    title: "Mount Kenya Alpine Sanctuary",
    tagline: "Behold the African fish eagle soaring peacefully in the high alpine border sky near Mount Kenya's glaciers.",
    location: "Mount Kenya Forest Border"
  }
];

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: "sov-crown",
    title: "The Sovereign Crown of East Africa",
    tagline: "Our ultimate signature flight safari bridging the supreme sanctuaries of Kenya and Tanzania.",
    durationDays: 10,
    featuredImage: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=800"
    ],
    destinations: ["Nairobi", "Amboseli National Park", "Maasai Mara Reserve", "Great Rift Valley Lakes"],
    lodges: ["Hemingways Nairobi", "Elewana Tortilis Camp", "Angama Mara Ultimate Retreat"],
    priceEstUsd: 14750,
    maxGroupSize: 6,
    highlights: [
      "Private Charter flight hopping bypassing standard dusty transfers",
      "Sojourn in Angama Mara, suspended 1,000 feet above the Great Rift valley",
      "Private Maasai warrior guided trail along the Mara Escarpment edge",
      "Extravagant champagne bush breakfast in the wild plains"
    ],
    experienceType: "Sky Safari",
    itinerary: [
      {
        day: 1,
        title: "Welcome to the Equator",
        location: "Nairobi",
        lodging: "Hemingways Nairobi (Boutique Luxury)",
        description: "Your VIP airport agent whisks you through customs to your private chauffeur. Retreat to Hemingways Nairobi, an elegant plantation-style sanctuary. Meet your private Safari Director tonight over a curated fine dining presentation.",
        activities: ["VIP Meet & Greet", "Estate Gardens Cocktail", "Briefing Dinner"]
      },
      {
        day: 2,
        title: "Flight to Elephants' Shadow",
        location: "Amboseli National Park",
        lodging: "Elewana Tortilis Camp",
        description: "Board our executive-cabin aircraft for a short, direct flight to Amboseli. Witness Mount Kilimanjaro rising majestically on the horizon. Your open-sided 4x4 cruiser takes you on your first drive as majestic patriarch herds cross the dust lanes.",
        activities: ["Scenic Flight", "Afternoon Game Drive", "Sunset Sundowner"]
      },
      {
        day: 3,
        title: "Ancient Tuskers & Conservation",
        location: "Amboseli Wilderness",
        lodging: "Elewana Tortilis Camp",
        description: "Encounter Amboseli's colossal bull elephants up close on an exclusive morning drive. Spend the afternoon speaking with Kenya Wildlife Service rangers to learn about the critical anti-poaching initiatives and human-wildlife harmony.",
        activities: ["Sunrise Game Drive", "Ranger Headquarters Visit", "Maasai Guided Walk"]
      },
      {
        day: 4,
        title: "Fly Into the Jewel of Africa",
        location: "Maasai Mara National Reserve",
        lodging: "Angama Mara (Ultra-Luxe Pavilions)",
        description: "Float by light aircraft over the striking Rift Valley before touching down on the Maasai Mara ridge. Ascend to Angama Mara, a marvel of contemporary architecture where tents feature floor-to-ceiling glass looking down onto the plains where Out of Africa was filmed.",
        activities: ["Great Rift Crossing Scenic Flight", "Panoramic Sunset Escarpment Deck Drink"],
        itinerary: []
      } as any,
      {
        day: 5,
        title: "Prides of the Mara Reserve",
        location: "Maasai Mara Reserve",
        lodging: "Angama Mara",
        description: "Dive deep into the reserve search. Witness massive prides of lions resting beneath acacia shade trees, gazelles flanking stream edges, and cheetahs patrolling volcanic termite heaps. Return to canopied high tea.",
        activities: ["Full Day Big Five Safari", "Esplanade Star-view Dinner", "Bush Barbeque Night"]
      },
      {
        day: 6,
        title: "The Out of Africa Horizon Celebration",
        location: "Maasai Mara",
        lodging: "Angama Mara",
        description: "Celebrate your final Mara night. Experience the dramatic Mara sunset over the famous Mara Triangle where the wildebeests feed. Finish with Maasai traditional dances under a massive roaring campfire.",
        activities: ["Out of Africa Hill Walking Safaris", "Champagne Sundowners", "Tribal Fire Ceremony"]
      },
      {
        day: 7,
        title: "A Farewell to the Great Savanna",
        location: "Nairobi",
        lodging: "Day Room: Hemingways Nairobi",
        description: "Savor a final morning birding walking trail, then join our sky shuttle back to Nairobi. Savor some local curating, craft shopping, and enjoy your executive day room suite before boarding your international flight home.",
        activities: ["Morning Walking Safari", "Sky Shuttle transfer", "International Departure Lounge Transfer"]
      }
    ]
  },
  {
    id: "great-rift-lakes",
    title: "Sovereign Lakes & Pink Flamingos Sanctuary",
    tagline: "A magnificent expedition exploring the Great Rift Valley's lakes, volcanic springs, and waterbird spectacles.",
    durationDays: 7,
    featuredImage: "https://onlybyland.com/wp-content/uploads/2025/08/Large-flock-of-pink-flamingos-at-Djoudj-National-Bird-Sanctuary-e1756006072466.jpeg",
    gallery: [
      "https://images.unsplash.com/photo-1501535085622-c340fa7f54fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800"
    ],
    destinations: ["Nairobi", "Lake Nakuru National Park", "Lake Naivasha Oasis", "Hell's Gate National Park"],
    lodges: ["Hemingways Nairobi", "The Cliff Nakuru (Ultra-Luxe Tents)", "Loldia House (Naivasha Escarpment)"],
    priceEstUsd: 10500,
    maxGroupSize: 4,
    highlights: [
      "Private boat excursions in Lake Naivasha to spot colossal hippo pods and fish eagles",
      "Scenic sunset cocktails overlooking the pink flamingo shorelines of Lake Nakuru",
      "Behind-the-scenes rhino tracking with sanctuary naturalists on Nakuru's ridges",
      "Stately luxury suites resting directly on ancient volcanic escarpment boundaries"
    ],
    experienceType: "Bespoke Private",
    itinerary: [
      {
        day: 1,
        title: "Ascend to the African Sky",
        location: "Nairobi",
        lodging: "Hemingways Nairobi",
        description: "Fast-track airport escort and direct luxury transfer. Settle under Nairobi's garden plantations and enjoy customized refreshments.",
        activities: ["VIP Fast-track Customs", "Plantation Welcome Cocktails"]
      },
      {
        day: 2,
        title: "The Flight into the Rift Valley",
        location: "Lake Nakuru National Park",
        lodging: "The Cliff Nakuru (Suspended Escarpment Tents)",
        description: "Private charter flight over the steep rift wall. Set foot in Lake Nakuru, world-renown for its massive flamingo flocks. Ascend to The Cliff, a 10-tent luxury retreat hanging over the lake's pristine waters.",
        activities: ["Executive Air Charter", "Rift Valley Ridge Walk", "Sunset Escarpment Cocktails"]
      },
      {
        day: 3,
        title: "Pink Shorelines & Rhino Guardianship",
        location: "Lake Nakuru National Park",
        lodging: "The Cliff Nakuru",
        description: "Search for endangered Black and White Rhinos that roam Nakuru's yellow fever-tree forests. Walk safely near the salt lake shores surrounded by millions of feeding waterbirds and majestic pelicans.",
        activities: ["Pre-dawn Salt Lake Track", "Anti-poaching Sanctuary Patrol", "Clifftop Evening Dining"]
      },
      {
        day: 4,
        title: "The Oasis of Lake Naivasha",
        location: "Lake Naivasha Escarpment",
        lodging: "Loldia House (Vintage Luxury)",
        description: "A gorgeous highway hop to Lake Naivasha, a gorgeous freshwater lake set among acacia forests. Arrive to Loldia House, an authentic farmhouse with sprawling green lawns and grazing zebras.",
        activities: ["Lake Naivasha Private Boat Safari", "Overlook bird sanctuary path", "Gourmet Garden High Tea"]
      },
      {
        day: 5,
        title: "Gorge Pillars & Volcanic Gates",
        location: "Hell's Gate National Park",
        lodging: "Loldia House",
        description: "Explore the striking basalt cliffs and natural geothermal hot springs of Hell's Gate. Take a scenic trail through obsidian towers and savannah, followed by a romantic night drive on Loldia's private ranch.",
        activities: ["Hell's Gate Obsidian Trail", "Night Stalk Predator Search", "Gourmet Lakeside Banquets"]
      },
      {
        day: 6,
        title: "Rift Valley Farewell",
        location: "Nairobi Departure",
        lodging: "Day Suite: Hemingways Nairobi",
        description: "One last birding walk along the Lake Naivasha shores, then your private flyer takes you back to Nairobi for dinner and check-in to your international return flight.",
        activities: ["Freshwater Shoreline Trek", "Flyback Flight Out"]
      }
    ]
  },
  {
    id: "migration-sav",
    title: "Sovereign Migration Explorer",
    tagline: "Witness the legendary Great Migration across Maasai Mara and the Serengeti Basin.",
    durationDays: 8,
    featuredImage: "https://tse3.mm.bing.net/th/id/OIP.iMstglTzj81_2i8-OKdedQHaD5?rs=1&pid=ImgDetMain&o=7&rm=3",
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=800"
    ],
    destinations: ["Nairobi", "Maasai Mara Migration Path", "Serengeti National Park border"],
    lodges: ["Hemingways Nairobi", "Mara Plains Camp (National Geographic Preferred)"],
    priceEstUsd: 11950,
    maxGroupSize: 4,
    highlights: [
      "Extremely small group size maxing at 4 privileged guests per vehicle",
      "Strategic camping near Mara River crossing hotspots",
      "Sensational professional wildlife lenses provided complimentary inside cruisers",
      "Night photography safaris using specialized military-grade IR spotlights"
    ],
    experienceType: "Small Group Journey",
    itinerary: [
      {
        day: 1,
        title: "Welcome to Nairobi Heritage",
        location: "Nairobi",
        lodging: "Hemingways Nairobi",
        description: "Arrive in Nairobi, where you are checked into our designated sanctuary suites. Rest and recover from your flight.",
        activities: ["Private Airport Greeting", "Rest & Relaxation"]
      },
      {
        day: 2,
        title: "The Flight of the Monarchs",
        location: "Maasai Mara Borderlands",
        lodging: "Mara Plains Elite Safaritents",
        description: "Board early sky craft directly into the heart of the Olare Motorogi Conservancy, bordering the primary Maasai Mara park. Meet your expert migration spotter.",
        activities: ["Rift Ridge Flyover", "Olare Motorogi Night Track"]
      },
      {
        day: 3,
        title: "The Heartbeat of the Great Crossing",
        location: "Maasai Mara River Boundaries",
        lodging: "Mara Plains Camp",
        description: "Awake at pre-dawn. Sit in silent anticipation alongside river bends watching tens of thousands of wildebeest and zebras mass. Witness the monumental river dash first-hand.",
        activities: ["Full Day River Monitoring", "Sunset Hilltop Champagne Spotting"]
      },
      {
        day: 4,
        title: "Unraveling Mara's Big Cat Dynasties",
        location: "Maasai Mara Core",
        lodging: "Mara Plains Camp",
        description: "Track the world-famous Marsh Pride of lions and legendary leopards that rule the rocky outcrops of the Mara plains.",
        activities: ["Predator focused drives", "Acacia Shade Lunch", "Sundowner Gin & Tonics"]
      },
      {
        day: 5,
        title: "Tribal Hermitage & Heritage Walk",
        location: "Maasai Village Lands",
        lodging: "Mara Plains Camp",
        description: "Visit an authentic manyatta (Maasai homestead) through the personal familial relationships of your guides. Understand local life, herbs, and heritage.",
        activities: ["Maasai Community Bush Immersion", "Bush Dinner Event"]
      },
      {
        day: 6,
        title: "Skyward Whispers over Mara",
        location: "Maasai Mara Airspace",
        lodging: "Mara Plains Camp",
        description: "Float effortlessly in a hot air balloon over the Mara River at dawn. Conclude with a lavish gourmet bush breakfast with champagne flowing. Rest in luxury tents during the heat of noon.",
        activities: ["Dawn Hot Air Balloon Safari", "Plains Champagne Feast", "Night Predators Stalking"]
      },
      {
        day: 7,
        title: "Savannah Whispers Farewell",
        location: "Maasai Mara to Nairobi",
        lodging: "Hemingways Nairobi (Day Lounge)",
        description: "Take one final sweeping game drive, then return of flight to Nairobi. Relish a celebratory steak at the famous Carnivore or dining hall before leaving Africa.",
        activities: ["Morning Hunt Game Drive", "Air Shuttle To Nairobi", "VIP Airport Transfer"]
      }
    ]
  },
  {
    id: "samb-lewa",
    title: "Samburu & Lewa Northern Wilderness",
    tagline: "Uncover Northern Kenya's rare species: Gerenuk, Somali Ostrich, and Grevy's Zebra in pristine reserves.",
    durationDays: 8,
    featuredImage: "https://africageographic.com/wp-content/uploads/2021/12/4-1.jpg",
    gallery: [
      "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/102336971/1200",
      "https://africafreak.com/wp-content/uploads/2020/05/Grevy%E2%80%99s-zebra-portrait.jpg"
    ],
    destinations: ["Nairobi", "Samburu Reserve", "Lewa Wildlife Conservancy"],
    lodges: ["Hemingways Nairobi", "Sasaab Luxury Lodge (Samburu)", "Lewa Wilderness Retreat"],
    priceEstUsd: 13400,
    maxGroupSize: 6,
    highlights: [
      "Behold the 'Samburu Special Five' found nowhere else",
      "Stunning Moroccan-style luxury clifftop pool villas with view of Ewaso Nyiro River",
      "Lewa Conservancy behind-the-scenes tracking of Critically Endangered Black Rhinos",
      "Scenic private camel trek alongside nomadic Samburu warriors"
    ],
    experienceType: "Bespoke Private",
    itinerary: [
      {
        day: 1,
        title: "Land under Mount Kenya",
        location: "Nairobi",
        lodging: "Hemingways Nairobi",
        description: "Arrival, private briefing in our beautiful estate, high tea, relaxation.",
        activities: ["Aviation Meet", "VIP Private Dinner"]
      },
      {
        day: 2,
        title: "Across the Equator to Samburu",
        location: "Samburu National Reserve",
        lodging: "Sasaab Clifftop Lodge",
        description: "Board our safari plane directly to Samburu. Watch the lush landscapes transition to crimson soils of the arid north. Arrive at Sasaab, a Moroccan-inspired luxury camp perched on an escarpment.",
        activities: ["Private Aircraft transit", "Afternoon Riverbed Drive", "Private Plunge Pool Leisure"]
      },
      {
        day: 3,
        title: "Sighting the Special Five",
        location: "Samburu Reserve",
        lodging: "Sasaab Clifftop Lodge",
        description: "Embark on an epic track for Samburu's famed special 5: the long-necked Gerenuk, Reticulated Giraffe, Grevy's Zebra, Beisa Oryx, and Somali Ostrich.",
        activities: ["Special Five Safari Tracking", "Camel Safari Along Ewaso Nyiro River"]
      },
      {
        day: 4,
        title: "Sanctuary of the Ancient Horn",
        location: "Lewa Wildlife Conservancy",
        lodging: "Lewa Wilderness Retreat",
        description: "Fly south into Lewa, a world leader in private Rhino and Cheetah recovery. Retreat to Lewa Wilderness, an original ranch house filled with decades of safari books and heirloom objects.",
        activities: ["Conservancy Scenic Flight", "Rhino Patrol with Lewa Guardians"]
      },
      {
        day: 5,
        title: "Canopied Horseback & Canopy Safaris",
        location: "Lewa Conservancy",
        lodging: "Lewa Wilderness Retreat",
        description: "Ride horseback right alongside wild herds of zebras, elands, and giraffes who view horses as fellow plains species. Walk across tree-canopy bridges in the Ngare Ndare forest.",
        activities: ["Morning Horseback Safari (Optional)", "Ngare Ndare Waterfall Trail & Canopy Bridge Walk"]
      },
      {
        day: 6,
        title: "Chyulu Hill Whisperers & Farewell",
        location: "Nairobi",
        lodging: "Departure Day",
        description: "Fly back from Lewa to Nairobi to share stories, shop regional treasures, and connect with your onward flight.",
        activities: ["Traditional Beading Workshop", "Flyback Flight Out"]
      }
    ]
  },
  {
    id: "tsavo-colossus",
    title: "Tsavo & Amboseli Elephant Sanctuary Hunt",
    tagline: "Uncover the red-earthed wilderness where giant elephants scale ancient cinder cones.",
    durationDays: 6,
    featuredImage: "https://tishfarrell.com/wp-content/uploads/2025/07/img519sq_thumb.jpg?w=1202&h=1202",
    gallery: [
      "https://tishfarrell.com/wp-content/uploads/2025/07/img519sq_thumb.jpg?w=1202&h=1202",
      "https://tishfarrell.com/wp-content/uploads/2025/07/img519sq_thumb.jpg?w=1202&h=1202"
    ],
    destinations: ["Nairobi", "Tsavo West National Park", "Amboseli Wilderness & Plains"],
    lodges: ["Hemingways Nairobi", "Finch Hattons Luxury Camp", "Elewana Tortilis Camp"],
    priceEstUsd: 9200,
    maxGroupSize: 6,
    highlights: [
      "Walking safaris across the Shatani black lava flows with naturalists",
      "Sojourn in the award-winning luxury tents of Finch Hattons deep inside Tsavo",
      "Behind-the-scenes water sensor tracking in volcanic Mzima springs",
      "Observe Amboseli's elephant matriarch families wading across green marshes at sunset"
    ],
    experienceType: "Bespoke Private",
    itinerary: [
      {
        day: 1,
        title: "Welcome to the Equator Highlands",
        location: "Nairobi",
        lodging: "Hemingways Nairobi",
        description: "Arrive in Nairobi, fast-track customs clearance, private orientation dinner with your lead pilot.",
        activities: ["VIP Meet & Greet", "Curated Orientation Dinner"]
      },
      {
        day: 2,
        title: "Fly to Tsavo's Red Earth",
        location: "Tsavo West National Park",
        lodging: "Finch Hattons Luxury Camp",
        description: "Scenic charter flight hopping directly over volcanic valleys to Tsavo. Check in at Finch Hattons and proceed for sunset safari.",
        activities: ["Rift Ridge scenic flight", "Volcanic cinder game drive", "Sundowners overlooking pool"]
      },
      {
        day: 3,
        title: "The Volcanic Springs",
        location: "Tsavo West",
        lodging: "Finch Hattons Luxury Camp",
        description: "Walk with rangers near the crystal blue pools of Mzima springs, checking the sensors and monitoring hippo pods.",
        activities: ["Mzima Springs Walking Trail", "Afternoon big herds hunt", "Elite gourmet canvas dinning"]
      },
      {
        day: 4,
        title: "Under Kilimanjaro's Peak",
        location: "Amboseli National Park",
        lodging: "Elewana Tortilis Camp",
        description: "Depart Tsavo via flight straight to Amboseli. Watch the marsh lakes reflecting the gorgeous snow peaks of Mount Kilimanjaro.",
        activities: ["Sky safari crossing", "Marshland elephant walk drive", "Star esplanade fireside briefing"]
      },
      {
        day: 5,
        title: "The Grand Patriarchs",
        location: "Amboseli",
        lodging: "Elewana Tortilis Camp",
        description: "Spend a full day tracking spectacular ancient elephant bulls with massive husks crossing the flat saltpans.",
        activities: ["Sunrise marshes game drive", "KWS conservation center visit", "Maasai warrior tribal dinner"]
      },
      {
        day: 6,
        title: "Return to Nairobi Oasis",
        location: "Nairobi",
        lodging: "Departure Day",
        description: "Sky Shuttle straight to Nairobi for last minute regional shopping items and VIP airport departure lounge transfer.",
        activities: ["Scenic flight back", "Day Use Lounge", "Airport flight shuttle"]
      }
    ]
  },
  {
    id: "laikipia-highlands",
    title: "Laikipia & Mount Kenya Forest Wilderness",
    tagline: "A magnificent expedition exploring Northern Kenya's ultra-private rhino sanctuaries and wild canine conservation fields.",
    durationDays: 9,
    featuredImage: "https://media.savetherhino.org/prod/uploads/2018/04/APLRS5-600x400.png",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800"
    ],
    destinations: ["Nairobi", "Laikipia Plateau", "Ol Pejeta Sanctuary", "Mount Kenya Forest border"],
    lodges: ["Hemingways Nairobi", "Segera Retreat (Luxury Villas)", "Ol Jogi Luxury Private Estate"],
    priceEstUsd: 15800,
    maxGroupSize: 4,
    highlights: [
      "Exclusive access inside Segera's private sculpture gardens and wildlife corridors",
      "Observe and support critically endangered Eastern Black Rhinos in Ol Pejeta",
      "Private spectacular helicopter flight directly over Mount Kenya's glacier crevices",
      "Night tracking of wild dog packs with scientific conservation monitors"
    ],
    experienceType: "Sky Safari",
    itinerary: [
      {
        day: 1,
        title: "Welcome to Nairobi Heritage",
        location: "Nairobi",
        lodging: "Hemingways Nairobi",
        description: "VIP private landing transfer, high tea, spa, and orientation session.",
        activities: ["Aviation briefing", "Gourmet Garden Welcome Dining"]
      },
      {
        day: 2,
        title: "Fly to Laikipia High Plateau",
        location: "Laikipia Plateau",
        lodging: "Segera Retreat",
        description: "Short charter flight over the lush highlands to Laikipia's private conservancies.",
        activities: ["Executive flyover transit", "Afternoon plains tracking", "Private luxury villa relaxation"]
      },
      {
        day: 3,
        title: "Art Trails & Conservation",
        location: "Segera Retreat",
        lodging: "Segera Retreat",
        description: "Explore the incredible outdoor sculpture museum, then take customized drives to monitor leopards.",
        activities: ["Sculpture Gallery walk", "Sunset plateau drive", "High-altitude wine tasting"]
      },
      {
        day: 4,
        title: "The Rhino Sovereigns",
        location: "Ol Pejeta Sanctuary",
        lodging: "Segera Retreat",
        description: "Track black rhinos with Ol Pejeta K9 counter-poaching units and researchers.",
        activities: ["Ol Pejeta rhino walk", "Behind scenes protection talk", "Fireside bush barbeque"]
      },
      {
        day: 5,
        title: "Helicopter over Snow Peaks",
        location: "Mount Kenya Forest border",
        lodging: "Ol Jogi Luxury Private Estate",
        description: "A breathtaking helicopter trip hopping around Mount Kenya's jagged mountain peak boundaries.",
        activities: ["Scenic Glacier helicopter ride", "Mount Kenya forest stream fishing", "High-altitude picnic"]
      },
      {
        day: 6,
        title: "Sovereign Canine Search",
        location: "Ol Jogi Savanna",
        lodging: "Ol Jogi Estate",
        description: "Follow researchers deep in the bush tracking the highly elusive African Wild Dogs.",
        activities: ["Early morning canine patrol", "Obsidian mountain ridge walk", "Elite private estate banquet"]
      },
      {
        day: 7,
        title: "Highlands Farwell",
        location: "Nairobi",
        lodging: "Departure Day",
        description: "Fly back from Ol Jogi airstrip straight to Nairobi Karen, preparing for your international departure flights.",
        activities: ["Plains walk", "Sky shuttle transfer", "Nairobi airport transfer"]
      }
    ]
  }
];

export const CLIENT_REVIEWS: AdvisorReview[] = [
  {
    id: "rev-1",
    clientName: "Sovereign Wildlife Observers Guild",
    residence: "Geneva, Switzerland",
    quote: "Absolute perfection from the private Cessna charters to the escarpment views at Lake Nakuru. Watching millions of flamingos rise at pre-dawn was like looking at a live celestial canvas. Pristine, custom execution.",
    rating: 5,
    safariTaken: "Sovereign Lakes & Pink Flamingos Sanctuary",
    image: "https://cdn.shortpixel.ai/spai2/q_lossless+w_1082+to_auto+ret_img/www.fauna-flora.org/wp-content/uploads/2017/09/AdobeStock_337103452.jpeg"
  },
  {
    id: "rev-2",
    clientName: "National Geographic Affiliate Guild",
    residence: "Tokyo, Japan",
    quote: "Seeing the Mara River crossing is a lifetime dream, but having private high-grade camera setups, expert local animal track paths, and absolutely zero tourist crowds let us capture pristine award-winning photographs.",
    rating: 5,
    safariTaken: "Sovereign Migration Explorer",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "rev-3",
    clientName: "Great African Rift Ornithological Group",
    residence: "Vienna, Austria",
    quote: "The boat safari on Lake Naivasha is filled with rare fish eagles, massive hippo pods, and volcanic backgrounds. Truly specialized naturalists made our Rift Valley lakes exploration spectacular.",
    rating: 5,
    safariTaken: "Sovereign Lakes & Pink Flamingos Sanctuary",
    image: "https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=300"
  }
];
