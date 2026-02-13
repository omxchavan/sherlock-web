import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Activity, Eye, Globe, ChevronRight, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import type { ExtensionState } from './shared/types'
import { AIService } from './services/ai'

const Dashboard = () => {
  const [state, setState] = useState<ExtensionState>({
    threatHistory: [],
    settings: { aiEnabled: true, riskThreshold: 50 }
  });
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(null, (data: any) => {
      if (data) {
        setState({
          threatHistory: data.threatHistory || [],
          settings: data.settings || { aiEnabled: true, riskThreshold: 50 }
        });
      }
    });

    // Listen for storage changes
    const listener = () => {
      chrome.storage.local.get(null, (data: any) => {
        setState({
          threatHistory: data.threatHistory || [],
          settings: data.settings || { aiEnabled: true, riskThreshold: 50 }
        });
      });
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  const latestAnalysis = state.threatHistory[0] || null;

  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  const hasEnvKey = envKey && envKey !== 'your_api_key_here';
  const hasApiKey = state.settings.apiKey || (hasEnvKey ? envKey : null);

  const generateAI = async () => {
    if (!latestAnalysis || !hasApiKey) return;
    setLoadingAi(true);
    const ai = new AIService(hasApiKey);
    const summary = await ai.generateSecuritySummary(latestAnalysis);
    setAiSummary(summary);
    setLoadingAi(false);
  };

  const chartData = [...state.threatHistory].reverse().map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    score: h.score,
    trackers: h.trackersCount
  }));

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            SecureWeb AI Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Professional Intelligence & Threat Monitoring</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              const key = prompt('Enter Gemini API Key:', state.settings.apiKey || '');
              if (key !== null) {
                chrome.storage.local.set({ settings: { ...state.settings, apiKey: key } });
              }
            }}
            className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm"
          >
            {state.settings.apiKey ? 'Update API Key' : hasApiKey ? 'API Key Configured' : 'Set API Key'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Security Score', value: latestAnalysis?.score || 'N/A', icon: Shield, color: 'text-cyber-blue' },
          { label: 'Active Trackers', value: latestAnalysis?.trackersCount || 0, icon: Eye, color: 'text-cyber-purple' },
          { label: 'External Requests', value: latestAnalysis?.externalDomainsCount || 0, icon: Globe, color: 'text-cyber-green' },
          { label: 'Total Scans', value: state.threatHistory.length, icon: Activity, color: 'text-white' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 neon-glow"
          >
            <div className="flex justify-between items-start mb-4">
              <item.icon className={`${item.color} w-6 h-6`} />
              <span className="text-xs uppercase tracking-tighter text-gray-500">Live Status</span>
            </div>
            <div className="text-3xl font-mono font-bold">{item.value}</div>
            <div className="text-sm text-gray-400 mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Risk Trend Chart */}
        <div className="md:col-span-2 glass-panel p-6 h-[400px]">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber-blue" />
            Risk Trend History
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="time" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121214', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#00f0ff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Explanation Area */}
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyber-green" />
            AI Threat Intelligence
          </h3>
          <div className="flex-grow flex flex-col justify-center gap-6">
            <AnimatePresence mode="wait">
              {aiSummary ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-white/5 p-4 rounded-lg italic text-gray-300 text-sm leading-relaxed"
                >
                  "{aiSummary}"
                </motion.div>
              ) : (
                <div className="text-center p-8 bg-white/5 rounded-lg border border-dashed border-white/10">
                  <p className="text-sm text-gray-500 mb-4">Click to generate a detailed security analysis for your last visited site.</p>
                  <button
                    onClick={generateAI}
                    disabled={loadingAi || !hasApiKey}
                    className="w-full py-3 px-4 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded-lg hover:bg-cyber-green hover:text-black transition-all disabled:opacity-50"
                  >
                    {loadingAi ? 'Analyzing...' : 'Generate AI Summary'}
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="glass-panel p-8">
        <h3 className="text-xl font-bold mb-6">Threat Intelligence Log</h3>
        <div className="space-y-4">
          {state.threatHistory.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${h.status === 'SAFE' ? 'bg-cyber-green/20' : h.status === 'WARNING' ? 'bg-yellow-500/20' : 'bg-cyber-red/20'}`}>
                  {h.status === 'SAFE' ? <ShieldCheck className="w-5 h-5 text-cyber-green" /> : <AlertTriangle className="w-5 h-5 text-cyber-red" />}
                </div>
                <div>
                  <div className="font-medium">{h.domain}</div>
                  <div className="text-xs text-gray-500">{new Date(h.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="text-gray-400">Score: <span className="text-white font-mono">{h.score}</span></div>
                <div className="text-gray-400">Trackers: <span className="text-white font-mono">{h.trackersCount}</span></div>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          ))}
          {state.threatHistory.length === 0 && (
            <div className="text-center py-20 text-gray-600">No activity detected yet. Browse the web to start analysis.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
