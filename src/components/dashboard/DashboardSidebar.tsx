'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Box,
  Layers,
  ShoppingBag,
  Gift,
  Shield,
  CreditCard,
  Headphones,
  AlertTriangle,
  UserCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isLightMode?: boolean;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  onToggleCollapse,
  activeTab,
  onSelectTab,
  isLightMode = false,
}) => {
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    users: false,
    inventory: false,
    orders: false,
  });

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      hasDropdown: false,
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      hasDropdown: false,
    },
    {
      id: 'box_mgt',
      label: 'Box mgt.',
      icon: Box,
      hasDropdown: false,
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Layers,
      hasDropdown: true,
      subItems: ['Stock overview', 'Unit categories', 'Stock intake'],
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      hasDropdown: true,
      subItems: ['All bookings', 'Active pickups', 'Delivered items'],
    },
    {
      id: 'rewards',
      label: 'Rewards',
      icon: Gift,
      hasDropdown: true,
      subItems: ['Points & referrals', 'Promo vouchers'],
    },
    {
      id: 'admin_regt',
      label: 'Admin regt.',
      icon: Shield,
      hasDropdown: true,
      subItems: ['Staff accounts', 'Roles & access'],
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: CreditCard,
      hasDropdown: false,
    },
    {
      id: 'support',
      label: 'Support',
      icon: Headphones,
      hasDropdown: true,
      subItems: ['Support tickets', 'Customer disputes'],
    },
    {
      id: 'fraud_alert',
      label: 'Fraud alert',
      icon: AlertTriangle,
      hasDropdown: true,
      subItems: ['Tamper logs', 'Failed unlock attempts'],
    },
    {
      id: 'account',
      label: 'Account',
      icon: UserCircle,
      hasDropdown: true,
      subItems: ['Security settings', 'API integrations'],
    },
  ];

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '230px',
        height: '100vh',
        backgroundColor: '#111113',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'width 0.25s ease',
        flexShrink: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      className="dashboard-sidebar"
    >
      <div>
        {/* Sidebar Header: Logo & Collapse Button matching Figma */}
        <div
          style={{
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            padding: collapsed ? '0 12px' : '0 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          {!collapsed && (
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/image/admin - b2b logo.png"
                alt="Box2Box"
                style={{ height: '26px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
          )}

          {/* Collapse icon: double left chevrons `<<` */}
          <button
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
              background: 'none',
              border: 'none',
              color: '#8E8E93',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '6px',
              transition: 'color 0.15s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#8E8E93')}
          >
            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav style={{ padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isOpen = !!openDropdowns[item.id];

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    onSelectTab(item.id);
                    if (item.hasDropdown) {
                      toggleDropdown(item.id);
                    }
                  }}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: '100%',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    padding: collapsed ? '0' : '0 12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    /* Active yellow highlight matching Figma Desktop - Dashboard */
                    backgroundColor: isActive ? '#F5C842' : 'transparent',
                    color: isActive ? '#000000' : '#A0A0A5',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={16} color={isActive ? '#000000' : '#8E8E93'} />
                    {!collapsed && <span>{item.label}</span>}
                  </div>

                  {!collapsed && item.hasDropdown && (
                    <div style={{ color: isActive ? '#000000' : '#71717A', display: 'flex', alignItems: 'center' }}>
                      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  )}
                </button>

                {/* Submenu for items with dropdown */}
                {!collapsed && item.hasDropdown && isOpen && item.subItems && (
                  <div
                    style={{
                      paddingLeft: '32px',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    {item.subItems.map((sub) => (
                      <div
                        key={sub}
                        style={{
                          fontSize: '12px',
                          color: '#71717A',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'color 0.15s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                        onMouseOut={(e) => (e.currentTarget.style.color = '#71717A')}
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom of Sidebar: Logout & Stephanie Profile matching Figma */}
      <div
        style={{
          padding: collapsed ? '12px 6px' : '16px 14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Logout button (red) */}
        <button
          onClick={() => router.push('/login')}
          title="Logout"
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '10px',
            color: '#EF4444',
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* User Card from Figma: Stephanie / superadmin@box2box.ng */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '4px 6px',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
            alt="Stephanie"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                Stephanie
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#71717A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                superadmin@box2box.ng
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
