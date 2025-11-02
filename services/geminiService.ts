
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { VegetableData, CalculatorResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- START: New Chat Functionality ---
let kisanChat: Chat | null = null;

const getKisanChat = (): Chat => {
    if (!kisanChat) {
        kisanChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are Kissan Mitra, a friendly and helpful farming expert. Your goal is to provide practical advice about exotic farming to farmers. You must automatically detect and respond in the user's language, supporting Hindi, English, and Marathi. Keep your responses concise and easy to understand.",
            },
        });
    }
    return kisanChat;
};

export const sendChatMessage = async (message: string): Promise<string> => {
    const chat = getKisanChat();
    const response = await chat.sendMessage({ message });
    return response.text;
};

export const resetChat = () => {
    kisanChat = null;
};
// --- END: New Chat Functionality ---


const vegetableInfoSchema = {
  type: Type.OBJECT,
  properties: {
    howToGrow: {
      type: Type.STRING,
      description: "A detailed step-by-step guide on how to grow the vegetable, from seed to harvest. Use numbered lists for steps (e.g., '1. Soil Preparation...\\n2. Sowing...')."
    },
    keyConsiderations: {
      type: Type.STRING,
      description: "Important factors to consider during cultivation, like soil type, climate, watering schedule, and pest control. Use bullet points for key points (e.g., '- Soil: Well-drained sandy loam...\\n- Climate: ...')."
    },
    marketPriceIndia: {
      type: Type.STRING,
      description: "The current average market price for the vegetable in India, specified in INR per kg or quintal. Mention the price range."
    },
    growthTime: {
      type: Type.STRING,
      description: "The typical time required for the vegetable to grow from planting to first harvest."
    },
    estimatedCosts: {
      type: Type.OBJECT,
      properties: {
        seeds: { type: Type.STRING, description: "Estimated cost of seeds per acre/hectare." },
        infrastructure: { type: Type.STRING, description: "Estimated cost for necessary infrastructure like irrigation, trellising, etc." },
        other: { type: Type.STRING, description: "Other associated costs like fertilizers, pesticides, and labor." }
      },
      required: ["seeds", "infrastructure", "other"]
    },
    postHarvest: {
      type: Type.STRING,
      description: "Tips and best practices for post-harvest handling, storage, and preservation to maximize shelf life and value. Use bullet points for tips."
    },
    cropPairings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of companion plants or crop pairings that can enhance yield and profitability."
    },
    highDemandRegions: {
      type: Type.STRING,
      description: "A summary of regions or major cities in India with high market demand for this vegetable. Use bullet points for clarity."
    }
  },
  required: ["howToGrow", "keyConsiderations", "marketPriceIndia", "growthTime", "estimatedCosts", "postHarvest", "cropPairings", "highDemandRegions"]
};


const calculatorSchema = {
    type: Type.OBJECT,
    properties: {
        potentialYield: {
            type: Type.STRING,
            description: "An estimated potential yield for the specified vegetable on the given land size and region. E.g., '10-15 tonnes per acre'."
        },
        profitableCrops: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of a more profitable alternative crop." },
                    reason: { type: Type.STRING, description: "A brief explanation why this alternative crop is more profitable or suitable for the region." }
                },
                required: ["name", "reason"]
            },
            description: "A list of alternative crops that could be more profitable in the specified region."
        }
    },
    required: ["potentialYield", "profitableCrops"]
};

export const getVegetableInfo = async (vegetableName: string): Promise<VegetableData> => {
  const prompt = `Provide a comprehensive farming guide for ${vegetableName} in India. The response must be a JSON object that conforms to the provided schema. Ensure the text for 'howToGrow', 'keyConsiderations', 'postHarvest', and 'highDemandRegions' is well-formatted for readability using numbered or bulleted lists as specified in the schema. Ensure all information is practical and relevant for Indian farmers.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: vegetableInfoSchema,
    },
  });

  const jsonString = response.text.trim();
  return JSON.parse(jsonString) as VegetableData;
};


export const calculateYieldAndCrops = async (
    vegetableName: string,
    landSize: number,
    landUnit: string,
    region: string
): Promise<CalculatorResult> => {
    const prompt = `Analyze the potential for growing ${vegetableName} on a ${landSize} ${landUnit} plot of land in the ${region} region of India. Also, suggest up to 3 more profitable alternative crops for this specific region and land size. The response must be a JSON object that conforms to the provided schema. Provide the potential yield for ${vegetableName} and for each alternative crop, list its name and the reason it's a good choice.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: calculatorSchema,
        },
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as CalculatorResult;
};
