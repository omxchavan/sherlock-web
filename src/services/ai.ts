import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResult } from "../shared/types";

export class AIService {
    private genAI: GoogleGenerativeAI | null = null;

    constructor(apiKey: string) {
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
        }
    }

    async generateSecuritySummary(analysis: AnalysisResult): Promise<string> {
        if (!this.genAI) return "AI Summary unavailable: Please set your Gemini API Key in settings.";

        const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      As a professional cybersecurity analyst, provide a concise summary of the security risks for the following website:
      Domain: ${analysis.domain}
      Security Score: ${analysis.score}/100 (Higher is more dangerous)
      Issues found: ${analysis.issues.join(', ')}
      Trackers detected: ${analysis.trackersCount}
      Third-party domains: ${analysis.externalDomainsCount}

      Provide a 3-sentence professional explanation of the risk and one recommendation for the user.
    `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Gemini API Error:', error);
            return "Error generating AI summary. Please check your API key and connection.";
        }
    }
}
