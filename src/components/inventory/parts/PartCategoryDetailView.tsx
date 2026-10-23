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
  initialBoxPartCategories,
  initialCategoryParts,
  partCategoryActivityHistory,
  CategoryPartItem,
} from '@/lib/inventoryMockData';
import { PartCategoryFilterModal } from './PartCategoryFilterModal';

interface PartCategoryDetailViewProps {
  categoryId: string;
}

export const PartCategoryDetailView: React.FC<PartCategoryDetailViewProps> = ({ categoryId }) => {
  const router = useRouter();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  // Find category or fallback
  const category =
    initialBoxPartCategories.find((c) => c.id === categoryId) ||
    initialBoxPartCategories[0] || {
      id: categoryId,
      name: 'Name of category',
      description: 'Category description',
      createdBy: { name: 'James Moses', timestamp: 'Aug 02, 2024 | 11:56 AM' },
      lastUpdated: { name: 'James Moses', timestamp: 'Aug 02, 2024 | 11:56 AM' },
    };

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Category Parts list
  const [partsList, setPartsList] = useState<CategoryPartItem[]>(initialCategoryParts);

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

  // Styling Tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const innerCardBg = isLightMode ? '#F9FAFB' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Setup Back navigation and clear top Actions (Image 3 has NO Action button at top!)
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.push('/inventory/parts');
    });
    return () => {
      setCustomBack(null);
    };
  }, [router, setCustomBack, setHeaderActions]);

  // Handle Discontinue Toggle on row
  const handleToggleDiscontinue = (id: string) => {
    setPartsList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const willBeDiscontinued = item.status === 'Active';
          const newStatus = willBeDiscontinued ? 'Discontinue' : 'Active';
          setActiveToast({
            type: willBeDiscontinued ? 'disable' : 'success',
            title: willBeDiscontinued ? 'Part Discontinued' : 'Part Activated',
            message: willBeDiscontinued
              ? `You successfully discontinued ${item.name} (${item.sku})`
              : `${item.name} is now active and in production`,
          });
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
    setActiveActionRowId(null);
  };

  // Filter items
  const filteredParts = partsList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.suppliers.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (!appliedFilters.status.includes('All')) {
      if (!appliedFilters.status.some((s) => s.toLowerCase() === item.status.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '40px',
      }}
      onClick={() => {
        if (activeActionRowId) setActiveActionRowId(null);
      }}
    >
      {/* LEFT COLUMN: MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingRight: '20px',
        }}
      >
        {/* TOP CARD: CATEGORY METADATA (Image 3) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: textColor }}>
            {category.name}
          </h2>
          <p style={{ fontSize: '13px', color: subtextColor, margin: 0 }}>
            {category.description}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '4px',
              fontSize: '13px',
            }}
          >
            <div>
              <span style={{ color: subtextColor }}>Created by </span>
              <span style={{ color: textColor, fontWeight: 600 }}>{category.createdBy.name}</span>
            </div>
            <div>
              <span style={{ color: subtextColor }}>Last updated </span>
              <span style={{ color: textColor, fontWeight: 600 }}>{category.lastUpdated.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Decoupled Toolbar (Rule 1: Sitting cleanly on page background) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div>
            <span
              style={{
                color: yellowColor,
                fontWeight: 700,
                fontSize: '14px',
                paddingBottom: '4px',
                borderBottom: `2px solid ${yellowColor}`,
              }}
            >
              Parts
            </span>
          </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '210px',
                    height: '36px',
                    backgroundColor: innerCardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '0 36px 0 12px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
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
                  backgroundColor: innerCardBg,
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

        {/* Table Container Card (Rule 1 & 6) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      fontSize: '11px',
                      color: subtextColor,
                      fontWeight: 500,
                    }}
                  >
                    <th style={{ padding: '12px 16px' }}>Part</th>
                    <th style={{ padding: '12px 16px' }}>Suppliers</th>
                    <th style={{ padding: '12px 16px' }}>SKU</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.map((row) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: `1px solid ${borderColor}`,
                        fontSize: '13px',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = isLightMode
                          ? 'rgba(0, 0, 0, 0.02)'
                          : 'rgba(255, 255, 255, 0.02)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {/* Part thumbnail & name */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '8px',
                              backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                              border: `1px solid ${borderColor}`,
                            }}
                          >
                            <img
                              src={row.image || '/image/box1.png'}
                              alt={row.name}
                              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                            />
                          </div>
                          <span style={{ fontWeight: 600, color: textColor }}>{row.name}</span>
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                        {row.suppliers}
                      </td>

                      <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                        {row.sku}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            padding: '3px 10px',
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

                      {/* Action 3-dots */}
                      <td style={{ padding: '14px 16px', textAlign: 'right', position: 'relative' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionRowId(activeActionRowId === row.id ? null : row.id);
                          }}
                          aria-label="Actions"
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

                        {/* Dropdown with options: view, edit, discontinue(on/off toggle) */}
                        {activeActionRowId === row.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              right: '16px',
                              top: '100%',
                              backgroundColor: isLightMode ? '#FFFFFF' : '#18181B',
                              border: `1px solid ${borderColor}`,
                              borderRadius: '10px',
                              padding: '6px',
                              minWidth: '175px',
                              zIndex: 50,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                              textAlign: 'left',
                            }}
                          >
                            {/* View */}
                            <div
                              onClick={() => {
                                setActiveActionRowId(null);
                                router.push(`/inventory/parts/bp-1`);
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
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              <Eye size={14} color={subtextColor} />
                              <span>View</span>
                            </div>

                            {/* Edit (routes to Image 5 Edit Part page) */}
                            <div
                              onClick={() => {
                                setActiveActionRowId(null);
                                router.push(`/inventory/parts/bp-1/edit`);
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
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              <Edit size={14} color={subtextColor} />
                              <span>Edit</span>
                            </div>

                            {/* Discontinue toggle */}
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
                              onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                              }
                            >
                              <span>Discontinue</span>
                              <div
                                style={{
                                  width: '28px',
                                  height: '16px',
                                  borderRadius: '999px',
                                  backgroundColor:
                                    row.status === 'Discontinue'
                                      ? yellowColor
                                      : isLightMode
                                      ? '#D1D5DB'
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
                                    backgroundColor:
                                      row.status === 'Discontinue' ? '#000000' : '#FFFFFF',
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
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

      {/* RIGHT SIDEBAR: ACTIVITY HISTORY (Matching Image 3) */}
      <div
        style={{
          width: '280px',
          flexShrink: 0,
          borderLeft: `1px solid ${borderColor}`,
          paddingLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>
          Activity history
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {partCategoryActivityHistory.map((act) => (
            <div key={act.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                {act.title}
              </div>
              <div style={{ fontSize: '12px', color: subtextColor }}>
                {act.description}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '4px',
                  fontSize: '11px',
                  color: subtextColor,
                }}
              >
                <span>{act.actor}</span>
                <span style={{ fontWeight: 500 }}>{act.role}</span>
              </div>
              <div style={{ fontSize: '11px', color: isLightMode ? '#9CA3AF' : '#71717A' }}>
                {act.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER MODAL (IMAGE 3) */}
      <PartCategoryFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setAppliedFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Category parts filtered successfully',
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
