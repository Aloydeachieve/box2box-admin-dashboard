'use client';

import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { availableBatteries } from '@/lib/inventoryMockData';

interface ReplacePartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  componentTitle?: string;
  onSelectPart: (partId: string) => void;
}

export const ReplacePartDrawer: React.FC<ReplacePartDrawerProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  componentTitle = 'battery',
  onSelectPart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<string>('B-123456');

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const drawerBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#27272A';

  const filtered = availableBatteries.filter((b) =>
    b.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (part: string) => {
    setSelectedPart(part);
    onSelectPart(part);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '60px',
        zIndex: 110,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '320px',
          backgroundColor: drawerBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 20px 30px rgba(0, 0, 0, 0.6)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Header: Select battery & Close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: textColor, margin: 0 }}>
            Select {componentTitle}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '38px',
              backgroundColor: inputBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '0 36px 0 12px',
              fontSize: '13px',
              color: textColor,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search
            size={16}
            color={subtextColor}
            style={{ position: 'absolute', right: '12px', top: '11px', pointerEvents: 'none' }}
          />
        </div>

        {/* Radio list of available parts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '90px' }}>
          {filtered.map((part) => {
            const isSelected = selectedPart === part;
            return (
              <div
                key={part}
                onClick={() => handleSelect(part)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 4px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#242428')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                  {part}
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: isSelected ? '2px solid #F5C842' : `2px solid ${subtextColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#F5C842',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
