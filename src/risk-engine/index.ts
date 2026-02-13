import type { RiskFactors } from '../shared/types';

export class RiskEngine {
    static calculateScore(factors: RiskFactors): number {
        const weights = {
            connection: 0.3,
            privacy: 0.3,
            network: 0.2,
            domain: 0.2
        };

        return Math.round(
            factors.connection * weights.connection +
            factors.privacy * weights.privacy +
            factors.network * weights.network +
            factors.domain * weights.domain
        );
    }

    static getStatus(score: number): 'SAFE' | 'WARNING' | 'DANGEROUS' {
        if (score < 30) return 'SAFE';
        if (score < 60) return 'WARNING';
        return 'DANGEROUS';
    }

    static analyzeDomain(url: string): { score: number; issues: string[] } {
        const issues: string[] = [];
        let score = 0;

        try {
            const parsed = new URL(url);
            const domain = parsed.hostname;

            // Connection Risk
            if (parsed.protocol !== 'https:') {
                score += 30;
                issues.push('Insecure connection (HTTP)');
            }

            // Domain Risk (Heuristics)
            const parts = domain.split('.');
            if (parts.length > 4) {
                score += 15;
                issues.push('Deep subdomain structure');
            }

            const suspiciousTLDs = ['.xyz', '.top', '.buzz', '.gq', '.tk', '.ml'];
            if (suspiciousTLDs.some(tld => domain.endsWith(tld))) {
                score += 20;
                issues.push('Suspicious Top-Level Domain (TLD)');
            }

            // Check for numeric IP as domain
            if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain)) {
                score += 25;
                issues.push('Accessed via IP address instead of domain');
            }

        } catch (e) {
            score = 100;
            issues.push('Invalid URL');
        }

        return { score: Math.min(score, 100), issues };
    }
}
