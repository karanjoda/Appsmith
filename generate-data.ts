import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function generateData() {
  const prompt = "Generate a JSON array of 20 realistic job candidates for a QA CRM. Include fields: id (uuid), name, email, phone, years_of_experience (number), current_location, primary_role, skills (array of strings), current_status (one of: Screening, Interviewing, Technical Test, Offered, Hired, Rejected), source, notes, and applied_date (ISO string). Ensure data is diverse (some have 10 years experience, some 0; different statuses).";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              email: { type: Type.STRING },
              phone: { type: Type.STRING },
              years_of_experience: { type: Type.NUMBER },
              current_location: { type: Type.STRING },
              primary_role: { type: Type.STRING },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              current_status: { type: Type.STRING },
              source: { type: Type.STRING },
              notes: { type: Type.STRING },
              applied_date: { type: Type.STRING }
            },
            required: ["id", "name", "email", "phone", "years_of_experience", "current_location", "primary_role", "skills", "current_status", "source", "notes", "applied_date"]
          }
        }
      }
    });

    const data = response.text;
    fs.mkdirSync("./src/data", { recursive: true });
    fs.writeFileSync("./src/data/mockCandidates.json", data);
    console.log("Data generated successfully!");
  } catch (error) {
    console.error("Error generating data:", error);
    process.exit(1);
  }
}

generateData();
