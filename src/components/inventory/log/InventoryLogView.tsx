'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { InventoryLogStats } from './InventoryLogStats';
import { InventoryLogCharts } from './InventoryLogCharts';
import { InventoryLogAlerts } from './InventoryLogAlerts';
import { BoxModelsFilterModal } from './BoxModelsFilterModal';
import { AccessoriesTableFilterModal } from './AccessoriesTableFilterModal';
import { PartsTableFilterModal } from './PartsTableFilterModal';
import {
  initialBoxModels,
  initialInventoryLogAccessories,
  initialBoxParts,
  BoxModelItem,
  InventoryLogAccessoryItem,
  BoxPartItem,
} from '@/lib/inventoryMockData';

export const InventoryLogView: React.FC = () => {
  const { isLightMode } = useAdmin();

  // Time period filter dropdown state
  const [timePeriod, setTimePeriod] = useState('This week');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Search states for each table section
  const [boxModelsSearch, setBoxModelsSearch] = useState('');
  const [accessoriesSearch, setAccessoriesSearch] = useState('');
  const [partsSearch, setPartsSearch] = useState('');

  // Modals state
  const [showBoxModelsFilter, setShowBoxModelsFilter] = useState(false);
  const [showAccessoriesFilter, setShowAccessoriesFilter] = useState(false);
  const [showPartsFilter, setShowPartsFilter] = useState(false);

  // Active toast
  const [activeToast, setActiveToast] = useState<{
    type: 'success' | 'flag' | 'unavailable' | 'disable' | 'resolved';
    title: string;
    message: string;
  } | null>(null);

  // Data sets
  const [boxModels] = useState<BoxModelItem[]>(initialBoxModels);
  const [accessories] = useState<InventoryLogAccessoryItem[]>(initialInventoryLogAccessories);
  const [parts] = useState<BoxPartItem[]>(initialBoxParts);

  // Theme tokens matching Rule 6
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const tableHeaderBg = isLightMode ? '#F9FAFB' : 'transparent';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const inputBg = isLightMode ? '#F3F4F6' : 'transparent';
  const yellowColor = '#F5C842';

  // Filtered lists
  const filteredBoxModels = boxModels.filter((m) =>
    m.model.toLowerCase().includes(boxModelsSearch.toLowerCase()) ||
    m.sku.toLowerCase().includes(boxModelsSearch.toLowerCase())
  );

  const filteredAccessories = accessories.filter((a) =>
    a.name.toLowerCase().includes(accessoriesSearch.toLowerCase()) ||
    a.category.toLowerCase().includes(accessoriesSearch.toLowerCase())
  );

  const filteredParts = parts.filter((p) =>
    p.name.toLowerCase().includes(partsSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(partsSearch.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '60px',
      }}
    >
      {/* 2-COLUMN SECTION: LEFT MAIN CONTENT + RIGHT ALERTS SIDEBAR */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT COLUMN: HEADER + STATS + CHARTS + 3 TABLES */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* 1. TOP HEADER ROW (Inside Left Column) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: textColor,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Inventory Management
              </h1>
              <p
                style={{
                  fontSize: '12px',
                  color: subtextColor,
                  margin: '3px 0 0 0',
                }}
              >
                View and manage all stock
              </p>
            </div>

            {/* Time period filter dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  color: textColor,
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>{timePeriod}</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>

              {showTimeDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    width: '120px',
                    backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '4px',
                    zIndex: 30,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {['Today', 'This week', 'This month', 'All time'].map((p) => (
                    <div
                      key={p}
                      onClick={() => {
                        setTimePeriod(p);
                        setShowTimeDropdown(false);
                      }}
                      style={{
                        padding: '6px 10px',
                        fontSize: '12px',
                        color: textColor,
                        cursor: 'pointer',
                        borderRadius: '6px',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* A. 6 Stat Cards Row */}
          <InventoryLogStats isLightMode={isLightMode} />

          {/* B. 4 Chart Cards Row */}
          <InventoryLogCharts isLightMode={isLightMode} />

          {/* C. TABLE SECTION 1: BOX MODELS (5) */}
          {/* Header + Search + Filter (Decoupled Rule 1) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
              Box models ({boxModels.length})
            </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Search */}
                <div style={{ position: 'relative', width: '220px' }}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={boxModelsSearch}
                    onChange={(e) => setBoxModelsSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '7px 32px 7px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: inputBg,
                      color: textColor,
                      fontSize: '12px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <Search
                    size={14}
                    color={subtextColor}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>

                {/* Filter Button */}
                <button
                  type="button"
                  onClick={() => setShowBoxModelsFilter(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: inputBg,
                    color: textColor,
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  <span>Filter</span>
                  <ChevronDown size={14} color={subtextColor} />
                </button>
              </div>
            </div>

            {/* Table Container Card (Rule 1) */}
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: '16px',
                border: `1px solid ${borderColor}`,
                overflow: 'hidden',
                marginBottom: '28px',
              }}
            >
              {/* Table */}
              <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
                <thead>
                  <tr style={{ backgroundColor: tableHeaderBg, borderBottom: `1px solid ${borderColor}` }}>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Box model
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Cabinets
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Material
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Amount
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Status
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. Available
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. Assigned
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. Installed
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. Faulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBoxModels.map((row) => (
                    <tr
                      key={row.id}
                      style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background-color 0.15s ease' }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.03)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {/* Box model Thumbnail + Name + SKU */}
                      <td style={{ padding: '14px 14px' }}>
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
                            <Image
                              src={row.image || '/image/closed cabinet.svg'}
                              alt={row.model}
                              width={32}
                              height={32}
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                              {row.model}
                            </div>
                            <div style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                              {row.sku}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.cabinets}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.material}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor, fontWeight: 500 }}>
                        {row.amount}
                      </td>

                      {/* Status Pill */}
                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor: row.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'Active' ? '#10B981' : '#EF4444',
                            display: 'inline-block',
                          }}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noAvailable.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noAssigned.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noDeployed.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noFaulty.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                fontSize: '11px',
                color: subtextColor,
              }}
            >
              <span>1 - 100 of 5,000,045</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: subtextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: subtextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* D. TABLE SECTION 2: ACCESSORIES (4) */}
          {/* Header + Search + Filter (Decoupled Rule 1) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
              Accessories ({accessories.length})
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Search */}
              <div style={{ position: 'relative', width: '220px' }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={accessoriesSearch}
                  onChange={(e) => setAccessoriesSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 32px 7px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: inputBg,
                    color: textColor,
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <Search
                  size={14}
                  color={subtextColor}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                onClick={() => setShowAccessoriesFilter(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  color: textColor,
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>Filter</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>
            </div>
          </div>

          {/* Table Container Card (Rule 1) */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              overflow: 'hidden',
              marginBottom: '28px',
            }}
          >
            {/* Table */}
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
                <thead>
                  <tr style={{ backgroundColor: tableHeaderBg, borderBottom: `1px solid ${borderColor}` }}>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Accessories
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Category
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Linked box
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Amount
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Status
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. available
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. assigned
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. installed
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. faulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccessories.map((row) => (
                    <tr
                      key={row.id}
                      style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background-color 0.15s ease' }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.03)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {/* Accessory Thumbnail + Name + SKU */}
                      <td style={{ padding: '14px 14px' }}>
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
                            <Image
                              src={row.image || '/image/box1.png'}
                              alt={row.name}
                              width={32}
                              height={32}
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                              {row.name}
                            </div>
                            <div style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                              {row.sku}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.category}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.linkedBox}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor, fontWeight: 500 }}>
                        {row.amount}
                      </td>

                      {/* Status Pill */}
                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor: row.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'Active' ? '#10B981' : '#EF4444',
                            display: 'inline-block',
                          }}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noAvailable.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noAssigned.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noInstalled.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noFaulty.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                fontSize: '11px',
                color: subtextColor,
              }}
            >
              <span>1 - 100 of 5,000,045</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: subtextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: subtextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* E. TABLE SECTION 3: PARTS (4) (Matching Image 5) */}
          {/* Header + Search + Filter (Decoupled Rule 1) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
              Parts ({parts.length})
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Search */}
              <div style={{ position: 'relative', width: '220px' }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={partsSearch}
                  onChange={(e) => setPartsSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '7px 32px 7px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: inputBg,
                    color: textColor,
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <Search
                  size={14}
                  color={subtextColor}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                onClick={() => setShowPartsFilter(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  color: textColor,
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>Filter</span>
                <ChevronDown size={14} color={subtextColor} />
              </button>
            </div>
          </div>

          {/* Table Container Card (Rule 1) */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              overflow: 'hidden',
              marginBottom: '28px',
            }}
          >
            {/* Table: Part | Category | Status | No. Available | No. Installed | No. Faulty */}
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ backgroundColor: tableHeaderBg, borderBottom: `1px solid ${borderColor}` }}>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Part
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Category
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      Status
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. Available
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. Installed
                    </th>
                    <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                      No. Faulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.map((row) => (
                    <tr
                      key={row.id}
                      style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background-color 0.15s ease' }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : 'rgba(255, 255, 255, 0.03)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {/* Part Thumbnail + Name + SKU */}
                      <td style={{ padding: '14px 14px' }}>
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
                            <Image
                              src={row.image || '/image/box1.png'}
                              alt={row.name}
                              width={32}
                              height={32}
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>
                              {row.name}
                            </div>
                            <div style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                              {row.sku}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.category}
                      </td>

                      {/* Status Pill */}
                      <td style={{ padding: '14px 14px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor: row.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: row.status === 'Active' ? '#10B981' : '#EF4444',
                            display: 'inline-block',
                          }}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noAvailable.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noInstalled.toLocaleString()}
                      </td>

                      <td style={{ padding: '14px 14px', fontSize: '12px', color: textColor }}>
                        {row.noFaulty.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                fontSize: '11px',
                color: subtextColor,
              }}
            >
              <span>1 - 100 of 5,000,045</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: subtextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'transparent',
                    color: subtextColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ALERTS SIDEBAR (Clean arrangement, no inner border cards) */}
        <div
          style={{
            width: '270px',
            flexShrink: 0,
            borderLeft: `1px solid ${borderColor}`,
            paddingLeft: '20px',
          }}
          className="inventory-log-alerts-sidebar"
        >
          <InventoryLogAlerts isLightMode={isLightMode} />
        </div>
      </div>

      {/* MODALS */}
      <BoxModelsFilterModal
        isOpen={showBoxModelsFilter}
        onClose={() => setShowBoxModelsFilter(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Box models filtered successfully',
          });
        }}
      />

      <AccessoriesTableFilterModal
        isOpen={showAccessoriesFilter}
        onClose={() => setShowAccessoriesFilter(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Accessories filtered successfully',
          });
        }}
      />

      <PartsTableFilterModal
        isOpen={showPartsFilter}
        onClose={() => setShowPartsFilter(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Parts filtered successfully',
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
