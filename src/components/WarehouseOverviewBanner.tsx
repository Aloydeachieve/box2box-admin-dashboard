'use client';

import React from 'react';
import {
  Thermometer,
  Droplets,
  Cpu,
  ShieldCheck,
  Scan,
  RefreshCw,
  Boxes,
  ArrowUpRight,
} from 'lucide-react';

interface WarehouseOverviewBannerProps {
  hubName: string;
  onAuditClick: () => void;
}

export const WarehouseOverviewBanner: React.FC<WarehouseOverviewBannerProps> = ({
  hubName,
  onAuditClick,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid var(--border-glass-bright)',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-elevation)',
        background: '#07090f',
      }}
    >
      {/* Background Graphic Asset with Dark Mesh Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/warehouse-hub.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'brightness(0.45) contrast(1.15)',
          transform: 'scale(1.02)',
        }}
      />

      {/* High-tech Gradient Lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(7, 9, 15, 0.95) 0%, rgba(7, 9, 15, 0.7) 45%, rgba(7, 9, 15, 0.4) 100%)',
        }}
      />

      {/* Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
              <Cpu size={12} />
              AI Automated High-Bay Vault
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '10px' }}>
              <ShieldCheck size={12} />
              ISO 27001 Security Vault
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            {hubName}
          </h2>

          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-medium)',
              lineHeight: 1.6,
              marginBottom: '16px',
            }}
          >
            Autonomous door-to-door storage hub with 3 climate-controlled zones, high-density robotic
            cranes, and automated smart parcel locker routing across metropolitan Madrid.
          </p>

          {/* Environmental Telemetry Sensors */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(14, 20, 34, 0.8)',
                border: '1px solid var(--border-glass)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Thermometer size={16} color="var(--cyan-400)" />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Vault Core Temp:</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                19.4°C
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(14, 20, 34, 0.8)',
                border: '1px solid var(--border-glass)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Droplets size={16} color="var(--primary-400)" />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Humidity Index:</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                44% Optimal
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(14, 20, 34, 0.8)',
                border: '1px solid var(--border-glass)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Scan size={16} color="var(--emerald-400)" />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Barcodes Scanned Today:</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                482 units
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={onAuditClick}
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '13px',
              borderRadius: '12px',
            }}
          >
            <RefreshCw size={15} />
            <span>Run Hub Diagnostic</span>
          </button>

          <div
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              AGV Robot Status:
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '10px' }}>
              4 / 4 Autonomous
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
