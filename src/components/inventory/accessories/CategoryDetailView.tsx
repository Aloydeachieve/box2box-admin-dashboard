'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialAccessories,
  initialAccessoryCategories,
  categoryDetailActivityHistory,
  AccessoryItem,
} from '@/lib/inventoryMockData';
import { CategoryAccessoriesFilterModal } from './CategoryAccessoriesFilterModal';

interface CategoryDetailViewProps {
  categoryId: string;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({ categoryId }) => {
  const router = useRouter();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  // Find category or fallback
  const category =
    initialAccessoryCategories.find((c) => c.id === categoryId) ||
    initialAccessoryCategories[0] || {
      id: categoryId,
      name: 'Main module',
      description: 'Category description',
      createdBy: { name: 'James Moses', timestamp: 'Aug 02, 2024 | 11:56 AM' },
      lastUpdated: { name: 'James Moses', timestamp: 'Aug 02, 2024 | 11:56 AM' },
    };

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Accessories in this category (with fallback to mock accessories)
  const [accessoriesList, setAccessoriesList] = useState<AccessoryItem[]>(initialAccessories);

  // Filters
  const [appliedFilters, setAppliedFilters] = useState<{
    linkedBoxes: string[];
    status: string[];
  }>({
    linkedBoxes: ['All'],
    status: ['All'],
  });

  // Toast
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Theme styling tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#F9FAFB' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Setup header back button and clear header actions
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.push('/inventory/accessories');
    });
    return () => {
      setCustomBack(null);
    };
  }, [router, setCustomBack, setHeaderActions]);

  // Toggle Discontinue on an accessory item
  const handleToggleDiscontinue = (id: string) => {
    setAccessoriesList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const willBeDiscontinued = item.status === 'Active';
          const newStatus = willBeDiscontinued ? 'Discontinue' : 'Active';
          setActiveToast({
            type: willBeDiscontinued ? 'disable' : 'success',
            title: willBeDiscontinued ? 'Accessory Discontinued' : 'Accessory Activated',
            message: willBeDiscontinued
              ? `You successfully discontinued ${item.name} (${item.sku})`
              : `${item.name} is now active and in production`,
          });
          return {
            ...item,
            status: newStatus,
          };
        }
        return item;
      })
    );
    setActiveActionRowId(null);
  };

  // Filter items
  const filteredAccessories = accessoriesList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.linkedBox.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (!appliedFilters.linkedBoxes.includes('All')) {
      const matchBox = appliedFilters.linkedBoxes.some(
        (b) => b.toLowerCase() === item.linkedBox.toLowerCase()
      );
      if (!matchBox) return false;
    }

    if (!appliedFilters.status.includes('All')) {
      const matchStat = appliedFilters.status.some(
        (s) => s.toLowerCase() === item.status.toLowerCase()
      );
      if (!matchStat) return false;
    }

    return true;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
      onClick={() => {
        if (activeActionRowId) setActiveActionRowId(null);
      }}
    >
      {/* LEFT COLUMN: Main Category Detail Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          paddingRight: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Category Header Information matching Image 2 */}
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 6px 0',
            }}
          >
            {category.name || 'Name of category'}
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: subtextColor,
              margin: '0 0 8px 0',
            }}
          >
            {category.description || 'Category description'}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <span>
              Created by <strong style={{ color: textColor }}>{category.createdBy.name}</strong>
            </span>
            <span>|</span>
            <span>
              Last updated <strong style={{ color: textColor }}>Aug 02, 2024 | 11:56 AM</strong>
            </span>
          </div>
        </div>

        {/* Double-Border Container Architecture matching Image 2 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Top Row: Section Tab ("Accessories"), Search Box, and Filter Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Section Tab */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: yellowColor,
                  cursor: 'pointer',
                }}
              >
                Accessories
              </span>
            </div>

            {/* Right Controls: Search + Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Search Box */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '8px 36px 8px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    width: '220px',
                  }}
                />
                <Search
                  size={15}
                  color={subtextColor}
                  style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
                />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                onClick={() => setShowFilterModal(true)}
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  color: textColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <span>Filter</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>
            </div>
          </div>

          {/* Inner Table Container (Border 2) */}
          <div
            style={{
              borderRadius: '12px',
              border: `1px solid ${borderColor}`,
              overflow: 'visible',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      fontSize: '12px',
                      color: subtextColor,
                      fontWeight: 500,
                    }}
                  >
                    <th style={{ padding: '14px 18px' }}>Accessories</th>
                    <th style={{ padding: '14px 14px' }}>SKU</th>
                    <th style={{ padding: '14px 14px' }}>Linked box</th>
                    <th style={{ padding: '14px 14px' }}>Amount</th>
                    <th style={{ padding: '14px 14px' }}>Status</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccessories.map((row, index) => {
                    const isActionOpen = activeActionRowId === row.id;
                    const isNearBottom = index >= filteredAccessories.length - 2;

                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: `1px solid ${borderColor}`,
                          fontSize: '13px',
                          color: textColor,
                        }}
                      >
                        {/* Accessories Thumbnail + Name */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '6px',
                                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <img
                                src={row.image}
                                alt={row.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                onError={(e) => {
                                  (e.currentTarget as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <span style={{ fontWeight: 600, color: textColor }}>
                              {row.name}
                            </span>
                          </div>
                        </td>

                        {/* SKU */}
                        <td style={{ padding: '14px 14px', color: subtextColor, fontSize: '12px' }}>
                          {row.sku}
                        </td>

                        {/* Linked Box */}
                        <td style={{ padding: '14px 14px' }}>{row.linkedBox}</td>

                        {/* Amount */}
                        <td style={{ padding: '14px 14px', fontWeight: 600 }}>{row.amount}</td>

                        {/* Status */}
                        <td style={{ padding: '14px 14px' }}>
                          <span
                            style={{
                              padding: '4px 12px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              backgroundColor:
                                row.status === 'Active'
                                  ? 'rgba(16, 185, 129, 0.15)'
                                  : 'rgba(239, 68, 68, 0.15)',
                              color: row.status === 'Active' ? '#10B981' : '#EF4444',
                            }}
                          >
                            {row.status}
                          </span>
                        </td>

                        {/* Action Column with 3-Dots Dropdown: View, Edit, Discontinue */}
                        <td style={{ padding: '14px 18px', textAlign: 'right', position: 'relative' }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveActionRowId(isActionOpen ? null : row.id);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: subtextColor,
                              cursor: 'pointer',
                              padding: '4px',
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {isActionOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'absolute',
                                ...(isNearBottom
                                  ? { bottom: '100%', marginBottom: '4px' }
                                  : { top: '100%', marginTop: '4px' }),
                                right: '18px',
                                backgroundColor: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: '10px',
                                padding: '6px',
                                minWidth: '170px',
                                zIndex: 50,
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                                textAlign: 'left',
                              }}
                            >
                              {/* View -> Routes to Accessory Detail View (Image 4) */}
                              <div
                                onClick={() => {
                                  setActiveActionRowId(null);
                                  router.push(`/inventory/accessories/${row.id}`);
                                }}
                                style={{
                                  padding: '8px 10px',
                                  fontSize: '12px',
                                  color: textColor,
                                  cursor: 'pointer',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.backgroundColor = isLightMode
                                    ? '#F3F4F6'
                                    : '#222226')
                                }
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <Eye size={14} color={subtextColor} />
                                <span>View</span>
                              </div>

                              {/* Edit -> Routes to Edit Accessory Page (Image 3) */}
                              <div
                                onClick={() => {
                                  setActiveActionRowId(null);
                                  router.push(`/inventory/accessories/${row.id}/edit`);
                                }}
                                style={{
                                  padding: '8px 10px',
                                  fontSize: '12px',
                                  color: textColor,
                                  cursor: 'pointer',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.backgroundColor = isLightMode
                                    ? '#F3F4F6'
                                    : '#222226')
                                }
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <Edit size={14} color={subtextColor} />
                                <span>Edit</span>
                              </div>

                              {/* Discontinue with interactive toggle switch */}
                              <div
                                onClick={() => handleToggleDiscontinue(row.id)}
                                style={{
                                  padding: '8px 10px',
                                  fontSize: '12px',
                                  color: textColor,
                                  cursor: 'pointer',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.backgroundColor = isLightMode
                                    ? '#F3F4F6'
                                    : '#222226')
                                }
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <span>Discontinue</span>
                                <div
                                  style={{
                                    width: '28px',
                                    height: '16px',
                                    borderRadius: '10px',
                                    backgroundColor:
                                      row.status === 'Discontinue'
                                        ? '#EF4444'
                                        : isLightMode
                                        ? '#E5E7EB'
                                        : '#3F3F46',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '12px',
                                      height: '12px',
                                      borderRadius: '50%',
                                      backgroundColor: '#FFFFFF',
                                      position: 'absolute',
                                      top: '2px',
                                      left: row.status === 'Discontinue' ? '14px' : '2px',
                                      transition: 'left 0.2s',
                                    }}
                                  />
                                </div>
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

            {/* Pagination matching Image 2 */}
            <div
              style={{
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: `1px solid ${borderColor}`,
                fontSize: '12px',
                color: subtextColor,
              }}
            >
              <div>1 - 100 of 5,000,045</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  aria-label="Previous page"
                  style={{
                    background: 'none',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '6px',
                    color: subtextColor,
                    cursor: 'pointer',
                    padding: '4px 6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Next page"
                  style={{
                    background: 'none',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '6px',
                    color: subtextColor,
                    cursor: 'pointer',
                    padding: '4px 6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Activity History Sidebar matching Image 2 */}
      <div
        style={{
          width: '280px',
          flexShrink: 0,
          borderLeft: `1px solid ${borderColor}`,
          paddingLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
          Activity history
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {categoryDetailActivityHistory.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', color: subtextColor, lineHeight: '18px' }}>
                {item.description}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: subtextColor,
                  marginTop: '2px',
                }}
              >
                <span>{item.actor}</span>
                <span
                  style={{
                    color: item.role === 'Auto' ? '#10B981' : yellowColor,
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  {item.role}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: subtextColor }}>
                {item.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      <CategoryAccessoriesFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setAppliedFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Category accessory filters applied successfully',
          });
        }}
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
