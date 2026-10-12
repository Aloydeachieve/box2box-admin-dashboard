'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

export type BoxDetailSubTab = 'Battery' | 'Reviews' | 'Code usage' | 'Reports' | 'Box activity';

interface BoxTabFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSubTab: BoxDetailSubTab;
  isLightMode?: boolean;
  onApplyFilters?: (filters: Record<string, any>) => void;
}

interface FilterTabConfig {
  id: string;
  label: string;
  options: string[];
  isMultiSelect?: boolean;
  defaultSelected: string[] | string;
}

const TAB_CONFIGS: Record<BoxDetailSubTab, FilterTabConfig[]> = {
  Battery: [
    {
      id: 'duration',
      label: 'Duration',
      options: ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'],
      isMultiSelect: false,
      defaultSelected: 'Last 7 days',
    },
  ],
  Reviews: [
    {
      id: 'cleanlinessRating',
      label: 'Cleanliness rating',
      options: ['All', '5.0', '4.0', '3.0', '2.0', '1.0'],
      isMultiSelect: false,
      defaultSelected: 'All',
    },
    {
      id: 'generalRating',
      label: 'General rating',
      options: ['All', '5.0', '4.0', '3.0', '2.0', '1.0'],
      isMultiSelect: false,
      defaultSelected: 'All',
    },
    {
      id: 'duration',
      label: 'Duration',
      options: ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'],
      isMultiSelect: false,
      defaultSelected: 'Last 7 days',
    },
  ],
  'Code usage': [
    {
      id: 'cabinet',
      label: 'Cabinet',
      options: ['All', 'A3', 'A4', 'A5'],
      isMultiSelect: true,
      defaultSelected: ['All', 'A3', 'A4', 'A5'],
    },
    {
      id: 'usage',
      label: 'Usage',
      options: ['All', 'Rider pickup', 'Customer pickup', 'Rider dropoff', 'Customer dropoff'],
      isMultiSelect: true,
      defaultSelected: ['All', 'Rider pickup', 'Customer pickup', 'Rider dropoff', 'Customer dropoff'],
    },
    {
      id: 'duration',
      label: 'Duration',
      options: ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'],
      isMultiSelect: false,
      defaultSelected: 'Last 7 days',
    },
  ],
  Reports: [
    {
      id: 'severity',
      label: 'Severity',
      options: ['All', 'High', 'Medium', 'Low'],
      isMultiSelect: true,
      defaultSelected: ['All', 'High', 'Medium', 'Low'],
    },
    {
      id: 'status',
      label: 'Status',
      options: ['All', 'Pending', 'In progress', 'Escalated', 'Resolved'],
      isMultiSelect: true,
      defaultSelected: ['All', 'Pending', 'In progress', 'Escalated', 'Resolved'],
    },
    {
      id: 'duration',
      label: 'Duration',
      options: ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'],
      isMultiSelect: false,
      defaultSelected: 'Last 7 days',
    },
  ],
  'Box activity': [
    {
      id: 'cabinet',
      label: 'Cabinet',
      options: ['All', 'A3', 'A4', 'A5'],
      isMultiSelect: true,
      defaultSelected: ['All', 'A3', 'A4', 'A5'],
    },
    {
      id: 'method',
      label: 'Method',
      options: ['All', 'Code access', 'Owner app', 'Admin override', 'Forced entry'],
      isMultiSelect: true,
      defaultSelected: ['All', 'Code access', 'Owner app', 'Admin override', 'Forced entry'],
    },
    {
      id: 'actor',
      label: 'Actor',
      options: ['All', 'Owner', 'Customer', 'Rider'],
      isMultiSelect: true,
      defaultSelected: ['All', 'Owner', 'Customer', 'Rider'],
    },
    {
      id: 'outcome',
      label: 'Outcome',
      options: ['All', 'Successful', 'Failed', 'Forced open'],
      isMultiSelect: true,
      defaultSelected: ['All', 'Successful', 'Failed', 'Forced open'],
    },
    {
      id: 'flag',
      label: 'Flag',
      options: ['All', 'Suspicious', 'Multiple failures', 'Forced access'],
      isMultiSelect: true,
      defaultSelected: ['All', 'Suspicious', 'Multiple failures', 'Forced access'],
    },
    {
      id: 'duration',
      label: 'Duration',
      options: ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'],
      isMultiSelect: false,
      defaultSelected: 'Last 7 days',
    },
  ],
};

