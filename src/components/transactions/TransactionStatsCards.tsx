'use client';

import React, { useRef, useState } from 'react';

interface TransactionStatsCardsProps {
  isLightMode?: boolean;
}

interface StatItem {
  label: string;
  value: string;
  change: string;
}

const STAT_CARDS: StatItem[] = [
  { label: 'Total revenue', value: '₦72,000,000,000', change: '+2% today' },
  { label: 'Total box sales', value: '₦14,890,000', change: '+2% today' },
  { label: 'Total storage revenue', value: '₦12,000,000', change: '+12% today' },
  { label: 'Total B2B delivery revenue', value: '₦25,000,000', change: '+12% today' },
  { label: 'Total withdrawals', value: '₦7,935', change: '+12% today' },
  { label: 'Total earnings', value: '₦30,908', change: '+2% today' },
  { label: 'Total deposits', value: '₦1,020', change: '+4% today' },
  { label: 'Total subscriptions', value: '72,000', change: '+2% today' },
];

export const TransactionStatsCards: React.FC<TransactionStatsCardsProps> = ({ isLightMode = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
      style={{
        display: 'flex',
        gap: '14px',
        overflowX: 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        paddingBottom: '6px',
        margin: '0 -24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        scrollbarWidth: 'none',
      }}
    >
      {STAT_CARDS.map((card, idx) => (
        <div
          key={idx}
          style={{
            minWidth: '200px',
            flex: '0 0 auto',
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '11.5px', color: subtextColor }}>{card.label}</span>
          <span
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.01em',
            }}
          >
            {card.value}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#22C55E' }}>
            {card.change}
          </span>
        </div>
      ))}
    </div>
  );
};
