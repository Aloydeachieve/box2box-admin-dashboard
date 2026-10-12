'use client';

import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface SelectLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  selectedLocation?: string;
  onSelectLocation: (loc: string) => void;
  availableLocations?: string[];
  title?: string;
}

export const SelectLocationModal: React.FC<SelectLocationModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  selectedLocation = 'Awka',
  onSelectLocation,
  availableLocations = ['Awka', 'Ikeja', 'Enugu', 'Lagos Mainland', 'Abuja'],
  title = 'Select location',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const inputBg = isLightMode ? '#F9FAFB' : '#27272A';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const yellowColor = '#F5C842';

  const filteredLocations = availableLocations.filter((l) =>
    l.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: `1px solid ${subtextColor}`,
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: subtextColor,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: inputBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '10px 38px 10px 14px',
              fontSize: '13px',
              color: textColor,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search
            size={16}
            color={subtextColor}
            style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
          />
        </div>

        {/* Radio list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          {filteredLocations.length === 0 ? (
            <div style={{ fontSize: '13px', color: subtextColor, textAlign: 'center', padding: '16px 0' }}>
              No locations found
            </div>
          ) : (
            filteredLocations.map((loc) => {
              const isSelected = selectedLocation === loc;
              return (
                <div
                  key={loc}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '8px 4px',
                    borderRadius: '6px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = isLightMode
                      ? 'rgba(0, 0, 0, 0.03)'
                      : 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
                    {loc}
                  </span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: yellowColor,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
