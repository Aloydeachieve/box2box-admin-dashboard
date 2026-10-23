'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

export interface WithdrawalsFilterState {
  statuses: string[];
  userTypes: string[];
  duration: string;
}

interface WithdrawalsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: WithdrawalsFilterState) => void;
  initialFilters?: WithdrawalsFilterState;
}

const STATUSES = ['Pending', 'Successful', 'Failed'];
const USER_TYPES = ['Box owner', 'Rider', 'Customer'];
const DURATIONS = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

export const WithdrawalsFilterModal: React.FC<WithdrawalsFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
  initialFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'userType' | 'duration'>('status');

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    initialFilters?.statuses || [...STATUSES]
  );
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>(
    initialFilters?.userTypes || [...USER_TYPES]
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    initialFilters?.duration || 'Today'
  );

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.statuses) setSelectedStatuses(initialFilters.statuses);
      if (initialFilters.userTypes) setSelectedUserTypes(initialFilters.userTypes);
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

  // Toggle Helpers for User Types
  const isAllUserTypesSelected = USER_TYPES.every((u) => selectedUserTypes.includes(u));
  const toggleAllUserTypes = () => {
    if (isAllUserTypesSelected) setSelectedUserTypes([]);
    else setSelectedUserTypes([...USER_TYPES]);
  };
  const toggleUserType = (u: string) => {
    if (selectedUserTypes.includes(u)) {
      setSelectedUserTypes(selectedUserTypes.filter((item) => item !== u));
    } else {
      setSelectedUserTypes([...selectedUserTypes, u]);
    }
  };

  const handleSave = () => {
    onApplyFilters({
      statuses: selectedStatuses.length > 0 ? selectedStatuses : [...STATUSES],
      userTypes: selectedUserTypes.length > 0 ? selectedUserTypes : [...USER_TYPES],
      duration: selectedDuration,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedStatuses(initialFilters?.statuses || [...STATUSES]);
    setSelectedUserTypes(initialFilters?.userTypes || [...USER_TYPES]);
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
          {[
            { id: 'status', label: 'Status' },
            { id: 'userType', label: 'User type' },
            { id: 'duration', label: 'Duration' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? yellowColor : subtextColor,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-9px',
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

        {/* Fixed Scrollable Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingRight: '4px',
          }}
        >
          {/* Tab 1: Status List */}
          {activeTab === 'status' && (
            <>
              {/* All toggle */}
              <div
                onClick={toggleAllStatuses}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '6px 0',
                }}
              >
                <span style={{ fontSize: '13.5px', fontWeight: 500, color: textColor }}>All</span>
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
                      cursor: 'pointer',
                      padding: '6px 0',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13.5px',
                        fontWeight: isChecked ? 600 : 400,
                        color: isChecked ? textColor : subtextColor,
                      }}
                    >
                      {status}
                    </span>
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
                  </div>
                );
              })}
            </>
          )}

          {/* Tab 2: User type List */}
          {activeTab === 'userType' && (
            <>
              {/* All toggle */}
              <div
                onClick={toggleAllUserTypes}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '6px 0',
                }}
              >
                <span style={{ fontSize: '13.5px', fontWeight: 500, color: textColor }}>All</span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllUserTypesSelected ? 'none' : `1.5px solid ${subtextColor}`,
                    backgroundColor: isAllUserTypesSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllUserTypesSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {USER_TYPES.map((uType) => {
                const isChecked = selectedUserTypes.includes(uType);
                return (
                  <div
                    key={uType}
                    onClick={() => toggleUserType(uType)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      padding: '6px 0',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13.5px',
                        fontWeight: isChecked ? 600 : 400,
                        color: isChecked ? textColor : subtextColor,
                      }}
                    >
                      {uType}
                    </span>
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
                  </div>
                );
              })}
            </>
          )}

          {/* Tab 3: Duration Radio List */}
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
                      cursor: 'pointer',
                      padding: '6px 0',
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
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? yellowColor : subtextColor}`,
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
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '10px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              color: textColor,
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
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
              borderRadius: '10px',
              border: 'none',
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
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
