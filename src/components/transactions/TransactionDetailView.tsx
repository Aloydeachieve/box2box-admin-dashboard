'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/components/layout/AdminContext';
import { FundWalletModal } from './modals/FundWalletModal';

interface TransactionDetailViewProps {
  transactionId?: string;
  initialType?: string;
  initialStatus?: string;
}

export const TransactionDetailView: React.FC<TransactionDetailViewProps> = ({
  transactionId = '123456',
  initialType,
  initialStatus,
}) => {
  const router = useRouter();
  const { isLightMode, setOnFundWalletClick } = useAdmin();

  // State
  const [txnType, setTxnType] = useState<'earning' | 'deposit' | 'withdrawal' | 'booking'>('booking');
  const [status, setStatus] = useState<'Successful' | 'Failed' | 'Pending'>('Successful');
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);

  // Initialize and detect transaction type & status
  useEffect(() => {
    let detectedType = initialType;
    let detectedStatus = initialStatus;

    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      if (!detectedType && sp.get('type')) detectedType = sp.get('type') || undefined;
      if (!detectedStatus && sp.get('status')) detectedStatus = sp.get('status') || undefined;
    }

    if (!detectedType) {
      if (transactionId.startsWith('earn-')) detectedType = 'earning';
      else if (transactionId.startsWith('dep-')) detectedType = 'deposit';
      else if (transactionId.startsWith('wth-')) detectedType = 'withdrawal';
      else detectedType = 'booking';
    }

    if (detectedType === 'earning' || detectedType === 'deposit' || detectedType === 'withdrawal') {
      setTxnType(detectedType);
    } else {
      setTxnType('booking');
    }

    if (detectedStatus === 'Failed' || detectedStatus === 'Pending' || detectedStatus === 'Successful') {
      setStatus(detectedStatus);
    } else {
      setStatus('Successful');
    }
  }, [initialType, initialStatus, transactionId]);

  // Connect "Fund wallet" button from header to modal
  useEffect(() => {
    setOnFundWalletClick(() => () => {
      setShowFundWalletModal(true);
    });

    return () => {
      setOnFundWalletClick(null);
    };
  }, [setOnFundWalletClick]);

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  const navigateToUserBookings = () => {
    router.push('/users/1?tab=Bookings');
  };

  // Dynamic amounts based on type
  const displayAmount =
    txnType === 'earning'
      ? '250'
      : txnType === 'deposit'
      ? '299,950'
      : txnType === 'withdrawal'
      ? '299,950'
      : '2,950';

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
      {/* 2-Column Responsive Layout with Continuous Dividing Line */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: '32px',
          alignItems: 'stretch',
          minHeight: 'calc(100vh - 140px)',
        }}
      >
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Transaction Information */}
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
              Transaction Information
            </h2>

            {/* ID & Status Badge (Successful or Failed) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13.5px', color: subtextColor }}>
                #{transactionId === '123456' ? '1234567879' : transactionId}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color:
                    status === 'Successful'
                      ? '#22C55E'
                      : status === 'Pending'
                      ? '#F59E0B'
                      : '#EF4444',
                  backgroundColor:
                    status === 'Successful'
                      ? 'rgba(34, 197, 94, 0.15)'
                      : status === 'Pending'
                      ? 'rgba(245, 158, 11, 0.15)'
                      : 'rgba(239, 68, 68, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                {status}
              </span>
            </div>

            {/* Row 1: Metadata chips based on Type */}
            {txnType === 'earning' ? (
              /* Image 3: Earnings Details */
              <>
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
                  <span style={{ color: subtextColor }}>Transaction type</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>Earning</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Date</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>
                    Aug 02, 2024 | 11:56 AM
                  </strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Amount</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>₦250</strong>
                </div>

                {/* Row 2: User & Booking ID Clickable block */}
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
                    User
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
                    style={{ color: subtextColor, cursor: 'pointer' }}
                  >
                    Booking ID
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
                    123456
                  </strong>
                </div>
              </>
            ) : txnType === 'deposit' ? (
              /* Image 4: Deposit Details */
              <>
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
                  <span style={{ color: subtextColor }}>Transaction type</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>Deposit</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Payment method</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>Bank transfer</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Date</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>
                    Aug 02, 2024 | 11:56 AM
                  </strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Amount</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>₦300,000</strong>
                </div>

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
                  <span style={{ color: subtextColor }}>Processing time</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>15s</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span
                    onClick={navigateToUserBookings}
                    style={{ color: subtextColor, cursor: 'pointer' }}
                  >
                    User
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
                </div>
              </>
            ) : txnType === 'withdrawal' ? (
              /* Image 5: Withdrawal Details */
              <>
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
                  <span style={{ color: subtextColor }}>Transaction type</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>Withdrawal</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Payment method</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>Bank transfer</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Date</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>
                    Aug 02, 2024 | 11:56 AM
                  </strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Amount</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>₦300,000</strong>
                </div>

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
                  <span style={{ color: subtextColor }}>Processing time</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>15s</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span
                    onClick={navigateToUserBookings}
                    style={{ color: subtextColor, cursor: 'pointer' }}
                  >
                    User
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
                </div>
              </>
            ) : (
              /* Booking Fee Default */
              <>
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
                  <span style={{ color: subtextColor }}>Transaction type</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>Booking fee</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Payment method</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>Wallet</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Date</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>
                    Aug 02, 2024 | 11:56 AM
                  </strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Amount</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>₦2,950</strong>
                  <span style={{ color: subtextColor, margin: '0 4px' }}>|</span>
                  <span style={{ color: subtextColor }}>Processing time</span>
                  <strong style={{ color: textColor, fontWeight: 600 }}>15s</strong>
                </div>

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
                    User
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
                    style={{ color: subtextColor, cursor: 'pointer' }}
                  >
                    Booking ID
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
                    123456
                  </strong>
                </div>
              </>
            )}
          </div>

          {/* Section 2: Payment Information */}
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
              {txnType === 'earning' ? (
                /* Image 3: Earnings Payment Breakdown */
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Payment type</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>Earnings</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Amount</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦250</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Transaction fee</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦0</span>
                  </div>

                  <div style={{ height: '1px', backgroundColor: borderColor, margin: '4px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: subtextColor, fontSize: '13.5px' }}>Total</span>
                    <span style={{ color: textColor, fontWeight: 700, fontSize: '16px' }}>
                      ₦250
                    </span>
                  </div>
                </>
              ) : txnType === 'deposit' ? (
                /* Image 4: Deposit Payment Breakdown */
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Payment method</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>Bank transfer</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Amount</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦299,955</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Transaction fee</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦50</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>No fee weekend promo</span>
                    <span style={{ color: '#EF4444', fontWeight: 500 }}>- ₦5</span>
                  </div>

                  <div style={{ height: '1px', backgroundColor: borderColor, margin: '4px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: subtextColor, fontSize: '13.5px' }}>Total</span>
                    <span style={{ color: textColor, fontWeight: 700, fontSize: '16px' }}>
                      ₦300,000
                    </span>
                  </div>
                </>
              ) : txnType === 'withdrawal' ? (
                /* Image 5: Withdrawal Payment Breakdown */
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Payment method</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>Bank transfer</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Account</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>8907134685 | GTB</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Amount</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦299,955</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Transaction fee</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦50</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>No fee weekend promo</span>
                    <span style={{ color: '#EF4444', fontWeight: 500 }}>- ₦5</span>
                  </div>

                  <div style={{ height: '1px', backgroundColor: borderColor, margin: '4px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: subtextColor, fontSize: '13.5px' }}>Total</span>
                    <span style={{ color: textColor, fontWeight: 700, fontSize: '16px' }}>
                      ₦300,000
                    </span>
                  </div>
                </>
              ) : (
                /* Booking Fee Default Breakdown */
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Payment method</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>Wallet</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Amount</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦2,950</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>Transaction fee</span>
                    <span style={{ color: textColor, fontWeight: 500 }}>₦0</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor }}>No fee weekend promo</span>
                    <span style={{ color: subtextColor, fontWeight: 500 }}>- ₦0</span>
                  </div>

                  <div style={{ height: '1px', backgroundColor: borderColor, margin: '4px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: subtextColor, fontSize: '13.5px' }}>Total</span>
                    <span style={{ color: textColor, fontWeight: 700, fontSize: '16px' }}>
                      ₦2,950
                    </span>
                  </div>
                </>
              )}
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {txnType === 'earning' ? (
              /* Image 3: Earnings Activity */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                  Earnings payment received
                </span>
                <span style={{ fontSize: '12px', color: subtextColor }}>₦250</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                  <span style={{ fontSize: '11px', color: subtextColor }}>System</span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      color: subtextColor,
                      border: `1px solid ${borderColor}`,
                      padding: '1px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    Auto
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: subtextColor }}>
                  March 15, 2026 | 13:25
                </span>
              </div>
            ) : txnType === 'deposit' ? (
              /* Image 4: Deposit Activity */
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    {status === 'Failed' ? 'Transaction failed' : 'Transaction successful'}
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    {status === 'Failed' ? 'Deposit failed' : 'Deposit confirmed'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>System</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Auto
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Bank transfer completed
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    ₦300,000 | Bank transfer | GTB: 0983746790
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>Aku Cynthia</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Customer
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Deposit request initiated
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    ₦300,000 | Bank transfer | GTB: 0983746790
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>Aku Cynthia</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Customer
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>
              </>
            ) : txnType === 'withdrawal' ? (
              /* Image 5: Withdrawal Activity */
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    {status === 'Failed' ? 'Withdrawal failed' : 'Transaction successful'}
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    {status === 'Failed' ? 'Bank rejected transfer' : 'Withdrawal processed'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>System</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Auto
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Withdrawal transfer sent
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    ₦300,000 | Bank transfer | GTB: 8907134685
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>Aku Cynthia</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Customer
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Withdrawal request initiated
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    ₦300,000 | Bank transfer | GTB: 8907134685
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>Aku Cynthia</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Customer
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>
              </>
            ) : (
              /* Booking Default Activity */
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Transaction successful
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    Deposit confirmed
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>System</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Auto
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Bank transfer completed
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    ₦300,000 | Bank transfer | GTB 0983746790
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>Aku Cynthia</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Customer
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                    Deposit request initiated
                  </span>
                  <span style={{ fontSize: '12px', color: subtextColor }}>
                    ₦300,000 | Bank transfer | GTB 0983746790
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: subtextColor }}>Aku Cynthia</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: subtextColor,
                        border: `1px solid ${borderColor}`,
                        padding: '1px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      Customer
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: subtextColor }}>
                    March 15, 2026 | 13:25
                  </span>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Fund Wallet Modal */}
      <FundWalletModal
        isOpen={showFundWalletModal}
        onClose={() => setShowFundWalletModal(false)}
        isLightMode={isLightMode}
        amount={displayAmount}
        userName="Aku Cynthia"
      />
    </div>
  );
};
