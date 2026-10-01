'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  Box,
  Coins,
  Gift,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  TrendingUp,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock3,
  X,
} from 'lucide-react';
import { UserProfileFilterModal } from './UserProfileFilterModal';

interface UserProfileDetailViewProps {
  userId: string;
  onBack: () => void;
  isLightMode?: boolean;
  onSeeMoreActivity?: () => void;
  onSelectActivity?: (id: string) => void;
}

export const UserProfileDetailView: React.FC<UserProfileDetailViewProps> = ({
  userId,
  onBack,
  isLightMode = false,
  onSeeMoreActivity,
  onSelectActivity,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'boxes' | 'wallet' | 'rewards' | 'referrals' | 'reports'>('bookings');
  const [timePeriod, setTimePeriod] = useState('Daily');
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('Today');

  const cardBg = isLightMode ? '#FFFFFF' : '#161619';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  // Sub-tabs list matching Figma Image 4 & 5
  const subTabs = [
    { id: 'bookings', label: 'Bookings' },
    { id: 'boxes', label: 'Boxes' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'referrals', label: 'Referrals' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%', minHeight: '100%', paddingBottom: '80px' }}>
      {/* Main Left Content: Profile, Summary, Charts, Tabs & Tables */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* 1. User Profile Details Banner Card matching Figma Image 1 & 4 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: cardBorder,
            padding: '16px 20px',
            boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            {/* Avatar with Green Online Dot */}
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                alt="Aku Cynthia"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(245, 200, 66, 0.4)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  border: isLightMode ? '2px solid #FFFFFF' : '2px solid #161619',
                }}
              />
            </div>

            {/* Profile Info Details */}
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: textColor,
                    margin: 0,
                    fontFamily: 'var(--font-outfit), sans-serif',
                  }}
                >
                  Aku Cynthia
                </h2>
                <span style={{ fontSize: '12px', color: subtextColor }}>#1234567879</span>
                <span
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10B981',
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  Active
                </span>
                <span
                  style={{
                    backgroundColor: isLightMode ? '#F3F4F6' : '#222227',
                    color: subtextColor,
                    fontSize: '10px',
                    fontWeight: 500,
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  User badge
                </span>
              </div>

              {/* Grid of User Metadata with Icons and lighter label / thicker value matching Figma */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '12px 18px',
                  fontSize: '12px',
                  marginTop: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Email: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>akucynthia@gmail.com</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Phone: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>+2347095635637</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>User type: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>Box owner</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Location: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>Nigeria</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Joined: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2024 | 11:56 AM</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Last ride: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2024 | 11:56 AM</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Box size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Box owned: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>5</span>
                  <span style={{ color: '#F5C842', textDecoration: 'underline', cursor: 'pointer', marginLeft: '4px', fontSize: '11px' }}>
                    (A5 4567 MyBox locker 232TE6)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Delivery mode: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>Instant</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Share2 size={14} color={subtextColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: subtextColor, fontWeight: 400 }}>Referred by: </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>Constance Ibekwe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Summary Section: Mini Stat Cards + Charts matching Figma Image 1 & 4 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: cardBorder,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Header with Daily filter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
                fontFamily: 'var(--font-outfit), sans-serif',
              }}
            >
              Summary
            </h3>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowTimeMenu(!showTimeMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                  border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: textColor,
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <span>{timePeriod}</span>
                <ChevronDown size={12} color={subtextColor} />
              </button>

              {showTimeMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    width: '100px',
                    backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
                    borderRadius: '8px',
                    border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '4px',
                    zIndex: 20,
                  }}
                >
                  {['Daily', 'Weekly', 'Monthly'].map((p) => (
                    <div
                      key={p}
                      onClick={() => {
                        setTimePeriod(p);
                        setShowTimeMenu(false);
                      }}
                      style={{
                        padding: '6px 8px',
                        fontSize: '11px',
                        color: textColor,
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 5 Top Summary Stat Cards matching Figma Image 4 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              { label: 'Total bookings', value: '7,935', change: '+12% today', icon: Box },
              { label: 'Success rate', value: '94%', change: '+4% today', icon: TrendingUp },
              { label: 'Total Spend', value: '₦1,670,000', change: '+4% today', icon: Coins },
              { label: 'Reward Points', value: '270', change: '+4% today', icon: Gift },
              { label: 'Wallet balance', value: '79,860,900', change: '+4%', icon: Coins },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                    borderRadius: '12px',
                    border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Icon size={13} color="#F5C842" />
                    <span style={{ fontSize: '11px', color: subtextColor }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: textColor, marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 600 }}>{stat.change}</div>
                </div>
              );
            })}
          </div>

          {/* 3 Summary Charts Row: Activity Chart, Spending Trend, Booking Types Gauge */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '14px',
              marginTop: '4px',
            }}
          >
            {/* Chart 1: Activity Chart with X & Y Axes */}
            <div
              style={{
                backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                borderRadius: '12px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
                padding: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Activity Chart</div>
                  <div style={{ fontSize: '10px', color: subtextColor }}>Bookings over time</div>
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    color: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  +5%
                </span>
              </div>
              {/* Spline Wave with Y-Axis (10k, 8k, 6k, 4k, 2k, 0) and X-Axis (Jan-Dec) */}
              <div style={{ height: '95px', width: '100%' }}>
                <svg width="100%" height="100%" viewBox="0 0 280 95" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5C842" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Dashed Gridlines */}
                  <line x1="26" y1="12" x2="275" y2="12" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="26" y1="26" x2="275" y2="26" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="26" y1="40" x2="275" y2="40" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="26" y1="54" x2="275" y2="54" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="26" y1="68" x2="275" y2="68" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="26" y1="80" x2="275" y2="80" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} />

                  {/* Y-Axis Labels */}
                  <text x="2" y="15" fill={subtextColor} fontSize="6.5">10k</text>
                  <text x="5" y="29" fill={subtextColor} fontSize="6.5">8k</text>
                  <text x="5" y="43" fill={subtextColor} fontSize="6.5">6k</text>
                  <text x="5" y="57" fill={subtextColor} fontSize="6.5">4k</text>
                  <text x="5" y="71" fill={subtextColor} fontSize="6.5">2k</text>
                  <text x="10" y="83" fill={subtextColor} fontSize="6.5">0</text>

                  {/* Gradient Area Fill */}
                  <path
                    d="M 32 68 Q 45 45, 60 22 T 88 56 T 115 62 T 142 42 T 168 72 T 195 54 T 222 25 T 250 20 T 272 24 L 272 80 L 32 80 Z"
                    fill="url(#activityGrad)"
                  />

                  {/* Smooth Spline Curve Line */}
                  <path
                    d="M 32 68 Q 45 45, 60 22 T 88 56 T 115 62 T 142 42 T 168 72 T 195 54 T 222 25 T 250 20 T 272 24"
                    fill="none"
                    stroke="#F5C842"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Peak Point Circles */}
                  <circle cx="60" cy="22" r="2.5" fill="#F5C842" />
                  <circle cx="142" cy="42" r="2.5" fill="#F5C842" />
                  <circle cx="222" cy="25" r="2.5" fill="#F5C842" />
                  <circle cx="250" cy="20" r="2.5" fill="#F5C842" />
                  <circle cx="272" cy="24" r="2.5" fill="#F5C842" />

                  {/* X-Axis Month Labels */}
                  <text x="32" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Jan</text>
                  <text x="54" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Feb</text>
                  <text x="76" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Mar</text>
                  <text x="98" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Apr</text>
                  <text x="120" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">May</text>
                  <text x="142" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Jun</text>
                  <text x="164" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Jul</text>
                  <text x="186" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Aug</text>
                  <text x="208" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Sep</text>
                  <text x="230" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Oct</text>
                  <text x="252" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Nov</text>
                  <text x="272" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Dec</text>
                </svg>
              </div>
            </div>

            {/* Chart 2: Spending Trend with X & Y Axes */}
            <div
              style={{
                backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                borderRadius: '12px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
                padding: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Spending Trend</div>
                  <div style={{ fontSize: '10px', color: subtextColor }}>Amount spent</div>
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    color: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  +5%
                </span>
              </div>
              {/* Spline Wave with Y-Axis (100k, 80k, 60k, 40k, 20k, 0) and X-Axis (Jan-Dec) */}
              <div style={{ height: '95px', width: '100%' }}>
                <svg width="100%" height="100%" viewBox="0 0 280 95" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="spendingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5C842" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Dashed Gridlines */}
                  <line x1="28" y1="12" x2="275" y2="12" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="28" y1="26" x2="275" y2="26" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="28" y1="40" x2="275" y2="40" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="28" y1="54" x2="275" y2="54" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="28" y1="68" x2="275" y2="68" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
                  <line x1="28" y1="80" x2="275" y2="80" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} />

                  {/* Y-Axis Labels */}
                  <text x="2" y="15" fill={subtextColor} fontSize="6.5">100k</text>
                  <text x="4" y="29" fill={subtextColor} fontSize="6.5">80k</text>
                  <text x="4" y="43" fill={subtextColor} fontSize="6.5">60k</text>
                  <text x="4" y="57" fill={subtextColor} fontSize="6.5">40k</text>
                  <text x="4" y="71" fill={subtextColor} fontSize="6.5">20k</text>
                  <text x="12" y="83" fill={subtextColor} fontSize="6.5">0</text>

                  {/* Gradient Area Fill */}
                  <path
                    d="M 34 65 Q 46 50, 62 20 T 92 60 T 118 64 T 145 38 T 172 70 T 198 52 T 225 22 T 252 24 T 272 26 L 272 80 L 34 80 Z"
                    fill="url(#spendingGrad)"
                  />

                  {/* Smooth Spline Curve Line */}
                  <path
                    d="M 34 65 Q 46 50, 62 20 T 92 60 T 118 64 T 145 38 T 172 70 T 198 52 T 225 22 T 252 24 T 272 26"
                    fill="none"
                    stroke="#F5C842"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Peak Point Circles */}
                  <circle cx="62" cy="20" r="2.5" fill="#F5C842" />
                  <circle cx="145" cy="38" r="2.5" fill="#F5C842" />
                  <circle cx="225" cy="22" r="2.5" fill="#F5C842" />
                  <circle cx="272" cy="26" r="2.5" fill="#F5C842" />

                  {/* X-Axis Month Labels */}
                  <text x="34" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Jan</text>
                  <text x="56" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Feb</text>
                  <text x="78" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Mar</text>
                  <text x="100" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Apr</text>
                  <text x="122" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">May</text>
                  <text x="144" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Jun</text>
                  <text x="166" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Jul</text>
                  <text x="188" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Aug</text>
                  <text x="210" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Sep</text>
                  <text x="232" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Oct</text>
                  <text x="254" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Nov</text>
                  <text x="272" y="91" fill={subtextColor} fontSize="6" textAnchor="middle">Dec</text>
                </svg>
              </div>
            </div>

            {/* Chart 3: Booking Types Gauge */}
            <div
              style={{
                backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                borderRadius: '12px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Booking Types</div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '9px', color: subtextColor, marginTop: '2px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488' }} /> Delivery
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} /> Storage
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textColor }}>200,000,000</span>
              </div>

              {/* Semi-circular gauge (75% Delivery teal vs 25% Storage yellow) */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                <svg width="150" height="75" viewBox="0 0 160 80">
                  <path d="M 20 75 A 60 60 0 0 1 140 75" fill="none" stroke="#26262B" strokeWidth="22" />
                  {/* Teal 75% */}
                  <path d="M 20 75 A 60 60 0 0 1 115 28" fill="none" stroke="#0D9488" strokeWidth="22" />
                  {/* Yellow 25% */}
                  <path d="M 115 28 A 60 60 0 0 1 140 75" fill="none" stroke="#F5C842" strokeWidth="22" />

                  <text x="65" y="55" fill="#FFFFFF" fontSize="9" fontWeight="700">75%</text>
                  <text x="122" y="55" fill="#000000" fontSize="8" fontWeight="700">25%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sub-Tabs & Filter Bar: Bookings, Boxes, Wallet, Rewards, Referrals, Reports */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', overflowX: 'auto' }}>
            {subTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#F5C842' : subtextColor,
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    padding: '6px 0',
                    borderBottom: isActive ? '2px solid #F5C842' : '2px solid transparent',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '200px' }}>
              <input
                type="text"
                placeholder="Search"
                style={{
                  width: '100%',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#FFFFFF' : '#1A1A1E',
                  border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '0 34px 0 12px',
                  color: textColor,
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
              <Search size={14} color={subtextColor} style={{ position: 'absolute', right: '10px', top: '11px', pointerEvents: 'none' }} />
            </div>

            {/* Filter ▾ button */}
            <button
              onClick={() => setShowFilterModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 14px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#FFFFFF' : '#1A1A1E',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
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

        {/* 4. Active Tab Stat Cards (Image 1 & 4) */}
        {activeSubTab === 'bookings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Cancelled Bookings', value: '7,935' },
              { label: 'Failed Deliveries', value: '8' },
              { label: 'Avg Booking Value', value: '₦2,050' },
              { label: 'Booking Completion Time', value: '43s' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: cardBorder,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'rewards' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Total Points Earned', value: '12 Pts' },
              { label: 'Total Points Spent', value: '7 Pts' },
              { label: 'Total Badges Unlocked', value: '12' },
              { label: 'Point redemption rate', value: '89%' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: cardBorder,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'wallet' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Total Deposited', value: '₦150,000,000' },
              { label: 'Total Withdrawn', value: '₦70,139,100' },
              { label: 'Current Balance', value: '₦79,860,900' },
              { label: 'Pending Payouts', value: '0' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: cardBorder,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'boxes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Default Locker', value: 'A5 - Bay 4' },
              { label: 'Box Unit', value: 'MyBox-12547' },
              { label: 'Battery Health', value: '94% (Good)' },
              { label: 'Locker Rating', value: '4.8 ★' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: cardBorder,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'referrals' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Total Referrals', value: '24' },
              { label: 'Active Users Referred', value: '18' },
              { label: 'Referral Earnings', value: '₦180,000' },
              { label: 'Conversion Rate', value: '75%' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: cardBorder,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'reports' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Total Reports', value: '14' },
              { label: 'Resolved Reports', value: '11' },
              { label: 'Pending Investigation', value: '3' },
              { label: 'Avg Resolution Time', value: '1.5 hrs' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: cardBorder,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* 5. Dynamic Data Table for Active Sub-Tab */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: cardBorder,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)' }}>
                  {activeSubTab === 'bookings' && (
                    <>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Order ID</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Pick up</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Drop off</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Type</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Date</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Amount</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Status</th>
                    </>
                  )}
                  {activeSubTab === 'boxes' && (
                    <>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Box ID</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Locker Name</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Cabinet</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Location</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Battery</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Cleanliness</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Status</th>
                    </>
                  )}
                  {activeSubTab === 'wallet' && (
                    <>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Transaction ID</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Type</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Payment Method</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Date</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Amount</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Status</th>
                    </>
                  )}
                  {activeSubTab === 'rewards' && (
                    <>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Reward ID</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Activity</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Points</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Date</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Status</th>
                    </>
                  )}
                  {activeSubTab === 'referrals' && (
                    <>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Referral ID</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Referred User</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Email</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Date Joined</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Bonus Earned</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Status</th>
                    </>
                  )}
                  {activeSubTab === 'reports' && (
                    <>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Report ID</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Category</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Summary</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Locker Unit</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Date</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Priority</th>
                      <th style={{ padding: '12px 16px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeSubTab === 'bookings' && [
                  { id: '1', order: '#BK-123456', pickup: 'Wuse II, Abuja', dropoff: 'MyBox Locker 23', type: 'Delivery', date: 'Aug 02, 2024', amount: '₦2,450', status: 'Completed' },
                  { id: '2', order: '#BK-123457', pickup: 'Garki, Abuja', dropoff: 'MyBox Locker 14', type: 'Storage', date: 'Aug 01, 2024', amount: '₦1,800', status: 'Completed' },
                  { id: '3', order: '#BK-123458', pickup: 'Maitama, Abuja', dropoff: 'MyBox Locker 05', type: 'Delivery', date: 'Jul 29, 2024', amount: '₦3,100', status: 'In transit' },
                  { id: '4', order: '#BK-123459', pickup: 'Wuse Zone 4', dropoff: 'MyBox Locker 12', type: 'Delivery', date: 'Jul 28, 2024', amount: '₦2,100', status: 'Completed' },
                  { id: '5', order: '#BK-123460', pickup: 'Jabi Lake Mall', dropoff: 'MyBox Locker 31', type: 'Storage', date: 'Jul 25, 2024', amount: '₦1,500', status: 'Cancelled' },
                ].map((row) => (
                  <tr key={row.id} style={{ borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.order}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.pickup}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.dropoff}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textColor }}>{row.type}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.date}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.amount}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: row.status === 'Completed' ? '#10B981' : row.status === 'In transit' ? '#F59E0B' : '#EF4444',
                          backgroundColor: row.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : row.status === 'In transit' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeSubTab === 'boxes' && [
                  { id: '1', boxId: 'MyBox-12547', locker: 'A5 MyBox Locker', cab: 'Bay 4', location: 'Wuse II, Abuja', battery: '94% (Good)', cleanliness: '90%', status: 'Active' },
                  { id: '2', boxId: 'MyBox-12548', locker: 'B2 MyBox Locker', cab: 'Bay 2', location: 'Garki, Abuja', battery: '88% (Good)', cleanliness: '95%', status: 'Active' },
                  { id: '3', boxId: 'MyBox-12549', locker: 'C1 MyBox Locker', cab: 'Bay 8', location: 'Maitama, Abuja', battery: '79% (Fair)', cleanliness: '85%', status: 'Active' },
                  { id: '4', boxId: 'MyBox-12550', locker: 'D4 MyBox Locker', cab: 'Bay 1', location: 'Jabi, Abuja', battery: '92% (Good)', cleanliness: '92%', status: 'Active' },
                ].map((row) => (
                  <tr key={row.id} style={{ borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.boxId}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textColor }}>{row.locker}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.cab}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.location}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>{row.battery}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textColor }}>{row.cleanliness}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '11px', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeSubTab === 'wallet' && [
                  { id: '1', txn: 'TXN-984210', type: 'Deposit', method: 'Paystack Web payment', date: 'Aug 02, 2024', amount: '+₦50,000', status: 'Success' },
                  { id: '2', txn: 'TXN-984209', type: 'Payment', method: 'Wallet (Delivery Booking)', date: 'Aug 01, 2024', amount: '-₦2,450', status: 'Success' },
                  { id: '3', txn: 'TXN-984208', type: 'Deposit', method: 'Direct Bank Transfer', date: 'Jul 30, 2024', amount: '+₦100,000', status: 'Success' },
                  { id: '4', txn: 'TXN-984207', type: 'Payment', method: 'Wallet (Demurrage Fee)', date: 'Jul 28, 2024', amount: '-₦500', status: 'Success' },
                ].map((row) => (
                  <tr key={row.id} style={{ borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.txn}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textColor }}>{row.type}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.method}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.date}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: row.amount.startsWith('+') ? '#10B981' : textColor }}>{row.amount}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '11px', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeSubTab === 'rewards' && [
                  { id: '1', code: 'REW-5541', act: 'Completed Delivery on time', pts: '+5 Pts', date: 'Aug 02, 2024', status: 'Awarded' },
                  { id: '2', code: 'REW-5540', act: 'Cabinet Cleanliness Confirmation', pts: '+10 Pts', date: 'Aug 01, 2024', status: 'Awarded' },
                  { id: '3', code: 'REW-5539', act: 'Monthly Active Customer Streak', pts: '+50 Pts', date: 'Jul 31, 2024', status: 'Awarded' },
                  { id: '4', code: 'REW-5538', act: 'Redeemed Free Weekend Delivery', pts: '-30 Pts', date: 'Jul 25, 2024', status: 'Redeemed' },
                ].map((row) => (
                  <tr key={row.id} style={{ borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.code}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textColor }}>{row.act}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#F5C842', fontWeight: 700 }}>{row.pts}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '11px', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeSubTab === 'referrals' && [
                  { id: '1', refId: 'REF-0012', user: 'Emmanuel Okafor', email: 'emmanuel.o@gmail.com', date: 'Aug 01, 2024', bonus: '₦5,000', status: 'Active' },
                  { id: '2', refId: 'REF-0011', user: 'Chioma Adeleke', email: 'chioma.a@yahoo.com', date: 'Jul 28, 2024', bonus: '₦5,000', status: 'Active' },
                  { id: '3', refId: 'REF-0010', user: 'Babatunde Fash', email: 'babatunde@outlook.com', date: 'Jul 20, 2024', bonus: '₦5,000', status: 'Active' },
                  { id: '4', refId: 'REF-0009', user: 'Fatima Bello', email: 'fatima.bello@gmail.com', date: 'Jul 15, 2024', bonus: '₦0 (Pending)', status: 'Pending' },
                ].map((row) => (
                  <tr key={row.id} style={{ borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.refId}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.user}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.date}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#10B981' }}>{row.bonus}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          color: row.status === 'Active' ? '#10B981' : '#F59E0B',
                          backgroundColor: row.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: 600,
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeSubTab === 'reports' && [
                  { id: '1', repId: 'REP-8801', cat: 'Cleanliness', sum: 'Cabinet was dusty and unclean', box: 'MyBox-12547 (A5)', date: 'Aug 02, 2024', priority: 'Medium', status: 'Resolved' },
                  { id: '2', repId: 'REP-8802', cat: 'Theft report', sum: 'Item missing from cabinet', box: 'MyBox-12548 (B2)', date: 'Jul 29, 2024', priority: 'High', status: 'In progress' },
                  { id: '3', repId: 'REP-8803', cat: 'Hardware', sum: 'Locker door slow to unlatch', box: 'MyBox-12547 (A5)', date: 'Jul 22, 2024', priority: 'Low', status: 'Resolved' },
                  { id: '4', repId: 'REP-8804', cat: 'Package', sum: 'Package outer seal damaged', box: 'MyBox-12549 (C1)', date: 'Jul 18, 2024', priority: 'Medium', status: 'Resolved' },
                ].map((row) => (
                  <tr key={row.id} style={{ borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.repId}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: textColor }}>{row.cat}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.sum}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: textColor }}>{row.box}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: subtextColor }}>{row.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          color: row.priority === 'High' ? '#EF4444' : row.priority === 'Medium' ? '#F59E0B' : '#10B981',
                          fontWeight: 600,
                        }}
                      >
                        {row.priority}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          color: row.status === 'Resolved' ? '#10B981' : '#F59E0B',
                          backgroundColor: row.status === 'Resolved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: 600,
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Side Panel: Activity history matching Figma Image 4 */}
      <aside
        style={{
          width: '310px',
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          flexShrink: 0,
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
        }}
        className="profile-activity-sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            Activity history
          </h3>
          <button
            onClick={onSeeMoreActivity}
            style={{
              background: 'none',
              border: 'none',
              color: '#8E8E93',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            See more
          </button>
        </div>

        {/* Chronological Activity Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          {/* Section: June 03, 2025 */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: subtextColor, marginBottom: '8px' }}>
              June 03, 2025
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Event 1 */}
              <div
                onClick={() => onSelectActivity?.('bk-123456')}
                style={{
                  borderLeft: '2px solid #F5C842',
                  paddingLeft: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>#BK-123456</div>
                <div style={{ fontSize: '10px', color: subtextColor }}>Nearing drop off</div>
                <div style={{ fontSize: '9px', color: '#71717A' }}>13:25</div>
              </div>

              {/* Event 2 */}
              <div
                onClick={() => onSelectActivity?.('bk-123456-transfer')}
                style={{
                  borderLeft: '2px solid #F5C842',
                  paddingLeft: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>#BK-123456</div>
                <div style={{ fontSize: '10px', color: subtextColor }}>MyBox-123456 → MyBox123487</div>
                <div style={{ fontSize: '9px', color: '#71717A' }}>13:25</div>
              </div>

              {/* Event 3: Cleanliness report */}
              <div
                onClick={() => onSelectActivity?.('rep-clean')}
                style={{
                  borderLeft: '2px solid #10B981',
                  paddingLeft: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Cleanliness report</div>
                <div style={{ fontSize: '10px', color: subtextColor }}>The cabinet was too dirty</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
                  <span style={{ color: '#71717A' }}>13:25</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Resolved</span>
                </div>
              </div>

              {/* Event 4: Theft report */}
              <div
                onClick={() => onSelectActivity?.('rep-theft')}
                style={{
                  borderLeft: '2px solid #F59E0B',
                  paddingLeft: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Theft report</div>
                <div style={{ fontSize: '10px', color: subtextColor }}>My item is missing</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
                  <span style={{ color: '#71717A' }}>13:25</span>
                  <span style={{ color: '#F59E0B', fontWeight: 600 }}>In progress</span>
                </div>
              </div>

              {/* Event 5: Booked partition */}
              <div
                onClick={() => onSelectActivity?.('part-booked')}
                style={{
                  borderLeft: '2px solid #71717A',
                  paddingLeft: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Booked partition</div>
                <div style={{ fontSize: '10px', color: subtextColor }}>#012356</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
                  <span style={{ color: '#71717A' }}>13:25</span>
                  <span style={{ color: '#71717A' }}>Pending</span>
                </div>
              </div>

              {/* Event 6: Collected package */}
              <div
                onClick={() => onSelectActivity?.('pkg-collected')}
                style={{
                  borderLeft: '2px solid #71717A',
                  paddingLeft: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Collected package</div>
                <div style={{ fontSize: '10px', color: subtextColor }}>#082638</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
                  <span style={{ color: '#71717A' }}>13:25</span>
                  <span style={{ color: '#71717A' }}>Pending</span>
                </div>
              </div>

              {/* Event 7: Wallet deposit */}
              <div
                onClick={() => onSelectActivity?.('wal-deposit')}
                style={{
                  borderLeft: '2px solid #10B981',
                  paddingLeft: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Wallet deposit</div>
                <div style={{ fontSize: '10px', color: subtextColor }}>Paystack</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
                  <span style={{ color: '#71717A' }}>13:25</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Successful</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 6. Multi-Tab Filter Modal per activeSubTab matching Figma Images 1, 2, 3, 4, 5 */}
      <UserProfileFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        activeSubTab={activeSubTab}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          console.log('Applied filters for', activeSubTab, filters);
        }}
      />

      <style jsx global>{`
        @media (max-width: 1024px) {
          .profile-activity-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
