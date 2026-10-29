const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = {
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) return { online: false };
      const data = await res.json();
      return { online: true, database: data.database };
    } catch {
      return { online: false };
    }
  },

  // Crops
  async getCrops() {
    const res = await fetch(`${API_BASE}/crops`);
    if (!res.ok) throw new Error('Failed to fetch crops');
    return res.json();
  },

  async addCrop(crop) {
    const res = await fetch(`${API_BASE}/crops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(crop),
    });
    if (!res.ok) throw new Error('Failed to add crop');
    return res.json();
  },

  async deleteCrop(id) {
    const res = await fetch(`${API_BASE}/crops/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete crop');
    return res.json();
  },

  // Cultivations
  async getCultivations() {
    const res = await fetch(`${API_BASE}/cultivations`);
    if (!res.ok) throw new Error('Failed to fetch cultivations');
    return res.json();
  },

  async addCultivation(cultivation) {
    const res = await fetch(`${API_BASE}/cultivations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cultivation),
    });
    if (!res.ok) throw new Error('Failed to add cultivation');
    return res.json();
  },

  async updateCultivation(id, updates) {
    const res = await fetch(`${API_BASE}/cultivations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update cultivation');
    return res.json();
  },

  async deleteCultivation(id) {
    const res = await fetch(`${API_BASE}/cultivations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete cultivation');
    return res.json();
  },

  // Production (Harvests)
  async getProduction() {
    const res = await fetch(`${API_BASE}/production`);
    if (!res.ok) throw new Error('Failed to fetch production records');
    return res.json();
  },

  async addProduction(record) {
    const res = await fetch(`${API_BASE}/production`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error('Failed to record harvest');
    return res.json();
  },
};
