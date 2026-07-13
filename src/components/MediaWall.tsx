import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Mountain, Layers, TrendingUp, Compass, Plus, X, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface MediaWallProps {
  currentLanguage: Language;
}

interface MediaItem {
  id: number;
  url: string;
  titles: Partial<Record<Language, string>> & { en: string };
  habitats: Partial<Record<Language, string>> & { en: string };
  elevations: string;
  floraSoils: Partial<Record<Language, string>> & { en: string };
  densities: string;
  facts: Partial<Record<Language, string>> & { en: string };
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 1,
    url: "/assets/images/blissful_flamingos_1783164904936.jpg",
    titles: {
      en: "Blissful Flock of Lesser Pink Flamingos",
      sw: "Kundi la heroe wadogo wa rangi ya waridi",
      fr: "Flamboyante Colonie de Flamants Roses",
      de: "Prachtvolle Kolonie von Zwergflamingos",
      es: "Flamencos Rosas en el Gran Valle",
      zh: "纳库鲁湖畔的小红鹳粉红羽浪"
    },
    habitats: {
      en: "Alkaline Salt Rift Lake Basin",
      sw: "Bonde la Ziwa la Chumvi la Ufa",
      fr: "Bassin Lacustre Salin du Rift",
      de: "Alkalisches Salzsee-Becken im Rift Valley",
      es: "Cuenca Lacustre Salina del Rift",
      zh: "东非裂谷高盐度碱性湖泊"
    },
    elevations: "1,759 m",
    floraSoils: {
      en: "Alkaline Silt & Blue-Green Spirulina Algae",
      sw: "Matope ya alkali na Mwani wa Spirulina",
      fr: "Limon Alcalin & Algues Bleues Spiruline",
      de: "Alkalische Sedimente & Spirulina-Algen",
      es: "Limo Alcalino y Algas Espirulina",
      zh: "富碱性粉砂与大片天然螺旋藻"
    },
    densities: "95% (High Migratory)",
    facts: {
      en: "Over a million flamingos feed simultaneously, filtering up to 150 grams of micro-algae daily per bird.",
      sw: "Zaidi ya heroe milioni moja hulisha kwa pamoja, wakichuja hadi gramu 150 za mwani kila siku kwa kila ndege.",
      fr: "Plus d'un million de flamants filtrent simultanément jusqu'à 150 grammes de micro-algues par jour chacun.",
      de: "Über eine Million Flamingos filtern täglich jeweils bis zu 150 Gramm Mikroalgen aus dem alkalischen Wasser.",
      es: "Más de un millón de flamencos se alimentan a la vez, filtrando hasta 150 gramos de microalgas al día cada uno.",
      zh: "超过百万只红鹳在此集聚，每只成年鸟每日过滤摄入高达150克富营养螺旋藻。"
    }
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800",
    titles: {
      en: "The King Panthera Leo on Volcanic Kopje",
      sw: "Mfalme Simba kwenye Mwamba wa Kopje",
      fr: "Le Lion Panthera Leo sur son Kopje",
      de: "König Panthera Leo auf Granitfelsen",
      es: "El Rey León sobre su Trono de Kopje",
      zh: "傲立于火山岩巨石堆上的雄狮"
    },
    habitats: {
      en: "Granite Outcrops & Tall Oat Grassland",
      sw: "Mawamba ya Itale na Nyasi ndefu za Shayiri",
      fr: "Aussis de Granit & Hautes Savanes",
      de: "Granitfelsen & Hohes Hafergrasland",
      es: "Afloramientos de Granito y Pastizales",
      zh: "花岗岩露头与半高草稀树草原"
    },
    elevations: "1,500 m",
    floraSoils: {
      en: "Red Volcanic soil, Acacia Tortilis, Oat Grass",
      sw: "Udongo mwekundu wa volkano na Miti ya mwavuli",
      fr: "Sol Volcanique Rouge, Acacia Tortilis",
      de: "Rote Vulkanerde, Schirmakazien, Hafergras",
      es: "Suelo Volcánico Rojo, Acacia Tortilis",
      zh: "含铁红色火山泥、伞房相思树与红燕麦草"
    },
    densities: "92% (High Lion Density)",
    facts: {
      en: "Granite kopjes act as elevated vantage points for lions monitoring migratory wildebeest herds.",
      sw: "Mawamba ya kopje hutumika kama sehemu za juu za simba kuangalia makundi ya nyumbu wanaohama.",
      fr: "Les kopjes de granit servent de postes d'observation surélevés pour surveiller la migration des gnous.",
      de: "Die Granitkopjes dienen den Löwenrudeln als erhöhte Aussichtspunkte zur Überwachung der Gnus.",
      es: "Los kopjes de granito sirven como miradores elevados para vigilar la gran migración de ñus.",
      zh: "高耸的火山花岗岩岩堆（Kopjes）是狮群监控数百万角马迁徙路线的最佳瞭望台。"
    }
  },
  {
    id: 3,
    url: "https://quiltripping.com/wp-content/uploads/2018/08/DSC0484-3-768x512.jpg",
    titles: {
      en: "Dawn Hot Air Balloons Rising over Mara",
      sw: "Puto za asubuhi zikipaa juu ya Mara",
      fr: "Ascension de Montgolfières au Petit Matin",
      de: "Heißluftballons im Morgengrauen über der Mara",
      es: "Globos Aerostáticos al Amanecer en Mara",
      zh: "晨曦微光中徐徐升起的马赛马拉热气球"
    },
    habitats: {
      en: "Thermal Air Stream Corridors",
      sw: "Mikondo ya Hewa ya Joto la Anga",
      fr: "Couloirs de Courants Thermiques Aériens",
      de: "Thermische Luftströmungskorridore",
      es: "Corredores de Corrientes Térmicas de Aire",
      zh: "平流层上升热气流廊道"
    },
    elevations: "1,650 m (Altitude)",
    floraSoils: {
      en: "Atmospheric Dust, Dry-season Grass Canopy",
      sw: "Vumbi la anga na Mimea ya msimu wa kiangazi",
      fr: "Poussière Atmosphérique, Canopée Sèche",
      de: "Atmosphärischer Staub, Trockenes Blätterdach",
      es: "Polvo Atmosférico, Pastizal de Estación Seca",
      zh: "高空微尘、旱季干燥地表植被冠层"
    },
    densities: "88% (Panoramic Visibility)",
    facts: {
      en: "Silent hot air travel prevents animal flight reflexes, allowing for natural predatory observations.",
      sw: "Usafiri wa kimya wa puto huzuia wanyama kushtuka, ukiruhusu kuona jinsi wanavyosaka mawindo yao.",
      fr: "Le vol silencieux évite le stress animal, permettant d'observer des scènes de chasse naturelle.",
      de: "Lautlose Ballonfahrten verhindern Fluchtreflexe bei Wildtieren und erlauben intime Beobachtungen.",
      es: "El viaje silencioso evita el estrés de los animales, permitiendo ver el comportamiento natural.",
      zh: "静音无感的热气球低空掠过可完全避免惊扰象群，以真正的上帝视角俯瞰捕食画面。"
    }
  },
  {
    id: 4,
    url: "https://d1jyxxz9imt9yb.cloudfront.net/medialib/5956/image/s768x1300/LC202505_FlorianKriechbaumer_042_828770_reduced.jpg",
    titles: {
      en: "Colossal Amboseli Tuskers below Kilimanjaro",
      sw: "Tembo wakubwa wa Amboseli chini ya Kilimanjaro",
      fr: "Éléphants d'Amboseli sous le Kilimandjaro",
      de: "Riesige Amboseli-Elefanten vor dem Kilimandscharo",
      es: "Colosos Elefantes con el Kilimanjaro al Fondo",
      zh: "雪山圣境乞力马扎罗底下的安博塞利巨牙象"
    },
    habitats: {
      en: "Glacial Swamps & Alkaline Dry Plains",
      sw: "Vinamasi vya theluji na Nyika kavu ya chumvi",
      fr: "Marais Glaciaires & Plaines Alcalines Sèches",
      de: "Gletschersümpfe & Alkalische Trockenebenen",
      es: "Pantanos Glaciares y Llanuras Alcalinas",
      zh: "冰川融水滋养沼泽与碱性干涸泥滩"
    },
    elevations: "1,155 m",
    floraSoils: {
      en: "Alkaline Ash Dust, Papyrus Reeds, Sedges",
      sw: "Vumbi la jivu la alkali na mwanzi wa mafunjo",
      fr: "Cendres Alcalines, Roseaux de Papyrus",
      de: "Alkalische Asche, Papyrusreben, Riedgräser",
      es: "Ceniza Alcalina, Juncos de Papiro y Ciperáceas",
      zh: "疏松碱性火山灰、巨型纸莎草与沼生苔草"
    },
    densities: "90% (Elephant Stronghold)",
    facts: {
      en: "Amboseli's continuous water is supplied by subterranean aquifers filtered through Mount Kilimanjaro's volcanic rock.",
      sw: "Maji ya Amboseli hutoka kwenye chemchemi za chini ya ardhi zilizochujwa na miamba ya Mlima Kilimanjaro.",
      fr: "L'eau d'Amboseli provient de nappes phréatiques filtrées par les roches volcaniques du Kilimandjaro.",
      de: "Amboselis Sümpfe werden durch unterirdische Quellen gespeist, die das Schmelzwasser des Kilimandscharo filtern.",
      es: "El agua continua de Amboseli proviene de acuíferos filtrados por las rocas volcánicas del Kilimanjaro.",
      zh: "安博塞利常年不干涸的绿洲湿地完全依靠乞力马扎罗火山岩层层过滤的地下冰川潜水。"
    }
  },
  {
    id: 5,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPCaTil78HLnMANB62qNakiVeHItuVS1qD-UX4_sV3Jw&s=10",
    titles: {
      en: "Sovereign Leopard in Acacia Canopy",
      sw: "Chui wa Kifalme kwenye mti wa Acacia",
      fr: "Léopard Élégant dans la Canopée d'Acacias",
      de: "Leopard in der Akazienkrone",
      es: "Leopardo Elegante en la Copa de una Acacia",
      zh: "隐匿于金合欢树冠枝丫间的金钱豹"
    },
    habitats: {
      en: "Riverine Gallery Forest & Dry Thorn Scrub",
      sw: "Misitu ya mto na Nyika ya miba mikavu",
      fr: "Forêt Galerie Riveraine & Broussailles Épineuses",
      de: "Uferwald-Galerie & Trockenes Dornbuschland",
      es: "Bosque de Ribera y Arbustos Espinosos Secos",
      zh: "河流两岸沿河防护林带与半干燥多刺灌木林"
    },
    elevations: "850 m",
    floraSoils: {
      en: "Alluvial Sandy Soil, Yellow-fever Acacia, Doum Palms",
      sw: "Udongo wa mchanga na Miti ya mshita ya njano",
      fr: "Sol Sableux Alluvial, Acacia Jaune",
      de: "Alluvialer Sandboden, Gelbrinden-Akazie, Dumpalmen",
      es: "Suelo Arenoso Aluvial, Acacia Amarilla y Palmeras",
      zh: "河积沙质土壤、发热病黄皮金合欢树与多刺棕榈"
    },
    densities: "84% (High Predator Activity)",
    facts: {
      en: "Leopards haul carcasses weighing twice their body weight into trees to keep them safe from hyenas and lions.",
      sw: "Chui huvuta mizoga yenye uzito mara mbili ya miili yao kwenye miti ili kuilinda dhidi ya fisi na simba.",
      fr: "Les léopards hissent des proies pesant deux fois leur poids dans les branches pour les soustraire aux hyènes.",
      de: "Leoparden ziehen Beute, die doppelt so schwer ist wie sie selbst, auf Bäume, um sie vor Hyänen zu schützen.",
      es: "Los leopardos suben presas de hasta el doble de su peso a las ramas para protegerlas de hienas.",
      zh: "豹子能将重达自身两倍的猎物衔上数十米高的树梢，以防止狮群和鬣狗在地面掠夺。"
    }
  },
  {
    id: 6,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG0Y5fusIo9nLMFdeb_Kyzu82jF3DLby5IPzzjlrsn_A&s=10",
    titles: {
      en: "Zebra Herd Quenching Thirst at Lake Naivasha",
      sw: "Pundamilia wakinywa maji kwenye Ziwa Naivasha",
      fr: "Troupeau de Zèbres S'abreuvant au Lac Naivasha",
      de: "Zebras am Ufer des Naivasha-Sees",
      es: "Manada de Cebras Bebiendo en el Lago Naivasha",
      zh: "奈瓦沙湖畔浅滩边成群饮水的斑马"
    },
    habitats: {
      en: "Freshwater Lake Margin & Meadow Pasture",
      sw: "Ufuo wa Ziwa la Maji Baridi na Nyika ya malisho",
      fr: "Rivage d'Eau Douce & Prairies Humides",
      de: "Süßwassersee-Ufer & Grüne Weidelandschaft",
      es: "Margen de Lago de Agua Dulce y Pastizal",
      zh: "淡水湖泊滨湖草甸与丰美湿草地"
    },
    elevations: "1,884 m",
    floraSoils: {
      en: "Volcanic Alluvial Loam, Yellow Fever Trees, Papyrus",
      sw: "Udongo mzuri wa volkano na miti ya mshita ya njano",
      fr: "Limon Alluvial Volcanique, Acacias Jaunes",
      de: "Vulkanischer Lehmboden, Gelbrinden-Akazien, Papyrus",
      es: "Limo Volcánico Aluvial, Acacia Amarilla y Papiro",
      zh: "肥沃火山冲积壤土、高大发热黄皮木与密质莎草"
    },
    densities: "87% (Abundant Herbivores)",
    facts: {
      en: "Naivasha's fresh water acts as an essential sanctuary attracting over 400 species of birds and massive zebra corridors.",
      sw: "Maji baridi ya Naivasha ni makazi muhimu yanayovutia zaidi ya aina 400 za ndege na makundi makubwa ya pundamilia.",
      fr: "L'eau douce de Naivasha attire plus de 400 espèces d'oiseaux et d'immenses couloirs de zèbres.",
      de: "Das Süßwasser des Naivasha-Sees zieht über 400 Vogelarten und riesige Herden von Steppenzebras an.",
      es: "El agua dulce de Naivasha es un santuario vital que atrae a más de 400 especies de aves y cebras.",
      zh: "奈瓦沙淡水湖是东非极罕见的淡水湿地，吸引了超400种水鸟和上万只斑马和河马栖息。"
    }
  },
  {
    id: 7,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWWw-5CRuIj1yCbvDUQpfEHCO-oiYWiEHgkQ8YY_VZ3vdrQ1nzWaHmvZlb&s=10",
    titles: {
      en: "The Serengeti Cheetah Scanning grasslands",
      sw: "Duma wa Serengeti akiangalia nyika ya nyasi",
      fr: "Guépard du Serengeti en Observation",
      de: "Serengeti-Gepard auf Spähposten",
      es: "Guepardo del Serengueti Vigilando la Sabana",
      zh: "稀树草原中极速极影——塞伦盖蒂猎豹"
    },
    habitats: {
      en: "Flat Volcanic Ash Short-Grass Savannah",
      sw: "Nyika tambarare ya jivu la volkano na nyasi fupi",
      fr: "Plaines Plates de Cendres Volcaniques",
      de: "Flaches Kurzgrasland auf Vulkanaschebden",
      es: "Llanura Plana de Ceniza Volcánica y Pasto Corto",
      zh: "火山灰覆盖的平坦短草开阔荒原"
    },
    elevations: "1,475 m",
    floraSoils: {
      en: "Cinder Ash loam, Nutrient-rich Red oat grass",
      sw: "Udongo mwekundu na nyasi zenye lishe bora",
      fr: "Limon Volcanique, Herbe Rouge Nutritive",
      de: "Vulkanischer Feimboden, Nährstoffreiches Hafergras",
      es: "Limo de Ceniza, Pasto de Avena Roja Nutritivo",
      zh: "多孔微矿物火山灰壤土、富营养红燕麦草"
    },
    densities: "89% (Optimal Running Flatlands)",
    facts: {
      en: "Flat, tree-free terrain is vital for the cheetah, allowing chase acceleration of 0 to 100 km/h in just 3 seconds.",
      sw: "Mazingira tambarare yasiyo na miti ni muhimu kwa duma, ikiruhusu kasi kutoka 0 hadi 100 km/h kwa sekunde 3 tu.",
      fr: "Un terrain plat et dégagé est vital pour le guépard, lui permettant de passer de 0 à 100 km/h en 3 secondes.",
      de: "Flaches, baumloses Gelände ist lebenswichtig für Geparden, um ihre Höchstgeschwindigkeit von 100 km/h in 3 Sekunden zu erreichen.",
      es: "El terreno plano y despejado es vital para el guepardo, permitiéndole acelerar de 0 a 100 km/h en solo 3 segundos.",
      zh: "广袤平坦的视野极度适合猎豹在捕食时爆发，使其能在3秒内瞬间加速至时速100公里。"
    }
  },
  {
    id: 8,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mGRgQSfGrQtC3-ayJwf6m2pHnSSgSPtyhsXshx9vVA&s=10",
    titles: {
      en: "Tsavo Red-Earth Giant Elephant Grazing",
      sw: "Tembo mkubwa mwekundu wa Tsavo akilisha nyasi",
      fr: "Éléphant Rouge Géant de Tsavo en Pâture",
      de: "Roter Riesen-Elefant von Tsavo beim Grasen",
      es: "Elefante Gigante Bañado en Tierra Roja de Tsavo",
      zh: "在查沃富铁红土平原上漫步的“红土巨象”"
    },
    habitats: {
      en: "Semi-Arid Volcanic Red Clay scrubland",
      sw: "Nyika ya udongo mwekundu wa udongo wa mfinyanzi",
      fr: "Broussailles Semi-Arides d'Argile Rouge Volcanique",
      de: "Halbtrockenes Buschland auf roter Vulkanerde",
      es: "Matorral Semiárido de Arcilla Roja Volcánica",
      zh: "半干旱低矮火山岩红粘土灌木荒野"
    },
    elevations: "600 m",
    floraSoils: {
      en: "Iron-rich Crimson soils, Commiphora, Giant Baobabs",
      sw: "Udongo mwekundu wenye madini ya chuma na mibuyu mikubwa",
      fr: "Sols Rouges Riches en Fer, Baobabs Géants",
      de: "Eisenhaltige Rote Erde, Commiphora, Riesen-Baobabs",
      es: "Suelos de Arcilla Roja Ricos en Hierro y Baobabs",
      zh: "富含氧化铁的绯红沙粘土、没药灌木与千年大包巴树"
    },
    densities: "82% (Elephant migratory corridor)",
    facts: {
      en: "Tsavo's elephants dust themselves with iron-rich red clay as an organic sunscreen and parasite repellent.",
      sw: "Tembo wa Tsavo hujipaka udongo mwekundu kama kinga ya jua ya asili na kuzuia wadudu.",
      fr: "Les éléphants se couvrent d'argile rouge riche en fer qui sert d'écran solaire naturel et de répulsif.",
      de: "Die berühmten roten Elefanten pudern ihre Haut mit eisenhaltigem Staub als Sonnenschutz und Insektenschutz.",
      es: "Los elefantes se cubren con arcilla roja rica en hierro que actúa como protector solar natural.",
      zh: "查沃象群常年喷洒富含铁质的红泥粉尘，在体表形成天然防晒霜与防寄生虫泥甲。"
    }
  },
  {
    id: 9,
    url: "https://cdn.shortpixel.ai/spai2/q_lossless+w_1082+to_auto+ret_img/www.fauna-flora.org/wp-content/uploads/2017/09/AdobeStock_337103452.jpeg",
    titles: {
      en: "Endangered Eastern Black Rhino on High Alert",
      sw: "Kifaru mweusi aliye hatarini mwa kutoweka",
      fr: "Rhinocéros Noir de l'Est en Alerte Maximale",
      de: "Gefährdetes Spitzmaulnashorn auf der Hut",
      es: "Rinoceronte Negro Oriental en Alerta",
      zh: "私人保护区内高度警惕的濒危东非黑犀牛"
    },
    habitats: {
      en: "Thorn-scrub Thickets & Rolling dry savanna slopes",
      sw: "Misitu ya miba mikavu na vilima vya nyika",
      fr: "Fourrés Épineux & Collines Sèches de Savane",
      de: "Dornbuschdickichte & Sanfte Hügelige Trockensavanne",
      es: "Matorrales Espinosos y Colinas Secas de Sabana",
      zh: "干密刺灌木林与起伏干燥黏土原野"
    },
    elevations: "1,600 m",
    floraSoils: {
      en: "Black Cotton soils, Acacia Mellifera, Whistling Thorn",
      sw: "Udongo mweusi wa pamba na miti ya acacia",
      fr: "Sols Noirs Argileux, Acacia Mellifera",
      de: "Schwarzer Tonboden, Acacia Mellifera, Flötenakazie",
      es: "Suelos de Arcilla Negra, Acacia Mellifera y Espinas",
      zh: "火山灰黑棉土、多刺金合欢与中空防蚁“哨兵金合欢”"
    },
    densities: "94% (High Security Sanctuary)",
    facts: {
      en: "Armed 24/7 patrol squads and canine units track each individual black rhino in Lewa to ensure zero poaching incidents.",
      sw: "Walinda doria wenye silaha wa masaa 24 na mbwa maalum hufuatilia kila kifaru huko Lewa kuzuia ujangili.",
      fr: "Des patrouilles armées 24h/24 et des brigades canines surveillent chaque rhinocéros à Lewa contre le braconnage.",
      de: "Bewaffnete Anti-Wilderer-Patrouillen und Spürhunde überwachen jedes Nashorn in Lewa rund um die Uhr.",
      es: "Patrullas armadas las 24 horas y unidades caninas rastrean cada rinoceronte para evitar la caza furtiva.",
      zh: "利瓦野生动物保护区内有全副武装的护林员与反盗猎犬队24小时卫星跟踪监控，保障犀牛繁衍。"
    }
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800",
    titles: {
      en: "The Great Savannah Sunset Silhouette",
      sw: "Kivuli cha twiga wakati wa jua kuzama",
      fr: "Silhouette de Girafes au Coucher de Soleil",
      de: "Giraffen-Silhouette im Afrikanischen Sonnenuntergang",
      es: "Silueta de Jirafas en el Atardecer Ecuatorial",
      zh: "夕阳余晖剪影中的高贵长颈鹿家族"
    },
    habitats: {
      en: "Highland Ridge volcanic escarpment",
      sw: "Safu ya Milima ya Volkano ya Bonde la Ufa",
      fr: "Escarpement Volcanique des Hauts Plateaux",
      de: "Vulkanischer Steilhang der Hochlandrücken",
      es: "Escarpe Volcánico de la Cordillera",
      zh: "大裂谷高海拔火山断崖山脊"
    },
    elevations: "2,100 m",
    floraSoils: {
      en: "Basalt gravel loam, Giant euphorbia, Candelabra trees",
      sw: "Udongo wa mchanganyiko wa mawe na miti ya euphorbia",
      fr: "Limon de Gravier Basaltique, Euphorbia Géante",
      de: "Basaltkies-Lehm, Riesen-Euphorbien, Kandelaberbäume",
      es: "Limo de Grava de Basalto, Euphorbia Gigante",
      zh: "玄武岩碎石壤土、巨型大戟属植物与仙人掌大烛台树"
    },
    densities: "80% (Scenic Migratory Ridges)",
    facts: {
      en: "Due to their long necks, giraffes can access elevated nutrient reserves untouched by any other mammalian herbivore.",
      sw: "Kwa sababu ya shingo zao ndefu, twiga wanaweza kupata lishe ya juu isiyoweza kufikiwa na mnyama mwingine yeyote.",
      fr: "Grâce à leur long cou, les girafes atteignent des feuilles nutritives inaccessibles à tout autre mammifère.",
      de: "Mit ihren langen Halsen erreichen Giraffen proteinreiche Akazienblätter, die für andere Pflanzenfresser unerreichbar sind.",
      es: "Gracias a su cuello largo, las jirafas alcanzan hojas nutritivas que ningún otro mamífero puede consumir.",
      zh: "得益于独特的长颈与长达45厘米的灵活舌头，长颈鹿能轻松卷食金合欢树梢最高处的顶叶。"
    }
  },
  {
    id: 11,
    url: "https://media.istockphoto.com/id/95492036/photo/elephant-matriarch-cow-leading-a-herd.jpg?s=612x612&w=0&k=20&c=9ZLI9OU_rtUf5_SNOYHF_C9hcccmLKUytE5DttOspIs=",
    titles: {
      en: "Matriarch Elephants Leading Savannah Walk",
      sw: "Tembo kiongozi akiongoza kundi kwenye nyika",
      fr: "Éléphants Menés par leur Matriarche",
      de: "Matriarchin führt Elefantenherde an",
      es: "Elefantes Guiados por la Matriarca en la Sabana",
      zh: "母系家长带领象群跨越马赛马拉原野"
    },
    habitats: {
      en: "Riparian Alluvial savanna riverbanks",
      sw: "Ufuo wa mto kwenye nyika ya savana",
      fr: "Berges Alluviales de Savane Riparienne",
      de: "Alluviales Grasland an Flussläufen",
      es: "Riberas Aluviales de Sabana Riparia",
      zh: "沿河漫滩河流冲积平原"
    },
    elevations: "1,530 m",
    floraSoils: {
      en: "Rich silt-clay loam, Wild date palms, Sycamore fig trees",
      sw: "Udongo mzuri wa matope na miti ya mitende ya porini",
      fr: "Limon Alluvial Riche, Palmiers Sauvages, Figuiers",
      de: "Nährstoffreicher Auenlehm, Wilde Dattelpalmen, Feigenbäume",
      es: "Limo Aluvial Rico, Palmeras Silvestres y Higueras",
      zh: "富有机质黏土壤土、野生海枣椰子林与千年无花果巨木"
    },
    densities: "93% (Active River Crossing areas)",
    facts: {
      en: "Mature matriarchs guide family herds along ancient water paths stored in long-term spatial memories.",
      sw: "Tembo viongozi wa kike huongoza familia zao kwenye vijia vya kale vya maji kwa kutumia kumbukumbu zao.",
      fr: "Les matriarches guident les hardes vers les points d'eau grâce à leur mémoire spatiale à long terme.",
      de: "Erfahrene Leitkühe führen die Herde auf jahrzehntealten Pfaden zielsicher zu geheimen Wasserquellen.",
      es: "Las matriarcas guían a la manada a puntos de agua distantes usando memoria espacial a largo plazo.",
      zh: "年长的雌性象尊凭借深藏于脑海数十载的地理记忆，带领家族在旱季寻觅千公里外的隐秘水源。"
    }
  },
  {
    id: 12,
    url: "/assets/images/african_fish_eagle_1783006787786.jpg",
    titles: {
      en: "African Fish Eagle Over Mount Kenya Borders",
      sw: "Tai mlaji wa samaki juu ya anga la Mlima Kenya",
      fr: "Aigle Pêcheur survolant le Mont Kenya",
      de: "Afrikanischer Seeadler vor dem Mount Kenya",
      es: "Águila Pescadora Africana Sobre el Monte Kenia",
      zh: "傲视苍穹——肯尼亚山冰川附近的非洲神雕"
    },
    habitats: {
      en: "Montane evergreen bamboo forest border",
      sw: "Pembezoni mwa msitu wa mianzi kwenye milima",
      fr: "Lisière de Forêt de Bambous de Montagne",
      de: "Berg- Bambuswaldgrenze & Alpiner Luftraum",
      es: "Límite del Bosque de Bambú de Montaña",
      zh: "高山常绿针叶竹林带边缘与空中悬崖"
    },
    elevations: "2,800 m",
    floraSoils: {
      en: "Humus-rich volcanic podzol, Giant Lobelias",
      sw: "Udongo wenye rutuba wa volkano na mimea ya lobelia",
      fr: "Podzol Volcanique Riche en Humus, Lobélies Géantes",
      de: "Humusreicher Vulkanboden, Riesen-Lobelien",
      es: "Podzol Volcánico Rico en Humus, Lobelias Gigantes",
      zh: "富含腐殖质黑色火山灰针叶土、巨型半边莲与高山野生树木"
    },
    densities: "75% (High Raptor nesting grounds)",
    facts: {
      en: "The African fish eagle can spot ripples made by small tilapia fish on lake surfaces from up to 1.5 km away.",
      sw: "Tai mlaji wa samaki wa Afrika anaweza kuona mawimbi ya samaki wadogo wa tilapia kwenye ziwa kutoka umbali wa hadi kilomita 1.5.",
      fr: "L'aigle pêcheur repère les ondulations des poissons tilapia sur l'eau jusqu'à 1,5 km de distance.",
      de: "Der afrikanische Seeadler kann Bewegungen von Tilapien auf der Wasseroberfläche aus 1,5 km Entfernung erspähen.",
      es: "El águila pescadora puede detectar ondas de pequeños peces tilapia en el agua desde 1.5 km de distance.",
      zh: "非洲神鹰（鱼鹰）极其敏锐的双眼能从1.5公里外的千米高空精准锁定制伏水面的游鱼。"
    }
  }
];

