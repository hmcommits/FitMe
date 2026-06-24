"use client";

import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export default function Dropdown({ label, value, onChange, historyOptions, onAddHistory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const containerRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSelectOption = (opt) => {
    setInputValue(opt);
    onChange(opt);
    setIsOpen(false);
  };

  const handleBlur = () => {
    // If user types a new value and blurs, save it to history
    if (inputValue && !historyOptions.includes(inputValue)) {
      onAddHistory(inputValue);
    }
  };

  return (
    <div className="dropdown-container" ref={containerRef}>
      <label>{label}</label>
      <div className="dropdown-input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          placeholder={`Enter ${label.toLowerCase()}...`}
          className="dropdown-input"
        />
        <button 
          className="dropdown-toggle-btn" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          ▼
        </button>
      </div>

      {isOpen && historyOptions.length > 0 && (
        <ul className="dropdown-menu">
          {historyOptions.map((opt, idx) => (
            <li key={idx} onClick={() => handleSelectOption(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
