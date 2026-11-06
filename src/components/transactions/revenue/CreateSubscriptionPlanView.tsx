'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

export const CreateSubscriptionPlanView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#FFFFFF' : '#141416';
  const yellowColor = '#F5C842';

  // Form State
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('');
  const [description, setDescription] = useState('');

  // Dropdown & Focus states
  const [isDurationUnitOpen, setIsDurationUnitOpen] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPriceFocused, setIsPriceFocused] = useState(false);
  const [isDurationFocused, setIsDurationFocused] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);

  const durationUnitOptions = ['Days', 'Weeks', 'Months'];

  // Form Validity (Rule 5)
  const isValid =
    planName.trim() !== '' &&
    price.trim() !== '' &&
    duration.trim() !== '' &&
    durationUnit.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    router.push('/transactions/revenue-configuration');
  };

  const isNameFloating = isNameFocused || planName.length > 0;
  const isPriceFloating = isPriceFocused || price.length > 0;
  const isDurationFloating = isDurationFocused || duration.length > 0;
  const isDescFloating = isDescFocused || description.length > 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
      onClick={() => setIsDurationUnitOpen(false)}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Form Container Card matching Image 1 */}
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
            About plan
          </h2>

          {/* 2-Column Grid for Input Elements */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px 24px',
            }}
          >
            {/* Field 1: Plan name */}
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
                alignItems: 'center',
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
                Plan name
              </span>
              <input
                type="text"
                value={planName}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
                onChange={(e) => setPlanName(e.target.value)}
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

            {/* Field 2: Price with ₦ indicator on far right */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isPriceFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
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
                    top: isPriceFloating ? '0px' : '50%',
                    transform: isPriceFloating ? 'none' : 'translateY(-50%)',
                    fontSize: isPriceFloating ? '11px' : '13px',
                    fontWeight: 500,
                    color: isPriceFocused ? yellowColor : subtextColor,
                    pointerEvents: 'none',
                    transition: 'all 0.15s ease',
                    lineHeight: 1,
                  }}
                >
                  Price
                </span>
                <input
                  type="text"
                  value={price}
                  onFocus={() => setIsPriceFocused(true)}
                  onBlur={() => setIsPriceFocused(false)}
                  onChange={(e) => setPrice(e.target.value)}
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
                    marginTop: isPriceFloating ? '14px' : '0',
                    opacity: isPriceFloating ? 1 : 0,
                    transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: subtextColor,
                  userSelect: 'none',
                  flexShrink: 0,
                }}
              >
                ₦
              </span>
            </div>

            {/* Field 3: Duration */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isDurationFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                padding: '8px 14px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
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
                  top: isDurationFloating ? '8px' : '50%',
                  transform: isDurationFloating ? 'none' : 'translateY(-50%)',
                  fontSize: isDurationFloating ? '11px' : '13px',
                  fontWeight: 500,
                  color: isDurationFocused ? yellowColor : subtextColor,
                  pointerEvents: 'none',
                  transition: 'all 0.15s ease',
                  lineHeight: 1,
                }}
              >
                Duration
              </span>
              <input
                type="text"
                value={duration}
                onFocus={() => setIsDurationFocused(true)}
                onBlur={() => setIsDurationFocused(false)}
                onChange={(e) => setDuration(e.target.value)}
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
                  marginTop: isDurationFloating ? '14px' : '0',
                  opacity: isDurationFloating ? 1 : 0,
                  transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                }}
              />
            </div>

            {/* Field 4: Duration unit with Dropdown Modal matching Image 2 */}
            <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div
                onClick={() => setIsDurationUnitOpen(!isDurationUnitOpen)}
                style={{
                  position: 'relative',
                  height: '56px',
                  borderRadius: '10px',
                  border: isDurationUnitOpen ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
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
                  }}
                >
                  <span
                    style={{
                      fontSize: durationUnit ? '11px' : '13px',
                      color: isDurationUnitOpen ? yellowColor : subtextColor,
                      fontWeight: 500,
                      lineHeight: 1,
                      marginBottom: durationUnit ? '4px' : 0,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Duration unit
                  </span>
                  {durationUnit && (
                    <span
                      style={{
                        fontSize: '14px',
                        color: textColor,
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      {durationUnit}
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  color={subtextColor}
                  style={{
                    transform: isDurationUnitOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.15s ease',
                  }}
                />
              </div>

              {/* Duration Unit Dropdown Popover matching Image 2 */}
              {isDurationUnitOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    backgroundColor: dropdownBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.55)',
                    zIndex: 90,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
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
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>
                      Select duration unit
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsDurationUnitOpen(false)}
                      style={{
                        background: 'none',
                        border: `1px solid ${subtextColor}`,
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: subtextColor,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>

                  <div style={{ height: '1px', backgroundColor: borderColor, margin: '2px 0 6px 0' }} />

                  {/* Radio List: Days, Weeks, Months (Type 2 Modal Pattern: Instant-select) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {durationUnitOptions.map((unit) => {
                      const isSelected = durationUnit === unit;
                      return (
                        <div
                          key={unit}
                          onClick={() => {
                            setDurationUnit(unit);
                            setIsDurationUnitOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 4px',
                            cursor: 'pointer',
                            width: '100%',
                          }}
                        >
                          <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                            {unit}
                          </span>
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

            {/* Field 5: Description (Occupies only left column in 2-column grid!) */}
            <div
              style={{
                position: 'relative',
                height: '56px',
                borderRadius: '10px',
                border: isDescFocused ? `1.5px solid ${yellowColor}` : `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                padding: '8px 14px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
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
                  top: isDescFloating ? '8px' : '50%',
                  transform: isDescFloating ? 'none' : 'translateY(-50%)',
                  fontSize: isDescFloating ? '11px' : '13px',
                  fontWeight: 500,
                  color: isDescFocused ? yellowColor : subtextColor,
                  pointerEvents: 'none',
                  transition: 'all 0.15s ease',
                  lineHeight: 1,
                }}
              >
                Description
              </span>
              <input
                type="text"
                value={description}
                onFocus={() => setIsDescFocused(true)}
                onBlur={() => setIsDescFocused(false)}
                onChange={(e) => setDescription(e.target.value)}
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
                  marginTop: isDescFloating ? '14px' : '0',
                  opacity: isDescFloating ? 1 : 0,
                  transition: 'opacity 0.15s ease, margin-top 0.15s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* Submit Button with Rule 5 Inactive State */}
        <div>
          <button
            type="submit"
            disabled={!isValid}
            style={{
              padding: '11px 26px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isValid ? yellowColor : '#352F17',
              color: isValid ? '#000000' : '#736B42',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: isValid ? 'pointer' : 'not-allowed',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isValid ? '0 2px 8px rgba(245, 200, 66, 0.25)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Create plan</span>
            {isValid && <Box2BoxPulsingBadge size={14} inverted={false} />}
          </button>
        </div>
      </form>
    </div>
  );
};
