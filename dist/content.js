var i = Object.defineProperty; var o = (s, t, e) => t in s ? i(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e; var a = (s, t, e) => o(s, typeof t != "symbol" ? t + "" : t, e); class r {
    constructor() { a(this, "container", null); a(this, "shadow", null); a(this, "scoreElement", null); a(this, "statusElement", null); this.injectWidget(), this.setupListeners() } injectWidget() {
        this.container = document.createElement("div"), this.container.id = "secureweb-ai-widget-root", this.shadow = this.container.attachShadow({ mode: "closed" }); const t = document.createElement("style"); t.textContent = `
            :host {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 2147483647;
                font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }

            .widget {
                background: rgba(10, 10, 12, 0.85);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 12px 16px;
                display: flex;
                align-items: center;
                gap: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                color: white;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                opacity: 0;
                transform: translateY(20px);
                cursor: pointer;
                user-select: none;
            }

            .widget.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .widget:hover {
                border-color: rgba(255, 255, 255, 0.2);
                background: rgba(15, 15, 18, 0.95);
            }

            .score-container {
                position: relative;
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 14px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .info {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: rgba(255, 255, 255, 0.5);
                font-weight: 600;
            }

            .value {
                font-size: 13px;
                font-weight: 600;
                color: #00f0ff;
                text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
            }

            .dashboard-btn {
                padding: 8px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                color: white;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.8;
            }

            .dashboard-btn:hover {
                background: rgba(0, 240, 255, 0.1);
                border-color: rgba(0, 240, 255, 0.3);
                color: #00f0ff;
                opacity: 1;
            }

            .status-safe { color: #00ff9d; text-shadow: 0 0 8px rgba(0, 255, 157, 0.4); }
            .status-warning { color: #ffe600; text-shadow: 0 0 8px rgba(255, 230, 0, 0.4); }
            .status-danger { color: #ff2d55; text-shadow: 0 0 8px rgba(255, 45, 85, 0.4); }

            svg { width: 18px; height: 18px; }
        `; const e = document.createElement("div"); e.className = "widget", e.innerHTML = `
            <div class="score-container" id="score-indicator">--%</div>
            <div class="info">
                <span class="label">SherlockWeb AI</span>
                <span class="value" id="status-text">INITIALIZING...</span>
            </div>
            <button class="dashboard-btn" id="open-dashboard" title="Open Dashboard">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            </button>
        `, this.scoreElement = e.querySelector("#score-indicator"), this.statusElement = e.querySelector("#status-text"), e.addEventListener("click", () => { chrome.runtime.sendMessage({ type: "OPEN_DASHBOARD" }) }), this.shadow.appendChild(t), this.shadow.appendChild(e), document.documentElement.appendChild(this.container), setTimeout(() => e.classList.add("visible"), 100)
    } setupListeners() { chrome.runtime.onMessage.addListener(t => { t.type === "ANALYSIS_UPDATE" && this.updateUI(t.payload) }) } updateUI(t) { !this.scoreElement || !this.statusElement || (this.scoreElement.textContent = `${t.score}%`, this.statusElement.textContent = t.status, this.statusElement.className = "value", t.status === "SAFE" ? this.statusElement.classList.add("status-safe") : t.status === "WARNING" ? this.statusElement.classList.add("status-warning") : t.status === "DANGEROUS" && this.statusElement.classList.add("status-danger"), this.scoreElement.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(1.15)", opacity: .8 }, { transform: "scale(1)", opacity: 1 }], { duration: 400, easing: "ease-out" })) }
} typeof window < "u" && new r;
