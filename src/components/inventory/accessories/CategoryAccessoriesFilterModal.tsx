'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface CategoryAccessoriesFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters?: (filters: {
    linkedBoxes: string[];
    status: string[];
  }) => void;
}

export const CategoryAccessoriesFilterModal: React.FC<CategoryAccessoriesFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'Linked boxes' | 'Status'>('Linked boxes');

  const [selectedLinkedBoxes, setSelectedLinkedBoxes] = useState<string[]>(['All']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  // Options matching user specifications for Category detail page (Image 2):
  // "two tabs on it which are firstly 'linked boxes' - all, MyBox-standard and MyBox-premium
  // and secondly 'status' - all, active, discontinue with the discard and submit buttons on them"
  const linkedBoxOptions = ['All', 'MyBox-standard', 'MyBox-premium'];
  const statusOptions = ['All', 'Active', 'Discontinue'];

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
      updated = list.filter((s) => s !== item && s !== 'All');
    } else {
      updated = [...list, item];
      const nonAll = allOptions.filter((o) => o !== 'All');
      if (nonAll.every((o) => updated.includes(o))) {
        updated = ['All', ...nonAll];
      }
    }
    setList(updated);
  };

  const handleSave = () => {
    onApplyFilters?.({
      linkedBoxes: selectedLinkedBoxes,
      status: selectedStatuses,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedLinkedBoxes(['All']);
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
          maxWidth: '400px',
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
        {/* Header */}
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

        {/* 2 Tab Headers: Linked boxes & Status */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${borderColor}`, gap: '20px' }}>
          {(['Linked boxes', 'Status'] as const).map((tab) => {
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

        {/* Tab 1 Content: Linked boxes */}
        {activeTab === 'Linked boxes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '140px' }}>
            {linkedBoxOptions.map((opt) => {
              const checked = selectedLinkedBoxes.includes(opt);
              return (
                <label
                  key={opt}
                  onClick={() =>
                    toggleOption(selectedLinkedBoxes, setSelectedLinkedBoxes, opt, linkedBoxOptions)
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: textColor,
                    userSelect: 'none',
                  }}
                >
                  <span>{opt}</span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: checked ? 'none' : `1px solid ${borderColor}`,
                      backgroundColor: checked ? '#F5C842' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    {checked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* Tab 2 Content: Status */}
        {activeTab === 'Status' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '140px' }}>
            {statusOptions.map((opt) => {
              const checked = selectedStatuses.includes(opt);
              return (
                <label
                  key={opt}
                  onClick={() =>
                    toggleOption(selectedStatuses, setSelectedStatuses, opt, statusOptions)
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: textColor,
                    userSelect: 'none',
                  }}
                >
                  <span>{opt}</span>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: checked ? 'none' : `1px solid ${borderColor}`,
                      backgroundColor: checked ? '#F5C842' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    {checked && <Check size={12} color="#000000" strokeWidth={3} />}
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* Footer Actions: Discard & Save */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '8px',
            paddingTop: '12px',
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '8px 22px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#F5C842',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
