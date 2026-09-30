'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export type SubTabType = 'bookings' | 'boxes' | 'wallet' | 'rewards' | 'referrals' | 'reports';

interface FilterConfig {
  tabs: string[];
  checkboxOptions: Record<string, string[]>;
}

const TAB_CONFIGS: Record<SubTabType, FilterConfig> = {
  bookings: {
    tabs: ['Status', 'Type', 'Duration'],
    checkboxOptions: {
      Status: ['All', 'In progress', 'Delivered', 'Storage'],
      Type: ['All', 'Delivery', 'Storage'],
    },
  },
  boxes: {
    tabs: ['Status', 'Battery health', 'Duration'],
    checkboxOptions: {
      Status: ['All', 'Active', 'Offline', 'Disabled'],
      'Battery health': ['All', 'Good', 'Low', 'Critical'],
    },
  },
  wallet: {
    tabs: ['Status', 'Type', 'Duration'],
    checkboxOptions: {
      Status: ['All', 'Pending', 'Successful', 'Failed'],
      Type: ['All', 'Earnings', 'Withdrawals'],
    },
  },
  rewards: {
    tabs: ['Type', 'Duration'],
    checkboxOptions: {
      Type: ['All', 'Earned', 'Spent', 'Badges'],
    },
  },
  referrals: {
    tabs: ['User type', 'Status', 'Duration'],
    checkboxOptions: {
      'User type': ['All', 'Customer', 'Rider', 'Box owner'],
      Status: ['All', 'Active', 'Inactive', 'High value'],
    },
  },
  reports: {
    tabs: ['Status', 'Category', 'Duration'],
    checkboxOptions: {
      Status: ['All', 'Resolved', 'In progress', 'Pending'],
      Category: ['All', 'Package Mishandled', 'Cleanliness', 'Theft', 'Payment'],
    },
  },
};

const DURATION_OPTIONS = ['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom'];

interface UserProfileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSubTab: SubTabType;
  isLightMode?: boolean;
  onApplyFilters?: (filters: { selections: Record<string, string[]>; duration: string }) => void;
}

export const UserProfileFilterModal: React.FC<UserProfileFilterModalProps> = ({
  isOpen,
  onClose,
  activeSubTab,
  isLightMode = false,
  onApplyFilters,
}) => {
  const config = TAB_CONFIGS[activeSubTab] || TAB_CONFIGS.bookings;
  const [activeTabName, setActiveTabName] = useState<string>(config.tabs[0]);
  const [selectedDuration, setSelectedDuration] = useState<string>('Today');

  // Maintain checked items for each category
  const [checkboxSelections, setCheckboxSelections] = useState<Record<string, string[]>>({});

  // Reset or initialize state when modal opens or activeSubTab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTabName(config.tabs[0]);
      // Default all checkboxes to checked matching Figma screenshots
      const initialSelections: Record<string, string[]> = {};
      Object.entries(config.checkboxOptions).forEach(([cat, opts]) => {
        initialSelections[cat] = [...opts];
      });
      setCheckboxSelections(initialSelections);
      setSelectedDuration('Today');
    }
  }, [isOpen, activeSubTab]);

  if (!isOpen) return null;

  const handleToggleCheckbox = (category: string, option: string) => {
    const current = checkboxSelections[category] || [];
    const allOptions = config.checkboxOptions[category] || [];

    if (option === 'All') {
      if (current.includes('All')) {
        // Uncheck all
        setCheckboxSelections((prev) => ({
          ...prev,
          [category]: [],
        }));
      } else {
        // Check all
        setCheckboxSelections((prev) => ({
          ...prev,
          [category]: [...allOptions],
        }));
      }
      return;
    }

    let updated: string[];
    if (current.includes(option)) {
      // Remove option and remove 'All'
      updated = current.filter((item) => item !== option && item !== 'All');
    } else {
      // Add option
      const newItems = [...current, option];
      // If all individual options are now selected, also add 'All'
      const nonAll = allOptions.filter((opt) => opt !== 'All');
      const allSelected = nonAll.every((opt) => newItems.includes(opt));
      updated = allSelected ? [...allOptions] : newItems;
    }

    setCheckboxSelections((prev) => ({
      ...prev,
      [category]: updated,
    }));
  };

  const handleDiscard = () => {
    // Reset to empty or close
    onClose();
  };

  const handleSave = () => {
    onApplyFilters?.({
      selections: checkboxSelections,
      duration: selectedDuration,
    });
    onClose();
  };

  const bgModal = isLightMode ? '#FFFFFF' : '#18181B';
  const borderModal = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.12)';
  const textTitle = isLightMode ? '#111827' : '#FFFFFF';
  const textMuted = isLightMode ? '#6B7280' : '#71717A';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '280px',
          backgroundColor: bgModal,
          borderRadius: '16px',
          border: borderModal,
          padding: '18px 20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Title + Close Icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 700,
              color: textTitle,
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            Filter table
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: textMuted,
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher: e.g. Status | Type | Duration matching Figma */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '10px',
          }}
        >
          {config.tabs.map((tab) => {
            const isActive = activeTabName === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTabName(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#F5C842' : textMuted,
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Content based on Active Tab */}
        <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeTabName === 'Duration' ? (
            /* Duration Radio Options */
            DURATION_OPTIONS.map((dur) => {
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
                    padding: '3px 0',
                  }}
                >
                  <span style={{ fontSize: '13px', color: isSelected ? textTitle : (isLightMode ? '#374151' : '#D1D1D6') }}>
                    {dur}
                  </span>

                  {/* Circular Radio Indicator matching Figma */}
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: isSelected ? '1.5px solid #F5C842' : '1px solid #71717A',
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
                          backgroundColor: '#F5C842',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* Checkbox Options for Status, Type, Battery health, User type, Category */
            (config.checkboxOptions[activeTabName] || []).map((opt) => {
              const isChecked = (checkboxSelections[activeTabName] || []).includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => handleToggleCheckbox(activeTabName, opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '3px 0',
                  }}
                >
                  <span style={{ fontSize: '13px', color: isChecked ? textTitle : (isLightMode ? '#374151' : '#D1D1D6') }}>
                    {opt}
                  </span>

                  {/* Yellow Checkbox matching Figma */}
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      backgroundColor: isChecked ? '#F5C842' : 'transparent',
                      border: isChecked ? 'none' : '1px solid #71717A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isChecked && <Check size={12} strokeWidth={3.5} color="#000000" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Action Buttons: Discard (White pill) & Save (Yellow pill) matching Figma */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              height: '34px',
              borderRadius: '20px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#FFFFFF',
              border: 'none',
              color: '#000000',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              height: '34px',
              borderRadius: '20px',
              backgroundColor: '#F5C842',
              border: 'none',
              color: '#000000',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