export default function MediaWall({ currentLanguage }: MediaWallProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <div id="media-wall-outer" className="space-y-8">
      {/* Dynamic Descriptive Instructions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-100 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850/80 max-w-7xl mx-auto px-6 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-left space-y-0.5">
            <span className="text-[10px] font-mono text-stone-800 dark:text-stone-300 uppercase tracking-widest block font-bold">Interactive Experience</span>
            <p className="text-xs text-stone-900 dark:text-stone-200 font-sans font-light">
              {t.media_click_hint}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-center font-mono text-[10px] uppercase text-amber-700 dark:text-amber-400 bg-amber-500/15 dark:bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/20 dark:border-amber-500/10 shrink-0">
          <Camera className="w-3.5 h-3.5" />
          <span>12 Archival Ecosystems</span>
        </div>
      </div>

      {/* Grid containing the 12 items */}
      <div id="media-wall-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
        {MEDIA_ITEMS.map((item) => {
          const isExpanded = expandedId === item.id;
          const localizedTitle = item.titles[currentLanguage] || item.titles.en;
          const localizedHabitat = item.habitats[currentLanguage] || item.habitats.en;
          const localizedFloraSoil = item.floraSoils[currentLanguage] || item.floraSoils.en;
          const localizedFact = item.facts[currentLanguage] || item.facts.en;

          return (
            <div
              id={`media-item-card-${item.id}`}
              key={item.id}
              className="group relative h-72 rounded-3xl overflow-hidden border border-stone-900 hover:border-stone-800 shadow-2xl transition-all duration-300 cursor-pointer select-none"
              onMouseEnter={() => setExpandedId(item.id)}
              onMouseLeave={() => setExpandedId(null)}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              {/* Image base layer */}
              <img
                src={item.url}
                alt={localizedTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Standard subtle gradient shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent z-10" />

              {/* Default Title block visible at the bottom when not expanded */}
              <div className={`absolute bottom-4 left-4 right-4 z-20 transition-all duration-300 text-left ${isExpanded ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <div className="px-3 py-2.5 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-stone-850/60 space-y-1">
                  <span className="text-[8px] font-mono text-amber-500 tracking-wider uppercase block font-semibold">
                    {item.elevations} • {item.densities.split(' ')[0]}
                  </span>
                  <h4 className="text-xs text-white font-sans font-medium line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {localizedTitle}
                  </h4>
                </div>
              </div>

              {/* Slide-Up Expanded / Hover Overlay with Detailed Ecological Profile */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    id={`ecological-overlay-${item.id}`}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} // custom spring-like ease
                    className="absolute inset-0 bg-stone-950/95 backdrop-blur-xl z-30 p-5 flex flex-col justify-between border border-amber-500/20 rounded-3xl overflow-hidden text-left"
                  >
                    {/* Top Segment: Title and Badge */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-amber-500 tracking-widest uppercase block font-bold border border-amber-500/20 px-2 py-0.5 rounded-full bg-amber-500/5">
                          {t.media_habitat}
                        </span>
                        {/* Expand status marker */}
                        <div className="p-1 rounded-full bg-stone-900 border border-stone-800">
                          <X className="w-3 h-3 text-stone-400" />
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-serif-luxury text-stone-100 font-semibold leading-snug">
                        {localizedTitle}
                      </h4>

                      <div className="h-px bg-stone-850" />
                    </div>

                    {/* Middle Segment: Stats Grid */}
                    <div className="space-y-2.5">
                      {/* Elevation */}
                      <div className="flex items-center gap-2.5">
                        <Mountain className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <div className="text-[10px] font-mono text-stone-400">
                          <span className="text-stone-500 font-sans block leading-none mb-0.5">{t.media_elevation}:</span>
                          <span className="text-stone-200">{item.elevations}</span>
                        </div>
                      </div>

                      {/* Flora and Soil Type */}
                      <div className="flex items-center gap-2.5">
                        <Layers className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <div className="text-[10px] font-mono text-stone-400">
                          <span className="text-stone-500 font-sans block leading-none mb-0.5">{t.media_soil}:</span>
                          <span className="text-stone-200 line-clamp-1">{localizedFloraSoil}</span>
                        </div>
                      </div>

                      {/* Wildlife Density */}
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <div className="text-[10px] font-mono text-stone-400">
                          <span className="text-stone-500 font-sans block leading-none mb-0.5">{t.media_density}:</span>
                          <span className="text-amber-400">{item.densities}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Segment: Eco Fact text */}
                    <div className="p-3 bg-stone-900/60 border border-stone-850 rounded-2xl">
                      <p className="text-[10px] font-sans text-stone-300 font-light leading-relaxed">
                        <span className="text-amber-500 font-mono font-semibold uppercase text-[9px] tracking-wider block mb-0.5">Conservation Fact:</span>
                        {localizedFact}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
