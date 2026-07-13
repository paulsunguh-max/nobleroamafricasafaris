import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import { 
  Compass, 
  Map as MapIcon, 
  Layers, 
  Eye, 
  Info, 
  Award, 
  Wind, 
  TrendingUp, 
  Trees,
  CheckCircle2,
  Image as ImageIcon,
  Search,
  Loader2
} from 'lucide-react';

interface WildlifeSpotlight {
  name: string;
  scientific: string;
  status: string;
  popTrend: string;
  description: string;
  image: string;
}

interface DestinationData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  tagline: string;
  description: string;
  elevation: string;
  soil: string;
  density: string;
  image: string;
  wildlifeSpotlights: WildlifeSpotlight[];
}

const DESTINATIONS: DestinationData[] = [
  {
    id: 'mara',
    name: 'Maasai Mara',
    lat: -1.529,
    lng: 35.126,
    tagline: 'Sovereign Savannah & Apex Predators',
    description: "Kenya's flagship wilderness. Home of the legendary Great Migration, vast short-grass savannah plains, and the highest concentrated big cat density on Earth.",
    elevation: '1,500m - 2,100m',
    soil: 'Volcanic ash loam & black cotton clay',
    density: '9.8 / 10',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Mara Lion Pride',
        scientific: 'Panthera leo',
        status: 'Vulnerable (KWS Monitored)',
        popTrend: 'Stable (Noble Roam Protection Patrol)',
        description: 'Vibrant, closely bonded family prides stalking migratory wildebeest herds. Famous for high cooperation in savannah hunting strategy.',
        image: 'https://images.unsplash.com/photo-1614027164847-1b2809eb7b9b?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Savannah Cheetah',
        scientific: 'Acinonyx jubatus',
        status: 'Vulnerable',
        popTrend: 'Decreasing globally / Protected locally',
        description: 'Masters of high-speed chases across Mara\'s classic flat grassland plains. Relying on sheer sight and agility.',
        image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Leopard',
        scientific: 'Panthera pardus',
        status: 'Vulnerable',
        popTrend: 'Decreasing / Tree Canopy dweller',
        description: 'Reclusive guardians of the riverine fig tree forests. Excellent climbers that cache their prey in branches away from hyenas.',
        image: 'https://images.unsplash.com/photo-1602491453979-54a3a4566f2c?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'victoria',
    name: 'Lake Victoria Basin',
    lat: -0.450,
    lng: 34.300,
    tagline: 'Rusinga, Mfangano & Bird Islands Sanctuary',
    description: "The largest tropical lake on Earth. Its pristine shores and islands boast incredible archaeological wonders on Rusinga Island, rich fishing traditions around Mfang'ano Island, and amazing ornithology at Bird Island / Fishing Island.",
    elevation: '1,133m',
    soil: 'Alluvial lacustrine soil & volcanic silt',
    density: '8.8 / 10',
    image: 'https://images.unsplash.com/photo-1543730812-74c0a52d25d7?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Spotted-Necked Otter',
        scientific: 'Hydrictis maculicollis',
        status: 'Near Threatened',
        popTrend: 'Stable in Lake Victoria sanctuaries',
        description: 'Highly active, playful otters swimming along the rocky lake shores of Rusinga and Mfangano.',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'African Fish Eagle',
        scientific: 'Haliaeetus vocifer',
        status: 'Least Concern',
        popTrend: 'Stable',
        description: 'Majestic raptor famed for its haunting, iconic call echoing over Bird Island and traditional fishing channels.',
        image: '/assets/images/african_fish_eagle_1783006787786.jpg'
      }
    ]
  },
  {
    id: 'amboseli',
    name: 'Amboseli',
    lat: -2.727,
    lng: 37.256,
    tagline: 'Under Kilimanjaro & Elephant Legacies',
    description: "Waking to the spectacular rising peaks of Kilimanjaro as ancient, giant tuskers gather in glacially-fed marshes, presenting unmatched scenic contrasts.",
    elevation: '1,150m',
    soil: 'Alkaline lake silt & volcanic dust',
    density: '9.2 / 10',
    image: 'https://images.unsplash.com/photo-1581850518616-bcb8077fa213?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'African Bush Elephant',
        scientific: 'Loxodonta africana',
        status: 'Endangered',
        popTrend: 'Increasing in Amboseli Basin',
        description: 'Legendary big tuskers roaming in ancient multi-generational matriarchal herds, closely protected from poaching by AMREF and Maasai ranger units.',
        image: 'https://images.unsplash.com/photo-1581850518616-bcb8077fa213?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Hippopotamus',
        scientific: 'Hippopotamus amphibius',
        status: 'Vulnerable',
        popTrend: 'Stable',
        description: 'Basking in the lush, continuous Ol Tukai swamps. They emerge at night to graze on the surrounding volcanic savannah pasture.',
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'nakuru',
    name: 'Lake Nakuru',
    lat: -0.367,
    lng: 36.083,
    tagline: 'The Crimson Ribbon & Rhino Sanctuary',
    description: "An alkaline soda lake nestled deep inside the Great Rift Valley, renowned for millions of pink flamingos and acting as Kenya's premier sanctuary for highly endangered rhinos.",
    elevation: '1,754m',
    soil: 'Soda-rich volcanic silt & Acacia sediment',
    density: '8.7 / 10',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'White & Black Rhinoceros',
        scientific: 'Diceros bicornis',
        status: 'Critically Endangered',
        popTrend: 'Increasing via Noble Roam supported patrols',
        description: 'Crucial heavily-guarded sanctuary providing safe habitats for both square-lipped white rhinos and browse-loving black rhinos.',
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Lesser Flamingo',
        scientific: 'Phoeniconaias minor',
        status: 'Near Threatened',
        popTrend: 'Fluctuating by water conditions',
        description: 'Stately crimson-beaked filter-feeders consuming spirulina algae. They turn the shoreline into a spectacular rippling pink carpet.',
        image: 'https://images.unsplash.com/photo-1512411993211-f1f337fa255b?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'serengeti',
    name: 'Serengeti',
    lat: -2.154,
    lng: 34.685,
    tagline: 'Endless Plains & Great Migration',
    description: "Tanzania's crown jewel. Seamlessly continuing the Maasai Mara ecosystem, it hosts the world's largest overland migration of over two million wildebeest, zebras, and apex carnivores.",
    elevation: '920m - 1,850m',
    soil: 'Rich volcanic ash & high-nutrient savannah clay',
    density: '9.9 / 10',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Migratory Wildebeest',
        scientific: 'Connochaetes taurinus',
        status: 'Least Concern',
        popTrend: 'Increasing / Dynamic Cyclical Herd',
        description: 'Over two million wildebeest executing their spectacular annual circular migration in search of fertile green grasses.',
        image: 'https://images.unsplash.com/photo-1581850518616-bcb8077fa213?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'ngorongoro',
    name: 'Ngorongoro Crater',
    lat: -3.175,
    lng: 35.580,
    tagline: 'The Closed Caldera Haven & Old Genes',
    description: "The world's largest intact, unfilled volcanic caldera. It forms a breathtaking natural amphitheater where over 25,000 large mammals thrive inside deep escarpment walls.",
    elevation: '2,286m Rim / 1,800m Floor',
    soil: 'Rich volcanic alluvial sediment & swamp peat',
    density: '9.7 / 10',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Crater Black Rhino',
        scientific: 'Diceros bicornis michaeli',
        status: 'Critically Endangered',
        popTrend: 'Highly Stable inside Caldera walls',
        description: 'Elite population of black rhinos protected by the crater\'s natural barriers and 24/7 dedicated anti-poaching forces.',
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'bwindi',
    name: 'Bwindi Forest',
    lat: -1.050,
    lng: 29.680,
    tagline: 'Gorillas in the Mist & Primordial Rainforest',
    description: "Uganda's legendary dense rainforest. Home to roughly half of the world's remaining endangered Mountain Gorillas, nested in misty, high-altitude valleys.",
    elevation: '1,160m - 2,607m',
    soil: 'Deep humic acidic rainforest loam',
    density: '9.4 / 10',
    image: 'https://images.unsplash.com/photo-1590418606746-018840f9cd0f?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Mountain Gorilla',
        scientific: 'Gorilla beringei beringei',
        status: 'Endangered',
        popTrend: 'Increasing through strict park ranger guard',
        description: 'Incredible gentle giants. Watch majestic silverbacks lead their closely knit, expressive families in deep forest canopies.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'pejeta',
    name: 'Ol Pejeta',
    lat: 0.043,
    lng: 36.961,
    tagline: 'Last of the Giants & Mount Kenya Shadows',
    description: "A state-of-the-art conservancy situated directly on the Equator with views of Mount Kenya. Famed for sheltering the world's last two remaining Northern White Rhinos.",
    elevation: '1,800m',
    soil: 'Black cotton soil & high-plateau grassland',
    density: '9.5 / 10',
    image: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Northern White Rhino',
        scientific: 'Ceratotherium simum cottoni',
        status: 'Functional Extinction (In-Vitro efforts)',
        popTrend: 'Highly Protected (Only 2 remain on Earth)',
        description: 'The final two female individuals (Najin & Fatu) protected 24/7 by armed guards. Genetic research is actively taking place to revive the species.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Sweetwaters Chimpanzee',
        scientific: 'Pan troglodytes',
        status: 'Endangered',
        popTrend: 'Protected Sanctuary',
        description: 'Providing lifelong refuge to orphaned and rescued chimpanzees in a lush riverine island environment, in partnership with Jane Goodall Institute.',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'samburu',
    name: 'Samburu',
    lat: 0.573,
    lng: 37.545,
    tagline: 'Semi-Arid Wilds & Samburu Special Five',
    description: "A beautiful, rugged arid reserve in northern Kenya dissected by the Ewaso Nyiro River. Famous for the unique 'Samburu Special Five' species adapted to dry zones.",
    elevation: '1,200m',
    soil: 'Sandy red soil, alluvial silt & palm groves',
    density: '8.9 / 10',
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Reticulated Giraffe',
        scientific: 'Giraffa camelopardalis reticulata',
        status: 'Endangered',
        popTrend: 'Decreasing / Arid specialist',
        description: 'Features an exquisite geometric, net-like chestnut coat pattern separated by sharp white lines. Unique to northern semi-arid woodlands.',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Gerenuk (Giraffe Gazelle)',
        scientific: 'Litocranius walleri',
        status: 'Near Threatened',
        popTrend: 'Stable in arid zones',
        description: 'An elegant long-necked antelope that stands erect on its hind legs to browse tender acacia leaves that other gazelles cannot reach.',
        image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'mtkenya',
    name: 'Mount Kenya',
    lat: -0.152,
    lng: 37.308,
    tagline: 'Alpine Peaks & Sacred Glaciers',
    description: "Africa's second-highest peak. A stunning UNESCO World Heritage site with deep-cut forested valleys, rare Afro-alpine moorlands, and rugged equatorial snow fields.",
    elevation: '5,199m Peak',
    soil: 'Rich dark volcanic soils & alpine peat',
    density: '8.5 / 10',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Sykes Monkey',
        scientific: 'Cercopithecus albogularis',
        status: 'Least Concern',
        popTrend: 'Stable',
        description: 'Playful arboreal primate with thick, rich dark-grey fur adapted to cold high-altitude mountain forests.',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'kilimanjaro',
    name: 'Mt Kilimanjaro',
    lat: -3.067,
    lng: 37.355,
    tagline: 'The Roof of Africa & Cosmic Snowy Cap',
    description: "The highest free-standing mountain on Earth and the absolute roof of Africa. An incredible dormant volcano with majestic ecological zones rising from warm savannah to ice glaciers.",
    elevation: '5,895m',
    soil: 'Volcanic ash & montane podzols',
    density: '8.2 / 10',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Abyssinian Black and White Colobus',
        scientific: 'Colobus guereza',
        status: 'Least Concern',
        popTrend: 'Stable in montane zone',
        description: 'Stunning monkeys with long flowing white capes and tails, leaping elegantly through the high canopy layers.',
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'tsavo',
    name: 'Tsavo National Park',
    lat: -2.784,
    lng: 38.465,
    tagline: 'Lava Flows & Legendary Red Elephants',
    description: "One of the largest game sanctuaries on Earth, divided into East and West. Famed for its ancient Yatta Plateau lava flows, Mzima Springs, and 'red' dust-bathed elephants.",
    elevation: '200m - 1,200m',
    soil: 'Red volcanic soils & quartz plains',
    density: '9.0 / 10',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Tsavo Red Elephant',
        scientific: 'Loxodonta africana',
        status: 'Endangered',
        popTrend: 'Increasing through strict anti-poaching measures',
        description: 'Elephants that appear a bright, vibrant brick-red color due to dust-bathing in Tsavo\'s rich iron-oxide soil.',
        image: 'https://images.unsplash.com/photo-1581850518616-bcb8077fa213?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'diani',
    name: 'Diani Beach & Coast',
    lat: -4.329,
    lng: 39.585,
    tagline: 'Pristine Swahili Sands & Marine Parks',
    description: "An award-winning Indian Ocean paradise featuring brilliant, flour-white sands, coral reefs, coastal rain forests, and traditional Swahili architecture with exceptional ocean warmth.",
    elevation: 'Sea Level',
    soil: 'Coral sand & alluvial marine loam',
    density: '8.4 / 10',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Whale Shark',
        scientific: 'Rhincodon typus',
        status: 'Endangered',
        popTrend: 'Stable but vulnerable',
        description: 'Gentle ocean giants migrating along the warm coastal waters. Filter-feeders displaying breathtaking white-spotted patterns.',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar Spice Isle',
    lat: -6.165,
    lng: 39.202,
    tagline: 'Stone Town Heritage & Turquoise Waters',
    description: "The historical Spice Island of Tanzania. Steeped in Arabic, Persian, and Swahili architecture, featuring narrow alleys, aromatic clove farms, and pristine marine reserves.",
    elevation: '0m - 120m',
    soil: 'Sandy limestone and clay soils',
    density: '8.0 / 10',
    image: 'https://images.unsplash.com/photo-1563492065561-769a238a7f21?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Zanzibar Red Colobus',
        scientific: 'Piliocolobus kirkii',
        status: 'Endangered',
        popTrend: 'Stable in Jozani Chwaka Bay Forest',
        description: 'Exquisite primate with a striking copper coat and crown of white hair, found only on the Zanzibar Archipelago.',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'queenez',
    name: 'Queen Elizabeth',
    lat: -0.218,
    lng: 30.042,
    tagline: 'Kazinga Hippos & Tree-Climbing Lions',
    description: "Uganda's premier savannah park, cradled between Lake George and Lake Edward. Famous for the volcanic crater lakes, massive hippo channels, and the iconic tree-climbing lions of Ishasha.",
    elevation: '910m - 1,390m',
    soil: 'Rich volcanic ash and lacustrine clay',
    density: '9.1 / 10',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Ishasha Tree-Climbing Lion',
        scientific: 'Panthera leo',
        status: 'Vulnerable',
        popTrend: 'Monitored',
        description: 'Lions that have developed the unique behavioural adaptation of resting in branches of massive sycamore fig trees during afternoon heat.',
        image: 'https://images.unsplash.com/photo-1614027164847-1b2809eb7b9b?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'volcanoes',
    name: 'Volcanoes Park',
    lat: -1.470,
    lng: 29.495,
    tagline: 'Misty Peaks & Sacred Golden Monkeys',
    description: "Rwanda's extraordinary rainforest sanctuary encompassing five dormant Virunga volcanoes. A sanctuary of dense bamboo shoots and the mist-covered home of wild mountain gorillas.",
    elevation: '2,400m - 4,507m',
    soil: 'Deep fertile volcanic loam',
    density: '9.3 / 10',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Golden Monkey',
        scientific: 'Cercopithecus mitis kandti',
        status: 'Endangered',
        popTrend: 'Stable but vulnerable',
        description: 'Rare, beautifully-colored primate with rich orange-gold guard hairs feeding exclusively on Virunga bamboo shoots.',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'naivasha',
    name: 'Lake Naivasha',
    lat: -0.718,
    lng: 36.357,
    tagline: 'Towering Canyons & Rift Valley Waters',
    description: "A beautiful, fresh Rift Valley lake shadowed by the steep cliffs and geothermal geysers of Hell's Gate. Visitors can cycle alongside zebras and walk inside dramatic red gorges.",
    elevation: '1,884m',
    soil: 'Alluvial and volcanic ash silts',
    density: '8.6 / 10',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Rift Valley Giraffe',
        scientific: 'Giraffa camelopardalis',
        status: 'Vulnerable',
        popTrend: 'Stable',
        description: 'Towering giraffes wandering peacefully through the yellow-fever acacia bark woodlands surrounding the lake shore.',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'lewa',
    name: 'Lewa Downs',
    lat: 0.205,
    lng: 37.452,
    tagline: 'Pioneering Rhino Conservancies',
    description: "The absolute gold standard of private nature conservation. Lewa Downs hosts a high concentration of endangered Black Rhinos, Grevy's Zebras, and elite wildlife rangers.",
    elevation: '1,600m - 1,900m',
    soil: 'Clay loam & sandy savannah sediment',
    density: '9.6 / 10',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Black Rhinoceros',
        scientific: 'Diceros bicornis',
        status: 'Critically Endangered',
        popTrend: 'Steadily Increasing',
        description: 'Browser rhinos with hook-lipped snouts roaming securely protected by state-of-the-art dog tracking units and 24/7 patrol forces.',
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'gombe',
    name: 'Gombe Stream',
    lat: -4.680,
    lng: 29.630,
    tagline: 'Tanganyika Shores & Chimpanzees',
    description: "Tanzania's smallest yet world-renowned national park along the sandy shores of Lake Tanganyika. Famed for Jane Goodall's pioneering research on chimpanzee social behaviors.",
    elevation: '773m - 1,500m',
    soil: 'Lakeside sand and damp forest humic soil',
    density: '9.0 / 10',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Eastern Chimpanzee',
        scientific: 'Pan troglodytes schweinfurthii',
        status: 'Endangered',
        popTrend: 'Stable and protected',
        description: 'Vocal and intelligent primates living in complex communities. Known for using leaf sponges and grass tools to fish for termites.',
        image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'ruma',
    name: 'Ruma National Park',
    lat: -0.650,
    lng: 34.330,
    tagline: 'Last Stand of the Roan Antelope',
    description: "Ruma National Park is Kenya's only sanctuary for the beautiful and endangered Roan Antelope. Tucked away in Lambwe Valley, it boasts a mosaic of glorious woodland and golden savannah.",
    elevation: '1,200m - 1,600m',
    soil: 'Heavy black cotton soils & clay loam',
    density: '8.5 / 10',
    image: 'https://images.unsplash.com/photo-1614027164847-1b2809eb7b9b?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Roan Antelope',
        scientific: 'Hippotragus equinus',
        status: 'Critically Endangered in Kenya',
        popTrend: 'Increasing under strict protection',
        description: 'Large, magnificent antelope with backward-curving horns, long tufted ears, and a striking black-and-white facial mask.',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    id: 'watamu',
    name: 'Watamu Marine Coast',
    lat: -3.350,
    lng: 40.020,
    tagline: 'Wet Sandy Beaches & Coral Haven',
    description: "Famous for its sweeping, wet sandy beaches and spectacular marine conservation, Watamu is a tropical paradise with beautiful sandbars, sea turtle breeding sanctuaries, and pristine coral reefs.",
    elevation: 'Sea Level',
    soil: 'Fine white silica coral sand',
    density: '8.8 / 10',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Green Sea Turtle',
        scientific: 'Chelonia mydas',
        status: 'Endangered',
        popTrend: 'Stable due to Watamu Turtle Watch',
        description: 'Nests on Watamu\'s white sandy beaches and feeds in the rich seagrass beds inside the protected marine park.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxiFAjaa8FjrVehTjGCslHMCuSNpSfNXgwU1UhJtrtSLFAtLh3A8k1TkOtdeLGLLF76PnlLdYZIgFbFrOyxlLennZGXBacmJrhSZCLiU&s=10'
      }
    ]
  },
  {
    id: 'tarangire',
    name: 'Tarangire National Park',
    lat: -3.850,
    lng: 36.000,
    tagline: 'Land of Baobabs & Giant Herds',
    description: "Tanzania's ultimate dry-season retreat, defined by colossal baobab trees that pierce the skyline and massive migratory elephant herds gathering along the Tarangire River.",
    elevation: '1,000m - 1,200m',
    soil: 'Red clay and alluvial savannah sands',
    density: '9.3 / 10',
    image: 'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Tarangire Elephant Herd',
        scientific: 'Loxodonta africana',
        status: 'Endangered',
        popTrend: 'Increasing / High Density',
        description: 'Enormous family herds of up to 300 individuals converging on the life-giving Tarangire River bed to dig for water.',
        image: 'https://images.unsplash.com/photo-1581850518616-bcb8077fa213?auto=format&fit=crop&q=80&w=600'
      }
    ]
  }
];

