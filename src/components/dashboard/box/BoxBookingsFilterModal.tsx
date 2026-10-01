'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface BoxBookingsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters?: (filters: {
    cabinets: string[];
    usage: string[];
    type: string[];
    duration: string;
  }) => void;
}

export const BoxBookingsFilterModal: React.FC<BoxBookingsFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'Cabinet' | 'Usage' | 'Type' | 'Duration'>('Cabinet');

  // Filter state
  const [selectedCabinets, setSelectedCabinets] = useState<string[]>(['All', 'A3', 'A4', 'A5']);
  const [selectedUsage, setSelectedUsage] = useState<string[]>(['All', 'Pick up', 'Drop off']);
  const [selectedType, setSelectedType] = useState<string[]>(['All', 'Storage', 'Delivery']);
  const [selectedDuration, setSelectedDuration] = useState<string>('Last 7 days');

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const modalBg = isLightMode ? '#FFFFFF' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  const cabinetOptions = ['All', 'A3', 'A4', 'A5'];
  const usageOptions = ['All', 'Pick up', 'Drop off'];
  const typeOptions = ['All', 'Storage', 'Delivery'];
  const durationOptions = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

  const toggleArrayOption = (
    currentList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    allOptions: string[],
    opt: string
  ) => {
    if (opt === 'All') {
      if (currentList.includes('All')) {
        setList([]);
      } else {
        setList([...allOptions]);
      }
      return;
    }

    let next: string[];
    if (currentList.includes(opt)) {
      next = currentList.filter((item) => item !== opt && item !== 'All');
    } else {
      next = [...currentList, opt];
      const nonAllCount = allOptions.filter((o) => o !== 'All').length;
      if (next.filter((o) => o !== 'All').length === nonAllCount) {
        next = ['All', ...next];
      }
    }
    setList(next);
  };

  const handleApply = () => {
    onApplyFilters?.({
      cabinets: selectedCabinets,
      usage: selectedUsage,
      type: selectedType,
      duration: selectedDuration,
    });
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
          maxWidth: '460px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          fontFamily: 'Rubik, var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
              Filter Bookings
            </h3>
            <p style={{ fontSize: '12px', color: subtextColor, margin: '4px 0 0 0' }}>
              Refine bookings by cabinet, usage, type, and date range
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

        {/* 4 Tabs: Cabinet, Usage, Type, Duration */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '8px',
          }}
        >
          {(['Cabinet', 'Usage', 'Type', 'Duration'] as const).map((tab) => {
            const isActive = activeModalTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveModalTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#F5C842' : subtextColor,
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'color 0.15s ease',
                }}
              >
                <span>{tab}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-9px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#F5C842',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Cabinet (All, A3, A4, A5) */}
        {activeModalTab === 'Cabinet' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '180px' }}>
            <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>
              Select cabinet units:
            </div>
            {cabinetOptions.map((opt) => {
              const isChecked = selectedCabinets.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() =>
                    toggleArrayOption(selectedCabinets, setSelectedCabinets, cabinetOptions, opt)
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: isLightMode ? '#F9FAFB' : '#222226',
                    cursor: 'pointer',
                    border: isChecked ? '1px solid rgba(245, 200, 66, 0.3)' : `1px solid ${borderColor}`,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{opt}</span>
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
        )}

        {/* Tab 2: Usage (All, Pick up, Drop off) */}
        {activeModalTab === 'Usage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '180px' }}>
            <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>
              Select usage flow:
            </div>
            {usageOptions.map((opt) => {
              const isChecked = selectedUsage.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() =>
                    toggleArrayOption(selectedUsage, setSelectedUsage, usageOptions, opt)
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: isLightMode ? '#F9FAFB' : '#222226',
                    cursor: 'pointer',
                    border: isChecked ? '1px solid rgba(245, 200, 66, 0.3)' : `1px solid ${borderColor}`,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{opt}</span>
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
        )}

        {/* Tab 3: Type (All, Storage, Delivery) */}
        {activeModalTab === 'Type' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '180px' }}>
            <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>
              Select booking type:
            </div>
            {typeOptions.map((opt) => {
              const isChecked = selectedType.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() =>
                    toggleArrayOption(selectedType, setSelectedType, typeOptions, opt)
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: isLightMode ? '#F9FAFB' : '#222226',
                    cursor: 'pointer',
                    border: isChecked ? '1px solid rgba(245, 200, 66, 0.3)' : `1px solid ${borderColor}`,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{opt}</span>
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
        )}

        {/* Tab 4: Duration (Today, Last 7 days, Last 30 days, Last 60 days, Custom) */}
        {activeModalTab === 'Duration' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '180px' }}>
            <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>
              Select time duration:
            </div>
            {durationOptions.map((opt) => {
              const isSelected = selectedDuration === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setSelectedDuration(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: isLightMode ? '#F9FAFB' : '#222226',
                    cursor: 'pointer',
                    border: isSelected ? '1px solid rgba(245, 200, 66, 0.3)' : `1px solid ${borderColor}`,
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{opt}</span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#F5C842' : 'transparent',
                      border: isSelected ? 'none' : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }} />}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#2A2A30',
              border: 'none',
              color: textColor,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: '8px',
              backgroundColor: '#F5C842',
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Apply filter
          </button>
        </div>
      </div>
    </div>
  );
};
