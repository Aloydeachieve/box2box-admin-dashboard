'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, MoreVertical, Check } from 'lucide-react';
import { initialOrderItems, OrderItemDetail } from '@/lib/ordersMockData';
import { OrderItemsFilterModal } from './OrderItemsFilterModal';
import { AssignStockModal } from './AssignStockModal';
import { UpdateDeliveryStatusModal } from './UpdateDeliveryStatusModal';
import { BatchUpdateStatusModal } from './BatchUpdateStatusModal';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface OrderItemsSectionProps {
  isLightMode?: boolean;
  onAssignStock?: (item: OrderItemDetail) => void;
  onDeliveryStatus?: (item: OrderItemDetail) => void;
}

export const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
  isLightMode = false,
  onAssignStock,
  onDeliveryStatus,
}) => {
  const [items, setItems] = useState<OrderItemDetail[]>(initialOrderItems);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Modals state
  const [assignStockItem, setAssignStockItem] = useState<OrderItemDetail | null>(null);
  const [deliveryStatusItem, setDeliveryStatusItem] = useState<OrderItemDetail | null>(null);
  const [showBatchUpdateModal, setShowBatchUpdateModal] = useState<boolean>(false);

  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const inputBg = isLightMode ? '#F3F4F6' : 'transparent';
  const yellowColor = '#F5C842';

  const handleAssignStockConfirm = (stockId: string) => {
    if (assignStockItem) {
      setItems((prev) =>
        prev.map((i) => (i.id === assignStockItem.id ? { ...i, inventoryId: stockId } : i))
      );
      onAssignStock?.(assignStockItem);
    }
  };

  const handleDeliveryStatusConfirm = (itemId: string, newStatus: 'Delivered') => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, deliveryStatus: newStatus } : i))
    );
    const it = items.find((i) => i.id === itemId);
    if (it) onDeliveryStatus?.(it);
  };

  const handleBatchUpdateConfirm = (updatedIds: string[]) => {
    setItems((prev) =>
      prev.map((i) => (updatedIds.includes(i.id) ? { ...i, deliveryStatus: 'Delivered' } : i))
    );
    setSelectedIds([]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  const handleToggleRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredItems = items.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* 1. STANDALONE TOOLBAR HANGING DIRECTLY ON PAGE BACKGROUND (NOT IN TABLE CARD) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Left: Title + Status Pill Badges matching Figma Image 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Items in order
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '12px',
                backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)',
                color: subtextColor,
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              Pending 2
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '12px',
                border: '1px solid #F5C842',
                backgroundColor: 'rgba(245, 200, 66, 0.08)',
                color: '#F5C842',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              Dispatched 3
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '12px',
                border: '1px solid #A855F7',
                backgroundColor: 'rgba(168, 85, 247, 0.08)',
                color: '#A855F7',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              In Transit 3
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '12px',
                border: '1px solid #10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                color: '#10B981',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              Delivered 5
            </span>
          </div>
        </div>

        {/* Right: Search & Filter Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 32px 7px 12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                color: textColor,
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <Search
              size={14}
              color={subtextColor}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: cardBg,
              color: textColor,
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <span>Filter</span>
            <ChevronDown size={14} color={subtextColor} />
          </button>
        </div>
      </div>

      {/* 2. DEDICATED TABLE CARD CONTAINER */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
        }}
      >
        {/* Top Selection Bar inside card matching Figma Image 2 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '4px',
          }}
        >
          {/* Select all */}
          <div
            onClick={handleSelectAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: `1.5px solid ${selectedIds.length > 0 ? yellowColor : isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
                backgroundColor: selectedIds.length > 0 ? yellowColor : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              {selectedIds.length > 0 && <Check size={12} color="#000000" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              Select all
            </span>
          </div>

          {/* Selection count and Update status button (shown when rows selected) */}
          {selectedIds.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '12px', color: subtextColor }}>
                {selectedIds.length} of {items.length} Selected
              </span>

              <button
                type="button"
                onClick={() => setShowBatchUpdateModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 16px',
                  borderRadius: '8px',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
                  transition: 'opacity 0.15s ease',
                }}
              >
                <span>Update status</span>
                <Box2BoxPulsingBadge size={14} inverted={false} />
              </button>
            </div>
          )}
        </div>

        {/* Table Content */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                <th style={{ width: '36px', padding: '12px 14px' }} />
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Item</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Inventory ID</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>No. of Cabinet</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Delivery Status</th>
                <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredItems.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              const isMenuOpen = activeDropdownId === item.id;

              return (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#19191D')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  {/* Row Checkbox */}
                  <td style={{ padding: '14px 14px' }}>
                    <div
                      onClick={() => handleToggleRow(item.id)}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: isSelected
                          ? `1px solid ${yellowColor}`
                          : `1px solid ${isLightMode ? '#D1D5DB' : 'rgba(255, 255, 255, 0.25)'}`,
                        backgroundColor: isSelected ? yellowColor : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {isSelected && <Check size={11} color="#000000" strokeWidth={3} />}
                    </div>
                  </td>

                  {/* Item: Thumbnail + Model + SKU + Material */}
                  <td style={{ padding: '14px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={30}
                          height={30}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                          {item.name}
                        </span>
                        <span style={{ fontSize: '10.5px', color: subtextColor }}>
                          {item.sku}
                        </span>
                        <span style={{ fontSize: '10.5px', color: subtextColor }}>
                          {item.material}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Inventory ID */}
                  <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                    {item.inventoryId}
                  </td>

                  {/* No. of Cabinet */}
                  <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                    {item.cabinets}
                  </td>

                  {/* Delivery Status */}
                  <td style={{ padding: '14px 14px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)',
                        color: subtextColor,
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      {item.deliveryStatus}
                    </span>
                  </td>

                  {/* Action: Three Dots Dropdown */}
                  <td style={{ padding: '14px 14px', textAlign: 'right', position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => setActiveDropdownId(isMenuOpen ? null : item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: subtextColor,
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Action Dropdown Menu matching Figma Image 3:
                        "Assign stock" and "Delivery status" (dim/inactive text appearance) */}
                    {isMenuOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '14px',
                          top: '40px',
                          backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
                          borderRadius: '8px',
                          border: `1px solid ${borderColor}`,
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                          zIndex: 30,
                          width: '180px',
                          padding: '4px',
                          textAlign: 'left',
                        }}
                      >
                        <div
                          onClick={() => {
                            setActiveDropdownId(null);
                            setAssignStockItem(item);
                          }}
                          style={{
                            padding: '8px 12px',
                            fontSize: '12px',
                            color: textColor,
                            cursor: 'pointer',
                            borderRadius: '6px',
                            fontWeight: 500,
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2B2B30')
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                          }
                        >
                          Assign stock
                        </div>

                        <div
                          onClick={() => {
                            setActiveDropdownId(null);
                            setDeliveryStatusItem(item);
                          }}
                          style={{
                            padding: '8px 12px',
                            fontSize: '12px',
                            color: subtextColor,
                            cursor: 'pointer',
                            borderRadius: '6px',
                            fontWeight: 500,
                            transition: 'color 0.15s ease',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2B2B30';
                            e.currentTarget.style.color = textColor;
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = subtextColor;
                          }}
                        >
                          Delivery status
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>

      {/* Filter Modal */}
      <OrderItemsFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={() => {
          setShowFilterModal(false);
        }}
      />

      {/* Assign Stock Modal (Figma Image 3 with nested branch modal) */}
      <AssignStockModal
        isOpen={!!assignStockItem}
        onClose={() => setAssignStockItem(null)}
        item={assignStockItem}
        isLightMode={isLightMode}
        onAssign={handleAssignStockConfirm}
      />

      {/* Individual Item Update Delivery Status Modal */}
      <UpdateDeliveryStatusModal
        isOpen={!!deliveryStatusItem}
        onClose={() => setDeliveryStatusItem(null)}
        item={deliveryStatusItem}
        isLightMode={isLightMode}
        onUpdateStatus={handleDeliveryStatusConfirm}
      />

      {/* Batch Update Status Modal (Figma Image 3) */}
      <BatchUpdateStatusModal
        isOpen={showBatchUpdateModal}
        onClose={() => setShowBatchUpdateModal(false)}
        selectedItems={items.filter((i) => selectedIds.includes(i.id))}
        isLightMode={isLightMode}
        onConfirmUpdate={handleBatchUpdateConfirm}
      />
    </div>
  );
};
