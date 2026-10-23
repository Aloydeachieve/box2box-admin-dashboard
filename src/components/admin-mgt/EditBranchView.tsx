'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectLocationModal, LocationModalMode } from './modals/SelectLocationModal';

interface EditBranchViewProps {
  branchId?: string;
}

export const EditBranchView: React.FC<EditBranchViewProps> = ({ branchId = 'br-1' }) => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Pre-filled form state matching Figma Image 3
  const [branchName, setBranchName] = useState('Awka warehouse');
  const [address, setAddress] = useState('13 Ziks avenue. Awka');
  const [country, setCountry] = useState('Nigeria');
  const [state, setState] = useState('Anambra');
  const [city, setCity] = useState('Awka');

  // Location Modal State
  const [modalMode, setModalMode] = useState<LocationModalMode>('country');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Design Tokens (Rule 6: Zero Extra Contrast & Natural Background)
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const handleOpenLocationModal = (mode: LocationModalMode) => {
    setModalMode(mode);
    setIsLocationModalOpen(true);
  };

  const handleSelectLocation = (val: string) => {
    if (modalMode === 'country') {
      setCountry(val);
    } else if (modalMode === 'state') {
      setState(val);
    } else if (modalMode === 'city') {
      setCity(val);
    }
  };

  const handleUpdateBranch = () => {
    setToast({
      type: 'success',
      title: 'Branch Updated',
      message: `${branchName} has been updated successfully`,
    });
    setTimeout(() => {
      router.push('/admin-mgt');
    }, 1200);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        maxWidth: '860px',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
    >
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Form Container (Figma Image 3: natural dark background with subtle 1px border) */}
      <div
        style={{
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          About branch
        </h2>

        {/* Form Fields Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '18px',
          }}
        >
          {/* Branch Name Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: subtextColor }}>
              Branch name
            </label>
            <input
              type="text"
              placeholder="Branch name"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              style={{
                height: '46px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: textColor,
                padding: '0 14px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = yellowColor)}
              onBlur={(e) => (e.target.style.borderColor = borderColor)}
            />
          </div>

          {/* Address Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: subtextColor }}>
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                height: '46px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: textColor,
                padding: '0 14px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = yellowColor)}
              onBlur={(e) => (e.target.style.borderColor = borderColor)}
            />
          </div>

          {/* Country Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: subtextColor }}>
              Country
            </label>
            <button
              type="button"
              onClick={() => handleOpenLocationModal('country')}
              style={{
                height: '46px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: textColor,
                padding: '0 14px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
            >
              <span>{country}</span>
              <ChevronDown size={16} color={subtextColor} />
            </button>
          </div>

          {/* State Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: subtextColor }}>
              State
            </label>
            <button
              type="button"
              onClick={() => handleOpenLocationModal('state')}
              style={{
                height: '46px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: textColor,
                padding: '0 14px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
            >
              <span>{state}</span>
              <ChevronDown size={16} color={subtextColor} />
            </button>
          </div>

          {/* City Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: subtextColor }}>
              City
            </label>
            <button
              type="button"
              onClick={() => handleOpenLocationModal('city')}
              style={{
                height: '46px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: textColor,
                padding: '0 14px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
            >
              <span>{city}</span>
              <ChevronDown size={16} color={subtextColor} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Button: Update branch (Figma Image 3) */}
      <div style={{ marginTop: '8px' }}>
        <button
          type="button"
          onClick={handleUpdateBranch}
          style={{
            height: '46px',
            padding: '0 28px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: yellowColor,
            color: '#000000',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
            transition: 'all 0.15s ease',
          }}
        >
          <span>Update branch</span>
          <Box2BoxPulsingBadge size={14} inverted={false} />
        </button>
      </div>

      {/* Multi-Purpose Location Modal */}
      <SelectLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        isLightMode={isLightMode}
        initialMode={modalMode}
        selectedCountry={country}
        selectedState={state}
        selectedCity={city}
        onSelect={({ country: c, state: s, city: ci }) => {
          if (c !== undefined) setCountry(c);
          if (s !== undefined) setState(s);
          if (ci !== undefined) setCity(ci);
        }}
      />
    </div>
  );
};
