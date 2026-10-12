'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical } from 'lucide-react';

interface ReportsTabProps {
  boxId?: string;
  isLightMode?: boolean;
  onActionNotification?: (message: string) => void;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  boxId = 'MyBox-123456',
  isLightMode = false,
  onActionNotification,
}) => {
  const router = useRouter();
  const [activeReportActionIndex, setActiveReportActionIndex] = useState<number | null>(null);

  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  const handleReportAction = (action: string, reportId: string) => {
    setActiveReportActionIndex(null);
    onActionNotification?.(`Report ${reportId} marked as ${action}`);
  };

  const handleViewReport = (reportId: string) => {
    setActiveReportActionIndex(null);
    const cleanId = reportId.replace('#', '').trim();
    router.push(`/box-management/${boxId}/report/${cleanId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Stat Cards (4 cards: Total Reports, High Severity, Pending, Avg. Time to resolve) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total Reports', value: '7,935' },
          { label: 'High Severity', value: '85%' },
          { label: 'Pending', value: '12' },
          { label: 'Avg. Time to resolve', value: '16hrs' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>{stat.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Table Container Card */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: cardBorder,
          overflow: 'visible',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '760px' }}>
            <thead>
              <tr style={{ borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)', color: subtextColor, fontSize: '11px' }}>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Report ID</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Title / Description</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Booking / Txn ID</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Severity</th>
                <th style={{ padding: '14px 16px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '14px 16px', fontWeight: 500, textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  reportId: '#123456',
                  title: 'Report title written by user appear here',
                  desc: 'Report description appear here',
                  category: 'Cleanliness',
                  txnId: '123456',
                  date: 'March 15, 2026',
                  severity: 'High',
                  severityColor: '#EF4444',
                  status: 'Resolved',
                },
                {
                  reportId: '#196723',
                  title: 'Missing package',
                  desc: "I can't find my package in compartment",
                  category: 'Theft',
                  txnId: '#196723',
                  date: 'Jun 12, 2025',
                  severity: 'High',
                  severityColor: '#EF4444',
                  status: 'Pending',
                },
                {
                  reportId: '#196724',
                  title: 'Dirty box',
                  desc: 'My food was kept in a dirty compartment',
                  category: 'Cleanliness',
                  txnId: '#196724',
                  date: 'Jun 12, 2025',
                  severity: 'Low',
                  severityColor: '#10B981',
                  status: 'Pending',
                },
                {
                  reportId: '#196725',
                  title: 'Cabinet jammed',
                  desc: 'Cabinet door failed to open automatically',
                  category: 'Hardware',
                  txnId: '#196725',
                  date: 'Jun 12, 2025',
                  severity: 'Medium',
                  severityColor: '#F5C842',
                  status: 'Pending',
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.04)',
                    fontSize: '12px',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1A1A1E')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: textColor }}>{row.reportId}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: textColor }}>{row.title}</div>
                    <div style={{ fontSize: '11px', color: subtextColor }}>{row.desc}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: textColor }}>{row.category}</td>
                  <td style={{ padding: '14px 16px', color: textColor, fontWeight: 500 }}>{row.txnId}</td>
                  <td style={{ padding: '14px 16px', color: subtextColor }}>{row.date}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: row.severityColor,
                      }}
                    >
                      {row.severity}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: subtextColor }}>{row.status}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', position: 'relative' }}>
                    <button
                      onClick={() =>
                        setActiveReportActionIndex(activeReportActionIndex === idx ? null : idx)
                      }
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

                    {/* 3-Dot Action Popover Menu (View, Escalate, Resolve) */}
                    {activeReportActionIndex === idx && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '16px',
                          top: '40px',
                          backgroundColor: isLightMode ? '#FFFFFF' : '#1F1F24',
                          border: cardBorder,
                          borderRadius: '10px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                          zIndex: 50,
                          minWidth: '120px',
                          padding: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          textAlign: 'left',
                        }}
                      >
                        <button
                          onClick={() => handleViewReport(row.reportId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: textColor,
                            fontSize: '12px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')
                          }
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleReportAction('Escalated', row.reportId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '12px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')
                          }
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Escalate
                        </button>
                        <button
                          onClick={() => handleReportAction('Resolved', row.reportId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#10B981',
                            fontSize: '12px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')
                          }
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Resolve
                        </button>
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
  );
};
