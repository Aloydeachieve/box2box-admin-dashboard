'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AccessoryUnitFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters?: (filters: {
    status: string[];
    duration: string[];
  }) => void;
}

export const AccessoryUnitFilterModal: React.FC<AccessoryUnitFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'Status' | 'Duration'>('Status');

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);
  const [selectedDurations, setSelectedDurations] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  // Options matching user specifications for Image 5:
  // "first one 'status' -all, available, assigned, faulty
  // then the second one is 'duration' - today, last 7 days, last 30 days, last 60 days"
  const statusOptions = ['All', 'Available', 'Assigned', 'Faulty'];
  const durationOptions = ['All', 'Today', 'Last 7 days', 'Last 30 days', 'Last 60 days'];

  const toggleOption = (
    list: string[],
    setList: (v: string[]) => void,
    item: string,
    allOptions: string[]
  ) => {
    if (item === 'All') {
      if (list.includes('All')) {
        setList([]);
      } else {
        setList(['All', ...allOptions.filter((o) => o !== 'All')]);
      }
      return;
    }

    let updated: string[];
    if (list.includes(item)) {
      updated = list.filter((s) => s !== item && s !== 'All');
    } else {
      updated = [...list, item];
      const nonAll = allOptions.filter((o) => o !== 'All');
      if (nonAll.every((o) => updated.includes(o))) {
        updated = ['All', ...nonAll];
      }
    }
    setList(updated);
  };

  const handleSave = () => {
    onApplyFilters?.({
      status: selectedStatuses,
      duration: selectedDurations,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedStatuses(['All']);
    setSelectedDurations(['All']);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isLightMode
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'scaleIn 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>Filter</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 2 Tab Headers: Status & Duration */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${borderColor}`, gap: '20px' }}>
          {(['Status', 'Duration'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 2px 10px 2px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#F5C842' : subtextColor,
                  borderBottom: isActive ? '2px solid #F5C842' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '170px' }}>
          {activeTab === 'Status' &&
            statusOptions.map((opt) => {
              const isChecked = selectedStatuses.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(selectedStatuses, setSelectedStatuses, opt, statusOptions)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>{opt}</span>
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

          {activeTab === 'Duration' &&
            durationOptions.map((opt) => {
              const isChecked = selectedDurations.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(selectedDurations, setSelectedDurations, opt, durationOptions)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>{opt}</span>
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

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '8px 22px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#F5C842',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
