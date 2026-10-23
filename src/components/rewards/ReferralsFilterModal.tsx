'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface ReferralsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: { actionType: string; app: string; duration: string }) => void;
  initialActionType?: string;
  initialApp?: string;
  initialDuration?: string;
}

export const ReferralsFilterModal: React.FC<ReferralsFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
  initialActionType = 'All',
  initialApp = 'All',
  initialDuration = 'Last 30 days',
}) => {
  const [activeTab, setActiveTab] = useState<'actionType' | 'app' | 'duration'>('actionType');
  const [selectedActionType, setSelectedActionType] = useState(initialActionType);
  const [selectedApp, setSelectedApp] = useState(initialApp);
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const tabBg = isLightMode ? '#F3F4F6' : '#27272A';

  const actionTypeOptions = ['All', 'Booking', 'Order', 'Referral'];
  const appOptions = ['All', 'Owner app', 'Customer app', 'Rider app'];
  const durationOptions = ['Today', 'Last 7 days', 'Last 30 days', 'Last 60 days', 'Custom'];

  const handleSave = () => {
    onApplyFilters({
      actionType: selectedActionType,
      app: selectedApp,
      duration: selectedDuration,
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedActionType(initialActionType);
    setSelectedApp(initialApp);
    setSelectedDuration(initialDuration);
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
        zIndex: 90,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
            Filter
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

        {/* 3 Tabs: Action type, App, Duration (Text color change to yellow when active matching user instruction) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('actionType')}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 6px',
              color: activeTab === 'actionType' ? yellowColor : subtextColor,
              fontWeight: activeTab === 'actionType' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            <span>Action type</span>
            {activeTab === 'actionType' && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-9px',
                  left: '4px',
                  right: '4px',
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('app')}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 6px',
              color: activeTab === 'app' ? yellowColor : subtextColor,
              fontWeight: activeTab === 'app' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            <span>App</span>
            {activeTab === 'app' && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-9px',
                  left: '4px',
                  right: '4px',
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('duration')}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 6px',
              color: activeTab === 'duration' ? yellowColor : subtextColor,
              fontWeight: activeTab === 'duration' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            <span>Duration</span>
            {activeTab === 'duration' && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-9px',
                  left: '4px',
                  right: '4px',
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>
        </div>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '160px' }}>
          {activeTab === 'actionType' &&
            actionTypeOptions.map((opt) => {
              const isSelected = selectedActionType === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setSelectedActionType(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '2px 0',
                  }}
                >
                  <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                    {opt}
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
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: yellowColor,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

          {activeTab === 'app' &&
            appOptions.map((opt) => {
              const isSelected = selectedApp === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setSelectedApp(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '2px 0',
                  }}
                >
                  <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                    {opt}
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
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: yellowColor,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

          {activeTab === 'duration' &&
            durationOptions.map((opt) => {
              const isSelected = selectedDuration === opt;
              return (
                <div
                  key={opt}
                  onClick={() => setSelectedDuration(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '2px 0',
                  }}
                >
                  <span style={{ fontSize: '13.5px', color: textColor, fontWeight: 500 }}>
                    {opt}
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
                          width: '10px',
                          height: '10px',
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

        {/* Footer: Discard & Save filling bottom width with Box2BoxPulsingBadge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: `1px solid ${borderColor}`,
              color: textColor,
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
