'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Scan } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectPartModal } from './SelectPartModal';
import { SelectLocationModal } from './SelectLocationModal';

interface UpdateAccessoryStockViewProps {
  accessoryId?: string;
}

export const UpdateAccessoryStockView: React.FC<UpdateAccessoryStockViewProps> = ({
  accessoryId = 'MBX-789012',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  const initialLoc = searchParams.get('loc') || 'Awka';

  // Form State matching Image 5
  const [itemId, setItemId] = useState('P-123457');
  const [accessoryName, setAccessoryName] = useState('Name of accessory');
  const [location, setLocation] = useState(initialLoc);

  // 3 Part selects
  const [part1, setPart1] = useState('B-123456');
  const [part2, setPart2] = useState('B-123457');
  const [part3, setPart3] = useState('B-123456');

  // Modal states matching Image 2
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPartModal, setShowPartModal] = useState(false);
  const [activePartSlot, setActivePartSlot] = useState<1 | 2 | 3>(1);

  // Toast State
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Styling Tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#F9FAFB' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Setup Back navigation and clear top Actions button
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.push(`/inventory/accessories/${accessoryId}?view=units&loc=${encodeURIComponent(location)}`);
    });
    return () => {
      setCustomBack(null);
    };
  }, [accessoryId, location, router, setCustomBack, setHeaderActions]);

  const handleSaveAndExit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Stock Updated',
      message: `Stock for ${accessoryName} (${itemId}) saved at ${location}`,
    });
    setTimeout(() => {
      router.push(`/inventory/accessories/${accessoryId}?view=units&loc=${encodeURIComponent(location)}`);
    }, 800);
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Stock Saved',
      message: `Stock entry saved. Ready for next item.`,
    });
    // Auto increment / clear
    setItemId(`P-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
        maxWidth: '1200px',
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* CARD 1: ABOUT ACCESSORY matching Image 5 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>
            About accessory
          </div>

          {/* Row 1: Item ID (Auto-generated) & Accessory */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Item ID with yellow border */}
            <div
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${yellowColor}`,
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '54px',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                Item ID (Auto-generated)
              </span>
              <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  padding: 0,
                  marginTop: '2px',
                }}
              />
            </div>

            {/* Accessory with yellow border */}
            <div
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${yellowColor}`,
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '54px',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                Accessory
              </span>
              <input
                type="text"
                value={accessoryName}
                onChange={(e) => setAccessoryName(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  padding: 0,
                  marginTop: '2px',
                }}
              />
            </div>
          </div>

          {/* Row 2: Location (Half width, yellow border) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            <div
              onClick={() => setShowLocationModal(true)}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${yellowColor}`,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                  Location
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {location}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>

          {/* Row 3: Scan to add button matching Image 5 */}
          <div>
            <button
              type="button"
              onClick={() => {
                setActiveToast({
                  type: 'success',
                  title: 'Scanner Active',
                  message: 'Position camera to scan accessory barcode',
                });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                color: yellowColor,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              <Scan size={16} color={yellowColor} />
              <span>Scan to add</span>
            </button>
          </div>
        </div>

        {/* CARD 2: PARTS matching Image 5 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>
            Parts
          </div>

          {/* Grid of 3 Part Selects */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Part 1 */}
            <div
              onClick={() => {
                setActivePartSlot(1);
                setShowPartModal(true);
              }}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                {part1 || 'Part name'}
              </span>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Part 2 */}
            <div
              onClick={() => {
                setActivePartSlot(2);
                setShowPartModal(true);
              }}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                {part2 || 'Part name'}
              </span>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Part 3 */}
            <div
              onClick={() => {
                setActivePartSlot(3);
                setShowPartModal(true);
              }}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                {part3 || 'Part name'}
              </span>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS: Save & Exit (yellow) & Save & Continue (dark gray) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="button"
            onClick={handleSaveAndExit}
            style={{
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '8px',
              border: 'none',
              padding: '12px 28px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Save & Exit
          </button>

          <button
            type="button"
            onClick={handleSaveAndContinue}
            style={{
              backgroundColor: isLightMode ? '#E5E7EB' : '#2A2A2E',
              color: isLightMode ? '#111827' : '#FFFFFF',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              padding: '12px 28px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Save & Continue
          </button>
        </div>
      </form>

      {/* Select Location Modal matching Image 2 */}
      <SelectLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        isLightMode={isLightMode}
        selectedLocation={location}
        onSelectLocation={(loc) => setLocation(loc)}
      />

      {/* Select Part Modal matching Image 2 */}
      <SelectPartModal
        isOpen={showPartModal}
        onClose={() => setShowPartModal(false)}
        isLightMode={isLightMode}
        selectedPart={
          activePartSlot === 1 ? part1 : activePartSlot === 2 ? part2 : part3
        }
        onSelectPart={(p) => {
          if (activePartSlot === 1) setPart1(p);
          else if (activePartSlot === 2) setPart2(p);
          else setPart3(p);
        }}
      />

      {/* Toast Notification */}
      {activeToast && (
        <ToastNotification
          type={activeToast.type}
          title={activeToast.title}
          message={activeToast.message}
          isLightMode={isLightMode}
          onClose={() => setActiveToast(null)}
        />
      )}
    </div>
  );
};
