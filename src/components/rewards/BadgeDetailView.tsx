'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { PointsFilterModal } from './PointsFilterModal';

interface BadgeDetailViewProps {
  badgeId: string;
}

export const BadgeDetailView: React.FC<BadgeDetailViewProps> = ({ badgeId }) => {
  const router = useRouter();
  const { isLightMode, setHeaderActions, setCustomBack } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isBadgeActive, setIsBadgeActive] = useState(true);

  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const innerCardBg = isLightMode ? '#F9FAFB' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const greenColor = '#22C55E';

  // Configure Header Actions for the Top Header
  useEffect(() => {
    setHeaderActions([
      {
        label: 'Edit',
        onClick: () => router.push(`/rewards/badges/${badgeId}/edit`),
      },
      {
        label: 'Status',
        hasToggle: true,
        isToggled: !isBadgeActive,
        onClick: () => {
          setIsBadgeActive((prev) => {
            const next = !prev;
            setActiveToast({
              type: next ? 'success' : 'disable',
              title: 'Status Updated',
              message: `Badge status changed to ${next ? 'Active' : 'Inactive'}`,
            });
            return next;
          });
        },
      },
    ]);

    setCustomBack(() => () => router.push('/rewards'));

    return () => {
      setHeaderActions([]);
      setCustomBack(null);
    };
  }, [badgeId, isBadgeActive, router, setHeaderActions, setCustomBack]);

  // Mock table items matching Figma Image 4
  const unlockHistoryItems = [
    {
      id: 'uh-1',
      user: {
        name: 'Akuagwuagwu Mmerichukwu',
        phone: '08156724558',
        email: 'ae@gmail.com',
      },
      userType: 'Customer',
      ruleAtUnlock: 'Complete 3 order',
      pointsAwarded: 1,
      date: 'Jun 12, 2025 | 11:15 AM',
    },
    {
      id: 'uh-2',
      user: {
        name: 'Odoh Cynthia',
        phone: '08156724558',
        email: 'ae@gmail.com',
      },
      userType: 'Owner',
      ruleAtUnlock: 'Complete 10 orders',
      pointsAwarded: 1,
      date: 'Jun 10, 2025 | 11:15 AM',
    },
  ];

  const filteredHistory = unlockHistoryItems.filter(
    (item) =>
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ruleAtUnlock.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* LEFT COLUMN: Badge Info Card + Unlock History Table & Stats */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* 1. TOP CARD: Badge Overview matching Figma Image 4 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
          }}
        >
          {/* Medal SVG Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <img
              src="/image/medal.svg"
              alt="Medal Badge"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flex: 1,
            }}
          >
            {/* Title Row with Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: textColor,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Starter
              </h1>
              <span
                style={{
                  backgroundColor: isBadgeActive
                    ? 'rgba(34, 197, 94, 0.15)'
                    : 'rgba(239, 68, 68, 0.15)',
                  color: isBadgeActive ? greenColor : '#EF4444',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  textTransform: 'capitalize',
                }}
              >
                {isBadgeActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: subtextColor, margin: 0 }}>
              Description of badge
            </p>

            <div
              style={{
                fontSize: '12.5px',
                fontWeight: 600,
                color: textColor,
              }}
            >
              Earned after completing 3 orders
            </div>

            {/* Properties Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                fontSize: '12px',
                paddingTop: '6px',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Action Required</span>
                <span style={{ fontWeight: 600, color: textColor }}>Complete orders</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Applicable App</span>
                <span style={{ fontWeight: 600, color: textColor }}>
                  Rider | Customer | Owner
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Date Created</span>
                <span style={{ fontWeight: 600, color: textColor }}>
                  March 15, 2026 | 11:10 AM
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Created By</span>
                <span style={{ fontWeight: 600, color: textColor }}>
                  March 15, 2026 | 11:10 AM
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ color: subtextColor }}>Last Updated</span>
                <span style={{ fontWeight: 600, color: textColor }}>
                  March 15, 2026 | 11:10 AM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. UNLOCK HISTORY TOOLBAR: Hangs Cleanly ABOVE Table on Page Background */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <h2
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#F5C842',
              margin: 0,
            }}
          >
            Unlock history
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: innerCardBg,
                border: `1px solid ${borderColor}`,
                width: '220px',
              }}
            >
              <Search size={15} color={subtextColor} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '12.5px',
                  outline: 'none',
                  width: '100%',
                }}
              />
            </div>

            {/* Filter Dropdown Button */}
            <button
              type="button"
              onClick={() => setShowFilterModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: innerCardBg,
                border: `1px solid ${borderColor}`,
                color: textColor,
                fontSize: '12.5px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <span>Filter</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>
          </div>
        </div>

        {/* 3. 5 STAT CARDS matching Figma Image 4 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
          }}
        >
          {[
            { label: 'Total Points to Earn', value: '2', change: '+12% today' },
            { label: 'Total Points Earned', value: '40,000', change: '+12% today' },
            { label: 'Users Unlocked', value: '20,000', change: '+4% today' },
            { label: 'Unlock Rate', value: '25%', change: null },
            { label: 'Avg. Time to Unlock', value: '6 Days', change: '+4% today' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: cardBg,
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                {stat.label}
              </span>
              <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>
                {stat.value}
              </div>
              {stat.change && (
                <span style={{ fontSize: '11px', color: greenColor, fontWeight: 600 }}>
                  {stat.change}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 4. UNLOCK HISTORY TABLE CONTAINER (Decoupled Rule) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                minWidth: '700px',
              }}
            >
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>User</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>User Type</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Rule at Unlock</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Points Awarded</th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.03)')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    {/* User */}
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#374151',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src="/image/order.svg"
                            alt={item.user.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                            {item.user.name}
                          </span>
                          <span style={{ fontSize: '11px', color: subtextColor }}>
                            {item.user.phone}
                          </span>
                          <span style={{ fontSize: '11px', color: subtextColor }}>
                            {item.user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* User Type */}
                    <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor }}>
                      {item.userType}
                    </td>

                    {/* Rule at Unlock */}
                    <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor }}>
                      {item.ruleAtUnlock}
                    </td>

                    {/* Points Awarded */}
                    <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor, fontWeight: 700 }}>
                      {item.pointsAwarded}
                    </td>

                    {/* Date */}
                    <td style={{ padding: '14px 14px', fontSize: '12px', color: subtextColor }}>
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <span>1 - 100 of 5,000,045</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerCardBg,
                  color: subtextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: innerCardBg,
                  color: textColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Activity History Panel matching Figma Image 4 */}
      <div
        style={{
          width: '280px',
          flexShrink: 0,
          borderLeft: `1px solid ${borderColor}`,
          paddingLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignSelf: 'stretch',
        }}
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
          }}
        >
          Activity history
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Item 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
              Points to earn updated
            </span>
            <span style={{ fontSize: '12px', color: subtextColor }}>
              2 → 5
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: subtextColor,
                marginTop: '4px',
              }}
            >
              <span>System</span>
              <span>Auto</span>
            </div>
            <span style={{ fontSize: '11px', color: subtextColor }}>
              March 15, 2026 | 13:25
            </span>
          </div>

          {/* Item 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
              Earning requirement updated
            </span>
            <span style={{ fontSize: '12px', color: subtextColor }}>
              ₦1,500 → ₦3,000
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: subtextColor,
                marginTop: '4px',
              }}
            >
              <span>Aku Cynthia</span>
              <span>Admin</span>
            </div>
            <span style={{ fontSize: '11px', color: subtextColor }}>
              March 15, 2026 | 13:25
            </span>
          </div>

          {/* Item 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
              Badge created
            </span>
            <span style={{ fontSize: '12px', color: subtextColor }}>
              Starter Badge created
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: subtextColor,
                marginTop: '4px',
              }}
            >
              <span>Aku Cynthia</span>
              <span>Admin</span>
            </div>
            <span style={{ fontSize: '11px', color: subtextColor }}>
              March 15, 2026 | 13:25
            </span>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <PointsFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(f) => {
          setActiveToast({
            type: 'resolved',
            title: 'Filters Applied',
            message: `Filtered by ${f.app} (${f.duration})`,
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