interface SafariMapProps {
  theme?: 'light' | 'dark';
}

export default function SafariMap({ theme = 'dark' }: SafariMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [selectedDest, setSelectedDest] = useState<DestinationData>(DESTINATIONS[0]);
  const [selectedSpotlight, setSelectedSpotlight] = useState<WildlifeSpotlight>(DESTINATIONS[0].wildlifeSpotlights[0]);
  const [mapType, setMapType] = useState<'satellite' | 'terrain'>('satellite');

  // Tile layer references to toggle on-the-fly
  const satelliteLayerRef = useRef<L.TileLayer | null>(null);
  const terrainLayerRef = useRef<L.TileLayer | null>(null);

  // Search and geocoding state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchMarkerRef = useRef<L.Marker | null>(null);

  const createSearchedDestination = (name: string, lat: number, lng: number, displayName?: string): DestinationData => ({
    id: `search-${Date.now()}`,
    name: name,
    lat: lat,
    lng: lng,
    tagline: 'Custom Searched Wilderness Territory',
    description: displayName || `A custom geolocated space explored on the live Zuri trail map. Located at coordinates: Latitude ${lat.toFixed(4)}, Longitude ${lng.toFixed(4)}. Use our high-precision orbital views to scan the surrounding trails.`,
    elevation: 'Variable',
    soil: 'Inquire with advisors',
    density: 'Spotting active',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    wildlifeSpotlights: [
      {
        name: 'Indigenous Fauna',
        scientific: 'Local species profiles',
        status: 'Variable protection',
        popTrend: 'Local migration corridor',
        description: 'The surrounding geography hosts migratory pathways. Inquire with private flight concierges about localized guides.',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600'
      }
    ]
  });

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);

    try {
      // Prioritize East Africa countries: Kenya (ke), Tanzania (tz), Uganda (ug), Rwanda (rw)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&countrycodes=ke,tz,ug,rw`
      );
      if (!res.ok) throw new Error('Geocoding service unavailable');
      const data = await res.json();
      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        // Fallback to global search if no East African match
        const fallbackRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5`
        );
        const fallbackData = await fallbackRes.json();
        if (fallbackData && fallbackData.length > 0) {
          setSearchResults(fallbackData);
        } else {
          setSearchError('No matching wilderness sectors found. Please try another name.');
        }
      }
    } catch (err) {
      setSearchError('Temporary satellite radio interference. Please check connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const displayName = result.display_name;
    const shortName = result.name || displayName.split(',')[0];

    const customDest = createSearchedDestination(shortName, lat, lng, displayName);
    
    if (mapRef.current) {
      if (searchMarkerRef.current) {
        searchMarkerRef.current.remove();
      }

      const searchIcon = L.divIcon({
        className: 'custom-search-marker',
        html: `
          <div class="relative cursor-pointer group" style="transform-style: preserve-3d; backface-visibility: hidden;">
            <div class="absolute -top-10 -left-16 flex flex-col items-center">
              <div class="px-2.5 py-1 border transition-all duration-300 transform rounded-lg flex items-center gap-1.5 shadow-md
                bg-amber-500 text-stone-950 border-amber-400 font-bold scale-105 ring-2 ring-amber-500/30"
                style="image-rendering: -webkit-optimize-contrast; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-stone-950 animate-pulse"></span>
                <span class="text-[11px] tracking-tight font-sans whitespace-nowrap font-bold">${shortName}</span>
              </div>
              <div class="w-3.5 h-3.5 bg-amber-400 ring-4 ring-amber-500/30 border-2 border-stone-950 dark:border-stone-900 rounded-full shadow-lg mt-1"></div>
            </div>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 40]
      });

      const newMarker = L.marker([lat, lng], { icon: searchIcon }).addTo(mapRef.current);
      searchMarkerRef.current = newMarker;

      newMarker.on('click', () => {
        setSelectedDest(customDest);
        setSelectedSpotlight(customDest.wildlifeSpotlights[0]);
        mapRef.current?.setView([lat - 0.05, lng], 13, { animate: true, duration: 1.5 });
      });

      mapRef.current.setView([lat - 0.03, lng], 13, {
        animate: true,
        duration: 1.5
      });
    }

    setSelectedDest(customDest);
    setSelectedSpotlight(customDest.wildlifeSpotlights[0]);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Clean up search marker on unmount
  useEffect(() => {
    return () => {
      if (searchMarkerRef.current) {
        searchMarkerRef.current.remove();
      }
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create the map object centered over Kenya
    const initialCenter: L.LatLngExpression = [-0.85, 36.6];
    const initialZoom = 7;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 5,
      maxZoom: 15,
      zoomControl: false, // Custom position below
      scrollWheelZoom: true,
      attributionControl: false
    });

    mapRef.current = map;

    // Add Zoom Control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Prepare Tile Layers
    satelliteLayerRef.current = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }
    );

    // Positron Voyager tile (which behaves beautifully with dark mode & light mode)
    // We'll use CartoDB Positron for light/dark topographic view
    const topoUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{y}/{x}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{y}/{x}{r}.png';

    terrainLayerRef.current = L.tileLayer(topoUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    });

    // Add active layer
    if (mapType === 'satellite') {
      satelliteLayerRef.current.addTo(map);
    } else {
      terrainLayerRef.current.addTo(map);
    }

    // Add custom markers for destinations
    DESTINATIONS.forEach((dest) => {
      const isSelected = dest.id === selectedDest.id;
      
      // Define custom elegant SVG icon
      const customIcon = L.divIcon({
        className: 'custom-zuri-marker',
        html: `
          <div class="relative cursor-pointer group">
            <div class="absolute -top-10 -left-16 flex flex-col items-center">
              <div class="px-2.5 py-1 bg-stone-900/95 dark:bg-stone-950/95 border ${dest.id === selectedDest.id ? 'border-amber-400 text-amber-400 ring-2 ring-amber-500/20 shadow-amber-500/10' : 'border-stone-700 text-stone-200'} shadow-md rounded-lg transition-all duration-300 transform scale-95 group-hover:scale-100 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full ${dest.id === selectedDest.id ? 'bg-amber-400 animate-pulse' : 'bg-stone-500'}"></span>
                <span class="text-[10px] font-sans font-semibold tracking-tight whitespace-nowrap">${dest.name}</span>
              </div>
              <div class="w-3.5 h-3.5 bg-amber-500 border-2 border-stone-950 dark:border-stone-900 rounded-full shadow-lg mt-1 transition-transform group-hover:scale-110"></div>
            </div>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 40]
      });

      const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);
      
      // Handle marker click
      marker.on('click', () => {
        handleSelectDestination(dest);
      });

      markersRef.current[dest.id] = marker;
    });

    // Fit map bounds slightly so all markers are beautiful
    const group = L.featureGroup(Object.values(markersRef.current));
    map.fitBounds(group.getBounds().pad(0.15));

    // Disable dragging/scrolling if inside smaller container or handle elegantly
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Watch for Theme or Selected Destination changes to update Topographic/Terrain layer and redraw all markers
  useEffect(() => {
    if (!mapRef.current) return;

    // 1. If we are in terrain mode, we need to swap the TileLayer source to match theme
    if (mapType === 'terrain' && terrainLayerRef.current) {
      mapRef.current.removeLayer(terrainLayerRef.current);
      
      const topoUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{y}/{x}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{y}/{x}{r}.png';
      
      terrainLayerRef.current = L.tileLayer(topoUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      });
      terrainLayerRef.current.addTo(mapRef.current);
    }

    // 2. Redraw all markers with updated theme styles for absolute clarity
    const isDarkActive = theme === 'dark' || mapType === 'satellite';

    DESTINATIONS.forEach((d) => {
      const marker = markersRef.current[d.id];
      if (!marker) return;

      const isSelected = d.id === selectedDest.id;

      const customIcon = L.divIcon({
        className: 'custom-zuri-marker',
        html: `
          <div class="relative cursor-pointer group" style="transform-style: preserve-3d; backface-visibility: hidden;">
            <div class="absolute -top-10 -left-16 flex flex-col items-center">
              <div class="px-2.5 py-1 border transition-all duration-300 transform rounded-lg flex items-center gap-1.5 shadow-md
                ${isSelected 
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold scale-105 ring-2 ring-amber-500/30' 
                  : isDarkActive
                    ? 'bg-stone-950 border-stone-700 text-stone-100 hover:border-stone-500 font-medium'
                    : 'bg-white border-stone-300 text-stone-900 hover:border-stone-400 font-semibold'
                }"
                style="image-rendering: -webkit-optimize-contrast; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;"
              >
                <span class="w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-stone-950 animate-pulse' : 'bg-stone-400'}"></span>
                <span class="text-[11px] tracking-tight font-sans whitespace-nowrap">${d.name}</span>
              </div>
              <div class="w-3.5 h-3.5 ${isSelected ? 'bg-amber-400 ring-4 ring-amber-500/30' : 'bg-amber-500'} border-2 border-stone-950 dark:border-stone-900 rounded-full shadow-lg mt-1 transition-transform group-hover:scale-110"></div>
            </div>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 40]
      });

      marker.setIcon(customIcon);
    });
  }, [theme, mapType, selectedDest]);

  // Handle layer switching
  const handleToggleMapType = (type: 'satellite' | 'terrain') => {
    setMapType(type);
    if (!mapRef.current || !satelliteLayerRef.current || !terrainLayerRef.current) return;

    if (type === 'satellite') {
      mapRef.current.removeLayer(terrainLayerRef.current);
      satelliteLayerRef.current.addTo(mapRef.current);
    } else {
      mapRef.current.removeLayer(satelliteLayerRef.current);
      
      const topoUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{y}/{x}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{y}/{x}{r}.png';
      
      terrainLayerRef.current = L.tileLayer(topoUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      });
      terrainLayerRef.current.addTo(mapRef.current);
    }
  };

  // Select destination and pan to it with beautiful animation
  const handleSelectDestination = (dest: DestinationData) => {
    setSelectedDest(dest);
    setSelectedSpotlight(dest.wildlifeSpotlights[0]);

    if (mapRef.current) {
      mapRef.current.setView([dest.lat - 0.15, dest.lng], 9, {
        animate: true,
        duration: 1.5
      });
    }
  };

  // Center full map bounds again
  const handleResetView = () => {
    if (!mapRef.current) return;
    const group = L.featureGroup(Object.values(markersRef.current));
    mapRef.current.fitBounds(group.getBounds().pad(0.15), {
      animate: true,
      duration: 1.2
    });
  };

  return (
    <div id="safari-interactive-map-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-stone-200 dark:border-stone-850 bg-stone-100/40 dark:bg-stone-900/20 rounded-3xl p-6 lg:p-8 shadow-sm">
      
      {/* 1. LEFT COLUMN: THE MAP VIEWPORT (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        
        {/* Map Header & Options panel */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-900 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-sans font-semibold text-stone-900 dark:text-stone-100">Live Sanctuary Space Map</h4>
              <span className="text-[10px] font-mono text-stone-500 block uppercase">East Africa Flight Coordinates</span>
            </div>
          </div>

          {/* Toggle satellite and terrain layers */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-xl">
            <button
              id="map-type-satellite"
              onClick={() => handleToggleMapType('satellite')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                mapType === 'satellite'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Satellite View</span>
            </button>
            <button
              id="map-type-terrain"
              onClick={() => handleToggleMapType('terrain')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                mapType === 'terrain'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <MapIcon className="w-3 h-3" />
              <span>Topographic</span>
            </button>
          </div>
        </div>

        {/* Search Bar for Custom Locations */}
        <div className="relative bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-900 p-3 rounded-2xl shadow-sm flex flex-col gap-2">
          <form onSubmit={handleSearchSubmit} className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                id="map-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any place, reserve, or custom trail (e.g. Tsavo, Mt Kenya, Diani Beach, Serengeti)..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900/40 border border-stone-250 dark:border-stone-850 rounded-xl text-xs font-sans text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-500/20"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 animate-spin" />
              )}
            </div>
            <button
              id="map-search-btn"
              type="submit"
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 hover:text-black font-semibold rounded-xl text-xs font-sans transition-all cursor-pointer shadow-sm flex items-center gap-1 shrink-0"
            >
              <Compass className="w-3.5 h-3.5 animate-pulse" />
              <span>Search Place</span>
            </button>
          </form>

          {/* Search Error banner */}
          {searchError && (
            <div className="text-[11px] text-amber-500 bg-amber-500/5 px-3 py-1.5 rounded-lg font-sans text-left">
              {searchError}
            </div>
          )}

          {/* Search Results Dropdown list */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-stone-950 border border-stone-250 dark:border-stone-900 rounded-xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
              <div className="p-2 border-b border-stone-100 dark:border-stone-900/60 bg-stone-50 dark:bg-stone-900 text-[10px] font-mono text-stone-400 uppercase text-left">
                Resolved Custom Wilderness Sectors:
              </div>
              {searchResults.map((result, index) => {
                const shortName = result.name || result.display_name.split(',')[0];
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectSearchResult(result)}
                    className="w-full text-left px-4 py-2.5 hover:bg-amber-500/10 hover:text-amber-500 text-xs font-sans text-stone-700 dark:text-stone-300 transition-colors border-b last:border-0 border-stone-100 dark:border-stone-900/35 flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="font-semibold block">{shortName}</span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 block truncate">{result.display_name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* The Leaflet element */}
        <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-900 shadow-inner group">
          
          <div 
            ref={mapContainerRef} 
            className="w-full h-full z-10" 
            style={{ minHeight: '100%', background: '#0e0c0b' }} 
          />

          {/* Custom Overlay Float Buttons */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
            <button
              id="reset-map-view"
              onClick={handleResetView}
              className="px-3 py-1.5 bg-stone-900/90 dark:bg-stone-950/90 hover:bg-amber-500 text-white hover:text-stone-950 border border-stone-750 text-[10px] font-mono rounded-lg shadow-lg flex items-center gap-1.5 transition-all uppercase cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Reset Map Boundaries</span>
            </button>
          </div>
        </div>

        {/* Hotspots Switcher Quick-Selector */}
        <div className="flex flex-wrap gap-2 items-center justify-start">
          {/* Main 5 Quick Selector Buttons */}
          {DESTINATIONS.slice(0, 5).map((dest) => (
            <button
              id={`quick-select-dest-${dest.id}`}
              key={dest.id}
              onClick={() => handleSelectDestination(dest)}
              className={`px-3.5 py-1.5 rounded-xl border text-[11px] font-sans font-medium transition-all cursor-pointer ${
                selectedDest.id === dest.id
                  ? 'bg-amber-500 border-amber-500 text-stone-950 shadow-sm shadow-amber-500/10 font-bold'
                  : 'bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-900 hover:border-amber-500/30'
              }`}
            >
              {dest.name}
            </button>
          ))}

          {/* Elegant Dropdown for the rest of the destinations */}
          <div className="relative">
            <select
              id="map-destinations-dropdown"
              value={DESTINATIONS.slice(5).some(d => d.id === selectedDest.id) ? selectedDest.id : ""}
              onChange={(e) => {
                const dest = DESTINATIONS.find(d => d.id === e.target.value);
                if (dest) {
                  handleSelectDestination(dest);
                }
              }}
              className="px-3.5 py-1.5 rounded-xl border text-[11px] font-sans font-medium bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-900 hover:border-amber-500/35 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer appearance-none pr-8 relative"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23f59e0b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'><polyline points='4 6 8 10 12 6'></polyline></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                backgroundSize: "12px"
              }}
            >
              <option value="" disabled className="text-stone-400">
                {DESTINATIONS.slice(5).some(d => d.id === selectedDest.id) ? "Showing: " + selectedDest.name : "More Destinations..."}
              </option>
              {DESTINATIONS.slice(5).map((dest) => (
                <option key={dest.id} value={dest.id} className="bg-white dark:bg-stone-950 text-stone-850 dark:text-stone-100">
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. RIGHT COLUMN: RICH DETAIL HIGHLIGHTS PANEL (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col space-y-6 text-left justify-between">
        
        {/* Dynamic Highlight Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDest.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col space-y-5"
          >
            {/* Featured Location Banner Frame (No Photo) */}
            <div className="relative py-6 px-5 rounded-2xl border border-stone-200 dark:border-stone-850 shadow-sm bg-stone-900 dark:bg-stone-950 text-white shrink-0">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block font-bold">Featured Habitat</span>
                <h3 className="font-serif-luxury text-2xl font-bold tracking-tight">{selectedDest.name}</h3>
              </div>
            </div>

            {/* Quick Scientific Specs Matrix */}
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono uppercase bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-900 p-3.5 rounded-2xl shrink-0">
              <div className="space-y-1 border-r border-stone-200 dark:border-stone-900">
                <span className="text-stone-400 block text-[9px] font-mono">Elevation</span>
                <span className="text-stone-850 dark:text-stone-200 block font-bold truncate pr-1">{selectedDest.elevation}</span>
              </div>
              <div className="space-y-1 border-r border-stone-200 dark:border-stone-900 pl-2">
                <span className="text-stone-400 block text-[9px] font-mono">Soil Type</span>
                <span className="text-stone-850 dark:text-stone-200 block font-bold truncate pr-1">{selectedDest.soil}</span>
              </div>
              <div className="space-y-1 pl-2">
                <span className="text-stone-400 block text-[9px] font-mono">Wild Density</span>
                <span className="text-amber-600 dark:text-amber-400 block font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  {selectedDest.density}
                </span>
              </div>
            </div>

            {/* General description */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-550 uppercase tracking-widest block font-semibold">{selectedDest.tagline}</span>
              <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 font-sans font-light leading-relaxed">
                {selectedDest.description}
              </p>
            </div>

            {/* STREET VIEW / ROAD WALK INTEGRATION */}
            <div className="p-4 bg-stone-150 dark:bg-stone-950 border border-stone-250 dark:border-stone-900 rounded-2xl shrink-0 space-y-3.5 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>Ground-Level Road Walk Active</span>
                </div>
                <span className="text-[9px] font-mono text-stone-400 dark:text-stone-600">
                  Lat: {selectedDest.lat.toFixed(4)} | Lng: {selectedDest.lng.toFixed(4)}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl shrink-0">
                  <Wind className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs font-sans font-semibold text-stone-900 dark:text-white">Interactive Wilderness Google Earth 3D</h5>
                  <p className="text-[11px] font-sans font-light text-stone-600 dark:text-stone-400 leading-normal">
                    Virtually fly over the dirt tracks, acacias, and dramatic hills of this safari region. Explore real-world topography in immersive orbital 3D Google Earth rendering.
                  </p>
                </div>
              </div>

              <div className="pt-0.5 flex gap-2">
                <a
                  id="btn-street-view"
                  href={`https://earth.google.com/web/@${selectedDest.lat},${selectedDest.lng},1500a,30y,45t,0r`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 hover:text-black font-semibold rounded-xl text-xs font-sans transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explore Google Earth 3D</span>
                </a>
                
                <a
                  id="btn-satellite-flyover"
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedDest.lat},${selectedDest.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 font-medium rounded-xl text-xs font-sans transition-all text-center flex items-center justify-center cursor-pointer shadow-xs"
                  title="View Tracks in Google Maps"
                >
                  <MapIcon className="w-4 h-4 text-amber-500" />
                </a>
              </div>
            </div>

            {/* INTERACTIVE WILDLIFE HIGHLIGHT AREA */}
            <div className="space-y-4 pt-3 border-t border-stone-200 dark:border-stone-850">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block font-bold">Wildlife Spotlights:</span>
                <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 animate-pulse flex items-center gap-1">
                  <Info className="w-3 h-3" /> Click species to inspect
                </span>
              </div>

              {/* Selector buttons for species */}
              <div className="flex flex-wrap gap-2">
                {selectedDest.wildlifeSpotlights.map((spot, i) => (
                  <button
                    id={`wildlife-spot-${spot.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    key={i}
                    onClick={() => setSelectedSpotlight(spot)}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-sans font-medium transition-all cursor-pointer ${
                      selectedSpotlight.name === spot.name
                        ? 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-amber-400 font-bold shadow-sm'
                        : 'bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-900 hover:border-amber-500/20'
                    }`}
                  >
                    {spot.name}
                  </button>
                ))}
              </div>

              {/* Dynamic wildlife card display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSpotlight.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-white dark:bg-stone-950 border border-stone-250 dark:border-stone-900 rounded-2xl flex flex-col md:flex-row gap-4 items-start shadow-sm"
                >
                  {/* Species Conservation & Meta Data */}
                  <div className="space-y-1.5 text-left flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-serif-luxury text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">{selectedSpotlight.name}</h5>
                      <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 font-medium">Verified Spot</span>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400 block italic leading-none">{selectedSpotlight.scientific}</span>
                    
                    <div className="text-[9px] font-mono space-y-0.5 pt-1.5 text-stone-500 leading-tight">
                      <span className="block"><strong className="text-stone-700 dark:text-stone-300">Status:</strong> {selectedSpotlight.status}</span>
                      <span className="block"><strong className="text-stone-700 dark:text-stone-300">Trend:</strong> {selectedSpotlight.popTrend}</span>
                    </div>

                    <p className="text-[11px] font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed pt-1 border-t border-stone-100 dark:border-stone-900/60 mt-1">
                      {selectedSpotlight.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Core Conservation Affiliation Badge at Footer of Card */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-850/60 mt-4 flex items-center gap-2.5 text-[10px] font-mono text-stone-500 uppercase leading-relaxed">
          <Award className="w-4 h-4 text-emerald-500" />
          <span>100% Verified Noble Roam conservation footprint tracking</span>
        </div>
      </div>
    </div>
  );
}
