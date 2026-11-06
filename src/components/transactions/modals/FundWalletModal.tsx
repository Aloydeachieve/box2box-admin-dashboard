'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface FundWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  amount?: string;
  userName?: string;
}

export const FundWalletModal: React.FC<FundWalletModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  amount = '299,950',
  userName = 'Aku Cynthia',
}) => {
  const [note, setNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#F9FAFB' : '#141416';
  const yellowColor = '#F5C842';

  const isFormValid = note.trim().length > 0;

  const handleFundWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSuccess(true);
  };

  const handleClose = () => {
    setNote('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: isSuccess ? '440px' : '460px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
            }}
          >
            {isSuccess ? 'Wallet funded' : 'Fund wallet'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${borderColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: subtextColor,
              padding: 0,
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Card 1 & 2: Form */}
        {!isSuccess ? (
          <form onSubmit={handleFundWallet} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <textarea
                value={note}
                onChange={(e) => {
                  if (e.target.value.length <= 150) {
                    setNote(e.target.value);
                  }
                }}
                placeholder="Enter note"
                rows={3}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit',
                  padding: 0,
                  width: '100%',
                }}
              />
              <div style={{ textAlign: 'right', fontSize: '11px', color: subtextColor }}>
                {note.length}/150
              </div>
            </div>

            <div style={{ fontSize: '12.5px', color: subtextColor, lineHeight: 1.4 }}>
              By funding user wallet, this user's account will be funded with{' '}
              <strong style={{ color: textColor, fontWeight: 600 }}>₦{amount}</strong>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  flex: 1,
                  padding: '11px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isLightMode ? '#E5E7EB' : '#FFFFFF',
                  color: '#000000',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isFormValid}
                style={{
                  flex: 1,
                  padding: '11px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isFormValid ? yellowColor : isLightMode ? '#E5E7EB' : '#352F17',
                  color: isFormValid ? '#000000' : isLightMode ? '#9CA3AF' : '#736B42',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: isFormValid ? '0 2px 8px rgba(245, 200, 66, 0.25)' : 'none',
                }}
              >
                <span>Fund wallet</span>
                {isFormValid && <Box2BoxPulsingBadge size={14} inverted={false} />}
              </button>
            </div>
          </form>
        ) : (
          /* Card 3: Success Modal */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 10px 16px 10px',
              gap: '16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Check size={36} color="#FFFFFF" strokeWidth={3} />
            </div>

            <div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
              Wallet funded successfully
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
