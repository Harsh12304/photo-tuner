# 🎨 Image Tuner - Professional Browser-Based Image Editor

A modern, feature-rich image editing application built with Next.js 16 and React 19, utilizing HTML5 Canvas API for powerful in-browser image manipulation.

## 🚀 Live Demo

[**Try it now →**](#) _photo-tuner.vercel.app_

📹 **[Watch Demo Video →](#)** _https://drive.google.com/file/d/1pnEVvQNnBX5ZuC6-9tyJvPR7rfucgMO8/view?usp=sharing_

---

## ✨ Features

### Core Functionality
- 📤 **Image Upload** - Support for JPG and PNG formats
- 🔄 **Rotation** - Quick 90° buttons + free rotation slider (0-360°)
- ✂️ **Crop Tool** - Rectangular selection with visual overlay
- ✏️ **Freehand Drawing** - Adjustable brush (1-50px, 6 colors)
- 📝 **Text Annotation** - 8 fonts, customizable size & color
- ↩️ **Undo/Redo** - 5-step history navigation
- 💾 **Export** - Download as PNG with all edits baked in

### Enhanced UX
- 🌓 **Dark/Light Theme** - Toggle with persistence
- 💾 **Session Persistence** - Auto-save via localStorage
- 🔔 **Toast Notifications** - Feedback for all actions
- 📍 **Live Coordinates** - Real-time cursor position
- 🎯 **Smart Cursors** - Context-aware cursor styles
- ✨ **Visual Effects** - Torch (dark mode) & Ripple (light mode)
- 📱 **Fully Responsive** - Desktop, tablet, and mobile optimized

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI component library |
| **Tailwind CSS** | Utility-first styling |
| **Canvas API** | Image manipulation |
| **react-icons** | Icon library |
| **LocalStorage** | Session persistence |

---

## 📦 Installation

### Prerequisites
```bash
Node.js >= 20.9.0
npm or yarn
```

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd photo-tuner
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

---

## 🎯 Usage Guide

### 1️⃣ Upload Image
Click the **Upload** button in the header or the upload prompt in the empty canvas area.

### 2️⃣ Select Tool
Choose from the sidebar (desktop) or bottom toolbar (mobile):
- **Select** - Default pointer tool
- **Rotate** - Adjust image angle
- **Crop** - Select and crop area
- **Draw** - Freehand drawing
- **Text** - Add text annotations

### 3️⃣ Edit Image
- **Rotate:** Use slider or ±90° buttons
- **Crop:** Click-drag rectangle, then Apply
- **Draw:** Adjust brush size/color, then draw
- **Text:** Click Text button, enter text in modal, drag to position

### 4️⃣ Undo/Redo
Use buttons in header to navigate edit history (5 steps).

### 5️⃣ Export
Click **Export as PNG** to download your edited image.

---

## 📂 Project Structure

```
photo-tuner/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.js            # Root layout
│   └── page.jsx             # Main entry point
├── component/
│   ├── canvas/canvas.jsx    # Canvas editor component
│   ├── header/header.jsx    # Top navigation
│   ├── imageEditor/imageEditor.jsx  # Main orchestrator
│   ├── rightPanel/rightPanel.jsx    # Tool settings
│   ├── textModal/textModal.jsx      # Text editor dialog
│   └── toast/toast.jsx              # Notifications
├── hooks/
│   └── useImageHistory.jsx  # Undo/redo logic
├── public/                  # Static assets
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🎨 Screenshots

### Desktop View
<img width="1920" height="973" alt="{6A5E27EA-1402-4546-893A-C5513D71C190}" src="https://github.com/user-attachments/assets/6a89f9f6-8f0c-47e3-8ef3-c875050eb804" />


### Mobile View
<img width="597" height="946" alt="{951D2A1F-BD36-4A8A-8413-2146F3A0B1B2}" src="https://github.com/user-attachments/assets/dd78eac1-7f64-40f2-9303-b5778996351b" />


### Dark Mode
<img width="1920" height="972" alt="image" src="https://github.com/user-attachments/assets/bde51b4f-d25f-4e13-8a02-4feef3b2857d" />


---
