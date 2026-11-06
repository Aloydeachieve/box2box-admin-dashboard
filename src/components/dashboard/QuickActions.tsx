'use client';

import React from 'react';
import {
  Users,
  Box,
  Store,
  CreditCard,
  Headphones,
  PlaySquare,
} from 'lucide-react';

interface QuickActionsProps {
  isLightMode?: boolean;
  onSelectAction?: (actionId: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ isLightMode = false, onSelectAction }) => {
  // Exactly 6 actions: 2 rows x 3 columns matching Figma
  const actions = [
    // Column 1
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage all user account',
      icon: Users,
    },
    // Column 2
    {
      id: 'boxes',
      title: 'Box management',
      description: 'Manage active box units',
      icon: Box,
    },
    // Column 3
    {
      id: 'inventory',
      title: 'Inventory',
      description: 'Manage stock',
      icon: Store,
    },
    // Row 2, Column 1
    {
      id: 'transactions',
      title: 'Transactions',
      description: 'Manage transactions',
      icon: CreditCard,
    },
    // Row 2, Column 2
    {
      id: 'support',
      title: 'Support centre',
      description: 'Review user reports',
      icon: Headphones,
    },
    // Row 2, Column 3
    {
      id: 'tutorials',
      title: 'Tutorials',
      description: 'Manage video tutorials',
      icon: PlaySquare,
    },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <h2
        style={{
          fontFamily: 'var(--font-outfit), sans-serif',
          fontSize: '15px',
          fontWeight: 700,
          color: isLightMode ? '#111827' : '#FFFFFF',
          marginBottom: '12px',
        }}
      >
        Quick actions
      </h2>

      {/* Exactly 3 columns horizontally x 2 rows vertically */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
        className="quick-actions-3col"
      >
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onSelectAction?.(act.id)}
              style={{
                backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
                borderRadius: '12px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: act.id === 'support' || act.id === 'tutorials' ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                boxShadow: isLightMode ? '0 2px 6px rgba(0,0,0,0.03)' : 'none',
              }}
              onMouseOver={(e) => {
                if (act.id !== 'support' && act.id !== 'tutorials') {
                  e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isLightMode ? '#FFFFFF' : 'transparent';
                e.currentTarget.style.borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
              }}
            >
              {/* Subtle neutral dark gray container holding the icon matching Figma */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#1C1C20',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color={isLightMode ? '#4B5563' : '#9CA3AF'} />
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: isLightMode ? '#111827' : '#FFFFFF', marginBottom: '2px' }}>
                  {act.title}
                </div>
                <div style={{ fontSize: '11px', color: isLightMode ? '#6B7280' : '#8E8E93' }}>
                  {act.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .quick-actions-3col {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .quick-actions-3col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
