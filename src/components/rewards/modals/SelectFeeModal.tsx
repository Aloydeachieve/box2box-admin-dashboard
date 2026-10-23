'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface SelectFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  selectedFees: string[];
  onSelectFees: (fees: string[]) => void;
}

const FEES = ['Box usage fee', 'Delivery fee', 'Deposit fee', 'Withdrawal fee'];

export const SelectFeeModal: React.FC<SelectFeeModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  selectedFees,
  onSelectFees,
}) => {
  const [currentSelection, setCurrentSelection] = useState<string[]>(['Box usage fee', 'Delivery fee', 'Deposit fee']);

  useEffect(() => {
    if (selectedFees && selectedFees.length > 0) {
      setCurrentSelection(selectedFees);
    }
  }, [selectedFees, isOpen]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const isAllSelected = FEES.every((fee) => currentSelection.includes(fee));

  const toggleAll = () => {
    if (isAllSelected) {
      setCurrentSelection([]);
    } else {
      setCurrentSelection([...FEES]);
    }
  };

  const toggleFee = (fee: string) => {
    if (currentSelection.includes(fee)) {
      setCurrentSelection(currentSelection.filter((f) => f !== fee));
    } else {
      setCurrentSelection([...currentSelection, fee]);
    }
  };

  const handleSave = () => {
    onSelectFees(currentSelection.length > 0 ? currentSelection : ['Box usage fee', 'Delivery fee', 'Deposit fee']);
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
          maxWidth: '380px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '14px',
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            Select fee
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: subtextColor,
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = textColor)}
            onMouseOut={(e) => (e.currentTarget.style.color = subtextColor)}
          >
            <X size={15} />
          </button>
        </div>

        {/* Checkbox Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* 'All' Toggle Option */}
          <div
            onClick={toggleAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 4px',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: isAllSelected ? 600 : 500,
                color: isAllSelected ? textColor : subtextColor,
              }}
            >
              All
            </span>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: isAllSelected ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                backgroundColor: isAllSelected ? yellowColor : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              {isAllSelected && <Check size={13} color="#000000" strokeWidth={3} />}
            </div>
          </div>

          {/* Individual Fee Items */}
          {FEES.map((fee) => {
            const isChecked = currentSelection.includes(fee);
            return (
              <div
                key={fee}
                onClick={() => toggleFee(fee)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 4px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isChecked ? 600 : 500,
                    color: isChecked ? textColor : subtextColor,
                  }}
                >
                  {fee}
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isChecked ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                    backgroundColor: isChecked ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons: Discard and Save with Box2BoxPulsingBadge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              color: textColor,
              border: `1px solid ${borderColor}`,
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>
        </div>
      </div>
    </div>
  );
};
