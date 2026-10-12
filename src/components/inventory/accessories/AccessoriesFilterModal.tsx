'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AccessoriesFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters?: (filters: {
    category: string[];
    linkedBoxes: string[];
    status: string[];
  }) => void;
}

export const AccessoriesFilterModal: React.FC<AccessoriesFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'Category' | 'Linked boxes' | 'Status'>('Category');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedLinkedBoxes, setSelectedLinkedBoxes] = useState<string[]>(['All']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  // Options matching user specifications
  const categoryOptions = ['All', 'Main Module', 'Extension', 'Locks', 'Camera'];
  const linkedBoxesOptions = ['All', 'MyBox-standard', 'MyBox-premium'];
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
      category: selectedCategories,
      linkedBoxes: selectedLinkedBoxes,
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

        {/* 3 Tab Headers: Category, Linked boxes, Status */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${borderColor}`, gap: '20px' }}>
          {(['Category', 'Linked boxes', 'Status'] as const).map((tab) => {
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

        {/* Tab Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '170px' }}>
          {activeTab === 'Category' &&
            categoryOptions.map((opt) => {
              const isChecked = selectedCategories.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(selectedCategories, setSelectedCategories, opt, categoryOptions)}
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

          {activeTab === 'Linked boxes' &&
            linkedBoxesOptions.map((opt) => {
              const isChecked = selectedLinkedBoxes.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(selectedLinkedBoxes, setSelectedLinkedBoxes, opt, linkedBoxesOptions)}
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

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '8px',
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
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
