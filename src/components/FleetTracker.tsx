'use client';

import React, { useState } from 'react';
import { CourierFleet } from '@/types';
import {
  Truck,
  BatteryCharging,
  BatteryMedium,
  Navigation,
  MapPin,
  Clock,
  Zap,
  Activity,
  Radio,
  Bike,
} from 'lucide-react';

interface FleetTrackerProps {
  fleet: CourierFleet[];
  onDispatchCourier?: (courierId: string) => void;
}

export const FleetTracker: React.FC<FleetTrackerProps> = ({ fleet, onDispatchCourier }) => {
  const [selectedCourier, setSelectedCourier] = useState<CourierFleet | null>(fleet[0] || null);

  const getBatteryIcon = (level: number) => {
    if (level < 30) return <BatteryCharging size={16} color="var(--rose-400)" />;
    if (level < 60) return <BatteryMedium size={16} color="var(--amber-400)" />;
    return <Zap size={16} color="var(--emerald-400)" />;
  };

  const getVehicleIcon = (type: string) => {
    if (type.includes('Bike')) return <Bike size={18} color="#22d3ee" />;
    return <Truck size={18} color="#818cf8" />;
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
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
            <Radio size={18} color="var(--emerald-400)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
              Live Fleet Dispatch & Courier GPS
            </h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Real-time urban telemetry for door-to-door storage collections and returns
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-emerald">
            <span className="pulse-beacon beacon-emerald"></span>
            All 4 Units Reporting
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {fleet.map((courier) => {
          const isSelected = selectedCourier?.id === courier.id;
          const loadPercentage = Math.round((courier.currentLoadM3 / courier.maxCapacityM3) * 100);

          return (
            <div
              key={courier.id}
              onClick={() => setSelectedCourier(courier)}
              className="glass-card-interactive"
              style={{
                padding: '16px 18px',
                border: isSelected ? '1.5px solid var(--primary-400)' : '1px solid var(--border-glass)',
                background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getVehicleIcon(courier.vehicleType)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                      {courier.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {courier.callsign} • {courier.vehiclePlate}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {getBatteryIcon(courier.batteryLevel)}
                  <span
                    style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: courier.batteryLevel < 30 ? 'var(--rose-400)' : 'var(--emerald-400)',
                    }}
                  >
                    {courier.batteryLevel}%
                  </span>
                </div>
              </div>

              {/* Status and Zone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-medium)', marginBottom: '8px' }}>
                <MapPin size={13} color="var(--cyan-400)" />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {courier.currentZone}
                </span>
              </div>

              {/* Load Bar */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Cargo Load:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-high)' }}>
                    {courier.currentLoadM3} / {courier.maxCapacityM3} m³ ({loadPercentage}%)
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${loadPercentage}%`,
                      height: '100%',
                      background: loadPercentage > 85 ? '#f43f5e' : '#22d3ee',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>

              {/* Metrics footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '11px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  <span>ETA: {courier.etaNextStop}</span>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '9px' }}>
                  {courier.currentOrders} Orders Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Live Route Vector Map */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #090e1c 0%, #060912 100%)',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Map Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px), radial-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Simulated Road Lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <path
            d="M 50 180 Q 200 40 450 120 T 850 90"
            fill="none"
            stroke="rgba(99, 102, 241, 0.3)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <path
            d="M 120 220 C 300 150 600 240 950 160"
            fill="none"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          {/* Central Hub Pin */}
          <circle cx="450" cy="120" r="10" fill="#6366f1" opacity="0.4" />
          <circle cx="450" cy="120" r="5" fill="#818cf8" />
          <text x="470" y="125" fill="#ffffff" fontSize="11" fontFamily="var(--font-display)" fontWeight="700">
            Box2Box Central Hub Nave 12
          </text>
        </svg>

        {/* Courier Pin Callout */}
        {selectedCourier && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(14, 20, 34, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-glass-bright)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 10,
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee' }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                Tracking: {selectedCourier.name} ({selectedCourier.vehiclePlate})
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Speed: {selectedCourier.speedKmH} km/h • Route: {selectedCourier.currentZone}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
