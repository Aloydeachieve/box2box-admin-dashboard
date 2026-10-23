'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectLocationModal, LocationModalMode } from './modals/SelectLocationModal';

export const CreateBranchView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Form State
  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  // Location Modal State
  const [modalMode, setModalMode] = useState<LocationModalMode>('country');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Form validity: Rule 5
  const isFormValid =
    branchName.trim().length > 0 &&
    address.trim().length > 0 &&
    country.trim().length > 0 &&
    state.trim().length > 0 &&
    city.trim().length > 0;

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

  const handleSaveAndExit = () => {
    if (!isFormValid) return;
    setToast({
      type: 'success',
      title: 'Branch Created',
      message: `${branchName} has been successfully created`,
    });
    setTimeout(() => {
      router.push('/admin-mgt');
    }, 1200);
  };

  const handleSaveAndContinue = () => {
    if (!isFormValid) return;
    setToast({
      type: 'success',
      title: 'Branch Saved',
      message: `${branchName} saved. Ready for next entry.`,
    });
    setBranchName('');
    setAddress('');
    setCountry('');
    setState('');
    setCity('');
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

      {/* Form Container (Figma Image 1: natural dark background with subtle 1px border) */}
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
                color: country ? textColor : subtextColor,
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
              <span>{country || 'Country'}</span>
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
                color: state ? textColor : subtextColor,
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
              <span>{state || 'State'}</span>
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
                color: city ? textColor : subtextColor,
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
              <span>{city || 'City'}</span>
              <ChevronDown size={16} color={subtextColor} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons Row (Figma Image 1: Save & Exit + Save & Continue) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
        {/* Save & Exit Button with Rule 5 Inactive vs Active State */}
        <button
          type="button"
          onClick={handleSaveAndExit}
          disabled={!isFormValid}
          style={{
            height: '46px',
            padding: '0 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isFormValid ? yellowColor : isLightMode ? '#E5E7EB' : '#352F17',
            color: isFormValid ? '#000000' : isLightMode ? '#9CA3AF' : '#736B42',
            fontWeight: 700,
            fontSize: '13px',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: isFormValid ? '0 2px 8px rgba(245, 200, 66, 0.25)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <span>Save & Exit</span>
          {isFormValid && <Box2BoxPulsingBadge size={14} inverted={false} />}
        </button>

        {/* Save & Continue Button */}
        <button
          type="button"
          onClick={handleSaveAndContinue}
          disabled={!isFormValid}
          style={{
            height: '46px',
            padding: '0 24px',
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
            color: isFormValid ? textColor : subtextColor,
            fontWeight: 600,
            fontSize: '13px',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s ease',
            opacity: isFormValid ? 1 : 0.6,
          }}
        >
          Save & Continue
        </button>
      </div>

      {/* Multi-Purpose Location Modal (Figma Image 2) */}
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
