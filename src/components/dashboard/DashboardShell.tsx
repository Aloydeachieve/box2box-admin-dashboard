'use client';

import React, { useState, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { AdminProvider, useAdmin } from '@/components/layout/AdminContext';

interface DashboardShellProps {
  children: React.ReactNode;
}

const DashboardShellInner: React.FC<DashboardShellProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { headerActions, isLightMode, setIsLightMode, customBack } = useAdmin();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isUpdateStockQuery = searchParams.get('view') === 'update-stock';
  const isUpdateUnitQuery = searchParams.get('view') === 'update-unit';
  const isEditStockQuery = searchParams.get('view') === 'edit-stock';
  const isUnitDetailQuery = searchParams.get('view') === 'unit-detail';
  const isInventoryUpdateStockPage =
    (pathname.includes('/inventory/boxes/') && pathname.includes('/update-stock')) ||
    (pathname.includes('/inventory/boxes/') && isUpdateStockQuery);

  // Derive active tab from pathname
  const getActiveTab = () => {
    if (pathname.startsWith('/box-management') || pathname.startsWith('/dashboard/box-management')) return 'box_mgt';
    if (pathname.startsWith('/box-registration') || pathname.startsWith('/dashboard/box-registration')) return 'box_regt';
    if (pathname.startsWith('/users') || pathname.startsWith('/dashboard/users')) return 'users';
    if (pathname.startsWith('/inventory') || pathname.startsWith('/dashboard/inventory')) {
      if (pathname.includes('/accessories')) return 'inventory_accessories';
      if (pathname.includes('/parts')) return 'inventory_parts';
      if (pathname.includes('/log')) return 'inventory_log';
      return 'inventory_boxes';
    }
    if (pathname.startsWith('/orders') || pathname.startsWith('/dashboard/orders')) return 'orders';
    if (pathname.startsWith('/rewards') || pathname.startsWith('/dashboard/rewards')) return 'rewards';
    if (pathname.startsWith('/admin-registration') || pathname.startsWith('/dashboard/admin-registration')) return 'admin_regt';
    if (pathname.startsWith('/transactions') || pathname.startsWith('/dashboard/transactions')) return 'transactions';
    if (pathname.startsWith('/support') || pathname.startsWith('/dashboard/support')) return 'support';
    if (pathname.startsWith('/fraud-alert') || pathname.startsWith('/dashboard/fraud-alert')) return 'fraud_alert';
    if (pathname.startsWith('/account') || pathname.startsWith('/dashboard/account')) return 'account';
    return 'dashboard';
  };

  const isInventoryNewAccessoryPage = pathname === '/inventory/accessories/new';
  const isInventoryEditAccessoryPage =
    pathname.startsWith('/inventory/accessories/') && pathname.endsWith('/edit');
  const isInventoryCategoryDetailPage =
    pathname.startsWith('/inventory/accessories/categories/');
  const isInventoryAccessoryUpdateStockPage =
    (pathname.startsWith('/inventory/accessories/') && pathname.includes('/update-stock')) ||
    (pathname.startsWith('/inventory/accessories/') && isUpdateStockQuery);
  const isInventoryAccessoryDetailPage =
    pathname.startsWith('/inventory/accessories/') &&
    !isInventoryNewAccessoryPage &&
    !isInventoryEditAccessoryPage &&
    !isInventoryCategoryDetailPage;

  const isInventoryNewPartPage = pathname === '/inventory/parts/new';
  const isInventoryPartsPage = pathname.startsWith('/inventory/parts');

  // Derive header title
  const getHeaderTitle = () => {
    if (pathname.includes('/report/')) return 'View report';
    if (pathname.includes('/box-management/') || pathname.includes('/dashboard/box-management/')) return 'Box details';
    if (pathname === '/box-management' || pathname === '/dashboard/box-management') return 'Box management';
    if (pathname === '/inventory/boxes/new') return 'New box model';
    if (pathname.includes('/inventory/boxes/') && pathname.endsWith('/edit')) return 'Edit box model';
    if (isInventoryUpdateStockPage) return 'Update model stock';
    if (isInventoryAccessoryDetailPage && isUpdateUnitQuery) return 'Update unit'; // Image 3
    if (isInventoryAccessoryDetailPage && isEditStockQuery) return 'Edit accessory stock'; // Image 5
    if (isInventoryAccessoryUpdateStockPage) return 'Update accessory stock';
    if (isInventoryEditAccessoryPage) return 'Edit accessory';
    if (pathname === '/inventory/accessories/new') return 'New accessory';
    if (isInventoryNewPartPage) return 'New part';
    if (isInventoryPartsPage) return 'Parts';
    if (isInventoryCategoryDetailPage) return ''; // Clean header with < back arrow matching Image 2
    if (isInventoryAccessoryDetailPage && isUnitDetailQuery) return ''; // Clean header with Actions button for Unit Detail (Image 4)
    if (pathname.startsWith('/inventory/accessories/')) return ''; // Clean header with Actions button for detail pages (Image 4 & 5)
    if (pathname.startsWith('/inventory/accessories')) return 'Accessories';
    if (pathname.startsWith('/inventory')) return 'Boxes'; // Matching Image 1 & 2
    if (pathname.includes('/activity/') && pathname.split('/activity/')[1]) return 'Booking details';
    if (pathname.endsWith('/activity')) return 'Activity history';
    if ((pathname.startsWith('/users/') || pathname.startsWith('/dashboard/users/')) && !pathname.includes('/activity')) return ''; // Clean header for Profile
    if (pathname === '/users' || pathname === '/dashboard/users') return 'Users';
    if (pathname === '/dashboard') return 'Dashboard';
    return 'Dashboard';
  };

  const isViewReportPage = pathname.includes('/report/');
  const isBoxDetailsPage = (pathname.includes('/box-management/') || pathname.includes('/dashboard/box-management/')) && !isViewReportPage;
  const isUserProfilePage = (pathname.startsWith('/users/') || pathname.startsWith('/dashboard/users/')) && !pathname.includes('/activity') && pathname !== '/users' && pathname !== '/dashboard/users';
  const isActivityPage = pathname.endsWith('/activity');
  const isBookingDetailPage = pathname.includes('/activity/') && !!pathname.split('/activity/')[1];

  const isInventoryNewModelPage = pathname === '/inventory/boxes/new';
  const isInventoryEditModelPage = pathname.includes('/inventory/boxes/') && pathname.endsWith('/edit');
  const isInventoryModelDetailPage = pathname.includes('/inventory/boxes/') && !pathname.includes('/unit/') && !isInventoryNewModelPage && !isInventoryEditModelPage && !isInventoryUpdateStockPage;
  const isInventoryUnitDetailPage = pathname.includes('/inventory/boxes/') && pathname.includes('/unit/');
  const isInventoryDetailPage = isInventoryModelDetailPage || isInventoryUnitDetailPage;

  const showBack =
    isViewReportPage ||
    isBoxDetailsPage ||
    isUserProfilePage ||
    isActivityPage ||
    isBookingDetailPage ||
    isInventoryDetailPage ||
    isInventoryNewModelPage ||
    isInventoryEditModelPage ||
    isInventoryUpdateStockPage ||
    isInventoryNewAccessoryPage ||
    isInventoryEditAccessoryPage ||
    isInventoryCategoryDetailPage ||
    isInventoryAccessoryUpdateStockPage ||
    isInventoryAccessoryDetailPage ||
    isInventoryNewPartPage;

  const showAction =
    (isViewReportPage ||
      isBoxDetailsPage ||
      isUserProfilePage ||
      isInventoryDetailPage ||
      isInventoryAccessoryDetailPage) &&
    !isInventoryNewModelPage &&
    !isInventoryEditModelPage &&
    !isInventoryUpdateStockPage &&
    !isInventoryNewAccessoryPage &&
    !isInventoryEditAccessoryPage &&
    !isInventoryAccessoryUpdateStockPage &&
    !isUpdateUnitQuery &&
    !isEditStockQuery &&
    !isInventoryCategoryDetailPage &&
    !isInventoryPartsPage;

  const handleBack = () => {
    if (customBack) {
      customBack();
      return;
    }
    if (isInventoryAccessoryUpdateStockPage) {
      router.push(`${pathname}?view=units`);
      return;
    }
    if (isInventoryEditAccessoryPage) {
      const parts = pathname.split('/edit');
      router.push(parts[0] || '/inventory/accessories');
      return;
    }
    if (isInventoryCategoryDetailPage) {
      router.push('/inventory/accessories');
      return;
    }
    if (isInventoryNewAccessoryPage) {
      router.push('/inventory/accessories');
      return;
    }
    if (isInventoryAccessoryDetailPage) {
      router.push('/inventory/accessories');
      return;
    }
    if (isInventoryNewModelPage) {
      router.push('/inventory');
    } else if (isInventoryEditModelPage) {
      const parts = pathname.split('/edit');
      router.push(parts[0] || '/inventory');
    } else if (isInventoryUpdateStockPage) {
      if (isUpdateStockQuery) {
        router.push(`${pathname}?view=units`);
      } else {
        const parts = pathname.split('/update-stock');
        router.push(parts[0] ? `${parts[0]}?view=units` : '/inventory');
      }
    } else if (isInventoryUnitDetailPage) {
      const parts = pathname.split('/unit/');
      router.push(parts[0] ? `${parts[0]}?view=units` : '/inventory');
    } else if (isInventoryModelDetailPage) {
      router.push('/inventory');
    } else if (isViewReportPage) {
      // Extract the boxId from the url e.g. /box-management/[id]/report/[reportId]
      const parts = pathname.split('/');
      const reportIndex = parts.indexOf('report');
      if (reportIndex > 1) {
        const boxId = parts[reportIndex - 1];
        router.push(pathname.includes('/dashboard/') ? `/dashboard/box-management/${boxId}` : `/box-management/${boxId}`);
        return;
      }
      router.back();
    } else if (isBoxDetailsPage) {
      router.push(pathname.includes('/dashboard/') ? '/dashboard/box-management' : '/box-management');
    } else if (isBookingDetailPage) {
      router.back();
    } else if (isActivityPage) {
      router.back();
    } else if (isUserProfilePage) {
      router.push(pathname.includes('/dashboard/') ? '/dashboard/users' : '/users');
    } else {
      router.back();
    }
  };

  const handleSelectTab = (tab: string) => {
    setMobileSidebarOpen(false);
    switch (tab) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'users':
        router.push('/users');
        break;
      case 'box_mgt':
      case 'boxes':
        router.push('/box-management');
        break;
      case 'inventory':
      case 'inventory_boxes':
        router.push('/inventory');
        break;
      case 'inventory_accessories':
        router.push('/inventory/accessories');
        break;
      case 'inventory_parts':
        router.push('/inventory/parts');
        break;
      case 'inventory_log':
        router.push('/inventory/log');
        break;
      default:
        router.push('/dashboard');
        break;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: isLightMode ? '#F4F5F7' : '#0B0B0C',
        color: isLightMode ? '#111827' : '#FFFFFF',
        fontFamily: 'var(--font-outfit), sans-serif',
        transition: 'background-color 0.2s, color 0.2s',
      }}
    >
      {/* 1. Left Navigation Sidebar */}
      <div
        className={mobileSidebarOpen ? 'sidebar-mobile-visible' : 'sidebar-desktop-wrapper'}
        style={{ height: '100vh', flexShrink: 0 }}
      >
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeTab={getActiveTab()}
          isLightMode={isLightMode}
          onSelectTab={handleSelectTab}
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

      {/* 2. Main Layout Area */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Full-width Top Header */}
        <DashboardHeader
          title={getHeaderTitle()}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isLightMode={isLightMode}
          onToggleTheme={() => setIsLightMode(!isLightMode)}
          showBack={showBack}
          onBack={handleBack}
          showAction={showAction}
          actionItems={headerActions}
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
              padding: '20px 24px 0px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            {children}

            {/* Guaranteed visible bottom breathing room so cards/tables NEVER touch the bottom edge of screen! */}
            <div
              style={{
                height: '72px',
                minHeight: '72px',
                width: '100%',
                flexShrink: 0,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />
          </main>

          {/* 3. Right Sidebar: only rendered on /dashboard overview */}
          {(pathname === '/dashboard' || pathname === '/') && (
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
};

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <AdminProvider>
      <Suspense fallback={null}>
        <DashboardShellInner>{children}</DashboardShellInner>
      </Suspense>
    </AdminProvider>
  );
};
