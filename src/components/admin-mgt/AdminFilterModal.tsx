'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';

interface AdminFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  onApplyFilters: (filters: {
    statuses: string[];
    permissions: string[];
    branches: string[];
  }) => void;
  initialFilters?: {
    statuses?: string[];
    permissions?: string[];
    branches?: string[];
  };
}

const STATUSES = ['Online', 'Offline', 'Disabled'];
const PERMISSIONS = [
  'Dashboard',
  'User',
  'Box management',
  'Inventory',
  'Orders',
  'Rewards',
  'Admin management',
  'Transactions',
  'Fraud alert',
  'Support',
  'Countries map tutorials',
];
const BRANCHES = ['Ikoyi', 'Maryland', 'Ikeja', 'Victoria Island', 'Lekki'];

export const AdminFilterModal: React.FC<AdminFilterModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  onApplyFilters,
  initialFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'permission' | 'branches'>('status');

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialFilters?.statuses || [...STATUSES]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(initialFilters?.permissions || [...PERMISSIONS]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>(initialFilters?.branches || [...BRANCHES]);

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.statuses) setSelectedStatuses(initialFilters.statuses);
      if (initialFilters.permissions) setSelectedPermissions(initialFilters.permissions);
      if (initialFilters.branches) setSelectedBranches(initialFilters.branches);
    }
    setActiveTab('status');
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  // Toggle Helpers for Statuses
  const isAllStatusesSelected = STATUSES.every((s) => selectedStatuses.includes(s));
  const toggleAllStatuses = () => {
    if (isAllStatusesSelected) setSelectedStatuses([]);
    else setSelectedStatuses([...STATUSES]);
  };
  const toggleStatus = (s: string) => {
    if (selectedStatuses.includes(s)) setSelectedStatuses(selectedStatuses.filter((item) => item !== s));
    else setSelectedStatuses([...selectedStatuses, s]);
  };

  // Toggle Helpers for Permissions
  const isAllPermissionsSelected = PERMISSIONS.every((p) => selectedPermissions.includes(p));
  const toggleAllPermissions = () => {
    if (isAllPermissionsSelected) setSelectedPermissions([]);
    else setSelectedPermissions([...PERMISSIONS]);
  };
  const togglePermission = (p: string) => {
    if (selectedPermissions.includes(p)) setSelectedPermissions(selectedPermissions.filter((item) => item !== p));
    else setSelectedPermissions([...selectedPermissions, p]);
  };

  // Toggle Helpers for Branches
  const isAllBranchesSelected = BRANCHES.every((b) => selectedBranches.includes(b));
  const toggleAllBranches = () => {
    if (isAllBranchesSelected) setSelectedBranches([]);
    else setSelectedBranches([...BRANCHES]);
  };
  const toggleBranch = (b: string) => {
    if (selectedBranches.includes(b)) setSelectedBranches(selectedBranches.filter((item) => item !== b));
    else setSelectedBranches([...selectedBranches, b]);
  };

  const handleSave = () => {
    onApplyFilters({
      statuses: selectedStatuses.length > 0 ? selectedStatuses : [...STATUSES],
      permissions: selectedPermissions.length > 0 ? selectedPermissions : [...PERMISSIONS],
      branches: selectedBranches.length > 0 ? selectedBranches : [...BRANCHES],
    });
    onClose();
  };

  const handleDiscard = () => {
    setSelectedStatuses(initialFilters?.statuses || [...STATUSES]);
    setSelectedPermissions(initialFilters?.permissions || [...PERMISSIONS]);
    setSelectedBranches(initialFilters?.branches || [...BRANCHES]);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 95,
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
          fontFamily: 'var(--font-outfit), sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            Filter
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: subtextColor,
              transition: 'all 0.15s ease',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Clean Underline Text Tabs (Rule 3 Type 4) */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px 0 10px 0',
              fontSize: '13px',
              fontWeight: activeTab === 'status' ? 700 : 500,
              color: activeTab === 'status' ? yellowColor : subtextColor,
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            Status
            {activeTab === 'status' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('permission')}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px 0 10px 0',
              fontSize: '13px',
              fontWeight: activeTab === 'permission' ? 700 : 500,
              color: activeTab === 'permission' ? yellowColor : subtextColor,
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            Permission
            {activeTab === 'permission' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('branches')}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px 0 10px 0',
              fontSize: '13px',
              fontWeight: activeTab === 'branches' ? 700 : 500,
              color: activeTab === 'branches' ? yellowColor : subtextColor,
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.15s ease',
            }}
          >
            Branches
            {activeTab === 'branches' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: yellowColor,
                  borderRadius: '2px',
                }}
              />
            )}
          </button>
        </div>

        {/* Tab Content List with Scroll if many items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          {/* TAB 1: Status */}
          {activeTab === 'status' && (
            <>
              {/* All Option */}
              <div
                onClick={toggleAllStatuses}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 4px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isAllStatusesSelected ? 600 : 500,
                    color: isAllStatusesSelected ? textColor : subtextColor,
                  }}
                >
                  All
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllStatusesSelected ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                    backgroundColor: isAllStatusesSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllStatusesSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {STATUSES.map((status) => {
                const isChecked = selectedStatuses.includes(status);
                return (
                  <div
                    key={status}
                    onClick={() => toggleStatus(status)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isChecked ? 600 : 500,
                        color: isChecked ? textColor : subtextColor,
                      }}
                    >
                      {status}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        backgroundColor: isChecked ? yellowColor : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* TAB 2: Permission */}
          {activeTab === 'permission' && (
            <>
              {/* All Option */}
              <div
                onClick={toggleAllPermissions}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 4px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isAllPermissionsSelected ? 600 : 500,
                    color: isAllPermissionsSelected ? textColor : subtextColor,
                  }}
                >
                  All
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllPermissionsSelected ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                    backgroundColor: isAllPermissionsSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllPermissionsSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {PERMISSIONS.map((perm) => {
                const isChecked = selectedPermissions.includes(perm);
                return (
                  <div
                    key={perm}
                    onClick={() => togglePermission(perm)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isChecked ? 600 : 500,
                        color: isChecked ? textColor : subtextColor,
                      }}
                    >
                      {perm}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        backgroundColor: isChecked ? yellowColor : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* TAB 3: Branches */}
          {activeTab === 'branches' && (
            <>
              {/* All Option */}
              <div
                onClick={toggleAllBranches}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 4px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isAllBranchesSelected ? 600 : 500,
                    color: isAllBranchesSelected ? textColor : subtextColor,
                  }}
                >
                  All
                </span>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: isAllBranchesSelected ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                    backgroundColor: isAllBranchesSelected ? yellowColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAllBranchesSelected && <Check size={13} color="#000000" strokeWidth={3} />}
                </div>
              </div>

              {BRANCHES.map((branch) => {
                const isChecked = selectedBranches.includes(branch);
                return (
                  <div
                    key={branch}
                    onClick={() => toggleBranch(branch)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: isChecked ? 600 : 500,
                        color: isChecked ? textColor : subtextColor,
                      }}
                    >
                      {branch}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked ? `1.5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        backgroundColor: isChecked ? yellowColor : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Action Buttons: Discard and Save with Box2BoxPulsingBadge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <button
            type="button"
            onClick={handleDiscard}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              color: textColor,
              border: `1px solid ${borderColor}`,
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              border: 'none',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Save</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>
        </div>
      </div>
    </div>
  );
};
