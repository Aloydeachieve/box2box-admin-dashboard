'use client';

import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface SelectUnlockRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  selectedRequirement: string;
  onSelectRequirement: (requirement: string) => void;
}

type TabKey = 'transactions' | 'referrals' | 'performance' | 'lifeCycle';

const TAB_DATA: Record<TabKey, { label: string; options: string[] }> = {
  transactions: {
    label: 'Transactions',
    options: [
      'Booking',
      'Delivery completion',
      'Deposit',
      'Withdrawal',
      'Box purchase',
      'Accessory purchase',
    ],
  },
  referrals: {
    label: 'Referrals',
    options: ['Refer user'],
  },
  performance: {
    label: 'Performance',
    options: [
      'Uptime',
      'Battery health',
      'Battery level',
      'Cleanliness',
      'Trust scores',
    ],
  },
  lifeCycle: {
    label: 'Life cycle',
    options: [
      'Create account',
      'Complete profile',
      'KYC verification',
      'Create wallet',
    ],
  },
};

export const SelectUnlockRequirementModal: React.FC<SelectUnlockRequirementModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  selectedRequirement,
  onSelectRequirement,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('transactions');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#27272A';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const currentOptions = TAB_DATA[activeTab].options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          maxWidth: '420px',
          backgroundColor: modalBg,
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
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
            Unlock requirement
          </h3>
          <button
            type="button"
            onClick={onClose}
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

        {/* Tabs Row ABOVE search input - Changes text color to yellow when active */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '8px',
            overflowX: 'auto',
          }}
        >
          {(Object.keys(TAB_DATA) as TabKey[]).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  color: isActive ? yellowColor : subtextColor,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  transition: 'color 0.15s ease',
                }}
              >
                <span>{TAB_DATA[key].label}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-9px',
                      left: '8px',
                      right: '8px',
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

        {/* Search input below tabs */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: inputBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '10px 38px 10px 14px',
              fontSize: '13px',
              color: textColor,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search
            size={16}
            color={subtextColor}
            style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
          />
        </div>

        {/* Radio Options List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          {currentOptions.length === 0 ? (
            <div style={{ fontSize: '13px', color: subtextColor, textAlign: 'center', padding: '16px 0' }}>
              No requirements found
            </div>
          ) : (
            currentOptions.map((opt) => {
              const isSelected = selectedRequirement.toLowerCase() === opt.toLowerCase();
              return (
                <div
                  key={opt}
                  onClick={() => {
                    onSelectRequirement(opt);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: isSelected
                      ? isLightMode ? '#FEF9C3' : 'rgba(245, 200, 66, 0.08)'
                      : 'transparent',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'background-color 0.12s',
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#27272A';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      color: isSelected ? yellowColor : textColor,
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  >
                    {opt}
                  </span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: `1.5px solid ${isSelected ? yellowColor : subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: yellowColor,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
