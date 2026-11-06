'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

export const CreateRevenueRuleView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#FFFFFF' : '#141416';
  const yellowColor = '#F5C842';

  // Form Fields State
  const [ruleName, setRuleName] = useState('');
  const [applyTo, setApplyTo] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  const [isApplyToOpen, setIsApplyToOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isRuleNameFocused, setIsRuleNameFocused] = useState(false);
  const [isValueFocused, setIsValueFocused] = useState(false);

  const applyToOptions = [
    'Box usage fee',
    'Delivery fee',
    'Deposit amount',
    'Withdrawal amount',
  ];

  const typeOptions = ['Percent', 'Fixed amount'];

  // Form validity: Rule 5 Inactive Button State
  const isValid =
    ruleName.trim().length > 0 &&
    applyTo.trim().length > 0 &&
    type.trim().length > 0 &&
    value.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    router.push('/transactions/revenue-configuration');
  };

  const isRuleNameFloating = isRuleNameFocused || ruleName.length > 0;
  const isValueFloating = isValueFocused || value.length > 0;
  const valueLabel = type === 'Percent' ? 'Value (Percent)' : type === 'Fixed amount' ? 'Value (Amount)' : 'Value';

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
        {/* About rule Container Card */}
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
            About rule
          </h2>

          {/* 2-Column Form Fields Grid with Floating Labels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px 24px',
            }}
          >
            {/* Field 1: Rule Name with Floating Label */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isRuleNameFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
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
                  top: isRuleNameFloating ? '8px' : '50%',
                  transform: isRuleNameFloating ? 'none' : 'translateY(-50%)',
                  fontSize: isRuleNameFloating ? '11px' : '13px',
                  fontWeight: 500,
                  color: isRuleNameFocused ? yellowColor : subtextColor,
                  pointerEvents: 'none',
                  transition: 'all 0.15s ease',
                  lineHeight: 1,
                }}
              >
                Rule name
              </span>
              <input
                type="text"
                value={ruleName}
                onFocus={() => setIsRuleNameFocused(true)}
                onBlur={() => setIsRuleNameFocused(false)}
                onChange={(e) => setRuleName(e.target.value)}
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
                  marginTop: isRuleNameFloating ? '14px' : '0',
                  opacity: isRuleNameFloating ? 1 : 0,
                  transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                }}
              />
            </div>

            {/* Field 2: Apply To Selector with Floating Label */}
            <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div
                onClick={() => {
                  setIsApplyToOpen(!isApplyToOpen);
                  setIsTypeOpen(false);
                }}
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
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span
                    style={{
                      fontSize: applyTo ? '11px' : '13px',
                      color: isApplyToOpen ? yellowColor : subtextColor,
                      fontWeight: 500,
                      lineHeight: 1,
                      marginBottom: applyTo ? '4px' : '0',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Apply to
                  </span>
                  {applyTo && (
                    <span
                      style={{
                        fontSize: '14px',
                        color: textColor,
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {applyTo}
                    </span>
                  )}
                </div>
                <ChevronDown size={16} color={subtextColor} />
              </div>

              {/* Floating Popover: Apply to */}
              {isApplyToOpen && (
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

                  <div style={{ height: '1px', backgroundColor: borderColor, margin: '2px 0' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {applyToOptions.map((opt) => {
                      const isSelected = applyTo === opt;
                      return (
                        <div
                          key={opt}
                          onClick={() => {
                            setApplyTo(opt);
                            setIsApplyToOpen(false);
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
                          <span>{opt}</span>

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
                </div>
              )}
            </div>

            {/* Field 3: Type Selector with Floating Label */}
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
                      fontSize: type ? '11px' : '13px',
                      color: isTypeOpen ? yellowColor : subtextColor,
                      fontWeight: 500,
                      lineHeight: 1,
                      marginBottom: type ? '4px' : '0',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Type
                  </span>
                  {type && (
                    <span
                      style={{
                        fontSize: '14px',
                        color: textColor,
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {type}
                    </span>
                  )}
                </div>
                <ChevronDown size={16} color={subtextColor} />
              </div>

              {/* Floating Popover: Select type */}
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
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>Select type</span>
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

                  <div style={{ height: '1px', backgroundColor: borderColor, margin: '2px 0' }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {typeOptions.map((opt) => {
                      const isSelected = type === opt;
                      return (
                        <div
                          key={opt}
                          onClick={() => {
                            setType(opt);
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
                          <span>{opt}</span>

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
                </div>
              )}
            </div>

            {/* Field 4: Value with Floating Label */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isValueFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
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
                  top: isValueFloating ? '8px' : '50%',
                  transform: isValueFloating ? 'none' : 'translateY(-50%)',
                  fontSize: isValueFloating ? '11px' : '13px',
                  fontWeight: 500,
                  color: isValueFocused ? yellowColor : subtextColor,
                  pointerEvents: 'none',
                  transition: 'all 0.15s ease',
                  lineHeight: 1,
                }}
              >
                {valueLabel}
              </span>
              <input
                type="text"
                value={value}
                onFocus={() => setIsValueFocused(true)}
                onBlur={() => setIsValueFocused(false)}
                onChange={(e) => setValue(e.target.value)}
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
                  marginTop: isValueFloating ? '14px' : '0',
                  opacity: isValueFloating ? 1 : 0,
                  transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* Submit Button: Create rule, Rule 5 & Rule 2 */}
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
            <span>Create rule</span>
            {isValid && <Box2BoxPulsingBadge size={14} inverted={false} />}
          </button>
        </div>
      </form>
    </div>
  );
};
