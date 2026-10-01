'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface BoxManagementFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters?: (filters: Record<string, any>) => void;
}

export const BoxManagementFilterModal: React.FC<BoxManagementFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'Status' | 'Capacity' | 'Battery health' | 'Rating' | 'Duration'>('Status');

  const [selectedStatus, setSelectedStatus] = useState<string[]>(['All', 'Online', 'Offline', 'Disabled']);
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>(['All']);
  const [selectedBattery, setSelectedBattery] = useState<string[]>(['All']);
  const [selectedRating, setSelectedRating] = useState<string[]>(['All']);
  const [selectedDuration, setSelectedDuration] = useState<string>('This week');

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C1E';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  const tabs: Array<'Status' | 'Capacity' | 'Battery health' | 'Rating' | 'Duration'> = [
    'Status',
    'Capacity',
    'Battery health',
    'Rating',
    'Duration',
  ];

  const statusOptions = ['All', 'Online', 'Offline', 'Disabled'];
  const capacityOptions = ['All', '1 Compartment', '4 Compartments', '8 Compartments', '12+ Compartments'];
  const batteryOptions = ['All', 'Excellent (90%+)', 'Good (70-89%)', 'Fair (50-69%)', 'Poor (30-49%)', 'Critical (<30%)'];
  const ratingOptions = ['All', '5 Stars', '4.5 Stars & above', '4.0 Stars & above', 'Below 4.0'];
  const durationOptions = ['Today', 'This week', 'This month', 'Last 30 days', 'Last 90 days'];

  const toggleCheckbox = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (item === 'All') {
      if (list.includes('All')) {
        setList([]);
      } else {
        setList(['All', ...statusOptions.filter(o => o !== 'All')]);
      }
      return;
    }

    let updated: string[];
    if (list.includes(item)) {
      updated = list.filter((i) => i !== item && i !== 'All');
    } else {
      updated = [...list, item];
    }
    setList(updated);
  };

  const handleSave = () => {
    onApplyFilters?.({
      status: selectedStatus,
      capacity: selectedCapacity,
      battery: selectedBattery,
      rating: selectedRating,
      duration: selectedDuration,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedStatus(['All', 'Online', 'Offline', 'Disabled']);
    setSelectedCapacity(['All']);
    setSelectedBattery(['All']);
    setSelectedRating(['All']);
    setSelectedDuration('This week');
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
          gap: '20px',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
              fontFamily: 'Rubik, var(--font-outfit), sans-serif',
            }}
          >
            Filter table
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 5 Tabs row matching Figma Image 5 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '8px',
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#F5C842' : subtextColor,
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  padding: '4px 0',
                  whiteSpace: 'nowrap',
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

        {/* Tab Content List */}
        <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeTab === 'Status' &&
            statusOptions.map((opt) => {
              const isChecked = selectedStatus.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleCheckbox(selectedStatus, setSelectedStatus, opt)}
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
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}

          {activeTab === 'Capacity' &&
            capacityOptions.map((opt) => {
              const isChecked = selectedCapacity.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleCheckbox(selectedCapacity, setSelectedCapacity, opt)}
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

          {activeTab === 'Battery health' &&
            batteryOptions.map((opt) => {
              const isChecked = selectedBattery.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleCheckbox(selectedBattery, setSelectedBattery, opt)}
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

          {activeTab === 'Rating' &&
            ratingOptions.map((opt) => {
              const isChecked = selectedRating.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleCheckbox(selectedRating, setSelectedRating, opt)}
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
              const isSelected = selectedDuration === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setSelectedDuration(opt)}
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
                      borderRadius: '50%',
                      border: isSelected ? '2px solid #F5C842' : `2px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Modal Buttons: Discard & Save matching Figma Image 5 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '10px' }}>
          <button
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#DFE5E8',
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '10px 0',
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
