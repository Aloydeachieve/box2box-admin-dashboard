'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Globe,
  Film,
  Map,
  Sun,
  Moon,
  Menu,
  Bell,
} from 'lucide-react';
import { LocationModal } from './LocationModal';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  onToggleRightSidebar?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  title?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  onToggleRightSidebar,
  searchQuery,
  onSearchChange,
  isLightMode,
  onToggleTheme,
  title = 'Dashboard',
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Location');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <>
      <header
        style={{
          height: '68px',
          width: '100%',
          backgroundColor: isLightMode ? '#FFFFFF' : '#121214',
          borderBottom: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          transition: 'background-color 0.2s, border-color 0.2s',
          boxShadow: isLightMode
            ? '0 1px 3px rgba(0, 0, 0, 0.05)'
            : '0 1px 0 rgba(245, 200, 66, 0.15)',
        }}
      >
        {/* Left: Mobile Menu Toggle + Screen Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              style={{
                background: 'none',
                border: 'none',
                color: isLightMode ? '#111827' : '#FFFFFF',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
              className="show-on-mobile-btn"
            >
              <Menu size={20} />
            </button>
          )}

          <h1
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: isLightMode ? '#111827' : '#FFFFFF',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Center / Right: Search, Location Modal Trigger, Quick Tool Icons from Screenshot 4 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Search Bar matching Screenshot 4 */}
          <div
            style={{
              position: 'relative',
              width: '260px',
            }}
            className="hide-on-small-mobile"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              style={{
                width: '100%',
                height: '36px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#1A1A1E',
                border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '0 36px 0 16px',
                color: isLightMode ? '#111827' : '#FFFFFF',
                fontSize: '12px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <Search
              size={14}
              color={isLightMode ? '#6B7280' : '#8E8E93'}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Location Button -> Opens Multi-Step Sweeping Modal (Figma Screenshots 3, 4, 5) */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 14px',
              borderRadius: '20px',
              backgroundColor: isLightMode ? '#F3F4F6' : '#1A1A1E',
              border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isLightMode ? '#111827' : '#FFFFFF',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <span>{selectedLocation}</span>
            <ChevronDown size={14} color={isLightMode ? '#6B7280' : '#8E8E93'} />
          </button>

          {/* Action Icons from Screenshot 4: World, Video/Movie, Map, Brightness Controller */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* World / Globe Icon (yellow accent outline) */}
            <button
              title="Global Network View"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '1px solid #F5C842',
                color: '#F5C842',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Globe size={16} />
            </button>

            {/* Video / Movie Icon */}
            <button
              title="Video Surveillance & Tutorials"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '1px solid #F5C842',
                color: '#F5C842',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Film size={16} />
            </button>

            {/* Map Icon */}
            <button
              title="Heat Map & Locations"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '1px solid #F5C842',
                color: '#F5C842',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Map size={16} />
            </button>

            {/* Brightness / Theme Controller: FUNCTIONAL Light / Dark Switch */}
            <button
              title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              onClick={onToggleTheme}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: isLightMode ? '#F5C842' : 'transparent',
                border: '1px solid #F5C842',
                color: isLightMode ? '#000000' : '#F5C842',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.2s ease',
              }}
            >
              {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Right Sidebar Drawer Trigger for small screens */}
            {onToggleRightSidebar && (
              <button
                onClick={onToggleRightSidebar}
                title="Reports & Activity"
                className="show-on-mobile-btn"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#1E1E22',
                  border: isLightMode ? '1px solid #D1D5DB' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isLightMode ? '#111827' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Bell size={15} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Multi-step Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSave={(loc) => setSelectedLocation(loc)}
        currentLocation={selectedLocation}
      />
    </>
  );
};
