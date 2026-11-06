'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, X, Calendar, Check } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

const APPLY_TO_OPTIONS = [
  'Box usage fee',
  'Delivery fee',
  'Deposit amount',
  'Withdrawal amount',
  'Deposit fee',
  'Withdrawal fee',
  'Box fee commission',
  'Delivery fee commission',
];

export const CreatePromotionView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#FFFFFF' : '#141416';
  const yellowColor = '#F5C842';

  // Form State
  const [promoName, setPromoName] = useState('');
  const [selectedApplyTo, setSelectedApplyTo] = useState<string[]>([]);
  const [tempApplyTo, setTempApplyTo] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [promoType, setPromoType] = useState('');

  // Dropdown States
  const [isApplyToOpen, setIsApplyToOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isDiscountExpanded, setIsDiscountExpanded] = useState(true);

  // Focus States for Floating Labels
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [isEndFocused, setIsEndFocused] = useState(false);

  // Form validity (Rule 5)
  const isValid =
    promoName.trim().length > 0 &&
    selectedApplyTo.length > 0 &&
    startDate.trim().length > 0 &&
    endDate.trim().length > 0 &&
    promoType.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    router.push('/transactions/revenue-configuration');
  };

  // Toggle Apply To options (matching Image 3 Card 1)
  const toggleApplyOption = (opt: string) => {
    if (opt === 'All') {
      if (tempApplyTo.length === APPLY_TO_OPTIONS.length) {
        setTempApplyTo([]);
      } else {
        setTempApplyTo([...APPLY_TO_OPTIONS]);
      }
      return;
    }

    if (tempApplyTo.includes(opt)) {
      setTempApplyTo(tempApplyTo.filter((item) => item !== opt));
    } else {
      setTempApplyTo([...tempApplyTo, opt]);
    }
  };

  const handleOpenApplyTo = () => {
    setTempApplyTo([...selectedApplyTo]);
    setIsApplyToOpen(true);
    setIsTypeOpen(false);
  };

  const handleSaveApplyTo = () => {
    setSelectedApplyTo([...tempApplyTo]);
    setIsApplyToOpen(false);
  };

  const handleDiscardApplyTo = () => {
    setTempApplyTo([...selectedApplyTo]);
    setIsApplyToOpen(false);
  };

  const isNameFloating = isNameFocused || promoName.length > 0;
  const isStartFloating = isStartFocused || startDate.length > 0;
  const isEndFloating = isEndFocused || endDate.length > 0;

  const applyToDisplayValue =
    selectedApplyTo.length === 0
      ? ''
      : selectedApplyTo.length === APPLY_TO_OPTIONS.length
      ? 'All'
      : selectedApplyTo.join(', ');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        maxWidth: '900px',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
      onClick={() => {
        setIsApplyToOpen(false);
        setIsTypeOpen(false);
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Card 1: About promo matching Image 2 */}
        <div
          style={{
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            About promo
          </h2>

          {/* 2-Column Form Fields Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px 24px',
            }}
          >
            {/* Field 1: Promo Name with Floating Label */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isNameFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                padding: '8px 14px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'text',
                transition: 'border-color 0.15s ease',
              }}
              onClick={(e) => {
                const input = e.currentTarget.querySelector('input');
                if (input) input.focus();
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: isNameFloating ? '8px' : '50%',
                  transform: isNameFloating ? 'none' : 'translateY(-50%)',
                  fontSize: isNameFloating ? '11px' : '13px',
                  fontWeight: 500,
                  color: isNameFocused ? yellowColor : subtextColor,
                  pointerEvents: 'none',
                  transition: 'all 0.15s ease',
                  lineHeight: 1,
                }}
              >
                Promo name
              </span>
              <input
                type="text"
                value={promoName}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
                onChange={(e) => setPromoName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: 0,
                  margin: 0,
                  marginTop: isNameFloating ? '14px' : '0',
                  opacity: isNameFloating ? 1 : 0,
                  transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                }}
              />
            </div>

            {/* Field 2: Apply To Selector with Floating Label & Image 3 Card 1 Popover */}
            <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div
                onClick={handleOpenApplyTo}
                style={{
                  position: 'relative',
                  height: '56px',
                  borderRadius: '10px',
                  border: isApplyToOpen ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    paddingRight: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: applyToDisplayValue ? '11px' : '13px',
                      color: isApplyToOpen ? yellowColor : subtextColor,
                      fontWeight: 500,
                      lineHeight: 1,
                      marginBottom: applyToDisplayValue ? '4px' : '0',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Apply to
                  </span>
                  {applyToDisplayValue && (
                    <span
                      style={{
                        fontSize: '13.5px',
                        color: textColor,
                        fontWeight: 500,
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {applyToDisplayValue}
                    </span>
                  )}
                </div>
                <ChevronDown size={16} color={subtextColor} style={{ flexShrink: 0 }} />
              </div>

              {/* Apply To Popover Card matching Figma Image 3 Card 1 */}
              {isApplyToOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    minWidth: '320px',
                    backgroundColor: dropdownBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '14px',
                    padding: '16px',
                    zIndex: 60,
                    boxShadow: '0 14px 35px rgba(0, 0, 0, 0.55)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>Apply to</span>
                    <button
                      type="button"
                      onClick={() => setIsApplyToOpen(false)}
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

                  <div style={{ height: '1px', backgroundColor: borderColor }} />

                  {/* Options List with Checkboxes */}
                  <div
                    style={{
                      maxHeight: '260px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {/* 'All' Toggle Option */}
                    <div
                      onClick={() => toggleApplyOption('All')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: textColor,
                        transition: 'background-color 0.15s',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode
                          ? '#F9FAFB'
                          : 'rgba(255, 255, 255, 0.04)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      <span>All</span>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          backgroundColor:
                            tempApplyTo.length === APPLY_TO_OPTIONS.length ? yellowColor : 'transparent',
                          border:
                            tempApplyTo.length === APPLY_TO_OPTIONS.length
                              ? 'none'
                              : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.3)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxSizing: 'border-box',
                        }}
                      >
                        {tempApplyTo.length === APPLY_TO_OPTIONS.length && (
                          <Check size={12} color="#000000" strokeWidth={3} />
                        )}
                      </div>
                    </div>

                    {/* Specific Options */}
                    {APPLY_TO_OPTIONS.map((opt) => {
                      const isChecked = tempApplyTo.includes(opt);
                      return (
                        <div
                          key={opt}
                          onClick={() => toggleApplyOption(opt)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: textColor,
                            transition: 'background-color 0.15s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = isLightMode
                              ? '#F9FAFB'
                              : 'rgba(255, 255, 255, 0.04)')
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                          }
                        >
                          <span>{opt}</span>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              backgroundColor: isChecked ? yellowColor : 'transparent',
                              border: isChecked
                                ? 'none'
                                : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.3)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxSizing: 'border-box',
                            }}
                          >
                            {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons row: Discard and Save */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      paddingTop: '8px',
                      borderTop: `1px solid ${borderColor}`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleDiscardApplyTo}
                      style={{
                        height: '38px',
                        borderRadius: '8px',
                        backgroundColor: isLightMode ? '#E5E7EB' : '#2A2A2E',
                        border: 'none',
                        color: isLightMode ? '#374151' : '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveApplyTo}
                      style={{
                        height: '38px',
                        borderRadius: '8px',
                        backgroundColor: yellowColor,
                        border: 'none',
                        color: '#000000',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Field 3: Start Date with Floating Label & Calendar Icon */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isStartFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                padding: '8px 14px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'text',
                transition: 'border-color 0.15s ease',
              }}
              onClick={(e) => {
                const input = e.currentTarget.querySelector('input');
                if (input) input.focus();
              }}
            >
              <div style={{ flex: 1, position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: isStartFloating ? '0px' : '50%',
                    transform: isStartFloating ? 'none' : 'translateY(-50%)',
                    fontSize: isStartFloating ? '11px' : '13px',
                    fontWeight: 500,
                    color: isStartFocused ? yellowColor : subtextColor,
                    pointerEvents: 'none',
                    transition: 'all 0.15s ease',
                    lineHeight: 1,
                  }}
                >
                  Start date
                </span>
                <input
                  type="text"
                  value={startDate}
                  placeholder={isStartFocused ? 'Apr 10, 2026' : ''}
                  onFocus={() => setIsStartFocused(true)}
                  onBlur={() => setIsStartFocused(false)}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: textColor,
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: 0,
                    margin: 0,
                    marginTop: isStartFloating ? '14px' : '0',
                    opacity: isStartFloating ? 1 : 0,
                    transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                  }}
                />
              </div>
              <Calendar size={18} color={subtextColor} style={{ flexShrink: 0 }} />
            </div>

            {/* Field 4: End Date with Floating Label & Calendar Icon */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isEndFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                padding: '8px 14px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'text',
                transition: 'border-color 0.15s ease',
              }}
              onClick={(e) => {
                const input = e.currentTarget.querySelector('input');
                if (input) input.focus();
              }}
            >
              <div style={{ flex: 1, position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: isEndFloating ? '0px' : '50%',
                    transform: isEndFloating ? 'none' : 'translateY(-50%)',
                    fontSize: isEndFloating ? '11px' : '13px',
                    fontWeight: 500,
                    color: isEndFocused ? yellowColor : subtextColor,
                    pointerEvents: 'none',
                    transition: 'all 0.15s ease',
                    lineHeight: 1,
                  }}
                >
                  End date
                </span>
                <input
                  type="text"
                  value={endDate}
                  placeholder={isEndFocused ? 'Apr 12, 2026' : ''}
                  onFocus={() => setIsEndFocused(true)}
                  onBlur={() => setIsEndFocused(false)}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: textColor,
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: 0,
                    margin: 0,
                    marginTop: isEndFloating ? '14px' : '0',
                    opacity: isEndFloating ? 1 : 0,
                    transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                  }}
                />
              </div>
              <Calendar size={18} color={subtextColor} style={{ flexShrink: 0 }} />
            </div>
          </div>
        </div>

        {/* Card 2: Promo rules matching Image 2 */}
        <div
          style={{
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            Promo rules
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px 24px',
            }}
          >
            {/* Type Selector with Floating Label & Image 3 Card 2 & 3 Popover */}
            <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div
                onClick={() => {
                  setIsTypeOpen(!isTypeOpen);
                  setIsApplyToOpen(false);
                }}
                style={{
                  position: 'relative',
                  height: '56px',
                  borderRadius: '10px',
                  border: isTypeOpen ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span
                    style={{
                      fontSize: promoType ? '11px' : '13px',
                      color: isTypeOpen ? yellowColor : subtextColor,
                      fontWeight: 500,
                      lineHeight: 1,
                      marginBottom: promoType ? '4px' : '0',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Type
                  </span>
                  {promoType && (
                    <span
                      style={{
                        fontSize: '14px',
                        color: textColor,
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {promoType}
                    </span>
                  )}
                </div>
                <ChevronDown size={16} color={subtextColor} />
              </div>

              {/* Select Promo Type Popover matching Image 3 Card 2 & 3 */}
              {isTypeOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    minWidth: '280px',
                    backgroundColor: dropdownBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '14px',
                    padding: '16px',
                    zIndex: 60,
                    boxShadow: '0 14px 35px rgba(0, 0, 0, 0.55)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>
                      Select promo type
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTypeOpen(false)}
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

                  <div style={{ height: '1px', backgroundColor: borderColor }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Option 1: Discount (Expandable) */}
                    <div>
                      <div
                        onClick={() => setIsDiscountExpanded(!isDiscountExpanded)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 8px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: textColor,
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = isLightMode
                            ? '#F9FAFB'
                            : 'rgba(255, 255, 255, 0.04)')
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                      >
                        <span>Discount</span>
                        {isDiscountExpanded ? (
                          <ChevronUp size={16} color={subtextColor} />
                        ) : (
                          <ChevronDown size={16} color={subtextColor} />
                        )}
                      </div>

                      {/* Expanded Sub-options (Image 3 Card 3) */}
                      {isDiscountExpanded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '14px' }}>
                          {['Amount (₦)', 'Percent (%)'].map((subOpt) => {
                            const isSelected = promoType === `Discount - ${subOpt}`;
                            return (
                              <div
                                key={subOpt}
                                onClick={() => {
                                  setPromoType(`Discount - ${subOpt}`);
                                  setIsTypeOpen(false);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '8px 10px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12.5px',
                                  color: textColor,
                                  transition: 'background-color 0.15s ease',
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.backgroundColor = isLightMode
                                    ? '#F9FAFB'
                                    : 'rgba(255, 255, 255, 0.04)')
                                }
                                onMouseOut={(e) =>
                                  (e.currentTarget.style.backgroundColor = 'transparent')
                                }
                              >
                                <span style={{ color: subtextColor }}>{subOpt}</span>

                                {/* Circular Radio */}
                                <div
                                  style={{
                                    width: '18px',
                                    height: '18px',
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
                                        width: '9px',
                                        height: '9px',
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
                      )}
                    </div>

                    {/* Option 2: Disable fees */}
                    <div
                      onClick={() => {
                        setPromoType('Disable fees');
                        setIsTypeOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 8px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: textColor,
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode
                          ? '#F9FAFB'
                          : 'rgba(255, 255, 255, 0.04)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      <span>Disable fees</span>

                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: promoType === 'Disable fees'
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
                        {promoType === 'Disable fees' && (
                          <div
                            style={{
                              width: '9px',
                              height: '9px',
                              borderRadius: '50%',
                              backgroundColor: yellowColor,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button: Create promotion matching Image 2, Rule 5 & Rule 2 */}
        <div>
          <button
            type="submit"
            disabled={!isValid}
            style={{
              backgroundColor: isValid ? yellowColor : '#352F17',
              color: isValid ? '#000000' : '#736B42',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              padding: '10px 22px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 2px 10px rgba(245, 200, 66, 0.25)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Create promotion</span>
            {isValid && <Box2BoxPulsingBadge size={14} inverted={false} />}
          </button>
        </div>
      </form>
    </div>
  );
};
