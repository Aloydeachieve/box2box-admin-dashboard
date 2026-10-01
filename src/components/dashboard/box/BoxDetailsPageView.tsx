'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Battery,
  User,
  Star,
  Box,
  Layers,
  Calendar,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface BoxDetailsPageViewProps {
  boxId?: string;
  onBack: () => void;
  isLightMode?: boolean;
}

export const BoxDetailsPageView: React.FC<BoxDetailsPageViewProps> = ({
  boxId = 'MyBox-123456',
  onBack,
  isLightMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<'Cabinets' | 'Bookings' | 'Battery' | 'Reviews' | 'Code usage' | 'Reports' | 'Box activity'>('Cabinets');
  const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null);

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  const tabs: Array<'Cabinets' | 'Bookings' | 'Battery' | 'Reviews' | 'Code usage' | 'Reports' | 'Box activity'> = [
    'Cabinets',
    'Bookings',
    'Battery',
    'Reviews',
    'Code usage',
    'Reports',
    'Box activity',
  ];

  const cabinets = [
    { id: 'A3', status: 'Occupied', statusColor: '#EF4444', statusBg: 'rgba(239, 68, 68, 0.15)', occupant: 'Aku Cynthia' },
    { id: 'A4', status: 'Available', statusColor: '#10B981', statusBg: 'rgba(16, 185, 129, 0.15)' },
    { id: 'A5', status: 'Occupied', statusColor: '#F5C842', statusBg: 'rgba(245, 200, 66, 0.15)', occupant: 'Box owner' },
    { id: 'A6', status: 'Available', statusColor: '#10B981', statusBg: 'rgba(16, 185, 129, 0.15)' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        width: '100%',
        minHeight: '100%',
        fontFamily: 'Rubik, var(--font-outfit), sans-serif',
      }}
    >
      {/* Main Left Content: Box Banner Card, Stat Cards, Tabs & Cabinet Layout */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 1. Box Summary Banner Card matching Figma Image 5 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: cardBorder,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {/* Title & Status Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
                fontFamily: 'var(--font-outfit), sans-serif',
              }}
            >
              MyBox-123456
            </h2>

            <span style={{ fontSize: '13px', color: subtextColor }}>#1234567879</span>

            {/* Offline Badge */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#A1A1AA',
                backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              Offline
            </span>

            {/* Available Badge */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              Available
            </span>

            {/* Star Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: textColor }}>
              <span>4.7</span>
              <Star size={13} fill="#F5C842" color="#F5C842" />
            </div>

            {/* Battery Indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              <Battery size={13} />
              <span>90%</span>
            </div>
          </div>

          {/* Details Row 1 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              fontSize: '13px',
            }}
          >
            <div>
              <span style={{ color: subtextColor }}>Location </span>
              <span style={{ color: textColor, fontWeight: 600 }}>Wuse II, Abuja</span>
            </div>
            <div>
              <span style={{ color: subtextColor }}>Usage rate </span>
              <span style={{ color: textColor, fontWeight: 600 }}>80%</span>
            </div>
            <div>
              <span style={{ color: subtextColor }}>Uptime score </span>
              <span style={{ color: textColor, fontWeight: 600 }}>80%</span>
            </div>
            <div>
              <span style={{ color: subtextColor }}>Cleanliness score </span>
              <span style={{ color: textColor, fontWeight: 600 }}>90%</span>
            </div>
            <div>
              <span style={{ color: subtextColor }}>Report count </span>
              <span style={{ color: textColor, fontWeight: 600 }}>24</span>
            </div>
          </div>

          {/* Details Row 2 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              fontSize: '13px',
            }}
          >
            <div>
              <span style={{ color: subtextColor }}>Peak period </span>
              <span style={{ color: textColor, fontWeight: 600 }}>09:00 AM - 05:00 PM</span>
            </div>
            <div>
              <span style={{ color: subtextColor }}>Battery health </span>
              <span style={{ color: textColor, fontWeight: 600 }}>Good (79%)</span>
            </div>
            <div>
              <span style={{ color: subtextColor }}>Owner </span>
              <span style={{ color: textColor, fontWeight: 600 }}>Marycynthia John</span>
            </div>
          </div>
        </div>

        {/* 2. Action Stat Cards (5 Cards) matching Figma Image 5 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '14px',
          }}
        >
          <div style={{ backgroundColor: cardBg, borderRadius: '14px', border: cardBorder, padding: '16px' }}>
            <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '6px' }}>Total Cabinets</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>4</div>
          </div>

          <div style={{ backgroundColor: cardBg, borderRadius: '14px', border: cardBorder, padding: '16px' }}>
            <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '6px' }}>Available</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>2</div>
          </div>

          <div style={{ backgroundColor: cardBg, borderRadius: '14px', border: cardBorder, padding: '16px' }}>
            <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '6px' }}>Customer occupied</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>1</div>
          </div>

          <div style={{ backgroundColor: cardBg, borderRadius: '14px', border: cardBorder, padding: '16px' }}>
            <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '6px' }}>Owner occupied</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>1</div>
          </div>

          <div style={{ backgroundColor: cardBg, borderRadius: '14px', border: cardBorder, padding: '16px' }}>
            <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>Code usage</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>15/20</div>
            <div style={{ fontSize: '9px', color: subtextColor, marginTop: '2px' }}>Last used Jan 12, 2026 | 11:45 AM</div>
          </div>
        </div>

        {/* 3. Sub-Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '8px',
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#F5C842' : subtextColor,
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease',
                }}
              >
                <span>{tab}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-9px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#F5C842',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Tab Content: Cabinets Layout & Info matching Figma Image 5 */}
        {activeTab === 'Cabinets' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
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
                      onClick={() => setSelectedCabinet(cab.id)}
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
                        minHeight: '100px',
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

            {/* Right Card: Cabinet Info */}
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: '16px',
                border: cardBorder,
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '260px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: '0 0 16px 0', alignSelf: 'flex-start' }}>
                Cabinet info
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '12px' }}>
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
                  {selectedCabinet ? `Selected Cabinet: ${selectedCabinet} - Full sensor data ready` : 'Select cabinet to view data'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Space reserved for subsequent tab designs (Bookings, Battery, Reviews, etc.) */}
        {activeTab !== 'Cabinets' && (
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: cardBorder,
              padding: '32px',
              textAlign: 'center',
              color: subtextColor,
              fontSize: '14px',
            }}
          >
            {activeTab} module ready for upcoming Figma specifications.
          </div>
        )}
      </div>

      {/* Right Side Column: Owner Info & Deployment History (NO card/border wrapper covering the section, sits clean on canvas as instructed!) */}
      <aside
        style={{
          width: '280px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
        className="hide-on-mobile"
      >
        {/* Owner Info Section */}
        <div>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            Owner info
          </h4>

          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Owner Avatar & Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#F5C842',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#000000',
                  fontSize: '14px',
                }}
              >
                MJ
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Marycynthia John</div>
                <div style={{ fontSize: '11px', color: subtextColor }}>mcj@gmail.com</div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div>
                <div style={{ color: subtextColor, fontSize: '10px' }}>Total boxes</div>
                <div style={{ color: textColor, fontWeight: 700, fontSize: '14px' }}>4</div>
              </div>
              <div>
                <div style={{ color: subtextColor, fontSize: '10px' }}>Avg box rating</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: textColor, fontWeight: 700, fontSize: '14px' }}>
                  <span>4.7</span>
                  <Star size={12} fill="#F5C842" color="#F5C842" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment History Section (Clean on canvas, NO card/border wrapper covering the section!) */}
        <div>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 14px 0',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            Deployment history
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Moved to Victoria Island</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: subtextColor }}>
                <span>January 23, 2026</span>
                <span>13:25</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Installed at Lekki Phase 1</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: subtextColor }}>
                <span>Jan 16, 2026</span>
                <span>13:25</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .cabinet-grid-container {
            grid-template-columns: 1fr !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
