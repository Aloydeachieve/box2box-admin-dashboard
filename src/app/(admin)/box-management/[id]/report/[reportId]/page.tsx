'use client';

import React, { useState, useEffect, use } from 'react';
import { Mail } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { EscalateReportModal } from '@/components/reports/EscalateReportModal';
import { ResolveReportModal } from '@/components/reports/ResolveReportModal';
import { ToastNotification } from '@/components/common/ToastNotification';

export default function ViewReportPage({
  params,
}: {
  params: Promise<{ id: string; reportId: string }>;
}) {
  const resolvedParams = use(params);
  const boxId = resolvedParams?.id || 'MyBox-123456';
  const reportId = resolvedParams?.reportId || '123456';

  const { isLightMode, setHeaderActions } = useAdmin();

  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [reportStatus, setReportStatus] = useState<'Resolved' | 'Escalated' | 'Pending'>('Resolved');
  const [toast, setToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Register the Action button dropdown items in the top header
  useEffect(() => {
    setHeaderActions([
      {
        label: 'Resolve',
        onClick: () => setShowResolveModal(true),
        color: '#10B981',
      },
      {
        label: 'Escalate',
        onClick: () => setShowEscalateModal(true),
        color: '#EF4444',
      },
    ]);

    return () => setHeaderActions([]);
  }, [setHeaderActions]);

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  return (
    <div
      style={{
        display: 'flex',
        gap: '28px',
        width: '100%',
        fontFamily: 'Rubik, var(--font-outfit), sans-serif',
        position: 'relative',
      }}
      className="view-report-container"
    >
      {/* Left Column: Report Details, Attachment, Participants, Summary */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* 1. Header Title & Meta Section (clean without card borders) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Title Row with ID & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: textColor,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Report title written by user appear here
            </h2>

            {/* Report Reference Code */}
            <span style={{ fontSize: '13px', color: subtextColor }}>
              R-{reportId}
            </span>

            {/* Resolved Pill Badge */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              {reportStatus}
            </span>

            {/* High Severity Badge */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.14)',
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              High
            </span>
          </div>

          {/* Description line */}
          <p style={{ fontSize: '13px', color: textColor, margin: 0, fontWeight: 500 }}>
            Report description appear here
          </p>

          {/* Meta Details Row: Category, Date, Booking/Txn ID, Linked box (Labels light, values thick) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              fontSize: '12px',
              marginTop: '4px',
            }}
          >
            <div>
              <span style={{ color: subtextColor }}>Category </span>
              <strong style={{ color: textColor, fontWeight: 700 }}>Cleanliness</strong>
            </div>

            <div>
              <span style={{ color: subtextColor }}>Date </span>
              <strong style={{ color: textColor, fontWeight: 700 }}>March 15, 2026 | 11:10 AM</strong>
            </div>

            <div>
              <span style={{ color: subtextColor }}>Booking/Txn ID </span>
              <strong style={{ color: textColor, fontWeight: 700 }}>123456</strong>
            </div>

            <div>
              <span style={{ color: subtextColor }}>Linked box </span>
              <strong style={{ color: textColor, fontWeight: 700 }}>B3 8901 MyBox locker 456XYZ</strong>
            </div>
          </div>
        </div>

        {/* 2. Middle Row: Report Attachment Card + Report Participants Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.35fr)',
            gap: '18px',
          }}
          className="report-cards-row"
        >
          {/* Left Card: Report attachment */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: cardBorder,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textColor, margin: 0 }}>
              Report attachment
            </h3>

            {/* Opened cabinet SVG image matching user instructions */}
            <div
              style={{
                width: '100%',
                maxHeight: '160px',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#1E1E22',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/image/opened-cabinent.svg"
                alt="Opened Cabinet Attachment"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '160px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Right Card: Report participants */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: cardBorder,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: textColor, margin: 0 }}>
              Report participants
            </h3>

            {/* Participant 1: Reporter */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: subtextColor }}>Reporter</span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: textColor,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Aku Cynthia
                </span>
              </div>

              {/* Send email button */}
              <button
                onClick={() => {
                  setToast({
                    type: 'success',
                    title: 'Email Sent',
                    message: 'Email invitation sent to Aku Cynthia',
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F5C842',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  transition: 'opacity 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <Mail size={14} color="#F5C842" />
                <span>Send email</span>
              </button>
            </div>

            {/* Participant 2: Box Owner */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: subtextColor }}>Box Owner</span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: textColor,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Benjamin Edward
                </span>
              </div>

              {/* Send email button */}
              <button
                onClick={() => {
                  setToast({
                    type: 'success',
                    title: 'Email Sent',
                    message: 'Email invitation sent to Benjamin Edward',
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F5C842',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  transition: 'opacity 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <Mail size={14} color="#F5C842" />
                <span>Send email</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Bottom Card: Report summary */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: cardBorder,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '520px',
          }}
        >
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: textColor, margin: 0 }}>
            Report summary
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ color: subtextColor }}>Reported on</span>
            <strong style={{ color: textColor, fontWeight: 700 }}>March 15, 2026 | 11:10 AM</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ color: subtextColor }}>Resolved on</span>
            <strong style={{ color: textColor, fontWeight: 700 }}>March 15, 2026 | 11:10 AM</strong>
          </div>
        </div>
      </div>

      {/* Right Column: Activity History (STRICTLY NO DIVISION CARDS AS REQUESTED, JUST GENEROUS SPACING) */}
      <aside
        style={{
          width: '320px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        className="hide-on-mobile"
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
            fontFamily: 'var(--font-outfit), sans-serif',
          }}
        >
          Activity history
        </h3>

        {/* Entries list placed directly on dark canvas without card boundaries, with generous vertical spacing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Notification 1: Report Resolved */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              Report Resolved
            </div>
            <div style={{ fontSize: '11px', color: subtextColor, lineHeight: '16px' }}>
              Owner has taken action to keep box in clean condition and agent onsite has confirmed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: subtextColor, marginTop: '2px' }}>
              <span>Owen Benjamin</span>
              <span>Admin</span>
            </div>
            <div style={{ fontSize: '10px', color: subtextColor }}>
              March 15, 2026 | 13:26
            </div>
          </div>

          {/* Notification 2: Emailed owner */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              Emailed owner
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: subtextColor, marginTop: '2px' }}>
              <span>Owen Benjamin</span>
              <span>Admin</span>
            </div>
            <div style={{ fontSize: '10px', color: subtextColor }}>
              March 15, 2026 | 13:25
            </div>
          </div>

          {/* Notification 3: Emailed reporter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              Emailed reporter
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: subtextColor, marginTop: '2px' }}>
              <span>Owen Benjamin</span>
              <span>Admin</span>
            </div>
            <div style={{ fontSize: '10px', color: subtextColor }}>
              March 15, 2026 | 13:25
            </div>
          </div>

          {/* Notification 4: Report Escalated */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              Report Escalated
            </div>
            <div style={{ fontSize: '11px', color: subtextColor, lineHeight: '16px' }}>
              This report needs high priority attention
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: subtextColor, marginTop: '2px' }}>
              <span>Owen Benjamin</span>
              <span>Admin</span>
            </div>
            <div style={{ fontSize: '10px', color: subtextColor }}>
              March 15, 2026 | 13:25
            </div>
          </div>

          {/* Notification 5: Package Mishandled report */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>
              Package Mishandled report
            </div>
            <div style={{ fontSize: '11px', color: subtextColor, lineHeight: '16px' }}>
              My item was tampered with upon delivery
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: subtextColor, marginTop: '2px' }}>
              <span>Aku Cynthia</span>
              <span>Customer</span>
            </div>
            <div style={{ fontSize: '10px', color: subtextColor }}>
              March 15, 2026 | 13:24
            </div>
          </div>
        </div>
      </aside>

      {/* Escalate Report Modal matching Figma Image 3 */}
      <EscalateReportModal
        isOpen={showEscalateModal}
        onClose={() => setShowEscalateModal(false)}
        reportId={reportId}
        isLightMode={isLightMode}
        onConfirm={() => {
          setReportStatus('Escalated');
          setToast({
            type: 'success',
            title: 'Report Escalated',
            message: 'Report escalated to high priority successfully',
          });
        }}
      />

      {/* Resolve Report Modal matching Figma Image 3 */}
      <ResolveReportModal
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        reportId={reportId}
        isLightMode={isLightMode}
        onResolvedSuccess={() => {
          setReportStatus('Resolved');
        }}
      />

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          isLightMode={isLightMode}
          onClose={() => setToast(null)}
        />
      )}

      <style jsx global>{`
        @media (max-width: 1024px) {
          .view-report-container {
            flex-direction: column !important;
          }
          .report-cards-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
