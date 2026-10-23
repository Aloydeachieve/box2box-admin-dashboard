'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { AdminFilterModal } from './AdminFilterModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface AdminUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  permissions: string;
  branches: string;
  status: 'Online' | 'Offline' | 'Disabled';
  lastActivity: string;
  addedBy: {
    name: string;
    dateTime: string;
  };
}

interface Branch {
  id: string;
  name: string;
  address: string;
  location: string;
  totalAdmins: number;
  addedBy: {
    name: string;
    dateTime: string;
  };
}

const INITIAL_ADMINS: AdminUser[] = [
  {
    id: 'adm-1',
    name: 'Akuagwuagwu Mmerichukwu',
    phone: '08156724563',
    email: 'ae@gmail.com',
    permissions: 'Orders, Inventory',
    branches: 'Apapa, Lagos, Nigeria',
    status: 'Online',
    lastActivity: 'Jun 24, 2026 | 11:54 AM',
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'adm-2',
    name: 'Akuagwuagwu Mmerichukwu',
    phone: '08156724563',
    email: 'ae@gmail.com',
    permissions: 'Admin, Inventory',
    branches: 'Ikeja, Lagos, Nigeria',
    status: 'Online',
    lastActivity: 'Jun 24, 2026 | 11:54 AM',
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'adm-3',
    name: 'Akuagwuagwu Mmerichukwu',
    phone: '08156724563',
    email: 'ae@gmail.com',
    permissions: 'Support',
    branches: 'Victoria Island, Lagos, Nigeria',
    status: 'Disabled',
    lastActivity: 'Jun 24, 2026 | 11:54 AM',
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'adm-4',
    name: 'Akuagwuagwu Mmerichukwu',
    phone: '08156724563',
    email: 'ae@gmail.com',
    permissions: 'Inventory, Orders',
    branches: 'Kano, Kano, Nigeria',
    status: 'Offline',
    lastActivity: 'Jun 24, 2026 | 11:54 AM',
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'adm-5',
    name: 'Akuagwuagwu Mmerichukwu',
    phone: '08156724563',
    email: 'ae@gmail.com',
    permissions: 'Orders, Inventory',
    branches: 'Port Harcourt, Rivers, Nigeria',
    status: 'Online',
    lastActivity: 'Jun 24, 2026 | 11:54 AM',
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
];

const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'br-1',
    name: 'Awka branch',
    address: '13 Crescent Avenue, Wuse II, Abuja',
    location: 'Wuse II, Abuja, Nigeria',
    totalAdmins: 12,
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'br-2',
    name: 'Onitsha branch',
    address: '23 Freedom Way, Ikoyi',
    location: 'Ikoyi, Lagos, Nigeria',
    totalAdmins: 12,
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'br-3',
    name: 'Enugu branch',
    address: '55 Justice Street, Asokoro',
    location: 'Asokoro, Abuja, Nigeria',
    totalAdmins: 12,
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'br-4',
    name: 'Ibadan branch',
    address: '78 Unity Road, Port Harcourt',
    location: 'Port Harcourt, Rivers, Nigeria',
    totalAdmins: 12,
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
  {
    id: 'br-5',
    name: 'Kano branch',
    address: '91 Hopewell Avenue, Kano',
    location: 'Kano, Kano, Nigeria',
    totalAdmins: 12,
    addedBy: {
      name: 'Aku Cynthia',
      dateTime: 'Jun 24, 2026 | 11:15 AM',
    },
  },
];

