'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialBoxPartSuppliers,
  initialSupplierParts,
  partSupplierActivityHistory,
  SupplierPartItem,
} from '@/lib/inventoryMockData';

interface PartSupplierDetailViewProps {
  supplierId: string;
}

export const PartSupplierDetailView: React.FC<PartSupplierDetailViewProps> = ({ supplierId }) => {
  const router = useRouter();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  // Find supplier or fallback
  const supplier =
    initialBoxPartSuppliers.find((s) => s.id === supplierId) ||
    initialBoxPartSuppliers[0] || {
      id: supplierId,
      name: 'Abc Ltd',
      email: 'supply@abc.com',
      location: 'Lagos',
      createdBy: { name: 'James Moses', timestamp: 'Aug 02, 2024 | 11:56 AM' },
      lastUpdated: { name: 'James Moses', timestamp: 'Aug 02, 2024 | 11:56 AM' },
      quantitySupplied: 12000000,
    };

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Supplier Parts list
  const [partsList, setPartsList] = useState<SupplierPartItem[]>(initialSupplierParts);

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

  // Setup Back navigation and clear top Actions (Image 4 has NO Action button at top!)
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
  const handleToggleDiscontinue = (id: string, name: string) => {
    setActiveToast({
      type: 'disable',
      title: 'Part Discontinued',
      message: `You successfully discontinued ${name}`,
    });
    setActiveActionRowId(null);
  };

  // Filter items
  const filteredParts = partsList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
        {/* TOP CARD: SUPPLIER METADATA & 5 STAT CARDS (Image 4) */}
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
          {/* Supplier Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: textColor }}>
                {supplier.name}
              </h2>
              <span style={{ fontSize: '13px', color: subtextColor }}>#1234567879</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                fontSize: '13px',
              }}
            >
              <div>
                <span style={{ color: subtextColor }}>Email address </span>
                <span style={{ color: textColor, fontWeight: 600 }}>{supplier.email}</span>
              </div>
              <div>
                <span style={{ color: subtextColor }}>Location </span>
                <span style={{ color: textColor, fontWeight: 600 }}>{supplier.location}</span>
              </div>
              <div>
                <span style={{ color: subtextColor }}>Added by </span>
                <span style={{ color: textColor, fontWeight: 600 }}>James Moses</span>
              </div>
              <div>
                <span style={{ color: subtextColor }}>Last updated </span>
                <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2024 | 11:56 AM</span>
              </div>
            </div>
          </div>

          {/* 5 Stat Cards inside top block matching Image 4 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: '12px',
            }}
          >
            <div
              style={{
                backgroundColor: innerCardBg,
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '11px', color: subtextColor }}>Total Parts Purchased</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textColor }}>12,000,000</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+12% today</div>
            </div>

            <div
              style={{
                backgroundColor: innerCardBg,
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '11px', color: subtextColor }}>Total Amount Spent</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textColor }}>₦ 7,935,000</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+12% today</div>
            </div>

            <div
              style={{
                backgroundColor: innerCardBg,
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '11px', color: subtextColor }}>Avg Price Per Part</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textColor }}>₦ 30,908</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+2% today</div>
            </div>

            <div
              style={{
                backgroundColor: innerCardBg,
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '11px', color: subtextColor }}>Total Faulty Parts</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textColor }}>5</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+4% today</div>
            </div>

            <div
              style={{
                backgroundColor: innerCardBg,
                borderRadius: '12px',
                border: `1px solid ${borderColor}`,
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '11px', color: subtextColor }}>Total Available Parts</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: textColor }}>72%</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+2% today</div>
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
                    <th style={{ padding: '12px 16px' }}>SKU</th>
                    <th style={{ padding: '12px 16px' }}>Avg Amount</th>
                    <th style={{ padding: '12px 16px' }}>Total Amount</th>
                    <th style={{ padding: '12px 16px' }}>No. Purchased</th>
                    <th style={{ padding: '12px 16px' }}>No. Available</th>
                    <th style={{ padding: '12px 16px' }}>No. Faulty</th>
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
                        {row.sku}
                      </td>

                      <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                        {row.avgAmount}
                      </td>

                      <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                        {row.totalAmount}
                      </td>

                      <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                        {row.noPurchased}
                      </td>

                      <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                        {row.noAvailable}
                      </td>

                      <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                        {row.noFaulty}
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
                              onClick={() => handleToggleDiscontinue(row.id, row.name)}
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
                                  backgroundColor: isLightMode ? '#D1D5DB' : '#3F3F46',
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
                                    left: '2px',
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
          </div>

          {/* Pagination Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px',
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

      {/* RIGHT SIDEBAR: ACTIVITY HISTORY (Matching Image 4) */}
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
          {partSupplierActivityHistory.map((act) => (
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
