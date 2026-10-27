# 📖 Samantha's Sketchbook • A Special Story

An interactive, 3D animated digital scrapbook featuring realistic spiral binding, photorealistic page-turning, stickers, music, sky lanterns, and celebratory surprises.

---

## 🚀 Quick Start (Windows)

The simplest way to run the application on Windows:

1. **Double-click [`start.bat`](start.bat)** in the project root folder.
2. The script will automatically:
   - Verify Node.js is installed.
   - Run `npm install` if `node_modules` is missing.
   - Launch your browser to `http://localhost:5173`.
   - Start the Vite development server.

---

## 🛠️ Manual Execution

If you prefer using the terminal (PowerShell, Command Prompt, or Git Bash):

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed. You can check by running:
```bash
node -v
npm -v
```

### 2. Install Dependencies
Run this once from the project root directory:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Once started, open your browser and navigate to:
```
http://localhost:5173
```
*(The terminal will also display the local network URL so you can test on your phone connected to the same Wi-Fi).*

---

## 📦 Production Build

To build the static files for production deployment (e.g. GitHub Pages, Vercel, Netlify):

```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```
Samantha/
├── index.html              # Main HTML markup & stage layout
├── start.bat               # 1-click launcher for Windows
├── package.json            # Project dependencies & scripts
├── public/                 # Static assets (images, music, video, stickers)
│   ├── photos/             # Photos displayed in the scrapbook
│   ├── stickers/           # Floral & character decorative stickers
│   ├── song.mp3            # Background music track
│   └── gemini_generated_video_bf2f11f4.mp4 # Proposal video background
└── src/
    ├── main.js             # Core 3D book engine & interactive logic
    ├── memories.js         # Scrapbook pages content & memories data
    ├── proposal.js         # Letter and proposal texts
    ├── stickerLayout.js    # Sticker placements & layout coordinates
    └── style.css           # Styling, animations, parchment textures & 3D book CSS
```

---

## 💡 Tips & Controls

- **Turn Pages**: Click the **‹** and **›** buttons at the bottom, or swipe/tap on the scrapbook sheets.
- **Toggle Music**: Click the **🎵 Music** button at the bottom navigation bar.
- **Envelope / Letter**: Tap the glowing envelope on the final page to trigger the celebratory sequence and letter.