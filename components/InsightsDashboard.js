"use client";

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import './InsightsDashboard.css';

// Mock Data for L1
const weeklyVolumeData = [
  { name: 'Week 1', Chest: 2500, Back: 3000, Legs: 4500, Arms: 1500, Shoulders: 2000 },
  { name: 'Week 2', Chest: 2600, Back: 3100, Legs: 4600, Arms: 1600, Shoulders: 2100 },
  { name: 'Week 3', Chest: 2750, Back: 3200, Legs: 4800, Arms: 1650, Shoulders: 2200 },
  { name: 'Week 4', Chest: 2900, Back: 3350, Legs: 5000, Arms: 1800, Shoulders: 2300 },
];
const qualityData = [{ name: 'Quality', Good: 12, Mid: 5, Bad: 2 }];
const timeData = [{ name: 'Time', Morning: 14, Evening: 4, Both: 1 }];

// Mock Data for L2 (Muscle Group specific)
const muscleVolumeData = [
  { date: '12/06', Volume: 2200 },
  { date: '15/06', Volume: 2500 },
  { date: '18/06', Volume: 2450 },
  { date: '22/06', Volume: 2900 },
];

const exercisesForMuscle = [
  { name: 'DB Flat Bench Press', lastDone: '22/06/2026', maxVol: 1500, times: 4 },
  { name: 'Incline Chest Press', lastDone: '22/06/2026', maxVol: 900, times: 4 },
  { name: 'Cable Flys', lastDone: '18/06/2026', maxVol: 400, times: 3 },
];

// Mock Data for L3 (Specific Exercise)
const exerciseDetailData = [
  { date: '12/06', Weight: 10, Reps: 24, Volume: 240 },
  { date: '15/06', Weight: 10, Reps: 30, Volume: 300 },
  { date: '18/06', Weight: 12.5, Reps: 25, Volume: 312.5 },
  { date: '22/06', Weight: 12.5, Reps: 28, Volume: 325 },
];

