'use client';

import React, { useState, useEffect } from 'react';
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
import { LogoutModal } from './modals/LogoutModal';

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    users: false,
    inventory: false,
    orders: false,
    rewards: false,
    support: false,
    fraud_alert: false,
  });

  useEffect(() => {
    if (activeTab.startsWith('rewards')) {
      setOpenDropdowns((prev) => ({ ...prev, rewards: true }));
    }
    if (activeTab.startsWith('inventory')) {
      setOpenDropdowns((prev) => ({ ...prev, inventory: true }));
    }
    if (activeTab.startsWith('support')) {
      setOpenDropdowns((prev) => ({ ...prev, support: true }));
    }
    if (activeTab.startsWith('fraud')) {
      setOpenDropdowns((prev) => ({ ...prev, fraud_alert: true }));
    }
  }, [activeTab]);

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
      subItems: [
        { label: 'Boxes', id: 'inventory_boxes', path: '/inventory' },
        { label: 'Accessories', id: 'inventory_accessories', path: '/inventory/accessories' },
        { label: 'Parts', id: 'inventory_parts', path: '/inventory/parts' },
        { label: 'Inventory Log', id: 'inventory_log', path: '/inventory/log' },
      ],
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      hasDropdown: false,
    },
    {
      id: 'rewards',
      label: 'Rewards',
      icon: Gift,
      hasDropdown: true,
      subItems: [
        { label: 'Configuration', id: 'rewards_configuration', path: '/rewards' },
        { label: 'Point usage', id: 'rewards_point_usage', path: '/rewards/point-usage' },
      ],
    },
    {
      id: 'admin_mgt',
      label: 'Admin mgt.',
      icon: Shield,
      hasDropdown: false,
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
      subItems: [
        { label: 'Support tickets', id: 'support_tickets', path: '/support' },
        { label: 'Customer disputes', id: 'support_disputes', path: '/support/disputes' },
      ],
    },
    {
      id: 'fraud_alert',
      label: 'Fraud alert',
      icon: AlertTriangle,
      hasDropdown: true,
      subItems: [
        { label: 'Tamper logs', id: 'fraud_tamper', path: '/fraud-alert' },
        { label: 'Failed unlock attempts', id: 'fraud_unlocks', path: '/fraud-alert/unlocks' },
      ],
    },
    {
      id: 'account',
      label: 'Account',
      icon: UserCircle,
      hasDropdown: false,
    },
  ];

  return (
    <>
      <aside
        style={{
        width: collapsed ? '72px' : '230px',
        height: '100vh',
        backgroundColor: isLightMode ? '#FFFFFF' : '#0D0D0E',
        borderRight: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
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
                <div
                  onClick={() => {
                    if (item.hasDropdown) {
                      setOpenDropdowns((prev) => ({ ...prev, [item.id]: true }));
                      const firstSub = item.subItems?.[0];
                      if (firstSub) {
                        onSelectTab(firstSub.id);
                        router.push(firstSub.path);
                      } else {
                        onSelectTab(item.id);
                      }
                    } else {
                      onSelectTab(item.id);
                    }
                  }}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: '100%',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    padding: collapsed ? '0' : '0 8px 0 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    /* Active yellow highlight matching Figma Desktop - Dashboard */
                    backgroundColor: isActive ? 'var(--admin-selected-menu, #F7DF1E33)' : 'transparent',
                    color: isActive ? 'var(--Text-primary, #DEC91B)' : '#A0A0A5',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                    <Icon size={16} color={isActive ? '#DEC91B' : '#8E8E93'} />
                    {!collapsed && <span>{item.label}</span>}
                  </div>

                  {!collapsed && item.hasDropdown && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.id);
                      }}
                      title={isOpen ? 'Collapse submenu' : 'Expand submenu'}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isActive ? '#DEC91B' : '#71717A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'color 0.15s, background-color 0.15s',
                      }}
                      onMouseOver={(e) => {
                        e.stopPropagation();
                        e.currentTarget.style.color = isActive ? '#DEC91B' : '#FFFFFF';
                        e.currentTarget.style.backgroundColor = isActive ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.stopPropagation();
                        e.currentTarget.style.color = isActive ? '#DEC91B' : '#71717A';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  )}
                </div>

                {/* Submenu for items with dropdown */}
                {!collapsed && item.hasDropdown && isOpen && item.subItems && (
                  <div
                    style={{
                      paddingLeft: '32px',
                      paddingRight: '8px',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                    }}
                  >
                    {item.subItems.map((sub) => {
                      const isSubActive =
                        activeTab === sub.id ||
                        (sub.id === 'rewards_configuration' && (activeTab === 'rewards' || activeTab === 'rewards_configuration')) ||
                        (sub.id === 'inventory_boxes' && (activeTab === 'inventory' || activeTab === 'inventory_boxes'));

                      return (
                        <div
                          key={sub.id}
                          onClick={() => {
                            onSelectTab(sub.id);
                            router.push(sub.path);
                          }}
                          style={{
                            fontSize: '12px',
                            fontWeight: isSubActive ? 700 : 500,
                            color: isSubActive ? '#F5C842' : '#A0A0A5',
                            backgroundColor: isSubActive
                              ? isLightMode
                                ? 'rgba(245, 200, 66, 0.25)'
                                : 'rgba(245, 200, 66, 0.18)'
                              : 'transparent',
                            padding: '7px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseOver={(e) => {
                            if (!isSubActive) e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseOut={(e) => {
                            if (!isSubActive) e.currentTarget.style.color = '#A0A0A5';
                          }}
                        >
                          {sub.label}
                        </div>
                      );
                    })}
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
          onClick={() => setShowLogoutModal(true)}
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

    {/* Logout Confirmation Modal matching Figma Image 5 */}
    <LogoutModal
      isOpen={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      isLightMode={isLightMode}
    />
  </>
);
};
