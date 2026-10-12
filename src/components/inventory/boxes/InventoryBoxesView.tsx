'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
  Slash,
  RefreshCw,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { Box2BoxPulsingBadge } from '@/components/common/Box2BoxPulsingBadge';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialBoxModels,
  initialStockByLocation,
  BoxModelItem,
  StockLocationItem,
} from '@/lib/inventoryMockData';
import { InventoryBoxModelFilterModal } from './InventoryBoxModelFilterModal';
import { InventoryLocationFilterModal } from './InventoryLocationFilterModal';

export const InventoryBoxesView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Active sub-tab: 'models' or 'location'
  const [activeTab, setActiveTab] = useState<'models' | 'location'>('models');
  const [timePeriod, setTimePeriod] = useState('This week');
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showModelFilter, setShowModelFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  // Table action dropdown state
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Data states
  const [boxModels, setBoxModels] = useState<BoxModelItem[]>(initialBoxModels);
  const [stockLocations, setStockLocations] = useState<StockLocationItem[]>(initialStockByLocation);

  // Toast state
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Theme tokens matching Figma
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  // Handle Discontinue Toggle
  const handleToggleDiscontinue = (modelId: string) => {
    setBoxModels((prev) =>
      prev.map((item) => {
        if (item.id === modelId) {
          const willDiscontinue = item.status === 'Active';
          setActiveToast({
            type: willDiscontinue ? 'unavailable' : 'success',
            title: willDiscontinue ? 'Model discontinued' : 'Model reactivated',
            message: willDiscontinue
              ? `You successfully discontinued ${item.model}`
              : `You successfully reactivated ${item.model}`,
          });
          return {
            ...item,
            status: willDiscontinue ? 'Discontinued' : 'Active',
            isDiscontinued: willDiscontinue,
          };
        }
        return item;
      })
    );
  };

  // Filtered datasets
  const filteredModels = boxModels.filter((m) =>
    m.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLocations = stockLocations.filter((l) =>
    l.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '30px',
      }}
      onClick={() => {
        if (activeActionRowId) setActiveActionRowId(null);
        if (showTimeMenu) setShowTimeMenu(false);
      }}
    >
      {/* 1. Header Section: Title + New Box Model button + This Week dropdown */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 4px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Storage boxes
          </h1>
          <p style={{ fontSize: '13px', color: subtextColor, margin: 0 }}>
            View and manage all boxes in stock
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* New box model Button with pulsing Box2Box logo */}
          <button
            type="button"
            onClick={() => {
              router.push('/inventory/boxes/new');
            }}
            style={{
              backgroundColor: '#F5C842',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>New box model</span>
            <Box2BoxPulsingBadge size={18} />
          </button>

          {/* This week Filter Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTimeMenu(!showTimeMenu);
              }}
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <span>{timePeriod}</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>

            {showTimeMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '4px',
                  minWidth: '130px',
                  zIndex: 20,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                {['Today', 'This week', 'This month', 'Last 30 days'].map((period) => (
                  <div
                    key={period}
                    onClick={() => {
                      setTimePeriod(period);
                      setShowTimeMenu(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: textColor,
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
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

      {/* 2. Stat Cards Row (5 Cards matching Figma Image 1 & 2) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: '14px',
          marginBottom: '26px',
        }}
      >
        {/* Card 1: Total models */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor }}>Total models</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>5</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+0% today</div>
        </div>

        {/* Card 2: Total Box Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor }}>Total Box Units</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>12,000,000</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+12% today</div>
        </div>

        {/* Card 3: Available Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor }}>Available Units</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>7,935</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+12% today</div>
        </div>

        {/* Card 4: Deployed Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor }}>Deployed Units</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>30,908</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+2% today</div>
        </div>

        {/* Card 5: Faulty Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor }}>Faulty Units</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>2,050</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>+4% today</div>
        </div>
      </div>

      {/* 3. Sub-tabs bar & Search / Filter Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        {/* Left Sub-tabs: Box Models(3) & Stock by location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('models')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'models' ? 700 : 500,
              color: activeTab === 'models' ? '#F5C842' : subtextColor,
              cursor: 'pointer',
              padding: '6px 0',
              transition: 'color 0.15s ease',
            }}
          >
            Box Models(3)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'location' ? 700 : 500,
              color: activeTab === 'location' ? '#F5C842' : subtextColor,
              cursor: 'pointer',
              padding: '6px 0',
              transition: 'color 0.15s ease',
            }}
          >
            Stock by location
          </button>
        </div>

        {/* Right Search Input & Filter Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '210px',
                height: '36px',
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '0 36px 0 12px',
                fontSize: '13px',
                color: textColor,
                outline: 'none',
              }}
            />
            <Search
              size={15}
              color={subtextColor}
              style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
            />
          </div>

          {/* Filter ▾ button */}
          <button
            type="button"
            onClick={() => {
              if (activeTab === 'models') {
                setShowModelFilter(true);
              } else {
                setShowLocationFilter(true);
              }
            }}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              color: textColor,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <span>Filter</span>
            <ChevronDown size={14} color={subtextColor} />
          </button>
        </div>
      </div>

      {/* 4. Table Card Container */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '14px',
          border: `1px solid ${borderColor}`,
          overflow: 'visible',
          marginBottom: '20px',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${borderColor}`,
                  fontSize: '12px',
                  color: subtextColor,
                  fontWeight: 500,
                }}
              >
                <th style={{ padding: '14px 18px' }}>Box Model</th>
                <th style={{ padding: '14px 14px' }}>SKU</th>
                <th style={{ padding: '14px 14px' }}>Cabinets</th>
                <th style={{ padding: '14px 14px' }}>Material</th>
                {activeTab === 'models' && <th style={{ padding: '14px 14px' }}>Amount</th>}
                <th style={{ padding: '14px 14px' }}>Status</th>
                <th style={{ padding: '14px 14px' }}>No. Available</th>
                <th style={{ padding: '14px 14px' }}>No. Assigned</th>
                <th style={{ padding: '14px 14px' }}>No. Deployed</th>
                <th style={{ padding: '14px 14px' }}>No. Faulty</th>
                {activeTab === 'location' && <th style={{ padding: '14px 14px' }}>Location</th>}
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'models' ? (
                filteredModels.map((row, index) => {
                  const isActionOpen = activeActionRowId === row.id;
                  const isNearBottom = index >= filteredModels.length - 2;

                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: `1px solid ${borderColor}`,
                        fontSize: '13px',
                        color: textColor,
                      }}
                    >
                      {/* Box Model column with cabinet thumbnail */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '8px',
                              backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src="/image/closed cabinet.svg"
                              alt={row.model}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              onError={(e) => {
                                // Fallback if image fails to render
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <span
                            onClick={() => router.push(`/inventory/boxes/${row.id}`)}
                            style={{
                              fontWeight: 600,
                              color: textColor,
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                          >
                            {row.model}
                          </span>
                        </div>
                      </td>

                      {/* SKU */}
                      <td style={{ padding: '14px 14px', color: subtextColor, fontSize: '12px' }}>
                        {row.sku}
                      </td>

                      {/* Cabinets */}
                      <td style={{ padding: '14px 14px' }}>{row.cabinets}</td>

                      {/* Material */}
                      <td style={{ padding: '14px 14px' }}>{row.material}</td>

                      {/* Amount */}
                      <td style={{ padding: '14px 14px', fontWeight: 600 }}>{row.amount}</td>

                      {/* Status */}
                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor:
                              row.status === 'Active'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'Active' ? '#10B981' : '#EF4444',
                          }}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* Metrics */}
                      <td style={{ padding: '14px 14px' }}>{row.noAvailable}</td>
                      <td style={{ padding: '14px 14px' }}>{row.noAssigned}</td>
                      <td style={{ padding: '14px 14px' }}>{row.noDeployed.toLocaleString()}</td>
                      <td style={{ padding: '14px 14px' }}>{row.noFaulty}</td>

                      {/* Action Menu */}
                      <td style={{ padding: '14px 18px', textAlign: 'right', position: 'relative' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionRowId(isActionOpen ? null : row.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: subtextColor,
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Dropdown Menu for Box Model */}
                        {isActionOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              ...(isNearBottom ? { bottom: '100%', marginBottom: '4px' } : { top: '100%', marginTop: '4px' }),
                              right: '18px',
                              backgroundColor: cardBg,
                              border: `1px solid ${borderColor}`,
                              borderRadius: '10px',
                              padding: '6px',
                              minWidth: '160px',
                              zIndex: 50,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                              textAlign: 'left',
                            }}
                          >
                            {/* View */}
                            <div
                              onClick={() => {
                                setActiveActionRowId(null);
                                router.push(`/inventory/boxes/${row.id}`);
                              }}
                              style={{
                                padding: '8px 10px',
                                fontSize: '12px',
                                color: textColor,
                                cursor: 'pointer',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <Eye size={14} color={subtextColor} />
                              <span>View</span>
                            </div>

                            {/* Edit */}
                            <div
                              onClick={() => {
                                setActiveActionRowId(null);
                                router.push(`/inventory/boxes/${row.id}/edit`);
                              }}
                              style={{
                                padding: '8px 10px',
                                fontSize: '12px',
                                color: textColor,
                                cursor: 'pointer',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <Edit size={14} color={subtextColor} />
                              <span>Edit</span>
                            </div>

                            {/* Discontinue with toggle switch */}
                            <div
                              onClick={() => {
                                handleToggleDiscontinue(row.id);
                              }}
                              style={{
                                padding: '8px 10px',
                                fontSize: '12px',
                                color: textColor,
                                cursor: 'pointer',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Slash size={14} color={subtextColor} />
                                <span>Discontinue</span>
                              </div>
                              <div
                                style={{
                                  width: '28px',
                                  height: '16px',
                                  borderRadius: '10px',
                                  backgroundColor: row.status === 'Discontinued' ? '#EF4444' : isLightMode ? '#E5E7EB' : '#3F3F46',
                                  position: 'relative',
                                  transition: 'background-color 0.2s',
                                }}
                              >
                                <div
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FFFFFF',
                                    position: 'absolute',
                                    top: '2px',
                                    left: row.status === 'Discontinued' ? '14px' : '2px',
                                    transition: 'left 0.2s',
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                filteredLocations.map((row, index) => {
                  const isActionOpen = activeActionRowId === row.id;
                  const isNearBottom = index >= filteredLocations.length - 2;

                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: `1px solid ${borderColor}`,
                        fontSize: '13px',
                        color: textColor,
                      }}
                    >
                      {/* Box Model column */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '8px',
                              backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src="/image/closed cabinet.svg"
                              alt={row.model}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <span
                            onClick={() => router.push(`/inventory/boxes/mybox-standard?view=units&loc=${encodeURIComponent(row.location)}`)}
                            style={{
                              fontWeight: 600,
                              color: textColor,
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                          >
                            {row.model}
                          </span>
                        </div>
                      </td>

                      {/* SKU */}
                      <td style={{ padding: '14px 14px', color: subtextColor, fontSize: '12px' }}>
                        {row.sku}
                      </td>

                      {/* Cabinets */}
                      <td style={{ padding: '14px 14px' }}>{row.cabinets}</td>

                      {/* Material */}
                      <td style={{ padding: '14px 14px' }}>{row.material}</td>

                      {/* Status */}
                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor:
                              row.status === 'Available'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : row.status === 'Low stock'
                                ? 'rgba(245, 158, 11, 0.15)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color:
                              row.status === 'Available'
                                ? '#10B981'
                                : row.status === 'Low stock'
                                ? '#F59E0B'
                                : '#EF4444',
                          }}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* Metrics */}
                      <td style={{ padding: '14px 14px' }}>{row.noAvailable}</td>
                      <td style={{ padding: '14px 14px' }}>{row.noAssigned}</td>
                      <td style={{ padding: '14px 14px' }}>{row.noDeployed.toLocaleString()}</td>
                      <td style={{ padding: '14px 14px' }}>{row.noFaulty}</td>

                      {/* Location */}
                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor, maxWidth: '200px' }}>
                        {row.location}
                      </td>

                      {/* Action Menu */}
                      <td style={{ padding: '14px 18px', textAlign: 'right', position: 'relative' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveActionRowId(isActionOpen ? null : row.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: subtextColor,
                            cursor: 'pointer',
                            padding: '4px',
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Dropdown Menu for Stock by location */}
                        {isActionOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              ...(isNearBottom ? { bottom: '100%', marginBottom: '4px' } : { top: '100%', marginTop: '4px' }),
                              right: '18px',
                              backgroundColor: cardBg,
                              border: `1px solid ${borderColor}`,
                              borderRadius: '10px',
                              padding: '6px',
                              minWidth: '150px',
                              zIndex: 50,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                              textAlign: 'left',
                            }}
                          >
                            {/* View */}
                            <div
                              onClick={() => {
                                setActiveActionRowId(null);
                                router.push(`/inventory/boxes/mybox-standard?view=units&loc=${encodeURIComponent(row.location)}`);
                              }}
                              style={{
                                padding: '8px 10px',
                                fontSize: '12px',
                                color: textColor,
                                cursor: 'pointer',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <Eye size={14} color={subtextColor} />
                              <span>View</span>
                            </div>

                            {/* Update stock */}
                            <div
                              onClick={() => {
                                setActiveActionRowId(null);
                                const modelSlug = row.model.toLowerCase().replace(/\s+/g, '-');
                                router.push(`/inventory/boxes/${modelSlug}?view=update-stock&loc=${encodeURIComponent(row.location)}`);
                              }}
                              style={{
                                padding: '8px 10px',
                                fontSize: '12px',
                                color: textColor,
                                cursor: 'pointer',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <RefreshCw size={14} color={subtextColor} />
                              <span>Update stock</span>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Pagination Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: '12px',
          color: subtextColor,
        }}
      >
        <span>1 - 100 of 5,000,045</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            aria-label="Previous page"
            style={{
              background: 'none',
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px 6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Next page"
            style={{
              background: 'none',
              border: `1px solid ${borderColor}`,
              borderRadius: '6px',
              color: subtextColor,
              cursor: 'pointer',
              padding: '4px 6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Filter Modals */}
      <InventoryBoxModelFilterModal
        isOpen={showModelFilter}
        onClose={() => setShowModelFilter(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Box model filters applied successfully',
          });
        }}
      />

      <InventoryLocationFilterModal
        isOpen={showLocationFilter}
        onClose={() => setShowLocationFilter(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Location filters applied successfully',
          });
        }}
      />

      {/* Toast Notification */}
      {activeToast && (
        <ToastNotification
          type={activeToast.type}
          title={activeToast.title}
          message={activeToast.message}
          isLightMode={isLightMode}
          onClose={() => setActiveToast(null)}
        />
      )}
    </div>
  );
};
