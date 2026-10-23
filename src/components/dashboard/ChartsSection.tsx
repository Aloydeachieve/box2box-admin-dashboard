'use client';

import React, { useState, useRef } from 'react';
import { useAdmin } from '@/components/layout/AdminContext';
import { UserDistributionCard } from './charts/UserDistributionCard';
import { UserGrowthCard } from './charts/UserGrowthCard';
import { RevenueCard } from './charts/RevenueCard';

export { UserDistributionCard, UserGrowthCard, RevenueCard };

interface ChartsSectionProps {
  isLightMode?: boolean;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ isLightMode: propLightMode }) => {
  const { isLightMode: ctxLightMode } = useAdmin();
  const isLightMode = propLightMode !== undefined ? propLightMode : ctxLightMode;

  // Drag-to-scroll horizontal state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        margin: '0 -24px 20px -24px',
        padding: '0 24px 8px 24px',
        width: 'calc(100% + 48px)',
        position: 'relative',
        zIndex: 1,
        minWidth: 0,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: isDragging ? 'none' : 'auto',
        boxSizing: 'border-box',
        minHeight: '240px',
      }}
      className="charts-horizontal-track no-scrollbar"
    >
      <UserDistributionCard isLightMode={isLightMode} />
      <UserGrowthCard isLightMode={isLightMode} />
      <RevenueCard isLightMode={isLightMode} />
    </div>
  );
};
