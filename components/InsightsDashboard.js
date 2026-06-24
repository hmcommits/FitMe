"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import './InsightsDashboard.css';

// Mock Data for L1 Analytics
const weeklyVolumeData = [
  { name: 'Week 1', Chest: 2500, Back: 3000, Legs: 4500, Arms: 1500, Shoulders: 2000 },
  { name: 'Week 2', Chest: 2600, Back: 3100, Legs: 4600, Arms: 1600, Shoulders: 2100 },
  { name: 'Week 3', Chest: 2750, Back: 3200, Legs: 4800, Arms: 1650, Shoulders: 2200 },
  { name: 'Week 4', Chest: 2900, Back: 3350, Legs: 5000, Arms: 1800, Shoulders: 2300 },
];

const qualityData = [
  { name: 'Quality', Good: 12, Mid: 5, Bad: 2 }
];

const timeData = [
  { name: 'Time', Morning: 14, Evening: 4, Both: 1 }
];

export default function InsightsDashboard() {
  const [dateFilter, setDateFilter] = useState('Last 30 Days');

  return (
    <div className="insights-container">
      {/* Global Filter */}
      <div className="filter-header">
        <select 
          className="date-filter-dropdown" 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last 6 Months</option>
          <option>All Time</option>
        </select>
        <div className="delta-badge positive">
          <span>▲ +15% Volume</span>
        </div>
      </div>

      {/* Level 1: Main Dashboard */}
      <div className="insight-card glass-panel mt-20">
        <h3 className="card-title">Total Weekly Volume (kg)</h3>
        <p className="card-subtitle">Sum of Sets × Reps × Weight</p>
        <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
          <ResponsiveContainer>
            <BarChart data={weeklyVolumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#9ba1a6" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ba1a6" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Chest" stackId="a" fill="#00e5ff" />
              <Bar dataKey="Back" stackId="a" fill="#ff2a2a" />
              <Bar dataKey="Legs" stackId="a" fill="#39ff14" />
              <Bar dataKey="Shoulders" stackId="a" fill="#ff5e00" />
              <Bar dataKey="Arms" stackId="a" fill="#bf00ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insight-card glass-panel mt-20">
        <h3 className="card-title">Workout Consistency</h3>
        <div className="heatmap-mock mt-10">
          {/* Mock Heatmap for simplicity in Step 8 L1 */}
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className={`heat-square ${Math.random() > 0.3 ? 'active' : ''}`}></div>
          ))}
        </div>
        <p className="card-subtitle text-center mt-10">19 workouts in {dateFilter}</p>
      </div>

      <div className="split-cards mt-20">
        <div className="insight-card glass-panel split-item">
          <h3 className="card-title text-center">Quality</h3>
          <div style={{ width: '100%', height: 150 }}>
            <ResponsiveContainer>
              <BarChart data={qualityData} layout="vertical" margin={{ left: -30 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip cursor={false} contentStyle={{ background: '#1a1d24', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="Good" stackId="a" fill="#39ff14" barSize={20} />
                <Bar dataKey="Mid" stackId="a" fill="#ff5e00" />
                <Bar dataKey="Bad" stackId="a" fill="#ff2a2a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="insight-card glass-panel split-item">
          <h3 className="card-title text-center">Time</h3>
          <div style={{ width: '100%', height: 150 }}>
            <ResponsiveContainer>
              <BarChart data={timeData} layout="vertical" margin={{ left: -30 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip cursor={false} contentStyle={{ background: '#1a1d24', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="Morning" stackId="a" fill="#00e5ff" barSize={20} />
                <Bar dataKey="Evening" stackId="a" fill="#bf00ff" />
                <Bar dataKey="Both" stackId="a" fill="#ffff00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
