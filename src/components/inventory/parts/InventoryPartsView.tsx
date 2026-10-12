'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  X,
  Eye,
  Edit,
  RotateCcw,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import {
  initialBoxParts,
  initialBoxPartsStock,
  initialBoxPartCategories,
  initialBoxPartSuppliers,
  BoxPartItem,
  BoxPartStockItem,
  BoxPartCategoryItem,
  BoxPartSupplierItem,
} from '@/lib/inventoryMockData';
import { PartsFilterModal } from './PartsFilterModal';
import { PartsStockFilterModal } from './PartsStockFilterModal';

export const InventoryPartsView: React.FC = () => {
  const router = useRouter();
  const { isLightMode, setHeaderActions, setCustomBack } = useAdmin();

  // Active Tab: 'parts' | 'stock' | 'category' | 'supplier'
  const [activeTab, setActiveTab] = useState<'parts' | 'stock' | 'category' | 'supplier'>('parts');

  // Datasets
  const [partsList, setPartsList] = useState<BoxPartItem[]>(initialBoxParts);
  const [stockList, setStockList] = useState<BoxPartStockItem[]>(initialBoxPartsStock);
  const [categoriesList, setCategoriesList] = useState<BoxPartCategoryItem[]>(initialBoxPartCategories);
  const [suppliersList, setSuppliersList] = useState<BoxPartSupplierItem[]>(initialBoxPartSuppliers);

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Rolling time range dropdown
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('This week');
  const timeRanges = ['Today', 'This week', 'This month', 'Last 30 days'];

  // Table action dropdown state (row id)
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Filter Modals
  const [showPartsFilterModal, setShowPartsFilterModal] = useState(false);
  const [showStockFilterModal, setShowStockFilterModal] = useState(false);

  // Filter criteria
  const [partsFilters, setPartsFilters] = useState<{ category: string[]; status: string[] }>({
    category: ['All'],
    status: ['All'],
  });
  const [stockFilters, setStockFilters] = useState<{
    category: string[];
    status: string[];
    location: string[];
  }>({
    category: ['All'],
    status: ['All'],
    location: ['All'],
  });

  // Category & Supplier Modals
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const [showNewSupplierModal, setShowNewSupplierModal] = useState(false);
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newSupplierEmail, setNewSupplierEmail] = useState('');
  const [newSupplierLocation, setNewSupplierLocation] = useState('Lagos');

  // Edit / Update Stock Modals
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<BoxPartStockItem | null>(null);
  const [updateStockQty, setUpdateStockQty] = useState('100');

  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<BoxPartCategoryItem | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryDesc, setEditCategoryDesc] = useState('');

  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);
  const [selectedSupplierItem, setSelectedSupplierItem] = useState<BoxPartSupplierItem | null>(null);
  const [editSupplierName, setEditSupplierName] = useState('');
  const [editSupplierEmail, setEditSupplierEmail] = useState('');
  const [editSupplierLocation, setEditSupplierLocation] = useState('Lagos');

  // Toast Notification
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Styling Tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#F9FAFB' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Setup shell header
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(null);
  }, [setHeaderActions, setCustomBack]);

  // Handle Discontinue Toggle on Tab 1 Parts
  const handleToggleDiscontinue = (id: string) => {
    setPartsList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const willBeDiscontinued = item.status === 'Active';
          const newStatus = willBeDiscontinued ? 'Discontinue' : 'Active';
          setActiveToast({
            type: willBeDiscontinued ? 'disable' : 'success',
            title: willBeDiscontinued ? 'Part Discontinued' : 'Part Activated',
            message: willBeDiscontinued
              ? `You successfully discontinued ${item.name} (${item.sku})`
              : `${item.name} is now active and in production`,
          });
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
    setActiveActionRowId(null);
  };

  // Filtered Parts (Tab 1)
  const filteredParts = partsList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (!partsFilters.category.includes('All')) {
      if (!partsFilters.category.some((c) => c.toLowerCase() === item.category.toLowerCase())) {
        return false;
      }
    }
    if (!partsFilters.status.includes('All')) {
      if (!partsFilters.status.some((s) => s.toLowerCase() === item.status.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  // Filtered Stock (Tab 2)
  const filteredStock = stockList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (!stockFilters.category.includes('All')) {
      if (!stockFilters.category.some((c) => c.toLowerCase() === item.category.toLowerCase())) {
        return false;
      }
    }
    if (!stockFilters.status.includes('All')) {
      if (!stockFilters.status.some((s) => s.toLowerCase() === item.status.toLowerCase())) {
        return false;
      }
    }
    if (!stockFilters.location.includes('All')) {
      if (!stockFilters.location.some((l) => item.location.toLowerCase().includes(l.toLowerCase()))) {
        return false;
      }
    }
    return true;
  });

  // Filtered Categories (Tab 3)
  const filteredCategories = categoriesList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Suppliers (Tab 4)
  const filteredSuppliers = suppliersList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stat Cards Data matching Figma Images 1-4
  const stats = [
    { title: 'Total Parts', value: '5', change: '+0% today' },
    { title: 'Total Linked Accessories', value: '12,000,000', change: '+12% today' },
    { title: 'Total Linked Boxes', value: '7,935', change: '+12% today' },
    { title: 'Available Units', value: '30,908', change: '+2% today' },
    { title: 'Faulty Parts', value: '2,050', change: '+4% today' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '40px',
      }}
      onClick={() => {
        if (activeActionRowId) setActiveActionRowId(null);
        if (showTimeDropdown) setShowTimeDropdown(false);
      }}
    >
      {/* TOP HEADER CONTROLS: Action Buttons & Rolling Time Dropdown */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Title block */}
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: textColor }}>
            Box parts
          </h1>
          <p style={{ fontSize: '13px', color: subtextColor, margin: '4px 0 0 0' }}>
            View and manage all parts in stock
          </p>
        </div>

        {/* Buttons matching Images 1-4 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* New part (yellow) */}
          <button
            type="button"
            onClick={() => router.push('/inventory/parts/new')}
            style={{
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            New part
          </button>

          {/* New category (white/silver pill) */}
          <button
            type="button"
            onClick={() => setShowNewCategoryModal(true)}
            style={{
              backgroundColor: isLightMode ? '#E5E7EB' : '#FFFFFF',
              color: '#111827',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            New category
          </button>

          {/* New supplier (yellow outline / text) */}
          <button
            type="button"
            onClick={() => setShowNewSupplierModal(true)}
            style={{
              backgroundColor: isLightMode ? '#FEF9C3' : '#1A1813',
              color: yellowColor,
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: '8px',
              border: `1px solid ${yellowColor}`,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            New supplier
          </button>

          {/* Rolling time range dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTimeDropdown(!showTimeDropdown);
              }}
              style={{
                backgroundColor: inputBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '9px 14px',
                color: subtextColor,
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <span>{selectedTimeRange}</span>
              <ChevronDown size={14} />
            </button>

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
                  zIndex: 40,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                }}
              >
                {timeRanges.map((range) => (
                  <div
                    key={range}
                    onClick={() => {
                      setSelectedTimeRange(range);
                      setShowTimeDropdown(false);
                      setActiveToast({
                        type: 'success',
                        title: 'Time Range Updated',
                        message: `Parts overview filtered by ${range}`,
                      });
                    }}
                    style={{
                      padding: '8px 10px',
                      fontSize: '12px',
                      color: selectedTimeRange === range ? yellowColor : textColor,
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontWeight: selectedTimeRange === range ? 600 : 500,
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = isLightMode
                        ? '#F3F4F6'
                        : '#222226')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5 STAT CARDS matching Images 1-4 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: '16px',
        }}
      >
        {stats.map((st) => (
          <div
            key={st.title}
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: `1px solid ${borderColor}`,
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
              {st.title}
            </span>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>
              {st.value}
            </div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
              {st.change}
            </span>
          </div>
        ))}
      </div>

      {/* MAIN TABLE CONTAINER WITH DOUBLE BORDER ARCHITECTURE */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* TAB NAVIGATION & SEARCH / FILTER BAR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* 4 Tabs: Parts, Stock, Category, Supplier */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('parts')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'parts' ? yellowColor : subtextColor,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0',
                borderBottom: activeTab === 'parts' ? `2px solid ${yellowColor}` : 'none',
              }}
            >
              Parts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stock')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'stock' ? yellowColor : subtextColor,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0',
                borderBottom: activeTab === 'stock' ? `2px solid ${yellowColor}` : 'none',
              }}
            >
              Stock
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('category')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'category' ? yellowColor : subtextColor,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0',
                borderBottom: activeTab === 'category' ? `2px solid ${yellowColor}` : 'none',
              }}
            >
              Category
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('supplier')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'supplier' ? yellowColor : subtextColor,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 0',
                borderBottom: activeTab === 'supplier' ? `2px solid ${yellowColor}` : 'none',
              }}
            >
              Supplier
            </button>
          </div>

          {/* Search bar & Filter button (Filter only on Parts & Stock) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '8px 36px 8px 14px',
                  fontSize: '13px',
                  color: textColor,
                  outline: 'none',
                  width: '200px',
                }}
              />
              <Search
                size={16}
                color={subtextColor}
                style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
              />
            </div>

            {/* Filter button - ONLY on Tab 1 (Parts) & Tab 2 (Stock) */}
            {activeTab === 'parts' && (
              <button
                type="button"
                onClick={() => setShowPartsFilterModal(true)}
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '8px 14px',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
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

            {activeTab === 'stock' && (
              <button
                type="button"
                onClick={() => setShowStockFilterModal(true)}
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '8px 14px',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 500,
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

        {/* TAB 1: PARTS TABLE (Matching Image 1) */}
        {activeTab === 'parts' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Part
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    SKU
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
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500, textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isLightMode
                        ? 'rgba(0, 0, 0, 0.02)'
                        : 'rgba(255, 255, 255, 0.02)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* Part thumbnail & name */}
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '8px',
                            backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                          />
                        </div>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.name}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.sku}
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.category}
                    </td>

                    {/* Status pill badge */}
                    <td style={{ padding: '14px 14px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
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

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.noAvailable.toLocaleString()}
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.noInstalled.toLocaleString()}
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.noFaulty}
                    </td>

                    {/* Action 3-dots */}
                    <td style={{ padding: '14px 14px', textAlign: 'right', position: 'relative' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionRowId(activeActionRowId === row.id ? null : row.id);
                        }}
                        aria-label="Actions"
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

                      {/* Dropdown with options: view, edit, discontinue(on/off) */}
                      {activeActionRowId === row.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '100%',
                            backgroundColor: cardBg,
                            border: `1px solid ${borderColor}`,
                            borderRadius: '10px',
                            padding: '6px',
                            minWidth: '175px',
                            zIndex: 50,
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                            textAlign: 'left',
                          }}
                        >
                          {/* View */}
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setActiveToast({
                                type: 'success',
                                title: 'Part Details',
                                message: `Viewing ${row.name} (${row.sku})`,
                              });
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <Eye size={14} color={subtextColor} />
                            <span>View</span>
                          </div>

                          {/* Edit */}
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setActiveToast({
                                type: 'success',
                                title: 'Edit Part',
                                message: `Editing ${row.name} (${row.sku})`,
                              });
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <Edit size={14} color={subtextColor} />
                            <span>Edit</span>
                          </div>

                          {/* Discontinue toggle */}
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <span>Discontinue</span>
                            <div
                              style={{
                                width: '28px',
                                height: '16px',
                                borderRadius: '999px',
                                backgroundColor:
                                  row.status === 'Discontinue'
                                    ? yellowColor
                                    : isLightMode
                                    ? '#D1D5DB'
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
                                  backgroundColor:
                                    row.status === 'Discontinue' ? '#000000' : '#FFFFFF',
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: STOCK TABLE (Matching Image 2) */}
        {activeTab === 'stock' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Part
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    SKU
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
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Location
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500, textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isLightMode
                        ? 'rgba(0, 0, 0, 0.02)'
                        : 'rgba(255, 255, 255, 0.02)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* Part thumbnail & name */}
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '8px',
                            backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                          />
                        </div>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.name}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.sku}
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.category}
                    </td>

                    {/* Status badge: Available (green), Out of stock (red), Low stock (orange) */}
                    <td style={{ padding: '14px 14px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor:
                            row.status === 'Available'
                              ? 'rgba(16, 185, 129, 0.15)'
                              : row.status === 'Out of stock'
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(245, 158, 11, 0.15)',
                          color:
                            row.status === 'Available'
                              ? '#10B981'
                              : row.status === 'Out of stock'
                              ? '#EF4444'
                              : '#F59E0B',
                        }}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.noAvailable.toLocaleString()}
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.noInstalled.toLocaleString()}
                    </td>

                    <td style={{ padding: '14px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.noFaulty}
                    </td>

                    {/* Location */}
                    <td style={{ padding: '14px 14px', fontSize: '12px', color: subtextColor, maxWidth: '200px' }}>
                      {row.location}
                    </td>

                    {/* Action 3-dots */}
                    <td style={{ padding: '14px 14px', textAlign: 'right', position: 'relative' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionRowId(activeActionRowId === row.id ? null : row.id);
                        }}
                        aria-label="Actions"
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

                      {/* Dropdown with options: view and update stock */}
                      {activeActionRowId === row.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '100%',
                            backgroundColor: cardBg,
                            border: `1px solid ${borderColor}`,
                            borderRadius: '10px',
                            padding: '6px',
                            minWidth: '175px',
                            zIndex: 50,
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                            textAlign: 'left',
                          }}
                        >
                          {/* View */}
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setActiveToast({
                                type: 'success',
                                title: 'Stock Details',
                                message: `Viewing stock for ${row.name} at ${row.location}`,
                              });
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <Eye size={14} color={subtextColor} />
                            <span>View</span>
                          </div>

                          {/* Update stock */}
                          <div
                            onClick={() => {
                              setSelectedStockItem(row);
                              setUpdateStockQty(row.noAvailable.toString());
                              setActiveActionRowId(null);
                              setShowUpdateStockModal(true);
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <RotateCcw size={14} color={subtextColor} />
                            <span>Update stock</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: CATEGORY TABLE (Matching Image 3) */}
        {activeTab === 'category' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Category
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Description
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Created
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Last updated
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Parts
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500, textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isLightMode
                        ? 'rgba(0, 0, 0, 0.02)'
                        : 'rgba(255, 255, 255, 0.02)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '16px 14px', fontSize: '13px', color: textColor, fontWeight: 600 }}>
                      {row.name}
                    </td>

                    <td style={{ padding: '16px 14px', fontSize: '13px', color: subtextColor }}>
                      {row.description}
                    </td>

                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.createdBy.name}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                          {row.createdBy.timestamp}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.lastUpdated.name}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                          {row.lastUpdated.timestamp}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 14px', fontSize: '13px', color: textColor, fontWeight: 600 }}>
                      {row.partsCount}
                    </td>

                    {/* Action 3-dots */}
                    <td style={{ padding: '16px 14px', textAlign: 'right', position: 'relative' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionRowId(activeActionRowId === row.id ? null : row.id);
                        }}
                        aria-label="Actions"
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

                      {/* Dropdown with options: view and edit */}
                      {activeActionRowId === row.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '100%',
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
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setActiveToast({
                                type: 'success',
                                title: 'Category Details',
                                message: `Viewing ${row.name}`,
                              });
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <Eye size={14} color={subtextColor} />
                            <span>View</span>
                          </div>

                          <div
                            onClick={() => {
                              setSelectedCategoryItem(row);
                              setEditCategoryName(row.name);
                              setEditCategoryDesc(row.description);
                              setActiveActionRowId(null);
                              setShowEditCategoryModal(true);
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <Edit size={14} color={subtextColor} />
                            <span>Edit</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: SUPPLIER TABLE (Matching Image 4) */}
        {activeTab === 'supplier' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Supplier
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Location
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Created
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Last updated
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500 }}>
                    Quantity supplied
                  </th>
                  <th style={{ padding: '12px 14px', fontSize: '11px', color: subtextColor, fontWeight: 500, textAlign: 'right' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = isLightMode
                        ? 'rgba(0, 0, 0, 0.02)'
                        : 'rgba(255, 255, 255, 0.02)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.name}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                          {row.email}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 14px', fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {row.location}
                    </td>

                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.createdBy.name}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                          {row.createdBy.timestamp}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', color: textColor, fontWeight: 600 }}>
                          {row.lastUpdated.name}
                        </span>
                        <span style={{ fontSize: '11px', color: subtextColor, marginTop: '2px' }}>
                          {row.lastUpdated.timestamp}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 14px', fontSize: '13px', color: textColor, fontWeight: 600 }}>
                      {row.quantitySupplied}
                    </td>

                    {/* Action 3-dots */}
                    <td style={{ padding: '16px 14px', textAlign: 'right', position: 'relative' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionRowId(activeActionRowId === row.id ? null : row.id);
                        }}
                        aria-label="Actions"
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

                      {/* Dropdown with options: view and edit */}
                      {activeActionRowId === row.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '100%',
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
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setActiveToast({
                                type: 'success',
                                title: 'Supplier Details',
                                message: `Viewing ${row.name}`,
                              });
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <Eye size={14} color={subtextColor} />
                            <span>View</span>
                          </div>

                          <div
                            onClick={() => {
                              setSelectedSupplierItem(row);
                              setEditSupplierName(row.name);
                              setEditSupplierEmail(row.email);
                              setEditSupplierLocation(row.location);
                              setActiveActionRowId(null);
                              setShowEditSupplierModal(true);
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = isLightMode
                                ? '#F3F4F6'
                                : '#222226')
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                          >
                            <Edit size={14} color={subtextColor} />
                            <span>Edit</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION ROW matching Images 1-4 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: `1px solid ${borderColor}`,
            fontSize: '12px',
            color: subtextColor,
          }}
        >
          <div>1 - 100 of 5,000,045</div>
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

      {/* FILTER MODAL FOR TAB 1 (PARTS) */}
      <PartsFilterModal
        isOpen={showPartsFilterModal}
        onClose={() => setShowPartsFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setPartsFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Parts filter applied successfully',
          });
        }}
      />

      {/* FILTER MODAL FOR TAB 2 (STOCK) */}
      <PartsStockFilterModal
        isOpen={showStockFilterModal}
        onClose={() => setShowStockFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          setStockFilters(filters);
          setActiveToast({
            type: 'success',
            title: 'Filters Applied',
            message: 'Stock filter applied successfully',
          });
        }}
      />

      {/* NEW CATEGORY MODAL */}
      {showNewCategoryModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowNewCategoryModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
                New category
              </h3>
              <button
                type="button"
                onClick={() => setShowNewCategoryModal(false)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Category name
                </label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Category description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowNewCategoryModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#E5E7EB',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newCategoryName.trim()) return;
                  const newCat: BoxPartCategoryItem = {
                    id: `bpc-${Date.now()}`,
                    name: newCategoryName,
                    description: newCategoryDesc || 'Description of category',
                    createdBy: { name: 'Admin', timestamp: 'Today' },
                    lastUpdated: { name: 'Admin', timestamp: 'Today' },
                    partsCount: 0,
                  };
                  setCategoriesList((prev) => [newCat, ...prev]);
                  setShowNewCategoryModal(false);
                  setNewCategoryName('');
                  setNewCategoryDesc('');
                  setActiveToast({
                    type: 'success',
                    title: 'Category Created',
                    message: `Category "${newCategoryName}" created successfully`,
                  });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW SUPPLIER MODAL */}
      {showNewSupplierModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowNewSupplierModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
                New supplier
              </h3>
              <button
                type="button"
                onClick={() => setShowNewSupplierModal(false)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Supplier name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abc ltd"
                  value={newSupplierName}
                  onChange={(e) => setNewSupplierName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Supplier email
                </label>
                <input
                  type="email"
                  placeholder="e.g. supply@abc.com"
                  value={newSupplierEmail}
                  onChange={(e) => setNewSupplierEmail(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lagos"
                  value={newSupplierLocation}
                  onChange={(e) => setNewSupplierLocation(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowNewSupplierModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#E5E7EB',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newSupplierName.trim()) return;
                  const newSup: BoxPartSupplierItem = {
                    id: `bpsup-${Date.now()}`,
                    name: newSupplierName,
                    email: newSupplierEmail || 'supply@company.com',
                    location: newSupplierLocation || 'Lagos',
                    createdBy: { name: 'Admin', timestamp: 'Today' },
                    lastUpdated: { name: 'Admin', timestamp: 'Today' },
                    quantitySupplied: 0,
                  };
                  setSuppliersList((prev) => [newSup, ...prev]);
                  setShowNewSupplierModal(false);
                  setNewSupplierName('');
                  setNewSupplierEmail('');
                  setActiveToast({
                    type: 'success',
                    title: 'Supplier Added',
                    message: `Supplier "${newSupplierName}" added successfully`,
                  });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE STOCK MODAL (FROM TAB 2) */}
      {showUpdateStockModal && selectedStockItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowUpdateStockModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '380px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
                Update stock
              </h3>
              <button
                type="button"
                onClick={() => setShowUpdateStockModal(false)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
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

            <div>
              <span style={{ fontSize: '12px', color: subtextColor }}>Part:</span>
              <div style={{ fontSize: '14px', fontWeight: 600, color: textColor, marginTop: '2px' }}>
                {selectedStockItem.name} ({selectedStockItem.sku})
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                Available quantity
              </label>
              <input
                type="number"
                value={updateStockQty}
                onChange={(e) => setUpdateStockQty(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: inputBg,
                  border: `1px solid ${yellowColor}`,
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowUpdateStockModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#E5E7EB',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  const qty = parseInt(updateStockQty, 10) || 0;
                  setStockList((prev) =>
                    prev.map((s) =>
                      s.id === selectedStockItem.id
                        ? {
                            ...s,
                            noAvailable: qty,
                            status: qty === 0 ? 'Out of stock' : qty < 50 ? 'Low stock' : 'Available',
                          }
                        : s
                    )
                  );
                  setShowUpdateStockModal(false);
                  setActiveToast({
                    type: 'success',
                    title: 'Stock Updated',
                    message: `Stock for ${selectedStockItem.name} updated to ${qty}`,
                  });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {showEditCategoryModal && selectedCategoryItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowEditCategoryModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
                Edit category
              </h3>
              <button
                type="button"
                onClick={() => setShowEditCategoryModal(false)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Category name
                </label>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Category description
                </label>
                <textarea
                  rows={3}
                  value={editCategoryDesc}
                  onChange={(e) => setEditCategoryDesc(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowEditCategoryModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#E5E7EB',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategoriesList((prev) =>
                    prev.map((c) =>
                      c.id === selectedCategoryItem.id
                        ? { ...c, name: editCategoryName, description: editCategoryDesc }
                        : c
                    )
                  );
                  setShowEditCategoryModal(false);
                  setActiveToast({
                    type: 'success',
                    title: 'Category Updated',
                    message: `Category "${editCategoryName}" updated successfully`,
                  });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SUPPLIER MODAL */}
      {showEditSupplierModal && selectedSupplierItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px',
          }}
          onClick={() => setShowEditSupplierModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: cardBg,
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, margin: 0 }}>
                Edit supplier
              </h3>
              <button
                type="button"
                onClick={() => setShowEditSupplierModal(false)}
                style={{
                  background: 'none',
                  border: `1px solid ${subtextColor}`,
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Supplier name
                </label>
                <input
                  type="text"
                  value={editSupplierName}
                  onChange={(e) => setEditSupplierName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Supplier email
                </label>
                <input
                  type="email"
                  value={editSupplierEmail}
                  onChange={(e) => setEditSupplierEmail(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: subtextColor, fontWeight: 500, display: 'block', marginBottom: '6px' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={editSupplierLocation}
                  onChange={(e) => setEditSupplierLocation(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: textColor,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowEditSupplierModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#E5E7EB',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  setSuppliersList((prev) =>
                    prev.map((s) =>
                      s.id === selectedSupplierItem.id
                        ? {
                            ...s,
                            name: editSupplierName,
                            email: editSupplierEmail,
                            location: editSupplierLocation,
                          }
                        : s
                    )
                  );
                  setShowEditSupplierModal(false);
                  setActiveToast({
                    type: 'success',
                    title: 'Supplier Updated',
                    message: `Supplier "${editSupplierName}" updated successfully`,
                  });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: yellowColor,
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Save
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
