'use client';

import React, { useState } from 'react';
import { ChevronDown, Search, ArrowLeft } from 'lucide-react';

interface ActivityItem {
  id: string;
  code?: string;
  title: string;
  description: string;
  time: string;
  status?: string;
  statusType?: 'success' | 'warning' | 'pending' | 'danger' | 'info';
  category: 'Booking' | 'Wallet' | 'Rewards' | 'Referrals' | 'Reports';
  borderAccent?: string;
}

interface ActivityHistoryPageViewProps {
  onBack: () => void;
  onSelectActivity?: (id: string) => void;
  isLightMode?: boolean;
}

export const ActivityHistoryPageView: React.FC<ActivityHistoryPageViewProps> = ({
  onBack,
  onSelectActivity,
  isLightMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Booking' | 'Wallet' | 'Rewards' | 'Referrals' | 'Reports'>('All');
  const [duration, setDuration] = useState('Last 7 days');
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [tempDuration, setTempDuration] = useState('Last 7 days');

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

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
      borderAccent: '#F5C842',
    },
    {
      id: 'act-2',
      code: '#BK-123456',
      title: '#BK-123456',
      description: 'MyBox-123456 → MyBox123487',
      time: '13:25',
      category: 'Booking',
      borderAccent: '#F5C842',
    },
    {
      id: 'act-3',
      title: 'Cleanliness report',
      description: 'The cabinet was too dirty\nR-123465',
      time: '13:25',
      status: 'Resolved',
      statusType: 'success',
      category: 'Reports',
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
      borderAccent: '#71717A',
    },
    {
      id: 'act-6',
      title: 'Collected package',
      description: '#082638\nR-123465',
      time: '13:25',
      status: 'Pending',
      statusType: 'pending',
      category: 'Booking',
      borderAccent: '#71717A',
    },
    {
      id: 'act-7',
      title: 'Wallet deposit',
      description: 'Paystack\nR-123465',
      time: '13:25',
      status: 'Successful',
      statusType: 'success',
      category: 'Wallet',
      borderAccent: '#10B981',
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
      borderAccent: '#F5C842',
    },
    {
      id: 'act-9',
      code: '#BK-123456',
      title: '#BK-123456',
      description: 'MyBox-123456 → MyBox123487',
      time: '13:25',
      category: 'Booking',
      borderAccent: '#F5C842',
    },
    {
      id: 'act-10',
      title: 'Cleanliness report',
      description: 'The cabinet was too dirty\nR-123465',
      time: '13:25',
      status: 'Resolved',
      statusType: 'success',
      category: 'Reports',
      borderAccent: '#10B981',
    },
    {
      id: 'act-11',
      title: 'Theft report',
      description: 'My item is missing',
      time: '13:25',
      category: 'Reports',
      borderAccent: '#EF4444',
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
        return '#A1A1AA';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Rubik, var(--font-outfit), sans-serif',
      }}
    >
      {/* Sub-tabs & Duration Dropdown matching Figma Image 2 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: `1px solid ${borderColor}`,
          paddingBottom: '12px',
        }}
      >
        {/* Sub-tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', overflowX: 'auto' }}>
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
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease',
                }}
              >
                <span>{tab}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-13px',
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

        {/* Duration Dropdown Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setTempDuration(duration);
              setShowDurationModal(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#FFFFFF' : '#1A1A1E',
              border: `1px solid ${borderColor}`,
              color: textColor,
              fontSize: '13px',
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

      {/* Activity Timeline List (Grouped by Date, Image 2) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Date Group 1: June 03, 2025 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: textColor,
              letterSpacing: '-0.01em',
            }}
          >
            June 03, 2025
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filterList(activitiesDay1).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectActivity?.(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: cardBg,
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  borderLeft: `3px solid ${item.borderAccent || '#F5C842'}`,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s, transform 0.1s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1F1F24';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = cardBg;
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: textColor,
                      lineHeight: '20px',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: subtextColor,
                      lineHeight: '20px',
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
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#71717A' }}>{item.time}</span>
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
              fontSize: '14px',
              fontWeight: 600,
              color: textColor,
              letterSpacing: '-0.01em',
            }}
          >
            June 02, 2025
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filterList(activitiesDay2).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectActivity?.(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: cardBg,
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  borderLeft: `3px solid ${item.borderAccent || '#F5C842'}`,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s, transform 0.1s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1F1F24';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = cardBg;
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: textColor,
                      lineHeight: '20px',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: subtextColor,
                      lineHeight: '20px',
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
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#71717A' }}>{item.time}</span>
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

      {/* Duration Radio Modal Popup (Figma Image 2) */}
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
          }}
          onClick={() => setShowDurationModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '380px',
              backgroundColor: isLightMode ? '#FFFFFF' : '#18181B',
              borderRadius: '14px',
              border: `1px solid ${borderColor}`,
              padding: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: textColor,
                marginBottom: '16px',
              }}
            >
              Select Duration
            </div>

            {/* Radio Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
              {durationOptions.map((opt) => {
                const isSelected = tempDuration === opt;
                return (
                  <label
                    key={opt}
                    onClick={() => setTempDuration(opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: isSelected
                        ? isLightMode
                          ? 'rgba(245, 200, 66, 0.12)'
                          : 'rgba(245, 200, 66, 0.08)'
                        : 'transparent',
                    }}
                  >
                    {/* Custom Radio Circle */}
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid #F5C842' : `2px solid ${subtextColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            backgroundColor: '#F5C842',
                          }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isSelected ? 600 : 400,
                        color: textColor,
                      }}
                    >
                      {opt}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Action Buttons: Discard & Save */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowDurationModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
                  border: 'none',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                onClick={() => {
                  setDuration(tempDuration);
                  setShowDurationModal(false);
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#F5C842',
                  border: 'none',
                  color: '#000000',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
