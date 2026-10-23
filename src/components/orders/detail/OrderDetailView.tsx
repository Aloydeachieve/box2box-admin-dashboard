'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/components/layout/AdminContext';
import { OrderInformationCard } from './OrderInformationCard';
import { OrderBuyerDeliveryCards } from './OrderBuyerDeliveryCards';
import { OrderItemsSection } from './OrderItemsSection';
import { OrderPaymentSummarySection } from './OrderPaymentSummarySection';
import { RefundOrderModal } from './RefundOrderModal';
import { CancelOrderModal } from './CancelOrderModal';
import { ToastNotification } from '@/components/common/ToastNotification';
import { initialOrderItems, OrderItemDetail } from '@/lib/ordersMockData';

interface OrderDetailViewProps {
  orderId: string;
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({ orderId }) => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'Pending' | 'Cancelled' | 'Delivered'>('Pending');

  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const handleRefundClick = () => {
    setShowRefundModal(true);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmRefund = (amount: number, count: number) => {
    setActiveToast({
      type: 'success',
      title: 'Refund Processed',
      message: `Refund of ₦${amount.toLocaleString()} processed for ${count} item(s) on order #${orderId}`,
    });
  };

  const handleConfirmCancel = () => {
    setOrderStatus('Cancelled');
    setActiveToast({
      type: 'disable',
      title: 'Order Cancelled',
      message: `Order #${orderId} has been cancelled`,
    });
  };

  const handleSendEmail = () => {
    setActiveToast({
      type: 'success',
      title: 'Email Client',
      message: 'Opening email composer for Aku Cynthia',
    });
  };

  const handleAssignStock = (item: OrderItemDetail) => {
    setActiveToast({
      type: 'success',
      title: 'Stock Assigned',
      message: `Stock assigned to ${item.name}`,
    });
  };

  const handleDeliveryStatus = (item: OrderItemDetail) => {
    setActiveToast({
      type: 'resolved',
      title: 'Status Updated',
      message: `Delivery status updated for ${item.name}`,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        width: '100%',
        alignItems: 'stretch',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
    >
      {/* LEFT COLUMN: 4 INDEPENDENT BLOCKS MATCHING FIGMA */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* BLOCK 1: ORDER INFORMATION & PAYMENT INFORMATION */}
        <OrderInformationCard
          isLightMode={isLightMode}
          orderStatus={orderStatus}
          onRefund={handleRefundClick}
          onCancelOrder={handleCancelClick}
        />

        {/* BLOCK 2: BUYER INFORMATION & DELIVERY INFORMATION (2 SIDE-BY-SIDE CARDS) */}
        <OrderBuyerDeliveryCards
          isLightMode={isLightMode}
          onSendEmail={handleSendEmail}
        />

        {/* BLOCK 3: ITEMS IN ORDER TABLE */}
        <OrderItemsSection
          isLightMode={isLightMode}
          onAssignStock={handleAssignStock}
          onDeliveryStatus={handleDeliveryStatus}
        />

        {/* BLOCK 4: PAYMENT SUMMARY TABLE */}
        <OrderPaymentSummarySection isLightMode={isLightMode} />
      </div>

      {/* RIGHT COLUMN: ACTIVITY HISTORY SIDEBAR WITH FULL-HEIGHT DIVIDER LINE */}
      <div
        style={{
          width: '270px',
          flexShrink: 0,
          borderLeft: `1px solid ${borderColor}`,
          paddingLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignSelf: 'stretch',
        }}
        className="order-detail-activity-sidebar"
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
          }}
        >
          Activity history
        </h3>

        {/* Activity Timeline Item matching Figma */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
            Earnings payment received
          </div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: textColor }}>
            ₦250
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: subtextColor,
              marginTop: '4px',
            }}
          >
            <span>System</span>
            <span>Auto</span>
          </div>
          <div style={{ fontSize: '11px', color: subtextColor }}>
            March 15, 2026 | 15:25
          </div>
        </div>
      </div>

      {/* Refund Order Modal */}
      <RefundOrderModal
        isOpen={showRefundModal}
        items={initialOrderItems}
        isLightMode={isLightMode}
        onClose={() => setShowRefundModal(false)}
        onConfirmRefund={handleConfirmRefund}
      />

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={showCancelModal}
        isLightMode={isLightMode}
        onClose={() => setShowCancelModal(false)}
        onConfirmCancel={handleConfirmCancel}
      />

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
