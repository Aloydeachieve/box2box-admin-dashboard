'use client';

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { TransactionCharts } from './TransactionCharts';
import { TransactionStatsCards } from './TransactionStatsCards';
import { BookingsTab } from './tabs/BookingsTab';
import { EarningsTab } from './tabs/EarningsTab';
import { DepositsTab } from './tabs/DepositsTab';
import { WithdrawalsTab } from './tabs/WithdrawalsTab';
import { BookingsFilterModal, BookingsFilterState } from './modals/BookingsFilterModal';
import { EarningsFilterModal, EarningsFilterState } from './modals/EarningsFilterModal';
import { DepositsFilterModal, DepositsFilterState } from './modals/DepositsFilterModal';
import { WithdrawalsFilterModal, WithdrawalsFilterState } from './modals/WithdrawalsFilterModal';

export const TransactionsView: React.FC = () => {
  const { isLightMode } = useAdmin();

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'Bookings' | 'Earnings' | 'Deposits' | 'Withdrawals' | 'Subscriptions' | 'Hardware sales'
  >('Bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState('This week');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);

  // Filter Modals State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // 1. Bookings Filters
  const [bookingsFilters, setBookingsFilters] = useState<BookingsFilterState>({
    statuses: ['In progress', 'Delivered', 'Stored', 'In storage'],
    types: ['Delivery', 'Storage'],
    duration: 'Today',
  });

  // 2. Earnings Filters
  const [earningsFilters, setEarningsFilters] = useState<EarningsFilterState>({
    statuses: ['Active', 'Inactive'],
    types: ['Rider', 'Box owner'],
    amount: 'All',
    duration: 'Today',
  });

  // 3. Deposits Filters
  const [depositsFilters, setDepositsFilters] = useState<DepositsFilterState>({
    statuses: ['Pending', 'Successful', 'Failed'],
    methods: ['Card', 'Bank transfer', 'Wallet transfer'],
    userTypes: ['Box owner', 'Rider', 'Customer'],
    duration: 'Today',
  });

  // 4. Withdrawals Filters
  const [withdrawalsFilters, setWithdrawalsFilters] = useState<WithdrawalsFilterState>({
    statuses: ['Pending', 'Successful', 'Failed'],
    userTypes: ['Box owner', 'Rider', 'Customer'],
    duration: 'Today',
  });

  // Design Tokens (Rule 6: Zero Extra Contrast & Natural Background)
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';
  const dropdownBg = isLightMode ? '#FFFFFF' : '#1C1C20';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
      onClick={() => setIsPeriodDropdownOpen(false)}
    >
      {/* 1. Header & Period Dropdown */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 4px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Platform Transactions
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: subtextColor,
              margin: 0,
            }}
          >
            Track all financial activity and configure revenue
          </p>
        </div>

        {/* This week filter dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: '12.5px',
              cursor: 'pointer',
            }}
          >
            <span>{period}</span>
            <ChevronDown size={14} color={subtextColor} />
          </button>

          {isPeriodDropdownOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                right: 0,
                top: '38px',
                backgroundColor: dropdownBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '4px',
                zIndex: 20,
                minWidth: '130px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              {['Today', 'This week', 'This month', 'This year'].map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setPeriod(opt);
                    setIsPeriodDropdownOpen(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    fontSize: '12px',
                    color: period === opt ? yellowColor : textColor,
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = isLightMode
                      ? '#F3F4F6'
                      : 'rgba(255, 255, 255, 0.05)')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Top Charts Grid (Modular: Line, Solid Pie, Curved Bars, Gauge) */}
      <TransactionCharts isLightMode={isLightMode} />

      {/* 3. Middle Section: 8 Stat Cards with Edge-to-Edge Draggable Scrolling (Rule 7) */}
      <TransactionStatsCards isLightMode={isLightMode} />

      {/* 4. Decoupled Table Section (Table Decoupling Rule 1) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Decoupled Toolbar (Tabs, Search, Filter hang cleanly directly on page background) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          {/* Table Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', overflowX: 'auto' }}>
            {(
              [
                'Bookings',
                'Earnings',
                'Deposits',
                'Withdrawals',
                'Subscriptions',
                'Hardware sales',
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchQuery('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px 0',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? yellowColor : subtextColor,
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search Input & Filter Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                width: '210px',
              }}
            >
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '12.5px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <Search size={15} color={subtextColor} />
            </div>

            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: 'transparent',
                color: textColor,
                fontSize: '12.5px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <span>Filter</span>
              <ChevronDown size={14} color={subtextColor} />
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'Bookings' && (
          <BookingsTab
            searchQuery={searchQuery}
            filters={bookingsFilters}
            isLightMode={isLightMode}
          />
        )}

        {activeTab === 'Earnings' && (
          <EarningsTab
            searchQuery={searchQuery}
            filters={earningsFilters}
            isLightMode={isLightMode}
          />
        )}

        {activeTab === 'Deposits' && (
          <DepositsTab
            searchQuery={searchQuery}
            filters={depositsFilters}
            isLightMode={isLightMode}
          />
        )}

        {activeTab === 'Withdrawals' && (
          <WithdrawalsTab
            searchQuery={searchQuery}
            filters={withdrawalsFilters}
            isLightMode={isLightMode}
          />
        )}

        {(activeTab === 'Subscriptions' || activeTab === 'Hardware sales') && (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              backgroundColor: isLightMode ? '#FFFFFF' : 'transparent',
              color: subtextColor,
              fontSize: '14px',
            }}
          >
            No {activeTab.toLowerCase()} recorded yet.
          </div>
        )}
      </div>

      {/* Filter Modals per Tab */}
      {activeTab === 'Bookings' && (
        <BookingsFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          isLightMode={isLightMode}
          initialFilters={bookingsFilters}
          onApplyFilters={(f) => setBookingsFilters(f)}
        />
      )}

      {activeTab === 'Earnings' && (
        <EarningsFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          isLightMode={isLightMode}
          initialFilters={earningsFilters}
          onApplyFilters={(f) => setEarningsFilters(f)}
        />
      )}

      {activeTab === 'Deposits' && (
        <DepositsFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          isLightMode={isLightMode}
          initialFilters={depositsFilters}
          onApplyFilters={(f) => setDepositsFilters(f)}
        />
      )}

      {activeTab === 'Withdrawals' && (
        <WithdrawalsFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          isLightMode={isLightMode}
          initialFilters={withdrawalsFilters}
          onApplyFilters={(f) => setWithdrawalsFilters(f)}
        />
      )}
    </div>
  );
};
