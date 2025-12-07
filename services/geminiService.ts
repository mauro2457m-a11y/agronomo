
import { GoogleGenAI, Type } from "@google/genai";
import { CropInfo } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. The app will not function correctly without a valid API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'YOUR_API_KEY_HERE' });

const cropInfoSchema = {
  type: Type.OBJECT,
  properties: {
    pests: {
      type: Type.ARRAY,
      description: "Lista de pragas comuns para a cultura.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome comum da praga." },
          scientificName: { type: Type.STRING, description: "Nome científico da praga." },
          description: { type: Type.STRING, description: "Descrição da praga e os danos que ela causa." },
          controlMethods: {
            type: Type.ARRAY,
            description: "Lista de métodos de controle, tanto químicos quanto culturais.",
            items: { type: Type.STRING }
          }
        },
        required: ["name", "scientificName", "description", "controlMethods"],
      }
    },
    diseases: {
      type: Type.ARRAY,
      description: "Lista de doenças comuns para a cultura.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome comum da doença." },
          agent: { type: Type.STRING, description: "O agente causador (ex: fungo, bactéria, vírus)." },
          symptoms: { type: Type.STRING, description: "Sintomas da doença na planta." },
          controlMethods: {
            type: Type.ARRAY,
            description: "Lista de métodos de controle, incluindo tratamentos químicos e medidas preventivas.",
            items: { type: Type.STRING }
          }
        },
        required: ["name", "agent", "symptoms", "controlMethods"],
      }
    }
  },
  required: ["pests", "diseases"],
};

export const fetchCropInfo = async (cropName: string): Promise<CropInfo> => {
  const prompt = `Forneça informações detalhadas sobre a cultura de '${cropName}' em português do Brasil. Eu preciso de uma lista de pragas comuns e doenças comuns que afetam essa cultura. Para cada praga, inclua o nome científico, uma descrição dos danos e métodos de controle. Para cada doença, inclua o agente causador, os sintomas e os métodos de controle. Siga estritamente o esquema JSON fornecido.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: cropInfoSchema,
        temperature: 0.2,
      },
    });
    
    const jsonText = response.text?.trim();
    if (!jsonText) {
      throw new Error("Resposta da API vazia ou inválida.");
    }
    
    return JSON.parse(jsonText) as CropInfo;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw new Error("Não foi possível obter os dados da cultura. Verifique sua conexão e a chave de API.");
  }
};