export const AdminManagementView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Tab State: 'admins' | 'branches'
  const [activeTab, setActiveTab] = useState<'admins' | 'branches'>('admins');
  const [searchQuery, setSearchQuery] = useState('');

  // Data State
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);

  // Active Menu Row State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter Modal State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [adminFilters, setAdminFilters] = useState<{
    statuses: string[];
    permissions: string[];
    branches: string[];
  }>({
    statuses: ['Online', 'Offline', 'Disabled'],
    permissions: [
      'Dashboard',
      'User',
      'Box management',
      'Inventory',
      'Orders',
      'Rewards',
      'Admin management',
      'Transactions',
      'Fraud alert',
      'Support',
      'Countries map tutorials',
    ],
    branches: ['Ikoyi', 'Maryland', 'Ikeja', 'Victoria Island', 'Lekki'],
  });

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    type: 'admin' | 'branch';
    name: string;
  } | null>(null);

  // Toast State
  const [toast, setToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Color tokens adhering to Zero Extra Contrast Rule
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const menuBg = isLightMode ? '#FFFFFF' : '#1C1C20';

  // Handlers for Delete
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'admin') {
      setAdmins((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setToast({
        type: 'disable',
        title: 'Admin deleted',
        message: 'Admin has been removed from database',
      });
    } else {
      setBranches((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setToast({
        type: 'disable',
        title: 'Branch deleted',
        message: 'Branch has been removed from database',
      });
    }
    setDeleteTarget(null);
  };

  const handleToggleAdminStatus = (adminId: string) => {
    setAdmins((prev) =>
      prev.map((a) => {
        if (a.id === adminId) {
          const nextStatus = a.status === 'Disabled' ? 'Online' : 'Disabled';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
    setActiveMenuId(null);
    setToast({
      type: 'success',
      title: 'Status Updated',
      message: 'Admin status updated successfully',
    });
  };

  // Filtered Admins
  const filteredAdmins = admins.filter((admin) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        admin.name.toLowerCase().includes(q) ||
        admin.email.toLowerCase().includes(q) ||
        admin.phone.toLowerCase().includes(q) ||
        admin.branches.toLowerCase().includes(q) ||
        admin.permissions.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }
    if (!adminFilters.statuses.includes(admin.status)) return false;
    return true;
  });

  // Filtered Branches
  const filteredBranches = branches.filter((branch) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        branch.name.toLowerCase().includes(q) ||
        branch.address.toLowerCase().includes(q) ||
        branch.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
      onClick={() => {
        if (activeMenuId) setActiveMenuId(null);
      }}
    >
      {/* 1. Page Header with Title and Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 4px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Admin & Access Management
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: subtextColor,
              margin: 0,
            }}
          >
            Manage administrators, assign roles, and control access across branches.
          </p>
        </div>

        {/* Action Buttons: New admin (yellow + pulsing badge) & New branch (dark) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => router.push('/admin-mgt/new')}
            style={{
              padding: '10px 20px',
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
            <span>New admin</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin-mgt/branches/new')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              color: textColor,
              fontWeight: 600,
              fontSize: '13px',
              border: `1px solid ${borderColor}`,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            New branch
          </button>
        </div>
      </div>

      {/* 2. Decoupled Table Section (Table Decoupling Rule: tabs, search, filter hang cleanly above table) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Decoupled Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Left Tabs: Admins vs Branches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              type="button"
              onClick={() => {
                setActiveTab('admins');
                setActiveMenuId(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                fontSize: '13.5px',
                fontWeight: activeTab === 'admins' ? 700 : 500,
                color: activeTab === 'admins' ? yellowColor : subtextColor,
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >
              Admins
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('branches');
                setActiveMenuId(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                fontSize: '13.5px',
                fontWeight: activeTab === 'branches' ? 700 : 500,
                color: activeTab === 'branches' ? yellowColor : subtextColor,
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >
              Branches
            </button>
          </div>

          {/* Right Toolbar: Search & (Filter button ONLY on Admins tab) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                width: '210px',
              }}
            >
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
              <Search size={15} color={subtextColor} />
            </div>

            {/* Filter Button (Only present on Admins tab) */}
            {activeTab === 'admins' && (
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '12.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>Filter</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>
            )}
          </div>
        </div>

        {/* Table Container Card (Zero Extra Contrast Rule: transparent background + 1px subtle border) */}
        <div
          style={{
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
            overflow: 'visible',
            position: 'relative',
          }}
        >
          {activeTab === 'admins' ? (
            /* TAB 1: Admins Table */
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '12.5px',
                  textAlign: 'left',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      color: subtextColor,
                      fontWeight: 500,
                      fontSize: '12px',
                    }}
                  >
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Admin</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Permissions</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Branches</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Last activity</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Added by</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500, width: '40px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr
                      key={admin.id}
                      style={{
                        borderBottom: `1px solid ${borderColor}`,
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode
                          ? '#F9FAFB'
                          : 'rgba(255, 255, 255, 0.02)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {/* Admin Info */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontWeight: 600, color: textColor }}>{admin.name}</span>
                          <span style={{ fontSize: '11px', color: subtextColor }}>{admin.phone}</span>
                          <span style={{ fontSize: '11px', color: subtextColor }}>{admin.email}</span>
                        </div>
                      </td>

                      {/* Permissions */}
                      <td style={{ padding: '16px 20px', color: textColor }}>
                        {admin.permissions}
                      </td>

                      {/* Branches */}
                      <td style={{ padding: '16px 20px', color: textColor }}>
                        {admin.branches}
                      </td>

                      {/* Status Badge Pill */}
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            border:
                              admin.status === 'Online'
                                ? '1px solid rgba(34, 197, 94, 0.4)'
                                : admin.status === 'Disabled'
                                ? '1px solid rgba(239, 68, 68, 0.4)'
                                : '1px solid rgba(142, 142, 147, 0.4)',
                            color:
                              admin.status === 'Online'
                                ? '#22C55E'
                                : admin.status === 'Disabled'
                                ? '#EF4444'
                                : '#8E8E93',
                            backgroundColor:
                              admin.status === 'Online'
                                ? 'rgba(34, 197, 94, 0.08)'
                                : admin.status === 'Disabled'
                                ? 'rgba(239, 68, 68, 0.08)'
                                : 'rgba(142, 142, 147, 0.08)',
                          }}
                        >
                          {admin.status}
                        </span>
                      </td>

                      {/* Last Activity */}
                      <td style={{ padding: '16px 20px', color: textColor }}>
                        {admin.lastActivity}
                      </td>

                      {/* Added By */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontWeight: 600, color: textColor }}>{admin.addedBy.name}</span>
                          <span style={{ fontSize: '11px', color: subtextColor }}>
                            {admin.addedBy.dateTime}
                          </span>
                        </div>
                      </td>

                      {/* Action 3 Dots */}
                      <td style={{ padding: '16px 20px', position: 'relative' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === admin.id ? null : admin.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: subtextColor,
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Action Dropdown Menu */}
                        {activeMenuId === admin.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              right: '20px',
                              top: '45px',
                              backgroundColor: menuBg,
                              border: `1px solid ${borderColor}`,
                              borderRadius: '10px',
                              padding: '6px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                              minWidth: '130px',
                              zIndex: 50,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                router.push(`/admin-mgt/${admin.id}`);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                padding: '8px 12px',
                                fontSize: '12.5px',
                                color: textColor,
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = isLightMode
                                  ? '#F3F4F6'
                                  : 'rgba(255, 255, 255, 0.05)')
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                router.push(`/admin-mgt/${admin.id}/edit`);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                padding: '8px 12px',
                                fontSize: '12.5px',
                                color: textColor,
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = isLightMode
                                  ? '#F3F4F6'
                                  : 'rgba(255, 255, 255, 0.05)')
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleAdminStatus(admin.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                padding: '8px 12px',
                                fontSize: '12.5px',
                                color: admin.status === 'Disabled' ? '#22C55E' : textColor,
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px',
                                transition: 'background-color 0.15s ease',
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = isLightMode
                                  ? '#F3F4F6'
                                  : 'rgba(255, 255, 255, 0.05)')
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              <span>{admin.status === 'Disabled' ? 'Enable' : 'Disable'}</span>
                              {/* Mini toggle switch */}
                              <div
                                style={{
                                  width: '26px',
                                  height: '14px',
                                  borderRadius: '10px',
                                  backgroundColor: admin.status !== 'Disabled' ? '#22C55E' : '#4B5563',
                                  position: 'relative',
                                  transition: 'background-color 0.2s ease',
                                  flexShrink: 0,
                                }}
                              >
                                <div
                                  style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FFFFFF',
                                    position: 'absolute',
                                    top: '2px',
                                    left: admin.status !== 'Disabled' ? '14px' : '2px',
                                    transition: 'left 0.2s ease',
                                  }}
                                />
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                setDeleteTarget({
                                  id: admin.id,
                                  type: 'admin',
                                  name: admin.name,
                                });
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                padding: '8px 12px',
                                fontSize: '12.5px',
                                color: '#EF4444',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = isLightMode
                                  ? '#FEE2E2'
                                  : 'rgba(239, 68, 68, 0.1)')
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* TAB 2: Branches Table */
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '12.5px',
                  textAlign: 'left',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      color: subtextColor,
                      fontWeight: 500,
                      fontSize: '12px',
                    }}
                  >
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Name</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Address</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Location</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Total admins</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500 }}>Added by</th>
                    <th style={{ padding: '16px 20px', fontWeight: 500, width: '40px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBranches.map((branch) => (
                    <tr
                      key={branch.id}
                      style={{
                        borderBottom: `1px solid ${borderColor}`,
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode
                          ? '#F9FAFB'
                          : 'rgba(255, 255, 255, 0.02)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {/* Name */}
                      <td style={{ padding: '18px 20px', fontWeight: 600, color: textColor }}>
                        {branch.name}
                      </td>

                      {/* Address */}
                      <td style={{ padding: '18px 20px', color: textColor }}>
                        {branch.address}
                      </td>

                      {/* Location */}
                      <td style={{ padding: '18px 20px', color: textColor }}>
                        {branch.location}
                      </td>

                      {/* Total Admins */}
                      <td style={{ padding: '18px 20px', color: textColor }}>
                        {branch.totalAdmins}
                      </td>

                      {/* Added By */}
                      <td style={{ padding: '18px 20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontWeight: 600, color: textColor }}>{branch.addedBy.name}</span>
                          <span style={{ fontSize: '11px', color: subtextColor }}>
                            {branch.addedBy.dateTime}
                          </span>
                        </div>
                      </td>

                      {/* Action 3 Dots */}
                      <td style={{ padding: '18px 20px', position: 'relative' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === branch.id ? null : branch.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: subtextColor,
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Action Dropdown Menu */}
                        {activeMenuId === branch.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              right: '20px',
                              top: '45px',
                              backgroundColor: menuBg,
                              border: `1px solid ${borderColor}`,
                              borderRadius: '10px',
                              padding: '6px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                              minWidth: '110px',
                              zIndex: 50,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                router.push(`/admin-mgt/branches/${branch.id}/edit`);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                padding: '8px 12px',
                                fontSize: '12.5px',
                                color: textColor,
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = isLightMode
                                  ? '#F3F4F6'
                                  : 'rgba(255, 255, 255, 0.05)')
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                setDeleteTarget({
                                  id: branch.id,
                                  type: 'branch',
                                  name: branch.name,
                                });
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                textAlign: 'left',
                                padding: '8px 12px',
                                fontSize: '12.5px',
                                color: '#EF4444',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = isLightMode
                                  ? '#FEE2E2'
                                  : 'rgba(239, 68, 68, 0.1)')
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer: Pagination */}
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '16px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <span>1 - 100 of 5,000,045</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Filter Modal */}
      <AdminFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        isLightMode={isLightMode}
        initialFilters={adminFilters}
        onApplyFilters={(filters) => setAdminFilters(filters)}
      />

      {/* Delete Confirmation Modal (Safety locked until 'delete' is typed) */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        isLightMode={isLightMode}
        title={deleteTarget?.type === 'branch' ? 'Delete branch' : 'Delete admin'}
        itemType={deleteTarget?.type || 'branch'}
        itemName={deleteTarget?.name}
      />

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          isLightMode={isLightMode}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
