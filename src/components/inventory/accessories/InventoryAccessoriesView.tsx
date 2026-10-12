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
  Plus,
  X,
  Package,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialAccessories,
  initialAccessoryStock,
  initialAccessoryCategories,
  AccessoryItem,
  AccessoryStockItem,
  AccessoryCategoryItem,
} from '@/lib/inventoryMockData';
import { AccessoriesFilterModal } from './AccessoriesFilterModal';
import { StockFilterModal } from './StockFilterModal';

export const InventoryAccessoriesView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Active top-level subtab on the table: 'Accessories' | 'Stock' | 'Category'
  const [activeTab, setActiveTab] = useState<'Accessories' | 'Stock' | 'Category'>('Accessories');

  // Search query & time filter
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('This week');

  // Datasets
  const [accessories, setAccessories] = useState<AccessoryItem[]>(initialAccessories);
  const [stock, setStock] = useState<AccessoryStockItem[]>(initialAccessoryStock);
  const [categories, setCategories] = useState<AccessoryCategoryItem[]>(initialAccessoryCategories);

  // Table row action dropdown state
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Modals state
  const [showAccessoriesFilter, setShowAccessoriesFilter] = useState(false);
  const [showStockFilter, setShowStockFilter] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [showUpdateStockModal, setShowUpdateStockModal] = useState<{ id: string; name: string; current: number } | null>(null);
  const [updateStockQty, setUpdateStockQty] = useState('');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // New Category Form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Edit Category Modal state (Image 1)
  const [editCategoryTarget, setEditCategoryTarget] = useState<AccessoryCategoryItem | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatDesc, setEditCatDesc] = useState('');

  // Filter criteria for Accessories Tab
  const [accFilters, setAccFilters] = useState<{
    category: string[];
    linkedBoxes: string[];
    status: string[];
  }>({
    category: ['All'],
    linkedBoxes: ['All'],
    status: ['All'],
  });

  // Filter criteria for Stock Tab
  const [stockFilters, setStockFilters] = useState<{
    category: string[];
    linkedBox: string[];
    status: string[];
    location: string[];
  }>({
    category: ['All'],
    linkedBox: ['All'],
    status: ['All'],
    location: ['All'],
  });

  // Toast notification
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Theme styling tokens matching design
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const innerCardBg = isLightMode ? '#F9FAFB' : '#111113';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Toggle Discontinue on an accessory item
  const handleToggleDiscontinue = (id: string) => {
    setAccessories((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const willBeDiscontinued = item.status === 'Active';
          const newStatus = willBeDiscontinued ? 'Discontinue' : 'Active';
          setActiveToast({
            type: willBeDiscontinued ? 'disable' : 'success',
            title: willBeDiscontinued ? 'Accessory Discontinued' : 'Accessory Activated',
            message: willBeDiscontinued
              ? `You successfully discontinued ${item.name} (${item.sku})`
              : `${item.name} is now active and in production`,
          });
          return {
            ...item,
            status: newStatus,
          };
        }
        return item;
      })
    );
    setActiveActionRowId(null);
  };


  // Add new category
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: AccessoryCategoryItem = {
      id: `acat-${Date.now()}`,
      name: newCatName.trim(),
      description: newCatDesc.trim() || `MBX-${Math.floor(100000 + Math.random() * 900000)}`,
      createdBy: {
        name: 'Aku Cynthia',
        timestamp: 'Just now',
      },
      lastUpdated: {
        name: 'Aku Cynthia',
        timestamp: 'Just now',
      },
      accessoriesCount: 0,
    };

    setCategories((prev) => [newCat, ...prev]);
    setShowNewCategoryModal(false);
    setNewCatName('');
    setNewCatDesc('');
    setActiveToast({
      type: 'success',
      title: 'Category Created',
      message: `Category "${newCat.name}" created successfully`,
    });
  };

  // Save edited category (Image 1)
  const handleSaveEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategoryTarget || !editCatName.trim()) return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === editCategoryTarget.id
          ? {
              ...c,
              name: editCatName.trim(),
              description: editCatDesc.trim() || c.description,
              lastUpdated: {
                name: 'Aku Cynthia',
                timestamp: 'Just now',
              },
            }
          : c
      )
    );

    setActiveToast({
      type: 'success',
      title: 'Category Updated',
      message: `Category "${editCatName.trim()}" updated successfully`,
    });
    setEditCategoryTarget(null);
  };

  // Update stock handler
  const handleSaveUpdatedStock = () => {
    if (!showUpdateStockModal) return;
    const newQty = parseInt(updateStockQty, 10);
    if (isNaN(newQty)) return;

    setStock((prev) =>
      prev.map((item) =>
        item.id === showUpdateStockModal.id
          ? {
              ...item,
              noAvailable: newQty,
              status: newQty > 30 ? 'Available' : newQty > 0 ? 'Low stock' : 'Out of stock',
            }
          : item
      )
    );

    setActiveToast({
      type: 'success',
      title: 'Stock Updated',
      message: `Available stock for ${showUpdateStockModal.name} updated to ${newQty}`,
    });
    setShowUpdateStockModal(null);
    setUpdateStockQty('');
  };

  // Filtered Accessories
  const filteredAccessories = accessories.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.linkedBox.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter by Category
    if (!accFilters.category.includes('All')) {
      const matchCat = accFilters.category.some(
        (c) => c.toLowerCase() === item.category.toLowerCase()
      );
      if (!matchCat) return false;
    }

    // Filter by Linked boxes
    if (!accFilters.linkedBoxes.includes('All')) {
      const matchBox = accFilters.linkedBoxes.some(
        (b) => b.toLowerCase() === item.linkedBox.toLowerCase()
      );
      if (!matchBox) return false;
    }

    // Filter by Status
    if (!accFilters.status.includes('All')) {
      const matchStat = accFilters.status.some(
        (st) => st.toLowerCase() === item.status.toLowerCase()
      );
      if (!matchStat) return false;
    }

    return true;
  });

  // Filtered Stock
  const filteredStock = stock.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.linkedBox.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter by Linked box
    if (!stockFilters.linkedBox.includes('All')) {
      const matchMat = stockFilters.linkedBox.some(
        (m) => m.toLowerCase() === item.boxMaterial?.toLowerCase()
      );
      if (!matchMat) return false;
    }

    // Filter by Status
    if (!stockFilters.status.includes('All')) {
      const matchStat = stockFilters.status.some(
        (st) => st.toLowerCase() === item.status.toLowerCase()
      );
      if (!matchStat) return false;
    }

    // Filter by Location
    if (!stockFilters.location.includes('All')) {
      const matchLoc = stockFilters.location.some((loc) =>
        item.location.toLowerCase().includes(loc.toLowerCase())
      );
      if (!matchLoc) return false;
    }

    return true;
  });

  // Filtered Categories
  const filteredCategories = categories.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.createdBy.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '30px',
      }}
      onClick={() => {
        if (activeActionRowId) setActiveActionRowId(null);
        if (showTimeDropdown) setShowTimeDropdown(false);
      }}
    >
      {/* 1. Page Header matching Image 3, 4, 5 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 4px 0',
            }}
          >
            Box accessories
          </h1>
          <p style={{ fontSize: '13px', color: subtextColor, margin: 0 }}>
            View and manage all accessories in stock
          </p>
        </div>

        {/* Action Buttons: New accessory (yellow), New category (white), Time filter ▾ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => router.push('/inventory/accessories/new')}
            style={{
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              borderRadius: '8px',
              border: 'none',
              padding: '9px 18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span>New accessory</span>
          </button>

          <button
            type="button"
            onClick={() => setShowNewCategoryModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontWeight: 600,
              fontSize: '13px',
              borderRadius: '8px',
              border: 'none',
              padding: '9px 18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span>New category</span>
          </button>

          {/* Time range selector: This week ▾ with rolling dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowTimeDropdown((prev) => !prev);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: innerCardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                color: subtextColor,
                cursor: 'pointer',
                gap: '6px',
              }}
            >
              <span>{timeRange}</span>
              <ChevronDown size={14} color={subtextColor} />
            </div>

            {showTimeDropdown && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '6px',
                  minWidth: '140px',
                  zIndex: 60,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                {['Today', 'This week', 'This month', 'Last 30 days'].map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setTimeRange(option);
                      setShowTimeDropdown(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      fontSize: '13px',
                      color: timeRange === option ? yellowColor : textColor,
                      fontWeight: timeRange === option ? 600 : 400,
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
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Stat Cards Grid (5 Cards matching Images 3, 4, 5) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: '14px',
        }}
      >
        {/* Card 1: Total Accessories */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor, fontWeight: 500 }}>
            Total Accessories
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>5</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
            +0% today
          </div>
        </div>

        {/* Card 2: Total Accessories Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor, fontWeight: 500 }}>
            Total Accessories Units
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>
            12,000,000
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
            +12% today
          </div>
        </div>

        {/* Card 3: Available Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor, fontWeight: 500 }}>
            Available Units
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>7,935</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
            +12% today
          </div>
        </div>

        {/* Card 4: Installed Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor, fontWeight: 500 }}>
            Installed Units
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>30,908</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
            +2% today
          </div>
        </div>

        {/* Card 5: Faulty Units */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '12px', color: subtextColor, fontWeight: 500 }}>
            Faulty Units
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: textColor }}>2,050</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
            +4% today
          </div>
        </div>
      </div>

      {/* 3. Main Section Container (Border 1: Outer container separating from header) */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Top Header of Section: 3 Tabs (Accessories, Stock, Category) + Search + Filter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* 3 Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {(['Accessories', 'Stock', 'Category'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? yellowColor : subtextColor,
                    cursor: 'pointer',
                    padding: '6px 0',
                    borderBottom: isActive ? `2px solid ${yellowColor}` : '2px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Right: Search Input + Filter Button (Only on Accessories & Stock tabs) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '210px',
                  height: '36px',
                  backgroundColor: innerCardBg,
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

            {/* Filter button: only shown on Accessories and Stock tabs */}
            {activeTab !== 'Category' && (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'Accessories') {
                    setShowAccessoriesFilter(true);
                  } else if (activeTab === 'Stock') {
                    setShowStockFilter(true);
                  }
                }}
                style={{
                  backgroundColor: innerCardBg,
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
            )}
          </div>
        </div>

        {/* Border 2: Inner container holding the main table */}
        <div
          style={{
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            overflow: 'visible',
          }}
        >
          {/* TAB 1: ACCESSORIES TABLE (Matching Image 3) */}
          {activeTab === 'Accessories' && (
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
                    <th style={{ padding: '14px 18px' }}>Accessories</th>
                    <th style={{ padding: '14px 14px' }}>SKU</th>
                    <th style={{ padding: '14px 14px' }}>Category</th>
                    <th style={{ padding: '14px 14px' }}>Linked box</th>
                    <th style={{ padding: '14px 14px' }}>Amount</th>
                    <th style={{ padding: '14px 14px' }}>Status</th>
                    <th style={{ padding: '14px 14px' }}>No. Available</th>
                    <th style={{ padding: '14px 14px' }}>No. Assigned</th>
                    <th style={{ padding: '14px 14px' }}>No. Installed</th>
                    <th style={{ padding: '14px 14px' }}>No. Faulty</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccessories.map((row, index) => {
                    const isActionOpen = activeActionRowId === row.id;
                    const isNearBottom = index >= filteredAccessories.length - 2;

                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: `1px solid ${borderColor}`,
                          fontSize: '13px',
                          color: textColor,
                        }}
                      >
                        {/* Accessories: Thumbnail + Name */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '6px',
                                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <img
                                src={row.image}
                                alt={row.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                onError={(e) => {
                                  (e.currentTarget as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <span style={{ fontWeight: 600, color: textColor }}>
                              {row.name}
                            </span>
                          </div>
                        </td>

                        {/* SKU */}
                        <td style={{ padding: '14px 14px', color: subtextColor, fontSize: '12px' }}>
                          {row.sku}
                        </td>

                        {/* Category */}
                        <td style={{ padding: '14px 14px' }}>{row.category}</td>

                        {/* Linked Box */}
                        <td style={{ padding: '14px 14px' }}>{row.linkedBox}</td>

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
                        <td style={{ padding: '14px 14px' }}>{row.noInstalled.toLocaleString()}</td>
                        <td style={{ padding: '14px 14px' }}>{row.noFaulty}</td>

                        {/* Action Column with Dropdown: view, edit, discontinue (on/off toggle) */}
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

                          {isActionOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'absolute',
                                ...(isNearBottom
                                  ? { bottom: '100%', marginBottom: '4px' }
                                  : { top: '100%', marginTop: '4px' }),
                                right: '18px',
                                backgroundColor: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: '10px',
                                padding: '6px',
                                minWidth: '170px',
                                zIndex: 50,
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                                textAlign: 'left',
                              }}
                            >
                              {/* View */}
                              <div
                                onClick={() => {
                                  setActiveActionRowId(null);
                                  router.push(`/inventory/accessories/${row.id}`);
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
                                  router.push(`/inventory/accessories/${row.id}/edit`);
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

                              {/* Discontinue with toggle button */}
                              <div
                                onClick={() => handleToggleDiscontinue(row.id)}
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
                                    backgroundColor:
                                      row.status === 'Discontinue'
                                        ? '#EF4444'
                                        : isLightMode
                                        ? '#E5E7EB'
                                        : '#3F3F46',
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
                                      left: row.status === 'Discontinue' ? '14px' : '2px',
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
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: STOCK TABLE (Matching Image 4) */}
          {activeTab === 'Stock' && (
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
                    <th style={{ padding: '14px 18px' }}>Accessories</th>
                    <th style={{ padding: '14px 14px' }}>SKU</th>
                    <th style={{ padding: '14px 14px' }}>Category</th>
                    <th style={{ padding: '14px 14px' }}>Linked box</th>
                    <th style={{ padding: '14px 14px' }}>Status</th>
                    <th style={{ padding: '14px 14px' }}>No. Available</th>
                    <th style={{ padding: '14px 14px' }}>No. Assigned</th>
                    <th style={{ padding: '14px 14px' }}>No. Installed</th>
                    <th style={{ padding: '14px 14px' }}>No. Faulty</th>
                    <th style={{ padding: '14px 14px' }}>Location</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.map((row, index) => {
                    const isActionOpen = activeActionRowId === row.id;
                    const isNearBottom = index >= filteredStock.length - 2;

                    const statusBg =
                      row.status === 'Available'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : row.status === 'Low stock'
                        ? 'rgba(245, 158, 11, 0.15)'
                        : 'rgba(239, 68, 68, 0.15)';

                    const statusColor =
                      row.status === 'Available'
                        ? '#10B981'
                        : row.status === 'Low stock'
                        ? '#F59E0B'
                        : '#EF4444';

                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: `1px solid ${borderColor}`,
                          fontSize: '13px',
                          color: textColor,
                        }}
                      >
                        {/* Accessories */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '6px',
                                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <img
                                src={row.image}
                                alt={row.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                onError={(e) => {
                                  (e.currentTarget as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <span style={{ fontWeight: 600, color: textColor }}>
                              {row.name}
                            </span>
                          </div>
                        </td>

                        {/* SKU */}
                        <td style={{ padding: '14px 14px', color: subtextColor, fontSize: '12px' }}>
                          {row.sku}
                        </td>

                        {/* Category */}
                        <td style={{ padding: '14px 14px' }}>{row.category}</td>

                        {/* Linked Box */}
                        <td style={{ padding: '14px 14px' }}>{row.linkedBox}</td>

                        {/* Status */}
                        <td style={{ padding: '14px 14px' }}>
                          <span
                            style={{
                              padding: '4px 12px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              backgroundColor: statusBg,
                              color: statusColor,
                            }}
                          >
                            {row.status}
                          </span>
                        </td>

                        {/* Metrics */}
                        <td style={{ padding: '14px 14px' }}>{row.noAvailable}</td>
                        <td style={{ padding: '14px 14px' }}>{row.noAssigned}</td>
                        <td style={{ padding: '14px 14px' }}>{row.noInstalled.toLocaleString()}</td>
                        <td style={{ padding: '14px 14px' }}>{row.noFaulty}</td>

                        {/* Location */}
                        <td style={{ padding: '14px 14px', fontSize: '12px', color: subtextColor }}>
                          {row.location}
                        </td>

                        {/* Action Column with Dropdown: view and update stock */}
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

                          {isActionOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'absolute',
                                ...(isNearBottom
                                  ? { bottom: '100%', marginBottom: '4px' }
                                  : { top: '100%', marginTop: '4px' }),
                                right: '18px',
                                backgroundColor: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: '10px',
                                padding: '6px',
                                minWidth: '170px',
                                zIndex: 50,
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                                textAlign: 'left',
                              }}
                            >
                              {/* View */}
                              <div
                                onClick={() => {
                                  setActiveActionRowId(null);
                                  router.push(
                                    `/inventory/accessories/${row.id}?view=units&loc=${encodeURIComponent(
                                      row.location
                                    )}`
                                  );
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
                                  setShowUpdateStockModal({
                                    id: row.id,
                                    name: row.name,
                                    current: row.noAvailable,
                                  });
                                  setUpdateStockQty(row.noAvailable.toString());
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
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: CATEGORY TABLE (Matching Image 5) */}
          {activeTab === 'Category' && (
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
                    <th style={{ padding: '14px 18px' }}>Category</th>
                    <th style={{ padding: '14px 14px' }}>Description</th>
                    <th style={{ padding: '14px 14px' }}>Created</th>
                    <th style={{ padding: '14px 14px' }}>Last updated</th>
                    <th style={{ padding: '14px 14px' }}>Accessories</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((row, index) => {
                    const isActionOpen = activeActionRowId === row.id;
                    const isNearBottom = index >= filteredCategories.length - 2;

                    return (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: `1px solid ${borderColor}`,
                          fontSize: '13px',
                          color: textColor,
                        }}
                      >
                        {/* Category Name */}
                        <td style={{ padding: '14px 18px', fontWeight: 600 }}>
                          {row.name}
                        </td>

                        {/* Description (SKU format) */}
                        <td style={{ padding: '14px 14px', color: subtextColor, fontSize: '12px' }}>
                          {row.description}
                        </td>

                        {/* Created: Name & Date */}
                        <td style={{ padding: '14px 14px' }}>
                          <div style={{ fontWeight: 500, color: textColor }}>
                            {row.createdBy.name}
                          </div>
                          <div style={{ fontSize: '11px', color: subtextColor }}>
                            {row.createdBy.timestamp}
                          </div>
                        </td>

                        {/* Last updated: Name & Date */}
                        <td style={{ padding: '14px 14px' }}>
                          <div style={{ fontWeight: 500, color: textColor }}>
                            {row.lastUpdated.name}
                          </div>
                          <div style={{ fontSize: '11px', color: subtextColor }}>
                            {row.lastUpdated.timestamp}
                          </div>
                        </td>

                        {/* Accessories Count */}
                        <td style={{ padding: '14px 14px', fontWeight: 600 }}>
                          {row.accessoriesCount}
                        </td>

                        {/* Action Column with Dropdown: view and edit */}
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

                          {isActionOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'absolute',
                                ...(isNearBottom
                                  ? { bottom: '100%', marginBottom: '4px' }
                                  : { top: '100%', marginTop: '4px' }),
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
                                  router.push(`/inventory/accessories/categories/${row.id}`);
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
                                  setEditCategoryTarget(row);
                                  setEditCatName(row.name);
                                  setEditCatDesc(row.description);
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
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer: Pagination matching Images 3, 4, 5 */}
          <div
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: `1px solid ${borderColor}`,
              fontSize: '13px',
              color: subtextColor,
            }}
          >
            <div>
              1 -{' '}
              {activeTab === 'Accessories'
                ? filteredAccessories.length
                : activeTab === 'Stock'
                ? filteredStock.length
                : filteredCategories.length}{' '}
              of 5,000,045
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        </div>
      </div>

      {/* Filter Modal for Accessories Tab */}
      <AccessoriesFilterModal
        isOpen={showAccessoriesFilter}
        onClose={() => setShowAccessoriesFilter(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setAccFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Accessories filters applied successfully',
          });
        }}
      />

      {/* Filter Modal for Stock Tab */}
      <StockFilterModal
        isOpen={showStockFilter}
        onClose={() => setShowStockFilter(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setStockFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters applied',
            message: 'Stock filters applied successfully',
          });
        }}
      />

      {/* New Category Modal matching Image 1 */}
      {showNewCategoryModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setShowNewCategoryModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '430px',
              backgroundColor: '#1C1C1E',
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            {/* Header: Title + Circular (X) button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: textColor, margin: 0 }}>
                New category
              </h3>
              <button
                type="button"
                onClick={() => setShowNewCategoryModal(false)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    backgroundColor: '#242428',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '0 16px',
                    color: textColor,
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <textarea
                  placeholder="Category description"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    backgroundColor: '#242428',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: textColor,
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Bottom Buttons: Discard (light gray) & Save (yellow) side by side */}
              <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategoryModal(false);
                    setNewCatName('');
                    setNewCatDesc('');
                  }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#E5E7EB',
                    color: '#111827',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: yellowColor,
                    color: '#000000',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal matching Image 1 */}
      {editCategoryTarget && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setEditCategoryTarget(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '430px',
              backgroundColor: '#1C1C1E',
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            {/* Header: Title + Circular (X) button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: textColor, margin: 0 }}>
                Edit category
              </h3>
              <button
                type="button"
                onClick={() => setEditCategoryTarget(null)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSaveEditCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  backgroundColor: '#242428',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '10px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                  Category name
                </span>
                <input
                  type="text"
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    fontSize: '14px',
                    fontWeight: 600,
                    outline: 'none',
                    padding: 0,
                  }}
                />
              </div>

              <div
                style={{
                  backgroundColor: '#242428',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '10px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                  Category description
                </span>
                <textarea
                  value={editCatDesc}
                  onChange={(e) => setEditCatDesc(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                    padding: 0,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Bottom Buttons: Discard (light gray) & Save (yellow) side by side */}
              <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setEditCategoryTarget(null)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#E5E7EB',
                    color: '#111827',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: yellowColor,
                    color: '#000000',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Stock Modal */}
      {showUpdateStockModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setShowUpdateStockModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '380px',
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>
                Update Stock
              </h3>
              <button
                onClick={() => setShowUpdateStockModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <p style={{ fontSize: '13px', color: subtextColor, margin: '0 0 12px 0' }}>
                Update available stock quantity for <strong style={{ color: textColor }}>{showUpdateStockModal.name}</strong>
              </p>
              <label style={{ fontSize: '12px', color: subtextColor, display: 'block', marginBottom: '6px' }}>
                Available Quantity
              </label>
              <input
                type="number"
                value={updateStockQty}
                onChange={(e) => setUpdateStockQty(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  backgroundColor: innerCardBg,
                  border: `1px solid ${yellowColor}`,
                  borderRadius: '8px',
                  padding: '0 12px',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 600,
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setShowUpdateStockModal(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUpdatedStock}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save Stock
              </button>
            </div>
          </div>
        </div>
      )}

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
