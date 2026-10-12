'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectLocationModal } from './SelectLocationModal';
import { SelectPartModal } from './SelectPartModal';

interface UpdateUnitViewProps {
  accessoryId: string;
  unitId?: string;
}

export const UpdateUnitView: React.FC<UpdateUnitViewProps> = ({
  accessoryId,
  unitId = 'B-123456',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  const initialLoc = searchParams.get('loc') || 'Awka';

  // Form State matching Image 3
  const [boxId, setBoxId] = useState(unitId || 'Box ID (Auto-generated)');
  const [model, setModel] = useState('MyBox-Standard');
  const [location, setLocation] = useState(initialLoc);
  const [battery, setBattery] = useState('B-123456');

  // Cabinet A1
  const [a1Door, setA1Door] = useState('B-123456');
  const [a1Lock, setA1Lock] = useState('B-123456');
  const [a1Hinge, setA1Hinge] = useState('B-123456');

  // Cabinet A2
  const [a2Door, setA2Door] = useState('B-123456');
  const [a2Lock, setA2Lock] = useState('B-123456');
  const [a2Hinge, setA2Hinge] = useState('B-123456');

  // Modal State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPartModal, setShowPartModal] = useState(false);
  const [activePartKey, setActivePartKey] = useState<string>('battery');

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

  // Back Navigation & Clean Header Actions
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.push(`/inventory/accessories/${accessoryId}?view=units&loc=${encodeURIComponent(location)}`);
    });
    return () => {
      setCustomBack(null);
    };
  }, [accessoryId, location, router, setCustomBack, setHeaderActions]);

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Unit Updated',
      message: `Stock for unit ${boxId} updated successfully`,
    });
    setTimeout(() => {
      router.push(`/inventory/accessories/${accessoryId}?view=units&loc=${encodeURIComponent(location)}`);
    }, 800);
  };

  const openPartModal = (key: string) => {
    setActivePartKey(key);
    setShowPartModal(true);
  };

  const getActivePartValue = () => {
    switch (activePartKey) {
      case 'battery': return battery;
      case 'a1Door': return a1Door;
      case 'a1Lock': return a1Lock;
      case 'a1Hinge': return a1Hinge;
      case 'a2Door': return a2Door;
      case 'a2Lock': return a2Lock;
      case 'a2Hinge': return a2Hinge;
      default: return 'B-123456';
    }
  };

  const handleSetPartValue = (part: string) => {
    switch (activePartKey) {
      case 'battery': setBattery(part); break;
      case 'a1Door': setA1Door(part); break;
      case 'a1Lock': setA1Lock(part); break;
      case 'a1Hinge': setA1Hinge(part); break;
      case 'a2Door': setA2Door(part); break;
      case 'a2Lock': setA2Lock(part); break;
      case 'a2Hinge': setA2Hinge(part); break;
    }
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
        {/* CARD 1: ABOUT BOX matching Image 3 */}
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
            About box
          </div>

          {/* Row 1: Box ID & Model */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Box ID (Auto-generated) with yellow border */}
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
                value={boxId}
                onChange={(e) => setBoxId(e.target.value)}
                placeholder="Box ID (Auto-generated)"
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

            {/* Model with yellow border */}
            <div
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
                  Model
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {model}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>

          {/* Row 2: Location & Battery */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Location */}
            <div
              onClick={() => setShowLocationModal(true)}
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
                  Location
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {location}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Battery */}
            <div
              onClick={() => openPartModal('battery')}
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
                  Battery
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {battery}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>
        </div>

        {/* CARD 2: CABINET A1 PARTS matching Image 3 */}
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
            Cabinet A1 parts
          </div>

          {/* Row 1: Door & Lock */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Door */}
            <div
              onClick={() => openPartModal('a1Door')}
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
                  Door
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {a1Door}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Lock */}
            <div
              onClick={() => openPartModal('a1Lock')}
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
                  Lock
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {a1Lock}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>

          {/* Row 2: Hinge */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            <div
              onClick={() => openPartModal('a1Hinge')}
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
                  Hinge
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {a1Hinge}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>
        </div>

        {/* CARD 3: CABINET A2 PARTS matching Image 3 */}
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
            Cabinet A2 parts
          </div>

          {/* Row 1: Door & Lock */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Door */}
            <div
              onClick={() => openPartModal('a2Door')}
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
                  Door
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {a2Door}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Lock */}
            <div
              onClick={() => openPartModal('a2Lock')}
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
                  Lock
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {a2Lock}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>

          {/* Row 2: Hinge */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            <div
              onClick={() => openPartModal('a2Hinge')}
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
                  Hinge
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {a2Hinge}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON: Update stock (yellow) matching Image 3 */}
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
        selectedPart={getActivePartValue()}
        onSelectPart={handleSetPartValue}
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
