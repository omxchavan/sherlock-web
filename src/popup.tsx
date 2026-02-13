import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { motion } from 'framer-motion'
import { Shield, ShieldAlert, ShieldCheck, ExternalLink, Activity, Info } from 'lucide-react'
import './index.css'
import type { AnalysisResult } from './shared/types'
import { RiskEngine } from './risk-engine'

const Popup = () => {
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get current tab analysis from background
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.url) {
                chrome.storage.local.get(['threatHistory'], (data: { threatHistory?: AnalysisResult[] }) => {
                    const history = data.threatHistory || [];
                    const current = history.find((h: AnalysisResult) => h.url === activeTab.url);
                    setAnalysis(current || null);
                    setLoading(false);
                });
            }
        });

        // Listen for storage updates
        chrome.storage.onChanged.addListener(() => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTab = tabs[0];
                if (activeTab?.url) {
                    chrome.storage.local.get(['threatHistory'], (data: { threatHistory?: AnalysisResult[] }) => {
                        const history = data.threatHistory || [];
                        const current = history.find((h: AnalysisResult) => h.url === activeTab.url);
                        setAnalysis(current || null);
                    });
                }
            });
        });
    }, []);

    const score = analysis?.score || 0;
    const status = RiskEngine.getStatus(score);

    const getStatusColor = () => {
        if (status === 'SAFE') return 'text-cyber-green';
        if (status === 'WARNING') return 'text-yellow-500';
        return 'text-cyber-red';
    };

    return (
        <div className="p-5 flex flex-col min-h-[500px] bg-cyber-black overflow-hidden border-b-4 border-cyber-blue/30">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-cyber-blue" />
                    <span className="font-bold tracking-tighter text-lg">SECURE<span className="text-cyber-blue">WEB</span> AI</span>
                </div>
                <div className="text-[10px] px-2 py-0.5 border border-white/20 rounded-full text-gray-500 uppercase tracking-widest font-mono">
                    V1.0.0
                </div>
            </div>

            {loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="flex-grow flex flex-col">
                    {/* Main Score Gauge */}
                    <div className="relative flex flex-col items-center justify-center mb-10">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                                cx="80" cy="80" r="70"
                                stroke="currentColor" strokeWidth="8"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="80" cy="80" r="70"
                                stroke="currentColor" strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={440}
                                initial={{ strokeDashoffset: 440 }}
                                animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={getStatusColor()}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-5xl font-mono font-bold"
                            >
                                {score}
                            </motion.span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${getStatusColor()}`}>
                                {status}
                            </span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 mb-8">
                        <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-cyber-purple">
                            <div className="flex items-center gap-3">
                                <Activity className="w-4 h-4 text-cyber-purple" />
                                <span className="text-sm font-medium">Trackers Blocked</span>
                            </div>
                            <span className="font-mono text-cyber-purple font-bold">{analysis?.trackersCount || 0}</span>
                        </div>
                        <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-cyber-green">
                            <div className="flex items-center gap-3">
                                <Info className="w-4 h-4 text-cyber-green" />
                                <span className="text-sm font-medium">Domain Verified</span>
                            </div>
                            {analysis?.score && analysis.score < 50 ? (
                                <ShieldCheck className="w-4 h-4 text-cyber-green" />
                            ) : (
                                <ShieldAlert className="w-4 h-4 text-cyber-red" />
                            )}
                        </div>
                    </div>

                    {/* Current Domain */}
                    <div className="text-center mb-6">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Active Intelligence</p>
                        <p className="text-xs font-mono text-gray-300 truncate opacity-80">{analysis?.url || 'No Active Site'}</p>
                    </div>

                    {/* Footer Action */}
                    <button
                        onClick={() => chrome.runtime.openOptionsPage()}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest group-hover:text-cyber-blue transition-colors">
                            Decrypt Full Analytics
                        </span>
                        <ExternalLink className="w-4 h-4 group-hover:text-cyber-blue" />
                    </button>
                </div>
            )}
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('popup-root')!).render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
)
