'use client';

import React, { useEffect } from 'react';
import { X, Flag, Check } from 'lucide-react';

export interface ToastProps {
  id?: string;
  type?: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
  title?: string;
  message: string;
  isLightMode?: boolean;
  onClose: () => void;
  duration?: number;
}

export const ToastNotification: React.FC<ToastProps> = ({
  type = 'success',
  title,
  message,
  isLightMode = false,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const toastBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.12)';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        backgroundColor: toastBg,
        borderRadius: '14px',
        border: `1px solid ${borderColor}`,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        minWidth: '240px',
        maxWidth: '360px',
        zIndex: 200,
        boxShadow: isLightMode
          ? '0 12px 28px rgba(0, 0, 0, 0.12)'
          : '0 16px 36px rgba(0, 0, 0, 0.65)',
        fontFamily: 'var(--font-outfit), sans-serif',
        animation: 'slideUpToast 0.25s ease-out',
        textAlign: 'center',
      }}
    >
      {/* Optional Top row with title & close button */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
          {title || (type === 'flag' ? 'Box flagged' : type === 'disable' ? 'Box disabled' : type === 'resolved' ? 'Report resolved' : 'Notification')}
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: subtextColor,
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Center Icon Graphic matching Figma Images 4 & 5 */}
      {type === 'flag' && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Flag size={26} color="#EF4444" fill="#EF4444" />
        </div>
      )}

      {type === 'disable' && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={28} color="#FFFFFF" strokeWidth={3} />
        </div>
      )}

      {(type === 'resolved' || type === 'success') && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#0D9488',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={28} color="#FFFFFF" strokeWidth={3} />
        </div>
      )}

      {/* Message Text: "You successfully flagged this box", etc. */}
      <div style={{ fontSize: '13px', color: subtextColor, lineHeight: '18px' }}>
        {message}
      </div>

      <style jsx>{`
        @keyframes slideUpToast {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
