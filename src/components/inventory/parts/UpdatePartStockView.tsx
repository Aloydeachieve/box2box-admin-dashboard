'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Scan } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialBoxParts,
} from '@/lib/inventoryMockData';
import { PartsSearchDropdown } from './PartsSearchDropdown';

interface UpdatePartStockViewProps {
  partId?: string;
}

export const UpdatePartStockView: React.FC<UpdatePartStockViewProps> = ({
  partId = 'bp-1',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  const selectedLocation = searchParams.get('loc') || 'Ikeja';
  const existingPart = initialBoxParts.find((p) => p.id === partId) || initialBoxParts[0];

  // Form states matching Image 5
  const [itemId, setItemId] = useState('1234567');
  const [partName, setPartName] = useState(existingPart?.name || 'Given name of part');
  const [supplier, setSupplier] = useState('');
  const [amount, setAmount] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [linkedUnitId, setLinkedUnitId] = useState('');

  const [showSupplierMenu, setShowSupplierMenu] = useState(false);
  const supplierOptions = ['Abc Ltd', 'XYZ Corp', 'ElectroTech Ltd', 'Global Parts Co', 'VarTech Systems'];

  // Toast
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Styling Tokens matching Rule 6
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const inputBg = isLightMode ? '#F9FAFB' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Setup Back navigation and clear top Actions button
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.push(`/inventory/parts/${partId}?view=units&loc=${encodeURIComponent(selectedLocation)}`);
    });

    return () => {
      setCustomBack(null);
    };
  }, [partId, selectedLocation, router, setCustomBack, setHeaderActions]);

  const handleSavePart = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Part Stock Saved',
      message: `Stock entry for ${partName} (${itemId}) saved at ${selectedLocation}`,
    });

    setTimeout(() => {
      router.push(`/inventory/parts/${partId}?view=units&loc=${encodeURIComponent(selectedLocation)}`);
    }, 800);
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Stock Saved',
      message: `Stock entry for ${itemId} saved. Ready for next item.`,
    });

    // Auto-generate next item ID and reset transient fields
    const nextNum = Math.floor(1000000 + Math.random() * 9000000);
    setItemId(String(nextNum));
    setSerialNumber('');
    setLinkedUnitId('');
  };

  const handleScanToAdd = () => {
    const generatedBarcode = `SN-${Math.floor(100000 + Math.random() * 900000)}`;
    setSerialNumber(generatedBarcode);
    setActiveToast({
      type: 'success',
      title: 'Barcode Scanned',
      message: `Barcode detected: ${generatedBarcode}`,
    });
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
        maxWidth: '1100px',
      }}
    >
      <form onSubmit={handleSavePart} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* About part Container Card matching Image 5 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            About part
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Col 1, Row 1: Item ID (Auto-generated) */}
            <div>
              <label
                style={{
                  fontSize: '12px',
                  color: subtextColor,
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Item ID (Auto-generated)
              </label>
              <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: inputBg,
                  border: `1px solid ${yellowColor}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Col 2, Row 1: Part name */}
            <div>
              <label
                style={{
                  fontSize: '12px',
                  color: subtextColor,
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Part name
              </label>
              <input
                type="text"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                placeholder="Given name of part"
                style={{
                  width: '100%',
                  backgroundColor: inputBg,
                  border: `1px solid ${yellowColor}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Col 1, Row 2: Supplier Dropdown with Opaque Search Dropdown */}
            <div>
              <PartsSearchDropdown
                label="Supplier"
                value={supplier}
                options={supplierOptions}
                isOpen={showSupplierMenu}
                onToggle={() => setShowSupplierMenu(!showSupplierMenu)}
                onClose={() => setShowSupplierMenu(false)}
                onSelect={(opt) => setSupplier(opt)}
                isLightMode={isLightMode}
                searchPlaceholder="Search supplier..."
              />
            </div>

            {/* Col 2, Row 2: Amount (with Naira sign) */}
            <div>
              <label
                style={{
                  fontSize: '12px',
                  color: subtextColor,
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Amount
              </label>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '12px 38px 12px 14px',
                    fontSize: '14px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '14px',
                    color: subtextColor,
                    fontSize: '14px',
                    fontWeight: 700,
                    pointerEvents: 'none',
                  }}
                >
                  ₦
                </span>
              </div>
            </div>

            {/* Col 1, Row 3: Serial number (Optional) */}
            <div>
              <label
                style={{
                  fontSize: '12px',
                  color: subtextColor,
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Serial number (Optional)
              </label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder=""
                style={{
                  width: '100%',
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Col 2, Row 3: Linked unit ID (Auto-populated) */}
            <div>
              <label
                style={{
                  fontSize: '12px',
                  color: subtextColor,
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Linked unit ID (Auto-populated)
              </label>
              <input
                type="text"
                value={linkedUnitId}
                onChange={(e) => setLinkedUnitId(e.target.value)}
                placeholder=""
                style={{
                  width: '100%',
                  backgroundColor: inputBg,
                  border: `1px solid ${yellowColor}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Scan to add Button matching Image 5 */}
          <div style={{ paddingTop: '6px' }}>
            <button
              type="button"
              onClick={handleScanToAdd}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: 'transparent',
                border: 'none',
                color: yellowColor,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'background-color 0.15s ease',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = isLightMode
                  ? 'rgba(245, 200, 66, 0.1)'
                  : 'rgba(245, 200, 66, 0.08)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              <Scan size={18} color={yellowColor} />
              <span>Scan to add</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Save part & Save & Continue matching Image 5 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 28px',
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Save part
          </button>

          <button
            type="button"
            onClick={handleSaveAndContinue}
            style={{
              padding: '12px 28px',
              backgroundColor: isLightMode ? '#E5E7EB' : '#27272A',
              color: isLightMode ? '#111827' : '#9CA3AF',
              fontWeight: 600,
              fontSize: '14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = isLightMode
                ? '#D1D5DB'
                : '#323238')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = isLightMode
                ? '#E5E7EB'
                : '#27272A')
            }
          >
            Save & Continue
          </button>
        </div>
      </form>

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
