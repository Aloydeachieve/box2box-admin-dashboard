'use client';

import React, { useState, useRef } from 'react';
import { useAdmin } from '@/components/layout/AdminContext';
import { UserDistributionCard } from './charts/UserDistributionCard';
import { UserGrowthCard } from './charts/UserGrowthCard';
import { RevenueCard } from './charts/RevenueCard';
import { DeliveryVolumeCard } from './charts/DeliveryVolumeCard';
import { BoxDistributionCard } from './charts/BoxDistributionCard';
import { BatteryHealthCard } from './charts/BatteryHealthCard';
import { UserDistributionModal } from './modals/UserDistributionModal';
import { BatteryHealthModal } from './modals/BatteryHealthModal';

export {
  UserDistributionCard,
  UserGrowthCard,
  RevenueCard,
  DeliveryVolumeCard,
  BoxDistributionCard,
  BatteryHealthCard,
};

interface ChartsSectionProps {
  isLightMode?: boolean;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ isLightMode: propLightMode }) => {
  const { isLightMode: ctxLightMode } = useAdmin();
  const isLightMode = propLightMode !== undefined ? propLightMode : ctxLightMode;

  // Modal states for Info buttons
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBatteryModal, setShowBatteryModal] = useState(false);

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
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Edge-to-Edge Draggable Horizontal Track adhering to Rule 7 */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          margin: '0 -24px 20px -24px',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '6px',
          height: '330px',
          minHeight: '330px',
          flexShrink: 0,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto',
          boxSizing: 'border-box',
        }}
        className="charts-horizontal-track no-scrollbar"
      >
        {/* 1. User distribution */}
        <UserDistributionCard
          isLightMode={isLightMode}
          onOpenInfo={() => setShowUserModal(true)}
        />

        {/* 2. User growth */}
        <UserGrowthCard isLightMode={isLightMode} />

        {/* 3. Revenue */}
        <RevenueCard isLightMode={isLightMode} />

        {/* 4. Delivery volume */}
        <DeliveryVolumeCard isLightMode={isLightMode} />

        {/* 5. Box distribution */}
        <BoxDistributionCard isLightMode={isLightMode} />

        {/* 6. Battery health */}
        <BatteryHealthCard
          isLightMode={isLightMode}
          onOpenInfo={() => setShowBatteryModal(true)}
        />

        {/* Trailing spacer so rightmost card has breathing room when scrolled to the far end */}
        <div style={{ width: '16px', flexShrink: 0 }} />
      </div>

      {/* Info Modals matching Figma Image 5 */}
      <UserDistributionModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        isLightMode={isLightMode}
      />
      <BatteryHealthModal
        isOpen={showBatteryModal}
        onClose={() => setShowBatteryModal(false)}
        isLightMode={isLightMode}
      />
    </>
  );
};
