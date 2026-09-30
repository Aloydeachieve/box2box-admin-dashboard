'use client';

import React from 'react';
import { StorageOrder, OrderStatus } from '@/types';
import {
  X,
  Warehouse,
  Truck,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  Box,
  Thermometer,
  ShieldCheck,
  Printer,
  ChevronRight,
} from 'lucide-react';

interface OrderDetailModalProps {
  order: StorageOrder | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const steps: { key: OrderStatus; label: string }[] = [
    { key: 'pending_pickup', label: 'Pickup Scheduled' },
    { key: 'in_transit', label: 'Courier In Transit' },
    { key: 'stored_in_vault', label: 'Secured in Vault' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'completed', label: 'Completed' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'rgba(11, 15, 26, 0.97)',
          border: '1px solid var(--border-glass-bright)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                Order {order.trackingNumber}
              </h2>
              <span className="code-tag">{order.qrCodeToken}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Registered on {order.createdAt.split('T')[0]} at{' '}
              {order.createdAt.includes('T') ? order.createdAt.split('T')[1].slice(0, 5) : '08:15'}
            </div>
          </div>
        </div>

        {/* Timeline Progress */}
        <div
          style={{
            padding: '16px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-glass)',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {steps.map((step, idx) => {
              const isPassed = currentStepIndex >= idx;
              const isCurrent = currentStepIndex === idx;

              return (
                <div
                  key={step.key}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isCurrent
                        ? '#22d3ee'
                        : isPassed
                        ? '#6366f1'
                        : 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isPassed ? '#ffffff' : 'var(--text-muted)',
                      boxShadow: isCurrent ? '0 0 12px rgba(34, 211, 238, 0.6)' : 'none',
                      marginBottom: '6px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isPassed ? <CheckCircle2 size={15} /> : <Clock size={14} />}
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#22d3ee' : isPassed ? '#ffffff' : 'var(--text-muted)',
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer & Courier Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          {/* Customer Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px' }}>
              Customer Details
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img
                src={order.customerAvatar}
                alt={order.customerName}
                style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                  {order.customerName}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>
                  {order.customerEmail}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-medium)' }}>
                <Phone size={14} color="#818cf8" />
                <span>{order.customerPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-medium)' }}>
                <MapPin size={14} color="#22d3ee" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{order.pickupAddress}</span>
              </div>
            </div>
          </div>

          {/* Vault & Bay Assignment */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px' }}>
              Facility & Vault Assignment
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Warehouse Hub:</span>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{order.warehouseHub}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Storage Bay:</span>
                <span style={{ fontWeight: 700, color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
                  {order.warehouseBay}
                </span>
              </div>
              {order.lockerCode && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Locker PIN / Token:</span>
                  <span style={{ fontWeight: 700, color: 'var(--amber-400)', fontFamily: 'var(--font-mono)' }}>
                    {order.lockerCode}
                  </span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Climate Controlled:</span>
                <span style={{ color: order.climateControlled ? 'var(--emerald-400)' : 'var(--text-muted)' }}>
                  {order.climateControlled ? 'Yes (19.4°C / 44%)' : 'Standard Ambient'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Volume:</span>
                <span style={{ fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {order.volumeM3} m³ ({order.itemsCount} items)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Description */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-glass)',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
            Manifest & Description
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-high)', lineHeight: 1.5 }}>
            {order.itemsSummary}
          </div>
        </div>

        {/* Status Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-glass)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Update Operational Stage:</span>
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
              style={{
                background: 'rgba(14, 20, 34, 0.9)',
                color: '#ffffff',
                border: '1px solid var(--border-glass-bright)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                outline: 'none',
              }}
            >
              <option value="pending_pickup">Pending Pickup</option>
              <option value="in_transit">In Transit</option>
              <option value="stored_in_vault">Stored in Vault</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="completed">Delivered / Completed</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => alert(`Printing QR Barcode tag for ${order.trackingNumber}`)}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '8px 14px' }}
            >
              <Printer size={15} />
              <span>Print Barcode Tag</span>
            </button>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
