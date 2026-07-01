"use client";

import { useState, useMemo } from 'react';
import './CalendarView.css';

export default function CalendarView({ onSelectDate, loggedDates = {} }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { uniqueMuscles, muscleColors } = useMemo(() => {
    const muscles = new Set();
    Object.values(loggedDates).forEach(dayMuscles => {
      dayMuscles.forEach(m => muscles.add(m));
    });
    const unique = Array.from(muscles);
    
    // Assign colors from palette
    const palette = ['#00e5ff', '#ff2a2a', '#39ff14', '#ff5e00', '#bf00ff', '#ffff00', '#ffffff', '#ff00ff'];
    const colorMap = {};
    unique.forEach((m, i) => {
      // Keep Cardio white for consistency if possible, else assign palette
      if (m === 'Cardio') colorMap[m] = '#ffffff';
      else colorMap[m] = palette[i % palette.length];
    });
    
    return { uniqueMuscles: unique, muscleColors: colorMap };
  }, [loggedDates]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const hasWorkout = loggedDates[dateString];
      const isToday = dateString === todayStr;
      
      days.push(
        <div 
          key={d} 
          className={`calendar-day ${hasWorkout ? 'active' : 'grayed-out'} ${isToday ? 'today' : ''}`}
          onClick={() => onSelectDate(dateString)}
        >
          <span className="day-number">{d}</span>
          <div className="dots-container">
            {hasWorkout && hasWorkout.map((muscle, idx) => (
              <span 
                key={idx} 
                className="muscle-dot" 
                style={{ backgroundColor: muscleColors[muscle] || '#ccc' }}
              ></span>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };


  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="calendar-container glass-panel">
      <div className="calendar-header">
        <button className="nav-btn" onClick={handlePrevMonth}>&lt;</button>
        <h2 className="month-title">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button className="nav-btn" onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
        {renderCalendar()}
      </div>

      <div className="legend-container mt-20">
        <h3 className="legend-title">Muscle Groups</h3>
        <div className="legend-grid">
          {Object.entries(muscleColors).map(([muscle, color]) => (
            <div key={muscle} className="legend-item">
              <span className="muscle-dot" style={{ backgroundColor: color }}></span>
              <span className="legend-label">{muscle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
