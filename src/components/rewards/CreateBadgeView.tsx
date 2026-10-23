'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectAppModal } from './modals/SelectAppModal';
import { SelectTimePeriodModal } from './modals/SelectTimePeriodModal';
import { SelectMeasureModal } from './modals/SelectMeasureModal';
import { SelectUnlockRequirementModal } from './modals/SelectUnlockRequirementModal';

export const CreateBadgeView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [badgeImage, setBadgeImage] = useState<string | null>(null);

  // Form Fields State
  const [badgeName, setBadgeName] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [selectedApp, setSelectedApp] = useState('Customer app');
  const [selectedAction, setSelectedAction] = useState('Booking');
  const [whatToMeasure, setWhatToMeasure] = useState('Number of actions');
  const [targetValue, setTargetValue] = useState('5');
  const [timePeriod, setTimePeriod] = useState('No limits');
  const [pointsReward, setPointsReward] = useState('500');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBadgeImage(url);
    }
  };

  // Modals Visibility State
  const [showAppModal, setShowAppModal] = useState(false);
  const [showTimePeriodModal, setShowTimePeriodModal] = useState(false);
  const [showMeasureModal, setShowMeasureModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  // Toast Notification State
  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Colors and Tokens
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const innerInputBg = isLightMode ? '#F9FAFB' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const handleSaveAndExit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Badge Created',
      message: `Badge "${badgeName || 'New Badge'}" created successfully`,
    });
    setTimeout(() => {
      router.push('/rewards');
    }, 1200);
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Badge Saved',
      message: `Badge saved. You may configure additional properties or another badge.`,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        width: '100%',
        alignItems: 'flex-start',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
    >
      {/* LEFT COLUMN: THE 3 SECTION CARDS */}
      <form
        onSubmit={handleSaveAndExit}
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* CARD 1: Badge Overview */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Badge Overview
          </h2>

          {/* Row 1: Badge name & Badge description */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input
                type="text"
                placeholder="Badge name"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  color: textColor,
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input
                type="text"
                placeholder="Badge description"
                value={badgeDescription}
                onChange={(e) => setBadgeDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  color: textColor,
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Row 2: App Selection Dropdown in Column 1 under Badge name matching Figma */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setShowAppModal(true)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  color: textColor,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ color: selectedApp ? textColor : subtextColor }}>
                  {selectedApp || 'App'}
                </span>
                <ChevronDown size={16} color={subtextColor} />
              </div>
            </div>
            {/* Column 2 empty */}
            <div />
          </div>

          {/* Row 3: Square + button or Image Preview in Column 1 */}
          <div style={{ position: 'relative', width: 'fit-content' }}>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            {badgeImage ? (
              <div
                style={{
                  position: 'relative',
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  border: `1.5px solid ${yellowColor}`,
                  backgroundColor: innerInputBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  boxSizing: 'border-box',
                }}
              >
                <img
                  src={badgeImage}
                  alt="Badge icon"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <button
                  type="button"
                  onClick={() => setBadgeImage(null)}
                  title="Remove image"
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.15)',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Choose badge picture"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  color: subtextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = yellowColor)}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = borderColor)}
              >
                <Plus size={18} />
              </button>
            )}
          </div>
        </div>

        {/* CARD 2: Unlock Requirement */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Unlock Requirement
          </h2>

          {/* Row 1: What should users do to unlock this badge? & What should be measured? */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* What should users do? */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setShowUnlockModal(true)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    What should users do to unlock this badge?
                  </span>
                  <span style={{ fontSize: '13px', color: selectedAction ? textColor : subtextColor, fontWeight: 500 }}>
                    {selectedAction || 'Select action'}
                  </span>
                </div>
                <ChevronDown size={16} color={subtextColor} />
              </div>
            </div>

            {/* What should be measured? */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setShowMeasureModal(true)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    What should be measured?
                  </span>
                  <span style={{ fontSize: '13px', color: whatToMeasure ? textColor : subtextColor, fontWeight: 500 }}>
                    {whatToMeasure || 'e.g., Number of bookings, Total amount spent'}
                  </span>
                </div>
                <ChevronDown size={16} color={subtextColor} />
              </div>
              <span style={{ fontSize: '11px', color: subtextColor, paddingLeft: '4px' }}>
                e.g., Number of bookings, Total amount spent, Percentage level
              </span>
            </div>
          </div>

          {/* Row 2: Set target & Time Period */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Set target */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontSize: '11px', color: subtextColor }}>
                  Set target
                </span>
                <input
                  type="text"
                  placeholder="e.g. 5"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: textColor,
                    fontSize: '13px',
                    fontWeight: 500,
                    outline: 'none',
                    padding: 0,
                    width: '100%',
                  }}
                />
              </div>
              <span style={{ fontSize: '11px', color: subtextColor, paddingLeft: '4px' }}>
                e.g., Number → 5, Currency → ₦15,000, Percentage → 80%
              </span>
            </div>

            {/* Time Period */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setShowTimePeriodModal(true)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerInputBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    Time Period
                  </span>
                  <span style={{ fontSize: '13px', color: timePeriod ? textColor : subtextColor, fontWeight: 500 }}>
                    {timePeriod || 'e.g., Once, Custom'}
                  </span>
                </div>
                <ChevronDown size={16} color={subtextColor} />
              </div>
              <span style={{ fontSize: '11px', color: subtextColor, paddingLeft: '4px' }}>
                e.g., Once, Custom
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: Points Reward */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Points Reward
          </h2>

          <div
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: `1px solid ${borderColor}`,
              backgroundColor: innerInputBg,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ fontSize: '11px', color: subtextColor }}>
              Points to award
            </span>
            <input
              type="text"
              placeholder="e.g. 500"
              value={pointsReward}
              onChange={(e) => setPointsReward(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: textColor,
                fontSize: '13px',
                fontWeight: 600,
                outline: 'none',
                padding: 0,
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS: Save & Exit & Save & Continue (inactive until form is filled) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
          {badgeName.trim() ? (
            <button
              type="submit"
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                backgroundColor: yellowColor,
                color: '#000000',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Save & Exit</span>
              <Box2BoxPulsingBadge size={14} inverted={false} />
            </button>
          ) : (
            <button
              type="button"
              disabled
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#E5E7EB' : '#352F17',
                color: isLightMode ? '#9CA3AF' : '#736B42',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'none',
              }}
            >
              <span>Save & Exit</span>
            </button>
          )}

          <button
            type="button"
            disabled={!badgeName.trim()}
            onClick={handleSaveAndContinue}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#27272A',
              border: `1px solid ${borderColor}`,
              color: !badgeName.trim()
                ? isLightMode
                  ? '#9CA3AF'
                  : '#555555'
                : isLightMode
                ? '#111827'
                : '#FFFFFF',
              fontWeight: 600,
              fontSize: '13px',
              cursor: !badgeName.trim() ? 'not-allowed' : 'pointer',
              opacity: !badgeName.trim() ? 0.6 : 1,
              transition: 'all 0.15s ease',
            }}
          >
            Save & Continue
          </button>
        </div>
      </form>

      {/* RIGHT COLUMN: Only text written "Badge summary" with empty space below matching Figma */}
      <div
        style={{
          width: '260px',
          flexShrink: 0,
          paddingTop: '6px',
          paddingLeft: '24px',
          borderLeft: `1px solid ${borderColor}`,
          alignSelf: 'stretch',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: subtextColor,
            letterSpacing: '0.01em',
          }}
        >
          Badge summary
        </span>
      </div>

      {/* 4 Modals for the Form */}
      <SelectAppModal
        isOpen={showAppModal}
        onClose={() => setShowAppModal(false)}
        isLightMode={isLightMode}
        selectedApp={selectedApp}
        onSelectApp={(app) => setSelectedApp(app)}
      />

      <SelectTimePeriodModal
        isOpen={showTimePeriodModal}
        onClose={() => setShowTimePeriodModal(false)}
        isLightMode={isLightMode}
        selectedPeriod={timePeriod}
        onSelectPeriod={(period) => setTimePeriod(period)}
      />

      <SelectMeasureModal
        isOpen={showMeasureModal}
        onClose={() => setShowMeasureModal(false)}
        isLightMode={isLightMode}
        selectedMeasure={whatToMeasure}
        onSelectMeasure={(measure) => setWhatToMeasure(measure)}
      />

      <SelectUnlockRequirementModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        isLightMode={isLightMode}
        selectedRequirement={selectedAction}
        onSelectRequirement={(req) => setSelectedAction(req)}
      />

      {/* Toast Notification */}
      {activeToast && (
        <ToastNotification
          type={activeToast.type}
          title={activeToast.title}
          message={activeToast.message}
          isLightMode={isLightMode}
          onClose={() => setActiveToast(null)}
        />
      )}
    </div>
  );
};
