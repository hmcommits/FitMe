"use client";

import { useState, useEffect, useRef } from 'react';
import { savePhotoLocally, getPhotoLocally } from '../utils/imageStorage';
import './GlobalHeader.css';

export default function GlobalHeader({ date, setDate, day, setDay, weight, setWeight }) {
  const [photoData, setPhotoData] = useState(null);
  const [isViewingPhoto, setIsViewingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  // When date changes, attempt to load an existing photo from IndexedDB
  useEffect(() => {
    async function loadPhoto() {
      if (!date) return;
      const existingPhoto = await getPhotoLocally(date);
      setPhotoData(existingPhoto);
    }
    loadPhoto();
  }, [date]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    const dateObj = new Date(newDate);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (!isNaN(dateObj.getDay())) {
      setDay(days[dateObj.getDay()]);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        setPhotoData(base64String);
        await savePhotoLocally(date, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Format date nicely: "MON, 30 JUN"
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();
  };

  return (
    <header className="global-header">
      <div className="header-top">
        <div className="date-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="day-display">{day || 'Select a date'}</span>
          </div>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>

        <div className="metrics-group">
          <div className="weight-input-wrapper">
            <span className="weight-prefix">⚖️ BW</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="—"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ''))}
              className="weight-input"
            />
            <span className="weight-prefix">kg</span>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handlePhotoUpload}
        />

        {!photoData ? (
          <button className="btn btn-secondary photo-btn" onClick={() => fileInputRef.current.click()}>
            📷 Add Progress Photo
          </button>
        ) : (
          <div className="photo-actions">
            <button className="btn btn-secondary photo-btn" onClick={() => setIsViewingPhoto(true)}>
              👁 View Photo
            </button>
            <button className="btn btn-secondary photo-btn" onClick={() => fileInputRef.current.click()}>
              🔄 Retake
            </button>
          </div>
        )}
      </div>

      {isViewingPhoto && photoData && (
        <div className="photo-modal" onClick={() => setIsViewingPhoto(false)}>
          <div className="photo-modal-content">
            <img src={photoData} alt={`Workout on ${date}`} className="workout-photo" />
            <p>Tap anywhere to close</p>
          </div>
        </div>
      )}
    </header>
  );
}
