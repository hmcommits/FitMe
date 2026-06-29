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

  const filteredOptions = historyOptions.filter(opt => 
    opt.toLowerCase().includes(inputValue.toLowerCase())
  );

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
          placeholder={`Please type the ${label.toLowerCase()}...`}
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

      {isOpen && filteredOptions.length > 0 && (
        <ul className="dropdown-menu">
          <li className="dropdown-header" style={{ fontSize: '11px', color: 'var(--text-secondary)', padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.1)', cursor: 'default', background: 'transparent' }}>
            Recently logged... (Type any new name to save)
          </li>
          {filteredOptions.map((opt, idx) => (
            <li key={idx} onClick={() => handleSelectOption(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
