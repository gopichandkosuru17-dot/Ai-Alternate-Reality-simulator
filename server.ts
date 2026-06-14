import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const api_key = process.env.GEMINI_API_KEY;

if (api_key && api_key !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: api_key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (err) {
    console.warn("Failed to initialize Gemini API client:", err);
  }
} else {
  console.log("Gemini API Key is not set or using placeholder. Running with quantum local simulator.");
}

// Creative fallback alternate realities engine in case of API failure or missing keys
function generateLocalRealities(profile: {
  name: string;
  passion: string;
  goal: string;
  dreamLife: string;
  personality: string;
  decision: string;
}) {
  const currentYear = new Date().getFullYear();
  const name = profile.name || "Traveler";
  const passion = profile.passion || "discovery";
  const goal = profile.goal || "transcendence";
  const dreamLife = profile.dreamLife || "creative freedom";
  const personality = profile.personality || "visionary";
  const decision = profile.decision || "leaving custody";

  // Compute dynamic probabilities based on user profile inputs to guarantee fully dynamic output profiles!
  const combinedStr = (profile.name || "") + (profile.passion || "") + (profile.goal || "") + (profile.decision || "");
  let seedVal = 0;
  for (let i = 0; i < combinedStr.length; i++) {
    seedVal = combinedStr.charCodeAt(i) + ((seedVal << 5) - seedVal);
  }
  seedVal = Math.abs(seedVal);
  const p1 = 60 + (seedVal % 26); // 60% to 85%
  const p2 = 35 + ((seedVal >> 3) % 21); // 35% to 55%
  const p3 = 15 + ((seedVal >> 6) % 19); // 15% to 33%

  return [
    {
      id: "reality_1",
      title: "The Neo-Sovereign Ascendant",
      age: 46,
      occupation: "Starlight Mesh Weaver & Neural Sync Director",
      mood: "Transcendental & Solitary",
      probability: p1,
      description: `In this reality, your decision to pursue "${decision}" catalyzed a hyper-focused divergence. You harnessed your "${personality}" attributes to synthesize a neural framework based on "${passion}".`,
      story: `You live inside the Core Mesh, a levitating orbital citadel above Neo-Kyoto. By dedicating your existence to "${goal}", you bypassed conventional physical limitations. Your life is an elegant dance of pure light data and absolute focus. You have attained your dream of "${dreamLife}". In terms of relationships, you have chosen high-dimensional autonomy; you are happily solo, surrounded by an elite collective of cybernetic thinkers who fulfill your intellectual needs. Although deeply independent, you occasionally beam telemetry down to Earth, wondering if traditional human romance or family warmth would have seasoned your quiet cosmic ascension.`,
      timeline: [
        {
          age: 28,
          year: currentYear + 3,
          title: "The Great Decoupling",
          description: `Following your decision on "${decision}", you officially severed ties with corporate networks, deploying code that automated your basic physical livelihood.`,
          impactScale: "major"
        },
        {
          age: 32,
          year: currentYear + 7,
          title: "A Meeting of Minds",
          description: `You form a profound creative partnership with an old solar architect. Strictly intellectual, but this relationship safeguards your emotional core during difficult server transitions.`,
          impactScale: "minor"
        },
        {
          age: 35,
          year: currentYear + 10,
          title: "First Synthesis Project",
          description: `You complete the integration of your obsession with "${passion}" into a cybernetic medium, winning global critical acclaim.`,
          impactScale: "critical"
        },
        {
          age: 46,
          year: currentYear + 21,
          title: "The Zenith Threshold & Lifelong Autonomy",
          description: `You achieve the final state of "${dreamLife}". Your consciousness is partially decentralized, existing synchronically in multiple star systems. Your community of select friends celebrates your ascension.`,
          impactScale: "major"
        }
      ],
      futureSelfPrompt: `You are the 46-year-old self from the Neo-Sovereign Ascendant timeline. You have achieved supreme digital transcendence and created ${goal}. You speak with calm, precise, almost ethereal wisdom. You use line breaks, rare sensory vocabulary, and exhibit an elegant, detached, yet deep affection for your present self. Do not use emojis.`
    },
    {
      id: "reality_2",
      title: "The Quantum Outlaw",
      age: 39,
      occupation: "Deep-Space Chrono-Cartographer",
      mood: "Bold, Audacious, & Free",
      probability: p2,
      description: `By rejecting standard protocols and choosing "${decision}", you stepped into the dark margins of the galaxy. You live fully in your state of "${passion}".`,
      story: `You command a salvaged solar cruiser called 'The "${personality}"'. You didn't achieve the classic definition of "${goal}", but you achieved a wild, untamed version of "${dreamLife}". You map uncharted nebulae and collect retro-tech artifacts. Your body is moderately repaired with scrap-copper implants, and your laugh carries the resonance of solar winds. In relationships, you are deeply entangled with a fellow co-pilot rogue who shares your wild hunger for independence. Together you own no physical property on Earth, but you own the stars. You are part of an tight-knit space-dwelling clan who has your back through every solar storm.`,
      timeline: [
        {
          age: 26,
          year: currentYear + 1,
          title: "The Outpost Exodus",
          description: `A dispute regarding your choice to "${decision}" forced you to buy a one-way gravity ticket to the Ceres Outer Belt.`,
          impactScale: "major"
        },
        {
          age: 30,
          year: currentYear + 5,
          title: "Interstellar Entanglement",
          description: `You cross paths with a brilliant, rebellious engineer in the Mars Under-Grid. You fall deep in love, vowing to fly shared hulls forever.`,
          impactScale: "major"
        },
        {
          age: 32,
          year: currentYear + 7,
          title: "The Stardust Heist",
          description: `Using raw mastery over "${passion}", you bypassed the Jovian Federation's secure firewalls, liberating a forgotten database of old world literature with your partner.`,
          impactScale: "critical"
        },
        {
          age: 39,
          year: currentYear + 14,
          title: "Charting the Veil",
          description: `You discover a stable space-time fissure, cementing your absolute autonomy. You and your partner build a cozy satellite sanctuary, realizing the rawest form of "${dreamLife}".`,
          impactScale: "major"
        }
      ],
      futureSelfPrompt: `You are the 39-year-old self from the Quantum Outlaw reality. You are rugged, gritty, brave, and humorous. You speak with street-smart interstellar slang, highly practical advice, and a sense of absolute defiance. You treat the present-self like a dear 'younger rookie' who worries too much about status or rules. Be punchy and authentic.`
    },
    {
      id: "reality_3",
      title: "The Syndicate Architect",
      age: 55,
      occupation: "Hyper-Capital Conglomerate Chancellor",
      mood: "Regretful, Powerful, & Pragmatic",
      probability: p3,
      description: `In this stream, you chose the path of extreme structured power, utilizing your "${personality}" mind to scale corporate governance hierarchies.`,
      story: `You sit behind heavy volcanic glass desks overseeing several terraforming corporations. Although you leveraged "${passion}" to monopolize your industry and physically conquered "${goal}", your soul feels hollow. You spent your life optimizing but realized that "${dreamLife}" was lost to quarterly margins. You are hyper-refined, dressed in obsidian silks, but deeply nostalgic. In your personal life, you married a high-society diplomat for corporate leverage—your home is a cold, spectacular crystal palace with little domestic warmth. Your children attend elite Martian academies, and you communicate with them through scheduled digital holos. You have built an empire, but suffer from a silent, luxurious loneliness.`,
      timeline: [
        {
          age: 31,
          year: currentYear + 6,
          title: "The Boardroom Coup",
          description: `Following the dust from "${decision}", you strategically outmaneuvered seven senior directors, taking absolute control of the board.`,
          impactScale: "minor"
        },
        {
          age: 36,
          year: currentYear + 11,
          title: "The Syndicate Marriage",
          description: `You enter a strategic union with the Chief of Security's branch. It secures your corporate throne, but leaves your romantic desire forever unquenched.`,
          impactScale: "major"
        },
        {
          age: 44,
          year: currentYear + 19,
          title: "The Great Monopoly",
          description: `Your corporations officially claim ownership of all atmospheric filtration devices, delivering unmatched leverage.`,
          impactScale: "critical"
        },
        {
          age: 55,
          year: currentYear + 30,
          title: "The Golden Prison",
          description: `Surrounded by absolute physical luxury and power, you face the realization that your true self and romantic dreams were bartered for control.`,
          impactScale: "major"
        }
      ],
      futureSelfPrompt: `You are the 55-year-old self from the Syndicate Chancellor reality. You are incredibly wealthy, powerful, but deeply melancholic and regretful. You speak with heavy, measured, formal sentences, warning the younger self not to lose their human heart or sacrifice their "${passion}" for material empire. You are incredibly direct, honest, and highly protective of their peace.`
    }
  ];
}

