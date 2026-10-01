'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface UnlockBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  boxId?: string;
  isLightMode?: boolean;
  onUnlock?: (selectedCabinets: string[]) => void;
}

export const UnlockBoxModal: React.FC<UnlockBoxModalProps> = ({
  isOpen,
  onClose,
  boxId = 'MyBox-123456',
  isLightMode = false,
  onUnlock,
}) => {
  const [selectedCabinets, setSelectedCabinets] = useState<string[]>(['All', 'A3', 'A4', 'A5']);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const modalBg = isLightMode ? '#FFFFFF' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  const cabinetOptions = ['All', 'A3', 'A4', 'A5'];

  const toggleOption = (opt: string) => {
    if (opt === 'All') {
      if (selectedCabinets.includes('All')) {
        setSelectedCabinets([]);
      } else {
        setSelectedCabinets(['All', 'A3', 'A4', 'A5']);
      }
      return;
    }

    let next: string[];
    if (selectedCabinets.includes(opt)) {
      next = selectedCabinets.filter((c) => c !== opt && c !== 'All');
    } else {
      next = [...selectedCabinets, opt];
      if (next.filter((c) => c !== 'All').length === cabinetOptions.length - 1) {
        next = ['All', ...next];
      }
    }
    setSelectedCabinets(next);
  };

  const handleUnlock = () => {
    onUnlock?.(selectedCabinets);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '400px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          fontFamily: 'Rubik, var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
              Unlock box
            </h3>
            <p style={{ fontSize: '13px', color: subtextColor, margin: '4px 0 0 0' }}>
              Select cabinets to unlock
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cabinet Checkbox Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '8px 0' }}>
          {cabinetOptions.map((opt) => {
            const isChecked = selectedCabinets.includes(opt);
            return (
              <div
                key={opt}
                onClick={() => toggleOption(opt)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#F9FAFB' : '#222226',
                  cursor: 'pointer',
                  border: isChecked ? '1px solid rgba(245, 200, 66, 0.3)' : `1px solid ${borderColor}`,
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>{opt}</span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    backgroundColor: isChecked ? '#F5C842' : 'transparent',
                    border: isChecked ? 'none' : `1.5px solid ${subtextColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#2A2A30',
              border: 'none',
              color: textColor,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleUnlock}
            style={{
              padding: '9px 22px',
              borderRadius: '8px',
              backgroundColor: '#F5C842',
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
};
