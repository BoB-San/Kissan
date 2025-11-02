
export interface VegetableData {
  howToGrow: string;
  keyConsiderations: string;
  marketPriceIndia: string;
  growthTime: string;
  estimatedCosts: {
    seeds: string;
    infrastructure: string;
    other: string;
  };
  postHarvest: string;
  cropPairings: string[];
  highDemandRegions: string;
}

export interface ProfitableCrop {
  name: string;
  reason: string;
}

export interface CalculatorResult {
  potentialYield: string;
  profitableCrops: ProfitableCrop[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
  "Ladakh", "Lakshadweep", "Puducherry"
];
