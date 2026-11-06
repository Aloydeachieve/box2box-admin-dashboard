'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

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
  const cabinetOptions = ['All', 'A3', 'A4', 'A5'];
  const usageOptions = ['All', 'Pick up', 'Drop off'];
  const typeOptions = ['All', 'Storage', 'Delivery'];
  const durationOptions = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

  const [selectedCabinets, setSelectedCabinets] = useState<string[]>(['All', 'A3', 'A4', 'A5']);
  const [selectedUsage, setSelectedUsage] = useState<string[]>(['All', 'Pick up', 'Drop off']);
  const [selectedType, setSelectedType] = useState<string[]>(['All', 'Storage', 'Delivery']);
  const [selectedDuration, setSelectedDuration] = useState<string>('Last 7 days');

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

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

  const handleDiscard = () => {
    setSelectedCabinets(['All', 'A3', 'A4', 'A5']);
    setSelectedUsage(['All', 'Pick up', 'Drop off']);
    setSelectedType(['All', 'Storage', 'Delivery']);
    setSelectedDuration('Last 7 days');
    onClose();
  };

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
          maxWidth: '430px',
          height: '440px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
          fontFamily: 'var(--font-outfit), sans-serif',
          boxSizing: 'border-box',
        }}
      >
        {/* Standardized Header matching Type 1 & 4 Rules */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            Filter
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: `1px solid ${subtextColor}`,
              borderRadius: '50%',
              width: '26px',
              height: '26px',
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

        {/* 1px Horizontal Hairline Divider */}
        <div style={{ height: '1px', backgroundColor: borderColor, marginBottom: '14px' }} />

        {/* Clean Underline Text Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '8px',
            marginBottom: '16px',
          }}
        >
          {(['Cabinet', 'Usage', 'Type', 'Duration'] as const).map((tab) => {
            const isActive = activeModalTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveModalTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? yellowColor : subtextColor,
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
                      backgroundColor: yellowColor,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Scrollable Filter Body (Rule 8 Fixed Container & Scrollable Inner) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingRight: '4px',
          }}
        >
          {/* Tab 1: Cabinet Checkboxes */}
          {activeModalTab === 'Cabinet' &&
            cabinetOptions.map((opt) => {
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
                    padding: '10px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode
                      ? '#F9FAFB'
                      : 'rgba(255, 255, 255, 0.04)')
                  }
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                    {opt}
                  </span>

                  {/* Right-Aligned Square Checkbox (Rule 8) */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isChecked ? yellowColor : 'transparent',
                      border: isChecked ? 'none' : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}

          {/* Tab 2: Usage Checkboxes */}
          {activeModalTab === 'Usage' &&
            usageOptions.map((opt) => {
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
                    padding: '10px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode
                      ? '#F9FAFB'
                      : 'rgba(255, 255, 255, 0.04)')
                  }
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                    {opt}
                  </span>

                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isChecked ? yellowColor : 'transparent',
                      border: isChecked ? 'none' : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}

          {/* Tab 3: Type Checkboxes */}
          {activeModalTab === 'Type' &&
            typeOptions.map((opt) => {
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
                    padding: '10px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode
                      ? '#F9FAFB'
                      : 'rgba(255, 255, 255, 0.04)')
                  }
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                    {opt}
                  </span>

                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isChecked ? yellowColor : 'transparent',
                      border: isChecked ? 'none' : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}

          {/* Tab 4: Duration Radios */}
          {activeModalTab === 'Duration' &&
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
                    padding: '10px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode
                      ? '#F9FAFB'
                      : 'rgba(255, 255, 255, 0.04)')
                  }
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                    {opt}
                  </span>

                  {/* Right-Aligned Circular Radio Indicator */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected
                        ? `2px solid ${yellowColor}`
                        : isLightMode
                        ? '1.5px solid #D1D5DB'
                        : '1.5px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '9px',
                          height: '9px',
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

        {/* Standard Action Buttons Row (Rule 3 Type 1/4) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
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
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = isLightMode ? '#E5E7EB' : '#333338')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')
            }
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleApply}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>
        </div>
      </div>
    </div>
  );
};
