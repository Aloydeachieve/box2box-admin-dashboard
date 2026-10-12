'use client';

import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface AssignOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  boxId?: string;
  onAssignOrder: (orderId: string) => void;
}

export const AssignOrderModal: React.FC<AssignOrderModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  boxId = 'MyBox-123456',
  onAssignOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string>('O-123456');

  if (!isOpen) return null;

  const orders = ['O-123456', 'O-123457'];
  const filteredOrders = orders.filter((o) =>
    o.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modalBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.1)';
  const inputBg = isLightMode ? '#F9FAFB' : '#1A1A1E';

  const handleSelect = (orderId: string) => {
    setSelectedOrder(orderId);
    onAssignOrder(orderId);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '280px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          fontFamily: 'var(--font-outfit), sans-serif',
          animation: 'fadeIn 0.18s ease-out',
        }}
      >
        {/* Header: Select order + Close button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: textColor, margin: 0 }}>
            Select order
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: subtextColor,
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search input with search icon on right */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '34px',
              backgroundColor: inputBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '0 32px 0 10px',
              fontSize: '12px',
              color: textColor,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search
            size={13}
            color={subtextColor}
            style={{ position: 'absolute', right: '10px', top: '10px', pointerEvents: 'none' }}
          />
        </div>

        {/* Orders list with radio selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredOrders.map((order) => {
            const isSelected = selectedOrder === order;
            return (
              <div
                key={order}
                onClick={() => handleSelect(order)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#1F1F24')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                  {order}
                </span>

                {/* Radio Circle */}
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: isSelected
                      ? '5px solid #F5C842'
                      : `1.5px solid ${subtextColor}`,
                    backgroundColor: isSelected ? '#141416' : 'transparent',
                    boxSizing: 'border-box',
                    transition: 'all 0.15s ease',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
