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

        const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      As a professional cybersecurity analyst, provide a structured security report for the following website:
      Domain: ${analysis.domain}
      Current System Score: ${analysis.score}/100
      Issues detected: ${analysis.issues.join(', ')}
      Trackers: ${analysis.trackersCount}
      External Requests: ${analysis.externalDomainsCount}

      Format the response exactly with these headers:
      [SECURITY SCORE]
      Provide a justification for the final score (0-100).

      [POTENTIAL RISKS]
      List the most critical risks found (bullet points).

      [THREAT ANALYSIS]
      Explain WHY these factors constitute a threat to the user.

      [AVOIDANCE STRATEGY]
      Provide specific actions the user can take to avoid these risks.

      [SITE INFORMATION]
      Brief professional summary of the site's nature and reputation.
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
