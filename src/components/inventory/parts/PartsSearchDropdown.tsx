'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';

interface PartsSearchDropdownProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (option: string) => void;
  isLightMode?: boolean;
  searchPlaceholder?: string;
  borderYellow?: boolean;
}

export const PartsSearchDropdown: React.FC<PartsSearchDropdownProps> = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onClose,
  onSelect,
  isLightMode = false,
  searchPlaceholder,
  borderYellow = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  // 100% Solid Opaque Background (Zero transparency)
  const dropdownBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#FFFFFF' : 'transparent';
  const searchBg = isLightMode ? '#F9FAFB' : '#1C1C20';
  const yellowColor = '#F5C842';

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
      {/* Trigger Button */}
      <div
        onClick={onToggle}
        style={{
          backgroundColor: inputBg,
          borderRadius: '8px',
          border: isOpen || borderYellow ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '54px',
          boxSizing: 'border-box',
          cursor: 'pointer',
          transition: 'border-color 0.15s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
            {label}
          </span>
          <span
            style={{
              fontSize: '13.5px',
              color: value ? textColor : subtextColor,
              fontWeight: 500,
              marginTop: '2px',
            }}
          >
            {value || `Select ${label.toLowerCase()}`}
          </span>
        </div>
        <ChevronDown
          size={16}
          color={subtextColor}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        />
      </div>

      {/* Solid Opaque Dropdown Popover with Title & Search Input */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '6px',
            backgroundColor: dropdownBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            padding: '14px',
            zIndex: 60,
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.65)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxSizing: 'border-box',
          }}
        >
          {/* Header with Title and Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>
              {label}
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: isLightMode ? '#F3F4F6' : 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: subtextColor,
              }}
            >
              <X size={13} />
            </button>
          </div>

          {/* 1px Hairline Divider */}
          <div style={{ height: '1px', backgroundColor: borderColor }} />

          {/* Real-time Search Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder || `Search ${label.toLowerCase()}...`}
              autoFocus
              style={{
                width: '100%',
                height: '36px',
                backgroundColor: searchBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '0 32px 0 12px',
                fontSize: '12.5px',
                color: textColor,
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
            <Search
              size={14}
              color={subtextColor}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Options List with Single Selection Radio Indicators */}
          <div
            style={{
              maxHeight: '190px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              paddingRight: '2px',
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = value === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      onSelect(opt);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: textColor,
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = isLightMode
                        ? '#F9FAFB'
                        : 'rgba(255, 255, 255, 0.05)')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <span>{opt}</span>

                    {/* Circular Radio Indicator */}
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: isSelected
                          ? `2px solid ${yellowColor}`
                          : isLightMode
                          ? '1.5px solid #D1D5DB'
                          : '1.5px solid rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
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
              })
            ) : (
              <div
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontSize: '12px',
                  color: subtextColor,
                }}
              >
                No {label.toLowerCase()} found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
