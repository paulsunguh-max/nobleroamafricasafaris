import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded secure Gemini client utility, ensuring no instant crashes if key is omitted
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Full-stack API Endpoint for tailoring high-end custom safaris
app.post("/api/tailor-safari", async (req, res) => {
  const { destinations, travelers, durationDays, departureMonth, lodgingStyle, pacing, customWishesByGuest } = req.body;

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // Elegant, fallback blueprint response if GEMINI_API_KEY is not defined yet by the user
      const fallbackItinerary = `
# THE REVELATION EXPEDITION: A SOVEREIGN SOJOURN
## Prepared Exclusively for Your Distinguished Party (${travelers} Guests)
### OVERVIEW: ${durationDays} Days of Unrivaled East African Grandeur | ${departureMonth} Departure

*Disclaimer Note from Zuri Advisory: Your private concierge generator is currently running in curated preview mode (Settings > Secrets panel is pending your high-security GEMINI_API_KEY setup). We have pre-composed this master-level itinerary based on your preferences.*

---

## INTENDED HIGH-LUXURY EXPERIENCES
- **Elite Flight Transfers**: Private charter flights hopping between Nairobi, Samburu, and Maasai Mara.
- **Canopy Shell Inclusions**: Nightly stay in ultra-luxe sanctuaries (${lodgingStyle}) featuring panoramic escarpment decks and private plunge pools.
- **Tactical Pace**: Custom aligned to a **${pacing}** cadence, balancing intensive sunrise tracks with refined spa rest.

---

## CUSTOM DOSSIER BLUEPRINT

### Day 1: Touchdown & Plantation Splendor
* **Location**: Nairobi Highlands
* **Luxury Shelter**: Hemingways Nairobi (Muted Plantation Suite)
* **Experiences**: Fast-track customs greeting, private Mercedes chauffeur, and sunset garden champagne.

### Day 2: The Flight to Samburu’s Crimson Sands
* **Location**: Samburu Arid Reserve
* **Luxury Shelter**: Sasaab Clifftop Lodge (Moroccan Pool Villa)
* **Experiences**: Fly directly north crossing Mount Kenya, afternoon riverbed tracking of the Samburu Special Five.

### Day 3: Riverbed Whispers & Nomadic Heritages
* **Location**: Ewaso Nyiro River
* **Luxury Shelter**: Sasaab Clifftop Lodge
* **Experiences**: Camelback trek led by Samburu cultural elders, and twilight bush cocktails.

### Day 4: Flight Hopper to the Great Migration Plain
* **Location**: Maasai Mara Escarpment
* **Luxury Shelter**: Angama Mara Suite (Suspended over the Rift)
* **Experiences**: Charter flight over the Great Rift, panoramic escarpment sunset viewing.
${customWishesByGuest ? `\n### Day 5: Exclusive Celebration Focus (Your Custom Wish Response)\n* **Specific Highlights**: Designed around your wishes ("${customWishesByGuest}"). Enjoy custom balloon champagne safaris or romantic sunset candlelit banquets arranged in coordination with Mara rangers.` : ''}

### Day ${durationDays - 1}: The Great River Migration Search
* **Location**: Maasai Mara River Crossing Path
* **Luxury Shelter**: Angama Mara
* **Experiences**: Dedicated sunrise drive tracking cheetah families and wildebeest herd arrays.

### Day ${durationDays}: Farewell East Africa
* **Location**: Nairobi Departure
* **Luxury Shelter**: Day Suite: Hemingways Nairobi
* **Experiences**: Curated jewelry and artisan workshop walk, flight departure lounge escort.
`;
      return res.json({ success: true, itinerary: fallbackItinerary });
    }

    // Call Gemini API server-side
    const promptMessage = `
Draft an ultra-premium, highly personalized, day-by-day luxury safari travel dossier.
The client's choices are:
- Selected Destinations: ${destinations && destinations.length > 0 ? destinations.join(', ') : 'Maasai Mara and Amboseli'}
- Selected Traveler Sizing: ${travelers} guests
- Expected Duration: ${durationDays} days
- Target Month of Departure: ${departureMonth}
- Lodging Style Choice: ${lodgingStyle}
- Cadence/Pace Speed: ${pacing}
- Core Personal Desires & Wishes: ${customWishesByGuest || 'No custom wishes specified. Focus on peak wildlife sightings and luxury tents.'}

Incorporate stunning visual descriptions, private flight details, and elite lodges matching their lodging request. Ensure day-by-day breakdowns represent a natural high-end progression. Always reference their specific custom wishes in the itineraries. Do not output JSON wrappers inside the text response. Just output beautiful clean markdown.
`;

    const systemInstruction = `You are a legendary private concierge advisor for Zuri Trail Africa, a premier luxury safari operator inspired by Abercrombie & Kent and Micato.
Your task is to draft an ultra-premium, highly personalized, day-by-day luxury travel dossier for a client's private safari.
Represent our brand with magnificent, visual, and highly evocative prose.

Include details such as:
1. Elegant Private Flight routings, bypassing dusty transits.
2. Distinctive camps (like Angama Mara, Sasaab, Segera) matching the selected lodging tier.
3. Daily gourmet structures: sunrise coffee on raw escarpments, gourmet custom sundowners.
4. Wildlife expected during their specific travel month.
5. Personalized mentions of their custom wishes.

Format the output in beautiful, visually clean Markdown with clear headers like:
# THE ROYAL BLUEPRINT: [Tailored Journey Title]
## Prepared Exclusively for Your Distinguished Party (${travelers} Guests)
### OVERVIEW: ${durationDays} Days of Unrivaled African Majesty | ${departureMonth} Departure

## SUMMARY HIGHLIGHTS
- [Highlight 1]
- [Highlight 2]

## DAY-BY-DAY DOSSIER
### Day 1: [Day Title]
- **Active Spotting**: ...
- **Luxury Shelter**: ...
- **Advisor’s Note**: ...

Keep the prose pristine, luxurious, and deeply engaging. Always include realistic elite touchpoints. Return the output as raw markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
      }
    });

    const markdownText = response.text;
    res.json({ success: true, itinerary: markdownText });
  } catch (error: any) {
    console.error("Gemini generative error:", error);
    res.status(500).json({ success: false, error: "The satellite link failed to compile. Re-route reservation checks." });
  }
});

// Setup Vite Development Server or Static Files for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zuri Trail Africa application server booted onto http://localhost:${PORT}`);
  });
}

startServer();
