'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SlidableStats } from '@/components/dashboard/SlidableStats';
import { HeatMapCard } from '@/components/dashboard/HeatMapCard';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { DashboardTables } from '@/components/dashboard/DashboardTables';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { UsersManagementView } from '@/components/dashboard/UsersManagementView';
import { UserProfileDetailView } from '@/components/dashboard/UserProfileDetailView';
import { BoxRegistrationView } from '@/components/dashboard/box/BoxRegistrationView';

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLightMode, setIsLightMode] = useState(false);
  const [selectedProfileUserId, setSelectedProfileUserId] = useState<string | null>(null);

  const getHeaderTitle = () => {
    if (selectedProfileUserId) return 'Aku Cynthia';
    if (activeTab === 'users') return 'Users';
    if (activeTab === 'box_regt') return 'Box regt.';
    if (activeTab === 'inventory') return 'Inventory';
    if (activeTab === 'orders') return 'Orders';
    if (activeTab === 'rewards') return 'Rewards';
    if (activeTab === 'admin_regt') return 'Admin regt.';
    if (activeTab === 'transactions') return 'Transactions';
    if (activeTab === 'support') return 'Support';
    if (activeTab === 'fraud_alert') return 'Fraud alert';
    if (activeTab === 'account') return 'Account';
    return 'Dashboard';
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: isLightMode ? '#F4F5F7' : '#0F0F12',
        color: isLightMode ? '#111827' : '#FFFFFF',
        fontFamily: 'var(--font-outfit), sans-serif',
        overflowX: 'hidden',
        transition: 'background-color 0.2s, color 0.2s',
      }}
    >
      {/* 1. Left Navigation Sidebar */}
      <div className={mobileSidebarOpen ? 'sidebar-mobile-visible' : 'sidebar-desktop-wrapper'}>
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeTab={activeTab}
          isLightMode={isLightMode}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSelectedProfileUserId(null);
            setMobileSidebarOpen(false);
          }}
        />
      </div>

      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 45,
          }}
          className="show-on-mobile-btn"
        />
      )}

      {/* 2. Main Layout Area (Extends from Left Sidebar across to far right edge) */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Full-width Top Header: spans all the way across to the right screen edge */}
        <DashboardHeader
          title={getHeaderTitle()}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isLightMode={isLightMode}
          onToggleTheme={() => setIsLightMode(!isLightMode)}
        />

        {/* Content container underneath Header */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          {/* Scrollable Body Content */}
          <main
            style={{
              flex: 1,
              minWidth: 0,
              padding: '20px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {selectedProfileUserId ? (
              <UserProfileDetailView
                userId={selectedProfileUserId}
                onBack={() => setSelectedProfileUserId(null)}
                isLightMode={isLightMode}
              />
            ) : activeTab === 'users' ? (
              <UsersManagementView
                isLightMode={isLightMode}
                onSelectUser={(userId) => setSelectedProfileUserId(userId)}
              />
            ) : activeTab === 'box_regt' ? (
              <BoxRegistrationView isLightMode={isLightMode} />
            ) : (
              <>
                {/* Top Section: Slidable Stats on Left + Heat Map Card on Right */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)',
                    gap: '16px',
                  }}
                  className="top-overview-grid"
                >
                  {/* Slidable Stats Card (2-row horizontal scrollable) */}
                  <SlidableStats isLightMode={isLightMode} />

                  {/* Heat Map Card (using official /image/map 1.png) */}
                  <HeatMapCard isLightMode={isLightMode} />
                </div>

                {/* Charts Section: User Distribution, User Growth, Revenue */}
                <ChartsSection isLightMode={isLightMode} />

                {/* Quick Actions Grid: Exactly 3 columns x 2 rows */}
                <QuickActions
                  isLightMode={isLightMode}
                  onSelectAction={(actionId) => setActiveTab(actionId)}
                />

                {/* Tables Section: New Users, Recent Box, Recent Inventory */}
                <DashboardTables
                  isLightMode={isLightMode}
                  onNavigateToSection={(sectionId) => setActiveTab(sectionId)}
                />
              </>
            )}
          </main>

          {/* 3. Right Sidebar: Sits under Header on the right side (Only on main Dashboard tab, matching Figma) */}
          {activeTab === 'dashboard' && !selectedProfileUserId && (
            <div className={rightSidebarOpen ? 'right-sidebar-mobile-visible' : 'right-sidebar-desktop-wrapper'}>
              <RightSidebar isLightMode={isLightMode} onClose={() => setRightSidebarOpen(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Right Sidebar Backdrop */}
      {rightSidebarOpen && (
        <div
          onClick={() => setRightSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 45,
          }}
          className="show-on-mobile-btn"
        />
      )}

      <style jsx global>{`
        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .right-sidebar-desktop-wrapper {
            display: none !important;
          }
          .top-overview-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 1201px) {
          .right-sidebar-desktop-wrapper {
            display: block !important;
            flex-shrink: 0;
            height: 100%;
          }
          .show-on-mobile-btn {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .sidebar-desktop-wrapper {
            display: none !important;
          }
          .hide-on-small-mobile {
            display: none !important;
          }
          .top-overview-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Mobile Off-canvas Drawer Styles */
        .sidebar-mobile-visible {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 50;
          display: block !important;
          animation: slideInLeft 0.2s ease-out;
        }

        .right-sidebar-mobile-visible {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          display: block !important;
          animation: slideInRight 0.2s ease-out;
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
