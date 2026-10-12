'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectLocationModal } from './SelectLocationModal';
import { SelectPartModal } from './SelectPartModal';

interface EditAccessoryStockViewProps {
  accessoryId: string;
  unitId?: string;
}

export const EditAccessoryStockView: React.FC<EditAccessoryStockViewProps> = ({
  accessoryId,
  unitId = 'P-123456',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  const initialLoc = searchParams.get('loc') || 'Awka';

  // State matching Image 5
  const [itemId, setItemId] = useState(unitId || 'Item ID (Auto-generated)');
  const [accessoryName, setAccessoryName] = useState('Name of accessory');
  const [location, setLocation] = useState(initialLoc);

  // 3 Parts matching Image 5
  const [part1, setPart1] = useState('Part ID');
  const [part2, setPart2] = useState('Part ID');
  const [part3, setPart3] = useState('Part ID');

  // Modals
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPartModal, setShowPartModal] = useState(false);
  const [activePartSlot, setActivePartSlot] = useState<1 | 2 | 3>(1);

  // Toast
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

  // Clean Header & Back Navigation
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.push(
        `/inventory/accessories/${accessoryId}?view=unit-detail&unitId=${encodeURIComponent(
          unitId
        )}&loc=${encodeURIComponent(location)}`
      );
    });
    return () => {
      setCustomBack(null);
    };
  }, [accessoryId, unitId, location, router, setCustomBack, setHeaderActions]);

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Stock Updated',
      message: `Stock for ${accessoryName} (${itemId}) updated successfully`,
    });
    setTimeout(() => {
      router.push(
        `/inventory/accessories/${accessoryId}?view=unit-detail&unitId=${encodeURIComponent(
          unitId
        )}&loc=${encodeURIComponent(location)}`
      );
    }, 800);
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
      <form onSubmit={handleUpdateStock} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

          {/* Row 1: Item ID & Accessory */}
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
              <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Item ID (Auto-generated)"
                style={{
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 500,
                  outline: 'none',
                  padding: 0,
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

          {/* Row 2: Location with yellow border */}
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

          {/* Row 1: Part 1 & Part 2 */}
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
                  Part name
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 500, marginTop: '2px' }}>
                  {part1}
                </span>
              </div>
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
                  Part name
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 500, marginTop: '2px' }}>
                  {part2}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>

          {/* Row 2: Part 3 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            <div
              onClick={() => {
                setActivePartSlot(3);
                setShowPartModal(true);
              }}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
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
                  Part name
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 500, marginTop: '2px' }}>
                  {part3}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON: Update stock (yellow) matching Image 5 */}
        <div>
          <button
            type="submit"
            style={{
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '8px',
              border: 'none',
              padding: '12px 32px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Update stock
          </button>
        </div>
      </form>

      {/* Select Location Modal */}
      <SelectLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        isLightMode={isLightMode}
        selectedLocation={location}
        onSelectLocation={(loc) => setLocation(loc)}
      />

      {/* Select Part Modal */}
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
