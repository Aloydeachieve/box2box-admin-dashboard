'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ScanLine } from 'lucide-react';
import { DropdownPickerModal } from './DropdownPickerModal';
import { StockUpdatedModal } from './StockUpdatedModal';
import { ToastNotification } from '@/components/common/ToastNotification';

interface UpdateModelStockViewProps {
  modelId: string;
  locationName?: string;
  isLightMode?: boolean;
  onBack: () => void;
  onStockAdded?: (newUnit: {
    boxId: string;
    model: string;
    location: string;
    battery: string;
  }) => void;
}

export const UpdateModelStockView: React.FC<UpdateModelStockViewProps> = ({
  modelId,
  locationName = 'Ikeja',
  isLightMode = false,
  onBack,
  onStockAdded,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryLoc = searchParams?.get('loc');
  const queryUnitId = searchParams?.get('unitId');

  // Box form state matching Image 3
  const [boxIdCounter, setBoxIdCounter] = useState(123456);
  const [boxId, setBoxId] = useState(queryUnitId || 'MyBox-123456');
  const [isBoxIdFocused, setIsBoxIdFocused] = useState(false);
  const [model, setModel] = useState('MyBox-Standard');
  const [location, setLocation] = useState(queryLoc || locationName || 'Awka');
  const [battery, setBattery] = useState('B-123456');

  // Update when query params change
  useEffect(() => {
    if (queryLoc) setLocation(queryLoc);
    if (queryUnitId) setBoxId(queryUnitId);
  }, [queryLoc, queryUnitId]);

  // Cabinet A1 parts
  const [a1Door, setA1Door] = useState('B-123456');
  const [a1Lock, setA1Lock] = useState('B-123456');
  const [a1Hinge, setA1Hinge] = useState('B-123456');

  // Cabinet A2 parts
  const [a2Door, setA2Door] = useState('B-123456');
  const [a2Lock, setA2Lock] = useState('B-123456');
  const [a2Hinge, setA2Hinge] = useState('B-123456');

  // Picker modal state matching Image 4
  const [pickerModal, setPickerModal] = useState<{
    isOpen: boolean;
    title: string;
    options: string[];
    selectedValue: string;
    onSelect: (val: string) => void;
  }>({
    isOpen: false,
    title: '',
    options: [],
    selectedValue: '',
    onSelect: () => {},
  });

  // Success modal & toast
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Styling tokens matching Figma
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const inputBg = isLightMode ? '#F9FAFB' : '#141416';
  const fieldBorder = isLightMode ? '#D1D5DB' : '#27272A';
  const yellowColor = '#F5C842';

  // Open dropdown helper
  const openPicker = (
    title: string,
    options: string[],
    selectedValue: string,
    onSelect: (val: string) => void
  ) => {
    setPickerModal({
      isOpen: true,
      title,
      options,
      selectedValue,
      onSelect,
    });
  };

  // Handle Save & Exit
  const handleSaveAndExit = () => {
    onStockAdded?.({
      boxId,
      model,
      location,
      battery,
    });
    setShowSuccessModal(true);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  // Handle Save & Continue
  const handleSaveAndContinue = () => {
    onStockAdded?.({
      boxId,
      model,
      location,
      battery,
    });
    setToastMessage(`Box ${boxId} added to stock successfully.`);
    const nextCounter = boxIdCounter + 1;
    setBoxIdCounter(nextCounter);
    setBoxId(`MyBox-${nextCounter}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Reusable Floating Select Box matching Figma Image 3
  const FloatingSelect = ({
    label,
    value,
    onClick,
    borderYellow = false,
  }: {
    label: string;
    value: string;
    onClick: () => void;
    borderYellow?: boolean;
  }) => (
    <div
      onClick={onClick}
      style={{
        height: '52px',
        backgroundColor: inputBg,
        border: borderYellow ? `1.5px solid ${yellowColor}` : `1px solid ${fieldBorder}`,
        borderRadius: '10px',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            fontSize: '10px',
            color: subtextColor,
            fontWeight: 500,
            lineHeight: 1,
            marginBottom: '3px',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: '13px',
            color: textColor,
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {value}
        </span>
      </div>
      <ChevronDown size={15} color={subtextColor} />
    </div>
  );

  return (
    <div
      style={{
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <ToastNotification
          type="success"
          title="Stock Updated"
          message={toastMessage}
          isLightMode={isLightMode}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Main Form Container */}
      <div style={{ maxWidth: '980px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Card 1: About box matching Image 3 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            About box
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Box ID (Auto-generated) with floating label inside input */}
            <div
              style={{
                height: '52px',
                backgroundColor: inputBg,
                border: isBoxIdFocused ? `1.5px solid ${yellowColor}` : `1.5px solid ${yellowColor}`,
                borderRadius: '10px',
                padding: '6px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s ease',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  color: isBoxIdFocused ? yellowColor : subtextColor,
                  fontWeight: 500,
                  lineHeight: 1,
                  marginBottom: '2px',
                  transition: 'color 0.15s ease',
                }}
              >
                Box ID (Auto-generated)
              </span>
              <input
                type="text"
                value={boxId}
                onFocus={() => setIsBoxIdFocused(true)}
                onBlur={() => setIsBoxIdFocused(false)}
                onChange={(e) => setBoxId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: 0,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              />
            </div>

            {/* Model dropdown */}
            <FloatingSelect
              label="Model"
              value={model}
              borderYellow={true}
              onClick={() =>
                openPicker(
                  'model',
                  ['MyBox-Standard', 'MyBox-Elite', 'MyBox-Star'],
                  model,
                  (val) => setModel(val)
                )
              }
            />

            {/* Location dropdown (Image 4: Awka, Ikeja) */}
            <FloatingSelect
              label="Location"
              value={location}
              borderYellow={true}
              onClick={() =>
                openPicker('location', ['Awka', 'Ikeja', 'Lekki Phase 1', 'Victoria Island'], location, (val) => setLocation(val))
              }
            />

            {/* Battery dropdown (Image 4: B-123456, B-123457) */}
            <FloatingSelect
              label="Battery"
              value={battery}
              borderYellow={false}
              onClick={() =>
                openPicker(
                  'battery',
                  ['B-123456', 'B-123457'],
                  battery,
                  (val) => setBattery(val)
                )
              }
            />
          </div>

          {/* Scan to add action button enclosed in yellow border */}
          <div>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Scanner initialized. Point camera at barcode.');
                setTimeout(() => setToastMessage(null), 2500);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                border: `1px solid ${yellowColor}`,
                borderRadius: '6px',
                color: yellowColor,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 14px',
                transition: 'background-color 0.15s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 200, 66, 0.1)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <ScanLine size={14} color={yellowColor} />
              <span>Scan to add</span>
            </button>
          </div>
        </div>

        {/* Card 2: Cabinet A1 parts matching Image 3 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Cabinet A1 parts
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Door (Image 4: B-123456, D-123456) */}
            <FloatingSelect
              label="Door"
              value={a1Door}
              borderYellow={false}
              onClick={() =>
                openPicker('door', ['B-123456', 'D-123456', 'D-123457'], a1Door, (val) => setA1Door(val))
              }
            />

            {/* Lock (Image 4: B-123456, L-123456) */}
            <FloatingSelect
              label="Lock"
              value={a1Lock}
              borderYellow={false}
              onClick={() =>
                openPicker('lock', ['B-123456', 'L-123456', 'L-123457'], a1Lock, (val) => setA1Lock(val))
              }
            />

            {/* Hinge (Image 4: B-123456, H-123456) */}
            <FloatingSelect
              label="Hinge"
              value={a1Hinge}
              borderYellow={false}
              onClick={() =>
                openPicker('hinge', ['B-123456', 'H-123456', 'H-123457'], a1Hinge, (val) => setA1Hinge(val))
              }
            />
          </div>
        </div>

        {/* Card 3: Cabinet A2 parts matching Image 3 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Cabinet A2 parts
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Door */}
            <FloatingSelect
              label="Door"
              value={a2Door}
              borderYellow={false}
              onClick={() =>
                openPicker('door', ['B-123456', 'D-123456', 'D-123457'], a2Door, (val) => setA2Door(val))
              }
            />

            {/* Lock */}
            <FloatingSelect
              label="Lock"
              value={a2Lock}
              borderYellow={false}
              onClick={() =>
                openPicker('lock', ['B-123456', 'L-123456', 'L-123457'], a2Lock, (val) => setA2Lock(val))
              }
            />

            {/* Hinge */}
            <FloatingSelect
              label="Hinge"
              value={a2Hinge}
              borderYellow={false}
              onClick={() =>
                openPicker('hinge', ['B-123456', 'H-123456', 'H-123457'], a2Hinge, (val) => setA2Hinge(val))
              }
            />
          </div>
        </div>

        {/* Bottom Form Action Buttons matching Image 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
          {/* Save & Exit (Solid Yellow) */}
          <button
            type="button"
            onClick={handleSaveAndExit}
            style={{
              padding: '11px 26px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: yellowColor,
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.15s ease, opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Save & Exit
          </button>

          {/* Save & Continue (White button matching Image 3) */}
          <button
            type="button"
            onClick={handleSaveAndContinue}
            style={{
              padding: '11px 26px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.15s ease, opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Save & Continue
          </button>
        </div>
      </div>

      {/* Dropdown Picker Popover matching Image 4 */}
      <DropdownPickerModal
        isOpen={pickerModal.isOpen}
        onClose={() => setPickerModal((p) => ({ ...p, isOpen: false }))}
        title={pickerModal.title}
        options={pickerModal.options}
        selectedValue={pickerModal.selectedValue}
        onSelect={pickerModal.onSelect}
        isLightMode={isLightMode}
      />

      {/* Stock Updated Modal matching Image 5 box 5 */}
      <StockUpdatedModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        isLightMode={isLightMode}
        message="Item added to stock successfully"
      />
    </div>
  );
};
