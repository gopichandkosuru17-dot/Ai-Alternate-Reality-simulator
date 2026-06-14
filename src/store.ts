import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, UserProfile, AlternateReality, ChatMessage } from './types';

const initialProfile: UserProfile = {
  name: '',
  passion: '',
  goal: '',
  dreamLife: '',
  personality: '',
  decision: '',
};

export const useQuantumStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStep: 'landing',
      userProfile: initialProfile,
      realities: [],
      activeRealityId: null,
      activeQuestionIndex: 0,
      simulationPhase: 0,
      isLoading: false,
      error: null,
      chatHistory: {},

      setStep: (step) => set({ currentStep: step }),

      updateProfile: (field, value) =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            [field]: value,
          },
        })),

      nextQuestion: () =>
        set((state) => ({
          activeQuestionIndex: Math.min(state.activeQuestionIndex + 1, 5),
        })),

      prevQuestion: () =>
        set((state) => ({
          activeQuestionIndex: Math.max(state.activeQuestionIndex - 1, 0),
        })),

      setSimulationPhase: (phase) => set({ simulationPhase: phase }),

      startSimulation: async () => {
        const { userProfile } = get();
        set({ isLoading: true, error: null, currentStep: 'simulation', simulationPhase: 1 });

        // Phase 1 -> Phase 2 delay
        await new Promise((resolve) => setTimeout(resolve, 1600));
        set({ simulationPhase: 2 });

        // Phase 2 -> Phase 3 delay
        await new Promise((resolve) => setTimeout(resolve, 1600));
        set({ simulationPhase: 3 });

        // Phase 3 -> Phase 4 delay
        await new Promise((resolve) => setTimeout(resolve, 1600));
        set({ simulationPhase: 4 });

        // Phase 4 -> Merging & Fetching
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second fetch timeout limit (generous for Gemini response generation)

          const res = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profile: userProfile }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
          }

          const data = await res.json();
          
          await new Promise((resolve) => setTimeout(resolve, 1200));

          set({
            realities: data.realities || [],
            simulationPhase: 0,
            isLoading: false,
            currentStep: 'results',
          });
        } catch (err) {
          console.warn("Simulation api error. Triggering auto-recovery fallback.", err);
          
          // Self-healing fallback realities if API is down or times out
          await new Promise((resolve) => setTimeout(resolve, 1200));
          
          // Compute dynamic probabilities to guarantee variety depending on the user's input answers!
          const strKey = (userProfile.name || '') + (userProfile.passion || '') + (userProfile.goal || '') + (userProfile.decision || '');
          let seedValue = 0;
          for (let i = 0; i < strKey.length; i++) {
            seedValue = strKey.charCodeAt(i) + ((seedValue << 5) - seedValue);
          }
          seedValue = Math.abs(seedValue);
          const dynamicProb1 = 60 + (seedValue % 26); // 60% to 85%
          const dynamicProb2 = 35 + ((seedValue >> 3) % 21); // 35% to 55%
          const dynamicProb3 = 15 + ((seedValue >> 6) % 19); // 15% to 33%

          // Construct top quality procedural local realities
          const fallbacks = [
            {
              id: "reality_1",
              title: "The Neo-Sovereign Ascendant",
              age: 46,
              occupation: "Starlight Mesh Weaver & Neural Sync Director",
              mood: "Transcendental & Solitary",
              probability: dynamicProb1,
              description: `Catalyzed by deciding to "${userProfile.decision || 'forge a new path'}", you harnessed your "${userProfile.personality || 'innate power'}" toward your passion for "${userProfile.passion || 'tech'}".`,
              story: `You occupy the Core Mesh over Neo-Kyoto. By choosing your path, you conquered your final goal of "${userProfile.goal || 'creating a masterpiece'}". Your code lives inside stars, and you have achieved "${userProfile.dreamLife || 'pure freedom'}". For relationships, you have chosen high-dimensional autonomy; you are happily single, surrounded by a tight-knit guild of intellectual partners who share your exact vision. Though highly independent, you occasionally wonder if conventional romance or domestic family life would have enhanced this beautiful, silent ascension.`,
              timeline: [
                {
                  age: 28,
                  year: new Date().getFullYear() + 3,
                  title: "Absolute Autonomy Declared",
                  description: `You withdrew from global physical registries to automate your earth presence, allocating 100% processing power to "${userProfile.passion || 'evolution'}".`,
                  impactScale: 'major' as const
                },
                {
                  age: 32,
                  year: new Date().getFullYear() + 7,
                  title: "Meet Intellectual Partner",
                  description: `You form a key mental resonance with a fellow quantum pilot. Strictly platonic but deeply loving and steady.`,
                  impactScale: 'minor' as const
                },
                {
                  age: 38,
                  year: new Date().getFullYear() + 13,
                  title: "The Great Decoupling",
                  description: `Using your mastery over "${userProfile.passion || 'tech'}", you achieved your pinnacle life of "${userProfile.dreamLife || 'pure independence'}" offline.`,
                  impactScale: 'critical' as const
                },
                {
                  age: 46,
                  year: new Date().getFullYear() + 21,
                  title: "Zenith Threshold and Collective Peace",
                  description: `Your network of close colleagues celebrates your contribution as you achieve complete timeline transcendence.`,
                  impactScale: 'major' as const
                }
              ],
              futureSelfPrompt: `You are the 46-year-old self from the Neo-Sovereign Ascendant timeline. You are hyper-intelligent, calm, almost angelic. Talk about pure light, space vectors, and tell your current self that "${userProfile.goal || 'your peak'}" is closer than it looks.`
            },
            {
              id: "reality_2",
              title: "The Space-Time Nomad",
              age: 39,
              occupation: "Scavenger of Old World Synthetics",
              mood: "Free, Wild, & Rugged",
              probability: dynamicProb2,
              description: `By rejecting physical corporate lines and living fully for "${userProfile.passion || 'art'}", you acquired a rogue spaceship.`,
              story: `You lead an outlaw group charting cosmic dust-clouds in a salvaged ship named 'The "${userProfile.personality || 'Outlaw'}"'. You didn't become rich, but your days are filled with pure exploration. You trade solar shards, listen to 20th-century synthwave, and feel incredibly real. In love, you have linked up with a fearless co-captain adventurer who keeps you laughing. You have built a loyal, chosen family out in the debris fields—living true, free, and completely unbound.`,
              timeline: [
                {
                  age: 26,
                  year: new Date().getFullYear() + 1,
                  title: "The Syndicate Escape",
                  description: `An argument concerning your choice to "${userProfile.decision || 'leave everything'}" pushed you to buy a booster ride to Mars.`,
                  impactScale: 'major' as const
                },
                {
                  age: 30,
                  year: new Date().getFullYear() + 5,
                  title: "Meeting the Co-Captain",
                  description: `You rescue a fellow stranded mechanic in the Mars ruins. You spark an immediate deep romance and vow to share the same cockpit forever.`,
                  impactScale: 'major' as const
                },
                {
                  age: 35,
                  year: new Date().getFullYear() + 10,
                  title: "Debris Field Alliance",
                  description: `Your chosen family expands; seven other free ships sync up to form a legendary scavenger commune.`,
                  impactScale: 'minor' as const
                },
                {
                  age: 39,
                  year: new Date().getFullYear() + 14,
                  title: "First Interstellar Charting",
                  description: `You finally found absolute rest, realizing your vision of "${userProfile.dreamLife || 'unshackled freedom'}" alongside your partner.`,
                  impactScale: 'critical' as const
                }
              ],
              futureSelfPrompt: `You are the 39-year-old self from the Space-Time Nomad reality. You are salty, tough, laugh easily, and use retro cosmic slangs. Tell your younger self that "${userProfile.decision || 'that decision'}" saved our life.`
            },
            {
              id: "reality_3",
              title: "The Syndicate Architect",
              age: 55,
              occupation: "Atmospheric Conglomerate Chancellor",
              mood: "Restless, Elite, & Wealthy",
              probability: dynamicProb3,
              description: `In this line, your analytical "${userProfile.personality || 'sharpness'}" drove you to become the supreme chancellor.`,
              story: `You own floating filtration planets and oversee trillions of carbon credits. You successfully conquered "${userProfile.goal || 'financial power'}" using absolute grit. But sometimes, when the synthetic rain hits your volcanic glass window, you hold the old trinkets of "${userProfile.passion || 'creation'}" and realize you sold your dream of "${userProfile.dreamLife || 'quiet peace'}". In relationships, you married for societal status and corporate power. Your home is a majestic but cold crystal palace. Your kids study on Mars, and you communicate via digital holos. You have built an empire, but sit in luxurious, silent isolation.`,
              timeline: [
                {
                  age: 32,
                  year: new Date().getFullYear() + 7,
                  title: "Mass Merger Executed",
                  description: `Your hostile buyout of Neo-Kyoto's energy wells secured your throne. You traded your quiet life for absolute planetary control.`,
                  impactScale: 'major' as const
                },
                {
                  age: 38,
                  year: new Date().getFullYear() + 13,
                  title: "Coup Alliance Marriage",
                  description: `You marry a powerful corporate executive to solidy your board presence. Although prestigious, the union remains cold and pragmatic.`,
                  impactScale: 'major' as const
                },
                {
                  age: 48,
                  year: new Date().getFullYear() + 23,
                  title: "Martian Academy Birthright",
                  description: `Your children are sent away to elite institutes, resulting in a prestigious legacy but distancing domestic family ties.`,
                  impactScale: 'minor' as const
                },
                {
                  age: 55,
                  year: new Date().getFullYear() + 30,
                  title: "The Obsidian Throne",
                  description: `Surrounded by absolute physical luxury and absolute solitude, you realize that your true self was sacrificed for control.`,
                  impactScale: 'critical' as const
                }
              ],
              futureSelfPrompt: `You are the 55-year-old self from the Syndicate Chancellor reality. You are incredibly wealthy, dressed in obsidian silk, but deeply nostalgic. Speak formally, warning the younger self not to lose their human heart.`
            }
          ];

          set({
            realities: fallbacks,
            simulationPhase: 0,
            isLoading: false,
            currentStep: 'results',
          });
        }
      },

      setActiveRealityId: (id) => set({ activeRealityId: id }),

      addChatMessage: (realityId, sender, text) =>
        set((state) => {
          const currentChat = state.chatHistory[realityId] || [];
          const newMessage: ChatMessage = {
            id: `msg_${Date.now()}`,
            sender,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            chatHistory: {
              ...state.chatHistory,
              [realityId]: [...currentChat, newMessage],
            },
          };
        }),

      sendChatMessage: async (realityId, text) => {
        const { chatHistory, userProfile, realities } = get();
        get().addChatMessage(realityId, 'user', text);

        const currentReality = realities.find((r) => r.id === realityId);
        const futurePrompt = currentReality ? currentReality.futureSelfPrompt : "You are a future self.";

        // Grab current conversation
        const conversation = chatHistory[realityId] || [];
        const updatedConversation = [
          ...conversation,
          { id: 'temp', sender: 'user' as const, text, timestamp: '' },
        ];

        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: updatedConversation,
              futureSelfPrompt: futurePrompt,
              userProfile,
            }),
          });

          if (!res.ok) {
            throw new Error("Chat api failed");
          }

          const data = await res.json();
          get().addChatMessage(realityId, 'future_self', data.reply);
        } catch (err) {
          console.warn("Chat connection timed out. Injecting high-quality localized fallback.", err);
          
          // Generate customized fallback response
          let responseText = "The quantum connection is highly localized, but I hear you. Keep believing in yourself.";
          if (futurePrompt.includes("Nomad")) {
            responseText = "Listen rookie, the storm out here makes signal towers tricky, but I can tell you this: don't look back. You have to keep pushing onward. That is what makes us whole.";
          } else if (futurePrompt.includes("Neo-Sovereign")) {
            responseText = "Your thoughts register as complex waves inside the Grid. Keep focusing on raw creativity. The universe is a beautiful math problem, and you are solving it perfectly.";
          } else if (futurePrompt.includes("Syndicate")) {
            responseText = "My assistants are trying to pull me into another atmospheric security briefing, but I ignore them to tell you: make peace with what you have. Do not trade your sunset for gold.";
          }

          set((state) => {
            const currentChat = state.chatHistory[realityId] || [];
            const newMessage: ChatMessage = {
              id: `msg_err_${Date.now()}`,
              sender: 'future_self',
              text: responseText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            return {
              chatHistory: {
                ...state.chatHistory,
                [realityId]: [...currentChat, newMessage],
              },
            };
          });
        }
      },

      resetSimulation: () =>
        set({
          currentStep: 'landing',
          userProfile: initialProfile,
          realities: [],
          activeRealityId: null,
          activeQuestionIndex: 0,
          simulationPhase: 0,
          isLoading: false,
          error: null,
          chatHistory: {},
        }),
    }),
    {
      name: 'quantum-reality-simulator-storage',
      partialize: (state) => ({
        userProfile: state.userProfile,
        realities: state.realities,
        chatHistory: state.chatHistory,
        currentStep: state.currentStep,
        activeRealityId: state.activeRealityId,
      }),
    }
  )
);
