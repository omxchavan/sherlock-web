import { motion } from 'framer-motion'
import {
    Shield, Download, Github, Cpu, Eye, Zap,
    Terminal, Activity, Lock
} from 'lucide-react'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#020202] text-white font-['Outfit'] selection:bg-cyber-blue selection:text-black overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyber-blue/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-purple/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#020202]" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 group cursor-pointer"
                    >
                        <div className="p-2.5 bg-cyber-blue/10 rounded-xl neon-border-blue group-hover:bg-cyber-blue/20 transition-all duration-500">
                            <Shield className="w-6 h-6 text-cyber-blue" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase italic">
                            Secure<span className="text-cyber-blue">Web</span><span className="text-white/40">AI</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-[0.3em] uppercase"
                    >
                        <a href="#features" className="text-white/60 hover:text-cyber-blue transition-all relative group">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-blue group-hover:w-full transition-all duration-300" />
                        </a>
                        <a href="#install" className="text-white/60 hover:text-cyber-blue transition-all relative group">
                            Install
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-blue group-hover:w-full transition-all duration-300" />
                        </a>
                        <a href="https://github.com/omxchavan/sherlock-web" className="flex items-center gap-2 bg-white/5 px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                            <Github className="w-3.5 h-3.5" />
                            Repository
                        </a>
                    </motion.div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-cyber-blue/5 border border-cyber-blue/20 rounded-full text-[9px] font-black tracking-[0.3em] text-cyber-blue uppercase mb-8 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
                                <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue opacity-50" />
                            </div>
                            Neural Intelligence Active
                        </div>

                        <h1 className="text-[5.5rem] md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.85] italic">
                            DEFEND THE <br />
                            <span className="bg-gradient-to-br from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent">FRONTIER</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-12 font-medium border-l-2 border-cyber-blue/30 pl-8">
                            Unmask hidden trackers, neutralize complex threats, and gain deep intelligence on every site you visit. Powered by the <span className="text-white font-bold tracking-tighter">GEMINI NEURAL ENGINE.</span>
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <motion.a
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.98 }}
                                href="https://github.com/omxchavan/sherlock-web/archive/refs/heads/main.zip"
                                className="group px-10 py-5 bg-white border border-white/20 text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl flex items-center gap-4 transition-all"
                            >
                                Download Extension
                                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </motion.a>

                            <motion.a
                                whileHover={{ background: 'rgba(255,255,255,0.1)' }}
                                href="#install"
                                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl flex items-center gap-4 transition-all backdrop-blur-md"
                            >
                                View Payload
                                <Terminal className="w-5 h-5 text-cyber-blue" />
                            </motion.a>
                        </div>

                        <div className="mt-16 grid grid-cols-3 gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            {[
                                { val: '100%', label: 'ACCURACY' },
                                { val: '<1MS', label: 'LATENCY' },
                                { val: '∞', label: 'PROTECTION' }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-2xl font-black italic tracking-tighter">{stat.val}</div>
                                    <div className="text-[8px] font-black tracking-widest text-cyber-blue">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative perspective-1000"
                    >
                        <div className="absolute -inset-10 bg-cyber-blue/10 blur-[120px] rounded-full animate-pulse" />

                        <div className="relative z-10 glass-panel p-3 border-white/20 shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-1000">
                            <div className="bg-[#050505] rounded-xl overflow-hidden aspect-[4/3] relative flex flex-col border border-white/5">
                                {/* Dashboard Interface Preview */}
                                <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-4 justify-between">
                                    <div className="flex gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/30" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyber-blue/30" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/30" />
                                    </div>
                                    <div className="text-[9px] font-mono text-white/20 tracking-widest uppercase">system_status: scanning</div>
                                </div>
                                <div className="flex-grow flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-blue/10 via-transparent to-transparent">
                                    <Shield className="w-32 h-32 text-cyber-blue animate-pulse" />
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

                                    {/* Floating Data Nodes */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute top-10 right-10 p-3 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-md"
                                    >
                                        <Lock className="w-5 h-5 text-cyber-purple" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute bottom-10 left-10 p-3 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-md"
                                    >
                                        <Activity className="w-5 h-5 text-cyber-green" />
                                    </motion.div>
                                </div>
                                <div className="p-6 bg-black/80 backdrop-blur-xl border-t border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-[10px] font-black tracking-widest text-cyber-blue uppercase">Security Protocol v2.0</div>
                                        <div className="px-3 py-1 bg-cyber-green/10 text-cyber-green text-[8px] font-black rounded-full border border-cyber-green/20">OPERATIONAL</div>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "87%" }}
                                            transition={{ duration: 2, delay: 1 }}
                                            className="h-full bg-cyber-blue shadow-[0_0_15px_#00f0ff]"
                                        />
                                    </div>
                                    <p className="mt-4 font-mono text-[10px] text-white/40 uppercase tracking-tighter">
                                        Processing 512 risk factors... Neural consensus reached in 0.4s.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section id="features" className="py-40 px-6 relative bg-gradient-to-b from-transparent to-white/[0.01]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">Neural Capabilities</h2>
                            <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">Architected for total web dominance.</p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Cpu,
                                title: 'Gemini Neural Dossier',
                                desc: 'Instant, professional-grade security assessments generated by Google Flash 2.5 on every navigation.',
                                color: 'bg-cyber-blue/10 text-cyber-blue',
                                border: 'border-cyber-blue/20'
                            },
                            {
                                icon: Eye,
                                title: 'Stealth Tracker Intercept',
                                desc: 'Military-grade detection logic that identifies and visualizes hidden telemetry networks in real-time.',
                                color: 'bg-cyber-purple/10 text-cyber-purple',
                                border: 'border-cyber-purple/20'
                            },
                            {
                                icon: Zap,
                                title: 'Quantum Risk Engine',
                                desc: 'Heuristic analysis engine that computes a 0-100 security verdict based on 50+ network signals.',
                                color: 'bg-cyber-green/10 text-cyber-green',
                                border: 'border-cyber-green/20'
                            }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -15, background: 'rgba(255,255,255,0.03)' }}
                                className={`p-12 border border-white/5 rounded-[2.5rem] group transition-all duration-500 relative overflow-hidden`}
                            >
                                <div className={`w-16 h-16 rounded-2xl ${f.color} flex items-center justify-center mb-10 transition-transform group-hover:rotate-12 duration-500 border ${f.border}`}>
                                    <f.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black mb-6 italic tracking-tight uppercase">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-semibold italic text-lg">
                                    {f.desc}
                                </p>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deployment Protocol */}
            <section id="install" className="py-40 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel p-20 border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                            <Terminal className="w-64 h-64" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-6 mb-16">
                                <div className="p-4 bg-cyber-blue/10 rounded-2xl border border-cyber-blue/20">
                                    <Terminal className="w-10 h-10 text-cyber-blue" />
                                </div>
                                <div>
                                    <h2 className="text-5xl font-black uppercase tracking-tighter italic">Deployment Protocol</h2>
                                    <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px] mt-2">Initialize Secure Interface</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    'Download the source archive from the SecureWeb Repository.',
                                    'Initialize Chrome Extension Console via chrome://extensions/.',
                                    'Authenticate as Developer in the system dashboard.',
                                    'Inject the "dist" binary directory using "Load unpacked".',
                                    'Synchronize the SecureWeb AI protocol with your browser toolbar.'
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-10 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-white/10 transition-all group items-center">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white/40 group-hover:bg-cyber-blue group-hover:text-black transition-all group-hover:scale-110 italic">
                                            0{i + 1}
                                        </div>
                                        <p className="text-xl text-gray-300 font-medium leading-relaxed italic">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-20 flex justify-center">
                                <motion.a
                                    whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
                                    href="https://github.com/omxchavan/sherlock-web/archive/refs/heads/main.zip"
                                    className="px-12 py-6 bg-transparent text-white border-2 border-white font-black uppercase text-sm tracking-[0.4em] rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_70px_rgba(255,255,255,0.2)] transition-all italic"
                                >
                                    ENGAGE DOWNLOAD
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/10 px-6 bg-black relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <motion.div
                        whileHover={{ opacity: 1 }}
                        className="flex items-center gap-4 opacity-70 transition-opacity cursor-pointer"
                    >
                        <Shield className="w-6 h-6 text-cyber-blue" />
                        <span className="font-black uppercase tracking-[0.4em] text-[10px] text-white">SecureWeb AI Protocol // SYSTEM_LOCKED</span>
                    </motion.div>

                    <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-white">
                        <a href="https://github.com/omxchavan/sherlock-web" className="hover:text-cyber-blue transition-all hover:scale-110">GitHub</a>
                        <a href="#" className="hover:text-cyber-blue transition-all hover:scale-110">Privacy</a>
                        <a href="#" className="hover:text-cyber-blue transition-all hover:scale-110">Docs</a>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center gap-8">
                    <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[9px] font-black tracking-[0.5em] text-white/40 uppercase backdrop-blur-md">
                        Quantum Grade Encryption Standard // Ver 1.4.2
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-black tracking-[0.6em] text-cyber-blue uppercase mt-4"
                    >
                        MADE WITH <span className="text-white">INTENT</span> BY <span className="text-white underline decoration-cyber-blue decoration-2 underline-offset-8">OM CHAVAN</span>
                    </motion.div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
