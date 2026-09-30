'use client';

import React, { useState } from 'react';
import { StorageOrder, ServiceType } from '@/types';
import {
  X,
  Plus,
  Box,
  Truck,
  Warehouse,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Zap,
} from 'lucide-react';

interface NewDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (order: StorageOrder) => void;
}

export const NewDispatchModal: React.FC<NewDispatchModalProps> = ({
  isOpen,
  onClose,
  onCreateOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('door-to-door');
  const [itemsSummary, setItemsSummary] = useState('');
  const [volumeM3, setVolumeM3] = useState<number>(4.5);
  const [itemsCount, setItemsCount] = useState<number>(6);
  const [warehouseHub, setWarehouseHub] = useState('Madrid Central Hub #01');
  const [climateControlled, setClimateControlled] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !pickupAddress) {
      alert('Please fill in customer name and pickup address.');
      return;
    }

    const newOrder: StorageOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingNumber: `B2B-ES-${Math.floor(9000 + Math.random() * 999)}`,
      customerName,
      customerEmail: customerEmail || 'customer@box2box.io',
      customerPhone: customerPhone || '+34 600 000 000',
      customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      serviceType,
      itemsSummary: itemsSummary || `${itemsCount} Storage items and archive containers`,
      itemsCount: Number(itemsCount),
      volumeM3: Number(volumeM3),
      pickupAddress,
      deliveryAddress: `${warehouseHub}, Intake Dock 2`,
      status: 'pending_pickup',
      warehouseHub,
      warehouseBay: `Bay A-${Math.floor(10 + Math.random() * 20)}`,
      scheduledDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      totalAmount: Math.round(volumeM3 * 42.5),
      paymentStatus: 'paid',
      climateControlled,
      qrCodeToken: `B2B-TOKEN-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '580px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'rgba(11, 15, 26, 0.98)',
          border: '1px solid var(--border-glass-bright)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
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
            <Plus size={22} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
              Create Storage Dispatch & Pickup
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Dispatch Box2Box couriers and reserve warehouse storage bays
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Service Type Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-medium)', marginBottom: '8px' }}>
              Service Modality
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'door-to-door', label: 'Door-to-Door' },
                { id: 'smart-locker', label: 'Smart Locker' },
                { id: 'b2b-vault', label: 'B2B Vault' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setServiceType(item.id as ServiceType)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: serviceType === item.id ? '1px solid var(--primary-400)' : '1px solid var(--border-glass)',
                    background: serviceType === item.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    color: serviceType === item.id ? '#ffffff' : 'var(--text-muted)',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customer info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Customer Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Maria Sanchez"
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+34 612 345 678"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Customer Email
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="maria@example.com"
              className="input-field"
            />
          </div>

          {/* Pickup Address */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Pickup Address *
            </label>
            <input
              type="text"
              required
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="e.g. Calle de Alcalá 120, 28009 Madrid"
              className="input-field"
            />
          </div>

          {/* Manifest & Volume */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Item Manifest Summary
            </label>
            <input
              type="text"
              value={itemsSummary}
              onChange={(e) => setItemsSummary(e.target.value)}
              placeholder="e.g. 8x Archive Boxes, 2x Ergonomic Chairs, 1x Bicycle"
              className="input-field"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Estimated Volume (m³)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                value={volumeM3}
                onChange={(e) => setVolumeM3(parseFloat(e.target.value) || 1)}
                className="input-field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Item Count
              </label>
              <input
                type="number"
                min="1"
                value={itemsCount}
                onChange={(e) => setItemsCount(parseInt(e.target.value) || 1)}
                className="input-field"
              />
            </div>
          </div>

          {/* Hub selection */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Target Warehouse Hub
              </label>
              <select
                value={warehouseHub}
                onChange={(e) => setWarehouseHub(e.target.value)}
                className="input-field"
                style={{ background: 'rgba(14, 20, 34, 0.9)' }}
              >
                <option value="Madrid Central Hub #01">Madrid Central Hub #01</option>
                <option value="Lisbon Ocean Hub #04">Lisbon Ocean Hub #04</option>
                <option value="Paris Nord Logistics #02">Paris Nord Logistics #02</option>
                <option value="Barcelona Port Vault #03">Barcelona Port Vault #03</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '16px' }}>
                <input
                  type="checkbox"
                  checked={climateControlled}
                  onChange={(e) => setClimateControlled(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#6366f1' }}
                />
                <span style={{ fontSize: '12px', color: '#ffffff' }}>Climate Control</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '12px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-glass)',
            }}
          >
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Zap size={15} />
              <span>Confirm & Dispatch Courier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
