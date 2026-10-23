'use client';

import React from 'react';
import { X } from 'lucide-react';

interface SelectMeasureModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  selectedMeasure: string;
  onSelectMeasure: (measure: string) => void;
}

export const SelectMeasureModal: React.FC<SelectMeasureModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  selectedMeasure,
  onSelectMeasure,
}) => {
  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const options = ['Number of actions', 'Total amount spent', 'Percentage level'];

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
          maxWidth: '360px',
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
            Select what to measure
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

        {/* Radio options with NO general button on the modal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {options.map((opt) => {
            const isSelected = selectedMeasure.toLowerCase() === opt.toLowerCase();
            return (
              <div
                key={opt}
                onClick={() => {
                  onSelectMeasure(opt);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                  {opt}
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: `1.5px solid ${isSelected ? yellowColor : subtextColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
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
          })}
        </div>
      </div>
    </div>
  );
};
