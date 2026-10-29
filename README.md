# 🌱 AgriGrow – MERN Smart Crop Cultivation & Production System

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application designed for precision agriculture, crop lifecycle management, climate simulation, and harvest yield analytics.

---

## 🛠️ MERN Technology Stack

- **M – MongoDB**: NoSQL cloud/local database storing crop catalogs, active cultivation plots, and harvest production history.
- **E – Express.js**: RESTful API web framework powering endpoints with CORS and JSON middleware.
- **R – React.js (Vite)**: Modern, responsive frontend with a glassmorphism dark-mode UI, custom SVG charts, and interactive simulators.
- **N – Node.js**: High-performance JavaScript runtime powering the server and automated database seeder.

---

## 🌟 Key Features

- **📊 Comprehensive Farming Dashboard**: Live KPI metrics for active plots, expected yield, total reaped output, and financial valuation. Includes custom SVG yield trend charts and 5-stage lifecycle breakdowns.
- **🟢 Live MongoDB Connection Badge**: Real-time status indicator showing MongoDB connectivity with seamless fallback to local storage if offline.
- **⛅ Climate Simulator & Advisory**: Switch dynamically between **Sunny**, **Rainy**, **Cold**, and **Drought** environments. Includes a **"Simulate 1 Day"** time acceleration engine with probabilistic crop growth modeling and real-time advisory alerts.
- **🌾 South Indian Crop Catalog**: Pre-configured profiles for regional crops (Paddy/Rice, Finger Millet, Sugarcane, Turmeric, Coffee, Tea, Pepper, Banana) detailing soil pH, water schedules, growth days, and market prices.
- **🧪 Interactive Soil pH Analyzer**: Tests soil acidity/alkalinity for selected crops and suggests corrective organic treatments (lime vs. organic compost/sulphur).
- **📋 Active Cultivation Tracker**: Monitor block plots through germination, vegetative, flowering, and harvest-ready phases. Log watering and fertilization routines with timestamped activity feeds.
- **💰 Harvest & Yield Records**: Grade crops by quality (*Grade A*, *Grade B*, *Grade C*) and calculate real-time market revenue upon harvest.
- **📅 Farm Calendar**: Visual monthly calendar view mapping sowing and harvest dates, featuring a 60-day upcoming task feed and countdowns.
- **🌾 Tamil Nadu Regional Scheduler**: Agro-climatic sowing calendar mapping traditional seasons (*Kuruvai*, *Samba*, *Navarai*, *Adi Pattam*), duration-based harvest month projections, and recommended NPK fertilizer dosages.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Check API and MongoDB connection status |
| `GET` | `/api/crops` | Retrieve all crop profiles |
| `POST` | `/api/crops` | Create a new crop profile |
| `DELETE` | `/api/crops/:id` | Delete a crop profile |
| `GET` | `/api/cultivations` | Retrieve all active and historical cultivation plots |
| `POST` | `/api/cultivations` | Sows/plants a new crop plot |
| `PATCH` | `/api/cultivations/:id` | Update growth stage or log watering/fertilizing activity |
| `DELETE` | `/api/cultivations/:id` | Delete a cultivation record |
| `GET` | `/api/production` | Retrieve all harvest production records |
| `POST` | `/api/production` | Record a completed harvest with quantity, grade, and revenue |
| `DELETE` | `/api/production/:id` | Delete a harvest record |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Running locally on default port `27017`)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (Optional, for visual database inspection)

---

### Step 1: Install Dependencies

```powershell
# Install frontend dependencies (in root folder)
npm install

# Install backend dependencies (in server folder)
cd server
npm install
cd ..
```

---

### Step 2: Run the Application

You can run both the backend and frontend simultaneously in two separate terminals:

**Terminal 1 — Backend (Express + MongoDB):**
```powershell
npm run server:dev
# Backend runs on http://localhost:5000
```
*(On first boot, the backend automatically seeds initial crops and sample plots into your MongoDB database `agrigrow_db`).*

**Terminal 2 — Frontend (React + Vite):**
```powershell
npm run dev
# Frontend runs on http://localhost:5173
```

---

### Step 3: View in Browser & MongoDB Compass
1. Open your browser and navigate to: **`http://localhost:5173`**
2. You will see the **"🟢 MongoDB Connected"** badge in the top header.
3. Open **MongoDB Compass**, connect to `mongodb://127.0.0.1:27017`, and open database **`agrigrow_db`** to inspect the live collections:
   - `crops`
   - `cultivations`
   - `productions`

---

## 🌐 Production Build & Deployment

To bundle the frontend for production:
```powershell
npm run build
```
Deploy the frontend to **Vercel** or **Netlify** and set the `VITE_API_BASE_URL` environment variable to your deployed backend URL (e.g., hosted on Render, Railway, or AWS).
