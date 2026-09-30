'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Bell,
  Search,
  Plus,
  ChevronDown,
  Warehouse,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  onOpenNewDispatch: () => void;
  selectedHub: string;
  onSelectHub: (hub: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewDispatch,
  selectedHub,
  onSelectHub,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHubDropdown, setShowHubDropdown] = useState(false);

  const hubs = [
    { id: 'madrid', name: 'Madrid Central Hub #01', units: '184 / 232 bays', flag: '🇪🇸' },
    { id: 'lisbon', name: 'Lisbon Ocean Hub #04', units: '96 / 120 bays', flag: '🇵🇹' },
    { id: 'paris', name: 'Paris Nord Logistics #02', units: '142 / 160 bays', flag: '🇫🇷' },
    { id: 'barcelona', name: 'Barcelona Port Vault #03', units: '88 / 110 bays', flag: '🇪🇸' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '70px',
        background: 'rgba(7, 9, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-glass)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: '20px',
      }}
    >
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)',
            }}
          >
            <Boxes size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '18px',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(120deg, #ffffff 40%, #a5b4fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BOX<span style={{ color: '#22d3ee', WebkitTextFillColor: '#22d3ee' }}>2</span>BOX
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                }}
              >
                OPS V3.4
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-beacon beacon-emerald"></span>
              <span>Autonomous Storage Logistics</span>
            </div>
          </div>
        </div>

        {/* Warehouse Hub Selector */}
        <div style={{ position: 'relative' }} className="hide-on-tablet">
          <button
            onClick={() => setShowHubDropdown(!showHubDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-high)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Warehouse size={15} color="#818cf8" />
            <span>{selectedHub}</span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {showHubDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                width: '260px',
                background: 'rgba(14, 20, 34, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-glass-bright)',
                borderRadius: '12px',
                padding: '6px',
                boxShadow: 'var(--shadow-elevation)',
                zIndex: 100,
              }}
            >
              <div style={{ padding: '8px 10px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Active Storage Facilities
              </div>
              {hubs.map((hub) => (
                <div
                  key={hub.id}
                  onClick={() => {
                    onSelectHub(hub.name);
                    setShowHubDropdown(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: selectedHub === hub.name ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    color: selectedHub === hub.name ? '#ffffff' : 'var(--text-medium)',
                    fontSize: '12px',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{hub.flag}</span>
                    <span>{hub.name}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{hub.units}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Search Bar */}
      <div
        style={{
          flex: 1,
          maxWidth: '460px',
          position: 'relative',
        }}
        className="hide-on-mobile"
      >
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
          }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Order #, Barcode, Customer, or Bay (e.g. B2B-ES, Elena)..."
          className="input-field"
          style={{
            paddingLeft: '38px',
            paddingRight: '60px',
            background: 'rgba(255, 255, 255, 0.03)',
            height: '38px',
            fontSize: '12px',
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'var(--text-muted)',
          }}
        >
          ⌘K
        </span>
      </div>

      {/* Action Controls & Admin Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Quick Dispatch CTA */}
        <button
          onClick={onOpenNewDispatch}
          className="btn-primary"
          style={{ height: '38px', padding: '0 16px', fontSize: '12px' }}
        >
          <Plus size={16} />
          <span>New Dispatch</span>
        </button>

        {/* Live Operational Ticker Badge */}
        <div
          className="badge badge-emerald hide-on-tablet"
          style={{ height: '34px', padding: '0 12px', gap: '8px' }}
        >
          <Zap size={13} />
          <span>AGVs & Lockers Online</span>
        </div>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn-icon"
            style={{ position: 'relative' }}
          >
            <Bell size={17} />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--cyan-400)',
                boxShadow: '0 0 8px var(--cyan-400)',
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '10px',
                width: '320px',
                background: 'rgba(14, 20, 34, 0.96)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-glass-bright)',
                borderRadius: '14px',
                padding: '16px',
                boxShadow: 'var(--shadow-elevation)',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border-glass)',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '13px' }}>Operations Telemetry</span>
                <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
                  3 Alerts
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-high)' }}>
                    📦 Order B2B-ES-8921 In Vault
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Rack B-04 loaded and scanned by AGV Shuttle 4.
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--cyan-400)' }}>12 mins ago</span>
                </div>
                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-high)' }}>
                    ⚡ Fleet E-Van #01 Fast Charging
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Alpha van battery at 84%. Route scheduled for 16:30.
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--emerald-400)' }}>25 mins ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 8px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-glass)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                backgroundColor: 'var(--emerald-400)',
                border: '2px solid #07090f',
              }}
            />
          </div>
          <div className="hide-on-mobile" style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-high)' }}>Sylvester A.</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Lead Ops Director</div>
          </div>
        </div>
      </div>
    </header>
  );
};
