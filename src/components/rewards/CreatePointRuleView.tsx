'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectAppModal } from './modals/SelectAppModal';
import { SelectUnlockRequirementModal } from './modals/SelectUnlockRequirementModal';
import { SelectEarningTypeModal } from './modals/SelectEarningTypeModal';
import { SelectMeasureModal } from './modals/SelectMeasureModal';
import { SelectTimePeriodModal } from './modals/SelectTimePeriodModal';
import { SelectRewardFrequencyModal } from './modals/SelectRewardFrequencyModal';

export const CreatePointRuleView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Form Fields State
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [selectedApp, setSelectedApp] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [earningType, setEarningType] = useState('');
  const [whatToMeasure, setWhatToMeasure] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [rewardFrequency, setRewardFrequency] = useState('');
  const [pointsReward, setPointsReward] = useState('');

  // Modals Visibility State
  const [showAppModal, setShowAppModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEarningTypeModal, setShowEarningTypeModal] = useState(false);
  const [showMeasureModal, setShowMeasureModal] = useState(false);
  const [showTimePeriodModal, setShowTimePeriodModal] = useState(false);
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);

  // Toast Notification State
  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Theme Colors and Tokens
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const innerInputBg = isLightMode ? '#F9FAFB' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const placeholderColor = isLightMode ? '#9CA3AF' : '#666666';
  const yellowColor = '#F5C842';

  const isFormFilled = Boolean(ruleName.trim());

  const handleSaveAndExit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    setActiveToast({
      type: 'success',
      title: 'Rule Created',
      message: `Point rule "${ruleName}" created successfully`,
    });
    setTimeout(() => {
      router.push('/rewards');
    }, 1200);
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    setActiveToast({
      type: 'success',
      title: 'Rule Saved',
      message: `Point rule saved. You may configure additional rules.`,
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
      {/* LEFT COLUMN: THE 5 SECTION CARDS */}
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
        {/* CARD 1: Rule Overview */}
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
            Rule Overview
          </h2>

          {/* Row 1: Rule name & Rule description */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input
                type="text"
                placeholder="Rule name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
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
                placeholder="Rule description"
                value={ruleDescription}
                onChange={(e) => setRuleDescription(e.target.value)}
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

          {/* Row 2: App Selection Dropdown in Column 1 */}
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
            <div />
          </div>
        </div>

        {/* CARD 2: Action Selection (Stand-alone Card) */}
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
            Action Selection
          </h2>

          <div
            onClick={() => setShowActionModal(true)}
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
            <span style={{ color: selectedAction ? textColor : subtextColor }}>
              {selectedAction || 'What action should trigger points?'}
            </span>
            <ChevronDown size={16} color={subtextColor} />
          </div>
        </div>

        {/* CARD 3: Earning Type (Stand-alone Card) */}
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
            Earning Type
          </h2>

          <div
            onClick={() => setShowEarningTypeModal(true)}
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
            <span style={{ color: earningType ? textColor : subtextColor }}>
              {earningType || 'How should points be earned?'}
            </span>
            <ChevronDown size={16} color={subtextColor} />
          </div>
        </div>

        {/* CARD 4: Set Requirement */}
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
            Set Requirement
          </h2>

          {/* Row 1: What should be measured? & Set target */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setShowMeasureModal(true)}
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
                <span style={{ color: whatToMeasure ? textColor : subtextColor }}>
                  {whatToMeasure || 'What should be measured?'}
                </span>
                <ChevronDown size={16} color={subtextColor} />
              </div>
              <span style={{ fontSize: '11px', color: placeholderColor, paddingLeft: '2px' }}>
                e.g., Number of bookings, Total amount spent, Percentage level
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input
                type="text"
                placeholder="Set target"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
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
              <span style={{ fontSize: '11px', color: placeholderColor, paddingLeft: '2px' }}>
                e.g., Number → 5, Currency → ₦15,000, Percentage → 80%
              </span>
            </div>
          </div>

          {/* Row 2: Time Period & How often can this reward be earned? */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setShowTimePeriodModal(true)}
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
                <span style={{ color: timePeriod ? textColor : subtextColor }}>
                  {timePeriod || 'Time Period'}
                </span>
                <ChevronDown size={16} color={subtextColor} />
              </div>
              <span style={{ fontSize: '11px', color: placeholderColor, paddingLeft: '2px' }}>
                e.g., Once, Custom
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={() => setShowFrequencyModal(true)}
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
                <span style={{ color: rewardFrequency ? textColor : subtextColor }}>
                  {rewardFrequency || 'How often can this reward be earned?'}
                </span>
                <ChevronDown size={16} color={subtextColor} />
              </div>
              <span style={{ fontSize: '11px', color: placeholderColor, paddingLeft: '2px' }}>
                e.g., Once ever, Once per day
              </span>
            </div>
          </div>
        </div>

        {/* CARD 5: Points Reward */}
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
          {isFormFilled ? (
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
            disabled={!isFormFilled}
            onClick={handleSaveAndContinue}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#27272A',
              border: `1px solid ${borderColor}`,
              color: !isFormFilled
                ? isLightMode
                  ? '#9CA3AF'
                  : '#555555'
                : isLightMode
                ? '#111827'
                : '#FFFFFF',
              fontWeight: 600,
              fontSize: '13px',
              cursor: !isFormFilled ? 'not-allowed' : 'pointer',
              opacity: !isFormFilled ? 0.6 : 1,
              transition: 'all 0.15s ease',
            }}
          >
            Save & Continue
          </button>
        </div>
      </form>

      {/* RIGHT COLUMN: Only text written "Rule summary" with empty space below matching Figma */}
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
          Rule summary
        </span>
      </div>

      {/* Modals for the Form */}
      <SelectAppModal
        isOpen={showAppModal}
        onClose={() => setShowAppModal(false)}
        isLightMode={isLightMode}
        selectedApp={selectedApp}
        onSelectApp={(app) => setSelectedApp(app)}
      />

      <SelectUnlockRequirementModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        isLightMode={isLightMode}
        selectedRequirement={selectedAction}
        onSelectRequirement={(action) => setSelectedAction(action)}
      />

      <SelectEarningTypeModal
        isOpen={showEarningTypeModal}
        onClose={() => setShowEarningTypeModal(false)}
        isLightMode={isLightMode}
        selectedType={earningType}
        onSelectType={(type) => setEarningType(type)}
      />

      <SelectMeasureModal
        isOpen={showMeasureModal}
        onClose={() => setShowMeasureModal(false)}
        isLightMode={isLightMode}
        selectedMeasure={whatToMeasure}
        onSelectMeasure={(measure) => setWhatToMeasure(measure)}
      />

      <SelectTimePeriodModal
        isOpen={showTimePeriodModal}
        onClose={() => setShowTimePeriodModal(false)}
        isLightMode={isLightMode}
        selectedPeriod={timePeriod}
        onSelectPeriod={(period) => setTimePeriod(period)}
      />

      <SelectRewardFrequencyModal
        isOpen={showFrequencyModal}
        onClose={() => setShowFrequencyModal(false)}
        isLightMode={isLightMode}
        selectedFrequency={rewardFrequency}
        onSelectFrequency={(freq) => setRewardFrequency(freq)}
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
