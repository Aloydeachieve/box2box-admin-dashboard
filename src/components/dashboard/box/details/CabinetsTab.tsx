'use client';

import React from 'react';
import { Box } from 'lucide-react';

interface CabinetsTabProps {
  isLightMode?: boolean;
  selectedCabinet: string | null;
  onSelectCabinet: (id: string) => void;
}

export const CabinetsTab: React.FC<CabinetsTabProps> = ({
  isLightMode = false,
  selectedCabinet,
  onSelectCabinet,
}) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  const cabinets = [
    {
      id: 'A3',
      status: 'Booked',
      statusColor: '#EF4444',
      statusBg: 'rgba(239, 68, 68, 0.15)',
      occupant: 'Aku Cynthia',
    },
    {
      id: 'A4',
      status: 'Available',
      statusColor: '#10B981',
      statusBg: 'rgba(16, 185, 129, 0.15)',
    },
    {
      id: 'A5',
      status: 'Occupied',
      statusColor: '#F5C842',
      statusBg: 'rgba(245, 200, 66, 0.15)',
      occupant: 'Box owner',
    },
    {
      id: 'A6',
      status: 'Unavailable',
      statusColor: '#9CA3AF',
      statusBg: 'rgba(156, 163, 175, 0.15)',
      occupant: 'Aku Cynthia',
    },
  ];

  const selectedCabData = cabinets.find((c) => c.id === selectedCabinet);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.25fr)',
        gap: '16px',
      }}
      className="cabinet-grid-container"
    >
      {/* Left Card: Cabinet Layout (2x2 Grid) */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
          Cabinet layout
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
          }}
        >
          {cabinets.map((cab) => {
            const isSelected = selectedCabinet === cab.id;
            return (
              <div
                key={cab.id}
                onClick={() => onSelectCabinet(cab.id)}
                style={{
                  backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                  borderRadius: '12px',
                  border: isSelected
                    ? '2px solid #F5C842'
                    : isLightMode
                    ? '1px solid #E5E7EB'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  minHeight: '110px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222227';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1A1A1E';
                  }
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>{cab.id}</div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: cab.statusColor,
                    backgroundColor: cab.statusBg,
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {cab.status}
                </span>
                {cab.occupant && (
                  <div style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                    {cab.occupant}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Card: Cabinet Info matching Figma Images 2, 3, 4 */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: '360px',
        }}
      >
        {/* Top Header of Cabinet Info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Cabinet info
          </h3>

          {selectedCabData && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: selectedCabData.statusColor,
                backgroundColor: selectedCabData.statusBg,
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              {selectedCabData.status}
            </span>
          )}
        </div>

        {/* 1. Unselected State */}
        {!selectedCabinet && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: '12px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box size={24} color={subtextColor} />
            </div>
            <div style={{ fontSize: '13px', color: subtextColor }}>
              Select cabinet to view data
            </div>
          </div>
        )}

        {/* 2. Available State (Image 2 - A4) */}
        {selectedCabinet === 'A4' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {/* Center available badge banner */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 0',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#1F1F24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box size={22} color={subtextColor} />
              </div>
              <div style={{ fontSize: '12px', color: subtextColor }}>
                This cabinet is available for booking
              </div>
            </div>

            {/* Last booking row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: subtextColor }}>Last booking</span>
              <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2025 | 11:56 AM</span>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Usage history section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Usage history</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of opens</span>
                <span style={{ color: textColor, fontWeight: 600 }}>3,098</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Total booking</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>80</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Parts section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Parts</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Door</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Hinge</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123457</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Lock</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Booked State (Image 3 - A3) */}
        {selectedCabinet === 'A3' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {/* Booking Details rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Booking ID</span>
                <span style={{ color: textColor, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>#92739</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Customer Name</span>
                <span style={{ color: textColor, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>Aku Cynthia</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Date</span>
                <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2026 | 11:51 AM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Booked as</span>
                <span style={{ color: textColor, fontWeight: 600 }}>Destination</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Status</span>
                <span style={{ color: textColor, fontWeight: 600 }}>Awaiting drop off</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Rider</span>
                <span style={{ color: textColor, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>Ahmed Musa</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>ETA</span>
                <span style={{ color: textColor, fontWeight: 600 }}>3 mins</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Usage history section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Usage history</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of opens</span>
                <span style={{ color: textColor, fontWeight: 600 }}>3,098</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Total booking</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>80</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Parts section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Parts</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Door</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Hinge</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123457</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Lock</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Occupied State (Image 4 - A5) */}
        {selectedCabinet === 'A5' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {/* Center owner unavailable banner */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 0',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#1F1F24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box size={22} color={subtextColor} />
              </div>
              <div style={{ fontSize: '12px', color: subtextColor, textAlign: 'center' }}>
                This cabinet has been made unavailable by the owner
              </div>
            </div>

            {/* Last available row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: subtextColor }}>Last available</span>
              <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2025 | 11:56 AM</span>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Usage history section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Usage history</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of opens</span>
                <span style={{ color: textColor, fontWeight: 600 }}>3,098</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Total booking</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>80</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Parts section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Parts</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Door</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Hinge</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123457</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Lock</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. Unavailable State (A6) */}
        {selectedCabinet === 'A6' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {/* Center unavailable maintenance banner */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 0',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#1F1F24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box size={22} color={subtextColor} />
              </div>
              <div style={{ fontSize: '12px', color: subtextColor, textAlign: 'center' }}>
                This cabinet is currently undergoing maintenance and is unavailable
              </div>
            </div>

            {/* Last active row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: subtextColor }}>Last active</span>
              <span style={{ color: textColor, fontWeight: 600 }}>Aug 01, 2025 | 09:20 AM</span>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Usage history section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Usage history</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of opens</span>
                <span style={{ color: textColor, fontWeight: 600 }}>3,098</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Total booking</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>No. of code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>80</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Code regenerated</span>
                <span style={{ color: textColor, fontWeight: 600 }}>₦30,000,000</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

            {/* Parts section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Parts</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Door</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Hinge</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123457</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: subtextColor }}>Lock</span>
                <span style={{ color: textColor, fontWeight: 600 }}>P-123456</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
