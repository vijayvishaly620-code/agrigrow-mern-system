import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  TrendingUp, 
  Plus, 
  Search, 
  Droplet, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  DollarSign,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Play,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Scissors
} from 'lucide-react';

// Initial Mock Data (South Indian Crops)
const INITIAL_CROPS = [
  { id: '1', name: 'Paddy / Rice (Nellu)', sciName: 'Oryza sativa', type: 'Grain', ph: '5.5 - 6.5', water: 'Daily', temp: '22°C - 38°C', duration: 120, yieldExpect: 4.5, marketVal: 0.60 },
  { id: '2', name: 'Finger Millet (Ragi)', sciName: 'Eleusine coracana', type: 'Grain', ph: '5.0 - 8.0', water: 'Bi-weekly', temp: '20°C - 34°C', duration: 110, yieldExpect: 2.8, marketVal: 0.45 },
  { id: '3', name: 'Sugarcane (Karumbu)', sciName: 'Saccharum officinarum', type: 'Grain', ph: '6.0 - 7.5', water: 'Every 2 days', temp: '20°C - 35°C', duration: 300, yieldExpect: 15.0, marketVal: 0.25 },
  { id: '4', name: 'Erode Turmeric (Manjal)', sciName: 'Curcuma longa', type: 'Vegetable', ph: '5.5 - 7.5', water: 'Weekly', temp: '20°C - 30°C', duration: 270, yieldExpect: 3.5, marketVal: 1.80 },
  { id: '5', name: 'Coorg Robusta Coffee', sciName: 'Coffea canephora', type: 'Fruit', ph: '5.0 - 6.5', water: 'Every 3 days', temp: '15°C - 26°C', duration: 240, yieldExpect: 1.2, marketVal: 4.20 },
  { id: '6', name: 'Nilgiri Tea', sciName: 'Camellia sinensis', type: 'Fruit', ph: '4.5 - 5.5', water: 'Every 2 days', temp: '12°C - 25°C', duration: 180, yieldExpect: 2.1, marketVal: 3.80 },
  { id: '7', name: 'Malabar Black Pepper', sciName: 'Piper nigrum', type: 'Fruit', ph: '5.5 - 6.5', water: 'Every 2 days', temp: '22°C - 32°C', duration: 240, yieldExpect: 0.8, marketVal: 6.50 },
  { id: '8', name: 'Grand Naine Banana (Vazhai)', sciName: 'Musa acuminata', type: 'Fruit', ph: '6.0 - 7.5', water: 'Daily', temp: '20°C - 35°C', duration: 300, yieldExpect: 8.5, marketVal: 0.50 }
];

const INITIAL_CULTIVATIONS = [
  { id: 'log-1', cropId: '1', cropName: 'Paddy / Rice (Nellu)', location: 'Tanjore Wetlands Block A', plantedDate: '2026-05-10', stage: 'Ready to Harvest', status: 'Growing', expectedHarvest: '2026-09-07', logs: ['Transplanted saplings', 'Weeded fields', 'Irrigation channels flooded'] },
  { id: 'log-2', cropId: '4', cropName: 'Erode Turmeric (Manjal)', location: 'Salem Sector 2', plantedDate: '2026-06-15', stage: 'Flowering', status: 'Growing', expectedHarvest: '2026-09-03', logs: ['Rhizomes planted', 'Organic compost added', 'Ridge weeding run'] },
  { id: 'log-3', cropId: '5', cropName: 'Coorg Robusta Coffee', location: 'Wayanad Slopes B', plantedDate: '2026-07-01', stage: 'Vegetative', status: 'Growing', expectedHarvest: '2026-09-14', logs: ['Pruned shade trees', 'Foliar nutrition spray done'] }
];

