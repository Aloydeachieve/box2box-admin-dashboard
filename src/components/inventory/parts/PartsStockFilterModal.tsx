'use client';

import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface PartsStockFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: { category: string[]; status: string[]; location: string[] }) => void;
}

export const PartsStockFilterModal: React.FC<PartsStockFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'category' | 'status' | 'location'>('category');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected filters state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['All']);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C1E';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#27272A';
  const yellowColor = '#F5C842';

  const categoryOptions = ['All', '1', '2', '4', 'Main Module', 'Extension', 'Locks', 'Camera'];
  const statusOptions = ['All', 'Available', 'Low stock', 'Out of stock'];
  const locationOptions = ['All', 'Ikeja', 'Awka', 'Onitsha'];

  const toggleCategory = (cat: string) => {
    if (cat === 'All') {
      setSelectedCategories(['All']);
      return;
    }
    let updated = selectedCategories.filter((c) => c !== 'All');
    if (updated.includes(cat)) {
      updated = updated.filter((c) => c !== cat);
      if (updated.length === 0) updated = ['All'];
    } else {
      updated.push(cat);
    }
    setSelectedCategories(updated);
  };

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
    setSelectedCategories(['All']);
    setSelectedStatuses(['All']);
    setSelectedLocations(['All']);
    onClose();
  };

  const handleApply = () => {
    onApplyFilters({
      category: selectedCategories,
      status: selectedStatuses,
      location: selectedLocations,
    });
    onClose();
  };

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
          gap: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
            Filter
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
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

        {/* Tab Headers (3 Tabs) */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('category')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'category' ? yellowColor : subtextColor,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '0 0 6px 0',
              borderBottom: activeTab === 'category' ? `2px solid ${yellowColor}` : 'none',
              marginBottom: '-9px',
            }}
          >
            Category
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'status' ? yellowColor : subtextColor,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '0 0 6px 0',
              borderBottom: activeTab === 'status' ? `2px solid ${yellowColor}` : 'none',
              marginBottom: '-9px',
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
              color: activeTab === 'location' ? yellowColor : subtextColor,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '0 0 6px 0',
              borderBottom: activeTab === 'location' ? `2px solid ${yellowColor}` : 'none',
              marginBottom: '-9px',
            }}
          >
            Location
          </button>
        </div>

        {/* Search */}
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

        {/* Tab Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '220px',
            overflowY: 'auto',
          }}
        >
          {activeTab === 'category' &&
            categoryOptions
              .filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <div
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      padding: '8px 4px',
                      borderRadius: '6px',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isLightMode
                        ? 'rgba(0, 0, 0, 0.03)'
                        : 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
                      {cat}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
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
              })}

          {activeTab === 'status' &&
            statusOptions
              .filter((st) => st.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((st) => {
                const isSelected = selectedStatuses.includes(st);
                return (
                  <div
                    key={st}
                    onClick={() => toggleStatus(st)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      padding: '8px 4px',
                      borderRadius: '6px',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isLightMode
                        ? 'rgba(0, 0, 0, 0.03)'
                        : 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
                      {st}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
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
              })}

          {activeTab === 'location' &&
            locationOptions
              .filter((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((loc) => {
                const isSelected = selectedLocations.includes(loc);
                return (
                  <div
                    key={loc}
                    onClick={() => toggleLocation(loc)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      padding: '8px 4px',
                      borderRadius: '6px',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isLightMode
                        ? 'rgba(0, 0, 0, 0.03)'
                        : 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
                      {loc}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
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
              })}
        </div>

        {/* Bottom Action Buttons: Discard & Save */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
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
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
