'use client';

import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Package, Shield, Truck } from 'lucide-react';

interface BookingActivityDetailViewProps {
  activityId?: string;
  onBack: () => void;
  isLightMode?: boolean;
}

export const BookingActivityDetailView: React.FC<BookingActivityDetailViewProps> = ({
  activityId,
  onBack,
  isLightMode = false,
}) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

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
      {/* Left Column: Order, Location, Payment, Tracking */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* 1. Order Information Card */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
              Order Information
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', color: subtextColor }}>#1234567879</span>
              <span
                style={{
                  backgroundColor: '#F5C842',
                  color: '#000000',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                }}
              >
                Picked up
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Booking Type</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Delivery</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Box size</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Medium</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Booking date</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Aug 02, 2024 | 11:56 AM</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Duration</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>4hrs</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Customer</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Aku Cynthia</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Rider</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Ahmed Musa</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Distance</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>30m</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>ETA</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>13mins</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Actual delivery time</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>12mins</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '4px' }}>Demurrage</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>00:30:00</div>
            </div>
          </div>
        </div>

        {/* 2. Location Information Card */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: '0 0 16px 0' }}>
            Location Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '2px' }}>Pick-up Location</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>AE 9201 MyBox locker B7</div>
              </div>
              <div style={{ fontSize: '12px', color: subtextColor }}>
                Code: <span style={{ fontWeight: 600, color: textColor }}>123456</span>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: borderColor }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '2px' }}>Drop-off Location</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>AE 9201 MyBox locker C12</div>
              </div>
              <div style={{ fontSize: '12px', color: subtextColor }}>
                Code: <span style={{ fontWeight: 600, color: textColor }}>123478</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Payment Information Card */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: '0 0 16px 0' }}>
            Payment Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: subtextColor }}>Transaction ID</span>
              <span style={{ fontWeight: 600, color: textColor }}>123456</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: subtextColor }}>Payment method</span>
              <span style={{ fontWeight: 600, color: textColor }}>Wallet</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: subtextColor }}>Box usage fee</span>
              <span style={{ fontWeight: 600, color: textColor }}>₦500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: subtextColor }}>Delivery fee</span>
              <span style={{ fontWeight: 600, color: textColor }}>₦1,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: subtextColor }}>No fee weekend promo</span>
              <span style={{ fontWeight: 600, color: '#10B981' }}>-₦100</span>
            </div>

            <div style={{ height: '1px', backgroundColor: borderColor, margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>Total</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>₦1,500</span>
            </div>
          </div>
        </div>

        {/* 4. Tracking Information Stepper */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: '0 0 20px 0' }}>
            Tracking Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '14px', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#F5C842',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }} />
                </div>
                <div style={{ width: '2px', height: '42px', backgroundColor: '#F5C842', marginTop: '2px' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Pick-up confirmed</div>
                <div style={{ fontSize: '11px', color: subtextColor }}>
                  10 May, 2025 | 4:15 PM &bull; Landmark: Second market
                </div>
                <div style={{ fontSize: '11px', color: '#F5C842', marginTop: '2px' }}>Code: 123456</div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '14px', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#F5C842',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }} />
                </div>
                <div style={{ width: '2px', height: '36px', backgroundColor: '#F5C842', marginTop: '2px' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>In transit</div>
                <div style={{ fontSize: '11px', color: subtextColor }}>10 May, 2025 | 4:30 PM</div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '14px', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#F5C842',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }} />
                </div>
                <div style={{ width: '2px', height: '36px', backgroundColor: '#F5C842', marginTop: '2px' }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Nearing drop-off</div>
                <div style={{ fontSize: '11px', color: subtextColor }}>10 May, 2025 | 4:45 PM</div>
              </div>
            </div>

            {/* Step 4 */}
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Delivered</div>
                <div style={{ fontSize: '11px', color: subtextColor }}>10 May, 2025 | 4:55 PM</div>
                <div style={{ fontSize: '11px', color: '#10B981', marginTop: '2px' }}>Code: 123456</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Mini Activity History matching Figma Image 3 */}
      <aside
        style={{
          width: '280px',
          flexShrink: 0,
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          height: 'fit-content',
        }}
        className="hide-on-mobile"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: textColor, margin: 0 }}>
            Activity history
          </h4>
        </div>

        <div style={{ fontSize: '12px', fontWeight: 600, color: subtextColor }}>
          June 03, 2025
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ borderLeft: '2px solid #10B981', paddingLeft: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Cleanliness report</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>The cabinet was too dirty</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
              <span style={{ color: '#71717A' }}>13:25</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>Resolved</span>
            </div>
          </div>

          <div style={{ borderLeft: '2px solid #EF4444', paddingLeft: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Package mishandled report</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>My package looked like it was t..</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
              <span style={{ color: '#71717A' }}>13:25</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>Resolved</span>
            </div>
          </div>

          <div style={{ borderLeft: '2px solid #71717A', paddingLeft: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Customer picked parcel</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>AE 9201 MyBox locker C5</div>
            <div style={{ fontSize: '9px', color: '#71717A' }}>Code: 123456 &bull; 13:25</div>
          </div>

          <div style={{ borderLeft: '2px solid #71717A', paddingLeft: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Rider delivered parcel</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>AE 9201 MyBox locker B9</div>
            <div style={{ fontSize: '9px', color: '#71717A' }}>Code: 123478 &bull; 13:25</div>
          </div>

          <div style={{ borderLeft: '2px solid #71717A', paddingLeft: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Rider Picked Parcel</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>AE 9201 MyBox locker B7</div>
            <div style={{ fontSize: '9px', color: '#71717A' }}>13:25</div>
          </div>

          <div style={{ borderLeft: '2px solid #71717A', paddingLeft: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Rider Assigned</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>Ahmed Musa &bull; 13:25</div>
          </div>

          <div style={{ borderLeft: '2px solid #71717A', paddingLeft: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Booking confirmed</div>
            <div style={{ fontSize: '10px', color: subtextColor }}>MyBox 123456 → MyBox123487 &bull; 13:25</div>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
