'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface InventoryBoxModelFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters?: (filters: {
    cabinet: string[];
    material: string[];
    status: string[];
  }) => void;
}

export const InventoryBoxModelFilterModal: React.FC<InventoryBoxModelFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'Cabinet' | 'Material' | 'Status'>('Cabinet');

  const [selectedCabinets, setSelectedCabinets] = useState<string[]>(['All']);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['All']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  const cabinetOptions = ['All', '1', '2', '4'];
  const materialOptions = ['All', 'Metal', 'Wood'];
  const statusOptions = ['All', 'Active', 'Discontinued'];

  const toggleOption = (
    list: string[],
    setList: (v: string[]) => void,
    item: string,
    allOptions: string[]
  ) => {
    if (item === 'All') {
      if (list.includes('All')) {
        setList([]);
      } else {
        setList(['All', ...allOptions.filter((o) => o !== 'All')]);
      }
      return;
    }

    let updated: string[];
    if (list.includes(item)) {
      updated = list.filter((i) => i !== item && i !== 'All');
    } else {
      updated = [...list, item];
      // if all non-all items selected, add 'All'
      const nonAll = allOptions.filter((o) => o !== 'All');
      if (nonAll.every((o) => updated.includes(o))) {
        updated = ['All', ...nonAll];
      }
    }
    setList(updated);
  };

  const handleSave = () => {
    onApplyFilters?.({
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
          maxWidth: '420px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isLightMode
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'scaleIn 0.2s ease-out',
        }}
      >
        {/* Header with Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>Filter</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Headers */}
        <div
          style={{
            display: 'flex',
            borderBottom: `1px solid ${borderColor}`,
            gap: '20px',
          }}
        >
          {(['Cabinet', 'Material', 'Status'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 2px 10px 2px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#F5C842' : subtextColor,
                  borderBottom: isActive ? '2px solid #F5C842' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Content List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '140px' }}>
          {activeTab === 'Cabinet' &&
            cabinetOptions.map((opt) => {
              const isChecked = selectedCabinets.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(selectedCabinets, setSelectedCabinets, opt, cabinetOptions)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>{opt}</span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isChecked ? '#F5C842' : 'transparent',
                      border: isChecked ? 'none' : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}

          {activeTab === 'Material' &&
            materialOptions.map((opt) => {
              const isChecked = selectedMaterials.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(selectedMaterials, setSelectedMaterials, opt, materialOptions)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>{opt}</span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isChecked ? '#F5C842' : 'transparent',
                      border: isChecked ? 'none' : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}

          {activeTab === 'Status' &&
            statusOptions.map((opt) => {
              const isChecked = selectedStatuses.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(selectedStatuses, setSelectedStatuses, opt, statusOptions)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>{opt}</span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isChecked ? '#F5C842' : 'transparent',
                      border: isChecked ? 'none' : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Modal Buttons: Discard & Save */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginTop: '6px' }}>
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              height: '42px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              color: textColor,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              height: '42px',
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
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