const INITIAL_PRODUCTION = [
  { id: 'prod-1', cropName: 'Finger Millet (Ragi)', location: 'Tumkur Drylands', harvestDate: '2026-07-28', quantity: 2400, grade: 'A', revenue: 1080 },
  { id: 'prod-2', cropName: 'Sugarcane (Karumbu)', location: 'Mandya Fields A', harvestDate: '2026-08-02', quantity: 18000, grade: 'B', revenue: 4500 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core Data States
  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem('crops');
    return saved ? JSON.parse(saved) : INITIAL_CROPS;
  });

  const [cultivations, setCultivations] = useState(() => {
    const saved = localStorage.getItem('cultivations');
    return saved ? JSON.parse(saved) : INITIAL_CULTIVATIONS;
  });

  const [production, setProduction] = useState(() => {
    const saved = localStorage.getItem('production');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTION;
  });

  // Simulator States
  const [weather, setWeather] = useState('Sunny');
  const [soilTester, setSoilTester] = useState({ cropId: '3', pH: 6.0 });
  const [soilTestResult, setSoilTestResult] = useState('');

  // Persist State Updates
  useEffect(() => {
    localStorage.setItem('crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem('cultivations', JSON.stringify(cultivations));
  }, [cultivations]);

  useEffect(() => {
    localStorage.setItem('production', JSON.stringify(production));
  }, [production]);

  // Modals States
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '', sciName: '', type: 'Grain', ph: '6.0 - 7.0', water: 'Daily', temp: '20°C - 30°C', duration: 90, yieldExpect: 5.0, marketVal: 1.50
  });

  const [showPlantCrop, setShowPlantCrop] = useState(false);
  const [newPlant, setNewPlant] = useState({
    cropId: '', location: '', plantedDate: new Date().toISOString().split('T')[0]
  });

  const [showHarvestModal, setShowHarvestModal] = useState(null);
  const [harvestInput, setHarvestInput] = useState({ quantity: 1000, grade: 'A' });

  const [searchTerm, setSearchTerm] = useState('');
  const [cropTypeFilter, setCropTypeFilter] = useState('All');

  // Automated soil tester analysis logic
  useEffect(() => {
    const crop = crops.find(c => c.id === soilTester.cropId);
    if (!crop) return;
    
    // Parse pH range e.g. "6.0 - 7.0"
    const bounds = crop.ph.split('-').map(x => parseFloat(x.trim()));
    const phVal = parseFloat(soilTester.pH);
    
    if (phVal >= bounds[0] && phVal <= bounds[1]) {
      setSoilTestResult(`Optimal pH for ${crop.name}! Soil is highly satisfying.`);
    } else if (phVal < bounds[0]) {
      setSoilTestResult(`Too Acidic (pH ${phVal}). Add lime/wood ashes to raise pH.`);
    } else {
      setSoilTestResult(`Too Alkaline (pH ${phVal}). Add organic compost or sulphur to lower pH.`);
    }
  }, [soilTester, crops]);

  // Global Time Simulator: advances growth progress
  const simulateGrowthDay = () => {
    const stages = ['Planted', 'Germination', 'Vegetative', 'Flowering', 'Ready to Harvest'];
    setCultivations(prev => prev.map(c => {
      if (c.status !== 'Growing') return c;

      const currentIndex = stages.indexOf(c.stage);
      let nextIndex = currentIndex;
      let logMsg = '';

      // Sunny/Rainy yields regular growth, Drought/Cold stalls
      const growthRoll = Math.random();
      const growChance = (weather === 'Sunny' || weather === 'Rainy') ? 0.45 : 0.15;

      if (currentIndex < stages.length - 1 && growthRoll < growChance) {
        nextIndex = currentIndex + 1;
        logMsg = `Simulated Time: Progressed to ${stages[nextIndex]} stage (Weather: ${weather}).`;
      } else {
        logMsg = `Simulated Time: Absorption checked. Growing under ${weather} climate.`;
      }

      // If Rainy, auto-log irrigation
      let extraLogs = [logMsg];
      if (weather === 'Rainy' && Math.random() > 0.7) {
        extraLogs.unshift('Rainfall: Soil moisture replenished automatically.');
      }

      return {
        ...c,
        stage: stages[nextIndex],
        logs: [...extraLogs, ...c.logs]
      };
    }));
  };

  // Stats computation helper
  const stats = React.useMemo(() => {
    const totalHarvestedWeight = production.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalRevenue = production.reduce((acc, curr) => acc + curr.revenue, 0);
    const activePlotsCount = cultivations.filter(c => c.status === 'Growing').length;
    
    const expectedYield = cultivations
      .filter(c => c.status === 'Growing')
      .reduce((acc, curr) => {
        const cropRef = crops.find(cr => cr.id === curr.cropId);
        const baseExpect = cropRef ? parseFloat(cropRef.yieldExpect) : 4.0;
        return acc + (baseExpect * 500);
      }, 0);

    return { totalHarvestedWeight, totalRevenue, activePlotsCount, expectedYield };
  }, [crops, cultivations, production]);

  const handleAddCropSubmit = (e) => {
    e.preventDefault();
    if (!newCrop.name) return;
    const cropId = (crops.length + 1).toString();
    setCrops([...crops, { id: cropId, ...newCrop, duration: Number(newCrop.duration), yieldExpect: Number(newCrop.yieldExpect), marketVal: Number(newCrop.marketVal) }]);
    setNewCrop({ name: '', sciName: '', type: 'Grain', ph: '6.0 - 7.0', water: 'Daily', temp: '20°C - 30°C', duration: 90, yieldExpect: 5.0, marketVal: 1.50 });
    setShowAddCrop(false);
  };

  const handlePlantCropSubmit = (e) => {
    e.preventDefault();
    if (!newPlant.cropId || !newPlant.location) return;
    const cropRef = crops.find(c => c.id === newPlant.cropId);
    if (!cropRef) return;

    const plantDateObj = new Date(newPlant.plantedDate);
    plantDateObj.setDate(plantDateObj.getDate() + Number(cropRef.duration));
    const expectedHarvest = plantDateObj.toISOString().split('T')[0];

    const logId = `log-${Date.now()}`;
    const newCultivation = {
      id: logId,
      cropId: newPlant.cropId,
      cropName: cropRef.name,
      location: newPlant.location,
      plantedDate: newPlant.plantedDate,
      stage: 'Planted',
      status: 'Growing',
      expectedHarvest,
      logs: ['Initial sowing logged successfully']
    };

    setCultivations([newCultivation, ...cultivations]);
    setNewPlant({ cropId: '', location: '', plantedDate: new Date().toISOString().split('T')[0] });
    setShowPlantCrop(false);
    setActiveTab('cultivations');
  };

  const advanceStage = (id) => {
    const stages = ['Planted', 'Germination', 'Vegetative', 'Flowering', 'Ready to Harvest'];
    setCultivations(cultivations.map(c => {
      if (c.id === id) {
        const currentIndex = stages.indexOf(c.stage);
        if (currentIndex < stages.length - 1) {
          const nextStage = stages[currentIndex + 1];
          return {
            ...c,
            stage: nextStage,
            logs: [`Growth stage progressed manually to: ${nextStage}`, ...c.logs]
          };
        }
      }
      return c;
    }));
  };

  const logAction = (id, actionType) => {
    const today = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCultivations(cultivations.map(c => {
      if (c.id === id) {
        return {
          ...c,
          logs: [`Logged ${actionType} action at ${today}`, ...c.logs]
        };
      }
      return c;
    }));
  };

  const executeHarvest = (e) => {
    e.preventDefault();
    const activeLog = cultivations.find(c => c.id === showHarvestModal);
    if (!activeLog) return;
    const cropRef = crops.find(cr => cr.id === activeLog.cropId);
    const unitPrice = cropRef ? cropRef.marketVal : 1.0;
    const calculatedRevenue = Math.round(harvestInput.quantity * unitPrice);

    const prodId = `prod-${Date.now()}`;
    const newRecord = {
      id: prodId,
      cropName: activeLog.cropName,
      location: activeLog.location,
      harvestDate: new Date().toISOString().split('T')[0],
      quantity: Number(harvestInput.quantity),
      grade: harvestInput.grade,
      revenue: calculatedRevenue
    };

    setProduction([newRecord, ...production]);

    setCultivations(cultivations.map(c => {
      if (c.id === showHarvestModal) {
        return {
          ...c,
          status: 'Harvested',
          stage: 'Harvested',
          logs: [`Harvest complete: Recieved ${harvestInput.quantity} kg (Grade ${harvestInput.grade})`, ...c.logs]
        };
      }
      return c;
    }));

    setShowHarvestModal(null);
    setHarvestInput({ quantity: 1000, grade: 'A' });
    setActiveTab('production');
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="brand-section">
          <div className="brand-logo">
            <Sprout size={16} strokeWidth={2.5} />
          </div>
          <span className="brand-name">AgriGrow</span>
        </div>

        <ul className="nav-links">
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={14} />
              <span>Overview</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'crops' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('crops')}>
              <BookOpen size={14} />
              <span>Crop Catalog</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'cultivations' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('cultivations')}>
              <CalendarDays size={14} />
              <span>Cultivation Logs</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'production' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('production')}>
              <TrendingUp size={14} />
              <span>Harvest Records</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('calendar')}>
              <Calendar size={14} />
              <span>Farm Calendar</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'tn_advisor' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('tn_advisor')}>
              <CalendarDays size={14} />
              <span>TN Scheduler</span>
            </button>
          </li>
        </ul>

        {/* Global Weather Control Panel */}
        <div className="glass-card fade-in" style={{ marginTop: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-brand)' }}>
            <Sun size={14} />
            <span>CLIMATE CONTROLS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
            {['Sunny', 'Rainy', 'Cold', 'Drought'].map(w => (
              <button
                key={w}
                className="btn-secondary"
                style={{
                  padding: '0.25rem',
                  fontSize: '0.7rem',
                  textTransform: 'capitalize',
                  border: weather === w ? '1px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.08)',
                  background: weather === w ? '#ffffff' : 'rgba(255,255,255,0.04)',
                  color: weather === w ? '#111827' : 'var(--color-text-secondary)',
                  fontWeight: weather === w ? '700' : '500',
                  transition: 'all 0.18s ease',
                  boxShadow: weather === w ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
                }}
                onClick={() => setWeather(w)}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h1>
              {activeTab === 'dashboard' && 'Farming Dashboard'}
              {activeTab === 'crops' && 'Crop Catalog'}
              {activeTab === 'cultivations' && 'Active Cultivation Tracker'}
              {activeTab === 'production' && 'Harvest Production Yields'}
              {activeTab === 'calendar' && 'Farm Calendar'}
              {activeTab === 'tn_advisor' && 'TN Crop Scheduler'}
            </h1>
            <p>
              {activeTab === 'dashboard' && 'Simulate climate and watch growth charts update dynamically.'}
              {activeTab === 'crops' && 'Browse crop details, optimal cultivation profiles, and test soil matches.'}
              {activeTab === 'cultivations' && 'Log watering details, fertilize crops, and advance growth phases.'}
              {activeTab === 'production' && 'Archive and financial analytics of finalized crop harvests.'}
              {activeTab === 'calendar' && 'Visual timeline of all planting dates and upcoming harvest schedules.'}
              {activeTab === 'tn_advisor' && 'Tamil Nadu seasonal sowing and fertilizer recommendations by crop.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--color-accent), #d97706)', gap: '0.35rem' }} onClick={simulateGrowthDay}>
              <Play size={12} fill="white" /> Simulate 1 Day
            </button>
            {activeTab === 'crops' && (
              <button className="btn-primary" onClick={() => setShowAddCrop(true)}>
                <Plus size={12} /> Add Crop
              </button>
            )}
            {activeTab === 'cultivations' && (
              <button className="btn-primary" onClick={() => setShowPlantCrop(true)}>
                <Sprout size={12} /> Plant Crop
              </button>
            )}
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="fade-in">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="glass-card stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'var(--color-brand-glow)', color: 'var(--color-brand)' }}>
                  <CalendarDays size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Active Block Logs</span>
                  <span className="stat-value">{stats.activePlotsCount} Plots</span>
                </div>
              </div>

              <div className="glass-card stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                  <TrendingUp size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Est. Growing Yield</span>
                  <span className="stat-value">{stats.expectedYield.toLocaleString()} kg</span>
                </div>
              </div>

              <div className="glass-card stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
                  <Sprout size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Total Reaped</span>
                  <span className="stat-value">{stats.totalHarvestedWeight.toLocaleString()} kg</span>
                </div>
              </div>

              <div className="glass-card stat-card">
                <div className="stat-icon" style={{ backgroundColor: 'var(--color-accent-glow)', color: 'var(--color-accent)' }}>
                  <DollarSign size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Revenue Valuation</span>
                  <span className="stat-value">${stats.totalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Custom SVG Dashboard Charts */}
            <div className="charts-grid">
              <div className="glass-card">
                <div className="chart-title">
                  <TrendingUp size={14} style={{ color: 'var(--color-brand)' }} />
                  <span>Harvest Output Metrics (Recent Cycles)</span>
                </div>
                
                {production.length === 0 ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                    No completed harvests to chart yet. Let's record a harvest.
                  </div>
                ) : (
                  <div style={{ padding: '0.5rem 0' }}>
                    <div style={{ width: '100%', height: '160px' }}>
                      <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        <defs>
                          <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" />
                        <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(255,255,255,0.03)" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.03)" />
                        <line x1="0" y1="170" x2="500" y2="170" stroke="rgba(255,255,255,0.03)" />

                        {(() => {
                          const pts = production.map((p, idx) => {
                            const x = (idx / Math.max(1, production.length - 1)) * 480 + 10;
                            const y = 170 - (p.quantity / 5000) * 130;
                            return { x, y, label: p.cropName };
                          });
                          const linePath = pts.map(p => `${p.x},${p.y}`).join(' ');
                          const areaPath = pts.length > 0 
                            ? `10,170 ${pts.map(p => `${p.x},${p.y}`).join(' ')} ${pts[pts.length - 1].x},170` 
                            : '';
                          return (
                            <>
                              {areaPath && <polygon points={areaPath} fill="url(#chart-glow)" />}
                              {linePath && <polyline points={linePath} fill="none" stroke="var(--color-brand)" strokeWidth="2.5" />}
                              {pts.map((p, i) => (
                                <g key={i}>
                                  <circle cx={p.x} cy={p.y} r="4" fill="var(--bg-primary)" stroke="var(--color-brand)" strokeWidth="2" />
                                  <text x={p.x} y={p.y - 10} textAnchor="middle" fill="var(--color-text-primary)" fontSize="8" fontWeight="600">
                                    {p.label.split(' ')[0]}
                                  </text>
                                </g>
                              ))}
                            </>
                          );
                        })()}
                        <line x1="0" y1="170" x2="500" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Stage Progress Tracker */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="chart-title">
                  <Sprout size={14} style={{ color: 'var(--color-accent)' }} />
                  <span>Growth Stages Breakdown</span>
                </div>
                
                {cultivations.filter(c => c.status === 'Growing').length === 0 ? (
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                    No growing cycles active.
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                      {['Planted', 'Germination', 'Vegetative', 'Flowering', 'Ready to Harvest'].map(stage => {
                        const count = cultivations.filter(c => c.status === 'Growing' && c.stage === stage).length;
                        const totalGrowing = cultivations.filter(c => c.status === 'Growing').length;
                        const pct = totalGrowing ? (count / totalGrowing) * 100 : 0;
                        return (
                          <div key={stage} style={{ fontSize: '0.8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                              <span style={{ fontWeight: '500' }}>{stage}</span>
                              <span style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>{count} plots</span>
                            </div>
                            <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(to right, var(--color-brand), var(--color-accent))', transition: 'var(--transition-smooth)' }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Plan & Real-time Adviser */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
              <div className="glass-card">
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} style={{ color: 'var(--color-brand)' }} />
                  <span>Quick-Plant Cultivation Planner</span>
                </h3>
                <form onSubmit={handlePlantCropSubmit} className="form-grid">
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Select Crop Variety</label>
                    <select 
                      className="form-select" 
                      value={newPlant.cropId} 
                      onChange={e => setNewPlant({ ...newPlant, cropId: e.target.value })}
                      required
                    >
                      <option value="">-- Choose Crop --</option>
                      {crops.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Plot / Field Location</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. greenhouse C" 
                      value={newPlant.location} 
                      onChange={e => setNewPlant({ ...newPlant, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Planting Date</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={newPlant.plantedDate} 
                      onChange={e => setNewPlant({ ...newPlant, plantedDate: e.target.value })}
                      required
                    />
                  </div>
                  <button className="btn-primary" type="submit" style={{ gridColumn: 'span 2', marginTop: '0.25rem', height: '32px' }}>
                    <Sprout size={12} /> Plant Now
                  </button>
                </form>
              </div>

              {/* Dynamic Advisor Alert based on weather */}
              <div className="glass-card advisor-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', color: 'var(--color-accent)' }}>
                  <AlertTriangle size={14} />
                  <span>REAL-TIME CLIMATE ADVISORY</span>
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {weather === 'Sunny' && (
                    <p style={{ color: 'var(--color-text-primary)' }}>
                      ☀️ **Sunny conditions active.** Increase watering runs on vegetable patches. Watch out for drying top-soil on high exposure beds.
                    </p>
                  )}
                  {weather === 'Rainy' && (
                    <p style={{ color: 'var(--color-text-primary)' }}>
                      🌧️ **Rainy conditions active.** Irrigation flows have been stopped automatically to avoid root rot. Ensure field drainage channels are clear.
                    </p>
                  )}
                  {weather === 'Cold' && (
                    <p style={{ color: 'var(--color-text-primary)' }}>
                      ❄️ **Cold weather active.** Cover sensitive strawberries. Ensure greenhouse heaters are engaged to keep thermal levels optimal.
                    </p>
                  )}
                  {weather === 'Drought' && (
                    <p style={{ color: '#f87171', fontWeight: '600' }}>
                      🔥 **Drought warning active!** Critical evaporation risk. Initiate mulching runs and run drip lines during evening cycles.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Crops View */}
        {activeTab === 'crops' && (
          <div className="fade-in">
            {/* Soil Analyzer Tool & Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {/* Interactive Soil Analyzer Tool */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', color: 'var(--color-brand)', fontSize: '0.8rem' }}>
                  <Sparkles size={14} />
                  <span>INTERACTIVE SOIL pH ANALYZER</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Select Crop</span>
                    <select 
                      className="form-select"
                      style={{ padding: '0.4rem' }}
                      value={soilTester.cropId}
                      onChange={e => setSoilTester({ ...soilTester, cropId: e.target.value })}
                    >
                      {crops.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ width: '80px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Soil pH</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="form-input" 
                      style={{ padding: '0.4rem' }}
                      value={soilTester.pH}
                      onChange={e => setSoilTester({ ...soilTester, pH: e.target.value })}
                    />
                  </div>
                </div>
                {soilTestResult && (
                  <div style={{ padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--color-brand)', fontSize: '0.8rem', borderRadius: '4px', marginTop: '0.25rem' }}>
                    {soilTestResult}
                  </div>
                )}
              </div>

              {/* Filtering panel */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-secondary)' }}>SEARCH & FILTER CATALOG</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={12} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      style={{ width: '100%', paddingLeft: '2.2rem' }} 
                      placeholder="Search variety..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select 
                    className="form-select" 
                    value={cropTypeFilter}
                    onChange={e => setCropTypeFilter(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Grain">Grains</option>
                    <option value="Vegetable">Vegetables</option>
                    <option value="Fruit">Fruits</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List Crops */}
            <div className="item-grid">
              {crops
                .filter(c => {
                  const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.sciName.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchType = cropTypeFilter === 'All' || c.type === cropTypeFilter;
                  return matchSearch && matchType;
                })
                .map(crop => (
                  <div key={crop.id} className="glass-card fade-in">
                    <div className="crop-card-header">
                      <div>
                        <h4 className="crop-name">{crop.name}</h4>
                        <span className="crop-sci-name">{crop.sciName}</span>
                      </div>
                      <span className="badge" style={{ backgroundColor: 'var(--color-brand-glow)', color: 'var(--color-brand)' }}>{crop.type}</span>
                    </div>

                    <div className="crop-details-list">
                      <div className="crop-detail-item">
                        <span>Optimal Soil pH:</span>
                        <span className="crop-detail-val">{crop.ph}</span>
                      </div>
                      <div className="crop-detail-item">
                        <span>Water Schedule:</span>
                        <span className="crop-detail-val">{crop.water}</span>
                      </div>
                      <div className="crop-detail-item">
                        <span>Growth Window:</span>
                        <span className="crop-detail-val">{crop.duration} Days</span>
                      </div>
                      <div className="crop-detail-item">
                        <span>Temp Range:</span>
                        <span className="crop-detail-val">{crop.temp}</span>
                      </div>
                      <div className="crop-detail-item">
                        <span>Exp. Yield Factor:</span>
                        <span className="crop-detail-val">{crop.yieldExpect} kg / m²</span>
                      </div>
                      <div className="crop-detail-item">
                        <span>Market Value:</span>
                        <span className="crop-detail-val" style={{ color: 'var(--color-accent)' }}>${crop.marketVal.toFixed(2)} / kg</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Add Crop Modal */}
            {showAddCrop && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div className="glass-card fade-in" style={{ width: '90%', maxWidth: '450px', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Create New Crop Profile</h3>
                  <form onSubmit={handleAddCropSubmit} className="form-grid">
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Crop Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Organic Russet Potatoes" 
                        value={newCrop.name}
                        onChange={e => setNewCrop({ ...newCrop, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Crop Category</label>
                      <select 
                        className="form-select"
                        value={newCrop.type}
                        onChange={e => setNewCrop({ ...newCrop, type: e.target.value })}
                      >
                        <option value="Grain">Grain</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="Fruit">Fruit</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Growth Duration (Days)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={newCrop.duration}
                        onChange={e => setNewCrop({ ...newCrop, duration: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Optimal pH Range</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={newCrop.ph}
                        onChange={e => setNewCrop({ ...newCrop, ph: e.target.value })}
                        placeholder="e.g. 6.0 - 6.8"
                      />
                    </div>
                    <div className="form-group">
                      <label>Water Needs</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={newCrop.water}
                        onChange={e => setNewCrop({ ...newCrop, water: e.target.value })}
                        placeholder="e.g. Weekly"
                      />
                    </div>
                    <div className="form-group">
                      <label>Temp Range</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={newCrop.temp}
                        onChange={e => setNewCrop({ ...newCrop, temp: e.target.value })}
                        placeholder="e.g. 15°C - 25°C"
                      />
                    </div>
                    <div className="form-group">
                      <label>Est. Yield (kg / m²)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        className="form-input" 
                        value={newCrop.yieldExpect}
                        onChange={e => setNewCrop({ ...newCrop, yieldExpect: e.target.value })}
                      />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Market Value ($ per kg)</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="form-input" 
                        value={newCrop.marketVal}
                        onChange={e => setNewCrop({ ...newCrop, marketVal: e.target.value })}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button className="btn-secondary" type="button" onClick={() => setShowAddCrop(false)}>Cancel</button>
                      <button className="btn-primary" type="submit">Save Profile</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cultivation Logs View */}
        {activeTab === 'cultivations' && (
          <div className="fade-in">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cultivations.filter(c => c.status === 'Growing').length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>
                  <Sprout size={36} style={{ display: 'block', margin: '0 auto 0.75rem', color: 'var(--color-text-muted)' }} />
                  <p style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>No crops currently planted.</p>
                  <p style={{ fontSize: '0.8rem' }}>Use the "Plant Crop" button in the top right to start tracking a block.</p>
                </div>
              ) : (
                cultivations
                  .filter(c => c.status === 'Growing')
                  .map(log => (
                    <div key={log.id} className="glass-card fade-in" style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', gap: '1.5rem' }}>
                      {/* Left: General Info */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span className="badge badge-growing">{log.stage}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><MapPin size={10} style={{ verticalAlign: 'middle', marginRight: '2px' }} />{log.location}</span>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{log.cropName}</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Sowed:</span>
                            <span style={{ fontWeight: '600' }}>{log.plantedDate}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Exp. Harvest:</span>
                            <span style={{ fontWeight: '600', color: 'var(--color-accent)' }}>{log.expectedHarvest}</span>
                          </div>
                        </div>

                        {/* Stage Progress Bar */}
                        <div style={{ marginTop: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.15rem' }}>
                            <span>Growth Progress</span>
                            <span>
                              {log.stage === 'Planted' && '20%'}
                              {log.stage === 'Germination' && '40%'}
                              {log.stage === 'Vegetative' && '60%'}
                              {log.stage === 'Flowering' && '80%'}
                              {log.stage === 'Ready to Harvest' && '100%'}
                            </span>
                          </div>
                          <div style={{ height: '5px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ 
                              height: '100%', 
                              background: 'var(--color-brand)', 
                              width: 
                                log.stage === 'Planted' ? '20%' :
                                log.stage === 'Germination' ? '40%' :
                                log.stage === 'Vegetative' ? '60%' :
                                log.stage === 'Flowering' ? '80%' : '100%',
                              transition: 'var(--transition-smooth)'
                            }} />
                          </div>
                        </div>
                      </div>

                      {/* Middle: Action logs list */}
                      <div style={{ borderLeft: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)', padding: '0 1.5rem' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activity Logs</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '110px', overflowY: 'auto', paddingRight: '0.35rem' }}>
                          {log.logs.map((entry, idx) => (
                            <div key={idx} style={{ fontSize: '0.75rem', padding: '0.15rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span className="timeline-bullet"></span>
                              <span style={{ color: 'var(--color-text-secondary)' }}>{entry}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Actions controls */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                        <button className="btn-secondary" style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }} onClick={() => logAction(log.id, 'Watering')}>
                          <Droplet size={12} style={{ color: '#60a5fa' }} /> Water Block
                        </button>
                        <button className="btn-secondary" style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }} onClick={() => logAction(log.id, 'Fertilization')}>
                          <Sparkles size={12} style={{ color: 'var(--color-accent)' }} /> Fertilize Soil
                        </button>
                        
                        {log.stage !== 'Ready to Harvest' ? (
                          <button className="btn-primary" style={{ padding: '0.4rem', fontSize: '0.8rem' }} onClick={() => advanceStage(log.id)}>
                            <ArrowRight size={12} /> Next Stage
                          </button>
                        ) : (
                          <button className="btn-primary" style={{ padding: '0.4rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, var(--color-accent), #d97706)' }} onClick={() => setShowHarvestModal(log.id)}>
                            <CheckCircle2 size={12} /> Harvest Crop
                          </button>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Plant Crop Modal */}
            {showPlantCrop && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div className="glass-card fade-in" style={{ width: '90%', maxWidth: '380px', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Plant Crop Cycle</h3>
                  <form onSubmit={handlePlantCropSubmit} className="form-grid">
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Select Crop Variety</label>
                      <select 
                        className="form-select"
                        value={newPlant.cropId}
                        onChange={e => setNewPlant({ ...newPlant, cropId: e.target.value })}
                        required
                      >
                        <option value="">-- Choose Crop --</option>
                        {crops.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Plot / Field Location</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Sector C greenhouse"
                        value={newPlant.location}
                        onChange={e => setNewPlant({ ...newPlant, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Planting Date</label>
                      <input 
                        type="date" 
                        className="form-input" 
                        value={newPlant.plantedDate}
                        onChange={e => setNewPlant({ ...newPlant, plantedDate: e.target.value })}
                        required
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button className="btn-secondary" type="button" onClick={() => setShowPlantCrop(false)}>Cancel</button>
                      <button className="btn-primary" type="submit">Plant Now</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Reap Harvest Modal */}
            {showHarvestModal && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div className="glass-card fade-in" style={{ width: '90%', maxWidth: '380px', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Log Harvest Production</h3>
                  <form onSubmit={executeHarvest} className="form-grid">
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Yield Quantity Harvested (kg)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={harvestInput.quantity}
                        onChange={e => setHarvestInput({ ...harvestInput, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label>Crop Quality Grade</label>
                      <select 
                        className="form-select"
                        value={harvestInput.grade}
                        onChange={e => setHarvestInput({ ...harvestInput, grade: e.target.value })}
                      >
                        <option value="A">Grade A (Premium)</option>
                        <option value="B">Grade B (Standard)</option>
                        <option value="C">Grade C (Sub-standard)</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button className="btn-secondary" type="button" onClick={() => setShowHarvestModal(null)}>Cancel</button>
                      <button className="btn-primary" type="submit" style={{ background: 'linear-gradient(135deg, var(--color-accent), #d97706)' }}>Complete Harvest</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Harvest Records View */}
        {activeTab === 'production' && (
          <div className="fade-in glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Yield History Logs</h3>
            </div>
            
            {production.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                No records yet. Complete harvests to populate.
              </div>
            ) : (
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Crop Variety</th>
                      <th>Harvest Site</th>
                      <th>Date Reaped</th>
                      <th>Actual Yield</th>
                      <th>Quality Grade</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {production.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: '600' }}>{p.cropName}</td>
                        <td>{p.location}</td>
                        <td>{p.harvestDate}</td>
                        <td>{p.quantity.toLocaleString()} kg</td>
                        <td>
                          <span className="badge" style={{ 
                            backgroundColor: p.grade === 'A' ? 'rgba(16, 185, 129, 0.15)' : p.grade === 'B' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: p.grade === 'A' ? 'var(--color-brand)' : p.grade === 'B' ? 'var(--color-accent)' : '#f87171'
                          }}>
                            Grade {p.grade}
                          </span>
                        </td>
                        <td style={{ fontWeight: '700', color: 'var(--color-brand)' }}>
                          ${p.revenue.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {activeTab === 'calendar' && (
          <CalendarView cultivations={cultivations} />
        )}
        {activeTab === 'tn_advisor' && (
          <TNCropScheduler crops={crops} />
        )}
      </main>
    </div>
  );
}

function CalendarView({ cultivations }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(null);

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const goBack = () => {
    if (viewMonth === 0) { setViewYear(v => v - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const goForward = () => {
    if (viewMonth === 11) { setViewYear(v => v + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  // Build event map: { 'YYYY-MM-DD': [{ type: 'plant'|'harvest', cropName, location }] }
  const eventMap = React.useMemo(() => {
    const map = {};
    cultivations.forEach(c => {
      if (c.plantedDate) {
        const key = c.plantedDate;
        if (!map[key]) map[key] = [];
        map[key].push({ type: 'plant', cropName: c.cropName, location: c.location, status: c.status });
      }
      if (c.expectedHarvest) {
        const key = c.expectedHarvest;
        if (!map[key]) map[key] = [];
        map[key].push({ type: 'harvest', cropName: c.cropName, location: c.location, status: c.status });
      }
    });
    return map;
  }, [cultivations]);

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const todayStr = today.toISOString().split('T')[0];

  const cellDateStr = (day) => {
    if (!day) return null;
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${viewYear}-${mm}-${dd}`;
  };

  // Upcoming events (next 60 days from today)
  const upcomingEvents = React.useMemo(() => {
    const events = [];
    Object.entries(eventMap).forEach(([dateStr, evts]) => {
      const d = new Date(dateStr);
      const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
      if (diff >= -1 && diff <= 60) {
        evts.forEach(e => events.push({ ...e, dateStr, diff }));
      }
    });
    return events.sort((a, b) => a.diff - b.diff);
  }, [eventMap]);

  const selectedEvents = selectedDay ? (eventMap[cellDateStr(selectedDay)] || []) : [];

  const stageColor = (status) => status === 'Harvested' ? 'rgba(107,114,128,0.5)' : 'var(--color-brand)';

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1rem', alignItems: 'start' }}>
      {/* Calendar Grid */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        {/* Month Navigator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <button
            className="btn-secondary"
            style={{ padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            onClick={goBack}
          >
            <ChevronLeft size={14} />
          </button>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
            {MONTHS[viewMonth]} {viewYear}
          </h3>
          <button
            className="btn-secondary"
            style={{ padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            onClick={goForward}
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
          {DAYS.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '0.65rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', padding: '0.4rem 0' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
          {cells.map((day, idx) => {
            const dateStr = cellDateStr(day);
            const events = day ? (eventMap[dateStr] || []) : [];
            const isToday = dateStr === todayStr;
            const isSelected = day === selectedDay;
            const hasPlant = events.some(e => e.type === 'plant');
            const hasHarvest = events.some(e => e.type === 'harvest');

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                style={{
                  minHeight: '56px',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.35rem',
                  background: isSelected
                    ? 'rgba(16, 185, 129, 0.12)'
                    : isToday
                    ? 'rgba(16, 185, 129, 0.06)'
                    : 'rgba(255,255,255,0.02)',
                  border: isSelected
                    ? '1px solid var(--color-brand)'
                    : isToday
                    ? '1px solid rgba(16,185,129,0.3)'
                    : '1px solid rgba(255,255,255,0.04)',
                  cursor: day ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                }}
              >
                {day && (
                  <>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: isToday ? '800' : '500',
                      color: isToday ? 'var(--color-brand)' : 'var(--color-text-secondary)',
                      lineHeight: 1
                    }}>
                      {day}
                    </span>
                    <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
                      {hasPlant && (
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-brand)', display: 'inline-block', flexShrink: 0 }} title="Planting date" />
                      )}
                      {hasHarvest && (
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} title="Harvest date" />
                      )}
                    </div>
                    {events.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {events.slice(0, 2).map((e, i) => (
                          <span key={i} style={{
                            fontSize: '0.55rem',
                            color: e.type === 'plant' ? 'var(--color-brand)' : 'var(--color-accent)',
                            background: e.type === 'plant' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                            borderRadius: '2px',
                            padding: '0 2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%'
                          }}>
                            {e.cropName.split(' ')[0]}
                          </span>
                        ))}
                        {events.length > 2 && <span style={{ fontSize: '0.5rem', color: 'var(--color-text-muted)' }}>+{events.length - 2} more</span>}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-brand)', display: 'inline-block' }} />
            Planting Date
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }} />
            Expected Harvest
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.3)', display: 'inline-block' }} />
            Today
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Selected Day Events */}
        {selectedDay && (
          <div className="glass-card fade-in" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Calendar size={14} style={{ color: 'var(--color-brand)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                {MONTHS[viewMonth]} {selectedDay}, {viewYear}
              </span>
            </div>
            {selectedEvents.length === 0 ? (
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>No events on this day.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedEvents.map((e, i) => (
                  <div key={i} style={{
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    background: e.type === 'plant' ? 'rgba(16,185,129,0.07)' : 'rgba(245,158,11,0.07)',
                    border: `1px solid ${e.type === 'plant' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ marginTop: '2px', color: e.type === 'plant' ? 'var(--color-brand)' : 'var(--color-accent)', flexShrink: 0 }}>
                      {e.type === 'plant' ? <Leaf size={13} /> : <Scissors size={13} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>{e.cropName}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-text-secondary)', marginTop: '1px' }}>
                        {e.type === 'plant' ? '🌱 Planting day' : '🌾 Expected harvest'} · {e.location}
                      </div>
                      {e.status === 'Harvested' && (
                        <span style={{ fontSize: '0.6rem', color: '#6b7280', marginTop: '2px', display: 'block' }}>Already harvested</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upcoming Events */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <CalendarDays size={14} style={{ color: 'var(--color-brand)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>Upcoming (60 days)</span>
          </div>
          {upcomingEvents.length === 0 ? (
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>No upcoming events in the next 60 days.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {upcomingEvents.map((e, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)'
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: e.type === 'plant' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                    color: e.type === 'plant' ? 'var(--color-brand)' : 'var(--color-accent)'
                  }}>
                    {e.type === 'plant' ? <Leaf size={12} /> : <Scissors size={12} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {e.cropName}
                    </div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--color-text-secondary)' }}>
                      {e.type === 'plant' ? 'Planting' : 'Harvest'} · {e.location}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: '700', flexShrink: 0,
                    color: e.diff <= 0 ? '#f87171' : e.diff <= 7 ? 'var(--color-accent)' : 'var(--color-text-secondary)'
                  }}>
                    {e.diff <= 0 ? 'Today' : `${e.diff}d`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary strip */}
        <div className="glass-card" style={{ padding: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-brand)' }}>
              {cultivations.filter(c => c.status === 'Growing').length}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--color-text-secondary)' }}>Active Plots</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-accent)' }}>
              {upcomingEvents.filter(e => e.type === 'harvest').length}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--color-text-secondary)' }}>Upcoming Harvests</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#60a5fa' }}>
              {cultivations.filter(c => c.status === 'Harvested').length}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--color-text-secondary)' }}>Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TNCropScheduler({ crops }) {
  const tnData = {
    '1': {
      seasons: [
        { name: 'Kuruvai (Short term)', sow: 'June - July', harvest: 'September - October', duration: '120 days' },
        { name: 'Samba (Medium/Long term)', sow: 'August - September', harvest: 'January - February', duration: '150 days' },
        { name: 'Navarai (Spring)', sow: 'December - January', harvest: 'April - May', duration: '120 days' }
      ],
      tips: 'Ensure 5cm standing water during transplanting. Use neem-coated urea split doses. Keep fields weed-free during the first 30 days.',
      fertilizer: 'NPK ratio 120:60:60 kg/ha.'
    },
    '2': {
      seasons: [
        { name: 'Kharif Season', sow: 'June - July', harvest: 'September - October', duration: '110 days' },
        { name: 'Rabi Season', sow: 'September - October', harvest: 'December - January', duration: '110 days' }
      ],
      tips: 'Drought tolerant millet. Prefers well-drained sandy loam. Apply gypsum during earhead formation to boost grain quality.',
      fertilizer: 'NPK ratio 60:30:30 kg/ha.'
    },
    '3': {
      seasons: [
        { name: 'Early Season', sow: 'December - January', harvest: 'October - November', duration: '300 days' },
        { name: 'Mid Season', sow: 'February - March', harvest: 'December - January', duration: '300 days' }
      ],
      tips: 'Needs heavy watering during formative phase. Do trash mulching to conserve moisture. Perform earthing-up at 4 months.',
      fertilizer: 'NPK ratio 275:112.5:112.5 kg/ha.'
    },
    '4': {
      seasons: [
        { name: 'Adi Pattam (Main)', sow: 'June - July', harvest: 'February - March', duration: '270 days' }
      ],
      tips: 'Requires raised bed cultivation to prevent rhizome rot. Maintain high organic content. Harvest when leaves yellow and dry.',
      fertilizer: 'NPK ratio 120:60:60 kg/ha + Micronutrients.'
    },
    '5': {
      seasons: [
        { name: 'Monsoon Planting', sow: 'June - August', harvest: 'January - March', duration: '240 days' }
      ],
      tips: 'Grows best under mixed shade (silver oak/jackfruit). Needs pruning after berry picking to encourage lateral branch growth.',
      fertilizer: 'NPK ratio 120:90:120 kg/ha.'
    },
    '6': {
      seasons: [
        { name: 'Monsoon Slopes', sow: 'June - July', harvest: 'December - January', duration: '180 days' }
      ],
      tips: 'Grows in highly acidic, organic soils. Ensure regular pruning to keep bushes at table height for easier manual leaf plucking.',
      fertilizer: 'NPK ratio 150:80:120 kg/ha.'
    },
    '7': {
      seasons: [
        { name: 'Southwest Monsoon', sow: 'June - July', harvest: 'January - February', duration: '240 days' }
      ],
      tips: 'Vine crop requiring strong living standards/tree support. Provide organic compost mulching around root zones twice a year.',
      fertilizer: 'Apply 100g NPK mixture per vine annually.'
    },
    '8': {
      seasons: [
        { name: 'Main Season', sow: 'February - March', harvest: 'December - January', duration: '300 days' },
        { name: 'Autumn Planting', sow: 'August - September', harvest: 'June - July', duration: '300 days' }
      ],
      tips: 'Provide bamboo or wood support (propping) to protect heavy fruit bunches. High potassium intake is vital for bunch sizing.',
      fertilizer: 'NPK ratio 110:35:330g per plant.'
    }
  };

  const [selectedId, setSelectedId] = useState('1');
  const [sowMonth, setSowMonth] = useState('June');

  const crop = crops.find(c => c.id === selectedId);
  const data = tnData[selectedId] || { seasons: [], tips: 'No suggestions available.', fertilizer: 'N/A' };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const calculateHarvestMonth = () => {
    if (!crop) return 'N/A';
    const durationMonths = Math.round(crop.duration / 30);
    const startIndex = months.indexOf(sowMonth);
    const endIndex = (startIndex + durationMonths) % 12;
    return months[endIndex];
  };

  return (
    <div className="fade-in glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Tamil Nadu Crop Season Scheduler & Advisor</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="form-group">
            <label>Select Crop</label>
            <select 
              className="form-select"
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
            >
              {crops.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Sowing Month</label>
            <select 
              className="form-select"
              value={sowMonth}
              onChange={e => setSowMonth(e.target.value)}
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div style={{ padding: '0.65rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-brand)' }}>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-brand)', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>Calculated Harvest Suggestion</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)' }}>
              If you sow in **{sowMonth}**, crop will be ready in **{calculateHarvestMonth()}** (~{crop ? crop.duration : 0} days).
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: '700' }}>Recommended Tamil Nadu Seasons</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.35rem' }}>
              {data.seasons.map((s, idx) => (
                <div key={idx} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-brand)' }}>{s.name}</strong>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', marginTop: '0.1rem' }}>Sow: {s.sow} | Harvest: {s.harvest}</div>
                  </div>
                  <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-accent)', alignSelf: 'center' }}>{s.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase' }}>Farming Advisory</span>
              <p style={{ fontSize: '0.75rem', marginTop: '0.2rem', color: 'var(--color-text-secondary)' }}>{data.tips}</p>
            </div>
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-brand)', fontWeight: '700', textTransform: 'uppercase' }}>Fertilizer Recommendations</span>
              <p style={{ fontSize: '0.75rem', marginTop: '0.2rem', color: 'var(--color-text-secondary)' }}>{data.fertilizer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

