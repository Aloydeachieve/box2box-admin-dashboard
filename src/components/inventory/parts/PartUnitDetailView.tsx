'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialBoxParts,
  initialPartUnits,
  partUnitActivityHistory,
  PartUnitItem,
} from '@/lib/inventoryMockData';

interface PartUnitDetailViewProps {
  partId: string;
  unitId?: string;
}

export const PartUnitDetailView: React.FC<PartUnitDetailViewProps> = ({
  partId,
  unitId: propUnitId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  const queryUnitId = searchParams.get('unitId');
  const unitId = propUnitId || queryUnitId || 'MBX-789012';
  const selectedLocation = searchParams.get('loc') || 'Ikeja';

  // Find part & unit
  const existingPart = initialBoxParts.find((p) => p.id === partId) || initialBoxParts[0];
  const unit = initialPartUnits.find((u) => u.itemId === unitId || u.id === unitId) || initialPartUnits[0];

  const [isFaulty, setIsFaulty] = useState(unit.isFaulty || false);
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Theme styling tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  // Setup Header Actions and Back button matching Image 3
  useEffect(() => {
    setHeaderActions([
      {
        label: 'Edit',
        onClick: () => {
          router.push(
            `/inventory/parts/${partId}?view=edit-stock&unitId=${encodeURIComponent(
              unitId
            )}&loc=${encodeURIComponent(selectedLocation)}`
          );
        },
      },
      {
        label: 'Mark as faulty',
        hasToggle: true,
        isToggled: isFaulty,
        onClick: () => {
          setIsFaulty((prev) => {
            const next = !prev;
            setActiveToast({
              type: next ? 'flag' : 'success',
              title: next ? 'Marked as Faulty' : 'Fault Cleared',
              message: next
                ? `Unit ${unitId} marked as faulty`
                : `Fault status cleared for unit ${unitId}`,
            });
            return next;
          });
        },
      },
      {
        label: 'Return to stock',
        onClick: () => {
          setActiveToast({
            type: 'success',
            title: 'Returned to Stock',
            message: `Unit ${unitId} unlinked and returned to stock`,
          });
        },
      },
    ]);

    setCustomBack(() => () => {
      router.push(`/inventory/parts/${partId}?view=units&loc=${encodeURIComponent(selectedLocation)}`);
    });

    return () => {
      setHeaderActions([]);
      setCustomBack(null);
    };
  }, [partId, unitId, selectedLocation, isFaulty, router, setHeaderActions, setCustomBack]);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        minHeight: 'calc(100vh - 120px)',
      }}
    >
      {/* LEFT COLUMN: UNIT DETAILS (Matching Image 3) */}
      <div
        style={{
          flex: 1,
          paddingRight: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Title row: Part unit ID + Installed badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            Part unit ID
          </h1>

          <span
            style={{
              backgroundColor: 'rgba(168, 85, 247, 0.15)',
              color: '#A855F7',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              padding: '2px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Installed
          </span>
        </div>

        {/* 2-Row Detailed Metadata matching Image 3 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            fontSize: '12px',
          }}
        >
          {/* Row 1 */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Part</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                {existingPart?.name || 'Name of part'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>SKU</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                {existingPart?.sku || 'MBX-789012'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Category</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                {existingPart?.category || 'Main module'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Location</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                {selectedLocation}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Last updated</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                Aug 02, 2024 | 11:56 AM
              </span>
            </div>
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Supplier</span>
              <span
                onClick={() => router.push('/inventory/parts/suppliers/bpsup-1')}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Abc Ltd
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Amount</span>
              <span style={{ color: textColor, fontWeight: 700 }}>
                {unit?.priceBought || '₦150,000'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Added by</span>
              <span
                style={{
                  color: textColor,
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                James Moses
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Linked by</span>
              <span
                style={{
                  color: textColor,
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                James Moses
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: subtextColor }}>Linked box</span>
              <span
                onClick={() => router.push('/box-management/1')}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                MyBox-123456
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVITY HISTORY (Matching Image 3) */}
      <div
        style={{
          width: '320px',
          flexShrink: 0,
          borderLeft: `1px solid ${borderColor}`,
          paddingLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h3
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#9CA3AF',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Activity history
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {partUnitActivityHistory.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: textColor,
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: subtextColor,
                }}
              >
                {item.description}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '4px',
                }}
              >
                <span style={{ fontSize: '11px', color: subtextColor }}>
                  {item.actor}
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: subtextColor,
                  }}
                >
                  {item.role}
                </span>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: isLightMode ? '#9CA3AF' : '#71717A',
                }}
              >
                {item.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

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
