'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Search } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface SelectBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  selectedBranches: string[];
  onSelectBranches: (branches: string[]) => void;
}

const BRANCH_LOCATIONS = [
  'Ibadan, Nigeria',
  'Kaduna, Nigeria',
  'Kano, Nigeria',
  'Lagos, Nigeria',
  'Onitsha, Nigeria',
  'Uyo, Nigeria',
];

export const SelectBranchModal: React.FC<SelectBranchModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  selectedBranches,
  onSelectBranches,
}) => {
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedBranches) {
      setCurrentSelection(selectedBranches);
    }
    setSearchQuery('');
  }, [selectedBranches, isOpen]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const toggleBranch = (branch: string) => {
    if (currentSelection.includes(branch)) {
      setCurrentSelection(currentSelection.filter((b) => b !== branch));
    } else {
      setCurrentSelection([...currentSelection, branch]);
    }
  };

  const handleSave = () => {
    onSelectBranches(currentSelection);
    onClose();
  };

  const filteredBranches = BRANCH_LOCATIONS.filter((b) =>
    b.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          gap: '18px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            Select branch
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '26px',
              height: '26px',
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
          >
            <X size={15} />
          </button>
        </div>

        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            backgroundColor: isLightMode ? '#F9FAFB' : 'transparent',
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: '12.5px',
              outline: 'none',
              width: '100%',
            }}
          />
          <Search size={15} color={subtextColor} />
        </div>

        {/* Checkbox Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '180px' }}>
          {filteredBranches.map((branch) => {
            const isChecked = currentSelection.includes(branch);
            return (
              <div
                key={branch}
                onClick={() => toggleBranch(branch)}
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
                  {branch}
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
            marginTop: '6px',
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
