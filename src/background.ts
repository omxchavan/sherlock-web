import { RiskEngine } from './risk-engine';
import { TrackerDetector } from './services/tracker-detector';
import type { AnalysisResult, RiskFactors } from './shared/types';

const tabState: Record<number, { trackers: Set<string>; external: Set<string> }> = {};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ threatHistory: [] });
    console.log('SecureWeb AI initialized');
});

// Listener for network requests to track trackers and external domains
chrome.webRequest.onBeforeRequest.addListener(
    (details: chrome.webRequest.OnBeforeRequestDetails) => {
        if (details.tabId < 0) return;

        if (!tabState[details.tabId]) {
            tabState[details.tabId] = { trackers: new Set(), external: new Set() };
        }

        const url = details.url;
        const isTracker = TrackerDetector.isTracker(url);
        // const domain = TrackerDetector.getBaseDomain(url);

        if (isTracker) {
            tabState[details.tabId].trackers.add(url);
        }

        return undefined;
    },
    { urls: ["<all_urls>"] }
);

// Listener for navigation to perform analysis
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Reset state on new navigation start to avoid leak
    if (changeInfo.status === 'loading') {
        tabState[tabId] = { trackers: new Set(), external: new Set() };
        console.log(`[SecureWeb AI] Tab ${tabId} loading, resetting state.`);
    }

    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome:') && !tab.url.startsWith('chrome-extension:')) {
        const url = tab.url;
        console.log(`[SecureWeb AI] Analyzing: ${url}`);
        const domain = new URL(url).hostname;

        const baseAnalysis = RiskEngine.analyzeDomain(url);
        const state = tabState[tabId] || { trackers: new Set(), external: new Set() };

        const factors: RiskFactors = {
            connection: url.startsWith('https') ? 0 : 40,
            privacy: Math.min(Math.max(0, state.trackers.size - 3) * 5, 100),
            network: Math.min(Math.max(0, state.external.size - 10) * 1, 100),
            domain: baseAnalysis.score
        };

        const finalScore = RiskEngine.calculateScore(factors);
        console.log(`[SecureWeb AI] Final Score for ${domain}: ${finalScore}`, factors);

        const result: AnalysisResult = {
            url,
            domain,
            score: finalScore,
            status: RiskEngine.getStatus(finalScore),
            factors,
            trackersCount: state.trackers.size,
            externalDomainsCount: state.external.size,
            timestamp: Date.now(),
            issues: baseAnalysis.issues
        };

        // Store in history (keep last 50)
        chrome.storage.local.get(['threatHistory'], (data: { threatHistory?: AnalysisResult[] }) => {
            const history = data.threatHistory || [];
            // Replace existing entry for same URL if exists, or prepand
            const filteredHistory = history.filter((h: AnalysisResult) => h.url !== url);
            const newHistory = [result, ...filteredHistory].slice(0, 50);
            chrome.storage.local.set({ threatHistory: newHistory });
        });

        // Reset tab state after full scan
        // tabState[tabId] = { trackers: new Set(), external: new Set() };
    }
});

// Clean up tab state on close
chrome.tabs.onRemoved.addListener((tabId) => {
    delete tabState[tabId];
});

// Handle alerts from content script
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'SECURITY_ALERT') {
        console.warn('Security Alert received:', message.payload);
        // You could show a notification here if needed
    }
});