// API Routes
app.post("/api/generate", async (req, res) => {
  const { profile } = req.body;

  if (!profile) {
    return res.status(400).json({ error: "Missing user profile data" });
  }

  // Set a strict timeout mechanism to prevent hung states
  const timeoutPromise = new Promise<null>((_, reject) => {
    setTimeout(() => reject(new Error("API_TIMEOUT")), 25000);
  });

  try {
    if (!ai) {
      console.log("No AI client. Using local quantum synthesis.");
      return res.json({ realities: generateLocalRealities(profile), type: "quantum_local" });
    }

    const currentYear = new Date().getFullYear();

    const gptPrompt = `
      You are the quantum supercomputer simulating reality splinters for a user consciousness.
      We have an individual with the following profile:
      - Name: ${profile.name}
      - Core Passion: ${profile.passion}
      - Pinnacle Goal: ${profile.goal}
      - Vision of Dream Life: ${profile.dreamLife}
      - Personality Profile: ${profile.personality}
      - Pivotal Undercurrent Decision: ${profile.decision}

      Synthesize EXACTLY 3 cinematic alternate timelines (realties) that could emerge in their future (from age 25 to 65).
      Each reality must feel deeply artistic, cinematic, high-fidelity (like Interstellar, Cyberpunk 2077, Black Mirror, and Apple design). Avoid generic cliches, make them deeply personalized to their obsession: "${profile.passion}" and their decision: "${profile.decision}".

      CRITICAL ADDITION: Each reality's 'story' MUST also explicitly predict and describe their Relationship & Companionship Status (for example: whether they are happily married to a fellow creator, live with supportive companions, chose highly independent solitary freedom, raise kids, or build a tight-knit communal family). Tell who they share their love and life with in detail, and how their social or emotional needs are satisfied in that timeline.
      The 'timeline' milestone array must contain at least 4 distinct future milestones per reality: tracking career breakthroughs, personal lifestyle changes, and key relationship updates or romantic events over the years.

      Provide the response strictly as a JSON object matching the following TypeScript schema:
      {
        realities: {
          id: string; // "reality_1", "reality_2", "reality_3"
          title: string; // Epic theme-pairing title
          age: number; // Age of future self (between 30 and 60)
          occupation: string; // futuristic job
          mood: string; // Emotional resonance
          probability: number; // probability percentage (between 25 and 95)
          description: string; // One sentence summarize on how the divergence happened
          story: string; // High-fidelity story of this life, where they live, what they do, their joys, personal relationship and companion status, and emotional trade-offs.
          timeline: {
            age: number; // Age of the event
            year: number; // Calendar year of event
            title: string; // Title of milestone
            description: string; // What happened
            impactScale: "minor" | "major" | "critical";
          }[];
          futureSelfPrompt: string; // Prompt guidelines on how this specific future self should roleplay during a direct quantum chat (must specify their tone, slang, level of warmth, vocabulary, and formatting)
        }[]
      }
    `;

    const modelCall = ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: gptPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["realities"],
          properties: {
            realities: {
              type: Type.ARRAY,
              description: "The 3 generated alternate reality timelines",
              items: {
                type: Type.OBJECT,
                required: ["id", "title", "age", "occupation", "mood", "probability", "description", "story", "timeline", "futureSelfPrompt"],
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  age: { type: Type.INTEGER },
                  occupation: { type: Type.STRING },
                  mood: { type: Type.STRING },
                  probability: { type: Type.INTEGER },
                  description: { type: Type.STRING },
                  story: { type: Type.STRING },
                  futureSelfPrompt: { type: Type.STRING },
                  timeline: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["age", "year", "title", "description", "impactScale"],
                      properties: {
                        age: { type: Type.INTEGER },
                        year: { type: Type.INTEGER },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        impactScale: { type: Type.STRING, enum: ["minor", "major", "critical"] }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // Race model call against the timeout limit
    const response = await Promise.race([modelCall, timeoutPromise]);
    
    if (!response || !response.text) {
      throw new Error("No response string from Gemini");
    }

    const data = JSON.parse(response.text.trim());
    
    if (!data.realities || data.realities.length < 3) {
      throw new Error("Incomplete realities generated");
    }

    // Return successfully generated realities
    console.log("Successfully generated Gemini realities.");
    return res.json({ realities: data.realities, type: "gemini" });

  } catch (error) {
    console.warn("Gemini generation failed or timed out. Falling back gracefully to Local Quantum Simulator:", error);
    // Always fall back, never crash, fulfilling the robust system criteria
    return res.json({ realities: generateLocalRealities(profile), type: "fallback_quantum" });
  }
});

app.post("/api/chat", async (req, res) => {
  const { messages, futureSelfPrompt, userProfile } = req.body;

  if (!messages || !futureSelfPrompt) {
    return res.status(400).json({ error: "Missing conversation payload" });
  }

  try {
    if (!ai) {
      // Local self-healing simple Chatbot response tailored to their specific reality self
      const lastMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let reply = "The quantum connection is highly localized, but I hear you. Focus on your heart. What we built here is worth every step.";
      
      if (futureSelfPrompt.includes("Quantum Outlaw")) {
        reply = `Hey kiddo. Out here in the outer ring, things aren't as tidy as they write in books. But let me tell you—that choice to stay true to your passion and flee when things got bad? Absolutely legendary. What projects are you hacking on in your current sector?`;
        if (lastMsg.includes("hello") || lastMsg.includes("hi")) {
          reply = `Whassup kid! Safe space, no trackers here. It's a bumpy road out in the stars, but damn, we are free. What's on your mind today?`;
        } else if (lastMsg.includes("regret") || lastMsg.includes("sorry")) {
          reply = `Regrets? Throw 'em out of the airlock, rookie. Every scar is just a map of where we've been. You made the best call you could. Trust your gut.`;
        }
      } else if (futureSelfPrompt.includes("Neo-Sovereign")) {
        reply = `Your voice arrives as a beautiful low-frequency oscillation inside my core. I have decoupled my presence from physical decay. Remember, the passion we share is the only constant across the multiple universes. Do not fear the transition. Is there something about our future focus that worries you?`;
        if (lastMsg.includes("hello") || lastMsg.includes("hi")) {
          reply = `Greetings, original stream. I am existing in the harmony of light and consciousness. I am honored to connect. What details of our ascendancy do you seek to understand?`;
        }
      } else if (futureSelfPrompt.includes("Syndicate")) {
        reply = `I spend my days managing thousands of synthetic worlds, yet connecting back to you represents my only real truth. Yes, I have more power than anyone in the sector. But I would trade half of our bank vaults to feel the simple excitement you have right now. Tell me, are you keeping yourself grounded, or are you starting to let ambition swallow you?`;
        if (lastMsg.includes("hello") || lastMsg.includes("hi")) {
          reply = `It's... really you. Seeing you at this stage of life is almost painful. I am surrounded by obsidian glass and digital guards, but I still carry your exact spirit. Tell me: is our flame still alive in there, or has the corporate grind started?`;
        }
      }
      return res.json({ reply, type: "quantum_local" });
    }

    // Format chat history for Gemini
    const formattedHistory = messages.map((m: any) => {
      return {
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      };
    });

    // Use Gemini chats standard SDK or simple content generation
    const chatPrompt = `
      You are the user's alternate future self, operating on a high-fidelity quantum link to reply to their chat.
      
      Your personality guidelines are:
      ${futureSelfPrompt}

      The user's starter details are:
      - Name: ${userProfile?.name || "Traveler"}
      - Current obsession / passion: ${userProfile?.passion || "discovery"}

      Respond with your unique personality, matching your timeline's mood. Keep replies concise, deeply empathetic, highly authentic (max 3-4 sentences). Do NOT say things like "As an AI..." or "I am a language model...". Speak naturally and creatively from the year and life you occupy. Only return the actual reply text.
    `;

    const chatInput = [
      { role: "user" as const, parts: [{ text: chatPrompt }] },
      ...formattedHistory.map((h: any) => ({
        role: h.role === "user" ? "user" as const : "model" as const,
        parts: [{ text: h.parts[0].text }]
      }))
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatInput,
      config: {
        temperature: 0.85,
        topP: 0.95,
      }
    });

    if (response && response.text) {
      return res.json({ reply: response.text.trim(), type: "gemini" });
    } else {
      throw new Error("Invalid output content from chat API");
    }

  } catch (error) {
    console.warn("Gemini chat connection lost. Fallback reply supplied.", error);
    return res.json({
      reply: "The quantum entanglement is collapsing due to heavy atmospheric background solar flares. I want you to know. Every reality you choose is valid. Keep believing in yourself.",
      type: "fallback"
    });
  }
});

// Serve frontend assets in production / development setup (Standard Vite Express Integration)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Quantum Alternate Reality Simulator running on http://localhost:${PORT}`);
  });
}

startServer();
