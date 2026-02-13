import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Activity, Eye, Globe, ChevronRight, AlertTriangle,
  ShieldCheck, Cpu, Database, Network, Lock, Zap, RefreshCw,
  Terminal, BarChart3, Settings2
} from 'lucide-react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import type { ExtensionState, AnalysisResult } from './shared/types'
import { AIService } from './services/ai'

const Dashboard = () => {
  const [state, setState] = useState<ExtensionState>({
    threatHistory: [],
    settings: { aiEnabled: true, riskThreshold: 50 }
  });
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    chrome.storage.local.get(null, (data: any) => {
      if (data) {
        setState({
          threatHistory: data.threatHistory || [],
          settings: data.settings || { aiEnabled: true, riskThreshold: 50 }
        });
        if (data.threatHistory?.[0]) {
          setSelectedAnalysis(data.threatHistory[0]);
        }
      }
    });

    const listener = () => {
      chrome.storage.local.get(null, (data: any) => {
        if (data) {
          setState({
            threatHistory: data.threatHistory || [],
            settings: data.settings || { aiEnabled: true, riskThreshold: 50 }
          });

          // Smart Auto-selection: Only switch if the user hasn't explicitly 
          // selected something or if the latest data is brand new.
          if (data.threatHistory?.[0]) {
            setSelectedAnalysis(current => {
              // If nothing selected, or if we just analyzed a new tab (timestamp within last 2s)
              const isRecent = Date.now() - data.threatHistory[0].timestamp < 2000;
              if (!current || isRecent) return data.threatHistory[0];
              return current;
            });
          }
        }
      });
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  // Reset AI summary when the analyzed subject changes
  useEffect(() => {
    setAiSummary('');
  }, [selectedAnalysis?.timestamp]);

  const latestAnalysis = state.threatHistory[0] || null;
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  const hasEnvKey = envKey && envKey !== 'your_api_key_here';
  const hasApiKey = state.settings.apiKey || (hasEnvKey ? envKey : null);

  const generateAI = async (analysisToAnalyze: AnalysisResult) => {
    if (!analysisToAnalyze || !hasApiKey) return;
    setLoadingAi(true);
    setAiSummary('');
    const ai = new AIService(hasApiKey);
    const summary = await ai.generateSecuritySummary(analysisToAnalyze);
    setAiSummary(summary);
    setLoadingAi(false);
  };

  const chartData = [...state.threatHistory].reverse().map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    score: h.score,
    trackers: h.trackersCount
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SAFE': return 'text-cyber-green';
      case 'WARNING': return 'text-yellow-400';
      case 'DANGEROUS': return 'text-cyber-red';
      default: return 'text-white';
    }
  };

  // Calculate dynamic metrics
  const avgRisk = state.threatHistory.length > 0
    ? Math.round(state.threatHistory.reduce((acc, h) => acc + h.score, 0) / state.threatHistory.length)
    : 0;

  const anomaliesCount = state.threatHistory.filter(h => h.score > 70).length;

  const currentView = selectedAnalysis || latestAnalysis;

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-[1600px] mx-auto space-y-8 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyber-blue/10 rounded-lg neon-border-blue">
              <Shield className="w-8 h-8 text-cyber-blue shadow-lg" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent">
              SECURE<span className="opacity-80">WEB</span> <span className="text-white">AI</span>
            </h1>
          </div>
          <p className="text-gray-500 font-medium flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            Active Threat Intelligence & Quantum Analysis
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-8 mr-8">
            <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">Engine Status</div>
              <div className="text-sm font-mono text-cyber-green">OPERATIONAL</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">Model</div>
              <div className="text-sm font-mono text-cyber-blue leading-none">GEMINI-2.5-FLASH</div>
            </div>
          </div>

          <button
            onClick={() => {
              const key = prompt('Enter Gemini API Key:', state.settings.apiKey || '');
              if (key !== null) {
                chrome.storage.local.set({ settings: { ...state.settings, apiKey: key } });
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-semibold"
          >
            <Settings2 className="w-4 h-4" />
            {state.settings.apiKey ? 'Update API Key' : hasApiKey ? 'API Key Configured' : 'Configure Security Engine'}
          </button>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Stats & Risk Factors */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="cyber-card p-6">
              <div className="flex justify-between items-center mb-4">
                <Activity className="w-5 h-5 text-cyber-blue" />
                <span className="text-[10px] text-gray-500 font-bold uppercase">Health</span>
              </div>
              <div className="text-3xl font-bold mb-1">{currentView?.score || '0'}%</div>
              <div className="text-xs text-gray-400">Security Score</div>
            </div>
            <div className="cyber-card p-6">
              <div className="flex justify-between items-center mb-4">
                <Eye className="w-5 h-5 text-cyber-purple" />
                <span className="text-[10px] text-gray-500 font-bold uppercase">Exposure</span>
              </div>
              <div className="text-3xl font-bold mb-1">{currentView?.trackersCount || 0}</div>
              <div className="text-xs text-gray-400">Trackers Found</div>
            </div>
          </div>

          {/* Detailed Risk Breakdown */}
          <div className="cyber-card p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyber-blue" />
              Risk Factor Analysis
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Network Connection', value: currentView?.factors.connection || 0, icon: Lock, color: 'from-cyber-blue to-cyan-500' },
                { label: 'Privacy Exposure', value: currentView?.factors.privacy || 0, icon: Eye, color: 'from-cyber-purple to-pink-500' },
                { label: 'Request Integrity', value: currentView?.factors.network || 0, icon: Network, color: 'from-cyber-green to-emerald-500' },
                { label: 'Domain Trust', value: currentView?.factors.domain || 0, icon: Globe, color: 'from-cyber-red to-orange-500' },
              ].map((factor, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-wider font-bold text-gray-400">
                    <span className="flex items-center gap-2">
                      <factor.icon className="w-3.5 h-3.5" />
                      {factor.label}
                    </span>
                    <span>{factor.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${factor.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-cyber-blue/5 border border-cyber-blue/20">
              <p className="text-[11px] text-gray-400 leading-relaxed italic">
                Analysis based on neural scanning of domain history, SSL certificate validity, tracker behavior, and cross-domain request integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Column: Visual Assets & AI Report */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* AI Intelligence Area */}
            <div className="cyber-card flex flex-col min-h-[450px] scan-animation">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyber-green" />
                  AI Intelligence Report
                </h3>
                <Terminal className="w-4 h-4 text-gray-500" />
              </div>

              <div className="p-6 flex-grow overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!hasApiKey ? (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
                    >
                      <Lock className="w-12 h-12 text-gray-600 border-2 border-dashed border-gray-700 p-3 rounded-full" />
                      <div>
                        <p className="font-bold text-gray-300">AI Engine Locked</p>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">Please configure your Gemini API Key in the settings to unlock professional security insights.</p>
                      </div>
                    </motion.div>
                  ) : loadingAi ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-cyber-blue/20 rounded-full border-t-cyber-blue animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Cpu className="w-8 h-8 text-cyber-blue animate-pulse" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-mono text-cyber-blue animate-pulse">DECRYPTING SECURITY SIGNATURES...</p>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Connecting to Gemini Cluster</p>
                      </div>
                    </div>
                  ) : aiSummary ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-cyber-green">
                          <Shield className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-widest text-white">Full Security Intelligence Report</span>
                        </div>

                        <div className="space-y-4">
                          {aiSummary.split(/\[(.*?)\]/).map((part, i, arr) => {
                            if (i % 2 === 1) {
                              const header = part;
                              const content = arr[i + 1]?.trim();
                              if (!content) return null;

                              return (
                                <div key={i} className="space-y-2 group">
                                  <div className="text-[10px] font-black tracking-[0.2em] text-cyber-blue uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                                    {header}
                                  </div>
                                  <div className="text-sm text-gray-300 leading-relaxed bg-white/[0.03] p-4 rounded-xl border border-white/5 border-l-2 border-l-cyber-blue/30 whitespace-pre-line font-medium">
                                    {content}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-cyber-blue/5 border border-cyber-blue/20 flex gap-4">
                        <Zap className="w-5 h-5 text-cyber-blue shrink-0" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase text-cyber-blue tracking-tighter">Recommendation Engine</p>
                          <p className="text-xs text-gray-400">Security protocols updated. Review domain permissions for enhanced privacy.</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                      <div className="p-5 bg-cyber-blue/10 rounded-full">
                        <Database className="w-10 h-10 text-cyber-blue" />
                      </div>
                      <div>
                        <p className="font-bold text-white mb-2">Ready for Analysis</p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">Select a domain from your history below to generate a deep AI intelligence report.</p>
                        <button
                          onClick={() => currentView && generateAI(currentView)}
                          className="w-full py-4 px-6 bg-white/5 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20 hover:border-white/40 group"
                        >
                          <span className="flex items-center justify-center gap-2">
                            Initialize Intelligence Scan
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Trends & History Viz */}
            <div className="cyber-card p-6 min-h-[450px] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold flex items-center gap-2 text-cyber-purple">
                  <Activity className="w-5 h-5" />
                  Risk Trajectory
                </h3>
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9d00ff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#9d00ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1e" vertical={false} />
                    <XAxis dataKey="time" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid #333', borderRadius: '12px' }}
                      itemStyle={{ color: '#9d00ff' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#9d00ff" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Avg Risk</div>
                  <div className="text-lg font-bold">{avgRisk}%</div>
                </div>
                <div className="text-center border-l border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Anomalies</div>
                  <div className="text-lg font-bold text-cyber-red">{anomaliesCount} Detected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Logs Area */}
          <div className="cyber-card p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <Terminal className="w-6 h-6 text-cyber-blue" />
                SECURITY MONITORING CONSOLE
              </h3>
              <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue text-[10px] font-bold rounded-full border border-cyber-blue/20 animate-pulse">
                LIVE STREAM
              </span>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {state.threatHistory.map((h, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedAnalysis(h)}
                  className={`group flex items-center justify-between p-5 border-b border-white/[0.03] transition-all cursor-pointer hover:bg-white/[0.04] ${selectedAnalysis?.timestamp === h.timestamp ? 'bg-cyber-blue/[0.03] border-l-2 border-l-cyber-blue' : ''}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="text-xs text-gray-600 font-mono w-16 group-hover:text-cyber-blue">
                      {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${h.status === 'SAFE' ? 'bg-cyber-green/10' : h.status === 'WARNING' ? 'bg-yellow-500/10' : 'bg-cyber-red/10'}`}>
                        {h.status === 'SAFE' ? <ShieldCheck className="w-5 h-5 text-cyber-green" /> : <AlertTriangle className="w-5 h-5 text-cyber-red" />}
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          {h.domain}
                          {h.score > 70 && <Lock className="w-3 h-3 text-cyber-red animate-pulse" />}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">
                          {h.trackersCount} Trackers • {h.status} PROTOCOL ENFORCED
                        </div>
                        {h.issues.length > 0 && (
                          <div className="text-[9px] text-cyber-red/70 font-medium mt-1">
                            ⚠️ {h.issues[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="hidden md:block">
                      <span className="text-[10px] text-gray-600 uppercase font-black mr-4 tracking-tighter">Threat Indicators</span>
                      <div className="flex gap-2">
                        {h.trackersCount > 5 && <span className="w-2 h-2 rounded-full bg-cyber-purple shadow-[0_0_5px_#9d00ff]" />}
                        {h.factors.connection > 0 && <span className="w-2 h-2 rounded-full bg-cyber-red shadow-[0_0_5px_#ff2d55]" />}
                        <span className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_5px_#00ff9d]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`${getStatusColor(h.status)} font-mono font-bold text-xl`}>{h.score}%</div>
                        <div className="text-[8px] text-gray-500 font-black tracking-widest uppercase">RISK LEVEL</div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${selectedAnalysis?.timestamp === h.timestamp ? 'text-cyber-blue' : 'text-gray-700'}`} />
                    </div>
                  </div>
                </div>
              ))}

              {state.threatHistory.length === 0 && (
                <div className="text-center py-20">
                  <Globe className="w-16 h-16 text-white/5 mx-auto mb-6 animate-spin-slow" />
                  <p className="text-gray-600 font-mono text-sm">AWAITING SYSTEM DATA INPUT...</p>
                  <p className="text-[10px] text-gray-700 mt-2 uppercase tracking-[0.3em]">Neural link established. Browse web to scan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
