'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Check,
  User,
  Trash2,
  UserX,
  UserCheck,
  Ban,
  CheckCircle,
  XCircle,
  X,
} from 'lucide-react';
import { UserConfirmModal, UserActionType } from './UserConfirmModal';

interface UsersManagementViewProps {
  isLightMode?: boolean;
  onSelectUser?: (userId: string) => void;
}

export interface UserRowData {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  location: string;
  dateJoined: string;
  userType: 'Customer' | 'Box owner' | 'Rider';
  walletBalance: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  // Rider specific fields:
  riderScore?: string;
  acceptanceRate?: string;
  avgDeliveryTime?: string;
  totalOrders?: number;
  earnings?: string;
}

export const UsersManagementView: React.FC<UsersManagementViewProps> = ({
  isLightMode = false,
  onSelectUser,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'box_owner' | 'customer' | 'rider'>('all');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive' | 'Suspended'>('All');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [timePeriod, setTimePeriod] = useState('This week');
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(['1', '2', '4', '5']);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Confirmation Modal state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmActionType, setConfirmActionType] = useState<UserActionType>('suspend');
  const [confirmIsBulk, setConfirmIsBulk] = useState(false);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string; type: UserActionType } | null>(null);

  // Mock list of users matching Figma Screenshots 3, 4, 5
  const [users, setUsers] = useState<UserRowData[]>([
    {
      id: '1',
      name: 'Akuagwuagwu Hmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      location: 'Wuse II, Abuja, Nigeria',
      dateJoined: 'May 02, 2025',
      userType: 'Customer',
      walletBalance: '₦300,000,000,000',
      status: 'Active',
      riderScore: '78%',
      acceptanceRate: '90%',
      avgDeliveryTime: '7 mins',
      totalOrders: 40,
      earnings: '₦300,000,000,000',
    },
    {
      id: '2',
      name: 'Akuagwuagwu Hmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      location: 'Wuse II, Abuja, Nigeria',
      dateJoined: 'May 02, 2025',
      userType: 'Box owner',
      walletBalance: '₦300,000,000,000',
      status: 'Active',
      riderScore: '78%',
      acceptanceRate: '90%',
      avgDeliveryTime: '7 mins',
      totalOrders: 40,
      earnings: '₦300,000,000,000',
    },
    {
      id: '3',
      name: 'Akuagwuagwu Hmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
      location: 'Wuse II, Abuja, Nigeria',
      dateJoined: 'May 02, 2025',
      userType: 'Customer',
      walletBalance: '₦300,000,000,000',
      status: 'Suspended',
      riderScore: '78%',
      acceptanceRate: '90%',
      avgDeliveryTime: '7 mins',
      totalOrders: 40,
      earnings: '₦300,000,000,000',
    },
    {
      id: '4',
      name: 'Akuagwuagwu Hmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      location: 'Wuse II, Abuja, Nigeria',
      dateJoined: 'May 02, 2025',
      userType: 'Rider',
      walletBalance: '₦300,000,000,000',
      status: 'Inactive',
      riderScore: '78%',
      acceptanceRate: '90%',
      avgDeliveryTime: '7 mins',
      totalOrders: 40,
      earnings: '₦300,000,000,000',
    },
    {
      id: '5',
      name: 'Akuagwuagwu Hmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      location: 'Wuse II, Abuja, Nigeria',
      dateJoined: 'May 02, 2025',
      userType: 'Customer',
      walletBalance: '₦300,000,000,000',
      status: 'Active',
      riderScore: '78%',
      acceptanceRate: '90%',
      avgDeliveryTime: '7 mins',
      totalOrders: 40,
      earnings: '₦300,000,000,000',
    },
    {
      id: '6',
      name: 'Akuagwuagwu Hmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
      location: 'Wuse II, Abuja, Nigeria',
      dateJoined: 'May 02, 2025',
      userType: 'Rider',
      walletBalance: '₦300,000,000,000',
      status: 'Active',
      riderScore: '78%',
      acceptanceRate: '90%',
      avgDeliveryTime: '7 mins',
      totalOrders: 40,
      earnings: '₦300,000,000,000',
    },
    {
      id: '7',
      name: 'Akuagwuagwu Hmerichukwu',
      phone: '08156724568',
      email: 'ae@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
      location: 'Wuse II, Abuja, Nigeria',
      dateJoined: 'May 02, 2025',
      userType: 'Box owner',
      walletBalance: '₦300,000,000,000',
      status: 'Active',
      riderScore: '78%',
      acceptanceRate: '90%',
      avgDeliveryTime: '7 mins',
      totalOrders: 40,
      earnings: '₦300,000,000,000',
    },
  ]);

  const handleToggleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  const handleToggleSelectUser = (id: string) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((item) => item !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  // Trigger Confirmation Modal for Single User
  const openSingleUserModal = (userId: string, action: UserActionType) => {
    setTargetUserId(userId);
    setConfirmActionType(action);
    setConfirmIsBulk(false);
    setConfirmModalOpen(true);
    setActiveActionMenuId(null);
  };

  // Trigger Confirmation Modal for Bulk Users
  const openBulkModal = (action: UserActionType) => {
    if (selectedUserIds.length === 0) return;
    setTargetUserId(null);
    setConfirmActionType(action);
    setConfirmIsBulk(true);
    setConfirmModalOpen(true);
  };

  // Perform action after confirmation
  const handleExecuteConfirmedAction = () => {
    if (confirmIsBulk) {
      if (confirmActionType === 'delete') {
        setUsers((prev) => prev.filter((u) => !selectedUserIds.includes(u.id)));
        setToastMessage({
          title: 'User deleted',
          subtitle: `You successfully deleted ${selectedUserIds.length} users`,
          type: 'delete',
        });
      } else if (confirmActionType === 'suspend') {
        setUsers((prev) =>
          prev.map((u) => (selectedUserIds.includes(u.id) ? { ...u, status: 'Suspended' } : u))
        );
        setToastMessage({
          title: 'User suspended',
          subtitle: `You successfully suspended ${selectedUserIds.length} users`,
          type: 'suspend',
        });
      } else if (confirmActionType === 'reactivate') {
        setUsers((prev) =>
          prev.map((u) => (selectedUserIds.includes(u.id) ? { ...u, status: 'Active' } : u))
        );
        setToastMessage({
          title: 'User reactivated',
          subtitle: `You successfully reactivated ${selectedUserIds.length} users`,
          type: 'reactivate',
        });
      }
      setSelectedUserIds([]);
    } else if (targetUserId) {
      const targetUser = users.find((u) => u.id === targetUserId);
      const name = targetUser ? targetUser.name : 'this user';

      if (confirmActionType === 'delete') {
        setUsers((prev) => prev.filter((u) => u.id !== targetUserId));
        setSelectedUserIds((prev) => prev.filter((id) => id !== targetUserId));
        setToastMessage({
          title: 'User deleted',
          subtitle: `You successfully deleted ${name}`,
          type: 'delete',
        });
      } else if (confirmActionType === 'suspend') {
        setUsers((prev) =>
          prev.map((u) => (u.id === targetUserId ? { ...u, status: 'Suspended' } : u))
        );
        setToastMessage({
          title: 'User suspended',
          subtitle: `You successfully suspended ${name}`,
          type: 'suspend',
        });
      } else if (confirmActionType === 'reactivate') {
        setUsers((prev) =>
          prev.map((u) => (u.id === targetUserId ? { ...u, status: 'Active' } : u))
        );
        setToastMessage({
          title: 'User reactivated',
          subtitle: `You successfully reactivated ${name}`,
          type: 'reactivate',
        });
      }
    }

    setConfirmModalOpen(false);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Filtered rows
  const filteredUsers = users.filter((u) => {
    if (activeTab === 'box_owner' && u.userType !== 'Box owner') return false;
    if (activeTab === 'customer' && u.userType !== 'Customer') return false;
    if (activeTab === 'rider' && u.userType !== 'Rider') return false;
    if (statusFilter !== 'All' && u.status !== statusFilter) return false;
    if (
      searchQuery &&
      !u.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const cardBg = isLightMode ? '#FFFFFF' : '#161619';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
      {/* 1. Header / Subheader */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 4px 0',
            }}
          >
            User Management
          </h1>
          <p style={{ fontSize: '12px', color: subtextColor, margin: 0 }}>
            View and manage all users, filter by country, user type or status
          </p>
        </div>

        {/* Time period filter dropdown (This week ▾) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowTimeMenu(!showTimeMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
              border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)',
              color: textColor,
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <span>{timePeriod}</span>
            <ChevronDown size={14} color={subtextColor} />
          </button>

          {showTimeMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                width: '120px',
                backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
                borderRadius: '8px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
                padding: '4px',
                zIndex: 30,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              {['Today', 'This week', 'This month', 'This year'].map((tp) => (
                <div
                  key={tp}
                  onClick={() => {
                    setTimePeriod(tp);
                    setShowTimeMenu(false);
                  }}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    color: textColor,
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {tp}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Top 5 User Stat Cards in a row matching Figma Screenshots 3, 4, 5 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(210px, 1fr))',
          gap: '14px',
          overflowX: 'auto',
          scrollbarWidth: 'thin',
          paddingBottom: '4px',
        }}
        className="user-stats-row"
      >
        {/* Card 1: Total users */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '170px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: subtextColor }}>Total users</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>200,000,000</span>
            </div>
            {/* Legend dots */}
            <div style={{ display: 'flex', gap: '8px', fontSize: '9px', color: subtextColor, marginTop: '4px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0C4A4D' }} /> Box owner
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} /> Rider
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B37D14' }} /> Customer
              </span>
            </div>
          </div>

          {/* Semi-circular gauge */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 0 0' }}>
            <svg width="150" height="75" viewBox="0 0 160 80">
              <path d="M 20 75 A 60 60 0 0 1 140 75" fill="none" stroke="#222226" strokeWidth="22" />
              {/* Teal 50% */}
              <path d="M 20 75 A 60 60 0 0 1 80 15" fill="none" stroke="#0C4A4D" strokeWidth="22" />
              {/* Yellow 25% */}
              <path d="M 80 15 A 60 60 0 0 1 122 33" fill="none" stroke="#F5C842" strokeWidth="22" />
              {/* Bronze 25% */}
              <path d="M 122 33 A 60 60 0 0 1 140 75" fill="none" stroke="#B37D14" strokeWidth="22" />

              <text x="48" y="52" fill="#FFFFFF" fontSize="9" fontWeight="700">50%</text>
              <text x="100" y="32" fill="#000000" fontSize="8" fontWeight="700">25%</text>
              <text x="126" y="56" fill="#FFFFFF" fontSize="8" fontWeight="700">25%</text>
            </svg>
          </div>
        </div>

        {/* Card 2: Active users */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '170px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: subtextColor }}>Active users</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>15,000,000</span>
            </div>
            <div style={{ fontSize: '10px', color: '#71717A', marginTop: '2px' }}>Users who login daily</div>
          </div>

          {/* Yellow Arc Gauge 40% with center text */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <svg width="150" height="75" viewBox="0 0 160 80">
              <path d="M 20 75 A 60 60 0 0 1 140 75" fill="none" stroke="#222226" strokeWidth="20" strokeLinecap="round" />
              <path d="M 20 75 A 60 60 0 0 1 105 22" fill="none" stroke="#F5C842" strokeWidth="20" strokeLinecap="round" />
            </svg>
            <div
              style={{
                position: 'absolute',
                bottom: '2px',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <div style={{ fontSize: '9px', color: subtextColor }}>Active users</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>40%</div>
            </div>
          </div>
        </div>

        {/* Card 3: Users by status (Pie chart) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '170px',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '2px' }}>Users by status</div>
            {/* Status Legend */}
            <div style={{ display: 'flex', gap: '8px', fontSize: '9px', color: subtextColor }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} /> Active
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4B5563' }} /> Inactive
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} /> Suspended
              </span>
            </div>
          </div>

          {/* Full Circular Pie Chart matching Figma Image 3 */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
            <svg width="86" height="86" viewBox="0 0 100 100">
              <path d="M 50 50 L 50 5 A 45 45 0 0 1 50 95 Z" fill="#F5C842" />
              <path d="M 50 50 L 50 95 A 45 45 0 0 1 12 65 Z" fill="#EF4444" />
              <path d="M 50 50 L 12 65 A 45 45 0 0 1 50 5 Z" fill="#E5E7EB" />
              <text x="68" y="54" fill="#000000" fontSize="9" fontWeight="700">50%</text>
              <text x="32" y="74" fill="#FFFFFF" fontSize="8" fontWeight="700">20%</text>
              <text x="28" y="38" fill="#111827" fontSize="8" fontWeight="700">30%</text>
            </svg>
          </div>
        </div>

        {/* Card 4: User growth spline curve with full X and Y axes representation */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '170px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '12px', color: textColor, fontWeight: 600 }}>User growth</div>
              <div style={{ fontSize: '10px', color: subtextColor }}>Track user growth over time</div>
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
              +14%
            </span>
          </div>

          {/* Full Chart with X-axis, Y-axis, 6 Gridlines, and Curve */}
          <div style={{ height: '90px', width: '100%', marginTop: '6px' }}>
            <svg width="100%" height="100%" viewBox="0 0 240 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="userGrowthRichGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F5C842" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#F5C842" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* 5 Horizontal Dashed Gridlines */}
              <line x1="26" y1="10" x2="236" y2="10" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="26" y1="24" x2="236" y2="24" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="26" y1="38" x2="236" y2="38" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="26" y1="52" x2="236" y2="52" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="26" y1="66" x2="236" y2="66" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              {/* Solid Baseline */}
              <line x1="26" y1="76" x2="236" y2="76" stroke={isLightMode ? '#D1D5DB' : 'rgba(255,255,255,0.12)'} />

              {/* Y-Axis Labels */}
              <text x="2" y="13" fill={subtextColor} fontSize="6.5">10k</text>
              <text x="4" y="27" fill={subtextColor} fontSize="6.5">8k</text>
              <text x="4" y="41" fill={subtextColor} fontSize="6.5">6k</text>
              <text x="4" y="55" fill={subtextColor} fontSize="6.5">4k</text>
              <text x="4" y="69" fill={subtextColor} fontSize="6.5">2k</text>
              <text x="9" y="78" fill={subtextColor} fontSize="6.5">0</text>

              {/* Area Gradient Fill */}
              <path
                d="M 30 66 Q 44 48, 60 26 T 90 56 T 120 40 T 150 20 T 180 34 T 210 16 T 234 22 L 234 76 L 30 76 Z"
                fill="url(#userGrowthRichGrad)"
              />

              {/* Smooth Spline Curve */}
              <path
                d="M 30 66 Q 44 48, 60 26 T 90 56 T 120 40 T 150 20 T 180 34 T 210 16 T 234 22"
                fill="none"
                stroke="#F5C842"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Data Point Circles */}
              <circle cx="60" cy="26" r="2.5" fill="#F5C842" />
              <circle cx="90" cy="56" r="2" fill="#F5C842" />
              <circle cx="120" cy="40" r="2" fill="#F5C842" />
              <circle cx="150" cy="20" r="2.5" fill="#F5C842" />
              <circle cx="210" cy="16" r="2.5" fill="#F5C842" />

              {/* X-Axis Month Labels */}
              <text x="30" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Jan</text>
              <text x="50" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Feb</text>
              <text x="70" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Mar</text>
              <text x="90" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Apr</text>
              <text x="110" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">May</text>
              <text x="130" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Jun</text>
              <text x="150" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Jul</text>
              <text x="170" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Aug</text>
              <text x="190" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Sep</text>
              <text x="210" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Oct</text>
              <text x="230" y="86" fill={subtextColor} fontSize="6" textAnchor="middle">Dec</text>
            </svg>
          </div>
        </div>

        {/* Card 5: Aggregate wallet balance */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: cardBorder,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '170px',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '2px' }}>Aggregate wallet balance</div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '9px', color: subtextColor }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0C4A4D' }} /> Box owner
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} /> Rider
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B37D14' }} /> Customer
              </span>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#F5C842',
                marginBottom: '10px',
              }}
            >
              ₦300,000,000,000
            </div>

            <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', width: '100%' }}>
              <div style={{ width: '50%', backgroundColor: '#0C4A4D' }} />
              <div style={{ width: '25%', backgroundColor: '#F5C842' }} />
              <div style={{ width: '25%', backgroundColor: '#B37D14' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: subtextColor, marginTop: '4px' }}>
              <span>50%</span>
              <span>25%</span>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Actions Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '6px',
        }}
      >
        {/* Category Tabs: All, Box owner, Customer, Rider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'All (5,000,045)' },
            { id: 'box_owner', label: 'Box owner (1,456,863)' },
            { id: 'customer', label: 'Customer (679,086)' },
            { id: 'rider', label: 'Rider (3,673,900)' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

        {/* Right Search Input & Status Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '210px' }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <Search
              size={15}
              color={subtextColor}
              style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
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
              <span>Status{statusFilter !== 'All' ? `: ${statusFilter}` : ''}</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>

            {showStatusMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  width: '130px',
                  backgroundColor: isLightMode ? '#FFFFFF' : '#1A1A1E',
                  borderRadius: '8px',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '4px',
                  zIndex: 35,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                {(['All', 'Active', 'Inactive', 'Suspended'] as const).map((st) => (
                  <div
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setShowStatusMenu(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      borderRadius: '6px',
                      color: statusFilter === st ? '#F5C842' : textColor,
                      cursor: 'pointer',
                      fontWeight: statusFilter === st ? 600 : 400,
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#26262C')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {st}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Table Area with Floating Bulk Actions Bar matching Figma Image 2 */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          overflow: 'hidden',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
          position: 'relative',
        }}
      >
        {/* Floating Bulk Action Bar matching Figma Image 2 */}
        {selectedUserIds.length > 0 && (
          <div
            style={{
              padding: '12px 18px',
              backgroundColor: isLightMode ? '#FEFCE8' : '#1B1B1F',
              borderBottom: isLightMode ? '1px solid #FEF08A' : '1px solid rgba(245, 200, 66, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              animation: 'fadeIn 0.15s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                onChange={handleToggleSelectAll}
                style={{ cursor: 'pointer', accentColor: '#F5C842', width: '15px', height: '15px' }}
              />
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                {selectedUserIds.length} of 100 Selected
              </span>
            </div>

            {/* Bulk Action Buttons matching Figma Image 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Delete Button */}
              <button
                onClick={() => openBulkModal('delete')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#FEE2E2' : 'rgba(239, 68, 68, 0.12)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>

              {/* Suspend Button */}
              <button
                onClick={() => openBulkModal('suspend')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F59E0B',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#FEF3C7' : 'rgba(245, 158, 11, 0.12)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Ban size={15} />
                <span>Suspend</span>
              </button>

              {/* Activate Button */}
              <button
                onClick={() => openBulkModal('reactivate')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#10B981',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#D1FAE5' : 'rgba(16, 185, 129, 0.12)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <CheckCircle size={15} />
                <span>Activate</span>
              </button>
            </div>
          </div>
        )}

        {/* Table Content */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
            <thead>
              <tr style={{ borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)' }}>
                {/* Select All Checkbox */}
                <th style={{ padding: '14px 16px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleToggleSelectAll}
                    style={{ cursor: 'pointer', accentColor: '#F5C842', width: '15px', height: '15px' }}
                  />
                </th>

                {activeTab === 'rider' ? (
                  <>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Name and Email</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Rider score</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Acceptance rate</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Avg delivery time</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Total orders</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Earnings</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Location</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Action</th>
                  </>
                ) : (
                  <>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>User</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Location</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Date joined</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>User type</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Wallet balance</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '14px 12px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>Action</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                const isMenuOpen = activeActionMenuId === user.id;

                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)',
                      backgroundColor: isSelected
                        ? isLightMode
                          ? '#FEFCE8'
                          : 'rgba(245, 200, 66, 0.05)'
                        : 'transparent',
                      transition: 'background 0.15s',
                    }}
                    onMouseOver={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.02)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {/* Checkbox */}
                    <td style={{ padding: '14px 16px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectUser(user.id)}
                        style={{ cursor: 'pointer', accentColor: '#F5C842', width: '15px', height: '15px' }}
                      />
                    </td>

                    {/* Rider View Columns */}
                    {activeTab === 'rider' ? (
                      <>
                        <td
                          style={{ padding: '14px 12px', cursor: 'pointer' }}
                          onClick={() => onSelectUser && onSelectUser(user.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                              src={user.avatar}
                              alt={user.name}
                              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{user.name}</div>
                              <div style={{ fontSize: '11px', color: subtextColor }}>{user.phone}</div>
                              <div style={{ fontSize: '10px', color: '#71717A' }}>{user.email}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 12px', fontSize: '12px', color: textColor, fontWeight: 500 }}>
                          {user.riderScore}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: textColor, fontWeight: 500 }}>
                          {user.acceptanceRate}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: subtextColor }}>
                          {user.avgDeliveryTime}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                          {user.totalOrders}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                          {user.earnings}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: subtextColor }}>
                          {user.location}
                        </td>
                      </>
                    ) : (
                      /* Default View Columns (Customer / Box owner / All) */
                      <>
                        <td
                          style={{ padding: '14px 12px', cursor: 'pointer' }}
                          onClick={() => onSelectUser && onSelectUser(user.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                              src={user.avatar}
                              alt={user.name}
                              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{user.name}</div>
                              <div style={{ fontSize: '11px', color: subtextColor }}>{user.phone}</div>
                              <div style={{ fontSize: '10px', color: '#71717A' }}>{user.email}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 12px', fontSize: '12px', color: subtextColor }}>
                          {user.location}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: subtextColor }}>
                          {user.dateJoined}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: textColor, fontWeight: 500 }}>
                          {user.userType}
                        </td>
                        <td style={{ padding: '14px 12px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                          {user.walletBalance}
                        </td>
                        <td style={{ padding: '14px 12px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color:
                                user.status === 'Active'
                                  ? '#10B981'
                                  : user.status === 'Suspended'
                                  ? '#EF4444'
                                  : '#F59E0B',
                              backgroundColor:
                                user.status === 'Active'
                                  ? 'rgba(16, 185, 129, 0.1)'
                                  : user.status === 'Suspended'
                                  ? 'rgba(239, 68, 68, 0.1)'
                                  : 'rgba(245, 158, 11, 0.1)',
                              padding: '4px 10px',
                              borderRadius: '6px',
                            }}
                          >
                            {user.status}
                          </span>
                        </td>
                      </>
                    )}

                    {/* Action Column with three dots and Dropdown Menu (Image 5) */}
                    <td style={{ padding: '14px 12px', position: 'relative' }}>
                      <button
                        onClick={() => setActiveActionMenuId(isMenuOpen ? null : user.id)}
                        title="Actions"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: subtextColor,
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: '4px',
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Menu matching Image 5 */}
                      {isMenuOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '40px',
                            width: '180px',
                            backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
                            borderRadius: '10px',
                            border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
                            padding: '6px',
                            zIndex: 40,
                            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.45)',
                          }}
                        >
                          {/* 1. View profile */}
                          <div
                            onClick={() => {
                              setActiveActionMenuId(null);
                              if (onSelectUser) onSelectUser(user.id);
                            }}
                            style={{
                              padding: '8px 10px',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: textColor,
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <User size={14} color={subtextColor} />
                            <span>View profile</span>
                          </div>

                          {/* 2. Suspend / Reactivate with toggle switch */}
                          <div
                            onClick={() => {
                              if (user.status === 'Suspended') {
                                openSingleUserModal(user.id, 'reactivate');
                              } else {
                                openSingleUserModal(user.id, 'suspend');
                              }
                            }}
                            style={{
                              padding: '8px 10px',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: textColor,
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <span>{user.status === 'Suspended' ? 'Reactivate user' : 'Suspend user'}</span>
                            <div
                              style={{
                                width: '32px',
                                height: '18px',
                                borderRadius: '10px',
                                backgroundColor: user.status === 'Suspended' ? '#EF4444' : '#E5E7EB',
                                position: 'relative',
                                transition: 'background-color 0.2s',
                              }}
                            >
                              <div
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '50%',
                                  backgroundColor: '#FFFFFF',
                                  position: 'absolute',
                                  top: '2px',
                                  left: user.status === 'Suspended' ? '16px' : '2px',
                                  transition: 'left 0.2s',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                }}
                              />
                            </div>
                          </div>

                          {/* 3. Delete user */}
                          <div
                            onClick={() => openSingleUserModal(user.id, 'delete')}
                            style={{
                              padding: '8px 10px',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: '#EF4444',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#FEE2E2' : 'rgba(239, 68, 68, 0.15)')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <Trash2 size={14} color="#EF4444" />
                            <span>Delete user</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination matching Figma */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '16px',
            padding: '14px 18px',
            borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '12px',
            color: subtextColor,
          }}
        >
          <span>1 - 100 of 5,000,045</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              title="Previous"
              style={{
                background: 'none',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: subtextColor,
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              title="Next"
              style={{
                background: 'none',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: subtextColor,
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <UserConfirmModal
        isOpen={confirmModalOpen}
        actionType={confirmActionType}
        isBulk={confirmIsBulk}
        userCount={confirmIsBulk ? selectedUserIds.length : 1}
        userName={targetUserId ? users.find((u) => u.id === targetUserId)?.name : 'this user'}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleExecuteConfirmedAction}
        isLightMode={isLightMode}
      />

      {/* Toast Notification matching Figma Image 1 bottom cards */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
            border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 120,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
            animation: 'slideUpToast 0.25s ease-out',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor:
                toastMessage.type === 'delete'
                  ? '#EF4444'
                  : toastMessage.type === 'suspend'
                  ? '#F5C842'
                  : '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: toastMessage.type === 'suspend' ? '#000000' : '#FFFFFF',
              flexShrink: 0,
            }}
          >
            {toastMessage.type === 'delete' ? (
              <X size={18} strokeWidth={2.5} />
            ) : toastMessage.type === 'suspend' ? (
              <Ban size={18} />
            ) : (
              <Check size={18} strokeWidth={2.5} />
            )}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>{toastMessage.title}</div>
            <div style={{ fontSize: '11px', color: subtextColor }}>{toastMessage.subtitle}</div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              marginLeft: '8px',
              padding: '2px',
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpToast {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
