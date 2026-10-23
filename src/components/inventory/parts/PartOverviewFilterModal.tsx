'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface PartOverviewFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: { status: string[]; location: string[] }) => void;
}

export const PartOverviewFilterModal: React.FC<PartOverviewFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'location'>('status');

  // Selected filters
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C1E';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#27272A';
  const yellowColor = '#F5C842';

  const statusOptions = ['All', 'Available', 'Low stock', 'Out of stock'];
  const locationOptions = ['All', 'Ikeja', 'Awka', 'Onitsha'];

  const toggleStatus = (st: string) => {
    if (st === 'All') {
      setSelectedStatuses(['All']);
      return;
    }
    let updated = selectedStatuses.filter((s) => s !== 'All');
    if (updated.includes(st)) {
      updated = updated.filter((s) => s !== st);
      if (updated.length === 0) updated = ['All'];
    } else {
      updated.push(st);
    }
    setSelectedStatuses(updated);
  };

  const toggleLocation = (loc: string) => {
    if (loc === 'All') {
      setSelectedLocations(['All']);
      return;
    }
    let updated = selectedLocations.filter((l) => l !== 'All');
    if (updated.includes(loc)) {
      updated = updated.filter((l) => l !== loc);
      if (updated.length === 0) updated = ['All'];
    } else {
      updated.push(loc);
    }
    setSelectedLocations(updated);
  };

  const handleDiscard = () => {
    setSelectedStatuses(['All']);
    setSelectedLocations(['All']);
    onClose();
  };

  const handleApply = () => {
    onApplyFilters({
      status: selectedStatuses,
      location: selectedLocations,
    });
    onClose();
  };

  const currentOptions = activeTab === 'status' ? statusOptions : locationOptions;

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
          maxWidth: '380px',
          backgroundColor: modalBg,
          borderRadius: '20px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header: Title & Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
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

        {/* 2 Tabs: Status and Location */}
        <div
          style={{
            display: 'flex',
            borderBottom: `1px solid ${borderColor}`,
            gap: '24px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 0',
              fontSize: '13px',
              fontWeight: activeTab === 'status' ? 700 : 500,
              color: activeTab === 'status' ? yellowColor : subtextColor,
              borderBottom: activeTab === 'status' ? `2px solid ${yellowColor}` : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Status
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 0',
              fontSize: '13px',
              fontWeight: activeTab === 'location' ? 700 : 500,
              color: activeTab === 'location' ? yellowColor : subtextColor,
              borderBottom: activeTab === 'location' ? `2px solid ${yellowColor}` : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Location
          </button>
        </div>

        {/* Options List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '180px',
            overflowY: 'auto',
          }}
        >
          {currentOptions.map((opt) => {
            const isSelected =
              activeTab === 'status'
                ? selectedStatuses.includes(opt)
                : selectedLocations.includes(opt);

            return (
              <div
                key={opt}
                onClick={() => {
                  if (activeTab === 'status') toggleStatus(opt);
                  else toggleLocation(opt);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  cursor: 'pointer',
                  color: isSelected ? yellowColor : textColor,
                  fontSize: '14px',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <span>{opt}</span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? yellowColor : subtextColor}`,
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
        </div>

        {/* Bottom Actions: Discard & Save */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#E5E7EB',
              color: '#111827',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleApply}
            style={{
              flex: 1,
              padding: '12px',
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
            <Box2BoxPulsingBadge size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