export const BoxTabFilterModal: React.FC<BoxTabFilterModalProps> = ({
  isOpen,
  onClose,
  activeSubTab,
  isLightMode = false,
  onApplyFilters,
}) => {
  const configs = TAB_CONFIGS[activeSubTab] || TAB_CONFIGS.Battery;
  const [activeModalTabId, setActiveModalTabId] = useState<string>(configs[0]?.id || 'duration');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, any> = {};
      configs.forEach((tab) => {
        initial[tab.id] = tab.defaultSelected;
      });
      setFilterValues(initial);
      setActiveModalTabId(configs[0]?.id || 'duration');
    }
  }, [isOpen, activeSubTab]);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const modalBg = isLightMode ? '#FFFFFF' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  const currentTabConfig = configs.find((t) => t.id === activeModalTabId) || configs[0];

  const handleToggleMulti = (opt: string, allOptions: string[]) => {
    const currentList: string[] = (filterValues[currentTabConfig.id] as string[]) || [];

    if (opt === 'All') {
      if (currentList.includes('All')) {
        setFilterValues({ ...filterValues, [currentTabConfig.id]: [] });
      } else {
        setFilterValues({ ...filterValues, [currentTabConfig.id]: [...allOptions] });
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
    setFilterValues({ ...filterValues, [currentTabConfig.id]: next });
  };

  const handleSelectSingle = (opt: string) => {
    setFilterValues({ ...filterValues, [currentTabConfig.id]: opt });
  };

  const handleApply = () => {
    onApplyFilters?.(filterValues);
    onClose();
  };

  const handleDiscard = () => {
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
          maxWidth: configs.length > 3 ? '520px' : '460px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: isLightMode
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'scaleIn 0.2s ease-out',
        }}
      >
        {/* Modal Top Header with Title and Close X */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: textColor, margin: 0 }}>Filter</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Sub-Tabs Row (Only show tabs if more than 1 tab, otherwise show the single Headline) */}
        {configs.length > 1 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderBottom: `1px solid ${borderColor}`,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '2px',
            }}
          >
            {configs.map((tab) => {
              const isActive = activeModalTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveModalTabId(tab.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#F5C842' : subtextColor,
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    padding: '8px 0 10px 0',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.15s ease',
                  }}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-1px',
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
        ) : (
          <div style={{ fontSize: '14px', fontWeight: 600, color: textColor, borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>
            {configs[0].label}
          </div>
        )}

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '280px', overflowY: 'auto' }}>
          {currentTabConfig.options.map((opt) => {
            const isMulti = currentTabConfig.isMultiSelect;
            const isSelected = isMulti
              ? ((filterValues[currentTabConfig.id] as string[]) || []).includes(opt)
              : filterValues[currentTabConfig.id] === opt;

            return (
              <div
                key={opt}
                onClick={() => {
                  if (isMulti) {
                    handleToggleMulti(opt, currentTabConfig.options);
                  } else {
                    handleSelectSingle(opt);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>{opt}</span>

                {/* Checkbox / Radio Circle */}
                {isMulti ? (
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isSelected
                        ? '1px solid #F5C842'
                        : isLightMode
                        ? '1px solid #D1D5DB'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: isSelected ? '#F5C842' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                ) : (
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected
                        ? '1px solid #F5C842'
                        : isLightMode
                        ? '1px solid #D1D5DB'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#F5C842',
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer: Discard & Save / Apply Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
          <button
            onClick={handleDiscard}
            style={{
              flex: 1,
              height: '40px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              color: textColor,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            Discard
          </button>

          <button
            onClick={handleApply}
            style={{
              flex: 1,
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#F5C842',
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'opacity 0.15s',
            }}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
