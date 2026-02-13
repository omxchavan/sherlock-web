import { motion } from 'framer-motion'
import {
    Shield, Download, Github, Cpu, Eye, Zap,
    Terminal, ArrowRight
} from 'lucide-react'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-cyber-black text-white font-['Outfit'] selection:bg-cyber-blue selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-blue/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-purple/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-cyber-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyber-blue/10 rounded-lg neon-border-blue">
                            <Shield className="w-6 h-6 text-cyber-blue" />
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase">
                            Secure<span className="opacity-50 text-cyber-blue">Web</span> AI
                        </span>
                    </div>
                    <div className="flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
                        <a href="#features" className="hover:text-cyber-blue transition-colors">Features</a>
                        <a href="#install" className="hover:text-cyber-blue transition-colors">Install</a>
                        <a href="https://github.com/omxchavan/sherlock-web" className="flex items-center gap-2 hover:text-cyber-blue transition-colors">
                            <Github className="w-4 h-4" />
                            Source
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-[10px] font-black tracking-[0.2em] text-cyber-blue uppercase mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-blue"></span>
                            </span>
                            Next-Gen Web Security Protocol
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                            SECURE YOUR <br />
                            <span className="bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent">QUANTUM WEB</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-10 font-medium">
                            Eliminate trackers, neutralize threats, and understand every risk in real-time. Powered by Gemini AI for professional cybersecurity insights.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://github.com/omxchavan/sherlock-web/archive/refs/heads/main.zip"
                                className="group px-8 py-4 bg-cyber-blue text-black font-black uppercase text-xs tracking-[0.2em] rounded-xl flex items-center gap-3 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                            >
                                Download Extension
                                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </a>
                            <a
                                href="#install"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all"
                            >
                                How to Install
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-cyber-blue/20 blur-[100px] rounded-full animate-pulse" />
                        <div className="glass-panel p-2 shadow-2xl relative z-10">
                            <div className="bg-cyber-black rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-white/10">
                                <Shield className="w-32 h-32 text-cyber-blue animate-pulse" />
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 border-l-4 border-l-cyber-blue">
                                    <p className="font-mono text-[10px] text-cyber-blue mb-1">REAL_TIME_SCANNER_v2.0</p>
                                    <p className="font-bold text-sm">THREAT_NEUTRALIZED: 124 TRACKERS BLOCKED</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Core Intelligence Modules</h2>
                        <div className="h-1 w-20 bg-cyber-blue mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Cpu,
                                title: 'AI Security Dossier',
                                desc: 'Get deep-dive security reports generated by Google Gemini 2.5 Flash for every site you visit.',
                                color: 'text-cyber-green'
                            },
                            {
                                icon: Eye,
                                title: 'Stealth Monitoring',
                                desc: 'Advanced tracker detection that recognizes 30+ major advertising networks and block them instantly.',
                                color: 'text-cyber-purple'
                            },
                            {
                                icon: Zap,
                                title: 'Quantum Dashboard',
                                desc: 'A premium, high-speed interface to track your risk trajectory and security health in real-time.',
                                color: 'text-cyber-blue'
                            }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="cyber-card p-10 group"
                            >
                                <div className={`p-4 bg-white/5 rounded-2xl w-fit mb-8 group-hover:bg-white/10 transition-colors`}>
                                    <f.icon className={`w-10 h-10 ${f.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation Guide */}
            <section id="install" className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <Terminal className="w-10 h-10 text-cyber-blue" />
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Installation Protocol</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            'Download and extract the extension source code from GitHub.',
                            'Open Chrome and navigate to chrome://extensions/',
                            'Enable "Developer Mode" in the top-right corner.',
                            'Click "Load unpacked" and select the "dist" folder from the extracted source.',
                            'Pin SecureWeb AI to your toolbar and start browsing securely.'
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors group">
                                <div className="flex-shrink-0 w-10 h-10 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full flex items-center justify-center font-black text-cyber-blue group-hover:bg-cyber-blue group-hover:text-black transition-all">
                                    {i + 1}
                                </div>
                                <p className="text-lg text-gray-300 font-medium pt-1 leading-relaxed">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 opacity-50">
                        <Shield className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-widest text-xs">SecureWeb AI Protocol © 2026</span>
                    </div>
                    <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <a href="https://github.com/omxchavan/sherlock-web" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Documentation</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
