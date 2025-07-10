import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

const model = 'gemini-2.0-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: 'Transcreva o audio para português do Brasil/ Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o text em parágrafos quando for apropriado'
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64
                }
            }
        ]
    })
    if(!response.text) {
        throw new Error('Não foi possível transcrever o audio');
    }
    return response.text;
}