'use client';

import React from 'react';
import {
  LayoutDashboard,
  PackageSearch,
  Warehouse,
  Truck,
  BarChart3,
  SlidersHorizontal,
  Layers,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bot,
} from 'lucide-react';

export type NavTab = 'overview' | 'orders' | 'vault' | 'fleet' | 'analytics' | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  ordersCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  ordersCount,
}) => {
  const navItems = [
    {
      id: 'overview' as NavTab,
      label: 'Operations Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'orders' as NavTab,
      label: 'Orders & Pickups',
      icon: PackageSearch,
      badge: `${ordersCount} Live`,
      badgeColor: 'badge-indigo',
    },
    {
      id: 'vault' as NavTab,
      label: 'Vault & Locker Matrix',
      icon: Warehouse,
      badge: '91% Full',
      badgeColor: 'badge-amber',
    },
    {
      id: 'fleet' as NavTab,
      label: 'Fleet & Dispatch',
      icon: Truck,
      badge: '4 Active',
      badgeColor: 'badge-cyan',
    },
    {
      id: 'analytics' as NavTab,
      label: 'Storage & Financials',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings' as NavTab,
      label: 'Hub & IoT Settings',
      icon: SlidersHorizontal,
      badge: null,
    },
  ];

  return (
    <aside
      style={{
        width: '260px',
        flexShrink: 0,
        height: 'calc(100vh - 70px)',
        position: 'sticky',
        top: '70px',
        background: 'rgba(9, 13, 22, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--border-glass)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 40,
      }}
      className="hide-on-mobile"
    >
      <div>
        <div
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
            fontWeight: 700,
            marginBottom: '14px',
            paddingLeft: '12px',
          }}
        >
          Operations Management
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid var(--border-glow-primary)' : '1px solid transparent',
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.16) 0%, rgba(6, 182, 212, 0.08) 100%)'
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-medium)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon
                    size={18}
                    color={isActive ? '#818cf8' : 'var(--text-muted)'}
                    style={{ transition: 'color 0.2s' }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span className={`badge ${item.badgeColor}`} style={{ fontSize: '10px', padding: '2px 7px' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Live Systems Telemetry Widget */}
        <div
          style={{
            marginTop: '28px',
            padding: '14px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-glass)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600 }}>
              <Radio size={14} color="var(--emerald-400)" />
              <span>Facility Telemetry</span>
            </div>
            <span className="pulse-beacon beacon-emerald"></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Climate Control</span>
              <span style={{ color: 'var(--text-high)', fontFamily: 'var(--font-mono)' }}>19.4°C / 44%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Robotic Cranes (AGV)</span>
              <span style={{ color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>4 / 4 Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Locker Mesh Network</span>
              <span style={{ color: 'var(--emerald-400)', fontFamily: 'var(--font-mono)' }}>99.98% SLA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Dispatcher Status */}
      <div
        style={{
          padding: '14px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bot size={17} color="#818cf8" />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>Box2Box AI Copilot</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Auto-routing 8 pickups</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
