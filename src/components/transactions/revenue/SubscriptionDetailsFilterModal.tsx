'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

export interface SubscriptionDetailsFilterState {
  statuses: string[];
  duration: string;
}

interface SubscriptionDetailsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: SubscriptionDetailsFilterState) => void;
  initialFilters?: SubscriptionDetailsFilterState;
}

const STATUSES = ['Active', 'Expired'];
const DURATIONS = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

export const SubscriptionDetailsFilterModal: React.FC<SubscriptionDetailsFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
  initialFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'duration'>('status');

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    initialFilters?.statuses || [...STATUSES]
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    initialFilters?.duration || 'Today'
  );

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.statuses) setSelectedStatuses(initialFilters.statuses);
      if (initialFilters.duration) setSelectedDuration(initialFilters.duration);
    }
    setActiveTab('status');
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
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

  const handleSave = () => {
    onApplyFilters({
      statuses: selectedStatuses.length > 0 ? selectedStatuses : [...STATUSES],
      duration: selectedDuration,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedStatuses(initialFilters?.statuses || [...STATUSES]);
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
        zIndex: 999,
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
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
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

        {/* Hairline Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: borderColor,
            marginBottom: '16px',
          }}
        />

        {/* Tabs - Type 4 clean underline tabs */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            borderBottom: `1px solid ${borderColor}`,
            marginBottom: '16px',
          }}
        >
          {(['status', 'duration'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0 0 10px 0',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? yellowColor : subtextColor,
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {label}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
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

        {/* Scrollable Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            paddingRight: '4px',
          }}
        >
          {activeTab === 'status' && (
            <>
              {/* All Toggle */}
              <div
                onClick={toggleAllStatuses}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '13.5px', color: textColor }}>All</span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: `1.5px solid ${isAllStatusesSelected ? yellowColor : subtextColor}`,
                    backgroundColor: isAllStatusesSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllStatusesSelected && <Check size={12} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {STATUSES.map((status) => {
                const checked = selectedStatuses.includes(status);
                return (
                  <div
                    key={status}
                    onClick={() => toggleStatus(status)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <span style={{ fontSize: '13.5px', color: textColor }}>{status}</span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: `1.5px solid ${checked ? yellowColor : subtextColor}`,
                        backgroundColor: checked ? yellowColor : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {checked && <Check size={12} color="#000000" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {activeTab === 'duration' && (
            <>
              {DURATIONS.map((dur) => {
                const active = selectedDuration === dur;
                return (
                  <div
                    key={dur}
                    onClick={() => setSelectedDuration(dur)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <span style={{ fontSize: '13.5px', color: textColor }}>{dur}</span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: `1.5px solid ${active ? yellowColor : subtextColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {active && (
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
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: '13.5px',
              fontWeight: 600,
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
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: yellowColor,
              color: '#000000',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
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
