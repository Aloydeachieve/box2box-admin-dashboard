'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  MoreVertical,
  Edit,
  UserPlus,
  RotateCcw,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialAccessoryUnitParts,
  accessoryUnitActivityHistory,
  AccessoryUnitPartItem,
} from '@/lib/inventoryMockData';
import { ReplacePartDrawer } from '@/components/inventory/boxes/ReplacePartDrawer';
import { AssignOrderModal } from '@/components/inventory/boxes/AssignOrderModal';
import { ReturnToStockModal } from '@/components/inventory/boxes/ReturnToStockModal';

interface AccessoryUnitDetailViewProps {
  accessoryId: string;
  unitId?: string;
}

export const AccessoryUnitDetailView: React.FC<AccessoryUnitDetailViewProps> = ({
  accessoryId,
  unitId = 'MBX-789012',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  const selectedLocation = searchParams.get('loc') || 'Ikeja';

  // State
  const [parts, setParts] = useState<AccessoryUnitPartItem[]>(initialAccessoryUnitParts);
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);
  const [isUnitFaulty, setIsUnitFaulty] = useState(false);

  // Modals / Drawers
  const [replaceDrawerOpen, setReplaceDrawerOpen] = useState(false);
  const [activeReplacePartRow, setActiveReplacePartRow] = useState<AccessoryUnitPartItem | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Toast
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Styling Tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Configure Header Actions dropdown for Image 4
  useEffect(() => {
    setHeaderActions([
      {
        label: 'Edit',
        onClick: () => {
          router.push(
            `/inventory/accessories/${accessoryId}?view=edit-stock&unitId=${encodeURIComponent(
              unitId
            )}&loc=${encodeURIComponent(selectedLocation)}`
          );
        },
      },
      {
        label: 'Assign to order',
        onClick: () => {
          setShowAssignModal(true);
        },
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
                ? `You successfully marked unit ${unitId} as faulty`
                : `Fault status cleared for unit ${unitId}`,
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

    setCustomBack(() => () => {
      router.push(`/inventory/accessories/${accessoryId}?view=units&loc=${encodeURIComponent(selectedLocation)}`);
    });

    return () => {
      setHeaderActions([]);
      setCustomBack(null);
    };
  }, [accessoryId, unitId, selectedLocation, isUnitFaulty, router, setHeaderActions, setCustomBack]);

  // Handle Mark as Faulty on row
  const handleToggleFaultyRow = (partRowId: string) => {
    setParts((prev) =>
      prev.map((p) => {
        if (p.id === partRowId) {
          const willBeFaulty = !p.isFaulty;
          setActiveToast({
            type: willBeFaulty ? 'flag' : 'success',
            title: willBeFaulty ? 'Part marked faulty' : 'Part fault cleared',
            message: willBeFaulty
              ? `You successfully marked ${p.part} (${p.partId}) as faulty`
              : `Fault status cleared for ${p.part} (${p.partId})`,
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
    setActiveActionRowId(null);
  };

  // Handle Replace Part
  const handleOpenReplace = (row: AccessoryUnitPartItem) => {
    setActiveReplacePartRow(row);
    setActiveActionRowId(null);
    setReplaceDrawerOpen(true);
  };

  const handleSelectReplacementPart = (newPartId: string) => {
    if (!activeReplacePartRow) return;
    setParts((prev) =>
      prev.map((p) =>
        p.id === activeReplacePartRow.id
          ? { ...p, partId: newPartId, isFaulty: false, status: 'Good' }
          : p
      )
    );
    setActiveToast({
      type: 'success',
      title: 'Part Replaced',
      message: `Successfully replaced ${activeReplacePartRow.part} with ${newPartId}`,
    });
  };

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
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* TOP CARD: Accessory Unit Details matching Image 4 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Header Title with Purple 'Installed' Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: textColor, margin: 0 }}>
              Accessory unit ID
            </h2>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: 'rgba(167, 139, 250, 0.15)',
                color: '#A78BFA',
              }}
            >
              Installed
            </span>
          </div>

          {/* Row 1 Metadata */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <span>
              Accessory name <strong style={{ color: textColor }}>Name of accessory</strong>
            </span>
            <span>
              SKU <strong style={{ color: textColor }}>MBX-789012</strong>
            </span>
            <span>
              Category <strong style={{ color: textColor }}>Main module</strong>
            </span>
            <span>
              Parts <strong style={{ color: textColor }}>3</strong>
            </span>
            <span>
              Location <strong style={{ color: textColor }}>Ikeja</strong>
            </span>
          </div>

          {/* Row 2 Metadata */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              fontSize: '12px',
              color: subtextColor,
            }}
          >
            <span>
              Last updated <strong style={{ color: textColor }}>Aug 02, 2024 | 11:56 AM</strong>
            </span>
            <span>
              Order Id{' '}
              <strong style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer' }}>
                #123456
              </strong>
            </span>
            <span>
              Added by{' '}
              <strong style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer' }}>
                James Moses
              </strong>
            </span>
            <span>
              Sold by{' '}
              <strong style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer' }}>
                James Moses
              </strong>
            </span>
            <span>
              Linked box{' '}
              <strong style={{ color: textColor, textDecoration: 'underline', cursor: 'pointer' }}>
                MyBox-123456
              </strong>
            </span>
          </div>

          {/* Row 3 Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
              Specifications
            </span>
            <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
              More data about accessory
            </span>
          </div>
        </div>

        {/* BOTTOM CARD: PARTS TABLE matching Image 4 */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>
            Parts
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Part
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Part ID
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Supplier
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Installed by
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Status
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500, textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {parts.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
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
                    {/* Part */}
                    <td style={{ padding: '16px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.part}
                    </td>

                    {/* Part ID */}
                    <td style={{ padding: '16px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.partId}
                    </td>

                    {/* Supplier */}
                    <td style={{ padding: '16px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.supplier}
                    </td>

                    {/* Installed by */}
                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.installedBy}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                          {row.installedDate}
                        </span>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td style={{ padding: '16px 14px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
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

                    {/* Action Column */}
                    <td style={{ padding: '16px 14px', textAlign: 'right', position: 'relative' }}>
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

                      {/* 3-Dot Action Dropdown matching user prompt */}
                      {activeActionRowId === row.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '100%',
                            backgroundColor: cardBg,
                            border: `1px solid ${borderColor}`,
                            borderRadius: '10px',
                            padding: '6px',
                            minWidth: '185px',
                            zIndex: 50,
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                            textAlign: 'left',
                          }}
                        >
                          {/* Replace parts -> opens ReplacePartDrawer */}
                          <div
                            onClick={() => handleOpenReplace(row)}
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
                            <span>Replace parts</span>
                          </div>

                          {/* Mark as faulty with on/off switch */}
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
                            {/* Toggle Switch */}
                            <div
                              style={{
                                width: '28px',
                                height: '16px',
                                borderRadius: '999px',
                                backgroundColor: row.isFaulty ? yellowColor : isLightMode ? '#D1D5DB' : '#3F3F46',
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
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: Activity History matching Image 4 */}
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

        {/* Continuous section with NO cards, NO border lines, plain roles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {accessoryUnitActivityHistory.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
                <span style={{ color: yellowColor, fontWeight: 600, fontSize: '11px' }}>
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

      {/* Replace Part Drawer (Reused from inventory boxes) */}
      <ReplacePartDrawer
        isOpen={replaceDrawerOpen}
        onClose={() => setReplaceDrawerOpen(false)}
        isLightMode={isLightMode}
        componentTitle={activeReplacePartRow?.part || 'part'}
        onSelectPart={handleSelectReplacementPart}
      />

      {/* Assign to Order Modal */}
      <AssignOrderModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        isLightMode={isLightMode}
        boxId={unitId}
        onAssignOrder={(orderId: string) => {
          setActiveToast({
            type: 'success',
            title: 'Assigned to Order',
            message: `Successfully assigned ${unitId} to ${orderId}`,
          });
        }}
      />

      {/* Return to Stock Modal */}
      <ReturnToStockModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        isLightMode={isLightMode}
        boxId={unitId}
        onConfirmReturn={(reason: string) => {
          setActiveToast({
            type: 'success',
            title: 'Returned to Stock',
            message: `Unit ${unitId} successfully returned to stock. Reason: ${reason}`,
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
