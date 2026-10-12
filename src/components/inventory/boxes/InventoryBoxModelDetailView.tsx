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
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialStockUnits,
  modelActivityHistory,
  modelOverviewActivityHistory,
  initialModelLocationsBreakdown,
  BoxStockUnit,
  ModelLocationBreakdownItem,
} from '@/lib/inventoryMockData';
import { StockThresholdModal } from './StockThresholdModal';
import { InventoryModelStockFilterModal } from './InventoryModelStockFilterModal';
import { AssignOrderModal } from './AssignOrderModal';
import { ReturnToStockModal } from './ReturnToStockModal';
import { StockUpdatedModal } from './StockUpdatedModal';
import { UpdateModelStockView } from './UpdateModelStockView';

interface InventoryBoxModelDetailViewProps {
  modelId: string;
  initialViewMode?: 'overview' | 'units' | 'update_stock';
}

export const InventoryBoxModelDetailView: React.FC<InventoryBoxModelDetailViewProps> = ({
  modelId,
  initialViewMode,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setHeaderActions, setCustomBack } = useAdmin();

  // Mode: 'overview' (Image 5: Model Stock Across Locations), 'units' (Location Units Breakdown), or 'update_stock' (Image 3 Form)
  const queryView = searchParams.get('view');
  const computeInitialMode = (): 'overview' | 'units' | 'update_stock' => {
    if (initialViewMode) return initialViewMode;
    if (queryView === 'update-stock') return 'update_stock';
    if (queryView === 'units' || queryView === 'location') return 'units';
    return 'overview';
  };

  const [viewMode, setViewMode] = useState<'overview' | 'units' | 'update_stock'>(computeInitialMode);
  const [selectedLocation, setSelectedLocation] = useState<string>(
    searchParams.get('loc') || 'Ikeja'
  );

  // Sync mode from searchParams
  useEffect(() => {
    const qView = searchParams.get('view');
    if (qView === 'update-stock') {
      setViewMode('update_stock');
    } else if (qView === 'units' || qView === 'location') {
      setViewMode('units');
    } else if (!qView && !initialViewMode) {
      setViewMode('overview');
    }
    const qLoc = searchParams.get('loc');
    if (qLoc) setSelectedLocation(qLoc);
  }, [searchParams, initialViewMode]);

  // Model Discontinued State
  const [isDiscontinued, setIsDiscontinued] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showThresholdModal, setShowThresholdModal] = useState(false);

  // Modals for unit actions matching Image 5
  const [assignModalUnit, setAssignModalUnit] = useState<BoxStockUnit | null>(null);
  const [returnModalUnit, setReturnModalUnit] = useState<BoxStockUnit | null>(null);
  const [showStockUpdatedModal, setShowStockUpdatedModal] = useState(false);

  // Filter criteria for Overview (Image 5)
  const [overviewFilters, setOverviewFilters] = useState<{
    status: string[];
    location: string[];
  }>({
    status: ['All'],
    location: ['All'],
  });

  // Table action dropdown state for units table
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Datasets
  const [units, setUnits] = useState<BoxStockUnit[]>(initialStockUnits);
  const [locations, setLocations] = useState<ModelLocationBreakdownItem[]>(initialModelLocationsBreakdown);

  // Active toast
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Theme colors
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Toggle Discontinue in Overview Mode
  const handleToggleDiscontinue = () => {
    setIsDiscontinued((prev) => {
      const willDiscontinue = !prev;
      setActiveToast({
        type: willDiscontinue ? 'unavailable' : 'success',
        title: willDiscontinue ? 'Model discontinued' : 'Model reactivated',
        message: willDiscontinue
          ? 'You successfully discontinued MyBox-Standard'
          : 'You successfully reactivated MyBox-Standard',
      });
      return willDiscontinue;
    });
  };

  // Configure Header Actions depending on viewMode (Image 5 vs Location Units vs Update Stock)
  useEffect(() => {
    if (viewMode === 'update_stock') {
      setHeaderActions([]);
      setCustomBack(() => () => {
        setViewMode('units');
        router.push(`/inventory/boxes/${modelId}?view=units&loc=${encodeURIComponent(selectedLocation)}`);
      });
    } else if (viewMode === 'overview') {
      setHeaderActions([
        {
          label: 'Edit',
          onClick: () => {
            router.push(`/inventory/boxes/${modelId}/edit`);
          },
        },
        {
          label: 'Discontinue',
          hasToggle: true,
          isToggled: isDiscontinued,
          onClick: handleToggleDiscontinue,
        },
      ]);
      // When in overview, header back button navigates back to /inventory
      setCustomBack(null);
    } else {
      setHeaderActions([
        {
          label: 'Update stock',
          onClick: () => {
            setViewMode('update_stock');
            router.push(`/inventory/boxes/${modelId}?view=update-stock&loc=${encodeURIComponent(selectedLocation)}`);
          },
        },
        {
          label: 'Stock threshold',
          onClick: () => {
            setShowThresholdModal(true);
          },
        },
      ]);
      // When in units mode, header back button returns to overview mode
      setCustomBack(() => () => {
        setViewMode('overview');
        router.push(`/inventory/boxes/${modelId}`);
      });
    }

    return () => {
      setHeaderActions([]);
      setCustomBack(null);
    };
  }, [viewMode, isDiscontinued, modelId, selectedLocation, setHeaderActions, setCustomBack, router]);

  // Handle Mark as Faulty toggle (Units mode)
  const handleToggleFaulty = (unitId: string) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          const willBeFaulty = !u.isFaulty;
          setActiveToast({
            type: willBeFaulty ? 'flag' : 'success',
            title: willBeFaulty ? 'Marked as faulty' : 'Fault cleared',
            message: willBeFaulty
              ? `You successfully marked ${u.boxId} as faulty`
              : `Fault status cleared for ${u.boxId}`,
          });
          return {
            ...u,
            isFaulty: willBeFaulty,
          };
        }
        return u;
      })
    );
  };

  // Filtered Locations (Overview Mode - Image 5)
  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      loc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      overviewFilters.status.includes('All') ||
      overviewFilters.status.includes(loc.status);

    const matchesLocation =
      overviewFilters.location.includes('All') ||
      overviewFilters.location.some((fl) => loc.location.toLowerCase().includes(fl.toLowerCase()));

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Filtered Units (Units Mode)
  const filteredUnits = units.filter((u) =>
    u.boxId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If in update_stock view mode (Image 3 & 4), render UpdateModelStockView
  if (viewMode === 'update_stock') {
    return (
      <UpdateModelStockView
        modelId={modelId}
        locationName={selectedLocation}
        isLightMode={isLightMode}
        onBack={() => {
          setViewMode('units');
          router.push(`/inventory/boxes/${modelId}?view=units&loc=${encodeURIComponent(selectedLocation)}`);
        }}
        onStockAdded={(newUnit) => {
          setUnits((prev) => [
            {
              id: `unit-${Date.now()}`,
              boxId: newUnit.boxId,
              status: 'Available',
              addedBy: {
                name: 'Admin',
                timestamp: 'Just now',
              },
              isFaulty: false,
            },
            ...prev,
          ]);
        }}
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
      {/* Left Main Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          paddingRight: '28px',
        }}
      >
        {/* Optional Breadcrumb Banner when in Location Units mode */}
        {viewMode === 'units' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              fontSize: '13px',
              color: subtextColor,
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('overview')}
              style={{
                background: 'none',
                border: 'none',
                color: yellowColor,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: 0,
              }}
            >
              <ChevronLeft size={16} />
              <span>Back to model stock overview</span>
            </button>
            <span>/</span>
            <span>{selectedLocation}</span>
          </div>
        )}

        {/* 1. Box Model Header Card matching Image 5 (Overview) / Location Detail */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
          }}
        >
          {/* Cabinet Image with Carousel Dots */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '12px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#1A1A1E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="/image/closed cabinet.svg"
                alt="MyBox-Standard"
                style={{ width: '84px', height: '84px', objectFit: 'contain' }}
              />
            </div>
            {/* 3 carousel dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4B5563' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4B5563' }} />
            </div>
          </div>

          {/* Model Meta Information */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: 0 }}>
                MyBox-Standard
              </h2>
              {viewMode === 'units' && (
                <span style={{ fontSize: '13px', color: subtextColor }}>B-123456</span>
              )}
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor:
                    isDiscontinued
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(16, 185, 129, 0.15)',
                  color: isDiscontinued ? '#EF4444' : '#10B981',
                }}
              >
                {isDiscontinued ? 'Discontinued' : 'Active'}
              </span>
            </div>

            {/* Metadata Chips / Properties */}
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
                Material <strong style={{ color: textColor }}>Wood</strong>
              </span>
              <span>
                Cabinet <strong style={{ color: textColor }}>3</strong>
              </span>
              {viewMode === 'overview' ? (
                <span>
                  Amount <strong style={{ color: textColor }}>₦150,000</strong>
                </span>
              ) : (
                <span>
                  Location <strong style={{ color: textColor }}>{selectedLocation}</strong>
                </span>
              )}
              <span>
                Last updated <strong style={{ color: textColor }}>Aug 02, 2024 | 11:56 AM</strong>
              </span>
            </div>

            {/* Specifications Link */}
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

        {/* 2. Main Section Container (Border 1 separating from details) */}
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
          {/* Sub-tab bar: All Stock + Search & Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Active Tab */}
            <div style={{ fontSize: '14px', fontWeight: 700, color: yellowColor }}>
              All Stock
            </div>

          {/* Right Search Input & Filter Button */}
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
                  backgroundColor: cardBg,
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
              onClick={() => setShowFilterModal(true)}
              style={{
                backgroundColor: cardBg,
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

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: OVERVIEW MODE (Matching Image 5) */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'overview' && (
          <>
            {/* 6 Stat Cards Grid matching Image 5 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                gap: '12px',
                marginBottom: '26px',
              }}
            >
              {/* Card 1: Total locations */}
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Total locations</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7</div>
              </div>

              {/* Card 2: Available Quantity */}
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Available Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7,935</div>
              </div>

              {/* Card 3: Deployed Quantity */}
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Deployed Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>94</div>
              </div>

              {/* Card 4: Sold Quantity */}
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Sold Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>90</div>
              </div>

              {/* Card 5: Assigned Quantity */}
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Assigned Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
              </div>

              {/* Card 6: Faulty Quantity */}
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Faulty Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
              </div>
            </div>

            {/* Locations Table matching Image 5 */}
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: '14px',
                border: `1px solid ${borderColor}`,
                overflow: 'visible',
                marginBottom: '20px',
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
                      <th style={{ padding: '14px 14px' }}>No. Deployed</th>
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
                          {/* Location */}
                          <td style={{ padding: '14px 18px' }}>
                            <span
                              onClick={() => {
                                setSelectedLocation(row.location);
                                setViewMode('units');
                              }}
                              style={{
                                fontWeight: 500,
                                color: textColor,
                                textDecoration: 'underline',
                                cursor: 'pointer',
                              }}
                            >
                              {row.location}
                            </span>
                          </td>

                          {/* Status Badge */}
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

                          {/* Metric Columns */}
                          <td style={{ padding: '14px 14px' }}>{row.noAvailable}</td>
                          <td style={{ padding: '14px 14px' }}>{row.noAssigned}</td>
                          <td style={{ padding: '14px 14px' }}>{row.noDeployed.toLocaleString()}</td>
                          <td style={{ padding: '14px 14px' }}>{row.noSold.toLocaleString()}</td>
                          <td style={{ padding: '14px 14px' }}>{row.noFaulty}</td>

                          {/* Action Column: Yellow "View" Link */}
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <span
                              onClick={() => {
                                setSelectedLocation(row.location);
                                setViewMode('units');
                              }}
                              style={{
                                color: yellowColor,
                                fontWeight: 600,
                                fontSize: '12px',
                                cursor: 'pointer',
                              }}
                            >
                              View
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: UNITS MODE (Location Units Detail View) */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'units' && (
          <>
            {/* 5 Stat Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                gap: '14px',
                marginBottom: '26px',
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Available Quantity</div>
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Deployed Quantity</div>
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Sold Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>90</div>
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Assigned Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
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
                <div style={{ fontSize: '12px', color: subtextColor }}>Faulty Quantity</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>20</div>
              </div>
            </div>

            {/* Table of Box Units */}
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: '14px',
                border: `1px solid ${borderColor}`,
                overflow: 'visible',
                marginBottom: '20px',
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
                      <th style={{ padding: '14px 18px' }}>Box ID</th>
                      <th style={{ padding: '14px 14px' }}>Status</th>
                      <th style={{ padding: '14px 14px' }}>Added by</th>
                      <th style={{ padding: '14px 14px' }}>Sold by</th>
                      <th style={{ padding: '14px 14px' }}>Owner</th>
                      <th style={{ padding: '14px 14px' }}>Order ID</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUnits.map((row, index) => {
                      const isActionOpen = activeActionRowId === row.id;
                      const isNearBottom = index >= filteredUnits.length - 2;

                      const statusColor =
                        row.status === 'Available'
                          ? '#10B981'
                          : row.status === 'Deployed'
                          ? '#8B5CF6'
                          : row.status === 'Sold'
                          ? '#D97706'
                          : '#3B82F6';

                      const statusBg =
                        row.status === 'Available'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : row.status === 'Deployed'
                          ? 'rgba(139, 92, 246, 0.15)'
                          : row.status === 'Sold'
                          ? 'rgba(217, 119, 6, 0.15)'
                          : 'rgba(59, 130, 246, 0.15)';

                      return (
                        <tr
                          key={row.id}
                          style={{
                            borderBottom: `1px solid ${borderColor}`,
                            fontSize: '13px',
                            color: textColor,
                          }}
                        >
                          {/* Box ID (clickable link to unit detail) */}
                          <td style={{ padding: '14px 18px' }}>
                            <span
                              onClick={() => router.push(`/inventory/boxes/${modelId}/unit/${row.boxId}`)}
                              style={{
                                fontWeight: 600,
                                color: textColor,
                                textDecoration: 'underline',
                                cursor: 'pointer',
                              }}
                            >
                              {row.boxId}
                            </span>
                          </td>

                          {/* Status badge */}
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

                          {/* Added by */}
                          <td style={{ padding: '14px 14px', fontSize: '12px' }}>
                            <div style={{ color: textColor }}>{row.addedBy.name}</div>
                            <div style={{ color: subtextColor, fontSize: '11px' }}>
                              {row.addedBy.timestamp}
                            </div>
                          </td>

                          {/* Sold by */}
                          <td style={{ padding: '14px 14px', fontSize: '12px' }}>
                            {row.soldBy ? (
                              <>
                                <div style={{ color: textColor }}>{row.soldBy.name}</div>
                                <div style={{ color: subtextColor, fontSize: '11px' }}>
                                  {row.soldBy.timestamp}
                                </div>
                              </>
                            ) : (
                              <span style={{ color: subtextColor }}>-</span>
                            )}
                          </td>

                          {/* Owner */}
                          <td style={{ padding: '14px 14px', fontSize: '12px' }}>
                            {row.owner ? (
                              <>
                                <div style={{ color: textColor }}>{row.owner.name}</div>
                                <div style={{ color: subtextColor, fontSize: '11px' }}>
                                  {row.owner.code}
                                </div>
                              </>
                            ) : (
                              <span style={{ color: subtextColor }}>-</span>
                            )}
                          </td>

                          {/* Order ID */}
                          <td style={{ padding: '14px 14px', fontSize: '12px' }}>
                            {row.orderId ? (
                              <span style={{ color: textColor, fontWeight: 500 }}>{row.orderId}</span>
                            ) : (
                              <span style={{ color: subtextColor }}>-</span>
                            )}
                          </td>

                          {/* Action Column with Dropdown */}
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

                            {/* Dropdown Menu */}
                            {isActionOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  position: 'absolute',
                                  ...(isNearBottom ? { bottom: '100%', marginBottom: '4px' } : { top: '100%', marginTop: '4px' }),
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
                                {/* View */}
                                <div
                                  onClick={() => {
                                    setActiveActionRowId(null);
                                    router.push(`/inventory/boxes/${modelId}/unit/${row.boxId}`);
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
                                    router.push(`/inventory/boxes/${modelId}?view=update-stock&loc=${encodeURIComponent(selectedLocation)}&unitId=${row.boxId}`);
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

                                {/* Assign to order matching Image 5 Box 1 & 2 */}
                                {row.status === 'Available' ? (
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
                                ) : (
                                  <div
                                    style={{
                                      padding: '8px 10px',
                                      fontSize: '12px',
                                      color: '#52525B',
                                      cursor: 'not-allowed',
                                      borderRadius: '6px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      opacity: 0.6,
                                    }}
                                  >
                                    <UserPlus size={14} color="#52525B" />
                                    <span>Assign to order</span>
                                  </div>
                                )}

                                {/* Mark as faulty Toggle */}
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
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertTriangle size={14} color={subtextColor} />
                                    <span>Mark as faulty</span>
                                  </div>
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

                                {/* Return to stock matching Image 5 Box 2, 3, & 4 */}
                                {row.status !== 'Available' ? (
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
                                ) : (
                                  <div
                                    style={{
                                      padding: '8px 10px',
                                      fontSize: '12px',
                                      color: '#52525B',
                                      cursor: 'not-allowed',
                                      borderRadius: '6px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      opacity: 0.6,
                                    }}
                                  >
                                    <RotateCcw size={14} color="#52525B" />
                                    <span>Return to stock</span>
                                  </div>
                                )}
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
          </>
        )}

        {/* 5. Pagination Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '12px',
            color: subtextColor,
          }}
        >
          <span>1 - 100 of 5,000,045</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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

      {/* Right-Hand Sidebar: Activity History matching Image 5 (Overview) / Model history */}
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

        {/* Continuous section with NO cards, NO borders, only spacing & arrangement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {(viewMode === 'overview' ? modelOverviewActivityHistory : modelActivityHistory).map((item) => (
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

      {/* Filter Modal (Status & Location tabs matching Image 5) */}
      <InventoryModelStockFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setOverviewFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Stock filters applied successfully',
          });
        }}
      />

      {/* Stock Threshold Modal */}
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

      {/* Assign to Order Modal matching Image 5 Box 1 */}
      <AssignOrderModal
        isOpen={!!assignModalUnit}
        onClose={() => setAssignModalUnit(null)}
        isLightMode={isLightMode}
        boxId={assignModalUnit?.boxId}
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
              message: `Box ${assignModalUnit.boxId} assigned to order ${orderId}`,
            });
            setAssignModalUnit(null);
          }
        }}
      />

      {/* Return to Stock Modal matching Image 5 Box 3 & 4 */}
      <ReturnToStockModal
        isOpen={!!returnModalUnit}
        onClose={() => setReturnModalUnit(null)}
        isLightMode={isLightMode}
        boxId={returnModalUnit?.boxId}
        onConfirmReturn={(reason) => {
          if (returnModalUnit) {
            setUnits((prev) =>
              prev.map((u) => {
                if (u.id === returnModalUnit.id) {
                  return {
                    ...u,
                    status: 'Available',
                    orderId: undefined,
                    soldBy: undefined,
                    owner: undefined,
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

      {/* Stock Updated Modal matching Image 5 Box 5 */}
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
