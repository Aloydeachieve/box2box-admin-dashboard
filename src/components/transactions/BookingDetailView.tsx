'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Truck, Navigation, PackageCheck } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';

interface BookingDetailViewProps {
  bookingId?: string;
}

export const BookingDetailView: React.FC<BookingDetailViewProps> = ({
  bookingId = '1234567879',
}) => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  const navigateToUserBookings = () => {
    router.push('/users/1?tab=Bookings');
  };

  const navigateToBoxManagement = () => {
    router.push('/box-management/MyBox-123456');
  };

  const navigateToTransaction = (txnId: string = '123456') => {
    router.push(`/transactions/${txnId}`);
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
      }}
    >
      {/* 2-Column Responsive Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: '32px',
          alignItems: 'stretch',
          minHeight: 'calc(100vh - 140px)',
        }}
      >
        {/* Main Column: 4 Information Sections matching Image 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Order Information */}
          <div
            style={{
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
              }}
            >
              Order Information
            </h2>

            {/* ID & Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13.5px', color: subtextColor }}>
                #{bookingId}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: yellowColor,
                  backgroundColor: 'rgba(245, 200, 66, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                Picked up
              </span>
            </div>

            {/* Row 1: Booking metadata */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: subtextColor }}>Booking type</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>Delivery</strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Box size</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>Medium</strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Booking date</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>
                Aug 02, 2024 | 11:56 AM
              </strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span style={{ color: subtextColor }}>Duration</span>
              <strong style={{ color: textColor, fontWeight: 600 }}>4hrs</strong>
            </div>

            {/* Row 2: Customer & Rider (Clickable to User Details page) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                lineHeight: 1.5,
              }}
            >
              <span
                onClick={navigateToUserBookings}
                style={{
                  color: subtextColor,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Customer
              </span>
              <strong
                onClick={navigateToUserBookings}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Aku Cynthia
              </strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span
                onClick={navigateToUserBookings}
                style={{
                  color: subtextColor,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Rider
              </span>
              <strong
                onClick={navigateToUserBookings}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Ahmed Musa
              </strong>
            </div>

            {/* Row 3: Distance, ETA, Actual Delivery, Demurrage (Clickable to User Details page) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                lineHeight: 1.5,
              }}
            >
              <span
                onClick={navigateToUserBookings}
                style={{ color: subtextColor, cursor: 'pointer' }}
              >
                Distance
              </span>
              <strong
                onClick={navigateToUserBookings}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                30m
              </strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span
                onClick={navigateToUserBookings}
                style={{ color: subtextColor, cursor: 'pointer' }}
              >
                ETA
              </span>
              <strong
                onClick={navigateToUserBookings}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                13mins
              </strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span
                onClick={navigateToUserBookings}
                style={{ color: subtextColor, cursor: 'pointer' }}
              >
                Actual delivery time
              </span>
              <strong
                onClick={navigateToUserBookings}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                12mins
              </strong>
              <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
              <span
                onClick={navigateToUserBookings}
                style={{ color: subtextColor, cursor: 'pointer' }}
              >
                Demurrage
              </span>
              <strong
                onClick={navigateToUserBookings}
                style={{
                  color: textColor,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                00:00:00
              </strong>
            </div>
          </div>

          {/* Section 2: Location Information */}
          <div
            style={{
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
              }}
            >
              Location Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '11.5px', color: subtextColor, display: 'block' }}>
                  Pick-up Location
                </span>
                <span
                  onClick={navigateToBoxManagement}
                  style={{
                    fontSize: '13.5px',
                    color: textColor,
                    fontWeight: 500,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  A5 9201 MyBox locker B9
                </span>
              </div>

              <div>
                <span style={{ fontSize: '11.5px', color: subtextColor, display: 'block' }}>
                  Drop-off Location
                </span>
                <span
                  onClick={navigateToBoxManagement}
                  style={{
                    fontSize: '13.5px',
                    color: textColor,
                    fontWeight: 500,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  A5 9201 MyBox locker C12
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Information */}
          <div
            style={{
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
              }}
            >
              Payment Information
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '13px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: subtextColor }}>Transaction ID</span>
                <span
                  onClick={() => navigateToTransaction('123456')}
                  style={{
                    color: textColor,
                    fontWeight: 600,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  123456
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: subtextColor }}>Payment method</span>
                <span style={{ color: textColor, fontWeight: 500 }}>Wallet</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: subtextColor }}>Box usage fee</span>
                <span style={{ color: textColor, fontWeight: 500 }}>₦500</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: subtextColor }}>Delivery fee</span>
                <span style={{ color: textColor, fontWeight: 500 }}>₦1,000</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: subtextColor }}>No fee weekend promo</span>
                <span style={{ color: '#EF4444', fontWeight: 500 }}>- ₦100</span>
              </div>

              {/* Hairline Divider inside Payment container */}
              <div style={{ height: '1px', backgroundColor: borderColor, margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: subtextColor, fontSize: '13.5px' }}>Total</span>
                <span style={{ color: textColor, fontWeight: 700, fontSize: '16px' }}>
                  ₦1,500
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Tracking Information */}
          <div
            style={{
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
              }}
            >
              Tracking Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {/* Step 1: Pick-up confirmed */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32px', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(245, 200, 66, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: yellowColor,
                    }}
                  >
                    <PackageCheck size={18} />
                  </div>
                  {/* Directional Pointed Dotted Arrow */}
                  <svg width="12" height="34" viewBox="0 0 12 34" fill="none" style={{ margin: '4px 0' }}>
                    <line x1="6" y1="2" x2="6" y2="24" stroke={subtextColor} strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M2.5 20L6 26L9.5 20" stroke={subtextColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', paddingTop: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                      Pick-up confirmed
                    </span>
                    <span style={{ fontSize: '12px', color: subtextColor }}>
                      Code - 123465
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    18 May, 2025 | 4:16 PM
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    Landmark: Second market
                  </span>
                </div>
              </div>

              {/* Step 2: In transit */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32px', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isLightMode ? '#F3F4F6' : '#1C1C20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: subtextColor,
                    }}
                  >
                    <Truck size={18} />
                  </div>
                  {/* Directional Pointed Dotted Arrow */}
                  <svg width="12" height="34" viewBox="0 0 12 34" fill="none" style={{ margin: '4px 0' }}>
                    <line x1="6" y1="2" x2="6" y2="24" stroke={subtextColor} strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M2.5 20L6 26L9.5 20" stroke={subtextColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', paddingTop: '2px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                    In transit
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    18 May, 2025 | 4:30 PM
                  </span>
                </div>
              </div>

              {/* Step 3: Nearing drop-off */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32px', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isLightMode ? '#F3F4F6' : '#1C1C20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: subtextColor,
                    }}
                  >
                    <Navigation size={18} />
                  </div>
                  {/* Directional Pointed Dotted Arrow */}
                  <svg width="12" height="34" viewBox="0 0 12 34" fill="none" style={{ margin: '4px 0' }}>
                    <line x1="6" y1="2" x2="6" y2="24" stroke={subtextColor} strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M2.5 20L6 26L9.5 20" stroke={subtextColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', paddingTop: '2px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                    Nearing drop-off
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    18 May, 2025 | 4:45 PM
                  </span>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32px', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#22C55E',
                    }}
                  >
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', paddingTop: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: textColor }}>
                      Delivered
                    </span>
                    <span style={{ fontSize: '12px', color: subtextColor }}>
                      Code - 123465
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    18 May, 2025 | 4:50 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Continuous Vertical Line & Activity History Feed */}
        <aside
          style={{
            borderLeft: `1px solid ${borderColor}`,
            paddingLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            alignSelf: 'stretch',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: textColor,
            }}
          >
            Activity history
          </div>

          <div style={{ fontSize: '12.5px', fontWeight: 700, color: textColor }}>
            June 03, 2025
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Item 1 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                borderLeft: '2.5px solid #71717A',
                paddingLeft: '8px',
                borderRadius: '2px',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                Cleanliness report
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>
                The cabinet was too dirty
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                <span style={{ fontSize: '11px', color: subtextColor }}>R-123465</span>
                <span style={{ fontSize: '11px', color: '#22C55E', fontWeight: 600 }}>Resolved</span>
              </div>
              <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
            </div>

            {/* Item 2 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                borderLeft: '2.5px solid #71717A',
                paddingLeft: '8px',
                borderRadius: '2px',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                Package mishandled report
              </span>
              <span style={{ fontSize: '12px', color: subtextColor }}>
                My package looked like it was ta...
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                <span style={{ fontSize: '11px', color: subtextColor }}>R-123465</span>
                <span style={{ fontSize: '11px', color: '#22C55E', fontWeight: 600 }}>Resolved</span>
              </div>
              <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
            </div>

            {/* Item 3: Customer picked parcel (Underlined Clickable to User Details) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                Customer picked parcel
              </span>
              <span
                onClick={navigateToUserBookings}
                style={{
                  fontSize: '12px',
                  color: textColor,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                A5 9201 MyBox locker C3
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: subtextColor }}>Code - 123440</span>
                <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
              </div>
            </div>

            {/* Item 4: Rider delivered parcel (Underlined Clickable to User Details) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                Rider delivered parcel
              </span>
              <span
                onClick={navigateToUserBookings}
                style={{
                  fontSize: '12px',
                  color: textColor,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                A5 9201 MyBox locker C3
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: subtextColor }}>Code - 123478</span>
                <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
              </div>
            </div>

            {/* Item 5: Rider Picked Parcel (Underlined Clickable to User Details) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                Rider Picked Parcel
              </span>
              <span
                onClick={navigateToUserBookings}
                style={{
                  fontSize: '12px',
                  color: textColor,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                A5 9201 MyBox locker B9
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: subtextColor }}>Code - 123465</span>
                <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
              </div>
            </div>

            {/* Item 6 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                Rider Assigned
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: subtextColor }}>Ahmed Musa</span>
                <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
              </div>
            </div>

            {/* Item 7 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                Booking confirmed
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11.5px', color: subtextColor }}>
                  MyBox-123456 → MyBox123487
                </span>
                <span style={{ fontSize: '11px', color: subtextColor }}>13:25</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
