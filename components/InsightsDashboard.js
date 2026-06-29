"use client";

import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import './InsightsDashboard.css';

export default function InsightsDashboard({ workoutHistory = [] }) {
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  
  // Drill-down State
  const [level, setLevel] = useState(1); // 1 = Main, 2 = Muscle, 3 = Exercise
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [l3Tab, setL3Tab] = useState('Weight'); // 'Weight', 'Reps', 'Volume'

  // Dynamic Aggregation Logic
  const { weeklyVolumeData, qualityData, timeData } = useMemo(() => {
    const times = { Morning: 0, Evening: 0, Both: 0 };
    const qualities = { Good: 0, Mid: 0, Bad: 0 };
    const muscleTotals = {};
    const musclesSet = new Set();
    
    workoutHistory.forEach(w => {
      // Time
      if (w.timeOfDay) {
         w.timeOfDay.forEach(t => {
           if (t === 'morning') times.Morning++;
           if (t === 'evening') times.Evening++;
           if (t === 'both') times.Both++;
         });
      }
      
      // Quality
      if (w.quality === 'Good') qualities.Good++;
      if (w.quality === 'Mid') qualities.Mid++;
      if (w.quality === 'Bad') qualities.Bad++;
      
      // Volume
      w.exercises?.forEach(ex => {
        if (!ex.muscleGroup || ex.muscleGroup === 'Cardio') return;
        musclesSet.add(ex.muscleGroup);

        let exVol = 0;
        ex.sets?.forEach(s => {
          const weightInKg = s.unit === 'lbs' ? (s.weight || 0) * 0.453592 : (s.weight || 0);
          exVol += weightInKg * (s.reps || 0);
        });
        if (!muscleTotals[ex.muscleGroup]) {
          muscleTotals[ex.muscleGroup] = 0;
        }
        muscleTotals[ex.muscleGroup] += exVol;
      });
    });

    return {
      timeData: [{ name: 'Time', ...times }],
      qualityData: [{ name: 'Quality', ...qualities }],
      weeklyVolumeData: [{ name: 'Total Volume', ...muscleTotals }],
      uniqueMuscles: Array.from(musclesSet)
    };
  }, [workoutHistory]);

  const palette = ['#00e5ff', '#ff2a2a', '#39ff14', '#ff5e00', '#bf00ff', '#ffff00', '#ff00ff', '#00ffff'];
  const getMuscleColor = (idx) => palette[idx % palette.length];

  const { muscleVolumeData, exercisesForMuscle } = useMemo(() => {
    if (!selectedMuscle) return { muscleVolumeData: [], exercisesForMuscle: [] };
    
    const exMap = {};
    const volData = [];

    workoutHistory.forEach(w => {
       const dateStr = new Date(w.date).toISOString().split('T')[0];
       let dailyVol = 0;

       w.exercises?.forEach(ex => {
         if (ex.muscleGroup === selectedMuscle) {
           let exVol = 0;
           ex.sets?.forEach(s => {
             const weightInKg = s.unit === 'lbs' ? (s.weight || 0) * 0.453592 : (s.weight || 0);
             exVol += weightInKg * (s.reps || 0);
           });
           dailyVol += exVol;

           if (!exMap[ex.name]) {
             exMap[ex.name] = { name: ex.name, lastDone: dateStr, maxVol: exVol, times: 1 };
           } else {
             exMap[ex.name].times++;
             if (exVol > exMap[ex.name].maxVol) exMap[ex.name].maxVol = exVol;
             if (dateStr > exMap[ex.name].lastDone) exMap[ex.name].lastDone = dateStr;
           }
         }
       });
       
       if (dailyVol > 0) {
         volData.push({ date: dateStr.slice(5), Volume: dailyVol });
       }
    });

    return {
      muscleVolumeData: volData.reverse(), // chronologically
      exercisesForMuscle: Object.values(exMap)
    };
  }, [workoutHistory, selectedMuscle]);

  const exerciseDetailData = useMemo(() => {
    if (!selectedExercise) return [];
    
    const data = [];
    workoutHistory.forEach(w => {
       const dateStr = new Date(w.date).toISOString().split('T')[0];
       w.exercises?.forEach(ex => {
         if (ex.name === selectedExercise) {
           let maxWeight = 0;
           let totalReps = 0;
           let totalVolume = 0;
           ex.sets?.forEach(s => {
             const weightInKg = s.unit === 'lbs' ? (s.weight || 0) * 0.453592 : (s.weight || 0);
             if (weightInKg > maxWeight) maxWeight = weightInKg;
             totalReps += (s.reps || 0);
             totalVolume += weightInKg * (s.reps || 0);
           });
           data.push({ date: dateStr.slice(5), Weight: Math.round(maxWeight), Repetitions: totalReps, Volume: Math.round(totalVolume) });
         }
       });
    });
    return data.reverse();
  }, [workoutHistory, selectedExercise]);

  const handleExerciseClick = (exerciseName) => {
    setSelectedExercise(exerciseName);
    setLevel(3);
  };

  return (
    <div className="insights-container">
      <div className="filter-header">
        <select 
          className="date-filter-dropdown" 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option>Last 30 Days</option>
          <option>All Time</option>
        </select>
      </div>

      {level === 1 && (
        <>
          <div className="insight-card glass-panel mt-20">
            <h3 className="card-title">Total Volume (kg)</h3>
            <p className="card-subtitle">Select a muscle group to view details</p>
            <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
              <ResponsiveContainer>
                <BarChart data={weeklyVolumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ba1a6" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ba1a6" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1d24', borderColor: '#333', borderRadius: '8px', color: '#fff' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  {uniqueMuscles.map((m, idx) => (
                    <Bar 
                      key={m} 
                      dataKey={m} 
                      stackId="a" 
                      fill={getMuscleColor(idx)} 
                      onClick={() => { setSelectedMuscle(m); setLevel(2); }} 
                      style={{cursor: 'pointer'}} 
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-20" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {uniqueMuscles.map((m, idx) => (
                <button 
                  key={m} 
                  onClick={() => { setSelectedMuscle(m); setLevel(2); }}
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: `1px solid ${getMuscleColor(idx)}`, 
                    color: getMuscleColor(idx), 
                    padding: '8px 14px', 
                    borderRadius: '20px', 
                    fontSize: '13px', 
                    fontWeight: 'bold',
                    cursor: 'pointer' 
                  }}
                >
                  {m}
                </button>
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

      {level === 3 && (
        <div className="drilldown-view mt-10">
          <button className="back-btn" onClick={() => setLevel(2)}>← Back to {selectedMuscle}</button>
          
          <div className="insight-card glass-panel mt-10">
            <h3 className="card-title" style={{ fontSize: '18px', color: '#fff' }}>{selectedExercise}</h3>
            
            <div className="pill-group mt-10" style={{ display: 'flex', gap: '5px' }}>
              {['Weight', 'Repetitions', 'Volume'].map((tab) => (
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
                    stroke={l3Tab === 'Weight' ? '#ff2a2a' : l3Tab === 'Repetitions' ? '#39ff14' : '#00e5ff'} 
                    strokeWidth={3} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="card-subtitle text-center mt-20">
              {l3Tab === 'Weight' && "Tracks your heaviest set max weight."}
              {l3Tab === 'Repetitions' && "Tracks total endurance repetitions."}
              {l3Tab === 'Volume' && "Tracks absolute workload (Sets × Repetitions × Weight)."}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
