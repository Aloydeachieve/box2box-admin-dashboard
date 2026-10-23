'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface AccessoriesTableFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: { category: string[]; linkedBox: string[]; status: string[] }) => void;
}

export const AccessoriesTableFilterModal: React.FC<AccessoriesTableFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'category' | 'linkedBox' | 'status'>('category');

  // Selected filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedLinkedBoxes, setSelectedLinkedBoxes] = useState<string[]>(['All']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  const categoryOptions = ['All', 'Main Module', 'Extension', 'Locks', 'Camera'];
  const linkedBoxOptions = ['All', 'MyBox-Standard', 'MyBox-Premium'];
  const statusOptions = ['All', 'Active', 'Discontinue'];

  const currentOptions =
    activeTab === 'category'
      ? categoryOptions
      : activeTab === 'linkedBox'
      ? linkedBoxOptions
      : statusOptions;

  const selectedList =
    activeTab === 'category'
      ? selectedCategories
      : activeTab === 'linkedBox'
      ? selectedLinkedBoxes
      : selectedStatuses;

  const handleToggle = (val: string) => {
    if (activeTab === 'category') {
      if (val === 'All') {
        setSelectedCategories(['All']);
        return;
      }
      const filtered = selectedCategories.filter((c) => c !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((c) => c !== val);
        setSelectedCategories(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedCategories([...filtered, val]);
      }
    } else if (activeTab === 'linkedBox') {
      if (val === 'All') {
        setSelectedLinkedBoxes(['All']);
        return;
      }
      const filtered = selectedLinkedBoxes.filter((b) => b !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((b) => b !== val);
        setSelectedLinkedBoxes(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedLinkedBoxes([...filtered, val]);
      }
    } else {
      if (val === 'All') {
        setSelectedStatuses(['All']);
        return;
      }
      const filtered = selectedStatuses.filter((s) => s !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((s) => s !== val);
        setSelectedStatuses(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedStatuses([...filtered, val]);
      }
    }
  };

  const handleApply = () => {
    onApplyFilters({
      category: selectedCategories,
      linkedBox: selectedLinkedBoxes,
      status: selectedStatuses,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedCategories(['All']);
    setSelectedLinkedBoxes(['All']);
    setSelectedStatuses(['All']);
    onClose();
  };

  const tabs: { key: 'category' | 'linkedBox' | 'status'; label: string }[] = [
    { key: 'category', label: 'Category' },
    { key: 'linkedBox', label: 'Linked Box' },
    { key: 'status', label: 'Status' },
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
          maxWidth: '380px',
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
        {/* Header */}
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

        {/* Underline Tabs matching Figma Image 4 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '2px',
          }}
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
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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

        {/* Options List matching Figma Image 4 with square yellow checkboxes */}
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
            const isChecked = selectedList.includes(opt);
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

                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    backgroundColor: isChecked ? yellowColor : 'transparent',
                    border: isChecked ? `1px solid ${yellowColor}` : `1px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
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
        </div>

        {/* Footer Actions: Discard & Save */}
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
