'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface OrdersFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: {
    paymentStatus: string[];
    paymentStructure: string[];
    fulfillment: string[];
    duration: string;
  }) => void;
}

export const OrdersFilterModal: React.FC<OrdersFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'paymentStatus' | 'paymentStructure' | 'fulfillment' | 'duration'>(
    'paymentStatus'
  );

  // Selected filters
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string[]>(['All']);
  const [selectedPaymentStructure, setSelectedPaymentStructure] = useState<string[]>(['All']);
  const [selectedFulfillment, setSelectedFulfillment] = useState<string[]>(['All']);
  const [selectedDuration, setSelectedDuration] = useState<string>('All');

  if (!isOpen) return null;

  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // 4 Tabs options matching Figma Image 3
  const paymentStatusOptions = ['All', 'Complete', 'Refunded', 'Instalment due', 'Pending'];
  const paymentStructureOptions = ['All', 'Full payment', 'Instalment payment'];
  const fulfillmentOptions = ['All', 'Partially fulfilled', 'Cancelled', 'Pending', 'Delivered'];
  const durationOptions = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

  const currentOptions =
    activeTab === 'paymentStatus'
      ? paymentStatusOptions
      : activeTab === 'paymentStructure'
      ? paymentStructureOptions
      : activeTab === 'fulfillment'
      ? fulfillmentOptions
      : durationOptions;

  const handleToggle = (val: string) => {
    if (activeTab === 'paymentStatus') {
      if (val === 'All') {
        setSelectedPaymentStatus(['All']);
        return;
      }
      const filtered = selectedPaymentStatus.filter((c) => c !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((c) => c !== val);
        setSelectedPaymentStatus(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedPaymentStatus([...filtered, val]);
      }
    } else if (activeTab === 'paymentStructure') {
      if (val === 'All') {
        setSelectedPaymentStructure(['All']);
        return;
      }
      const filtered = selectedPaymentStructure.filter((m) => m !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((m) => m !== val);
        setSelectedPaymentStructure(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedPaymentStructure([...filtered, val]);
      }
    } else if (activeTab === 'fulfillment') {
      if (val === 'All') {
        setSelectedFulfillment(['All']);
        return;
      }
      const filtered = selectedFulfillment.filter((s) => s !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((s) => s !== val);
        setSelectedFulfillment(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedFulfillment([...filtered, val]);
      }
    } else {
      setSelectedDuration(val);
    }
  };

  const isOptionChecked = (val: string) => {
    if (activeTab === 'paymentStatus') return selectedPaymentStatus.includes(val);
    if (activeTab === 'paymentStructure') return selectedPaymentStructure.includes(val);
    if (activeTab === 'fulfillment') return selectedFulfillment.includes(val);
    return selectedDuration === val;
  };

  const handleApply = () => {
    onApplyFilters({
      paymentStatus: selectedPaymentStatus,
      paymentStructure: selectedPaymentStructure,
      fulfillment: selectedFulfillment,
      duration: selectedDuration,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedPaymentStatus(['All']);
    setSelectedPaymentStructure(['All']);
    setSelectedFulfillment(['All']);
    setSelectedDuration('All');
    onClose();
  };

  const tabs: { key: 'paymentStatus' | 'paymentStructure' | 'fulfillment' | 'duration'; label: string }[] = [
    { key: 'paymentStatus', label: 'Payment status' },
    { key: 'paymentStructure', label: 'Payment structure' },
    { key: 'fulfillment', label: 'Fulfillment' },
    { key: 'duration', label: 'Duration' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
          maxWidth: '430px',
          backgroundColor: cardBg,
          borderRadius: '20px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Header matching Figma Image 3 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
            Filter table
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

        {/* 4 Underline Tabs matching Figma Image 3 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '2px',
            overflowX: 'auto',
          }}
          className="no-scrollbar"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 0 10px 0',
                  color: isActive ? textColor : subtextColor,
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      backgroundColor: yellowColor,
                      borderRadius: '2px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Options List matching Figma Image 3 with square yellow checkboxes */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '220px',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          {currentOptions.map((opt) => {
            const isChecked = isOptionChecked(opt);
            return (
              <div
                key={opt}
                onClick={() => handleToggle(opt)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  userSelect: 'none',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: isChecked ? textColor : subtextColor,
                    fontWeight: isChecked ? 600 : 400,
                  }}
                >
                  {opt}
                </span>

                {/* Checkbox square or radio */}
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: activeTab === 'duration' ? '50%' : '4px',
                    backgroundColor: isChecked ? yellowColor : 'transparent',
                    border: isChecked
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isChecked && (
                    activeTab === 'duration' ? (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#000000' }} />
                    ) : (
                      <Check size={12} color="#000000" strokeWidth={3} />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions: Discard & Save matching Figma Image 3 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '8px',
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: '24px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#27272A',
              border: 'none',
              color: isLightMode ? '#374151' : '#E4E4E7',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleApply}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: '24px',
              backgroundColor: yellowColor,
              border: 'none',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={13} color="#000000" />
          </button>
        </div>
      </div>
    </div>
  );
};
