'use client';

import React, { useState } from 'react';
import { X, Box, MapPin, User, Shield, Cpu, CheckCircle } from 'lucide-react';
import { BoxUnit } from '@/types/box';

interface RegisterBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterBox: (newBox: BoxUnit) => void;
  isLightMode?: boolean;
}

export const RegisterBoxModal: React.FC<RegisterBoxModalProps> = ({
  isOpen,
  onClose,
  onRegisterBox,
  isLightMode = false,
}) => {
  const [boxId, setBoxId] = useState(`MyBox-${Math.floor(100000 + Math.random() * 900000)}`);
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState(`B2B-LKR-${Math.floor(1000 + Math.random() * 9000)}-NG`);
  const [model, setModel] = useState<'2 Cabinets' | '4 Cabinets' | '6 Cabinets' | '8 Cabinets'>('4 Cabinets');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lekki, Lagos');
  const [state, setState] = useState('Lagos');
  const [masterCode, setMasterCode] = useState('889922');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !ownerName.trim()) {
      setErrorMsg('Please fill in all required fields (Box name, Address, Owner name).');
      return;
    }

    setIsSubmitting(true);

    const cabinetCount = model === '2 Cabinets' ? 2 : model === '4 Cabinets' ? 4 : model === '6 Cabinets' ? 6 : 8;
    const compartments = Array.from({ length: cabinetCount }, (_, i) => ({
      id: `comp-${Date.now()}-${i + 1}`,
      compartmentNumber: i + 1,
      label: `Door ${i + 1} (${String.fromCharCode(65 + Math.floor(i / 2))}${(i % 2) + 1})`,
      size: (i % 2 === 0 ? 'Medium' : 'Large') as 'Medium' | 'Large',
      status: 'Available' as const,
      isLocked: true,
      isDoorClosed: true,
      lastOpenedAt: 'Just now (Initialized)',
    }));

    const newBox: BoxUnit = {
      id: `box-${Date.now()}`,
      boxId,
      serialNumber,
      name,
      address,
      city,
      state,
      latitude: state === 'Lagos' ? 6.45 : state === 'Abuja' ? 9.07 : 4.82,
      longitude: state === 'Lagos' ? 3.47 : state === 'Abuja' ? 7.48 : 7.05,
      ownerId: `u-${Date.now()}`,
      ownerName,
      ownerEmail: ownerEmail || `${ownerName.toLowerCase().replace(/\s+/g, '.')}@box2box.ng`,
      ownerPhone: ownerPhone || '+234 800 000 0000',
      ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      model,
      status: 'Activated',
      batteryHealth: {
        status: 'Excellent',
        percentage: 100,
        voltage: '13.0V',
        isCharging: true,
      },
      iotStatus: {
        isOnline: true,
        signalStrength: 'Strong',
        firmwareVersion: 'v2.4.1-rc3',
        temperature: '21.5°C',
        humidity: '45%',
        lastPing: 'Just registered',
      },
      usageRate: '0%',
      rating: 5.0,
      totalBookings: 0,
      dateInstalled: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      compartments,
      eventLogs: [
        {
          id: `ev-${Date.now()}`,
          timestamp: 'Just now',
          eventType: 'maintenance',
          title: 'Unit Registered & Online',
          description: `Smart Locker registered with ${cabinetCount} compartments and configured with initial master PIN.`,
          actor: 'Stephanie (Superadmin)',
          severity: 'normal',
        },
      ],
    };

    setTimeout(() => {
      onRegisterBox(newBox);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const bgModal = isLightMode ? '#FFFFFF' : '#141417';
  const borderModal = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)';
  const textTitle = isLightMode ? '#111827' : '#FFFFFF';
  const textMuted = isLightMode ? '#6B7280' : '#8E8E93';
  const inputBg = isLightMode ? '#F9FAFB' : '#1B1B1F';
  const inputBorder = isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.12)';
  const inputColor = isLightMode ? '#111827' : '#FFFFFF';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.18s ease-out',
      }}
    >
      <div
        style={{
          backgroundColor: bgModal,
          border: borderModal,
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: isLightMode ? '#FEF3C7' : 'rgba(245, 200, 66, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5C842',
              }}
            >
              <Box size={22} color="#F5C842" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: textTitle }}>
                Register New Smart Box Unit
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: textMuted }}>
                Add and configure a physical Box2Box smart parcel locker
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: textMuted,
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Section 1: Hardware Identification */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Cpu size={16} color="#F5C842" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: textTitle, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Hardware & Model
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Box ID (System Code)
                </label>
                <input
                  type="text"
                  value={boxId}
                  onChange={(e) => setBoxId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Hardware Serial Number
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Locker Cabinet Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                >
                  <option value="2 Cabinets">2 Cabinets (Compact)</option>
                  <option value="4 Cabinets">4 Cabinets (Standard Box)</option>
                  <option value="6 Cabinets">6 Cabinets (Commercial)</option>
                  <option value="8 Cabinets">8 Cabinets (Mega Hub)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Deployment Hub Name & Location */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <MapPin size={16} color="#F5C842" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: textTitle, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Installation Location
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Hub Friendly Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thomas Estate Smart Hub or Admiralty Gateway"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Physical Street Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Plot 12, Thomas Estate, off Lekki-Epe Expressway"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                    City / LGA
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: inputBg,
                      border: inputBorder,
                      color: inputColor,
                      fontSize: '13px',
                      outline: 'none',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: inputBg,
                      border: inputBorder,
                      color: inputColor,
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja (FCT)</option>
                    <option value="Rivers">Rivers (Port Harcourt)</option>
                    <option value="Oyo">Oyo (Ibadan)</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Anambra">Anambra</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Owner & Host Assignment */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <User size={16} color="#F5C842" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: textTitle, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Assigned Box Owner / Host
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Owner Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Babatunde Nnamani"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Owner Email
                </label>
                <input
                  type="email"
                  placeholder="babatunde@box2box.ng"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                  Owner Phone
                </label>
                <input
                  type="tel"
                  placeholder="+234 803 123 4567"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: inputBg,
                    border: inputBorder,
                    color: inputColor,
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Security & Passcode */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Shield size={16} color="#F5C842" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: textTitle, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Master Access Security
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textMuted, marginBottom: '6px' }}>
                Emergency Master Bypass PIN (6 digits)
              </label>
              <input
                type="text"
                maxLength={6}
                value={masterCode}
                onChange={(e) => setMasterCode(e.target.value)}
                style={{
                  width: '180px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  backgroundColor: inputBg,
                  border: inputBorder,
                  color: inputColor,
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  letterSpacing: '3px',
                  outline: 'none',
                }}
              />
              <span style={{ display: 'block', fontSize: '11px', color: textMuted, marginTop: '4px' }}>
                Used by emergency field technicians when network connectivity is disrupted.
              </span>
            </div>
          </div>

          {/* Modal Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '16px',
              borderTop: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: 'transparent',
                color: textTitle,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#F5C842',
                color: '#000000',
                fontSize: '13px',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              <CheckCircle size={16} />
              <span>{isSubmitting ? 'Registering...' : 'Register Smart Box'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
