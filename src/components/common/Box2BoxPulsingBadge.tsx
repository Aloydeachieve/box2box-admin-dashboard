'use client';

import React from 'react';

interface Box2BoxPulsingBadgeProps {
  size?: number;
  className?: string;
  inverted?: boolean;
}

export const Box2BoxPulsingBadge: React.FC<Box2BoxPulsingBadgeProps> = ({
  size = 18,
  className = '',
  inverted = false,
}) => {
  const outerColor = inverted ? '#FFFFFF' : '#000000';
  const centerColor = '#F5C842';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        animation: 'b2bPulseZoom 2s infinite ease-in-out',
        transformOrigin: 'center center',
        flexShrink: 0,
      }}
      className={className}
    >
      <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
        {/* Row 0: 2 tiles */}
        <rect x="1" y="1" width="4.5" height="4.5" rx="1.2" fill={outerColor} />
        <rect x="6.5" y="1" width="4.5" height="4.5" rx="1.2" fill={outerColor} />
        {/* Row 1: 3 tiles (center is yellow accent) */}
        <rect x="1" y="6.5" width="4.5" height="4.5" rx="1.2" fill={outerColor} />
        <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1.2" fill={centerColor} />
        <rect x="12" y="6.5" width="4.5" height="4.5" rx="1.2" fill={outerColor} />
        {/* Row 2: 2 tiles */}
        <rect x="6.5" y="12" width="4.5" height="4.5" rx="1.2" fill={outerColor} />
        <rect x="12" y="12" width="4.5" height="4.5" rx="1.2" fill={outerColor} />
      </svg>
    </div>
  );
};
