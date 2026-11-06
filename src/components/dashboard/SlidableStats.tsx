'use client';

import React, { useRef, useState } from 'react';
import {
  Users,
  Box,
  Truck,
  Building2,
  Coins,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  TrendingUp,
} from 'lucide-react';

interface SlidableStatsProps {
  isLightMode?: boolean;
}

export const SlidableStats: React.FC<SlidableStatsProps> = ({ isLightMode = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timeFilter, setTimeFilter] = useState('Daily');
  const [showTimeMenu, setShowTimeMenu] = useState(false);

  // Drag-to-scroll horizontal state
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

  // 2 rows of items as shown in Figma Screenshot 1
  const statsList = [
    // Column 1
    {
      id: 'users',
      title: 'Users',
      icon: Users,
      value: '200,000,000',
      subtext: 'Box owners, riders...',
      change: '+4% today',
      isPositive: true,
      row: 1,
    },
    {
      id: 'cities',
      title: 'Cities',
      icon: Building2,
      value: '42',
      subtext: 'Serviced locations',
      change: '+0% today',
      isPositive: true,
      row: 2,
    },
    // Column 2
    {
      id: 'active_boxes',
      title: 'Active boxes',
      icon: Box,
      value: '7,935',
      subtext: '320 Cities',
      change: '+12% today',
      isPositive: true,
      row: 1,
    },
    {
      id: 'revenue',
      title: 'Revenue',
      icon: Coins,
      value: '₦79,860,900',
      subtext: 'Booking commission',
      change: '+4% today',
      isPositive: true,
      row: 2,
    },
    // Column 3
    {
      id: 'active_deliveries',
      title: 'Active Deliveries',
      icon: Truck,
      value: '5,000,000',
      subtext: 'Ongoing',
      change: '+4%',
      isPositive: true,
      row: 1,
    },
    {
      id: 'avg_time',
      title: 'Avg. del time',
      icon: Clock,
      value: '3mins',
      subtext: 'Pickup - drop off',
      change: '+4% today',
      isPositive: true,
      row: 2,
    },
    // Column 4
    {
      id: 'storage_units',
      title: 'Total Units',
      icon: Layers,
      value: '18,400',
      subtext: 'Available bays',
      change: '+6% today',
      isPositive: true,
      row: 1,
    },
    {
      id: 'dispatch_rate',
      title: 'On-time SLA',
      icon: TrendingUp,
      value: '99.4%',
      subtext: 'Courier adherence',
      change: '+1.2%',
      isPositive: true,
      row: 2,
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
        borderRadius: '16px',
        border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 0 20px 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth: 0,
        boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Top Header of Overview Card: Title & Time Filter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '0 22px',
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
          Overview
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Scroll Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => scroll('left')}
              title="Scroll left"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: isLightMode ? '#F3F4F6' : 'transparent',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isLightMode ? '#4B5563' : '#8E8E93',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll('right')}
              title="Scroll right"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: isLightMode ? '#F3F4F6' : 'transparent',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isLightMode ? '#4B5563' : '#8E8E93',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Filter Dropdown (Daily ▾ from Figma) */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowTimeMenu(!showTimeMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '6px',
                backgroundColor: isLightMode ? '#F3F4F6' : 'transparent',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isLightMode ? '#111827' : '#FFFFFF',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              <span>{timeFilter}</span>
              <ChevronDown size={12} color={isLightMode ? '#6B7280' : '#8E8E93'} />
            </button>

            {showTimeMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  width: '110px',
                  backgroundColor: isLightMode ? '#FFFFFF' : '#1E1E22',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '4px',
                  zIndex: 20,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {['Daily', 'Weekly', 'Monthly'].map((period) => (
                  <div
                    key={period}
                    onClick={() => {
                      setTimeFilter(period);
                      setShowTimeMenu(false);
                    }}
                    style={{
                      padding: '6px 8px',
                      fontSize: '11px',
                      borderRadius: '6px',
                      color: isLightMode ? '#111827' : '#FFFFFF',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2B2B30')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {period}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slidable Cards List Wrapper with Edge-to-Edge bleed scrolling */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{
          width: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        className="no-scrollbar"
      >
        {/* Inner list holding cards with initial 22px padding so cards are NOT flush at the edge when not scrolling */}
        <div
          role="list"
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(2, 1fr)',
            gridAutoFlow: 'column',
            gridAutoColumns: 'clamp(124px, calc((100% - 66px) / 3.25), 150px)',
            gap: '10px',
            paddingLeft: '22px',
            paddingRight: '22px',
            minWidth: 'max-content',
            flex: 1,
          }}
        >
          {statsList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                role="listitem"
                key={item.id}
                style={{
                  backgroundColor: isLightMode ? '#F9FAFB' : 'transparent',
                  borderRadius: '12px',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: '100px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Header: Icon + Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={14} color="#F5C842" />
                  <span
                    style={{
                      fontSize: '11px',
                      color: isLightMode ? '#6B7280' : '#8E8E93',
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Big Metric Value */}
                <div
                  style={{
                    fontFamily: 'var(--font-outfit), sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: isLightMode ? '#111827' : '#FFFFFF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.value}
                </div>

                {/* Subtext & Percent Change */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span
                    style={{
                      fontSize: '9.5px',
                      color: isLightMode ? '#9CA3AF' : '#71717A',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '95px',
                    }}
                  >
                    {item.subtext}
                  </span>
                  <span
                    style={{
                      fontSize: '9.5px',
                      fontWeight: 600,
                      color: item.change.includes('+') ? '#10B981' : '#F5C842',
                    }}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Guaranteed 22px trailing padding when scrolled completely to the right edge */}
          <div
            aria-hidden="true"
            style={{
              width: '12px',
              gridRow: '1 / -1',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};
