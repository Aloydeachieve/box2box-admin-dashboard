'use client';

import React, { useState } from 'react';
import { WarehouseZone, WarehouseBay } from '@/types';
import {
  Warehouse,
  Thermometer,
  Droplets,
  Layers,
  Box,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
} from 'lucide-react';

interface VaultMatrixProps {
  zones: WarehouseZone[];
  onSelectBay?: (bay: WarehouseBay) => void;
}

export const VaultMatrix: React.FC<VaultMatrixProps> = ({ zones, onSelectBay }) => {
  const [activeZoneId, setActiveZoneId] = useState<string>(zones[0]?.id || 'zone-a');
  const [selectedBay, setSelectedBay] = useState<WarehouseBay | null>(null);

  const currentZone = zones.find((z) => z.id === activeZoneId) || zones[0];

  const getStatusColor = (status: WarehouseBay['status']) => {
    switch (status) {
      case 'occupied':
        return {
          bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)',
          border: 'rgba(99, 102, 241, 0.45)',
          text: '#a5b4fc',
          label: 'Occupied',
        };
      case 'available':
        return {
          bg: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.1)',
          text: 'var(--text-muted)',
          label: 'Available',
        };
      case 'reserved':
        return {
          bg: 'rgba(245, 158, 11, 0.15)',
          border: 'rgba(245, 158, 11, 0.4)',
          text: 'var(--amber-400)',
          label: 'Reserved',
        };
      case 'maintenance':
        return {
          bg: 'rgba(244, 63, 94, 0.15)',
          border: 'rgba(244, 63, 94, 0.4)',
          text: 'var(--rose-400)',
          label: 'Maintenance',
        };
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      {/* Zone Switcher and Climate Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Warehouse size={18} color="#818cf8" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
              Vault & Locker Rack Matrix
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Real-time visual map of warehouse bays, smart locker compartments, and climate telemetry
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => {
                setActiveZoneId(zone.id);
                setSelectedBay(null);
              }}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: activeZoneId === zone.id ? '1px solid var(--border-glow-primary)' : '1px solid var(--border-glass)',
                background: activeZoneId === zone.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: activeZoneId === zone.id ? '#ffffff' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {zone.name}
            </button>
          ))}
        </div>
      </div>

      {/* Zone Telemetry Metrics */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '12px 18px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-glass)',
          marginBottom: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '12px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Capacity: </span>
            <span style={{ fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {currentZone.occupiedUnits} / {currentZone.totalUnits} Units
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Volume: </span>
            <span style={{ fontWeight: 700, color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
              {currentZone.usedM3} / {currentZone.capacityM3} m³ ({Math.round((currentZone.usedM3 / currentZone.capacityM3) * 100)}%)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Thermometer size={14} color="var(--primary-400)" />
            <span style={{ color: 'var(--text-muted)' }}>Temp: </span>
            <span style={{ fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {currentZone.temperatureC}°C
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Droplets size={14} color="var(--cyan-400)" />
            <span style={{ color: 'var(--text-muted)' }}>Humidity: </span>
            <span style={{ fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {currentZone.humidityPercent}%
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#818cf8' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Occupied</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#fbbf24' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Reserved</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', border: '1px solid #475569' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Available</span>
          </div>
        </div>
      </div>

      {/* Visual Rack Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '12px',
        }}
      >
        {currentZone.bays.map((bay) => {
          const style = getStatusColor(bay.status);
          const isSelected = selectedBay?.id === bay.id;

          return (
            <div
              key={bay.id}
              onClick={() => {
                setSelectedBay(bay);
                if (onSelectBay) onSelectBay(bay);
              }}
              style={{
                background: style.bg,
                border: isSelected ? '2px solid #22d3ee' : `1px solid ${style.border}`,
                borderRadius: '12px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                transform: isSelected ? 'scale(1.03)' : 'none',
                boxShadow: isSelected ? '0 0 16px rgba(34, 211, 238, 0.4)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#ffffff',
                  }}
                >
                  {bay.code}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 600, color: style.text, textTransform: 'uppercase' }}>
                  {style.label}
                </span>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                {bay.rack} • L{bay.level}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Load:</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: bay.status === 'occupied' ? 'var(--cyan-400)' : 'var(--text-medium)',
                  }}
                >
                  {bay.occupiedM3} / {bay.capacityM3} m³
                </span>
              </div>

              {/* Progress mini bar */}
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  marginTop: '8px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.round((bay.occupiedM3 / bay.capacityM3) * 100)}%`,
                    height: '100%',
                    background: bay.status === 'occupied' ? '#6366f1' : '#fbbf24',
                    borderRadius: '2px',
                  }}
                />
              </div>

              {bay.customerName && (
                <div
                  style={{
                    marginTop: '6px',
                    fontSize: '10px',
                    color: '#ffffff',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {bay.customerName}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Bay Inspect Drawer */}
      {selectedBay && (
        <div
          style={{
            marginTop: '20px',
            padding: '16px 20px',
            borderRadius: '12px',
            background: 'rgba(14, 20, 34, 0.9)',
            border: '1px solid var(--border-glow-cyan)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              }}
            >
              <Box size={20} color="var(--cyan-400)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                  Bay {selectedBay.code} Details
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
                  {selectedBay.rack} (Level {selectedBay.level})
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>
                {selectedBay.customerName ? `Stored by: ${selectedBay.customerName}` : 'Bay is currently empty and sanitized for new intake.'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Occupancy</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {selectedBay.occupiedM3} m³ / {selectedBay.capacityM3} m³
              </div>
            </div>
            <button
              onClick={() => setSelectedBay(null)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
