'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { RewardsStatsCards } from './RewardsStatsCards';
import { PointsTable } from './PointsTable';
import { BadgesTable } from './BadgesTable';
import { ReferralsTable } from './ReferralsTable';
import { HistoryTable } from './HistoryTable';
import { PointsFilterModal } from './PointsFilterModal';
import { ReferralsFilterModal } from './ReferralsFilterModal';
import {
  INITIAL_POINT_RULES,
  INITIAL_BADGES,
  INITIAL_REFERRALS,
  INITIAL_HISTORY,
  PointRule,
  BadgeItem,
} from '@/lib/rewardsMockData';

type RewardsTab = 'points' | 'badges' | 'referrals' | 'history';

export const RewardsConfigView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Active Tab: Points (5), Badges (34), Referrals (1), History
  const [activeTab, setActiveTab] = useState<RewardsTab>('points');

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Time Period Dropdown state
  const [timePeriod, setTimePeriod] = useState('This week');
  const [showTimePeriodDropdown, setShowTimePeriodDropdown] = useState(false);

  // Filter Modals
  const [showPointsFilterModal, setShowPointsFilterModal] = useState(false);
  const [showReferralsFilterModal, setShowReferralsFilterModal] = useState(false);

  // Table Data State
  const [pointRules, setPointRules] = useState<PointRule[]>(INITIAL_POINT_RULES);
  const [badges, setBadges] = useState<BadgeItem[]>(INITIAL_BADGES);
  const [referrals] = useState(INITIAL_REFERRALS);
  const [history] = useState(INITIAL_HISTORY);

  // Toast State
  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Styling Tokens
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const inputBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  // Toggle Handlers
  const handleTogglePointStatus = (id: string) => {
    setPointRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newStatus = !r.status;
          setActiveToast({
            type: newStatus ? 'success' : 'disable',
            title: newStatus ? 'Rule Enabled' : 'Rule Disabled',
            message: `${r.title} (${r.ruleId}) is now ${newStatus ? 'active' : 'inactive'}`,
          });
          return { ...r, status: newStatus };
        }
        return r;
      })
    );
  };

  const handleToggleBadgeStatus = (id: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const newStatus = !b.status;
          setActiveToast({
            type: newStatus ? 'success' : 'disable',
            title: newStatus ? 'Badge Enabled' : 'Badge Disabled',
            message: `${b.title || b.name || 'Badge'} (${b.ruleId || b.badgeId || ''}) is now ${newStatus ? 'active' : 'inactive'}`,
          });
          return { ...b, status: newStatus };
        }
        return b;
      })
    );
  };

  const handleViewRule = (rule: PointRule) => {
    router.push(`/rewards/rules/${rule.id}`);
  };

  const handleEditRule = (rule: PointRule) => {
    router.push(`/rewards/rules/${rule.id}/edit`);
  };

  const handleViewBadge = (badge: BadgeItem) => {
    router.push(`/rewards/badges/${badge.id}`);
  };

  const handleEditBadge = (badge: BadgeItem) => {
    router.push(`/rewards/badges/${badge.id}/edit`);
  };

  const handleFilterClick = () => {
    if (activeTab === 'points' || activeTab === 'badges') {
      setShowPointsFilterModal(true);
    } else {
      setShowReferralsFilterModal(true);
    }
  };

  // Filtered Rules
  const filteredPointRules = pointRules.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ruleId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBadges = badges.filter(
    (b) =>
      (b.title || b.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.ruleId || b.badgeId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.action || b.requirement || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReferrals = referrals.filter(
    (ref) =>
      ref.referrer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.referred.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = history.filter(
    (h) =>
      h.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
    >
      {/* 1. TOP HEADER SECTION MATCHING FIGMA IMAGE 1 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Manage points and badges
          </h1>
          <p style={{ fontSize: '13px', color: subtextColor, margin: 0 }}>
            Configure user incentive system
          </p>
        </div>

        {/* Action Buttons: New point rule (yellow + pulse) & New badge (white) & This week */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => router.push('/rewards/rules/new')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '12.5px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'opacity 0.15s ease',
            }}
          >
            <span>New point rule</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>

          <button
            type="button"
            onClick={() => router.push('/rewards/badges/new')}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#111827' : '#FFFFFF',
              color: isLightMode ? '#FFFFFF' : '#000000',
              fontWeight: 700,
              fontSize: '12.5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
          >
            New badge
          </button>

          {/* Time Period Filter Pill */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowTimePeriodDropdown(!showTimePeriodDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 14px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: textColor,
                fontSize: '12.5px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <span>{timePeriod}</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>

            {showTimePeriodDropdown && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '42px',
                  backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                  zIndex: 30,
                  minWidth: '130px',
                  padding: '4px',
                }}
              >
                {['Today', 'This week', 'This month', 'This year'].map((tp) => (
                  <div
                    key={tp}
                    onClick={() => {
                      setTimePeriod(tp);
                      setShowTimePeriodDropdown(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: timePeriod === tp ? yellowColor : textColor,
                      cursor: 'pointer',
                      borderRadius: '6px',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A2E')
                    }
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {tp}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS ROW */}
      <RewardsStatsCards isLightMode={isLightMode} />

      {/* 3. TABLE CONTROLS TOOLBAR HANGING ABOVE TABLE CARD DIRECTLY ON PAGE BACKGROUND */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '6px',
        }}
      >
        {/* Left: Tabs: Points (5), Badges (34), Referrals (1), History */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {[
            { id: 'points', label: 'Points (5)' },
            { id: 'badges', label: 'Badges (34)' },
            { id: 'referrals', label: 'Referrals (1)' },
            { id: 'history', label: 'History' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as RewardsTab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  color: isActive ? yellowColor : subtextColor,
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.15s ease',
                }}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: yellowColor,
                      borderRadius: '2px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Search Input & Filter Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 32px 7px 12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                color: textColor,
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <Search
              size={14}
              color={subtextColor}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleFilterClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: cardBg,
              color: textColor,
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <span>Filter</span>
            <ChevronDown size={14} color={subtextColor} />
          </button>
        </div>
      </div>

      {/* 4. TABLE SECTION CONTAINER (DECUPLED FROM CONTROLS) */}
      {activeTab === 'points' && (
        <PointsTable
          isLightMode={isLightMode}
          rules={filteredPointRules}
          onToggleStatus={handleTogglePointStatus}
          onViewRule={handleViewRule}
          onEditRule={handleEditRule}
        />
      )}

      {activeTab === 'badges' && (
        <BadgesTable
          isLightMode={isLightMode}
          badges={filteredBadges}
          onToggleStatus={handleToggleBadgeStatus}
          onViewBadge={handleViewBadge}
          onEditBadge={handleEditBadge}
        />
      )}

      {activeTab === 'referrals' && (
        <ReferralsTable
          isLightMode={isLightMode}
          referrals={filteredReferrals}
        />
      )}

      {activeTab === 'history' && (
        <HistoryTable
          isLightMode={isLightMode}
          history={filteredHistory}
        />
      )}

      {/* Filter Modals */}
      <PointsFilterModal
        isOpen={showPointsFilterModal}
        onClose={() => setShowPointsFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(f) => {
          setActiveToast({
            type: 'resolved',
            title: 'Filters Applied',
            message: `Filtered by ${f.app} (${f.duration})`,
          });
        }}
      />

      <ReferralsFilterModal
        isOpen={showReferralsFilterModal}
        onClose={() => setShowReferralsFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(f) => {
          setActiveToast({
            type: 'resolved',
            title: 'Filters Applied',
            message: `Filtered by ${f.actionType} | ${f.app} (${f.duration})`,
          });
        }}
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
