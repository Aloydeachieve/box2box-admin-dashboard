'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  UserPlus,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialPartsDistribution,
  unitActivityHistory,
  PartDistributionItem,
} from '@/lib/inventoryMockData';
import { InventoryPartsFilterModal } from './InventoryPartsFilterModal';
import { ReplacePartDrawer } from './ReplacePartDrawer';
import { ReturnToStockModal } from './ReturnToStockModal';

interface InventoryUnitDetailViewProps {
  modelId: string;
  unitId: string;
}

export const InventoryUnitDetailView: React.FC<InventoryUnitDetailViewProps> = ({
  modelId,
  unitId,
}) => {
  const router = useRouter();
  const { isLightMode, setHeaderActions } = useAdmin();

  // Active sub-tab under parts: 'All', 'Universal', 'A1', 'A2', 'A3'
  const [activeTab, setActiveTab] = useState<'All' | 'Universal' | 'A1' | 'A2' | 'A3'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showReplaceDrawer, setShowReplaceDrawer] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [replacingComponent, setReplacingComponent] = useState<{ id: string; name: string } | null>(null);

  // Table action dropdown state
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Parts dataset
  const [parts, setParts] = useState<PartDistributionItem[]>(initialPartsDistribution);

  // Unit faulty state for header action
  const [isUnitFaulty, setIsUnitFaulty] = useState(false);

  // Filter modal criteria
  const [appliedFilters, setAppliedFilters] = useState<{
    components: string[];
    supplier: string[];
    status: string[];
  }>({
    components: ['All'],
    supplier: ['All'],
    status: ['All'],
  });

  // Active toast
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Configure Header Actions dropdown for Image 4
  useEffect(() => {
    setHeaderActions([
      {
        label: 'Edit',
        onClick: () => {
          router.push(`/inventory/boxes/${modelId}?view=update-stock&unitId=${unitId}`);
        },
      },
      {
        label: 'Assign to order',
        onClick: () => {},
        color: '#71717A', // inactive
        disabled: true,
      },
      {
        label: 'Mark as faulty',
        hasToggle: true,
        isToggled: isUnitFaulty,
        onClick: () => {
          setIsUnitFaulty((prev) => {
            const next = !prev;
            setActiveToast({
              type: next ? 'flag' : 'success',
              title: next ? 'Marked as faulty' : 'Fault cleared',
              message: next
                ? `You successfully marked ${unitId} as faulty`
                : `Fault status cleared for ${unitId}`,
            });
            return next;
          });
        },
      },
      {
        label: 'Return to stock',
        onClick: () => {
          setShowReturnModal(true);
        },
      },
    ]);

    return () => setHeaderActions([]);
  }, [setHeaderActions, unitId, modelId, isUnitFaulty, router]);

  // Theme colors
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  // Handle Mark as Faulty on row
  const handleToggleFaultyRow = (partId: string) => {
    setParts((prev) =>
      prev.map((p) => {
        if (p.id === partId) {
          const willBeFaulty = p.status === 'Good';
          setActiveToast({
            type: willBeFaulty ? 'flag' : 'success',
            title: willBeFaulty ? 'Marked as faulty' : 'Status good',
            message: willBeFaulty
              ? `You successfully marked ${p.partId} as faulty`
              : `${p.partId} restored to good condition`,
          });
          return {
            ...p,
            status: willBeFaulty ? 'Faulty' : 'Good',
            isFaulty: willBeFaulty,
          };
        }
        return p;
      })
    );
  };

  // Handle Replace Part from drawer
  const handlePartReplaced = (newPartId: string) => {
    if (replacingComponent) {
      setParts((prev) =>
        prev.map((p) => {
          if (p.id === replacingComponent.id) {
            return {
              ...p,
              partId: newPartId,
              status: 'Good',
              isFaulty: false,
            };
          }
          return p;
        })
      );
      setActiveToast({
        type: 'success',
        title: 'Part replaced',
        message: `${replacingComponent.name} replaced with ${newPartId}`,
      });
      setReplacingComponent(null);
    }
  };

  const filteredParts = parts.filter((p) => {
    const matchesSearch =
      p.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.partId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter by tab
    if (activeTab === 'Universal') {
      if (p.usage !== 'Universal') return false;
    } else if (activeTab !== 'All') {
      if (p.usage !== activeTab) return false;
    }

    // Filter by modal criteria
    if (!appliedFilters.components.includes('All')) {
      const matchComp = appliedFilters.components.some(
        (c) => c.toLowerCase() === p.component.toLowerCase()
      );
      if (!matchComp) return false;
    }

    if (!appliedFilters.supplier.includes('All')) {
      const matchSup = appliedFilters.supplier.some(
        (s) => s.toLowerCase() === p.supplier.toLowerCase()
      );
      if (!matchSup) return false;
    }

    if (!appliedFilters.status.includes('All')) {
      const matchStat = appliedFilters.status.some(
        (st) => st.toLowerCase() === p.status.toLowerCase()
      );
      if (!matchStat) return false;
    }

    return true;
  });

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
        {/* 1. Unit Header Summary Section matching Image 4 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Title + Deployed Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: 0 }}>
              {unitId}
            </h2>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: '#8B5CF6',
              }}
            >
              Deployed
            </span>
          </div>

          {/* Meta Details Row 1 */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <span>
              Model <strong style={{ color: textColor }}>MyBox-Standard</strong>
            </span>
            <span>
              SKU <strong style={{ color: textColor }}>MBX-789012</strong>
            </span>
            <span>
              Material <strong style={{ color: textColor }}>Wood</strong>
            </span>
            <span>
              Cabinet <strong style={{ color: textColor }}>3</strong>
            </span>
            <span>
              Location <strong style={{ color: textColor }}>Ikeja</strong>
            </span>
            <span>
              Last updated <strong style={{ color: textColor }}>Aug 02, 2024 | 11:56 AM</strong>
            </span>
          </div>

          {/* Meta Details Row 2 */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <span>
              Order Id <strong style={{ color: textColor, textDecoration: 'underline' }}>#123456</strong>
            </span>
            <span>
              Added by <strong style={{ color: textColor, textDecoration: 'underline' }}>James Moses</strong>
            </span>
            <span>
              Sold by <strong style={{ color: textColor, textDecoration: 'underline' }}>James Moses</strong>
            </span>
          </div>

          {/* Links / Specifications: View live box stacked underneath More data about box matching Figma Image 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '12px',
              marginTop: '4px',
            }}
          >
            <div style={{ fontWeight: 600, color: subtextColor }}>
              Specifications
            </div>
            <div>
              <span style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer' }}>
                More data about box
              </span>
            </div>
            <div>
              <span
                onClick={() => {
                  router.push(`/box-management/${unitId}`);
                }}
                style={{
                  color: '#F5C842',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                View live box
              </span>
            </div>
          </div>
        </div>

        {/* 2. Parts Distribution Main Container (Border 1 separating from details) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {/* Header */}
          <div style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>
            Parts distribution
          </div>

          {/* Sub-tabs bar: All, Universal, A1, A2, A3 + Search & Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Sub-tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {(['All', 'Universal', 'A1', 'A2', 'A3'] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#F5C842' : subtextColor,
                      cursor: 'pointer',
                      padding: '6px 0',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
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
                    backgroundColor: isLightMode ? '#F9FAFB' : '#111113',
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
                  backgroundColor: isLightMode ? '#F9FAFB' : '#111113',
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

          {/* Border 2: Inner container holding the main table */}
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
                  <th style={{ padding: '14px 18px' }}>Component</th>
                  <th style={{ padding: '14px 14px' }}>Part ID</th>
                  {activeTab === 'All' && <th style={{ padding: '14px 14px' }}>Usage</th>}
                  <th style={{ padding: '14px 14px' }}>Supplier</th>
                  <th style={{ padding: '14px 14px' }}>Installed by</th>
                  <th style={{ padding: '14px 14px' }}>Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={activeTab === 'All' ? 7 : 6}
                      style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: subtextColor,
                      }}
                    >
                      <div style={{ fontSize: '15px', fontWeight: 600, color: textColor, marginBottom: '6px' }}>
                        No parts recorded for {activeTab === 'Universal' ? 'Universal compartment' : `Cabinet ${activeTab}`}
                      </div>
                      <div style={{ fontSize: '12px', color: subtextColor }}>
                        {activeTab === 'Universal'
                          ? 'Universal hardware components will appear here.'
                          : `Parts assigned to Cabinet ${activeTab} will appear here once configured.`}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredParts.map((row, index) => {
                  const isActionOpen = activeActionRowId === row.id;
                  const isNearBottom = index >= filteredParts.length - 2;

                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: `1px solid ${borderColor}`,
                        fontSize: '13px',
                        color: textColor,
                      }}
                    >
                      {/* Component */}
                      <td style={{ padding: '14px 18px', fontWeight: 500 }}>
                        {row.component}
                      </td>

                      {/* Part ID */}
                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            fontWeight: 600,
                            color: textColor,
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                        >
                          {row.partId}
                        </span>
                      </td>

                      {/* Usage (only in All tab) */}
                      {activeTab === 'All' && (
                        <td style={{ padding: '14px 14px' }}>{row.usage}</td>
                      )}

                      {/* Supplier */}
                      <td style={{ padding: '14px 14px' }}>{row.supplier}</td>

                      {/* Installed by */}
                      <td style={{ padding: '14px 14px', fontSize: '12px' }}>
                        <div style={{ color: textColor }}>{row.installedBy.name}</div>
                        <div style={{ color: subtextColor, fontSize: '11px' }}>
                          {row.installedBy.timestamp}
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor:
                              row.status === 'Good'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'Good' ? '#10B981' : '#EF4444',
                          }}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* Action Menu */}
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

                        {/* Dropdown Menu matching Image 4 description */}
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
                            {/* Replace parts -> opens ReplacePartDrawer */}
                            <div
                              onClick={() => {
                                setActiveActionRowId(null);
                                setReplacingComponent({ id: row.id, name: row.component.toLowerCase() });
                                setShowReplaceDrawer(true);
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
                              <RefreshCw size={14} color={subtextColor} />
                              <span>Replace parts</span>
                            </div>

                            {/* Mark as faulty with toggle switch */}
                            <div
                              onClick={() => handleToggleFaultyRow(row.id)}
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
                                  backgroundColor: row.status === 'Faulty' ? '#EF4444' : isLightMode ? '#E5E7EB' : '#3F3F46',
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
                                    left: row.status === 'Faulty' ? '14px' : '2px',
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
                }))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      {/* Right-Hand Sidebar: Activity History matching exact user description */}
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
          {unitActivityHistory.map((item) => (
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

      {/* Filter Modal */}
      <InventoryPartsFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setAppliedFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Parts filters applied successfully',
          });
        }}
      />

      {/* Replace Part Drawer (Image 5) */}
      <ReplacePartDrawer
        isOpen={showReplaceDrawer}
        onClose={() => {
          setShowReplaceDrawer(false);
          setReplacingComponent(null);
        }}
        componentTitle={replacingComponent?.name || 'battery'}
        isLightMode={isLightMode}
        onSelectPart={handlePartReplaced}
      />

      {/* Return to Stock Modal */}
      <ReturnToStockModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        isLightMode={isLightMode}
        boxId={unitId}
        onConfirmReturn={(reason) => {
          setShowReturnModal(false);
          setActiveToast({
            type: 'success',
            title: 'Return to stock',
            message: `${unitId} returned to stock successfully`,
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
