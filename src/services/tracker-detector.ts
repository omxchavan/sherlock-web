export const COMMON_TRACKERS = [
    'google-analytics.com',
    'googletagmanager.com',
    'doubleclick.net',
    'facebook.net',
    'facebook.com/tr',
    'adnxs.com',
    'quantserve.com',
    'scorecardresearch.com',
    'amazon-adsystem.com',
    'googleadservices.com',
    'hotjar.com',
    'criteo.com',
    'taboola.com',
    'outbrain.com',
    'mixpanel.com',
    'segment.io',
    'analytics.google.com',
    'connect.facebook.net',
    'static.ads-twitter.com',
    'pixel.wp.com',
    'bat.bing.com',
    'mc.yandex.ru',
    'drift.com',
    'intercom.io',
    'clarity.ms',
    'newrelic.com',
    'datadoghq.com',
    'crazyegg.com',
    'piwik.pro',
    'matomo.org'
];

export class TrackerDetector {
    static isTracker(url: string): boolean {
        try {
            const hostname = new URL(url).hostname;
            return COMMON_TRACKERS.some(tracker => hostname.includes(tracker));
        } catch {
            return false;
        }
    }

    static getBaseDomain(url: string): string {
        try {
            const hostname = new URL(url).hostname;
            const parts = hostname.split('.');
            if (parts.length >= 2) {
                return parts.slice(-2).join('.');
            }
            return hostname;
        } catch {
            return '';
        }
    }
}
