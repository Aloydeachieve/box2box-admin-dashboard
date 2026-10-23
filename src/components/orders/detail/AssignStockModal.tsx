'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, X, Check } from 'lucide-react';
import { OrderItemDetail } from '@/lib/ordersMockData';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface AssignStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: OrderItemDetail | null;
  isLightMode?: boolean;
  onAssign: (stockId: string) => void;
}

interface StockOption {
  id: string;
  name: string;
  branch: string;
  location: string;
}

const ALL_STOCK_OPTIONS: StockOption[] = [
  { id: 'MyBox-S907654', name: 'MyBox-S907654', branch: 'Awka', location: 'Awka, Nigeria' },
  { id: 'MyBox-SB76543', name: 'MyBox-SB76543', branch: 'Awka', location: 'Awka, Nigeria' },
  { id: 'MyBox-S765432', name: 'MyBox-S765432', branch: 'Lagos', location: 'Lagos, Nigeria' },
  { id: 'MyBox-EB45210', name: 'MyBox-EB45210', branch: 'Ebonyi', location: 'Ebonyi, Nigeria' },
  { id: 'MyBox-EN88912', name: 'MyBox-EN88912', branch: 'Enugu', location: 'Enugu, Nigeria' },
];

const BRANCHES = ['All', 'Awka', 'Ebonyi', 'Enugu', 'Lagos'];

export const AssignStockModal: React.FC<AssignStockModalProps> = ({
  isOpen,
  onClose,
  item,
  isLightMode = false,
  onAssign,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStockId, setSelectedStockId] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [tempBranch, setTempBranch] = useState<string>('All');
  const [showBranchModal, setShowBranchModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const innerCardBg = isLightMode ? '#F9FAFB' : '#1A1A1E';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const filteredStock = ALL_STOCK_OPTIONS.filter((stock) => {
    const matchesSearch =
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch =
      selectedBranch === 'All' || stock.branch.toLowerCase() === selectedBranch.toLowerCase();
    return matchesSearch && matchesBranch;
  });

  const handleOpenBranchModal = () => {
    setTempBranch(selectedBranch);
    setShowBranchModal(true);
  };

  const handleSaveBranch = () => {
    setSelectedBranch(tempBranch);
    setShowBranchModal(false);
  };

  const handleConfirmAssign = () => {
    if (selectedStockId) {
      onAssign(selectedStockId);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px',
      }}
      onClick={onClose}
    >
      {/* MAIN ASSIGN STOCK MODAL (Figma Image 3) */}
      <div
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
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Title + Close (X) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
            Assign stock
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
              border: `1px solid ${borderColor}`,
              color: subtextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Search Input & Branch Button Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 34px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: innerCardBg,
                color: textColor,
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <Search
              size={15}
              color={subtextColor}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>

          {/* Branch Dropdown Button */}
          <button
            type="button"
            onClick={handleOpenBranchModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '8px',
              backgroundColor: innerCardBg,
              border: `1px solid ${selectedBranch !== 'All' ? yellowColor : borderColor}`,
              color: selectedBranch !== 'All' ? yellowColor : textColor,
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <span>{selectedBranch === 'All' ? 'Branch' : selectedBranch}</span>
            <ChevronDown size={14} color={selectedBranch !== 'All' ? yellowColor : subtextColor} />
          </button>
        </div>

        {/* Stock List with Radio Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
          {filteredStock.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: subtextColor, fontSize: '13px' }}>
              No stock found for {selectedBranch === 'All' ? 'this search' : selectedBranch}
            </div>
          ) : (
            filteredStock.map((stock) => {
              const isSelected = selectedStockId === stock.id;
              return (
                <div
                  key={stock.id}
                  onClick={() => setSelectedStockId(stock.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: isSelected
                      ? isLightMode ? '#FEF9C3' : 'rgba(245, 200, 66, 0.08)'
                      : 'transparent',
                    border: isSelected ? `1px solid ${yellowColor}` : `1px solid transparent`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#1A1A1E';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                      {stock.name}
                    </span>
                    <span style={{ fontSize: '11px', color: subtextColor }}>
                      {stock.location}
                    </span>
                  </div>

                  {/* Radio Indicator */}
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

        {/* Footer with Assign Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: `1px solid ${borderColor}`,
              color: subtextColor,
              fontSize: '12.5px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleConfirmAssign}
            disabled={!selectedStockId}
            style={{
              padding: '8px 22px',
              borderRadius: '8px',
              backgroundColor: selectedStockId ? yellowColor : (isLightMode ? '#E5E7EB' : '#2A2A2E'),
              color: selectedStockId ? '#000000' : subtextColor,
              fontSize: '12.5px',
              fontWeight: 700,
              border: 'none',
              cursor: selectedStockId ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span>Assign stock</span>
            {selectedStockId && <Box2BoxPulsingBadge size={14} inverted={false} />}
          </button>
        </div>

        {/* NESTED MODAL: SELECT BRANCH MODAL */}
        {showBranchModal && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(3px)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 60,
              padding: '16px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowBranchModal(false);
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                backgroundColor: modalBg,
                borderRadius: '14px',
                border: `1px solid ${borderColor}`,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
                  Select branch
                </h3>
                <button
                  type="button"
                  onClick={() => setShowBranchModal(false)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                    border: `1px solid ${borderColor}`,
                    color: subtextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={13} />
                </button>
              </div>

              {/* Branch Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {BRANCHES.map((branch) => {
                  const isChecked = tempBranch.toLowerCase() === branch.toLowerCase();
                  return (
                    <div
                      key={branch}
                      onClick={() => setTempBranch(branch)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: isChecked
                          ? isLightMode ? '#FEF9C3' : 'rgba(245, 200, 66, 0.08)'
                          : 'transparent',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => {
                        if (!isChecked) {
                          e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#1A1A1E';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isChecked) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <span
                        style={{
                          fontSize: '13px',
                          color: isChecked ? textColor : subtextColor,
                          fontWeight: isChecked ? 600 : 500,
                        }}
                      >
                        {branch}
                      </span>

                      {/* Radio indicator */}
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: `1.5px solid ${isChecked ? yellowColor : subtextColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isChecked && (
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

              {/* Action Buttons: Discard & Save */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowBranchModal(false)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    border: `1px solid ${borderColor}`,
                    color: subtextColor,
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSaveBranch}
                  style={{
                    padding: '7px 20px',
                    borderRadius: '8px',
                    backgroundColor: yellowColor,
                    color: '#000000',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
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
    </div>
  );
};
