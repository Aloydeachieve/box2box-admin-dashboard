'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { PartsSearchDropdown } from './PartsSearchDropdown';
import {
  initialBoxParts,
  initialPartUnits,
  PartUnitItem,
} from '@/lib/inventoryMockData';

interface EditPartStockViewProps {
  partId: string;
  unitId?: string;
}

export const EditPartStockView: React.FC<EditPartStockViewProps> = ({
  partId,
  unitId: propUnitId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  const queryUnitId = searchParams.get('unitId');
  const unitId = propUnitId || queryUnitId || '1234567';
  const selectedLocation = searchParams.get('loc') || 'Ikeja';

  const existingPart = initialBoxParts.find((p) => p.id === partId) || initialBoxParts[0];
  const unit = initialPartUnits.find((u) => u.itemId === unitId || u.id === unitId) || initialPartUnits[0];

  // Form states matching Image 4
  const [itemId, setItemId] = useState(unit?.itemId || '1234567');
  const [partName, setPartName] = useState(existingPart?.name || 'Given name of part');
  const [supplier, setSupplier] = useState(unit?.supplierName || 'Abc Ltd');
  const [amount, setAmount] = useState(unit?.priceBought?.replace(/[^0-9]/g, '') || '100');
  const [serialNumber, setSerialNumber] = useState(unit?.serialNumber || '123456');
  const [linkedUnitId, setLinkedUnitId] = useState(unit?.linkedUnit || 'Unit Id appear here');

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
      router.push(
        `/inventory/parts/${partId}?view=unit-detail&unitId=${encodeURIComponent(
          unitId
        )}&loc=${encodeURIComponent(selectedLocation)}`
      );
    });

    return () => {
      setCustomBack(null);
    };
  }, [partId, unitId, selectedLocation, router, setCustomBack, setHeaderActions]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Stock Updated',
      message: `Part stock unit "${itemId}" updated successfully`,
    });

    setTimeout(() => {
      router.push(
        `/inventory/parts/${partId}?view=unit-detail&unitId=${encodeURIComponent(
          itemId
        )}&loc=${encodeURIComponent(selectedLocation)}`
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
        maxWidth: '1100px',
      }}
    >
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* About part Container Card matching Image 4 */}
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
                  placeholder="100"
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
                placeholder="123456"
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
                placeholder="Unit Id appear here"
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
        </div>

        {/* Update part Submit Button matching Image 4 */}
        <div>
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
            Update part
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
