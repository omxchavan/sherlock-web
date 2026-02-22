import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
    Shield, Download, Github, Cpu, Eye, Zap,
    Terminal, ArrowRight, Check, Copy, ExternalLink,
    Sparkles, Lock, Activity, ChevronDown
} from 'lucide-react'

const LandingPage = () => {
    const [copiedStep, setCopiedStep] = useState<number | null>(null)
    const [activeStep, setActiveStep] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const { scrollYProgress } = useScroll()
    const springScrollProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

    useEffect(() => {
        // Fix for refresh scrolling to bottom
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual'
            window.scrollTo(0, 0)
            // Double check after layout
            setTimeout(() => window.scrollTo(0, 0), 10)
        }

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedStep(index)
        setTimeout(() => setCopiedStep(null), 2000)
    }

    const installSteps = [
        {
            title: 'Download Extension',
            desc: 'Download and extract the extension source code from GitHub.',
            code: 'git clone https://github.com/omxchavan/sherlock-web.git',
            action: 'Download ZIP'
        },
        {
            title: 'Open Extensions',
            desc: 'Open Chrome and navigate to chrome://extensions/',
            code: 'chrome://extensions/',
            action: 'Copy URL'
        },
        {
            title: 'Enable Dev Mode',
            desc: 'Enable "Developer Mode" toggle in the top-right corner.',
            action: 'Toggle ON'
        },
        {
            title: 'Load Extension',
            desc: 'Click "Load unpacked" and select the pre-built "dist" folder from the extracted files.',
            action: 'Browse Files'
        },
        {
            title: 'Start Protecting',
            desc: 'Pin SherlockWeb AI to your toolbar and start browsing securely.',
            action: 'Complete'
        }
    ]

    const features = [
        {
            icon: Cpu,
            title: 'AI Security Dossier',
            desc: 'Deep-dive security reports powered by Google Gemini 2.5 Flash',
            color: 'from-cyan-400 to-blue-500',
            glow: 'cyan'
        },
        {
            icon: Eye,
            title: 'Stealth Monitoring',
            desc: 'Detect and block 30+ advertising networks instantly',
            color: 'from-purple-400 to-pink-500',
            glow: 'purple'
        },
        {
            icon: Zap,
            title: 'Quantum Dashboard',
            desc: 'Real-time security health and risk trajectory tracking',
            color: 'from-blue-400 to-cyan-500',
            glow: 'blue'
        }
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-['Inter'] antialiased selection:bg-cyan-400 selection:text-black overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 150, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -150, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"
                    animate={{
                        x: [-200, 200, -200],
                        y: [-100, 100, -100],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

                {/* Mouse Follow Light */}
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none"
                    animate={{
                        x: mousePosition.x - 250,
                        y: mousePosition.y - 250,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 100
                    }}
                />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-50"
                style={{ scaleX: springScrollProgress }}
            />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 w-full z-40 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-2xl"
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <motion.a
                        href="/landing.html"
                        className="flex items-center gap-3 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="relative p-2.5 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Shield className="w-6 h-6 text-cyan-400" />
                            <motion.div
                                className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                        <span className="text-xl font-black tracking-tight">
                            Sherlock<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Web</span>
                        </span>
                    </motion.a>

                    <div className="flex items-center gap-6">
                        <motion.a
                            href="#features"
                            className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            Features
                        </motion.a>
                        <motion.a
                            href="#install"
                            className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            Install
                        </motion.a>
                        <motion.a
                            href="https://github.com/omxchavan/sherlock-web"
                            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400 text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95"
                        >
                            <Zap className="w-4 h-4" />
                            github
                        </motion.a>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <motion.div
                    className="max-w-7xl mx-auto"
                    style={{ y: heroY }}
                >
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-xs font-bold text-cyan-400 mb-8"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
                            >
                                <motion.span
                                    className="relative flex h-2.5 w-2.5"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                                </motion.span>
                                Next-Gen Web Security Protocol
                            </motion.div>
                        </motion.div>

                        <motion.h1
                            className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="block">SECURE YOUR</span>
                            <motion.span
                                className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                QUANTUM WEB
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Eliminate trackers, neutralize threats, and understand every risk in real-time.
                            <span className="text-cyan-400 font-semibold"> Powered by Gemini AI</span> for professional cybersecurity insights.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <motion.a
                                href="https://github.com/omxchavan/sherlock-web/archive/refs/heads/main.zip"
                                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-xl flex items-center gap-3 overflow-hidden"
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(34, 211, 238, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                                    initial={{ x: '100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative flex items-center gap-3">
                                    <Download className="w-5 h-5" />
                                    Download Extension
                                </span>
                            </motion.a>

                            <motion.a
                                href="#install"
                                className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-xl text-white font-bold rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all"
                                whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Installation Guide
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Animated Preview with Image Upload */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="relative max-w-5xl mx-auto"
                    >
                        {/* Animated Glow Background */}
                        <motion.div
                            className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-3xl"
                            animate={{
                                opacity: [0.5, 0.8, 0.5],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                            }}
                        />

                        {/* Main Frame Container */}
                        <motion.div
                            className="relative bg-gradient-to-br from-white/10 to-white/[0.03] rounded-2xl p-2 border border-white/20 shadow-2xl group"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.4)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-[#0a0a0f] rounded-xl overflow-hidden border border-white/5">
                                {/* Browser Chrome */}
                                <motion.div
                                    className="bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 flex items-center gap-3 border-b border-white/10"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                >
                                    <div className="flex gap-2">
                                        <motion.div
                                            className="w-3 h-3 rounded-full bg-red-500"
                                        />
                                        <motion.div
                                            className="w-3 h-3 rounded-full bg-yellow-500"
                                        />
                                        <motion.div
                                            className="w-3 h-3 rounded-full bg-green-500"
                                        />
                                    </div>
                                    <div className="flex-1 bg-black/40 rounded-lg px-4 py-2 text-xs text-gray-400 flex items-center gap-2 border border-white/5">
                                        <Lock className="w-3.5 h-3.5 text-green-400" />
                                        <span className="font-mono">secureweb.ai/dashboard</span>
                                    </div>
                                </motion.div>

                                {/* Content Area */}
                                <div className="aspect-video relative overflow-hidden bg-black">
                                    <img
                                        src="/preview.png"
                                        alt="SherlockWeDashboard"
                                        className="w-full h-full object-cover"
                                    />


                                    {/* Corner Accents */}
                                    <div
                                        className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50 pointer-events-none"
                                    />
                                    <div
                                        className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/50 pointer-events-none"
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400/50 pointer-events-none"
                                    />
                                    <div
                                        className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/50 pointer-events-none"
                                    />

                                    {/* Stats Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                                        {[
                                            { label: 'Trackers Blocked', value: '124', icon: Eye, color: 'cyan' },
                                            { label: 'Threats Stopped', value: '37', icon: Shield, color: 'blue' },
                                            { label: 'Sites Scanned', value: '1.2K', icon: Activity, color: 'purple' },
                                        ].map((stat, i) => (
                                            <div
                                                key={i}
                                                className="bg-black/80 rounded-xl p-3.5 border border-white/20 hover:border-cyan-400/50 transition-all group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <motion.div
                                                        className={`p-1.5 rounded-lg bg-${stat.color}-400/10`}
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-400`} />
                                                    </motion.div>
                                                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{stat.label}</p>
                                                </div>
                                                <motion.p
                                                    className="text-2xl font-black text-cyan-400 group-hover:text-cyan-300 transition-colors"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 1.8 + i * 0.1, type: "spring", stiffness: 200 }}
                                                >
                                                    {stat.value}
                                                </motion.p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Live Indicator */}
                                    <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-black/80 rounded-full border border-green-400/30">
                                        <motion.span
                                            className="relative flex h-2.5 w-2.5"
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                                        </motion.span>
                                        <span className="text-xs font-bold text-green-400">LIVE</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </section>

            {/* Features */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-black mb-4 tracking-tight">
                            Core Intelligence <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Modules</span>
                        </h2>
                        <motion.div
                            className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative"
                            >
                                <motion.div
                                    className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
                                />

                                <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-8 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all h-full">
                                    <motion.div
                                        className={`p-4 bg-gradient-to-br ${feature.color} rounded-2xl w-fit mb-6`}
                                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>

                                    <motion.div
                                        className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-400"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        Learn more
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation Steps */}
            <section id="install" className="py-32 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="flex items-center gap-4 mb-16"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Terminal className="w-12 h-12 text-cyan-400" />
                        </motion.div>
                        <div>
                            <h2 className="text-5xl font-black tracking-tight">Installation Protocol</h2>
                            <p className="text-gray-400 mt-2">Get started in under 2 minutes</p>
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        {installSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                onViewportEnter={() => setActiveStep(i)}
                                className="relative"
                            >
                                <motion.div
                                    className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-3xl blur-xl opacity-0"
                                    animate={{ opacity: activeStep === i ? 0.6 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <motion.div
                                    className="relative flex gap-6 p-6 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl group cursor-pointer"
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: 'rgba(34, 211, 238, 0.3)',
                                    }}
                                    onClick={() => setActiveStep(i)}
                                >
                                    {/* Step Number */}
                                    <motion.div
                                        className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center font-black text-xl relative overflow-hidden"
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"
                                            initial={{ x: '100%' }}
                                            animate={{ x: activeStep === i ? 0 : '100%' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <span className="relative z-10">{i + 1}</span>
                                    </motion.div>

                                    {/* Content */}
                                    <div className="flex-1 pt-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: activeStep === i ? 1 : 0 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            >
                                                <Sparkles className="w-5 h-5 text-cyan-400" />
                                            </motion.div>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed mb-4">{step.desc}</p>

                                        {/* Code Block */}
                                        {step.code && (
                                            <motion.div
                                                className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl px-4 py-3 font-mono text-sm"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: activeStep === i ? 'auto' : 0,
                                                    opacity: activeStep === i ? 1 : 0
                                                }}
                                            >
                                                <code className="flex-1 text-cyan-400">{step.code}</code>
                                                <motion.button
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation()
                                                        copyToClipboard(step.code!, i)
                                                    }}
                                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <AnimatePresence mode="wait">
                                                        {copiedStep === i ? (
                                                            <motion.div
                                                                key="check"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                            >
                                                                <Check className="w-4 h-4 text-green-400" />
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                key="copy"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                            >
                                                                <Copy className="w-4 h-4 text-gray-400" />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>
                                            </motion.div>
                                        )}

                                        {/* Action Button */}
                                        <motion.div
                                            className="mt-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{
                                                opacity: activeStep === i ? 1 : 0,
                                                y: activeStep === i ? 0 : 10
                                            }}
                                        >
                                            <motion.button
                                                className="px-5 py-2.5 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-lg text-sm font-semibold flex items-center gap-2"
                                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {step.action}
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        </motion.div>
                                    </div>

                                    {/* Completion Indicator */}
                                    <motion.div
                                        className="absolute top-6 right-6 w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: activeStep !== null && activeStep > i ? 1 : 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                            <Check className="w-5 h-5 text-green-400" />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>

                                {/* Connection Line */}
                                {i < installSteps.length - 1 && (
                                    <motion.div
                                        className="absolute left-[3.25rem] top-[5.5rem] w-0.5 h-6 bg-gradient-to-b from-cyan-400/50 to-transparent"
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (i + 1) * 0.1 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.a
                            href="https://github.com/omxchavan/sherlock-web"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl font-bold hover:bg-white/15 transition-all"
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(34, 211, 238, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="w-5 h-5" />
                            View Full Documentation
                            <ExternalLink className="w-4 h-4" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 border-t border-white/5 px-6 relative">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <motion.div
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Shield className="w-6 h-6 text-cyan-400" />
                            <span className="font-bold text-gray-400">
                                SherlockWeb AI © 2026
                            </span>
                        </motion.div>

                        <div className="flex gap-8">
                            {['GitHub', 'Documentation', 'Privacy Policy'].map((link, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    className="text-sm font-semibold text-gray-500 hover:text-cyan-400 transition-colors"
                                    whileHover={{ y: -2 }}
                                >
                                    {link}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </footer>
        </div>
    )
}

export default LandingPage