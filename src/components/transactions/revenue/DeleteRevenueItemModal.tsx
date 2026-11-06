'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DeleteRevenueItemModalProps {
  isOpen: boolean;
  itemType: 'revenue rule' | 'promotion' | 'subscription';
  itemName?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLightMode?: boolean;
}

export const DeleteRevenueItemModal: React.FC<DeleteRevenueItemModalProps> = ({
  isOpen,
  itemType,
  itemName,
  onClose,
  onConfirm,
  isLightMode = false,
}) => {
  const [step, setStep] = useState<'confirm' | 'success'>('confirm');

  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';

  const capitalizedType =
    itemType === 'revenue rule'
      ? 'Revenue rule'
      : itemType === 'promotion'
      ? 'Promotion'
      : 'Subscription';

  const handleConfirmDelete = () => {
    onConfirm();
    setStep('success');
    setTimeout(() => {
      onClose();
    }, 2500);
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
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'confirm' ? (
          <>
            {/* Header: Title and Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
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
                Delete {itemType}
              </h2>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
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

            {/* Solid Red Circle with White X Icon */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.35)',
              }}
            >
              <X size={28} color="#FFFFFF" strokeWidth={3} />
            </div>

            {/* Warning messages */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p
                style={{
                  fontSize: '12.5px',
                  color: subtextColor,
                  margin: '0 0 6px 0',
                  lineHeight: 1.4,
                }}
              >
                Deleting a {itemType} removes all the data about the {itemType}
              </p>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: textColor,
                  margin: 0,
                }}
              >
                Are you sure you want to delete this {itemType}?
              </p>
            </div>

            {/* Action Buttons: Cancel and Delete */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#E5E7EB' : '#2A2A2E',
                  border: 'none',
                  color: isLightMode ? '#374151' : '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: '#DC2626',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.35)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                Delete {itemType}
              </button>
            </div>
          </>
        ) : (
          /* Step 2: Figma Image 1 Card 2 (Item deleted toast / success card) */
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
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
                {capitalizedType} deleted
              </h2>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
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

            {/* Solid Red Circle with White X Icon */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '12px auto 18px auto',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.35)',
              }}
            >
              <X size={28} color="#FFFFFF" strokeWidth={3} />
            </div>

            {/* Success message */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '13px',
                  color: subtextColor,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                You successfully deleted this {itemType}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
