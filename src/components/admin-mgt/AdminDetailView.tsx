'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Phone,
  Shield,
  Building2,
  Calendar,
  User,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface AdminDetailViewProps {
  adminId?: string;
}

export const AdminDetailView: React.FC<AdminDetailViewProps> = ({ adminId = 'adm-1' }) => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const [summaryPeriod, setSummaryPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);

  const [activityDuration, setActivityDuration] = useState('All');
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);

  // Design Tokens (Rule 6: Zero Extra Contrast & Natural Background)
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#1C1C20';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
      onClick={() => {
        setIsSummaryDropdownOpen(false);
        setIsActivityDropdownOpen(false);
      }}
    >
      {/* 2-Column Main Layout: Left Main Column (Profile + Summary + Activity) & Right Column (Session Log) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Admin Profile + Summary + Activity History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* 1. Admin Profile Card (Figma Image 4) */}
          <div
            style={{
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Profile Header Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Profile Avatar with Green Dot */}
              <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                <img
                  src="/image/admin-mgt.svg"
                  alt="Aku Cynthia"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `2px solid ${borderColor}`,
                  }}
                />
                {/* Active indicator dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#22C55E',
                    border: '2px solid #0D0D0E',
                  }}
                />
              </div>

              {/* Name & Active Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: textColor,
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Aku Cynthia
                </h1>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    color: '#22C55E',
                    backgroundColor: 'rgba(34, 197, 94, 0.08)',
                  }}
                >
                  Active
                </span>
              </div>
            </div>

            {/* Admin Metadata Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px 24px',
                fontSize: '12.5px',
              }}
            >
              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color={subtextColor} />
                <span style={{ color: subtextColor }}>Email</span>
                <span style={{ fontWeight: 600, color: textColor }}>akucynthia@gmail.com</span>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color={subtextColor} />
                <span style={{ color: subtextColor }}>Phone</span>
                <span style={{ fontWeight: 600, color: textColor }}>+2347095635637</span>
              </div>

              {/* Permissions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={15} color={subtextColor} />
                <span style={{ color: subtextColor }}>Permissions</span>
                <span style={{ fontWeight: 600, color: textColor }}>
                  Inventory <span style={{ color: borderColor }}>|</span> Admin <span style={{ color: borderColor }}>|</span> Support
                </span>
              </div>

              {/* Branches */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={15} color={subtextColor} />
                <span style={{ color: subtextColor }}>Branches</span>
                <span style={{ fontWeight: 600, color: textColor }}>
                  Awka <span style={{ color: borderColor }}>|</span> Lagos <span style={{ color: borderColor }}>|</span> Onitsha
                </span>
              </div>

              {/* Joined */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={15} color={subtextColor} />
                <span style={{ color: subtextColor }}>Joined</span>
                <span style={{ fontWeight: 500, color: textColor }}>Aug 02, 2024 | 11:56 AM</span>
              </div>

              {/* Added By */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={15} color={subtextColor} />
                <span style={{ color: subtextColor }}>Added by</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: textColor,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Constance Ibekwe
                </span>
              </div>

              {/* Last active */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} color={subtextColor} />
                <span style={{ color: subtextColor }}>Last active</span>
                <span style={{ fontWeight: 500, color: textColor }}>Aug 02, 2024 | 11:56 AM</span>
              </div>
            </div>
          </div>

          {/* 2. Summary Stats Section (Figma Image 4) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Header + Dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                Summary
              </h2>

              {/* Daily / Weekly / Monthly Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSummaryDropdownOpen(!isSummaryDropdownOpen);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: textColor,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <span>{summaryPeriod}</span>
                  <ChevronDown size={14} color={subtextColor} />
                </button>

                {isSummaryDropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '38px',
                      backgroundColor: dropdownBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      minWidth: '100px',
                      zIndex: 30,
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    {(['Daily', 'Weekly', 'Monthly'] as const).map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => {
                          setSummaryPeriod(period);
                          setIsSummaryDropdownOpen(false);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          padding: '6px 10px',
                          fontSize: '12px',
                          color: summaryPeriod === period ? yellowColor : textColor,
                          fontWeight: summaryPeriod === period ? 600 : 400,
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 4 Summary Stat Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '14px',
              }}
            >
              {[
                { label: 'Active duration', value: '4hrs' },
                { label: 'Total actions', value: '94' },
                { label: 'Admin impact', value: '20%' },
                { label: 'Inventory impact', value: '45%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: subtextColor }}>{stat.label}</span>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: textColor,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Activity History Section (Figma Image 4: No cards separating each message, clean natural layout) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            {/* Header + Duration Dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                Activity history
              </h2>

              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsActivityDropdownOpen(!isActivityDropdownOpen);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: textColor,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Duration</span>
                  <ChevronDown size={14} color={subtextColor} />
                </button>

                {isActivityDropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '38px',
                      backgroundColor: dropdownBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      minWidth: '110px',
                      zIndex: 30,
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    {['Today', 'This week', 'This month', 'All'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => {
                          setActivityDuration(dur);
                          setIsActivityDropdownOpen(false);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          padding: '6px 10px',
                          fontSize: '12px',
                          color: activityDuration === dur ? yellowColor : textColor,
                          fontWeight: activityDuration === dur ? 600 : 400,
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Activity Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Group 1: June 02, 2025 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
                  June 02, 2025
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { action: 'Admin added', detail: 'Uche Benjamin', time: '13:25' },
                    { action: 'Report resolved', detail: 'R-123456', time: '13:25' },
                    { action: 'Promotion created', detail: 'Weekend discount', time: '13:25' },
                    { action: 'Revenue rule created', detail: 'Delivery fee commission', time: '13:25' },
                  ].map((act, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                          {act.action}
                        </span>
                        <span style={{ fontSize: '11.5px', color: subtextColor }}>
                          {act.detail}
                        </span>
                      </div>
                      <span style={{ fontSize: '11.5px', color: subtextColor }}>{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 2: June 02, 2025 (Earlier) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
                  June 02, 2025
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { action: 'Admin added', detail: 'Uche Benjamin', time: '13:25' },
                    { action: 'Report resolved', detail: 'R-123456', time: '13:25' },
                    { action: 'Promotion created', detail: 'Weekend discount', time: '13:25' },
                  ].map((act, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                          {act.action}
                        </span>
                        <span style={{ fontSize: '11.5px', color: subtextColor }}>
                          {act.detail}
                        </span>
                      </div>
                      <span style={{ fontSize: '11.5px', color: subtextColor }}>{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Session Log (Figma Image 4: Separated by thin vertical 1px border line) */}
        <div
          style={{
            borderLeft: `1px solid ${borderColor}`,
            paddingLeft: '24px',
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
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
            Session log
          </h2>

          {/* Group 1: June 03, 2025 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              June 03, 2025
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Item 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                    Logged in
                  </span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Lagos, Nigeria</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Chrome on Windows</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#22C55E' }}>Active</span>
                </div>
              </div>

              {/* Item 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                    Logged out
                  </span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Lagos, Nigeria</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Mozilla on Windows</span>
                </div>
                <span style={{ fontSize: '11.5px', color: subtextColor }}>13:25</span>
              </div>
            </div>
          </div>

          {/* Group 2: June 01, 2025 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              June 01, 2025
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Item 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                    Logged out
                  </span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Lagos, Nigeria</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Mozilla on Windows</span>
                </div>
                <span style={{ fontSize: '11.5px', color: subtextColor }}>13:25</span>
              </div>

              {/* Item 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                    Logged in
                  </span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Lagos, Nigeria</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Chrome on Windows</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span style={{ fontSize: '11.5px', color: subtextColor }}>13:25</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#22C55E' }}>Active</span>
                </div>
              </div>

              {/* Item 3 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>
                    Logged in
                  </span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Lagos, Nigeria</span>
                  <span style={{ fontSize: '11px', color: subtextColor }}>Mozilla on Windows</span>
                </div>
                <span style={{ fontSize: '11.5px', color: subtextColor }}>13:25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
