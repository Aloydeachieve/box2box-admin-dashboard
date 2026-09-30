'use client';

import React, { useState } from 'react';
import {
  StorageOrder,
  OrderStatus,
  ServiceType,
} from '@/types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Warehouse,
  QrCode,
  Copy,
  Check,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  Lock,
} from 'lucide-react';

interface OrdersTableProps {
  orders: StorageOrder[];
  onSelectOrder: (order: StorageOrder) => void;
  onDispatchCourier: (orderId: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onSelectOrder,
  onDispatchCourier,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    const matchesService =
      serviceFilter === 'all' || order.serviceType === serviceFilter;
    return matchesStatus && matchesService;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'stored_in_vault':
        return (
          <span className="badge badge-emerald">
            <Warehouse size={11} />
            Stored in Vault
          </span>
        );
      case 'in_transit':
        return (
          <span className="badge badge-cyan">
            <Truck size={11} />
            In Transit
          </span>
        );
      case 'pending_pickup':
        return (
          <span className="badge badge-amber">
            <Clock size={11} />
            Pending Pickup
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="badge badge-indigo">
            <Truck size={11} />
            Out for Delivery
          </span>
        );
      case 'completed':
        return (
          <span className="badge badge-emerald">
            <CheckCircle2 size={11} />
            Delivered
          </span>
        );
      default:
        return <span className="badge badge-rose">Cancelled</span>;
    }
  };

  const getServiceBadge = (type: ServiceType) => {
    switch (type) {
      case 'door-to-door':
        return <span style={{ color: '#818cf8', fontWeight: 600 }}>Door-to-Door</span>;
      case 'smart-locker':
        return <span style={{ color: '#22d3ee', fontWeight: 600 }}>Smart Locker</span>;
      case 'b2b-vault':
        return <span style={{ color: '#fbbf24', fontWeight: 600 }}>B2B Vault</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
      {/* Header & Filter Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Live Storage & Dispatch Operations
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Real-time pipeline of customer pickups, vault placement, and returns
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending_pickup', label: 'Pending Pickup' },
            { id: 'in_transit', label: 'In Transit' },
            { id: 'stored_in_vault', label: 'In Vault' },
            { id: 'out_for_delivery', label: 'Out for Return' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border:
                  statusFilter === tab.id
                    ? '1px solid var(--border-glow-primary)'
                    : '1px solid var(--border-glass)',
                background:
                  statusFilter === tab.id
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(255, 255, 255, 0.03)',
                color: statusFilter === tab.id ? '#ffffff' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Tracking & Token</th>
              <th>Customer</th>
              <th>Service & Items</th>
              <th>Volume (m³)</th>
              <th>Assigned Courier / Bay</th>
              <th>Status</th>
              <th>Fee</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No orders matching the selected filters.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Tracking Number */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="code-tag">{order.trackingNumber}</span>
                      <button
                        onClick={(e) => handleCopy(e, order.trackingNumber)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: copiedId === order.trackingNumber ? 'var(--emerald-400)' : 'var(--text-muted)',
                          padding: '2px',
                        }}
                        title="Copy tracking code"
                      >
                        {copiedId === order.trackingNumber ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Created {order.createdAt.includes('T') ? order.createdAt.split('T')[1].slice(0, 5) : '09:15'}
                    </div>
                  </td>

                  {/* Customer */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={order.customerAvatar}
                        alt={order.customerName}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid var(--border-glass)',
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: '#ffffff' }}>
                          {order.customerName}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {order.customerPhone}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Service & Items */}
                  <td>
                    <div style={{ fontSize: '12px' }}>{getServiceBadge(order.serviceType)}</div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        maxWidth: '220px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={order.itemsSummary}
                    >
                      {order.itemsCount} items: {order.itemsSummary}
                    </div>
                  </td>

                  {/* Volume */}
                  <td>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: 'var(--cyan-400)',
                        fontSize: '13px',
                      }}
                    >
                      {order.volumeM3} m³
                    </span>
                  </td>

                  {/* Courier / Location */}
                  <td>
                    {order.courierAssigned ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Truck size={14} color="#818cf8" />
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-high)' }}>
                            {order.courierAssigned.name}
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                            {order.courierAssigned.vehiclePlate} ({order.courierAssigned.vehicleType})
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Warehouse size={14} color="#fbbf24" />
                        <span style={{ fontSize: '12px', color: 'var(--text-medium)' }}>
                          {order.warehouseBay}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td>{getStatusBadge(order.status)}</td>

                  {/* Fee */}
                  <td>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ffffff', fontSize: '13px' }}>
                      €{order.totalAmount.toFixed(2)}
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--emerald-400)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrder(order);
                      }}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '11px', gap: '4px' }}
                    >
                      <span>Details</span>
                      <ChevronRight size={13} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
