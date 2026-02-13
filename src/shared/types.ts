export interface SecurityAlert {
    type: 'SECURITY_ALERT';
    payload: {
        reason: 'INSECURE_FORM_ON_HTTP' | 'PHISHING_SUSPECTED' | 'MALICIOUS_DOMAIN';
        url: string;
        timestamp: number;
    };
}

export interface RiskFactors {
    connection: number; // 0-100
    privacy: number;    // 0-100
    network: number;    // 0-100
    domain: number;     // 0-100
}

export interface AnalysisResult {
    url: string;
    domain: string;
    score: number;
    status: 'SAFE' | 'WARNING' | 'DANGEROUS';
    factors: RiskFactors;
    trackersCount: number;
    externalDomainsCount: number;
    timestamp: number;
    issues: string[];
}

export interface ExtensionState {
    threatHistory: AnalysisResult[];
    settings: {
        aiEnabled: boolean;
        riskThreshold: number;
        apiKey?: string;
    };
}
