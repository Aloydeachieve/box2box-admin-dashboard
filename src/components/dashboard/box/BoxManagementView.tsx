'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Star,
  Check,
} from 'lucide-react';
import { BoxManagementFilterModal } from './BoxManagementFilterModal';

interface BoxManagementViewProps {
  isLightMode?: boolean;
}

interface BoxRow {
  id: string;
  boxId: string;
  owner: string;
  location: string;
  status: 'Online' | 'Offline' | 'Disabled';
  capacity: number;
  usageRate: string;
  avgRating: number;
  cleanliness: string;
  report: number;
  batteryHealth: {
    label: string;
    percentage: number;
    level: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  };
  peakPeriod: string;
}

export const BoxManagementView: React.FC<BoxManagementViewProps> = ({ isLightMode = false }) => {
  const [timePeriod, setTimePeriod] = useState('This week');
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [locationSlide, setLocationSlide] = useState(0);

  // Exact theme colors matching Figma Image 4
  const bgColor = isLightMode ? '#F4F5F7' : '#0F0F12';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  const tableData: BoxRow[] = [
    {
      id: 'box-1',
      boxId: 'MyBox-123456',
      owner: 'Penelope Fitzg..',
      location: 'Wuse II, Abuja, Nigeria',
      status: 'Online',
      capacity: 1,
      usageRate: '90%',
      avgRating: 4.8,
      cleanliness: '90%',
      report: 90,
      batteryHealth: { label: 'Excellent', percentage: 90, level: 'Excellent' },
      peakPeriod: '09:00 AM - 12:00 PM',
    },
    {
      id: 'box-2',
      boxId: 'MyBox-123456',
      owner: 'Frederick Holli..',
      location: 'Wuse II, Abuja, Nigeria',
      status: 'Online',
      capacity: 8,
      usageRate: '90%',
      avgRating: 4.8,
      cleanliness: '90%',
      report: 190,
      batteryHealth: { label: 'Good', percentage: 79, level: 'Good' },
      peakPeriod: '09:00 AM - 12:00 PM',
    },
    {
      id: 'box-3',
      boxId: 'MyBox-123456',
      owner: 'Anastasia Beau..',
      location: 'Wuse II, Abuja, Nigeria',
      status: 'Disabled',
      capacity: 4,
      usageRate: '90%',
      avgRating: 4.8,
      cleanliness: '90%',
      report: 2009,
      batteryHealth: { label: 'Fair', percentage: 55, level: 'Fair' },
      peakPeriod: '09:00 AM - 12:00 PM',
    },
    {
      id: 'box-4',
      boxId: 'MyBox-123456',
      owner: 'Isabella Montg..',
      location: 'Wuse II, Abuja, Nigeria',
      status: 'Offline',
      capacity: 1,
      usageRate: '90%',
      avgRating: 4.8,
      cleanliness: '90%',
      report: 0,
      batteryHealth: { label: 'Poor', percentage: 35, level: 'Poor' },
      peakPeriod: '09:00 AM - 12:00 PM',
    },
    {
      id: 'box-5',
      boxId: 'MyBox-123456',
      owner: 'Sebastian Cun..',
      location: 'Wuse II, Abuja, Nigeria',
      status: 'Online',
      capacity: 1,
      usageRate: '90%',
      avgRating: 4.8,
      cleanliness: '90%',
      report: 0,
      batteryHealth: { label: 'Critical', percentage: 15, level: 'Critical' },
      peakPeriod: '09:00 AM - 12:00 PM',
    },
  ];

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRowIds([]);
      setSelectAll(false);
    } else {
      setSelectedRowIds(tableData.map((d) => d.id));
      setSelectAll(true);
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter((r) => r !== id));
      setSelectAll(false);
    } else {
      const next = [...selectedRowIds, id];
      setSelectedRowIds(next);
      if (next.length === tableData.length) setSelectAll(true);
    }
  };

  const getStatusBadge = (status: 'Online' | 'Offline' | 'Disabled') => {
    switch (status) {
      case 'Online':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#10B981',
          label: 'Online',
        };
      case 'Offline':
        return {
          bg: 'rgba(113, 113, 122, 0.2)',
          color: '#A1A1AA',
          label: 'Offline',
        };
      case 'Disabled':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          color: '#EF4444',
          label: 'Disabled',
        };
    }
  };

  const getBatteryBadge = (battery: BoxRow['batteryHealth']) => {
    switch (battery.level) {
      case 'Excellent':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#10B981',
          text: `Excellent (${battery.percentage}%)`,
        };
      case 'Good':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#10B981',
          text: `Good (${battery.percentage}%)`,
        };
      case 'Fair':
        return {
          bg: 'rgba(245, 200, 66, 0.15)',
          color: '#F5C842',
          text: `Fair (${battery.percentage}%)`,
        };
      case 'Poor':
        return {
          bg: 'rgba(249, 115, 22, 0.15)',
          color: '#F97316',
          text: `Poor (${battery.percentage}%)`,
        };
      case 'Critical':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          color: '#EF4444',
          text: `Critical (${battery.percentage}%)`,
        };
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        fontFamily: 'Rubik, var(--font-outfit), sans-serif',
      }}
    >
      {/* 1. Header Title & Time Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 4px 0',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            Box Management
          </h2>
          <p style={{ fontSize: '13px', color: subtextColor, margin: 0 }}>
            View and manage all boxes, filter by country, user type or status
          </p>
        </div>

        {/* Time Period Filter Dropdown: 'This week ▾' */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowTimeMenu(!showTimeMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              color: textColor,
              fontSize: '13px',
              fontWeight: 500,
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
                marginTop: '4px',
                width: '130px',
                backgroundColor: cardBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '4px',
                zIndex: 30,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              {['Today', 'This week', 'This month', 'This year'].map((period) => (
                <div
                  key={period}
                  onClick={() => {
                    setTimePeriod(period);
                    setShowTimeMenu(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    fontSize: '12px',
                    color: textColor,
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {period}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. ROW 1: 5 CHARTS/GRAPH CARDS (FIRST AS REQUESTED) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '14px',
        }}
      >
        {/* Card 1: Total boxes semi-donut gauge */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Total boxes</div>
              {/* Legend dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '9px', color: subtextColor }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0D9488' }} /> Online
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5C842' }} /> Offline
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} /> Disabled
                </span>
              </div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: textColor }}>200,000,000</div>
          </div>

          {/* Semi-circular Donut Gauge */}
          <div style={{ width: '100%', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="180" height="90" viewBox="0 0 180 90">
              {/* Arc 1: Online 50% (left half) */}
              <path
                d="M 15 90 A 75 75 0 0 1 90 15"
                fill="none"
                stroke="#0D9488"
                strokeWidth="24"
                strokeLinecap="butt"
              />
              {/* Arc 2: Offline 25% */}
              <path
                d="M 90 15 A 75 75 0 0 1 143 37"
                fill="none"
                stroke="#F5C842"
                strokeWidth="24"
                strokeLinecap="butt"
              />
              {/* Arc 3: Disabled 25% */}
              <path
                d="M 143 37 A 75 75 0 0 1 165 90"
                fill="none"
                stroke="#D97706"
                strokeWidth="24"
                strokeLinecap="butt"
              />
              {/* Percent labels inside arcs */}
              <text x="45" y="60" fill="#FFFFFF" fontSize="10" fontWeight="700">50%</text>
              <text x="105" y="40" fill="#000000" fontSize="9" fontWeight="700">25%</text>
              <text x="135" y="70" fill="#FFFFFF" fontSize="9" fontWeight="700">25%</text>
            </svg>
          </div>
        </div>

        {/* Card 2: Active boxes gauge */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Active boxes</div>
              <div style={{ fontSize: '10px', color: subtextColor }}>Boxes in operation daily</div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: textColor }}>15,000,000</div>
          </div>

          {/* Yellow Radial Ring Gauge */}
          <div style={{ width: '100%', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="180" height="90" viewBox="0 0 180 90">
              {/* Background Arc */}
              <path
                d="M 20 90 A 70 70 0 0 1 160 90"
                fill="none"
                stroke={isLightMode ? '#E5E7EB' : '#2A2A2E'}
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Filled Golden Arc 80% */}
              <path
                d="M 20 90 A 70 70 0 0 1 146 45"
                fill="none"
                stroke="#F5C842"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <text x="90" y="66" fill={subtextColor} fontSize="9" textAnchor="middle">Active boxes</text>
              <text x="90" y="85" fill={textColor} fontSize="17" fontWeight="700" textAnchor="middle">80%</text>
            </svg>
          </div>
        </div>

        {/* Card 3: Box by capacity (Bar chart) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Box by capacity</div>
              <div style={{ fontSize: '10px', color: subtextColor }}>Distribution by cabinets</div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: textColor }}>200,000,000</div>
          </div>

          {/* Bar Chart with Y-axis & X-axis */}
          <div style={{ height: '90px', width: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 90">
              {/* Dashed Grid Lines */}
              <line x1="24" y1="20" x2="195" y2="20" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="24" y1="45" x2="195" y2="45" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="24" y1="70" x2="195" y2="70" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />

              {/* Y Axis ticks */}
              <text x="2" y="23" fill={subtextColor} fontSize="6">1000</text>
              <text x="4" y="48" fill={subtextColor} fontSize="6">500</text>
              <text x="8" y="73" fill={subtextColor} fontSize="6">0</text>

              {/* Bars: 1Gb(10%), 2Gb(12%), 4Gb(20%), 6Gb(16%), 8Gb(20%), 10Gb(20%), 12Gb(20%) */}
              {/* Bar 1 */}
              <text x="36" y="52" fill={subtextColor} fontSize="6" textAnchor="middle">10%</text>
              <rect x="31" y="56" width="10" height="14" rx="2" fill="#F5C842" />
              <text x="36" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">1Gb</text>

              {/* Bar 2 */}
              <text x="56" y="47" fill={subtextColor} fontSize="6" textAnchor="middle">12%</text>
              <rect x="51" y="51" width="10" height="19" rx="2" fill="#F5C842" />
              <text x="56" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">2Gb</text>

              {/* Bar 3 */}
              <text x="76" y="32" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="71" y="36" width="10" height="34" rx="2" fill="#F5C842" />
              <text x="76" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">4Gb</text>

              {/* Bar 4 */}
              <text x="96" y="40" fill={subtextColor} fontSize="6" textAnchor="middle">16%</text>
              <rect x="91" y="44" width="10" height="26" rx="2" fill="#F5C842" />
              <text x="96" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">6Gb</text>

              {/* Bar 5 */}
              <text x="116" y="32" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="111" y="36" width="10" height="34" rx="2" fill="#F5C842" />
              <text x="116" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">8Gb</text>

              {/* Bar 6 */}
              <text x="136" y="27" fill={subtextColor} fontSize="6" textAnchor="middle">24%</text>
              <rect x="131" y="31" width="10" height="39" rx="2" fill="#F5C842" />
              <text x="136" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">10Gb</text>

              {/* Bar 7 */}
              <text x="156" y="27" fill={subtextColor} fontSize="6" textAnchor="middle">24%</text>
              <rect x="151" y="31" width="10" height="39" rx="2" fill="#F5C842" />
              <text x="156" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">12Gb</text>
            </svg>
          </div>
        </div>

        {/* Card 4: Battery health (Pie / Donut chart) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: textColor, marginBottom: '4px' }}>
              Battery health
            </div>
            {/* Dots */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '9px', color: subtextColor }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#A855F7' }} /> Excellent
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981' }} /> Good
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F5C842' }} /> Fair
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F97316' }} /> Poor
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#EF4444' }} /> Critical
              </span>
            </div>
          </div>

          {/* Pie Chart */}
          <div style={{ width: '100%', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="90" height="90" viewBox="0 0 36 36">
              {/* Slice 1: Purple 10% */}
              <circle
                r="16"
                cx="18"
                cy="18"
                fill="transparent"
                stroke="#A855F7"
                strokeWidth="16"
                strokeDasharray="10 90"
                strokeDashoffset="25"
              />
              {/* Slice 2: Green 10% */}
              <circle
                r="16"
                cx="18"
                cy="18"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="16"
                strokeDasharray="10 90"
                strokeDashoffset="15"
              />
              {/* Slice 3: Yellow 30% */}
              <circle
                r="16"
                cx="18"
                cy="18"
                fill="transparent"
                stroke="#F5C842"
                strokeWidth="16"
                strokeDasharray="30 70"
                strokeDashoffset="5"
              />
              {/* Slice 4: Red 25% */}
              <circle
                r="16"
                cx="18"
                cy="18"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="16"
                strokeDasharray="25 75"
                strokeDashoffset="-25"
              />
              {/* Slice 5: Teal 25% */}
              <circle
                r="16"
                cx="18"
                cy="18"
                fill="transparent"
                stroke="#06B6D4"
                strokeWidth="16"
                strokeDasharray="25 75"
                strokeDashoffset="-50"
              />
            </svg>
          </div>
        </div>

        {/* Card 5: Locations (Bar chart with navigation < >) */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '14px',
            border: `1px solid ${borderColor}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Locations</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <button
                  onClick={() => setLocationSlide(Math.max(0, locationSlide - 1))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: subtextColor,
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setLocationSlide(locationSlide + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: subtextColor,
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: textColor }}>15,000,000</div>
          </div>

          {/* Bar Chart of Locations */}
          <div style={{ height: '90px', width: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 180 90">
              <line x1="20" y1="20" x2="175" y2="20" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="20" y1="45" x2="175" y2="45" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="20" y1="70" x2="175" y2="70" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />

              <text x="2" y="23" fill={subtextColor} fontSize="6">1000</text>
              <text x="4" y="48" fill={subtextColor} fontSize="6">500</text>
              <text x="8" y="73" fill={subtextColor} fontSize="6">0</text>

              {/* Location Bars */}
              <text x="32" y="52" fill={subtextColor} fontSize="6" textAnchor="middle">10%</text>
              <rect x="27" y="56" width="10" height="14" rx="2" fill="#F5C842" />
              <text x="32" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">ABJ</text>

              <text x="52" y="47" fill={subtextColor} fontSize="6" textAnchor="middle">12%</text>
              <rect x="47" y="51" width="10" height="19" rx="2" fill="#F5C842" />
              <text x="52" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">ABJ</text>

              <text x="72" y="32" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="67" y="36" width="10" height="34" rx="2" fill="#F5C842" />
              <text x="72" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">KAD</text>

              <text x="92" y="40" fill={subtextColor} fontSize="6" textAnchor="middle">16%</text>
              <rect x="87" y="44" width="10" height="26" rx="2" fill="#F5C842" />
              <text x="92" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">ABJ</text>

              <text x="112" y="32" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="107" y="36" width="10" height="34" rx="2" fill="#F5C842" />
              <text x="112" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">KAD</text>

              <text x="132" y="27" fill={subtextColor} fontSize="6" textAnchor="middle">24%</text>
              <rect x="127" y="31" width="10" height="39" rx="2" fill="#F5C842" />
              <text x="132" y="82" fill={subtextColor} fontSize="6" textAnchor="middle">BWR</text>
            </svg>
          </div>
        </div>
      </div>

      {/* 3. ROW 2: 5 STAT CARDS (SECOND AS REQUESTED) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: 'Total bookings value', value: '₦12,000,000', change: '+12% today' },
          { label: 'Total bookings', value: '7,935', change: '+12% today' },
          { label: 'Total reports', value: '30,908', change: '+2% today' },
          { label: 'Pending reports', value: '₦2,050', change: '+4% today' },
          { label: 'Resolved reports', value: '72%', change: '+2% today' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: `1px solid ${borderColor}`,
              padding: '16px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '6px' }}>{stat.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: textColor, marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 600 }}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* 4. ROW 3: FILTER BAR & TABLE (THIRD AS REQUESTED) */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '14px',
          border: `1px solid ${borderColor}`,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Table Filter Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>
              All (5,000,045)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                style={{
                  width: '100%',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#FFFFFF' : '#1A1A1E',
                  border: `1px solid ${borderColor}`,
                  padding: '0 34px 0 12px',
                  color: textColor,
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
              <Search
                size={14}
                color={subtextColor}
                style={{ position: 'absolute', right: '10px', top: '11px', pointerEvents: 'none' }}
              />
            </div>

            {/* Filter ▾ button */}
            <button
              onClick={() => setShowFilterModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 14px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#FFFFFF' : '#1A1A1E',
                border: `1px solid ${borderColor}`,
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

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '12px',
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, color: subtextColor }}>
                <th style={{ padding: '12px 10px', width: '36px' }}>
                  <div
                    onClick={toggleSelectAll}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: selectAll ? 'none' : `1.5px solid ${subtextColor}`,
                      backgroundColor: selectAll ? '#F5C842' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    {selectAll && <Check size={11} color="#000000" strokeWidth={3} />}
                  </div>
                </th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Box ID</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Owner</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Location</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Capacity</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Usage rate</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Avg. rating</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Cleanliness</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Report</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Battery health</th>
                <th style={{ padding: '12px 10px', fontWeight: 500 }}>Peak period</th>
                <th style={{ padding: '12px 10px', fontWeight: 500, textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => {
                const isSelected = selectedRowIds.includes(row.id);
                const statusBadge = getStatusBadge(row.status);
                const batteryBadge = getBatteryBadge(row.batteryHealth);

                return (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: `1px solid ${borderColor}`,
                      transition: 'background-color 0.15s',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = isLightMode ? '#F9FAFB' : '#1C1C20')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = isSelected
                        ? isLightMode
                          ? 'rgba(245, 200, 66, 0.08)'
                          : 'rgba(245, 200, 66, 0.05)'
                        : 'transparent')
                    }
                  >
                    {/* Checkbox */}
                    <td style={{ padding: '12px 10px' }}>
                      <div
                        onClick={() => toggleSelectRow(row.id)}
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '4px',
                          border: isSelected ? 'none' : `1.5px solid ${subtextColor}`,
                          backgroundColor: isSelected ? '#F5C842' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {isSelected && <Check size={11} color="#000000" strokeWidth={3} />}
                      </div>
                    </td>

                    {/* Box ID */}
                    <td style={{ padding: '12px 10px', color: textColor, fontWeight: 500 }}>
                      {row.boxId}
                    </td>

                    {/* Owner */}
                    <td style={{ padding: '12px 10px', color: textColor }}>{row.owner}</td>

                    {/* Location */}
                    <td style={{ padding: '12px 10px', color: subtextColor }}>{row.location}</td>

                    {/* Status badge */}
                    <td style={{ padding: '12px 10px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: statusBadge.bg,
                          color: statusBadge.color,
                        }}
                      >
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Capacity */}
                    <td style={{ padding: '12px 10px', color: textColor, fontWeight: 500 }}>
                      {row.capacity}
                    </td>

                    {/* Usage rate */}
                    <td style={{ padding: '12px 10px', color: textColor }}>{row.usageRate}</td>

                    {/* Avg. rating */}
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: textColor, fontWeight: 600 }}>
                        {row.avgRating}
                        <Star size={12} fill="#F5C842" color="#F5C842" />
                      </span>
                    </td>

                    {/* Cleanliness */}
                    <td style={{ padding: '12px 10px', color: textColor }}>{row.cleanliness}</td>

                    {/* Report count */}
                    <td style={{ padding: '12px 10px', color: textColor }}>{row.report}</td>

                    {/* Battery health badge */}
                    <td style={{ padding: '12px 10px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: batteryBadge.bg,
                          color: batteryBadge.color,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {batteryBadge.text}
                      </span>
                    </td>

                    {/* Peak period */}
                    <td style={{ padding: '12px 10px', color: subtextColor, whiteSpace: 'nowrap' }}>
                      {row.peakPeriod}
                    </td>

                    {/* Action */}
                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: subtextColor,
                          cursor: 'pointer',
                          padding: '4px',
                          borderRadius: '4px',
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Filter Modal (Figma Image 5) */}
      <BoxManagementFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          console.log('Applied box filters:', filters);
        }}
      />
    </div>
  );
};
