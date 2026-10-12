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
  UserPlus,
  RotateCcw,
  X,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialModelLocationsBreakdown,
  initialAccessoryUnits,
  accessoryOverviewActivityHistory,
  accessoryUnitsActivityHistory,
  ModelLocationBreakdownItem,
  AccessoryUnitItem,
} from '@/lib/inventoryMockData';
import { AccessoryUnitFilterModal } from './AccessoryUnitFilterModal';
import { AssignOrderModal } from '@/components/inventory/boxes/AssignOrderModal';
import { ReturnToStockModal } from '@/components/inventory/boxes/ReturnToStockModal';
import { StockThresholdModal } from '@/components/inventory/boxes/StockThresholdModal';
import { StockUpdatedModal } from '@/components/inventory/boxes/StockUpdatedModal';
import { UpdateAccessoryStockView } from './UpdateAccessoryStockView';
import { UpdateUnitView } from './UpdateUnitView';
import { AccessoryUnitDetailView } from './AccessoryUnitDetailView';
import { EditAccessoryStockView } from './EditAccessoryStockView';

interface AccessoryDetailViewProps {
  accessoryId: string;
}

export const AccessoryDetailView: React.FC<AccessoryDetailViewProps> = ({ accessoryId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setHeaderActions, setCustomBack } = useAdmin();

  // Mode: 'overview' | 'units' | 'update-stock' | 'unit-detail' | 'update-unit' | 'edit-stock'
  const isUnitsQuery = searchParams.get('view') === 'units';
  const isUpdateStockQuery = searchParams.get('view') === 'update-stock';
  const isUnitDetailQuery = searchParams.get('view') === 'unit-detail';
  const isUpdateUnitQuery = searchParams.get('view') === 'update-unit';
  const isEditStockQuery = searchParams.get('view') === 'edit-stock';
  const initialLoc = searchParams.get('loc') || 'Ikeja';

  const [viewMode, setViewMode] = useState<
    'overview' | 'units' | 'update-stock' | 'unit-detail' | 'update-unit' | 'edit-stock'
  >(
    isUpdateStockQuery
      ? 'update-stock'
      : isUnitDetailQuery
      ? 'unit-detail'
      : isUpdateUnitQuery
      ? 'update-unit'
      : isEditStockQuery
      ? 'edit-stock'
      : isUnitsQuery
      ? 'units'
      : 'overview'
  );
  const [selectedLocation, setSelectedLocation] = useState(initialLoc);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDiscontinued, setIsDiscontinued] = useState(false);

  // Table action dropdown state
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Datasets
  const [locations] = useState<ModelLocationBreakdownItem[]>(initialModelLocationsBreakdown);
  const [units, setUnits] = useState<AccessoryUnitItem[]>(initialAccessoryUnits);

  // Modals state
  const [showUnitFilterModal, setShowUnitFilterModal] = useState(false);
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [updateStockQty, setUpdateStockQty] = useState('7935');
  const [assignModalUnit, setAssignModalUnit] = useState<AccessoryUnitItem | null>(null);
  const [returnModalUnit, setReturnModalUnit] = useState<AccessoryUnitItem | null>(null);
  const [showStockUpdatedModal, setShowStockUpdatedModal] = useState(false);

  // Applied unit filters
  const [unitFilters, setUnitFilters] = useState<{
    status: string[];
    duration: string[];
  }>({
    status: ['All'],
    duration: ['All'],
  });

  // Active toast
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

  // Synchronize view mode with URL search param
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'update-stock') {
      setViewMode('update-stock');
    } else if (viewParam === 'units') {
      setViewMode('units');
    } else if (viewParam === 'unit-detail') {
      setViewMode('unit-detail');
    } else if (viewParam === 'update-unit') {
      setViewMode('update-unit');
    } else if (viewParam === 'edit-stock') {
      setViewMode('edit-stock');
    } else {
      setViewMode('overview');
    }
    if (searchParams.get('loc')) {
      setSelectedLocation(searchParams.get('loc')!);
    }
  }, [searchParams]);

  // Configure Top Header Actions matching Image 4 & Image 5
  useEffect(() => {
    if (viewMode === 'update-stock') {
      setHeaderActions([]);
      setCustomBack(() => () => {
        setViewMode('units');
        router.push(
          `/inventory/accessories/${accessoryId}?view=units&loc=${encodeURIComponent(
            selectedLocation
          )}`
        );
      });
    } else if (viewMode === 'overview') {
      // Image 4: Top Action button with Edit and Discontinue (with toggle)
      setHeaderActions([
        {
          label: 'Edit',
          onClick: () => {
            router.push(`/inventory/accessories/${accessoryId}/edit`);
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
                title: next ? 'Accessory Discontinued' : 'Accessory Activated',
                message: next
                  ? 'Accessory marked as discontinued'
                  : 'Accessory restored to active status',
              });
              return next;
            });
          },
        },
      ]);
      setCustomBack(() => () => {
        router.push('/inventory/accessories');
      });
    } else {
      // Image 5: Top Action button with Update stock and Stock threshold
      setHeaderActions([
        {
          label: 'Update stock',
          onClick: () => {
            router.push(
              `/inventory/accessories/${accessoryId}?view=update-stock&loc=${encodeURIComponent(
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
        router.push(`/inventory/accessories/${accessoryId}`);
      });
    }

    return () => {
      setHeaderActions([]);
      setCustomBack(null);
    };
  }, [viewMode, isDiscontinued, accessoryId, selectedLocation, setHeaderActions, setCustomBack, router]);

  // Handle Mark as Faulty toggle (Image 5)
  const handleToggleFaulty = (unitId: string) => {
    setUnits((prev) =>
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
            status: willBeFaulty ? 'Faulty' : 'Available',
            isFaulty: willBeFaulty,
          };
        }
        return u;
      })
    );
    setActiveActionRowId(null);
  };

  // Filtered Locations (Overview Mode - Image 4)
  const filteredLocations = locations.filter((loc) =>
    loc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Units (Units Mode - Image 5)
  const filteredUnits = units.filter((u) => {
    const matchesSearch =
      u.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.linkedUnit.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (!unitFilters.status.includes('All')) {
      const matchStat = unitFilters.status.some(
        (st) => st.toLowerCase() === u.status.toLowerCase()
      );
      if (!matchStat) return false;
    }

    return true;
  });

  if (viewMode === 'update-stock') {
    return <UpdateAccessoryStockView accessoryId={accessoryId} />;
  }

  if (viewMode === 'update-unit') {
    return (
      <UpdateUnitView
        accessoryId={accessoryId}
        unitId={searchParams.get('unitId') || undefined}
      />
    );
  }

  if (viewMode === 'unit-detail') {
    return (
      <AccessoryUnitDetailView
        accessoryId={accessoryId}
        unitId={searchParams.get('unitId') || undefined}
      />
    );
  }

  if (viewMode === 'edit-stock') {
    return (
      <EditAccessoryStockView
        accessoryId={accessoryId}
        unitId={searchParams.get('unitId') || undefined}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '30px',
      }}
      onClick={() => {
        if (activeActionRowId) setActiveActionRowId(null);
      }}
    >
      {/* Left Main Content Column with 28px padding before Activity History divider */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          paddingRight: '28px',
        }}
      >
        {/* ========================================================================= */}
        {/* MODE 1: ACCESSORY OVERVIEW (Matching Image 4)                             */}
        {/* ========================================================================= */}
        {viewMode === 'overview' && (
          <>
            {/* Top Card: Accessory Details Card matching Image 4 */}
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: '16px',
                border: `1px solid ${borderColor}`,
                padding: '24px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
              }}
            >
              {/* Cabinet Image with 3 Carousel Dots */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '12px',
                    backgroundColor: isLightMode ? '#F3F4F6' : '#1A1A1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/image/box1.png"
                    alt="Accessory"
                    style={{ width: '76px', height: '76px', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#4B5563' }} />
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#4B5563' }} />
                </div>
              </div>

              {/* Accessory Metadata */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: 0 }}>
                    Accessory name
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
                    {isDiscontinued ? 'Discontinued' : 'Active'}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    fontSize: '12px',
                    color: subtextColor,
                    marginBottom: '14px',
                  }}
                >
                  <span>
                    SKU <strong style={{ color: textColor }}>MBX-789012</strong>
                  </span>
                  <span>
                    Category <strong style={{ color: textColor }}>Main module</strong>
                  </span>
                  <span>
                    Amount <strong style={{ color: textColor }}>₦150,000</strong>
                  </span>
                  <span>
                    Last updated <strong style={{ color: textColor }}>Aug 02, 2024 | 11:56 AM</strong>
                  </span>
                </div>

                {/* Specifications Block: Stacked neatly */}
                <div style={{ fontSize: '12px', color: subtextColor }}>
                  <div style={{ fontWeight: 600, color: subtextColor, marginBottom: '2px' }}>
                    Specifications
                  </div>
                  <span style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer' }}>
                    More data about box
                  </span>
                </div>
              </div>
            </div>

            {/* Double-Border Section: Outer Container (Border 1) */}
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
              {/* Header: All Stock tab + Search + Filter */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, color: yellowColor }}>
                  All Stock
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
                        backgroundColor: inputBg,
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

                  <button
                    type="button"
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

              {/* 6 Stat Cards Grid matching Image 4 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Total locations</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Available Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7,935</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Installed Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>94</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Sold Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>90</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Assigned Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Faulty Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
                </div>
              </div>

              {/* Inner Table Container (Border 2) holding Locations Table */}
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
                        <th style={{ padding: '14px 18px' }}>Location</th>
                        <th style={{ padding: '14px 14px' }}>Status</th>
                        <th style={{ padding: '14px 14px' }}>No. Available</th>
                        <th style={{ padding: '14px 14px' }}>No. Assigned</th>
                        <th style={{ padding: '14px 14px' }}>No. Installed</th>
                        <th style={{ padding: '14px 14px' }}>No. Sold</th>
                        <th style={{ padding: '14px 14px' }}>No. Faulty</th>
                        <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLocations.map((row) => {
                        const statusColor =
                          row.status === 'Available'
                            ? '#10B981'
                            : row.status === 'Low stock'
                            ? '#F59E0B'
                            : '#EF4444';

                        const statusBg =
                          row.status === 'Available'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : row.status === 'Low stock'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)';

                        return (
                          <tr
                            key={row.id}
                            style={{
                              borderBottom: `1px solid ${borderColor}`,
                              fontSize: '13px',
                              color: textColor,
                            }}
                          >
                            <td style={{ padding: '14px 18px', fontWeight: 500 }}>
                              {row.location}
                            </td>

                            <td style={{ padding: '14px 14px' }}>
                              <span
                                style={{
                                  padding: '4px 12px',
                                  borderRadius: '12px',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  backgroundColor: statusBg,
                                  color: statusColor,
                                }}
                              >
                                {row.status}
                              </span>
                            </td>

                            <td style={{ padding: '14px 14px' }}>{row.noAvailable}</td>
                            <td style={{ padding: '14px 14px' }}>{row.noAssigned}</td>
                            <td style={{ padding: '14px 14px' }}>{row.noDeployed.toLocaleString()}</td>
                            <td style={{ padding: '14px 14px' }}>{row.noSold.toLocaleString()}</td>
                            <td style={{ padding: '14px 14px' }}>{row.noFaulty}</td>

                            {/* Action: Single yellow "View" button matching Image 4 */}
                            <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedLocation(row.location);
                                  setViewMode('units');
                                  router.push(
                                    `/inventory/accessories/${accessoryId}?view=units&loc=${encodeURIComponent(
                                      row.location
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
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
          </>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: ACCESSORY LOCATION / UNITS DETAIL (Matching Image 5)              */}
        {/* ========================================================================= */}
        {viewMode === 'units' && (
          <>
            {/* Top Card: Accessory Location Details Card matching Image 5 */}
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: '16px',
                border: `1px solid ${borderColor}`,
                padding: '24px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
              }}
            >
              {/* Image with 3 Carousel Dots */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '12px',
                    backgroundColor: isLightMode ? '#F3F4F6' : '#1A1A1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/image/box1.png"
                    alt="Accessory"
                    style={{ width: '76px', height: '76px', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#4B5563' }} />
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#4B5563' }} />
                </div>
              </div>

              {/* Accessory Metadata */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: 0 }}>
                    Name of accessory
                  </h2>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                    }}
                  >
                    Available
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    fontSize: '12px',
                    color: subtextColor,
                    marginBottom: '8px',
                  }}
                >
                  <span>
                    SKU <strong style={{ color: textColor }}>MBX-789012</strong>
                  </span>
                  <span>
                    Category <strong style={{ color: textColor }}>Main module</strong>
                  </span>
                  <span>
                    Linked model <strong style={{ color: textColor }}>MyBox-Standard</strong>
                  </span>
                  <span>
                    Location <strong style={{ color: textColor }}>{selectedLocation}</strong>
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '14px' }}>
                  Last updated <strong style={{ color: textColor }}>Aug 02, 2024 | 11:56 AM</strong>
                </div>

                {/* Specifications Block: Stacked neatly */}
                <div style={{ fontSize: '12px', color: subtextColor }}>
                  <div style={{ fontWeight: 600, color: subtextColor, marginBottom: '2px' }}>
                    Specifications
                  </div>
                  <span style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer' }}>
                    More data about accessory
                  </span>
                </div>
              </div>
            </div>

            {/* Double-Border Section: Outer Container (Border 1) */}
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
              {/* Header: All Stock tab + Search + Filter Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, color: yellowColor }}>
                  All Stock
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
                        backgroundColor: inputBg,
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

                  <button
                    type="button"
                    onClick={() => setShowUnitFilterModal(true)}
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

              {/* 5 Stat Cards Grid matching Image 5 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Available Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7,935</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Installed Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>94</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Sold Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>90</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Assigned Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
                </div>

                <div
                  style={{
                    backgroundColor: inputBg,
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: subtextColor }}>Faulty Quantity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
                </div>
              </div>

              {/* Inner Table Container (Border 2) holding Units Table */}
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
                        <th style={{ padding: '14px 18px' }}>Item ID</th>
                        <th style={{ padding: '14px 14px' }}>Status</th>
                        <th style={{ padding: '14px 14px' }}>Added by</th>
                        <th style={{ padding: '14px 14px' }}>Sold by</th>
                        <th style={{ padding: '14px 14px' }}>Order ID</th>
                        <th style={{ padding: '14px 14px' }}>Linked unit</th>
                        <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUnits.map((row, index) => {
                        const isActionOpen = activeActionRowId === row.id;
                        const isNearBottom = index >= filteredUnits.length - 2;

                        const statusBg =
                          row.status === 'Available'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : row.status === 'Installed'
                            ? 'rgba(139, 92, 246, 0.15)'
                            : row.status === 'Sold'
                            ? 'rgba(217, 119, 6, 0.15)'
                            : row.status === 'Assigned'
                            ? 'rgba(59, 130, 246, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)';

                        const statusColor =
                          row.status === 'Available'
                            ? '#10B981'
                            : row.status === 'Installed'
                            ? '#8B5CF6'
                            : row.status === 'Sold'
                            ? '#D97706'
                            : row.status === 'Assigned'
                            ? '#3B82F6'
                            : '#EF4444';

                        return (
                          <tr
                            key={row.id}
                            style={{
                              borderBottom: `1px solid ${borderColor}`,
                              fontSize: '13px',
                              color: textColor,
                            }}
                          >
                            <td style={{ padding: '14px 18px', fontWeight: 600 }}>
                              {row.itemId}
                            </td>

                            <td style={{ padding: '14px 14px' }}>
                              <span
                                style={{
                                  padding: '4px 12px',
                                  borderRadius: '12px',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  backgroundColor: statusBg,
                                  color: statusColor,
                                }}
                              >
                                {row.status}
                              </span>
                            </td>

                            <td style={{ padding: '14px 14px' }}>
                              <div style={{ fontWeight: 600, textDecoration: 'underline' }}>
                                {row.addedBy.name}
                              </div>
                              <div style={{ fontSize: '11px', color: subtextColor }}>
                                {row.addedBy.timestamp}
                              </div>
                            </td>

                            <td style={{ padding: '14px 14px' }}>
                              {row.soldBy ? (
                                <>
                                  <div style={{ fontWeight: 600, textDecoration: 'underline' }}>
                                    {row.soldBy.name}
                                  </div>
                                  <div style={{ fontSize: '11px', color: subtextColor }}>
                                    {row.soldBy.timestamp}
                                  </div>
                                </>
                              ) : (
                                <span style={{ color: subtextColor }}>-</span>
                              )}
                            </td>

                            <td style={{ padding: '14px 14px' }}>
                              {row.orderId ? (
                                <span style={{ fontWeight: 600, textDecoration: 'underline' }}>
                                  {row.orderId}
                                </span>
                              ) : (
                                <span style={{ color: subtextColor }}>-</span>
                              )}
                            </td>

                            <td style={{ padding: '14px 14px', color: textColor, fontWeight: 500 }}>
                              {row.linkedUnit}
                            </td>

                            {/* Action column with 3 dots dropdown matching Image 5 */}
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
                                      router.push(
                                        `/inventory/accessories/${accessoryId}?view=unit-detail&unitId=${encodeURIComponent(
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
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                  >
                                    <Eye size={14} color={subtextColor} />
                                    <span>View</span>
                                  </div>

                                  {/* Edit */}
                                  <div
                                    onClick={() => {
                                      setActiveActionRowId(null);
                                      router.push(
                                        `/inventory/accessories/${accessoryId}?view=update-unit&unitId=${encodeURIComponent(
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
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                  >
                                    <Edit size={14} color={subtextColor} />
                                    <span>Edit</span>
                                  </div>

                                  {/* Assign to order */}
                                  <div
                                    onClick={() => {
                                      setActiveActionRowId(null);
                                      setAssignModalUnit(row);
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
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                  >
                                    <UserPlus size={14} color={subtextColor} />
                                    <span>Assign to order</span>
                                  </div>

                                  {/* Mark as faulty with toggle switch */}
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
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                  >
                                    <span>Mark as faulty</span>
                                    <div
                                      style={{
                                        width: '28px',
                                        height: '16px',
                                        borderRadius: '10px',
                                        backgroundColor: row.isFaulty ? '#EF4444' : isLightMode ? '#E5E7EB' : '#3F3F46',
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
                                          left: row.isFaulty ? '14px' : '2px',
                                          transition: 'left 0.2s',
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Return to stock */}
                                  <div
                                    onClick={() => {
                                      setActiveActionRowId(null);
                                      setReturnModalUnit(row);
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
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                  >
                                    <RotateCcw size={14} color={subtextColor} />
                                    <span>Return to stock</span>
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

                {/* Pagination */}
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
          </>
        )}
      </div>

      {/* Right-Hand Sidebar: Activity History matching Image 4 & Image 5 */}
      <div
        style={{
          width: '320px',
          borderLeft: `1px solid ${borderColor}`,
          padding: '0 0 0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>
          Activity history
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {(viewMode === 'overview'
            ? accessoryOverviewActivityHistory
            : accessoryUnitsActivityHistory
          ).map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                <span style={{ fontWeight: 600 }}>{item.role}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#71717A' }}>
                {item.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Modal for Units View (2 Tabs: Status & Duration) matching Image 5 */}
      <AccessoryUnitFilterModal
        isOpen={showUnitFilterModal}
        onClose={() => setShowUnitFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setUnitFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Stock filters applied successfully',
          });
        }}
      />

      {/* Stock Threshold Modal (Shared component) */}
      <StockThresholdModal
        isOpen={showThresholdModal}
        onClose={() => setShowThresholdModal(false)}
        isLightMode={isLightMode}
        onSave={(val) => {
          setActiveToast({
            type: 'success',
            title: 'Stock threshold',
            message: `Stock threshold updated to ${val}`,
          });
        }}
      />

      {/* Update Stock Modal (From Image 5 header action) */}
      {showUpdateStockModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setShowUpdateStockModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '380px',
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>
                Update Stock
              </h3>
              <button
                onClick={() => setShowUpdateStockModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <p style={{ fontSize: '13px', color: subtextColor, margin: '0 0 12px 0' }}>
                Update available stock quantity for <strong style={{ color: textColor }}>{selectedLocation}</strong>
              </p>
              <label style={{ fontSize: '12px', color: subtextColor, display: 'block', marginBottom: '6px' }}>
                Available Quantity
              </label>
              <input
                type="number"
                value={updateStockQty}
                onChange={(e) => setUpdateStockQty(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  backgroundColor: inputBg,
                  border: `1px solid ${yellowColor}`,
                  borderRadius: '8px',
                  padding: '0 12px',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 600,
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setShowUpdateStockModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUpdateStockModal(false);
                  setActiveToast({
                    type: 'success',
                    title: 'Stock Updated',
                    message: `Stock for ${selectedLocation} updated to ${updateStockQty}`,
                  });
                }}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign to Order Modal (Shared component) */}
      <AssignOrderModal
        isOpen={!!assignModalUnit}
        onClose={() => setAssignModalUnit(null)}
        isLightMode={isLightMode}
        boxId={assignModalUnit?.itemId}
        onAssignOrder={(orderId) => {
          if (assignModalUnit) {
            setUnits((prev) =>
              prev.map((u) => {
                if (u.id === assignModalUnit.id) {
                  return {
                    ...u,
                    status: 'Assigned',
                    orderId: orderId,
                  };
                }
                return u;
              })
            );
            setActiveToast({
              type: 'success',
              title: 'Order assigned',
              message: `Item ${assignModalUnit.itemId} assigned to order ${orderId}`,
            });
            setAssignModalUnit(null);
          }
        }}
      />

      {/* Return to Stock Modal (Shared component) */}
      <ReturnToStockModal
        isOpen={!!returnModalUnit}
        onClose={() => setReturnModalUnit(null)}
        isLightMode={isLightMode}
        boxId={returnModalUnit?.itemId}
        onConfirmReturn={() => {
          if (returnModalUnit) {
            setUnits((prev) =>
              prev.map((u) => {
                if (u.id === returnModalUnit.id) {
                  return {
                    ...u,
                    status: 'Available',
                    orderId: undefined,
                    soldBy: undefined,
                  };
                }
                return u;
              })
            );
            setReturnModalUnit(null);
            setShowStockUpdatedModal(true);
          }
        }}
      />

      {/* Stock Updated Modal (Shared confirmation) */}
      <StockUpdatedModal
        isOpen={showStockUpdatedModal}
        onClose={() => setShowStockUpdatedModal(false)}
        isLightMode={isLightMode}
        message="Item returned to stock successfully"
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
