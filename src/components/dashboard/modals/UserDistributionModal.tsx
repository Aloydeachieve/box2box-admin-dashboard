'use client';

import React from 'react';
import { X, Users } from 'lucide-react';

interface UserDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export const UserDistributionModal: React.FC<UserDistributionModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
}) => {
  if (!isOpen) return null;

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
            marginBottom: '28px',
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
            User distribution
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

        {/* Center Yellow Icon matching Figma Image 5 */}
        <div
          style={{
            width: '84px',
            height: '84px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            color: '#F5C842',
          }}
        >
          <Users size={60} strokeWidth={1.5} color="#F5C842" />
        </div>

        {/* Informative prompt text */}
        <p
          style={{
            fontSize: '12px',
            lineHeight: 1.6,
            color: isLightMode ? '#4B5563' : '#A0A0A5',
            margin: '0 0 10px 0',
            maxWidth: '300px',
          }}
        >
          User distribution shows you the percentage of Box2Box users who are riders, customers and box owners.
        </p>
      </div>
    </div>
  );
};
