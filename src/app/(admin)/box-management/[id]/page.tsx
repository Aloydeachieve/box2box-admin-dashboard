'use client';

import React, { useState, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Battery as BatteryIcon,
  Star,
  ChevronDown,
} from 'lucide-react';

import { BoxBookingsFilterModal } from '@/components/box-management/BoxBookingsFilterModal';
import { BoxTabFilterModal } from '@/components/box-management/BoxTabFilterModal';

// Modular Sub-Tab Components
import { CabinetsTab } from '@/components/box-management/details/CabinetsTab';
import { BookingsTab } from '@/components/box-management/details/BookingsTab';
import { BatteryTab } from '@/components/box-management/details/BatteryTab';
import { ReviewsTab } from '@/components/box-management/details/ReviewsTab';
import { CodeUsageTab } from '@/components/box-management/details/CodeUsageTab';
import { ReportsTab } from '@/components/box-management/details/ReportsTab';
import { BoxActivityTab } from '@/components/box-management/details/BoxActivityTab';
import { useAdmin } from '@/components/layout/AdminContext';

export default function BoxDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const boxId = resolvedParams?.id || 'MyBox-123456';
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const [activeTab, setActiveTab] = useState<
    'Cabinets' | 'Bookings' | 'Battery' | 'Reviews' | 'Code usage' | 'Reports' | 'Box activity'
  >('Cabinets');
  const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null);
  const [showBookingsFilterModal, setShowBookingsFilterModal] = useState(false);
  const [showTabFilterModal, setShowTabFilterModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        width: '100%',
        fontFamily: 'Rubik, var(--font-outfit), sans-serif',
        position: 'relative',
      }}
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 150,
            animation: 'slideInRight 0.2s ease-out',
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Main Left Content: Box Banner Card, Stat Cards, Tabs & Content */}
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
              {boxId}
            </h2>

            <span style={{ fontSize: '13px', color: subtextColor }}>#1234567879</span>

            {/* Offline Badge */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#9CA3AF',
                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                padding: '4px 10px',
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
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              Available
            </span>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: textColor }}>
              <span>4.7</span>
              <Star size={14} fill="#F5C842" color="#F5C842" />
            </div>

            {/* Battery */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '4px 8px',
                borderRadius: '6px',
              }}
            >
              <span>90%</span>
              <BatteryIcon size={12} color="#10B981" />
            </div>
          </div>

          {/* Telemetry Metrics Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <div>
              <span>Location </span>
              <strong style={{ color: textColor }}>Wuse II, Abuja</strong>
            </div>

            <div>
              <span>Usage rate </span>
              <strong style={{ color: textColor }}>80%</strong>
            </div>

            <div>
              <span>Uptime score </span>
              <strong style={{ color: textColor }}>80%</strong>
            </div>

            <div>
              <span>Cleanliness score </span>
              <strong style={{ color: textColor }}>90%</strong>
            </div>

            <div>
              <span>Report count </span>
              <strong style={{ color: textColor }}>24</strong>
            </div>
          </div>

          {/* Operational Hours & Owner Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <div>
              <span>Peak period </span>
              <strong style={{ color: textColor }}>09:00 AM - 05:00 PM</strong>
            </div>

            <div>
              <span>Battery health </span>
              <strong style={{ color: textColor }}>Good (79%)</strong>
            </div>

            <div>
              <span>Owner </span>
              <strong style={{ color: textColor }}>Marycynthia John</strong>
            </div>
          </div>
        </div>

        {/* 2. Top Overview Stat Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '14px',
          }}
        >
          {/* Card 1: Total Cabinets */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>Total Cabinets</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>4</div>
          </div>

          {/* Card 2: Available */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>Available</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>2</div>
          </div>

          {/* Card 3: Customer occupied */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>Customer occupied</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>1</div>
          </div>

          {/* Card 4: Owner occupied */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>Owner occupied</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>1</div>
          </div>

          {/* Card 5: Code usage */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>Code usage</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>15/20</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>Last used Jan 12, 2026 | 11:45 AM</div>
          </div>
        </div>

        {/* 3. Sub-Tabs Bar with Clean Filter Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
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
                  onClick={() => {
                    setActiveTab(tab);
                  }}
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

          {/* Clean Inline Filter ▾ Button */}
          {activeTab !== 'Cabinets' && (
            <button
              onClick={() => {
                if (activeTab === 'Bookings') {
                  setShowBookingsFilterModal(true);
                } else {
                  setShowTabFilterModal(true);
                }
              }}
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

        {/* 4. Active Sub-Tab Modular Component */}
        {activeTab === 'Cabinets' && (
          <CabinetsTab
            isLightMode={isLightMode}
            selectedCabinet={selectedCabinet}
            onSelectCabinet={(id) => setSelectedCabinet(id)}
          />
        )}

        {activeTab === 'Bookings' && (
          <BookingsTab isLightMode={isLightMode} />
        )}

        {activeTab === 'Battery' && (
          <BatteryTab isLightMode={isLightMode} />
        )}

        {activeTab === 'Reviews' && (
          <ReviewsTab isLightMode={isLightMode} />
        )}

        {activeTab === 'Code usage' && (
          <CodeUsageTab isLightMode={isLightMode} />
        )}

        {activeTab === 'Reports' && (
          <ReportsTab
            boxId={boxId}
            isLightMode={isLightMode}
            onActionNotification={(msg) => showToast(msg)}
          />
        )}

        {activeTab === 'Box activity' && (
          <BoxActivityTab isLightMode={isLightMode} />
        )}
      </div>

      {/* Right Side Column: Owner Info & Deployment History */}
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

        {/* Deployment History Section */}
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
            Deployment history
          </h4>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {[
              {
                location: 'Wuse II, Abuja',
                dates: 'March 15, 2026 - Present',
                status: 'Current location',
                statusColor: '#10B981',
              },
              {
                location: 'Garki, Abuja',
                dates: 'Jan 10, 2025 - March 14, 2026',
                status: 'Past location',
                statusColor: '#9CA3AF',
              },
            ].map((dep, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: cardBorder,
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{dep.location}</div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: dep.statusColor,
                    }}
                  >
                    {dep.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: subtextColor }}>{dep.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Filter Modals */}
      <BoxBookingsFilterModal
        isOpen={showBookingsFilterModal}
        onClose={() => setShowBookingsFilterModal(false)}
        isLightMode={isLightMode}
      />

      <BoxTabFilterModal
        isOpen={showTabFilterModal}
        onClose={() => setShowTabFilterModal(false)}
        activeSubTab={activeTab as any}
        isLightMode={isLightMode}
      />
    </div>
  );
}
