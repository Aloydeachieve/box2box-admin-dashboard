'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface SelectAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  selectedApp: string;
  onSelectApp: (app: string) => void;
}

const APPS = ['Owner App', 'Customer App', 'Rider App'];

export const SelectAppModal: React.FC<SelectAppModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  selectedApp,
  onSelectApp,
}) => {
  const [selectedApps, setSelectedApps] = useState<string[]>(['Customer App']);

  useEffect(() => {
    if (selectedApp) {
      if (selectedApp.toLowerCase() === 'all') {
        setSelectedApps([...APPS]);
      } else {
        const found = APPS.filter((a) => selectedApp.toLowerCase().includes(a.toLowerCase().split(' ')[0]));
        setSelectedApps(found.length > 0 ? found : ['Customer App']);
      }
    }
  }, [selectedApp, isOpen]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const isAllSelected = APPS.every((app) => selectedApps.includes(app));

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedApps([]);
    } else {
      setSelectedApps([...APPS]);
    }
  };

  const toggleApp = (app: string) => {
    if (selectedApps.includes(app)) {
      setSelectedApps(selectedApps.filter((a) => a !== app));
    } else {
      setSelectedApps([...selectedApps, app]);
    }
  };

  const handleSave = () => {
    if (selectedApps.length === APPS.length) {
      onSelectApp('All');
    } else if (selectedApps.length === 1) {
      onSelectApp(selectedApps[0]);
    } else if (selectedApps.length > 1) {
      onSelectApp(selectedApps.join(', '));
    } else {
      onSelectApp('Customer App');
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '360px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header matching Figma Image 3 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
            Select App
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
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
            <X size={14} />
          </button>
        </div>

        {/* Divider line under header matching Figma Image 3 */}
        <div style={{ width: '100%', height: '1px', backgroundColor: borderColor }} />

        {/* Checkbox options list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* 'All' option */}
          <div
            onClick={toggleAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 0',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
              All
            </span>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: isAllSelected
                  ? `1px solid ${yellowColor}`
                  : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
                backgroundColor: isAllSelected ? yellowColor : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              {isAllSelected && <Check size={13} color="#000000" strokeWidth={3} />}
            </div>
          </div>

          {/* Individual App options */}
          {APPS.map((app) => {
            const isChecked = selectedApps.includes(app);
            return (
              <div
                key={app}
                onClick={() => toggleApp(app)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                  {app}
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isChecked
                      ? `1px solid ${yellowColor}`
                      : `1.5px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
                    backgroundColor: isChecked ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer buttons filling the bottom width matching Figma Image 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#2C2C30',
              border: 'none',
              color: isLightMode ? '#111827' : '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'opacity 0.15s ease',
            }}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>
        </div>
      </div>
    </div>
  );
};
