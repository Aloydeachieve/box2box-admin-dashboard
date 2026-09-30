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
  MapPin,
  TrendingUp,
} from 'lucide-react';

interface SlidableStatsProps {
  isLightMode?: boolean;
}

export const SlidableStats: React.FC<SlidableStatsProps> = ({ isLightMode = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timeFilter, setTimeFilter] = useState('Daily');
  const [showTimeMenu, setShowTimeMenu] = useState(false);

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
    // Additional Columns for slidable carousel
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
        backgroundColor: isLightMode ? '#FFFFFF' : '#161619',
        borderRadius: '16px',
        border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth: 0,
        boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.05)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Top Header of Overview Card: Title & Time Filter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
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
                backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
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
                backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
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
                backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
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

      {/* Slidable 2-Row Grid Carousel matching Figma Screenshot 1 */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          gridAutoFlow: 'column',
          gridAutoColumns: '180px',
          gap: '12px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
        }}
        className="slidable-stats-row"
      >
        {statsList.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                borderRadius: '12px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)',
                padding: '14px 16px',
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
              {/* Header: Icon + Title matching Figma */}
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
                    maxWidth: '100px',
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
      </div>
    </div>
  );
};
