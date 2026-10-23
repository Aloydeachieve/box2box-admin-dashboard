'use client';

import React, { useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight, Eye, Edit2 } from 'lucide-react';
import { PointRule } from '@/lib/rewardsMockData';

interface PointsTableProps {
  isLightMode?: boolean;
  rules: PointRule[];
  onToggleStatus: (ruleId: string) => void;
  onViewRule: (rule: PointRule) => void;
  onEditRule: (rule: PointRule) => void;
}

export const PointsTable: React.FC<PointsTableProps> = ({
  isLightMode = false,
  rules,
  onToggleStatus,
  onViewRule,
  onEditRule,
}) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#1E1E22';

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: '16px',
        border: `1px solid ${borderColor}`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
      }}
      onClick={() => setActiveDropdownId(null)}
    >
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Rule ID</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Title</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Action</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>App</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Frequency</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>No. of Points</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 600, textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => {
              const isMenuOpen = activeDropdownId === rule.id;

              return (
                <tr
                  key={rule.id}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.03)')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  {/* Rule ID */}
                  <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor, fontWeight: 500 }}>
                    {rule.ruleId}
                  </td>

                  {/* Title & Subtitle */}
                  <td style={{ padding: '14px 14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                        {rule.title}
                      </span>
                      <span style={{ fontSize: '11px', color: subtextColor }}>
                        {rule.subtitle}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor }}>
                    {rule.action}
                  </td>

                  {/* App */}
                  <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor }}>
                    {rule.app}
                  </td>

                  {/* Frequency */}
                  <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor }}>
                    {rule.frequency}
                  </td>

                  {/* No. of Points */}
                  <td style={{ padding: '14px 14px', fontSize: '12.5px', color: textColor, fontWeight: 600 }}>
                    {rule.points}
                  </td>

                  {/* Status Toggle */}
                  <td style={{ padding: '14px 14px' }}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStatus(rule.id);
                      }}
                      style={{
                        width: '38px',
                        height: '20px',
                        borderRadius: '10px',
                        backgroundColor: rule.status ? yellowColor : isLightMode ? '#D1D5DB' : '#2A2A2E',
                        padding: '2px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: rule.status ? 'flex-end' : 'flex-start',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                        }}
                      />
                    </div>
                  </td>

                  {/* Action Dropdown */}
                  <td style={{ padding: '14px 14px', textAlign: 'right', position: 'relative' }}>
                    <button
                      type="button"
                      onClick={(e) => toggleDropdown(rule.id, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: subtextColor,
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>

                    {isMenuOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '14px',
                          top: '38px',
                          backgroundColor: dropdownBg,
                          border: `1px solid ${borderColor}`,
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                          zIndex: 40,
                          minWidth: '120px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '4px',
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(null);
                            onViewRule(rule);
                          }}
                          style={{
                            padding: '8px 12px',
                            fontSize: '12px',
                            color: textColor,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            borderRadius: '6px',
                            transition: 'background-color 0.12s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A2E')
                          }
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <Eye size={13} color={subtextColor} />
                          <span>View</span>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(null);
                            onEditRule(rule);
                          }}
                          style={{
                            padding: '8px 12px',
                            fontSize: '12px',
                            color: textColor,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            borderRadius: '6px',
                            transition: 'background-color 0.12s',
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A2E')
                          }
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <Edit2 size={13} color={subtextColor} />
                          <span>Edit</span>
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

      {/* Pagination matching Image 1 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '8px',
          fontSize: '12px',
          color: subtextColor,
        }}
      >
        <span>1 - 100 of 5,000,045</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            disabled
            style={{
              background: 'none',
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              padding: '4px 6px',
              color: subtextColor,
              opacity: 0.5,
              cursor: 'not-allowed',
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
              padding: '4px 6px',
              color: textColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
