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

import { BoxBookingsFilterModal } from './BoxBookingsFilterModal';

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
  const [showBookingsFilterModal, setShowBookingsFilterModal] = useState(false);

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

        {/* 3. Sub-Tabs Bar with Inline Filter Button matching Figma Image 5 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '2px',
            marginTop: '6px',
            flexShrink: 0,
            minHeight: '44px',
            gap: '16px',
          }}
        >
          {/* Sub-Tabs Scrollable Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '6px',
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
                    padding: '8px 0 10px 0',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    lineHeight: '20px',
                    transition: 'color 0.15s ease',
                  }}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
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

          {/* Inline Filter ▾ Button (appears when Bookings tab is active, matching Figma Image 5) */}
          {activeTab === 'Bookings' && (
            <button
              onClick={() => setShowBookingsFilterModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                padding: '0 14px',
                borderRadius: '8px',
                backgroundColor: cardBg,
                border: cardBorder,
                color: textColor,
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background-color 0.15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = cardBg)}
            >
              <span>Filter</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>
          )}
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

        {/* Bookings Tab Content matching Figma Image 5 */}
        {activeTab === 'Bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Top Section: 5 Stat Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '14px',
              }}
            >
              {[
                { label: 'Total Bookings Value', value: '₦80,000', change: '+12% today' },
                { label: 'Total Bookings', value: '7,935', change: '+12% today' },
                { label: 'Avg Booking Value', value: '₦2,050', change: '+4% today' },
                { label: 'Box2Box delivery', value: '72%', change: '+2% today' },
                { label: 'Storage booking', value: '28%', change: '+2% today' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: cardBg,
                    borderRadius: '14px',
                    border: cardBorder,
                    padding: '16px',
                  }}
                >
                  <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '6px' }}>{stat.label}</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor, marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 600 }}>{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Down Section: Table Container Card */}
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: '16px',
                border: cardBorder,
                overflow: 'hidden',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)', color: subtextColor, fontSize: '11px' }}>
                      <th style={{ padding: '14px 16px', fontWeight: 500 }}>Order ID</th>
                      <th style={{ padding: '14px 16px', fontWeight: 500 }}>Cabinet</th>
                      <th style={{ padding: '14px 16px', fontWeight: 500 }}>Usage</th>
                      <th style={{ padding: '14px 16px', fontWeight: 500 }}>Type</th>
                      <th style={{ padding: '14px 16px', fontWeight: 500 }}>Date</th>
                      <th style={{ padding: '14px 16px', fontWeight: 500 }}>Amount</th>
                      <th style={{ padding: '14px 16px', fontWeight: 500 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '1', orderId: '#196723', cabinet: 'A5', usage: 'Pick up', type: 'Storage', date: 'Jun 12, 2025', amount: '₦300', status: 'In storage' },
                      { id: '2', orderId: '#198096', cabinet: 'A3', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'Delivered' },
                      { id: '3', orderId: '#109456', cabinet: 'A4', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'Delivered' },
                      { id: '4', orderId: '#124897', cabinet: 'A6', usage: 'Pick up', type: 'Storage', date: 'Jun 12, 2025', amount: '₦300', status: 'Picked up' },
                      { id: '5', orderId: '#105677', cabinet: 'A3', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'In progress' },
                      { id: '6', orderId: '#108567', cabinet: 'A3', usage: 'Drop off', type: 'Delivery', date: 'Jun 12, 2025', amount: '₦300', status: 'Delivered' },
                    ].map((row) => (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.04)',
                          fontSize: '12px',
                          transition: 'background-color 0.15s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1A1A1E')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.orderId}</td>
                        <td style={{ padding: '14px 16px', color: textColor, fontWeight: 600 }}>{row.cabinet}</td>
                        <td style={{ padding: '14px 16px', color: subtextColor }}>{row.usage}</td>
                        <td style={{ padding: '14px 16px', color: textColor }}>{row.type}</td>
                        <td style={{ padding: '14px 16px', color: subtextColor }}>{row.date}</td>
                        <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.amount}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              color:
                                row.status === 'Delivered' || row.status === 'Picked up'
                                  ? '#10B981'
                                  : row.status === 'In progress'
                                  ? '#F5C842'
                                  : '#A1A1AA',
                              backgroundColor:
                                row.status === 'Delivered' || row.status === 'Picked up'
                                  ? 'rgba(16, 185, 129, 0.12)'
                                  : row.status === 'In progress'
                                  ? 'rgba(245, 200, 66, 0.12)'
                                  : isLightMode ? '#F3F4F6' : '#27272A',
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Space reserved for other tab designs (Battery, Reviews, Code usage, Reports, Box activity) */}
        {activeTab !== 'Cabinets' && activeTab !== 'Bookings' && (
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: cardBorder,
              padding: '48px 32px',
              textAlign: 'center',
              color: subtextColor,
              fontSize: '14px',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 600, color: textColor }}>{activeTab} Overview</div>
            <div style={{ maxWidth: '400px', fontSize: '13px' }}>
              Design specifications for {activeTab} will be rendered here. Layout containers and theme tokens are fully primed.
            </div>
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

      {/* Box Bookings 4-Tab Filter Modal matching user specs */}
      <BoxBookingsFilterModal
        isOpen={showBookingsFilterModal}
        onClose={() => setShowBookingsFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          console.log('Applied box bookings filters:', filters);
        }}
      />

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
