'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface PointUsageFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  mode: 'breakdown' | 'history';
  onApplyFilters: (filters: {
    apps: string[];
    fees: string[];
    duration?: string;
  }) => void;
  initialFilters?: {
    apps?: string[];
    fees?: string[];
    duration?: string;
  };
}

const APPS = ['Owner app', 'Customer app', 'Rider app'];
const FEES = ['Booking fee', 'Delivery fee', 'Deposit fee'];
const DURATIONS = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

export const PointUsageFilterModal: React.FC<PointUsageFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  mode,
  onApplyFilters,
  initialFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'app' | 'fee' | 'duration'>('app');
  const [selectedApps, setSelectedApps] = useState<string[]>(initialFilters?.apps || [...APPS]);
  const [selectedFees, setSelectedFees] = useState<string[]>(initialFilters?.fees || [...FEES]);
  const [selectedDuration, setSelectedDuration] = useState<string>(initialFilters?.duration || 'Last 30 days');

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.apps) setSelectedApps(initialFilters.apps);
      if (initialFilters.fees) setSelectedFees(initialFilters.fees);
      if (initialFilters.duration) setSelectedDuration(initialFilters.duration);
    }
    setActiveTab('app');
  }, [isOpen, initialFilters, mode]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  // Toggle helpers for App
  const isAllAppsSelected = APPS.every((app) => selectedApps.includes(app));
  const toggleAllApps = () => {
    if (isAllAppsSelected) setSelectedApps([]);
    else setSelectedApps([...APPS]);
  };
  const toggleApp = (app: string) => {
    if (selectedApps.includes(app)) setSelectedApps(selectedApps.filter((a) => a !== app));
    else setSelectedApps([...selectedApps, app]);
  };

  // Toggle helpers for Fee
  const isAllFeesSelected = FEES.every((fee) => selectedFees.includes(fee));
  const toggleAllFees = () => {
    if (isAllFeesSelected) setSelectedFees([]);
    else setSelectedFees([...FEES]);
  };
  const toggleFee = (fee: string) => {
    if (selectedFees.includes(fee)) setSelectedFees(selectedFees.filter((f) => f !== fee));
    else setSelectedFees([...selectedFees, fee]);
  };

  const handleSave = () => {
    onApplyFilters({
      apps: selectedApps.length > 0 ? selectedApps : [...APPS],
      fees: selectedFees.length > 0 ? selectedFees : [...FEES],
      duration: mode === 'history' ? selectedDuration : undefined,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedApps(initialFilters?.apps || [...APPS]);
    setSelectedFees(initialFilters?.fees || [...FEES]);
    if (mode === 'history') setSelectedDuration(initialFilters?.duration || 'Last 30 days');
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
          maxWidth: '380px',
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

        {/* Clean Underline Text Tabs (Rule 3 Type 4) */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('app')}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px 0 10px 0',
              fontSize: '13px',
              fontWeight: activeTab === 'app' ? 700 : 500,
              color: activeTab === 'app' ? yellowColor : subtextColor,
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            App
            {activeTab === 'app' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fee')}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px 0 10px 0',
              fontSize: '13px',
              fontWeight: activeTab === 'fee' ? 700 : 500,
              color: activeTab === 'fee' ? yellowColor : subtextColor,
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            Fee
            {activeTab === 'fee' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>

          {mode === 'history' && (
            <button
              type="button"
              onClick={() => setActiveTab('duration')}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 0 10px 0',
                fontSize: '13px',
                fontWeight: activeTab === 'duration' ? 700 : 500,
                color: activeTab === 'duration' ? yellowColor : subtextColor,
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.15s ease',
              }}
            >
              Duration
              {activeTab === 'duration' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: yellowColor,
                    borderRadius: '2px',
                  }}
                />
              )}
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '180px' }}>
          {/* TAB 1: App (Checkboxes) */}
          {activeTab === 'app' && (
            <>
              {/* All Toggle */}
              <div
                onClick={toggleAllApps}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 4px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isAllAppsSelected ? 600 : 500,
                    color: isAllAppsSelected ? textColor : subtextColor,
                  }}
                >
                  All
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllAppsSelected ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                    backgroundColor: isAllAppsSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllAppsSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {APPS.map((app) => {
                const isChecked = selectedApps.includes(app);
                return (
                  <div
                    key={app}
                    onClick={() => toggleApp(app)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isChecked ? 600 : 500,
                        color: isChecked ? textColor : subtextColor,
                      }}
                    >
                      {app}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
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

          {/* TAB 2: Fee (Checkboxes) */}
          {activeTab === 'fee' && (
            <>
              {/* All Toggle */}
              <div
                onClick={toggleAllFees}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 4px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isAllFeesSelected ? 600 : 500,
                    color: isAllFeesSelected ? textColor : subtextColor,
                  }}
                >
                  All
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllFeesSelected ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                    backgroundColor: isAllFeesSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllFeesSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {FEES.map((fee) => {
                const isChecked = selectedFees.includes(fee);
                return (
                  <div
                    key={fee}
                    onClick={() => toggleFee(fee)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isChecked ? 600 : 500,
                        color: isChecked ? textColor : subtextColor,
                      }}
                    >
                      {fee}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
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

          {/* TAB 3: Duration (Radio options for history) */}
          {activeTab === 'duration' && mode === 'history' && (
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
                      padding: '6px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isSelected ? 600 : 500,
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
            </>
          )}
        </div>

        {/* Action Buttons: Discard and Save with Box2BoxPulsingBadge */}
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
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              color: textColor,
              border: `1px solid ${borderColor}`,
              fontWeight: 600,
              fontSize: '13px',
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
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
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
