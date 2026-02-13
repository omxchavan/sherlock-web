# SecureWeb AI — Chrome Extension

**SecureWeb AI** is a professional, privacy-focused browser security extension that analyzes websites in real time and provides a security risk score, privacy insights, and AI-generated explanations using **Google Gemini**.

It helps users understand:

* How safe a website is
* What privacy risks it has
* Why it might be dangerous

Built with a modern architecture using **Manifest v3**, **React**, **Tailwind**, and fully free tools.

---

## Features

### Real-Time Website Risk Analysis

* Detects HTTP vs HTTPS
* Flags insecure connections
* Calculates a multi-factor **Risk Score (0–100)**

### Privacy & Tracker Detection

* Counts third-party requests
* Detects known trackers using a local privacy list
* Shows privacy risk level

### Network Behavior Monitoring

* Monitors external domains loaded by the page
* Identifies suspicious third-party activity

### Form Security Checks

* Detects password fields on insecure pages
* Warns about potential credential exposure

### AI Security Explanation (Gemini)

* Generates a professional cybersecurity summary
* Explains why a site is risky or safe
* Uses **Gemini free tier**

### Professional Dashboard

* Current site security overview
* Risk history
* Tracker statistics
* Activity timeline
* Modern cybersecurity dark theme

---

## Tech Stack

**Extension Platform**

* Chrome Extension (Manifest v3)
* Service Worker (background)

**Frontend**

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Recharts

**APIs & Libraries**

* Chrome Extension APIs:

  * `tabs`
  * `webRequest`
  * `storage`
  * `scripting`
* Google Gemini API (free tier)

**Architecture**

* Fully client-side analysis
* No backend required
* Local risk engine
* Gemini used only for explanations

---

## Project Structure

```
secureweb-ai/
│
├── extension/
│   ├── manifest.json
│   ├── background/
│   ├── content/
│   ├── popup/
│   ├── dashboard/
│   ├── utils/
│   ├── ai/
│   └── storage/
│
├── src/
├── public/
├── dist/
└── package.json
```

---

## Installation (Development)

### 1. Clone the repository

```
git clone <your-repo-url>
cd secureweb-ai
```

### 2. Install dependencies

```
npm install
```

### 3. Create environment file

Create `.env`:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Get your key from:
https://aistudio.google.com/app/apikey

---

### 4. Build the extension

```
npm run build
```

This will generate the production build inside:

```
dist/
```

---

### 5. Load in Chrome

1. Open Chrome
2. Go to:

```
chrome://extensions/
```

3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the `dist` folder

The extension should now appear in your browser.

---

## Usage

1. Open any website
2. Click the **SecureWeb AI** icon
3. View:

   * Risk score
   * Security status
   * Detected issues
4. Click **Open Dashboard** for detailed analysis and AI explanation

---

## Permissions Used

| Permission | Purpose                  |
| ---------- | ------------------------ |
| tabs       | Detect active website    |
| webRequest | Monitor network requests |
| storage    | Save analysis history    |
| activeTab  | Analyze current page     |
| scripting  | Run content analysis     |

No browsing data is sent to external servers except optional Gemini requests for explanation.

---

## Security & Privacy

* No personal data collected
* All analysis performed locally
* Gemini receives only:

  * Domain
  * Risk score
  * Technical metrics
* `.env` is ignored via `.gitignore`

---

## Development Scripts

```
npm run dev      # Development mode
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Future Improvements

* Phishing detection
* Domain reputation checks
* Download protection
* Weekly security reports
* Chrome Web Store release

---

## Disclaimer

SecureWeb AI provides risk analysis based on heuristic and behavioral indicators. It should not be considered a replacement for professional security software.

---

## License

MIT License

---

## Author

Built as a cybersecurity project to demonstrate real-time web threat analysis using modern browser extension architecture.
