'use client';

import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Power, Wrench, Unlock, CheckCircle2 } from 'lucide-react';

export type BoxActionType = 'disable' | 'activate' | 'maintenance' | 'unlock_all';

interface BoxConfirmModalProps {
  isOpen: boolean;
  actionType: BoxActionType;
  isBulk?: boolean;
  boxCount?: number;
  boxIdentifier?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLightMode?: boolean;
}

export const BoxConfirmModal: React.FC<BoxConfirmModalProps> = ({
  isOpen,
  actionType,
  isBulk = false,
  boxCount = 1,
  boxIdentifier = 'this smart box',
  onClose,
  onConfirm,
  isLightMode = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  const expectedKeyword = isBulk
    ? actionType === 'disable'
      ? 'disable all'
      : actionType === 'activate'
      ? 'activate all'
      : actionType === 'maintenance'
      ? 'maintenance all'
      : 'unlock all'
    : actionType === 'disable'
    ? 'disable'
    : actionType === 'activate'
    ? 'activate'
    : actionType === 'maintenance'
    ? 'maintenance'
    : 'unlock';

  const isConfirmed = inputValue.trim().toLowerCase() === expectedKeyword.toLowerCase();

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen, actionType]);

  if (!isOpen) return null;

  const getModalConfig = () => {
    switch (actionType) {
      case 'disable':
        return {
          title: isBulk ? 'Disable selected smart boxes' : 'Disable smart box',
          warning1: isBulk
            ? 'Disabling these locker units will reject new parcel deposits and prevent app bookings.'
            : 'Disabling this locker unit will reject new parcel deposits and prevent app bookings.',
          warning2: isBulk
            ? `Are you sure you want to disable these ${boxCount} units?`
            : `Are you sure you want to disable ${boxIdentifier}?`,
          buttonLabel: isBulk ? 'Disable boxes' : 'Disable box',
          buttonBg: '#DC2626',
          iconBg: 'rgba(239, 68, 68, 0.15)',
          iconBorder: '1px solid rgba(239, 68, 68, 0.4)',
          iconColor: '#EF4444',
          icon: <Power size={26} />,
        };
      case 'activate':
        return {
          title: isBulk ? 'Activate selected smart boxes' : 'Activate smart box',
          warning1: isBulk
            ? 'Activating these units will make all vacant compartments available for customer storage.'
            : 'Activating this unit will make all vacant compartments available for customer storage.',
          warning2: isBulk
            ? `Are you sure you want to activate these ${boxCount} units?`
            : `Are you sure you want to activate ${boxIdentifier}?`,
          buttonLabel: isBulk ? 'Activate boxes' : 'Activate box',
          buttonBg: '#10B981',
          iconBg: 'rgba(16, 185, 129, 0.15)',
          iconBorder: '1px solid rgba(16, 185, 129, 0.4)',
          iconColor: '#10B981',
          icon: <CheckCircle2 size={26} />,
        };
      case 'maintenance':
        return {
          title: isBulk ? 'Set boxes to maintenance mode' : 'Set box to maintenance mode',
          warning1: 'Maintenance mode pauses incoming couriers while allowing technician diagnostics.',
          warning2: isBulk
            ? `Schedule maintenance across ${boxCount} units?`
            : `Schedule maintenance for ${boxIdentifier}?`,
          buttonLabel: isBulk ? 'Apply maintenance' : 'Apply maintenance',
          buttonBg: '#D97706',
          iconBg: 'rgba(245, 200, 66, 0.15)',
          iconBorder: '1px solid rgba(245, 200, 66, 0.4)',
          iconColor: '#F5C842',
          icon: <Wrench size={26} />,
        };
      case 'unlock_all':
        return {
          title: 'Emergency Master Unlock',
          warning1: 'Emergency unlock disengages all door latches simultaneously. For safety, this requires manual relatching.',
          warning2: `Execute emergency master solenoid release on ${boxIdentifier}?`,
          buttonLabel: 'Master unlock all doors',
          buttonBg: '#DC2626',
          iconBg: 'rgba(239, 68, 68, 0.15)',
          iconBorder: '1px solid rgba(239, 68, 68, 0.4)',
          iconColor: '#EF4444',
          icon: <Unlock size={26} />,
        };
    }
  };

  const config = getModalConfig();

  const bgModal = isLightMode ? '#FFFFFF' : '#141417';
  const borderModal = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)';
  const textTitle = isLightMode ? '#111827' : '#FFFFFF';
  const textMuted = isLightMode ? '#6B7280' : '#8E8E93';
  const inputBg = isLightMode ? '#F9FAFB' : '#1B1B1F';
  const inputBorder = isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.15)';
  const inputColor = isLightMode ? '#111827' : '#FFFFFF';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.15s ease-out',
      }}
    >
      <div
        style={{
          backgroundColor: bgModal,
          border: borderModal,
          borderRadius: '20px',
          width: '100%',
          maxWidth: '460px',
          padding: '28px 24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: textMuted,
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px',
          }}
        >
          <X size={18} />
        </button>

        {/* Action Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: config.iconBg,
            border: config.iconBorder,
            color: config.iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          {config.icon}
        </div>

        {/* Modal Title */}
        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: 700,
            color: textTitle,
          }}
        >
          {config.title}
        </h3>

        {/* Description Warning 1 */}
        <p
          style={{
            margin: '0 0 6px 0',
            fontSize: '13px',
            color: textMuted,
            lineHeight: '1.4',
          }}
        >
          {config.warning1}
        </p>

        {/* Description Warning 2 */}
        <p
          style={{
            margin: '0 0 20px 0',
            fontSize: '13px',
            fontWeight: 600,
            color: textTitle,
          }}
        >
          {config.warning2}
        </p>

        {/* Typing Verification Input */}
        <div style={{ width: '100%', marginBottom: '20px', textAlign: 'left' }}>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              color: textMuted,
              marginBottom: '6px',
            }}
          >
            Please type <strong style={{ color: config.iconColor }}>&quot;{expectedKeyword}&quot;</strong> to confirm:
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Type "${expectedKeyword}"`}
            autoFocus
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: inputBg,
              border: isConfirmed ? `1.5px solid ${config.iconColor}` : inputBorder,
              color: inputColor,
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s ease',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '10px',
              border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: 'transparent',
              color: textTitle,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              if (isConfirmed) {
                onConfirm();
                onClose();
              }
            }}
            disabled={!isConfirmed}
            style={{
              flex: 1.3,
              padding: '11px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: isConfirmed ? config.buttonBg : isLightMode ? '#E5E7EB' : '#2A2A30',
              color: isConfirmed ? '#FFFFFF' : textMuted,
              fontSize: '13px',
              fontWeight: 700,
              cursor: isConfirmed ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
              opacity: isConfirmed ? 1 : 0.6,
            }}
          >
            {config.buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
