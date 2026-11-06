'use client';

import React, { useState } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface ActivityItem {
  id: string;
  code?: string;
  title: string;
  description: string;
  time: string;
  status?: string;
  statusType?: 'success' | 'warning' | 'pending' | 'danger' | 'info';
  category: 'Booking' | 'Wallet' | 'Rewards' | 'Referrals' | 'Reports';
  hasLeftBorder?: boolean;
  borderAccent?: string;
}

interface ActivityHistoryPageViewProps {
  onBack?: () => void;
  onSelectActivity?: (id: string) => void;
  isLightMode?: boolean;
}

export const ActivityHistoryPageView: React.FC<ActivityHistoryPageViewProps> = ({
  onBack,
  onSelectActivity,
  isLightMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Booking' | 'Wallet' | 'Rewards' | 'Referrals' | 'Reports'>('All');
  const [duration, setDuration] = useState('Duration');
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [selectedDurations, setSelectedDurations] = useState<string[]>(['Last 7 days']);

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  const tabs: Array<'All' | 'Booking' | 'Wallet' | 'Rewards' | 'Referrals' | 'Reports'> = [
    'All',
    'Booking',
    'Wallet',
    'Rewards',
    'Referrals',
    'Reports',
  ];

  const durationOptions = [
    'Today',
    'Last 7 days',
    'Last 30 days',
    'Last 60 days',
    'Custom',
  ];

  const activitiesDay1: ActivityItem[] = [
    {
      id: 'act-1',
      code: '#BK-123456',
      title: '#BK-123456',
      description: 'Nearing drop off',
      time: '13:25',
      category: 'Booking',
      hasLeftBorder: false,
    },
    {
      id: 'act-2',
      code: '#BK-123456',
      title: '#BK-123456',
      description: 'MyBox-123456 → MyBox123487',
      time: '13:25',
      category: 'Booking',
      hasLeftBorder: false,
    },
    {
      id: 'act-3',
      title: 'Cleanliness report',
      description: 'The cabinet was too dirty\nR-123465',
      time: '13:25',
      status: 'Resolved',
      statusType: 'success',
      category: 'Reports',
      hasLeftBorder: true,
      borderAccent: '#10B981',
    },
    {
      id: 'act-4',
      title: 'Theft report',
      description: 'My item is missing\nR-123465',
      time: '13:25',
      status: 'In progress',
      statusType: 'warning',
      category: 'Reports',
      hasLeftBorder: true,
      borderAccent: '#EF4444',
    },
    {
      id: 'act-5',
      title: 'Booked partition',
      description: '#012356\nR-123465',
      time: '13:25',
      status: 'Pending',
      statusType: 'pending',
      category: 'Booking',
      hasLeftBorder: false,
    },
    {
      id: 'act-6',
      title: 'Collected package',
      description: '#082638\nR-123465',
      time: '13:25',
      status: 'Pending',
      statusType: 'pending',
      category: 'Booking',
      hasLeftBorder: false,
    },
    {
      id: 'act-7',
      title: 'Wallet deposit',
      description: 'Paystack\nR-123465',
      time: '13:25',
      status: 'Successful',
      statusType: 'success',
      category: 'Wallet',
      hasLeftBorder: false,
    },
  ];

  const activitiesDay2: ActivityItem[] = [
    {
      id: 'act-8',
      code: '#BK-123456',
      title: '#BK-123456',
      description: 'Nearing drop off',
      time: '13:25',
      category: 'Booking',
      hasLeftBorder: false,
    },
    {
      id: 'act-9',
      code: '#BK-123456',
      title: '#BK-123456',
      description: 'MyBox-123456 → MyBox123487',
      time: '13:25',
      category: 'Booking',
      hasLeftBorder: false,
    },
    {
      id: 'act-10',
      title: 'Cleanliness report',
      description: 'The cabinet was too dirty\nR-123465',
      time: '13:25',
      status: 'Resolved',
      statusType: 'success',
      category: 'Reports',
      hasLeftBorder: true,
      borderAccent: '#10B981',
    },
    {
      id: 'act-11',
      title: 'Theft report',
      description: 'My item is missing\nR-123465',
      time: '13:25',
      status: 'In progress',
      statusType: 'warning',
      category: 'Reports',
      hasLeftBorder: true,
      borderAccent: '#EF4444',
    },
    {
      id: 'act-12',
      title: 'Booked partition',
      description: '#012356\nR-123465',
      time: '13:25',
      status: 'Pending',
      statusType: 'pending',
      category: 'Booking',
      hasLeftBorder: false,
    },
  ];

  const filterList = (list: ActivityItem[]) => {
    if (activeTab === 'All') return list;
    return list.filter((item) => item.category === activeTab);
  };

  const getStatusColor = (type?: string) => {
    switch (type) {
      case 'success':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'danger':
        return '#EF4444';
      case 'pending':
      default:
        return '#71717A';
    }
  };

  // Checkbox handling for Filtered duration Modal (Type 1 standard)
  const isAllSelected = durationOptions.every((opt) => selectedDurations.includes(opt));

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedDurations([]);
    } else {
      setSelectedDurations([...durationOptions]);
    }
  };

  const toggleDuration = (opt: string) => {
    if (selectedDurations.includes(opt)) {
      setSelectedDurations(selectedDurations.filter((d) => d !== opt));
    } else {
      setSelectedDurations([...selectedDurations, opt]);
    }
  };

  const handleSaveDuration = () => {
    if (selectedDurations.length === durationOptions.length || selectedDurations.length === 0) {
      setDuration('All');
    } else if (selectedDurations.length === 1) {
      setDuration(selectedDurations[0]);
    } else {
      setDuration(selectedDurations.join(', '));
    }
    setShowDurationModal(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingBottom: '48px',
        fontFamily: 'var(--font-outfit), sans-serif',
      }}
    >
      {/* Centered Activity History Container Card matching Figma Image 4 */}
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          margin: '0 auto',
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
        }}
      >
        {/* Header inside Container: Clean Text Tabs on Left & Duration Dropdown Button on Right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '26px',
          }}
        >
          {/* Sub-tabs: clean text tabs, active turns yellow, cleanly spaced with NO border line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', overflowX: 'auto' }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? yellowColor : subtextColor,
                    fontSize: '13.5px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    padding: '4px 0',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Duration Button matching Figma Image 4 */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => {
                setSelectedDurations(duration === 'Duration' || duration === 'All' ? ['Last 7 days'] : [duration]);
                setShowDurationModal(true);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                border: `1px solid ${borderColor}`,
                color: textColor,
                fontSize: '12.5px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
            >
              <span>{duration}</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>
          </div>
        </div>

        {/* Activity Timeline List (Grouped by Date, cleanly spaced matching Figma Image 4) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          {/* Date Group 1: June 03, 2025 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                fontSize: '13.5px',
                fontWeight: 700,
                color: textColor,
              }}
            >
              June 03, 2025
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filterList(activitiesDay1).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectActivity?.(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '2px 0',
                    paddingLeft: item.hasLeftBorder ? '10px' : '0px',
                    backgroundColor: 'transparent',
                    borderLeft: item.hasLeftBorder ? `2.5px solid ${item.borderAccent || '#10B981'}` : 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.15s',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: textColor,
                        lineHeight: '18px',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: '11.5px',
                        color: subtextColor,
                        lineHeight: '18px',
                        whiteSpace: 'pre-line',
                        marginTop: '2px',
                      }}
                    >
                      {item.description}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '3px',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#71717A' }}>{item.time}</span>
                    {item.status && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: getStatusColor(item.statusType),
                        }}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Group 2: June 02, 2025 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                fontSize: '13.5px',
                fontWeight: 700,
                color: textColor,
              }}
            >
              June 02, 2025
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filterList(activitiesDay2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectActivity?.(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '2px 0',
                    paddingLeft: item.hasLeftBorder ? '10px' : '0px',
                    backgroundColor: 'transparent',
                    borderLeft: item.hasLeftBorder ? `2.5px solid ${item.borderAccent || '#10B981'}` : 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.15s',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: textColor,
                        lineHeight: '18px',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: '11.5px',
                        color: subtextColor,
                        lineHeight: '18px',
                        whiteSpace: 'pre-line',
                        marginTop: '2px',
                      }}
                    >
                      {item.description}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '3px',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#71717A' }}>{item.time}</span>
                    {item.status && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: getStatusColor(item.statusType),
                        }}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Standard Type 1 Duration Filter Modal (Filtered duration) */}
      {showDurationModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowDurationModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            {/* Header: Title & Circular (X) close button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
                Filtered duration
              </h3>
              <button
                type="button"
                onClick={() => setShowDurationModal(false)}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
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

            {/* Subtle 1px horizontal hairline divider under header */}
            <div style={{ width: '100%', height: '1px', backgroundColor: borderColor }} />

            {/* Checkboxes list: All toggle + options (Right-aligned indicators) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* 'All' option */}
              <div
                onClick={toggleAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                  All
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllSelected
                      ? `1px solid ${yellowColor}`
                      : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
                    backgroundColor: isAllSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {/* Individual Duration options */}
              {durationOptions.map((opt) => {
                const isChecked = selectedDurations.includes(opt);
                return (
                  <div
                    key={opt}
                    onClick={() => toggleDuration(opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                      {opt}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked
                          ? `1px solid ${yellowColor}`
                          : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
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
            </div>

            {/* Action buttons: Full-width bottom row with neutral dark Discard button and vibrant yellow Save button with Box2BoxPulsingBadge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowDurationModal(false)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#E5E7EB' : '#2C2C30',
                  border: 'none',
                  color: isLightMode ? '#111827' : '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
              >
                Discard
              </button>

              <button
                type="button"
                onClick={handleSaveDuration}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                  transition: 'opacity 0.15s ease',
                }}
              >
                <span>Save</span>
                <Box2BoxPulsingBadge size={14} inverted={false} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
