'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, Trash2, UserX, UserCheck } from 'lucide-react';

export type UserActionType = 'suspend' | 'delete' | 'reactivate';

interface UserConfirmModalProps {
  isOpen: boolean;
  actionType: UserActionType;
  isBulk?: boolean;
  userCount?: number;
  userName?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLightMode?: boolean;
}

export const UserConfirmModal: React.FC<UserConfirmModalProps> = ({
  isOpen,
  actionType,
  isBulk = false,
  userCount = 1,
  userName = 'this user',
  onClose,
  onConfirm,
  isLightMode = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  // Required keyword based on action and whether it's bulk
  const expectedKeyword = isBulk
    ? actionType === 'suspend'
      ? 'suspend all'
      : actionType === 'delete'
      ? 'delete all'
      : 'reactivate all'
    : actionType === 'suspend'
    ? 'suspend'
    : actionType === 'delete'
    ? 'delete'
    : 'reactivate';

  const isConfirmed = inputValue.trim().toLowerCase() === expectedKeyword.toLowerCase();

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen, actionType]);

  if (!isOpen) return null;

  // Visual assets matching Figma Image 1 & 3
  const getModalConfig = () => {
    switch (actionType) {
      case 'suspend':
        return {
          title: isBulk ? 'Suspend selected users' : 'Suspend user',
          warning1: isBulk
            ? 'Suspending these users makes them unable to use their app.'
            : 'Suspending a user makes them unable to use their app.',
          warning2: isBulk
            ? `Are you sure you want to suspend these ${userCount} users?`
            : `Are you sure you want to suspend ${userName}?`,
          buttonLabel: isBulk ? 'Suspend users' : 'Suspend user',
          buttonBg: '#991B1B',
          buttonHoverBg: '#DC2626',
          buttonTextColor: '#FFFFFF',
          icon: (
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#2A200B',
                border: '2px solid #F5C842',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                position: 'relative',
              }}
            >
              <UserX size={32} color="#F5C842" />
            </div>
          ),
        };
      case 'delete':
        return {
          title: isBulk ? 'Delete selected users' : 'Delete user',
          warning1: isBulk
            ? 'Deleting these users removes their data from the database.'
            : 'Deleting a user removes their data from the database.',
          warning2: isBulk
            ? `Are you sure you want to delete these ${userCount} users?`
            : `Are you sure you want to delete ${userName}?`,
          buttonLabel: isBulk ? 'Delete users' : 'Delete user',
          buttonBg: '#991B1B',
          buttonHoverBg: '#DC2626',
          buttonTextColor: '#FFFFFF',
          icon: (
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)',
              }}
            >
              <X size={34} color="#FFFFFF" strokeWidth={2.5} />
            </div>
          ),
        };
      case 'reactivate':
        return {
          title: isBulk ? 'Reactivate selected users' : 'Reactivate user',
          warning1: isBulk
            ? 'Reactivating these users allows them access to their account.'
            : 'Reactivating a user allows them access to their account.',
          warning2: isBulk
            ? `Are you sure you want to reactivate these ${userCount} users?`
            : `Are you sure you want to reactivate ${userName}?`,
          buttonLabel: isBulk ? 'Reactivate users' : 'Reactivate user',
          buttonBg: '#F5C842',
          buttonHoverBg: '#E5B832',
          buttonTextColor: '#000000',
          icon: (
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
              }}
            >
              <Check size={34} color="#FFFFFF" strokeWidth={3} />
            </div>
          ),
        };
    }
  };

  const config = getModalConfig();

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
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: isLightMode ? '#FFFFFF' : '#141416',
          borderRadius: '16px',
          border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          animation: 'modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: isLightMode ? '#111827' : '#FFFFFF',
              margin: 0,
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            {config.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: isLightMode ? '#6B7280' : '#8E8E93',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Icon */}
        {config.icon}

        {/* Keyword Input Box */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder={`Type '${expectedKeyword}' to continue`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              height: '44px',
              backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
              border: isConfirmed
                ? '1px solid #F5C842'
                : isLightMode
                ? '1px solid #D1D5DB'
                : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              padding: '0 14px',
              color: isLightMode ? '#111827' : '#FFFFFF',
              fontSize: '13px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Warning messages */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p
            style={{
              fontSize: '12px',
              color: isLightMode ? '#4B5563' : '#A1A1AA',
              margin: '0 0 6px 0',
              lineHeight: 1.4,
            }}
          >
            {config.warning1}
          </p>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: isLightMode ? '#111827' : '#FFFFFF',
              margin: 0,
            }}
          >
            {config.warning2}
          </p>
        </div>

        {/* Action Buttons: Cancel and Confirm */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              height: '42px',
              borderRadius: '10px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#2A2A2E',
              border: 'none',
              color: isLightMode ? '#374151' : '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#D1D5DB' : '#333338')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#E5E7EB' : '#2A2A2E')}
          >
            Cancel
          </button>

          <button
            disabled={!isConfirmed}
            onClick={() => {
              if (isConfirmed) {
                onConfirm();
              }
            }}
            style={{
              height: '42px',
              borderRadius: '10px',
              backgroundColor: isConfirmed ? config.buttonBg : isLightMode ? '#F3F4F6' : '#252528',
              border: 'none',
              color: isConfirmed ? config.buttonTextColor || '#FFFFFF' : '#71717A',
              fontSize: '13px',
              fontWeight: 700,
              cursor: isConfirmed ? 'pointer' : 'not-allowed',
              opacity: isConfirmed ? 1 : 0.45,
              transition: 'all 0.15s ease',
              boxShadow: isConfirmed ? '0 4px 12px rgba(0, 0, 0, 0.25)' : 'none',
            }}
          >
            {config.buttonLabel}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
