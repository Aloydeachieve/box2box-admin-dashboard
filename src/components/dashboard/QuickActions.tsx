'use client';

import React from 'react';
import {
  Users,
  Box,
  Layers,
  CreditCard,
  Headphones,
  Film,
} from 'lucide-react';

interface QuickActionsProps {
  isLightMode?: boolean;
  onSelectAction?: (actionId: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ isLightMode = false, onSelectAction }) => {
  // Exactly 6 actions: 3 rows x 2 columns as requested
  const actions = [
    // Row 1
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage all user account',
      icon: Users,
    },
    {
      id: 'boxes',
      title: 'Box management',
      description: 'Manage active box units',
      icon: Box,
    },
    // Row 2
    {
      id: 'inventory',
      title: 'Inventory',
      description: 'Manage stock',
      icon: Layers,
    },
    {
      id: 'transactions',
      title: 'Transactions',
      description: 'Manage transactions',
      icon: CreditCard,
    },
    // Row 3
    {
      id: 'support',
      title: 'Support centre',
      description: 'Review user reports',
      icon: Headphones,
    },
    {
      id: 'tutorials',
      title: 'Tutorials',
      description: 'Manage video tutorials',
      icon: Film,
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
              onClick={() => onSelectAction?.(act.id === 'boxes' ? 'box_regt' : act.id)}
              style={{
                backgroundColor: isLightMode ? '#FFFFFF' : '#161619',
                borderRadius: '12px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                boxShadow: isLightMode ? '0 2px 6px rgba(0,0,0,0.03)' : 'none',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1D1D22';
                e.currentTarget.style.borderColor = 'rgba(245, 200, 66, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isLightMode ? '#FFFFFF' : '#161619';
                e.currentTarget.style.borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#FEF3C7' : '#202025',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#F5C842',
                }}
              >
                <Icon size={18} color={isLightMode ? '#D97706' : '#F5C842'} />
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: isLightMode ? '#111827' : '#FFFFFF', marginBottom: '2px' }}>
                  {act.title}
                </div>
                <div style={{ fontSize: '11px', color: isLightMode ? '#6B7280' : '#71717A' }}>
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
