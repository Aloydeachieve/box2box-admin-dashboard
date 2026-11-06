'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

export interface SubscriptionsFilterState {
  statuses: string[];
  plans: string[];
  duration: string;
}

interface SubscriptionsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: SubscriptionsFilterState) => void;
  initialFilters?: SubscriptionsFilterState;
}

const STATUSES = ['Active', 'Inactive'];
const PLANS = ['7 days', '1 month', '3 months', '6 months', '12 months'];
const DURATIONS = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

export const SubscriptionsFilterModal: React.FC<SubscriptionsFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
  initialFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'plan' | 'duration'>('status');

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    initialFilters?.statuses || [...STATUSES]
  );
  const [selectedPlans, setSelectedPlans] = useState<string[]>(
    initialFilters?.plans || [...PLANS]
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    initialFilters?.duration || 'Today'
  );

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.statuses) setSelectedStatuses(initialFilters.statuses);
      if (initialFilters.plans) setSelectedPlans(initialFilters.plans);
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

  // Toggle Helpers for Plans
  const isAllPlansSelected = PLANS.every((p) => selectedPlans.includes(p));
  const toggleAllPlans = () => {
    if (isAllPlansSelected) setSelectedPlans([]);
    else setSelectedPlans([...PLANS]);
  };
  const togglePlan = (p: string) => {
    if (selectedPlans.includes(p)) {
      setSelectedPlans(selectedPlans.filter((item) => item !== p));
    } else {
      setSelectedPlans([...selectedPlans, p]);
    }
  };

  const handleSave = () => {
    onApplyFilters({
      statuses: selectedStatuses.length > 0 ? selectedStatuses : [...STATUSES],
      plans: selectedPlans.length > 0 ? selectedPlans : [...PLANS],
      duration: selectedDuration,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedStatuses(initialFilters?.statuses || [...STATUSES]);
    setSelectedPlans(initialFilters?.plans || [...PLANS]);
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

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '8px',
            marginBottom: '16px',
          }}
        >
          {(['status', 'plan', 'duration'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? yellowColor : subtextColor,
                  cursor: 'pointer',
                  position: 'relative',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-9px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: yellowColor,
                      borderRadius: '2px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content (Scrollable & Right-Aligned Controls) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            paddingRight: '4px',
            marginBottom: '20px',
          }}
        >
          {/* TAB 1: Status */}
          {activeTab === 'status' && (
            <>
              {/* All Toggle */}
              <div
                onClick={toggleAllStatuses}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  cursor: 'pointer',
                  padding: '2px 0',
                }}
              >
                <span style={{ fontSize: '13px', color: textColor }}>All</span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllStatusesSelected
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${subtextColor}`,
                    backgroundColor: isAllStatusesSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllStatusesSelected && <Check size={12} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {STATUSES.map((status) => {
                const isChecked = selectedStatuses.includes(status);
                return (
                  <div
                    key={status}
                    onClick={() => toggleStatus(status)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      cursor: 'pointer',
                      padding: '2px 0',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: textColor }}>{status}</span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked
                          ? `1px solid ${yellowColor}`
                          : `1px solid ${subtextColor}`,
                        backgroundColor: isChecked ? yellowColor : 'transparent',
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
            </>
          )}

          {/* TAB 2: Plan */}
          {activeTab === 'plan' && (
            <>
              {/* All Toggle */}
              <div
                onClick={toggleAllPlans}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  cursor: 'pointer',
                  padding: '2px 0',
                }}
              >
                <span style={{ fontSize: '13px', color: textColor }}>All</span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllPlansSelected
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${subtextColor}`,
                    backgroundColor: isAllPlansSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllPlansSelected && <Check size={12} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {PLANS.map((plan) => {
                const isChecked = selectedPlans.includes(plan);
                return (
                  <div
                    key={plan}
                    onClick={() => togglePlan(plan)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      cursor: 'pointer',
                      padding: '2px 0',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: textColor }}>{plan}</span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked
                          ? `1px solid ${yellowColor}`
                          : `1px solid ${subtextColor}`,
                        backgroundColor: isChecked ? yellowColor : 'transparent',
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
            </>
          )}

          {/* TAB 3: Duration (Radio Selection) */}
          {activeTab === 'duration' && (
            <>
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
                      width: '100%',
                      cursor: 'pointer',
                      padding: '2px 0',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: textColor }}>{dur}</span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected
                          ? `2px solid ${yellowColor}`
                          : `1px solid ${subtextColor}`,
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

        {/* Action Buttons: Full-width bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: 'auto',
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#26262B',
              border: 'none',
              color: textColor,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
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
