'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface BoxModelsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: { cabinet: string[]; material: string[]; status: string[] }) => void;
}

export const BoxModelsFilterModal: React.FC<BoxModelsFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'cabinet' | 'material' | 'status'>('cabinet');

  // Selected filters
  const [selectedCabinets, setSelectedCabinets] = useState<string[]>(['All']);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['All']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Tab options based on requirements & Figma Image 4:
  // "Cabinet: All, 1, 2, 4 | Material: All, Metal, Wood | Status: All, Active, Discontinue"
  const cabinetOptions = ['All', '1', '2', '4'];
  const materialOptions = ['All', 'Metal', 'Wood'];
  const statusOptions = ['All', 'Active', 'Discontinue'];

  const currentOptions =
    activeTab === 'cabinet'
      ? cabinetOptions
      : activeTab === 'material'
      ? materialOptions
      : statusOptions;

  const selectedList =
    activeTab === 'cabinet'
      ? selectedCabinets
      : activeTab === 'material'
      ? selectedMaterials
      : selectedStatuses;

  const handleToggle = (val: string) => {
    if (activeTab === 'cabinet') {
      if (val === 'All') {
        setSelectedCabinets(['All']);
        return;
      }
      const filtered = selectedCabinets.filter((c) => c !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((c) => c !== val);
        setSelectedCabinets(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedCabinets([...filtered, val]);
      }
    } else if (activeTab === 'material') {
      if (val === 'All') {
        setSelectedMaterials(['All']);
        return;
      }
      const filtered = selectedMaterials.filter((m) => m !== 'All');
      if (filtered.includes(val)) {
        const next = filtered.filter((m) => m !== val);
        setSelectedMaterials(next.length === 0 ? ['All'] : next);
      } else {
        setSelectedMaterials([...filtered, val]);
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
      cabinet: selectedCabinets,
      material: selectedMaterials,
      status: selectedStatuses,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedCabinets(['All']);
    setSelectedMaterials(['All']);
    setSelectedStatuses(['All']);
    onClose();
  };

  const tabs: { key: 'cabinet' | 'material' | 'status'; label: string }[] = [
    { key: 'cabinet', label: 'Cabinet' },
    { key: 'material', label: 'Material' },
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
        {/* Header matching Figma Image 4 */}
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

        {/* Underline Tabs matching Figma Image 4 (No search bar, no pill tabs!) */}
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

        {/* Options List matching Figma Image 4 with square yellow checkboxes on right */}
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

                {/* Square Checkbox matching Figma Image 4 */}
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

        {/* Footer Actions: Discard & Save matching Figma Image 4 */}
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
