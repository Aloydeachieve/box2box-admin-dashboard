'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
  X,
  RotateCcw,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import {
  initialBoxParts,
  initialPartStockLocations,
  initialPartUnits,
  partOverviewActivityHistory,
  partStockUnitsActivityHistory,
  PartStockLocationItem,
  PartUnitItem,
} from '@/lib/inventoryMockData';
import { PartOverviewFilterModal } from './PartOverviewFilterModal';
import { PartStockUnitsFilterModal } from './PartStockUnitsFilterModal';
import { StockThresholdModal } from '@/components/inventory/boxes/StockThresholdModal';
import { PartUnitDetailView } from './PartUnitDetailView';
import { EditPartStockView } from './EditPartStockView';
import { UpdatePartStockView } from './UpdatePartStockView';

interface PartDetailViewProps {
  partId: string;
}

export const PartDetailView: React.FC<PartDetailViewProps> = ({ partId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setHeaderActions, setCustomBack } = useAdmin();

  // Mode: 'overview' (Image 1) | 'units' (Image 2)
  const isUnitsQuery = searchParams.get('view') === 'units';
  const initialLoc = searchParams.get('loc') || 'Ikeja';

  const [viewMode, setViewMode] = useState<'overview' | 'units'>(
    isUnitsQuery ? 'units' : 'overview'
  );
  const [selectedLocation, setSelectedLocation] = useState(initialLoc);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDiscontinued, setIsDiscontinued] = useState(false);

  // Table action dropdown state (row id)
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Datasets
  const existingPart = initialBoxParts.find((p) => p.id === partId) || initialBoxParts[0];
  const [partLocations, setPartLocations] = useState<PartStockLocationItem[]>(initialPartStockLocations);
  const [partUnits, setPartUnits] = useState<PartUnitItem[]>(initialPartUnits);

  // Modals state
  const [showOverviewFilterModal, setShowOverviewFilterModal] = useState(false);
  const [showUnitsFilterModal, setShowUnitsFilterModal] = useState(false);
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [updateStockQty, setUpdateStockQty] = useState('7935');

  // Filter criteria
  const [overviewFilters, setOverviewFilters] = useState<{ status: string[]; location: string[] }>({
    status: ['All'],
    location: ['All'],
  });
  const [unitsFilters, setUnitsFilters] = useState<{ status: string[]; duration: string }>({
    status: ['All'],
    duration: 'Today',
  });

  // Active toast
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Theme styling tokens matching Rule 6
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const innerCardBg = isLightMode ? '#F9FAFB' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Synchronize view mode with URL search param
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'units') {
      setViewMode('units');
    } else {
      setViewMode('overview');
    }
    if (searchParams.get('loc')) {
      setSelectedLocation(searchParams.get('loc')!);
    }
  }, [searchParams]);

  // Configure Top Header Actions matching Image 1 & Image 2
  useEffect(() => {
    if (viewMode === 'overview') {
      // Image 1: Top Action button with Edit and Discontinue (with toggle)
      setHeaderActions([
        {
          label: 'Edit',
          onClick: () => {
            router.push(`/inventory/parts/${partId}/edit`);
          },
        },
        {
          label: 'Discontinue',
          hasToggle: true,
          isToggled: isDiscontinued,
          onClick: () => {
            setIsDiscontinued((prev) => {
              const next = !prev;
              setActiveToast({
                type: next ? 'disable' : 'success',
                title: next ? 'Part Discontinued' : 'Part Activated',
                message: next
                  ? 'Part marked as discontinued'
                  : 'Part restored to active status',
              });
              return next;
            });
          },
        },
      ]);
      setCustomBack(() => () => {
        router.push('/inventory/parts');
      });
    } else {
      // Image 2: Top Action button with Update stock and Stock threshold
      setHeaderActions([
        {
          label: 'Update stock',
          onClick: () => {
            router.push(
              `/inventory/parts/${partId}?view=update-stock&loc=${encodeURIComponent(
                selectedLocation
              )}`
            );
          },
        },
        {
          label: 'Stock threshold',
          onClick: () => {
            setShowThresholdModal(true);
          },
        },
      ]);
      setCustomBack(() => () => {
        setViewMode('overview');
        router.push(`/inventory/parts/${partId}`);
      });
    }

    return () => {
      setHeaderActions([]);
      setCustomBack(null);
    };
  }, [viewMode, isDiscontinued, partId, router, setHeaderActions, setCustomBack]);

  // Handle Mark as Faulty toggle (Image 2)
  const handleToggleFaulty = (unitId: string) => {
    setPartUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          const willBeFaulty = !u.isFaulty;
          setActiveToast({
            type: willBeFaulty ? 'flag' : 'success',
            title: willBeFaulty ? 'Marked as Faulty' : 'Fault Cleared',
            message: willBeFaulty
              ? `You successfully marked ${u.itemId} as faulty`
              : `Fault status cleared for ${u.itemId}`,
          });
          return {
            ...u,
            isFaulty: willBeFaulty,
            status: willBeFaulty ? 'Faulty' : 'Available',
          };
        }
        return u;
      })
    );
    setActiveActionRowId(null);
  };

  // Filtered Overview Locations (Image 1)
  const filteredLocations = partLocations.filter((loc) => {
    const matchesSearch = loc.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (!overviewFilters.status.includes('All')) {
      if (!overviewFilters.status.some((s) => s.toLowerCase() === loc.status.toLowerCase())) {
        return false;
      }
    }
    if (!overviewFilters.location.includes('All')) {
      if (!overviewFilters.location.some((l) => loc.location.toLowerCase().includes(l.toLowerCase()))) {
        return false;
      }
    }
    return true;
  });

  // Filtered Location Units (Image 2)
  const filteredUnits = partUnits.filter((u) => {
    const matchesSearch =
      u.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (!unitsFilters.status.includes('All')) {
      if (!unitsFilters.status.some((s) => s.toLowerCase() === u.status.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const activityHistory =
    viewMode === 'overview' ? partOverviewActivityHistory : partStockUnitsActivityHistory;

  const currentView = searchParams.get('view');
  if (currentView === 'unit-detail') {
    return <PartUnitDetailView partId={partId} />;
  }
  if (currentView === 'edit-stock') {
    return <EditPartStockView partId={partId} />;
  }
  if (currentView === 'update-stock') {
    return <UpdatePartStockView partId={partId} />;
  }

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
      {/* LEFT MAIN CONTENT COLUMN */}
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
        {/* ======================================================== */}
        {/* TOP METADATA CARD (Matching Image 1 & Image 2)            */}
        {/* ======================================================== */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Part Thumbnail with 3 Carousel Dots underneath */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '12px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: `1px solid ${borderColor}`,
              }}
            >
              <img
                src={existingPart.image || '/image/box1.png'}
                alt={existingPart.name}
                style={{ width: '64px', height: '64px', objectFit: 'contain' }}
              />
            </div>
            {/* 3 indicator dots matching screenshot `--.` */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: '12px',
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: isLightMode ? '#D1D5DB' : '#52525B',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '3px',
                  borderRadius: '2px',
                  backgroundColor: isLightMode ? '#D1D5DB' : '#52525B',
                }}
              />
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: isLightMode ? '#9CA3AF' : '#A1A1AA',
                }}
              />
            </div>
          </div>

          {/* Part Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {/* Title + Pill status badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: textColor }}>
                {viewMode === 'overview' ? 'Part name' : 'Name of part'}
              </h2>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: isDiscontinued ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: isDiscontinued ? '#EF4444' : '#10B981',
                }}
              >
                {isDiscontinued ? 'Discontinued' : viewMode === 'overview' ? 'Active' : 'Available'}
              </span>
            </div>

            {/* Metadata row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '13px' }}>
              <div>
                <span style={{ color: subtextColor }}>SKU </span>
                <span style={{ color: textColor, fontWeight: 600 }}>{existingPart.sku}</span>
              </div>
              <div>
                <span style={{ color: subtextColor }}>Category </span>
                <span style={{ color: textColor, fontWeight: 600 }}>{existingPart.category}</span>
              </div>
              {viewMode === 'units' && (
                <div>
                  <span style={{ color: subtextColor }}>Location </span>
                  <span style={{ color: textColor, fontWeight: 600 }}>{selectedLocation}</span>
                </div>
              )}
              <div>
                <span style={{ color: subtextColor }}>Last updated </span>
                <span style={{ color: textColor, fontWeight: 600 }}>Aug 02, 2024 | 11:56 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Header Row: Tab "All Stock" + Search Bar + Filter Button (Standalone on page) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '4px',
            marginBottom: '4px',
          }}
        >
            {/* Tab: All Stock */}
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
                All Stock
              </span>
            </div>

            {/* Search Input & Filter Button */}
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
                onClick={() => {
                  if (viewMode === 'overview') setShowOverviewFilterModal(true);
                  else setShowUnitsFilterModal(true);
                }}
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

          {/* 4 Stat Cards Row */}
          {viewMode === 'overview' ? (
            /* Mode 1 Stat Cards matching Image 1 */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Total locations</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7</div>
              </div>

              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Available Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7,935</div>
              </div>

              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Installed Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>94</div>
              </div>

              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Faulty Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
              </div>
            </div>
          ) : (
            /* Mode 2 Stat Cards matching Image 2 */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Available Amount</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>₦ 7,935,000</div>
              </div>

              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Available Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7,935</div>
              </div>

              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Installed Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>94</div>
              </div>

              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '12px',
                  border: `1px solid ${borderColor}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor }}>Faulty Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
              </div>
            </div>
          )}

        {/* 3. Table Container Card (In its own separate cardBg container matching Image 4) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflow: 'visible',
          }}
        >
            {viewMode === 'overview' ? (
              /* ======================================================== */
              /* TABLE 1: STOCK BY LOCATION (Matching Image 1)            */
              /* ======================================================== */
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
                      <th style={{ padding: '12px 16px' }}>Location</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px' }}>No. Available</th>
                      <th style={{ padding: '12px 16px' }}>No. Installed</th>
                      <th style={{ padding: '12px 16px' }}>No. Faulty</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLocations.map((row) => (
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
                        <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                          {row.location}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span
                            style={{
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              backgroundColor:
                                row.status === 'Available'
                                  ? 'rgba(16, 185, 129, 0.15)'
                                  : row.status === 'Low stock'
                                  ? 'rgba(245, 158, 11, 0.15)'
                                  : 'rgba(239, 68, 68, 0.15)',
                              color:
                                row.status === 'Available'
                                  ? '#10B981'
                                  : row.status === 'Low stock'
                                  ? '#F59E0B'
                                  : '#EF4444',
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                          {row.noAvailable.toLocaleString()}
                        </td>
                        <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                          {row.noInstalled.toLocaleString()}
                        </td>
                        <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>
                          {row.noFaulty}
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedLocation(row.location.split(',')[1]?.trim() || row.location);
                              setViewMode('units');
                              router.push(
                                `/inventory/parts/${partId}?view=units&loc=${encodeURIComponent(
                                  row.location.split(',')[1]?.trim() || row.location
                                )}`
                              );
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: yellowColor,
                              fontWeight: 600,
                              fontSize: '13px',
                              cursor: 'pointer',
                              padding: '4px 8px',
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* ======================================================== */
              /* TABLE 2: UNITS IN LOCATION (Matching Image 2)            */
              /* ======================================================== */
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
                      <th style={{ padding: '12px 14px' }}>Item ID</th>
                      <th style={{ padding: '12px 14px' }}>Serial Number</th>
                      <th style={{ padding: '12px 14px' }}>Supplier</th>
                      <th style={{ padding: '12px 14px' }}>Price bought</th>
                      <th style={{ padding: '12px 14px' }}>Status</th>
                      <th style={{ padding: '12px 14px' }}>Added by</th>
                      <th style={{ padding: '12px 14px' }}>Linked by</th>
                      <th style={{ padding: '12px 14px' }}>Linked unit</th>
                      <th style={{ padding: '12px 14px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUnits.map((row) => (
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
                        <td style={{ padding: '14px 14px', color: textColor, fontWeight: 500 }}>
                          {row.itemId}
                        </td>
                        <td style={{ padding: '14px 14px', color: textColor, fontWeight: 500 }}>
                          {row.serialNumber}
                        </td>
                        <td style={{ padding: '14px 14px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: textColor, fontWeight: 600 }}>{row.supplierName}</span>
                            <span style={{ color: subtextColor, fontSize: '11px' }}>{row.supplierEmail}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 14px', color: textColor, fontWeight: 500 }}>
                          {row.priceBought}
                        </td>
                        <td style={{ padding: '14px 14px' }}>
                          <span
                            style={{
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              backgroundColor:
                                row.status === 'Available'
                                  ? 'rgba(16, 185, 129, 0.15)'
                                  : row.status === 'Faulty'
                                  ? 'rgba(239, 68, 68, 0.15)'
                                  : 'rgba(168, 85, 247, 0.15)',
                              color:
                                row.status === 'Available'
                                  ? '#10B981'
                                  : row.status === 'Faulty'
                                  ? '#EF4444'
                                  : '#A855F7',
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 14px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: textColor, fontWeight: 600 }}>{row.addedBy.name}</span>
                            <span style={{ color: subtextColor, fontSize: '11px' }}>{row.addedBy.timestamp}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 14px' }}>
                          {row.linkedBy ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ color: textColor, fontWeight: 600 }}>{row.linkedBy.name}</span>
                              <span style={{ color: subtextColor, fontSize: '11px' }}>{row.linkedBy.timestamp}</span>
                            </div>
                          ) : (
                            <span style={{ color: subtextColor }}>-</span>
                          )}
                        </td>
                        <td style={{ padding: '14px 14px' }}>
                          {row.linkedUnit ? (
                            <span style={{ color: '#A855F7', fontWeight: 500 }}>{row.linkedUnit}</span>
                          ) : (
                            <span style={{ color: subtextColor }}>-</span>
                          )}
                        </td>

                        {/* Action 3-dots */}
                        <td style={{ padding: '14px 14px', textAlign: 'right', position: 'relative' }}>
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

                          {/* 3-dots dropdown matching Image 2: view, edit, mark as faulty (toggle), out of stock (incognito) */}
                          {activeActionRowId === row.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'absolute',
                                right: '14px',
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
                              {/* 1. View */}
                              <div
                                onClick={() => {
                                  setActiveActionRowId(null);
                                  router.push(
                                    `/inventory/parts/${partId}?view=unit-detail&unitId=${encodeURIComponent(
                                      row.itemId
                                    )}&loc=${encodeURIComponent(selectedLocation)}`
                                  );
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

                              {/* 2. Edit */}
                              <div
                                onClick={() => {
                                  setActiveActionRowId(null);
                                  router.push(
                                    `/inventory/parts/${partId}?view=edit-stock&unitId=${encodeURIComponent(
                                      row.itemId
                                    )}&loc=${encodeURIComponent(selectedLocation)}`
                                  );
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

                              {/* 3. Mark as faulty (with interactive on/off toggle) */}
                              <div
                                onClick={() => handleToggleFaulty(row.id)}
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
                                <span>Mark as faulty</span>
                                <div
                                  style={{
                                    width: '28px',
                                    height: '16px',
                                    borderRadius: '999px',
                                    backgroundColor: row.isFaulty
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
                                      backgroundColor: row.isFaulty ? '#000000' : '#FFFFFF',
                                      position: 'absolute',
                                      top: '2px',
                                      left: row.isFaulty ? '14px' : '2px',
                                      transition: 'left 0.2s',
                                    }}
                                  />
                                </div>
                              </div>

                              {/* 4. Out of stock (incognito - dim and not bright) */}
                              <div
                                style={{
                                  padding: '8px 10px',
                                  fontSize: '12px',
                                  color: '#52525B',
                                  opacity: 0.6,
                                  cursor: 'not-allowed',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}
                              >
                                <span>Out of stock</span>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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

      {/* RIGHT SIDEBAR: ACTIVITY HISTORY (Matching Image 1 & Image 2) */}
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
          {activityHistory.map((act) => (
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

      {/* OVERVIEW FILTER MODAL (IMAGE 1) */}
      <PartOverviewFilterModal
        isOpen={showOverviewFilterModal}
        onClose={() => setShowOverviewFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setOverviewFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Locations filtered successfully',
          });
        }}
      />

      {/* UNITS FILTER MODAL (IMAGE 2) */}
      <PartStockUnitsFilterModal
        isOpen={showUnitsFilterModal}
        onClose={() => setShowUnitsFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setUnitsFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Stock units filtered successfully',
          });
        }}
      />

      {/* STOCK THRESHOLD MODAL (IMAGE 2) */}
      <StockThresholdModal
        isOpen={showThresholdModal}
        onClose={() => setShowThresholdModal(false)}
        isLightMode={isLightMode}
        onSave={(threshold) => {
          setActiveToast({
            type: 'success',
            title: 'Threshold Updated',
            message: `Stock threshold updated to ${threshold} units`,
          });
        }}
      />

      {/* UPDATE STOCK MODAL (IMAGE 2) */}
      {showUpdateStockModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowUpdateStockModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '380px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
                Update stock
              </h3>
              <button
                type="button"
                onClick={() => setShowUpdateStockModal(false)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <X size={14} />
              </button>
            </div>

            <div>
              <span style={{ fontSize: '12px', color: subtextColor }}>Part:</span>
              <div style={{ fontSize: '14px', fontWeight: 600, color: textColor, marginTop: '2px' }}>
                {existingPart.name} ({existingPart.sku})
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                Available quantity
              </label>
              <input
                type="number"
                value={updateStockQty}
                onChange={(e) => setUpdateStockQty(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: innerCardBg,
                  border: `1px solid ${yellowColor}`,
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowUpdateStockModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#E5E7EB',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUpdateStockModal(false);
                  setActiveToast({
                    type: 'success',
                    title: 'Stock Updated',
                    message: `Stock for ${existingPart.name} updated to ${updateStockQty}`,
                  });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>Save</span>
                <Box2BoxPulsingBadge size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

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
