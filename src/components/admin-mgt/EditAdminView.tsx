'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import { SelectRoleModal } from './modals/SelectRoleModal';
import { SelectBranchModal } from './modals/SelectBranchModal';

interface EditAdminViewProps {
  adminId?: string;
}

export const EditAdminView: React.FC<EditAdminViewProps> = ({ adminId }) => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Pre-filled form state matching Figma Image 5
  const [fullName, setFullName] = useState('John Ejioffor');
  const [emailAddress, setEmailAddress] = useState('johnejioffor@box2box.com');
  const [phoneNumber, setPhoneNumber] = useState('08156234568');
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['Support']);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([
    'Lagos',
    'Abuja',
    'Owerri',
  ]);

  // Modals Visibility State
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);

  // Toast Notification State
  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Color tokens adhering to Zero Extra Contrast Rule
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const inputBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveToast({
      type: 'success',
      title: 'Admin Updated',
      message: `Admin "${fullName}" updated successfully`,
    });
    setTimeout(() => {
      router.push('/admin-mgt');
    }, 1200);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        maxWidth: '840px',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
    >
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Card: About admin (Zero Extra Contrast Rule: transparent/natural page background) */}
        <div
          style={{
            backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            About admin
          </h2>

          {/* Form Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            {/* Full Name */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor }}>Full name</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  outline: 'none',
                  padding: 0,
                  width: '100%',
                }}
              />
            </div>

            {/* Email Address */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor }}>Email address</span>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  outline: 'none',
                  padding: 0,
                  width: '100%',
                }}
              />
            </div>

            {/* Phone Number */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '11px', color: subtextColor }}>Phone number</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
                  outline: 'none',
                  padding: 0,
                  width: '100%',
                }}
              />
            </div>

            {/* Permissions / Role Dropdown Selector */}
            <div
              onClick={() => setShowRoleModal(true)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                <span style={{ fontSize: '11px', color: subtextColor }}>Permissions</span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: selectedRoles.length > 0 ? textColor : subtextColor,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {selectedRoles.length > 0 ? selectedRoles.join(', ') : 'Permissions'}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} style={{ flexShrink: 0, marginLeft: '8px' }} />
            </div>

            {/* Branch Dropdown Selector */}
            <div
              onClick={() => setShowBranchModal(true)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                <span style={{ fontSize: '11px', color: subtextColor }}>Branch</span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: selectedBranches.length > 0 ? textColor : subtextColor,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {selectedBranches.length > 0 ? selectedBranches.join(', ') : 'Branch'}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} style={{ flexShrink: 0, marginLeft: '8px' }} />
            </div>
          </div>
        </div>

        {/* Single Yellow Action Button: Update admin with Box2BoxPulsingBadge (Matching Figma Image 5) */}
        <div>
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>Update admin</span>
            <Box2BoxPulsingBadge size={14} inverted={false} />
          </button>
        </div>
      </form>

      {/* Select Role Modal */}
      <SelectRoleModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        isLightMode={isLightMode}
        selectedRoles={selectedRoles}
        onSelectRoles={(roles) => setSelectedRoles(roles)}
      />

      {/* Select Branch Modal */}
      <SelectBranchModal
        isOpen={showBranchModal}
        onClose={() => setShowBranchModal(false)}
        isLightMode={isLightMode}
        selectedBranches={selectedBranches}
        onSelectBranches={(branches) => setSelectedBranches(branches)}
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
