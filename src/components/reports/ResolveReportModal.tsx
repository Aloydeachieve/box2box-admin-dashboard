'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ResolveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  isLightMode?: boolean;
  onResolvedSuccess?: () => void;
}

export const ResolveReportModal: React.FC<ResolveReportModalProps> = ({
  isOpen,
  onClose,
  reportId,
  isLightMode = false,
  onResolvedSuccess,
}) => {
  const [statement, setStatement] = useState('');
  const [isResolved, setIsResolved] = useState(false);

  if (!isOpen) return null;

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#1C1C20';

  const handleResolve = () => {
    if (!statement.trim()) return;
    setIsResolved(true);
    onResolvedSuccess?.();
  };

  const handleModalClose = () => {
    setIsResolved(false);
    setStatement('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={handleModalClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '420px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isLightMode
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'scaleIn 0.2s ease-out',
        }}
      >
        {!isResolved ? (
          <>
            {/* Header with Title & Close X */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>Resolve report</h3>
              <button
                onClick={handleModalClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Textarea for concluding statement */}
            <div style={{ position: 'relative' }}>
              <textarea
                value={statement}
                onChange={(e) => {
                  if (e.target.value.length <= 150) {
                    setStatement(e.target.value);
                  }
                }}
                placeholder="Enter concluding statement"
                rows={4}
                style={{
                  width: '100%',
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'none',
                  fontFamily: 'inherit',
                  lineHeight: '1.5',
                }}
              />
              <div
                style={{
                  fontSize: '11px',
                  color: subtextColor,
                  textAlign: 'right',
                  marginTop: '4px',
                }}
              >
                {statement.length}/150
              </div>
            </div>

            {/* Disclaimer text matching Figma Image 3 */}
            <div style={{ fontSize: '12px', color: subtextColor, lineHeight: '18px' }}>
              By resolving this report you confirm that the issues around this report have been resolved
            </div>

            {/* Buttons: Cancel & Resolve report */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={handleModalClose}
                style={{
                  flex: 1,
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
                  border: 'none',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleResolve}
                disabled={!statement.trim()}
                style={{
                  flex: 1,
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: statement.trim() ? '#F5C842' : isLightMode ? '#E5E7EB' : '#332E1A',
                  border: 'none',
                  color: statement.trim() ? '#000000' : isLightMode ? '#9CA3AF' : '#736B42',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: statement.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.15s ease',
                }}
              >
                Resolve report
              </button>
            </div>
          </>
        ) : (
          /* Success Dialog matching Figma Image 3 "Report resolved" */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>Report resolved</h3>
              <button
                onClick={handleModalClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Teal Checkmark Circle */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Check size={36} color="#FFFFFF" strokeWidth={3} />
            </div>

            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: subtextColor }}>
              Report resolved successfully
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
