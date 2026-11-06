'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    router.push('/login');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: isLightMode ? '#FFFFFF' : '#161619',
          borderRadius: '16px',
          border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.12)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Title on left, Close (X) button on right */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              color: isLightMode ? '#111827' : '#FFFFFF',
              margin: 0,
            }}
          >
            Log out
          </h3>
          <button
            onClick={onClose}
            title="Close"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: isLightMode ? '#6B7280' : '#8E8E93',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Center Door / Exit Graphic matching Figma Image 5 */}
        <div
          style={{
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
            {/* Door Frame & Open Door in Yellow/Dark Teal */}
            <path
              d="M14 12C14 9.79086 15.7909 8 18 8H34C36.2091 8 38 9.79086 38 12V56C38 58.2091 36.2091 60 34 60H18C15.7909 60 14 58.2091 14 56V12Z"
              fill="#F5C842"
              fillOpacity="0.85"
            />
            {/* White Arrow pointing right exiting the door */}
            <path
              d="M32 34H56M56 34L46 24M56 34L46 44"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Prompt question */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: isLightMode ? '#374151' : '#D1D1D6',
            margin: '0 0 24px 0',
            maxWidth: '260px',
            lineHeight: 1.5,
          }}
        >
          Are you sure you want to log out of your account?
        </p>

        {/* Action Buttons: Cancel (white/light) & Log out (red) */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#FFFFFF',
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#DC2626')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#EF4444')}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
