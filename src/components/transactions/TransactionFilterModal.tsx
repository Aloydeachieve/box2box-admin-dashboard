'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

export interface TransactionFilterState {
  statuses: string[];
  types: string[];
  duration: string;
}

interface TransactionFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: TransactionFilterState) => void;
  initialFilters?: TransactionFilterState;
}

const STATUSES = ['In progress', 'Delivered', 'Stored'];
const TYPES = ['Delivery', 'Storage'];
const DURATIONS = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

export const TransactionFilterModal: React.FC<TransactionFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
  initialFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'type' | 'duration'>('status');

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    initialFilters?.statuses || [...STATUSES]
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialFilters?.types || [...TYPES]
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    initialFilters?.duration || 'Today'
  );

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.statuses) setSelectedStatuses(initialFilters.statuses);
      if (initialFilters.types) setSelectedTypes(initialFilters.types);
      if (initialFilters.duration) setSelectedDuration(initialFilters.duration);
    }
    setActiveTab('status');
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  // Toggle Helpers for Statuses
  const isAllStatusesSelected = STATUSES.every((s) => selectedStatuses.includes(s));
  const toggleAllStatuses = () => {
    if (isAllStatusesSelected) setSelectedStatuses([]);
    else setSelectedStatuses([...STATUSES]);
  };
  const toggleStatus = (s: string) => {
    if (selectedStatuses.includes(s)) {
      setSelectedStatuses(selectedStatuses.filter((item) => item !== s));
    } else {
      setSelectedStatuses([...selectedStatuses, s]);
    }
  };

  // Toggle Helpers for Types
  const isAllTypesSelected = TYPES.every((t) => selectedTypes.includes(t));
  const toggleAllTypes = () => {
    if (isAllTypesSelected) setSelectedTypes([]);
    else setSelectedTypes([...TYPES]);
  };
  const toggleType = (t: string) => {
    if (selectedTypes.includes(t)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== t));
    } else {
      setSelectedTypes([...selectedTypes, t]);
    }
  };

  const handleSave = () => {
    onApplyFilters({
      statuses: selectedStatuses.length > 0 ? selectedStatuses : [...STATUSES],
      types: selectedTypes.length > 0 ? selectedTypes : [...TYPES],
      duration: selectedDuration,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedStatuses(initialFilters?.statuses || [...STATUSES]);
    setSelectedTypes(initialFilters?.types || [...TYPES]);
    setSelectedDuration(initialFilters?.duration || 'Today');
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
        zIndex: 95,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: subtextColor,
              transition: 'all 0.15s ease',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Clean Underline Text Tabs (Rule 3 Type 4: Never wrapped in pill card background) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '2px',
          }}
        >
          {(['status', 'type', 'duration'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const label = tab === 'status' ? 'Status' : tab === 'type' ? 'Type' : 'Duration';
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 0',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? yellowColor : subtextColor,
                  cursor: 'pointer',
                  position: 'relative',
                  textTransform: 'capitalize',
                  transition: 'color 0.15s ease',
                }}
              >
                <span>{label}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: yellowColor,
                      borderRadius: '2px 2px 0 0',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Status List */}
        {activeTab === 'status' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              minHeight: '190px',
            }}
          >
            {/* All toggle */}
            <div
              onClick={toggleAllStatuses}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: isAllStatusesSelected ? 'none' : `1.5px solid ${subtextColor}`,
                  backgroundColor: isAllStatusesSelected ? yellowColor : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                {isAllStatusesSelected && <Check size={13} color="#000000" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: '13.5px', fontWeight: 500, color: textColor }}>All</span>
            </div>

            {/* Individual statuses */}
            {STATUSES.map((status) => {
              const isChecked = selectedStatuses.includes(status);
              return (
                <div
                  key={status}
                  onClick={() => toggleStatus(status)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '4px 0',
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isChecked ? 'none' : `1.5px solid ${subtextColor}`,
                      backgroundColor: isChecked ? yellowColor : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                  </div>
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: isChecked ? 600 : 400,
                      color: isChecked ? textColor : subtextColor,
                    }}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Type List */}
        {activeTab === 'type' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              minHeight: '190px',
            }}
          >
            {/* All toggle */}
            <div
              onClick={toggleAllTypes}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: isAllTypesSelected ? 'none' : `1.5px solid ${subtextColor}`,
                  backgroundColor: isAllTypesSelected ? yellowColor : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                {isAllTypesSelected && <Check size={13} color="#000000" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: '13.5px', fontWeight: 500, color: textColor }}>All</span>
            </div>

            {/* Individual types */}
            {TYPES.map((type) => {
              const isChecked = selectedTypes.includes(type);
              return (
                <div
                  key={type}
                  onClick={() => toggleType(type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '4px 0',
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isChecked ? 'none' : `1.5px solid ${subtextColor}`,
                      backgroundColor: isChecked ? yellowColor : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                  </div>
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: isChecked ? 600 : 400,
                      color: isChecked ? textColor : subtextColor,
                    }}
                  >
                    {type}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Duration Radio List */}
        {activeTab === 'duration' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              minHeight: '190px',
            }}
          >
            {DURATIONS.map((dur) => {
              const isSelected = selectedDuration === dur;
              return (
                <div
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '4px 0',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? textColor : subtextColor,
                    }}
                  >
                    {dur}
                  </span>

                  {/* Circular Radio */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
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
        )}

        {/* Action Buttons: Discard + Save with Box2BoxPulsingBadge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              height: '42px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              color: textColor,
              fontWeight: 600,
              fontSize: '13px',
              border: `1px solid ${borderColor}`,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              height: '42px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>
        </div>
      </div>
    </div>
  );
};