export default function InsightsDashboard() {
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  
  // Drill-down State
  const [level, setLevel] = useState(1); // 1 = Main, 2 = Muscle, 3 = Exercise
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [l3Tab, setL3Tab] = useState('Weight'); // 'Weight', 'Reps', 'Volume'

  const handleMuscleClick = (data) => {
    if(data && data.dataKey) {
      setSelectedMuscle(data.dataKey);
      setLevel(2);
    }
  };

  const handleExerciseClick = (exerciseName) => {
    setSelectedExercise(exerciseName);
    setLevel(3);
  };

  return (
    <div className="insights-container">
      {/* Global Filter - Shown everywhere */}
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

      {/* LEVEL 1: MAIN DASHBOARD */}
      {level === 1 && (
        <>
          <div className="insight-card glass-panel mt-20">
            <h3 className="card-title">Total Weekly Volume (kg)</h3>
            <p className="card-subtitle">Select a muscle group to view details</p>
            <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
              <ResponsiveContainer>
                <BarChart data={weeklyVolumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ba1a6" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ba1a6" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1d24', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Chest" stackId="a" fill="#00e5ff" onClick={() => { setSelectedMuscle('Chest'); setLevel(2); }} style={{cursor: 'pointer'}} />
                  <Bar dataKey="Back" stackId="a" fill="#ff2a2a" onClick={() => { setSelectedMuscle('Back'); setLevel(2); }} style={{cursor: 'pointer'}} />
                  <Bar dataKey="Legs" stackId="a" fill="#39ff14" onClick={() => { setSelectedMuscle('Legs'); setLevel(2); }} style={{cursor: 'pointer'}} />
                  <Bar dataKey="Shoulders" stackId="a" fill="#ff5e00" onClick={() => { setSelectedMuscle('Shoulders'); setLevel(2); }} style={{cursor: 'pointer'}} />
                  <Bar dataKey="Arms" stackId="a" fill="#bf00ff" onClick={() => { setSelectedMuscle('Arms'); setLevel(2); }} style={{cursor: 'pointer'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Explicit Muscle Group Menu for reliable mobile drill-down */}
            <div className="mt-20" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {[
                { name: 'Chest', color: '#00e5ff' },
                { name: 'Back', color: '#ff2a2a' },
                { name: 'Legs', color: '#39ff14' },
                { name: 'Shoulders', color: '#ff5e00' },
                { name: 'Arms', color: '#bf00ff' }
              ].map(m => (
                <button 
                  key={m.name} 
                  onClick={() => { setSelectedMuscle(m.name); setLevel(2); }}
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: `1px solid ${m.color}`, 
                    color: m.color, 
                    padding: '8px 14px', 
                    borderRadius: '20px', 
                    fontSize: '13px', 
                    fontWeight: 'bold',
                    cursor: 'pointer' 
                  }}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          <div className="insight-card glass-panel mt-20">
            <h3 className="card-title">Workout Consistency</h3>
            <div className="heatmap-mock mt-10">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className={`heat-square ${Math.random() > 0.3 ? 'active' : ''}`}></div>
              ))}
            </div>
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
        </>
      )}

      {/* LEVEL 2: MUSCLE GROUP DRILL-DOWN */}
      {level === 2 && (
        <div className="drilldown-view mt-10">
          <button className="back-btn" onClick={() => setLevel(1)}>← Back to Dashboard</button>
          
          <div className="insight-card glass-panel mt-10">
            <h3 className="card-title" style={{ color: '#00e5ff', fontSize: '20px' }}>{selectedMuscle} Development</h3>
            <p className="card-subtitle">Total Volume progression over time</p>
            <div style={{ width: '100%', height: 200, marginTop: '20px' }}>
              <ResponsiveContainer>
                <LineChart data={muscleVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="date" stroke="#9ba1a6" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ba1a6" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1d24', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                  <Line type="monotone" dataKey="Volume" stroke="#00e5ff" strokeWidth={3} dot={{ r: 4, fill: '#00e5ff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h3 className="mt-20" style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Exercise History</h3>
          <div className="exercise-list mt-10">
            {exercisesForMuscle.map((ex, idx) => (
              <div key={idx} className="exercise-list-item glass-panel" onClick={() => handleExerciseClick(ex.name)}>
                <div className="ex-info">
                  <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>{ex.name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Last: {ex.lastDone} | {ex.times} sessions</p>
                </div>
                <div className="ex-stats" style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Max Volume</p>
                  <strong style={{ color: 'var(--accent-home)' }}>{ex.maxVol}kg</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 3: EXERCISE SPECIFIC DRILL-DOWN */}
      {level === 3 && (
        <div className="drilldown-view mt-10">
          <button className="back-btn" onClick={() => setLevel(2)}>← Back to {selectedMuscle}</button>
          
          <div className="insight-card glass-panel mt-10">
            <h3 className="card-title" style={{ fontSize: '18px', color: '#fff' }}>{selectedExercise}</h3>
            
            <div className="pill-group mt-10" style={{ display: 'flex', gap: '5px' }}>
              {['Weight', 'Reps', 'Volume'].map((tab) => (
                <button 
                  key={tab}
                  className={`pill-btn ${l3Tab === tab ? 'active' : ''}`}
                  style={{ flex: 1, padding: '8px', fontSize: '12px' }}
                  onClick={() => setL3Tab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
              <ResponsiveContainer>
                <LineChart data={exerciseDetailData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="date" stroke="#9ba1a6" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ba1a6" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1d24', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                  <Line 
                    type="monotone" 
                    dataKey={l3Tab} 
                    stroke={l3Tab === 'Weight' ? '#ff2a2a' : l3Tab === 'Reps' ? '#39ff14' : '#00e5ff'} 
                    strokeWidth={3} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="card-subtitle text-center mt-20">
              {l3Tab === 'Weight' && "Tracks your heaviest set max weight."}
              {l3Tab === 'Reps' && "Tracks total endurance repetitions."}
              {l3Tab === 'Volume' && "Tracks absolute workload (Sets × Reps × Weight)."}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
