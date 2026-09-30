'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface HeatMapCardProps {
  isLightMode?: boolean;
}

export const HeatMapCard: React.FC<HeatMapCardProps> = ({ isLightMode = false }) => {
  return (
    <div
      style={{
        backgroundColor: isLightMode ? '#FFFFFF' : '#161619',
        borderRadius: '16px',
        border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.05)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header matching Figma */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '16px',
            fontWeight: 700,
            color: isLightMode ? '#111827' : '#FFFFFF',
            margin: 0,
          }}
        >
          Heat map
        </h2>

        <button
          title="Search Area"
          style={{
            background: 'none',
            border: 'none',
            color: isLightMode ? '#6B7280' : '#8E8E93',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search size={15} />
        </button>
      </div>

      {/* Official Map Image from public/image/map 1.png matching Figma */}
      <div
        style={{
          flex: 1,
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#0D0E11',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          minHeight: '140px',
        }}
      >
        <img
          src="/image/map 1.png"
          alt="Heat map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Legend from Figma (bottom-left) */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            backgroundColor: 'rgba(20, 20, 24, 0.88)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
            padding: '6px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', color: '#D1D1D6' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span>Healthy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', color: '#D1D1D6' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} />
            <span>Warning</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9px', color: '#D1D1D6' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
            <span>Bad</span>
          </div>
        </div>
      </div>
    </div>
  );
};
