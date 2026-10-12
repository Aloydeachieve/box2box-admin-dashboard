'use client';

import React, { useState } from 'react';
import {
  X,
  Box,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  Wifi,
  WifiOff,
  Thermometer,
  Droplets,
  Lock,
  Unlock,
  Package,
  User,
  Clock,
  MapPin,
  RefreshCw,
  Power,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { BoxUnit, CabinetCompartment } from '@/types/box';

interface BoxDetailModalProps {
  box: BoxUnit | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateBox: (updatedBox: BoxUnit) => void;
  onRequestConfirmAction: (actionType: 'disable' | 'maintenance' | 'unlock_all', box: BoxUnit) => void;
  isLightMode?: boolean;
}

export const BoxDetailModal: React.FC<BoxDetailModalProps> = ({
  box,
  isOpen,
  onClose,
  onUpdateBox,
  onRequestConfirmAction,
  isLightMode = false,
}) => {
  const [selectedCompartment, setSelectedCompartment] = useState<CabinetCompartment | null>(null);
  const [isRebooting, setIsRebooting] = useState(false);
  const [unlockFeedback, setUnlockFeedback] = useState<string | null>(null);

  if (!isOpen || !box) return null;

  const bgModal = isLightMode ? '#FFFFFF' : '#141417';
  const borderModal = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)';
  const cardBg = isLightMode ? '#F9FAFB' : '#1A1A1E';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const textTitle = isLightMode ? '#111827' : '#FFFFFF';
  const textMuted = isLightMode ? '#6B7280' : '#8E8E93';
  const textSubmuted = isLightMode ? '#9CA3AF' : '#71717A';

  const handleRemoteUnlockCompartment = (comp: CabinetCompartment) => {
    const updatedCompartments = box.compartments.map((c) =>
      c.id === comp.id ? { ...c, isLocked: false, lastOpenedAt: 'Just now (Admin Remote Unlock)' } : c
    );

    const newLog = {
      id: `ev-${Date.now()}`,
      timestamp: 'Just now',
      eventType: 'unlock' as const,
      title: `Admin Remote Unlock: ${comp.label}`,
      description: `Emergency unlock command dispatched from Admin Console for compartment ${comp.label}.`,
      compartmentLabel: comp.label,
      actor: 'Stephanie (Superadmin)',
      severity: 'warning' as const,
    };

    const updatedBox: BoxUnit = {
      ...box,
      compartments: updatedCompartments,
      eventLogs: [newLog, ...(box.eventLogs || [])],
    };

    onUpdateBox(updatedBox);
    setUnlockFeedback(`Door ${comp.label} unlocked successfully!`);
    setTimeout(() => setUnlockFeedback(null), 3500);

    if (selectedCompartment?.id === comp.id) {
      setSelectedCompartment({ ...comp, isLocked: false });
    }
  };

  const handleRebootGateway = () => {
    setIsRebooting(true);
    setTimeout(() => {
      setIsRebooting(false);
      setUnlockFeedback('IoT Gateway rebooted & signal re-synchronized.');
      setTimeout(() => setUnlockFeedback(null), 3500);
    }, 1500);
  };

  const activeCompartmentsCount = box.compartments.filter((c) => c.status === 'Occupied').length;
  const occupancyPercentage = Math.round((activeCompartmentsCount / box.compartments.length) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        style={{
          backgroundColor: bgModal,
          border: borderModal,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: isLightMode ? '#FAFAFA' : '#111114',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: isLightMode ? '#FEF3C7' : 'rgba(245, 200, 66, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box size={24} color="#F5C842" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700, color: textTitle }}>
                  {box.boxId}
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    backgroundColor:
                      box.status === 'Activated'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : box.status === 'Disabled'
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(245, 200, 66, 0.15)',
                    color:
                      box.status === 'Activated'
                        ? '#10B981'
                        : box.status === 'Disabled'
                        ? '#EF4444'
                        : '#F5C842',
                  }}
                >
                  {box.status}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: textMuted,
                    backgroundColor: isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.05)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  SN: {box.serialNumber}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: textMuted, marginTop: '2px' }}>
                {box.name} • {box.address}, {box.city}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: textMuted,
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.15s',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Feedback Alert Toast */}
        {unlockFeedback && (
          <div
            style={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{unlockFeedback}</span>
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div style={{ overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Top Telemetry Stat Tiles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '12px',
            }}
          >
            {/* Battery status */}
            <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: textSubmuted, fontWeight: 600 }}>Battery Health</span>
                {box.batteryHealth.isCharging ? (
                  <BatteryCharging size={16} color="#10B981" />
                ) : box.batteryHealth.percentage < 20 ? (
                  <BatteryLow size={16} color="#EF4444" />
                ) : (
                  <BatteryMedium size={16} color="#F5C842" />
                )}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textTitle }}>
                {box.batteryHealth.percentage}%{' '}
                <span style={{ fontSize: '12px', fontWeight: 500, color: textMuted }}>
                  ({box.batteryHealth.voltage})
                </span>
              </div>
              <div style={{ fontSize: '11px', color: box.batteryHealth.isCharging ? '#10B981' : textMuted, marginTop: '2px' }}>
                {box.batteryHealth.isCharging ? '● Solar Charging Active' : '● Battery Mode'}
              </div>
            </div>

            {/* IoT & Signal */}
            <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: textSubmuted, fontWeight: 600 }}>IoT Connectivity</span>
                {box.iotStatus.isOnline ? <Wifi size={16} color="#10B981" /> : <WifiOff size={16} color="#EF4444" />}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textTitle }}>
                {box.iotStatus.isOnline ? 'Online' : 'Offline'}
              </div>
              <div style={{ fontSize: '11px', color: textMuted, marginTop: '2px' }}>
                4G LTE • {box.iotStatus.lastPing}
              </div>
            </div>

            {/* Occupancy Rate */}
            <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: textSubmuted, fontWeight: 600 }}>Locker Occupancy</span>
                <Package size={16} color="#F5C842" />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textTitle }}>
                {occupancyPercentage}%
              </div>
              <div style={{ fontSize: '11px', color: textMuted, marginTop: '2px' }}>
                {activeCompartmentsCount} of {box.compartments.length} compartments in use
              </div>
            </div>

            {/* Microclimate Sensors */}
            <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '14px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: textSubmuted, fontWeight: 600 }}>Internal Climate</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <Thermometer size={14} color="#06B6D4" />
                  <Droplets size={14} color="#06B6D4" />
                </div>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textTitle }}>
                {box.iotStatus.temperature}
              </div>
              <div style={{ fontSize: '11px', color: textMuted, marginTop: '2px' }}>
                Humidity: {box.iotStatus.humidity} (Dry & Safe)
              </div>
            </div>
          </div>

          {/* Section: Physical Cabinet Compartment Visualizer */}
          <div
            style={{
              backgroundColor: cardBg,
              border: cardBorder,
              borderRadius: '16px',
              padding: '20px 22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textTitle }}>
                  Physical Cabinet Doors ({box.model})
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: textMuted }}>
                  Click on any compartment to view deposited parcel contents and remote unlock controls
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: textMuted }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} /> Available
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: textMuted }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366F1' }} /> Occupied
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: textMuted }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F5C842' }} /> Reserved
                </span>
              </div>
            </div>

            {/* Compartments Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: box.model === '2 Cabinets' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: '14px',
              }}
              className="box-compartment-grid"
            >
              {box.compartments.map((comp) => {
                const isSelected = selectedCompartment?.id === comp.id;
                const statusColor =
                  comp.status === 'Available'
                    ? '#10B981'
                    : comp.status === 'Occupied'
                    ? '#6366F1'
                    : comp.status === 'Reserved'
                    ? '#F5C842'
                    : '#EF4444';

                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedCompartment(comp)}
                    style={{
                      backgroundColor: isLightMode ? '#FFFFFF' : '#141417',
                      border: isSelected
                        ? '2px solid #F5C842'
                        : isLightMode
                        ? '1px solid #E5E7EB'
                        : '1px solid rgba(255, 255, 255, 0.09)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: textTitle }}>
                        {comp.label}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: `${statusColor}20`,
                          color: statusColor,
                        }}
                      >
                        {comp.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: textSubmuted }}>
                      Size: <strong style={{ color: textTitle }}>{comp.size}</strong>
                    </div>

                    {comp.status === 'Occupied' && (
                      <div
                        style={{
                          backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E24',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                        }}
                      >
                        <div style={{ fontWeight: 600, color: textTitle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {comp.currentCustomerName}
                        </div>
                        <div style={{ color: '#06B6D4', fontSize: '10px', marginTop: '2px' }}>
                          {comp.trackingNumber}
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        paddingTop: '6px',
                        borderTop: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.05)',
                        fontSize: '11px',
                        color: textMuted,
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {comp.isLocked ? <Lock size={12} color="#10B981" /> : <Unlock size={12} color="#F5C842" />}
                        {comp.isLocked ? 'Locked' : 'Unlocked'}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoteUnlockCompartment(comp);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#F5C842',
                          cursor: 'pointer',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 4px',
                        }}
                      >
                        Unlock
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Compartment Detail View */}
            {selectedCompartment && (
              <div
                style={{
                  marginTop: '16px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  backgroundColor: isLightMode ? '#F0FDF4' : 'rgba(245, 200, 66, 0.06)',
                  border: isLightMode ? '1px solid #BBF7D0' : '1px solid rgba(245, 200, 66, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: textTitle }}>
                    Inspecting {selectedCompartment.label} ({selectedCompartment.size})
                  </div>
                  <div style={{ fontSize: '12px', color: textMuted, marginTop: '2px' }}>
                    {selectedCompartment.status === 'Occupied' ? (
                      <span>
                        Assigned to <strong>{selectedCompartment.currentCustomerName}</strong> (
                        {selectedCompartment.currentCustomerPhone}) • Parcel: {selectedCompartment.parcelDescription}
                      </span>
                    ) : (
                      <span>Locker compartment is currently vacant and ready for new customer drop-offs.</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoteUnlockCompartment(selectedCompartment)}
                  style={{
                    backgroundColor: '#F5C842',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000000',
                    fontWeight: 700,
                    fontSize: '12px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Unlock size={14} />
                  <span>Remote Solenoid Release ({selectedCompartment.label})</span>
                </button>
              </div>
            )}
          </div>

          {/* Section: Box Host / Owner Profile & Location Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Host Details */}
            <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '16px', padding: '18px 20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', marginBottom: '12px' }}>
                Box Host / Property Owner
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={box.ownerAvatar}
                  alt={box.ownerName}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: textTitle }}>
                    {box.ownerName}
                  </div>
                  <div style={{ fontSize: '12px', color: textMuted, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Mail size={12} /> {box.ownerEmail}
                  </div>
                  <div style={{ fontSize: '12px', color: textMuted, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Phone size={12} /> {box.ownerPhone}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: textMuted }}>Date Installed:</span>
                <strong style={{ color: textTitle }}>{box.dateInstalled}</strong>
              </div>
              <div
                style={{
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: textMuted }}>Lifetime Bookings:</span>
                <strong style={{ color: textTitle }}>{box.totalBookings.toLocaleString()}</strong>
              </div>
            </div>

            {/* Hardware & Diagnostics */}
            <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '16px', padding: '18px 20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', marginBottom: '12px' }}>
                IoT Controller & Firmware
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: textMuted }}>Firmware Version:</span>
                  <span style={{ color: textTitle, fontFamily: 'monospace' }}>{box.iotStatus.firmwareVersion}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: textMuted }}>Signal Strength:</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>{box.iotStatus.signalStrength} (RSSI -64 dBm)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: textMuted }}>GPS Coordinates:</span>
                  <span style={{ color: textTitle, fontFamily: 'monospace' }}>
                    {box.latitude.toFixed(4)}° N, {box.longitude.toFixed(4)}° E
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: textMuted }}>Physical Tamper Sensor:</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Secured (No alerts)</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={handleRebootGateway}
                  disabled={isRebooting}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'transparent',
                    color: textTitle,
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: isRebooting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <RefreshCw size={13} className={isRebooting ? 'spin-animation' : ''} />
                  <span>{isRebooting ? 'Rebooting...' : 'Reboot Gateway'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRequestConfirmAction('unlock_all', box)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#EF4444',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Unlock size={13} />
                  <span>Master Unlock All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section: Live Event Audit Logs */}
          <div
            style={{
              backgroundColor: cardBg,
              border: cardBorder,
              borderRadius: '16px',
              padding: '20px 22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textTitle }}>
                Locker Event Logs & Audit History
              </h3>
              <span style={{ fontSize: '11px', color: textMuted }}>Showing real-time events</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(box.eventLogs || []).map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: isLightMode ? '#FFFFFF' : '#141417',
                    border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor:
                          log.severity === 'critical'
                            ? 'rgba(239, 68, 68, 0.15)'
                            : log.severity === 'warning'
                            ? 'rgba(245, 200, 66, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)',
                        color:
                          log.severity === 'critical'
                            ? '#EF4444'
                            : log.severity === 'warning'
                            ? '#F5C842'
                            : '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {log.severity === 'critical' ? (
                        <AlertTriangle size={14} />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: textTitle }}>
                        {log.title}
                      </div>
                      <div style={{ fontSize: '12px', color: textMuted, marginTop: '2px' }}>
                        {log.description}
                      </div>
                      <div style={{ fontSize: '10px', color: textSubmuted, marginTop: '4px' }}>
                        Initiated by: {log.actor}
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '11px', color: textSubmuted, whiteSpace: 'nowrap' }}>
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: isLightMode ? '#FAFAFA' : '#111114',
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => onRequestConfirmAction('maintenance', box)}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(245, 200, 66, 0.3)',
                backgroundColor: 'rgba(245, 200, 66, 0.1)',
                color: '#F5C842',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Wrench size={14} />
              <span>
                {box.status === 'Maintenance' ? 'Exit Maintenance' : 'Set to Maintenance'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onRequestConfirmAction('disable', box)}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                border: box.status === 'Activated' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                backgroundColor: box.status === 'Activated' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                color: box.status === 'Activated' ? '#EF4444' : '#10B981',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Power size={14} />
              <span>{box.status === 'Activated' ? 'Disable Box Unit' : 'Activate Box Unit'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: 'transparent',
              color: textTitle,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Close Details
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 768px) {
          .box-compartment-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .box-compartment-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
