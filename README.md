# 🌱 AgriGrow – Crop Cultivation & Production System

An interactive, modern web application designed for smart agriculture, crop lifecycle monitoring, climate simulation, and harvest yield analytics.

---

## 🌟 Key Features

- **📊 Comprehensive Farming Dashboard**: Live KPI metric cards for active plots, expected yield, total reaped output, and financial valuation. Includes custom SVG yield trend charts and 5-stage lifecycle breakdowns.
- **⛅ Climate Simulator & Advisory**: Switch dynamically between **Sunny**, **Rainy**, **Cold**, and **Drought** environments. Includes a **"Simulate 1 Day"** time acceleration engine with probabilistic crop growth modeling and real-time advisory alerts.
- **🌾 South Indian Crop Catalog**: Pre-configured profiles for regional crops (Paddy/Rice, Finger Millet, Sugarcane, Turmeric, Coffee, Tea, Pepper, Banana) detailing soil pH, water schedules, growth days, and market prices.
- **🧪 Interactive Soil pH Analyzer**: Tests soil acidity/alkalinity for selected crops and suggests corrective organic treatments (lime vs. organic compost/sulphur).
- **📋 Active Cultivation Tracker**: Monitor block plots through germination, vegetative, flowering, and harvest-ready phases. Log watering and fertilization routines with timestamped activity feeds.
- **💰 Harvest & Yield Records**: Grade crops by quality (*Grade A*, *Grade B*, *Grade C*) and calculate real-time market revenue upon harvest.
- **📅 Farm Calendar**: Visual monthly calendar view mapping sowing and harvest dates, featuring a 60-day upcoming task feed and countdowns.
- **🌾 Tamil Nadu Regional Scheduler**: Agro-climatic sowing calendar mapping traditional seasons (*Kuruvai*, *Samba*, *Navarai*, *Adi Pattam*), duration-based harvest month projections, and recommended NPK fertilizer dosages.

---

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Bundler & Dev Server**: Vite 5
- **Icons**: Lucide React
- **Styling**: Vanilla CSS3 (Custom Glassmorphism Design System, CSS Variables, Responsive Grids)
- **Data Persistence**: HTML5 `localStorage` (Offline-ready, zero database cold-start)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
1. Clone or extract the project files into your working directory:
   ```bash
   cd VIJAY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

### Building for Production
To create an optimized production build:
```bash
npm run build
```
The bundled files will be generated in the `dist/` directory.

---

## 🌐 Deployment
This project is pre-configured for instant zero-configuration deployment on **Vercel**, **Netlify**, or **GitHub Pages**.
