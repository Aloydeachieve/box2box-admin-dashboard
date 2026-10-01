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
  Eye,
  Key,
  RefreshCw,
  Power,
  Slash,
  Flag,
} from 'lucide-react';
import { BoxManagementFilterModal } from './BoxManagementFilterModal';
import { UnlockBoxModal } from './UnlockBoxModal';
import { UpdateBoxModal } from './UpdateBoxModal';
import { BoxDetailsPageView } from './BoxDetailsPageView';

interface BoxManagementViewProps {
  isLightMode?: boolean;
  onViewBox?: (boxId: string) => void;
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
  isUnavailable?: boolean;
  isDisabled?: boolean;
  isFlagged?: boolean;
}

export const BoxManagementView: React.FC<BoxManagementViewProps> = ({
  isLightMode = false,
  onViewBox,
}) => {
  const [timePeriod, setTimePeriod] = useState('This week');
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [activeActionRowId, setActiveActionRowId] = useState<string | null>(null);

  // Modals state
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [targetBoxId, setTargetBoxId] = useState('MyBox-123456');

  // Detail view state
  const [selectedBoxForDetails, setSelectedBoxForDetails] = useState<string | null>(null);

  // Exact theme colors matching Figma Image 3
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';

  const [tableData, setTableData] = useState<BoxRow[]>([
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
      isUnavailable: false,
      isDisabled: false,
      isFlagged: false,
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
      isUnavailable: false,
      isDisabled: false,
      isFlagged: false,
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
      isUnavailable: false,
      isDisabled: true,
      isFlagged: false,
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
      isUnavailable: true,
      isDisabled: false,
      isFlagged: false,
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
      isUnavailable: false,
      isDisabled: false,
      isFlagged: true,
    },
  ]);

  if (selectedBoxForDetails) {
    return (
      <BoxDetailsPageView
        boxId={selectedBoxForDetails}
        onBack={() => setSelectedBoxForDetails(null)}
        isLightMode={isLightMode}
      />
    );
  }

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

  const toggleRowProperty = (id: string, prop: 'isUnavailable' | 'isDisabled' | 'isFlagged') => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [prop]: !row[prop] } : row))
    );
  };

  const getStatusBadge = (status: 'Online' | 'Offline' | 'Disabled') => {
    switch (status) {
      case 'Online':
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', label: 'Online' };
      case 'Offline':
        return { bg: 'rgba(113, 113, 122, 0.2)', color: '#A1A1AA', label: 'Offline' };
      case 'Disabled':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', label: 'Disabled' };
    }
  };

  const getBatteryBadge = (battery: BoxRow['batteryHealth']) => {
    switch (battery.level) {
      case 'Excellent':
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', text: `Excellent (${battery.percentage}%)` };
      case 'Good':
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', text: `Good (${battery.percentage}%)` };
      case 'Fair':
        return { bg: 'rgba(245, 200, 66, 0.15)', color: '#F5C842', text: `Fair (${battery.percentage}%)` };
      case 'Poor':
        return { bg: 'rgba(249, 115, 22, 0.15)', color: '#F97316', text: `Poor (${battery.percentage}%)` };
      case 'Critical':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', text: `Critical (${battery.percentage}%)` };
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

      {/* 2. ROW 1: 5 CHARTS/GRAPH CARDS (MATCHING FIGMA IMAGE 3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '14px',
        }}
      >
        {/* Card 1: Total boxes semi-donut gauge (Bigger, text inside arcs) */}
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

          {/* Larger Semi-circular Donut Gauge with Numbers inside arcs */}
          <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="200" height="100" viewBox="0 0 200 100">
              {/* Arc 1: Online 50% (left half) */}
              <path
                d="M 16 96 A 84 84 0 0 1 100 12"
                fill="none"
                stroke="#0D9488"
                strokeWidth="28"
                strokeLinecap="butt"
              />
              {/* Arc 2: Offline 25% */}
              <path
                d="M 100 12 A 84 84 0 0 1 159 36"
                fill="none"
                stroke="#F5C842"
                strokeWidth="28"
                strokeLinecap="butt"
              />
              {/* Arc 3: Disabled 25% */}
              <path
                d="M 159 36 A 84 84 0 0 1 184 96"
                fill="none"
                stroke="#D97706"
                strokeWidth="28"
                strokeLinecap="butt"
              />
              {/* Numbers cleanly placed inside the arcs */}
              <text x="50" y="62" fill="#FFFFFF" fontSize="11" fontWeight="700">50%</text>
              <text x="118" y="38" fill="#000000" fontSize="10" fontWeight="700">25%</text>
              <text x="154" y="74" fill="#FFFFFF" fontSize="10" fontWeight="700">25%</text>
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
          <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="190" height="95" viewBox="0 0 190 95">
              <path
                d="M 22 92 A 73 73 0 0 1 168 92"
                fill="none"
                stroke={isLightMode ? '#E5E7EB' : '#2A2A2E'}
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 22 92 A 73 73 0 0 1 154 44"
                fill="none"
                stroke="#F5C842"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <text x="95" y="70" fill={subtextColor} fontSize="9" textAnchor="middle">Active boxes</text>
              <text x="95" y="90" fill={textColor} fontSize="18" fontWeight="700" textAnchor="middle">80%</text>
            </svg>
          </div>
        </div>

        {/* Card 3: Box by capacity (Bar chart spread edge-to-edge with 6 horizontal dashed lines) */}
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

          {/* Bar Chart with 6 Y-Axis Lines (1000, 800, 600, 400, 200, 0) and edge-to-edge spread */}
          <div style={{ height: '95px', width: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 220 95">
              {/* 6 Horizontal Dashed Grid Lines */}
              <line x1="22" y1="14" x2="216" y2="14" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="27" x2="216" y2="27" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="40" x2="216" y2="40" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="53" x2="216" y2="53" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="66" x2="216" y2="66" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="79" x2="216" y2="79" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} />

              {/* Y Axis ticks */}
              <text x="2" y="16" fill={subtextColor} fontSize="6">1000</text>
              <text x="4" y="29" fill={subtextColor} fontSize="6">800</text>
              <text x="4" y="42" fill={subtextColor} fontSize="6">600</text>
              <text x="4" y="55" fill={subtextColor} fontSize="6">400</text>
              <text x="4" y="68" fill={subtextColor} fontSize="6">200</text>
              <text x="8" y="81" fill={subtextColor} fontSize="6">0</text>

              {/* Bars spread evenly across full width */}
              {/* 1Gb */}
              <text x="36" y="58" fill={subtextColor} fontSize="6" textAnchor="middle">10%</text>
              <rect x="31" y="62" width="10" height="17" rx="2" fill="#F5C842" />
              <text x="36" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">1Gb</text>

              {/* 2Gb */}
              <text x="64" y="54" fill={subtextColor} fontSize="6" textAnchor="middle">12%</text>
              <rect x="59" y="58" width="10" height="21" rx="2" fill="#F5C842" />
              <text x="64" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">2Gb</text>

              {/* 4Gb */}
              <text x="92" y="38" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="87" y="42" width="10" height="37" rx="2" fill="#F5C842" />
              <text x="92" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">4Gb</text>

              {/* 6Gb */}
              <text x="120" y="46" fill={subtextColor} fontSize="6" textAnchor="middle">16%</text>
              <rect x="115" y="50" width="10" height="29" rx="2" fill="#F5C842" />
              <text x="120" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">6Gb</text>

              {/* 8Gb */}
              <text x="148" y="38" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="143" y="42" width="10" height="37" rx="2" fill="#F5C842" />
              <text x="148" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">8Gb</text>

              {/* 10Gb */}
              <text x="176" y="32" fill={subtextColor} fontSize="6" textAnchor="middle">24%</text>
              <rect x="171" y="36" width="10" height="43" rx="2" fill="#F5C842" />
              <text x="176" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">10Gb</text>

              {/* 12Gb */}
              <text x="204" y="32" fill={subtextColor} fontSize="6" textAnchor="middle">24%</text>
              <rect x="199" y="36" width="10" height="43" rx="2" fill="#F5C842" />
              <text x="204" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">12Gb</text>
            </svg>
          </div>
        </div>

        {/* Card 4: Battery health (Solid Circular Pie Chart without hole matching Figma Image 3) */}
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

          {/* Solid Circular Pie Chart with Slices meeting at center */}
          <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Slice 1: Purple 10% (-90 to -54 deg): (50,50) to (50,8) arc to (74.7, 16.0) */}
              <path d="M 50 50 L 50 8 A 42 42 0 0 1 74.7 16.0 Z" fill="#A855F7" />
              <text x="60" y="24" fill="#FFFFFF" fontSize="7" fontWeight="700">10%</text>

              {/* Slice 2: Green 10% (-54 to -18 deg): arc to (89.9, 37.0) */}
              <path d="M 50 50 L 74.7 16.0 A 42 42 0 0 1 89.9 37.0 Z" fill="#10B981" />
              <text x="73" y="36" fill="#FFFFFF" fontSize="7" fontWeight="700">10%</text>

              {/* Slice 3: Yellow 30% (-18 to 90 deg): arc to (50, 92) */}
              <path d="M 50 50 L 89.9 37.0 A 42 42 0 0 1 50 92 Z" fill="#F5C842" />
              <text x="72" y="65" fill="#000000" fontSize="9" fontWeight="700">30%</text>

              {/* Slice 4: Red 25% (90 to 180 deg): arc to (8, 50) */}
              <path d="M 50 50 L 50 92 A 42 42 0 0 1 8 50 Z" fill="#EF4444" />
              <text x="30" y="74" fill="#FFFFFF" fontSize="9" fontWeight="700">25%</text>

              {/* Slice 5: Teal 25% (180 to 270 deg): arc to (50, 8) */}
              <path d="M 50 50 L 8 50 A 42 42 0 0 1 50 8 Z" fill="#06B6D4" />
              <text x="24" y="38" fill="#FFFFFF" fontSize="9" fontWeight="700">25%</text>
            </svg>
          </div>
        </div>

        {/* Card 5: Locations (Bar chart spread edge-to-edge with 6 horizontal dashed lines) */}
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

          {/* Bar Chart with 6 Y-Axis Lines (1000, 800, 600, 400, 200, 0) */}
          <div style={{ height: '95px', width: '100%' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 95">
              <line x1="22" y1="14" x2="196" y2="14" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="27" x2="196" y2="27" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="40" x2="196" y2="40" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="53" x2="196" y2="53" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="66" x2="196" y2="66" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} strokeDasharray="2,2" />
              <line x1="22" y1="79" x2="196" y2="79" stroke={isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)'} />

              <text x="2" y="16" fill={subtextColor} fontSize="6">1000</text>
              <text x="4" y="29" fill={subtextColor} fontSize="6">800</text>
              <text x="4" y="42" fill={subtextColor} fontSize="6">600</text>
              <text x="4" y="55" fill={subtextColor} fontSize="6">400</text>
              <text x="4" y="68" fill={subtextColor} fontSize="6">200</text>
              <text x="8" y="81" fill={subtextColor} fontSize="6">0</text>

              {/* Location Bars spread edge-to-edge */}
              <text x="36" y="58" fill={subtextColor} fontSize="6" textAnchor="middle">10%</text>
              <rect x="31" y="62" width="10" height="17" rx="2" fill="#F5C842" />
              <text x="36" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">ABJ</text>

              <text x="64" y="54" fill={subtextColor} fontSize="6" textAnchor="middle">12%</text>
              <rect x="59" y="58" width="10" height="21" rx="2" fill="#F5C842" />
              <text x="64" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">LOS</text>

              <text x="92" y="38" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="87" y="42" width="10" height="37" rx="2" fill="#F5C842" />
              <text x="92" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">KAN</text>

              <text x="120" y="46" fill={subtextColor} fontSize="6" textAnchor="middle">16%</text>
              <rect x="115" y="50" width="10" height="29" rx="2" fill="#F5C842" />
              <text x="120" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">IBD</text>

              <text x="148" y="38" fill={subtextColor} fontSize="6" textAnchor="middle">20%</text>
              <rect x="143" y="42" width="10" height="37" rx="2" fill="#F5C842" />
              <text x="148" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">ENUG</text>

              <text x="176" y="32" fill={subtextColor} fontSize="6" textAnchor="middle">24%</text>
              <rect x="171" y="36" width="10" height="43" rx="2" fill="#F5C842" />
              <text x="176" y="89" fill={subtextColor} fontSize="6" textAnchor="middle">BEN</text>
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

      {/* 4. ROW 3: FILTER BAR IN ITS OWN ROW (OUTSIDE OF THE TABLE CARD AS REQUESTED) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '4px 0',
        }}
      >
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
                backgroundColor: cardBg,
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
              backgroundColor: cardBg,
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

      {/* 5. TABLE CARD CONTAINER WITH SELECT ALL */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '14px',
          border: `1px solid ${borderColor}`,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Select All Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          <span
            onClick={toggleSelectAll}
            style={{ fontSize: '12px', fontWeight: 600, color: textColor, cursor: 'pointer' }}
          >
            Select all
          </span>
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
                <th style={{ padding: '12px 10px', width: '36px' }}></th>
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
                const isActionOpen = activeActionRowId === row.id;

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
                    {/* Row Checkbox */}
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

                    {/* Action Dropdown Menu Button */}
                    <td style={{ padding: '12px 10px', textAlign: 'center', position: 'relative' }}>
                      <button
                        onClick={() => setActiveActionRowId(isActionOpen ? null : row.id)}
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

                      {/* Dropdown Menu when clicked */}
                      {isActionOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '40px',
                            width: '200px',
                            backgroundColor: isLightMode ? '#FFFFFF' : '#1C1C20',
                            borderRadius: '10px',
                            border: `1px solid ${borderColor}`,
                            padding: '6px',
                            zIndex: 40,
                            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.45)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            textAlign: 'left',
                          }}
                        >
                          {/* 1. View */}
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setSelectedBoxForDetails(row.boxId);
                              onViewBox?.(row.boxId);
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
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <Eye size={14} color={subtextColor} />
                            <span>View</span>
                          </div>

                          {/* 2. Unlock box */}
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setTargetBoxId(row.boxId);
                              setShowUnlockModal(true);
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
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <Key size={14} color={subtextColor} />
                            <span>Unlock box</span>
                          </div>

                          {/* 3. Make unavailable (on/off toggle switch) */}
                          <div
                            onClick={() => toggleRowProperty(row.id, 'isUnavailable')}
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
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Power size={14} color={subtextColor} />
                              <span>Make unavailable</span>
                            </div>
                            {/* Toggle Switch */}
                            <div
                              style={{
                                width: '28px',
                                height: '16px',
                                borderRadius: '10px',
                                backgroundColor: row.isUnavailable ? '#F5C842' : isLightMode ? '#E5E7EB' : '#3F3F46',
                                position: 'relative',
                                transition: 'background-color 0.2s',
                              }}
                            >
                              <div
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  borderRadius: '50%',
                                  backgroundColor: row.isUnavailable ? '#000000' : '#FFFFFF',
                                  position: 'absolute',
                                  top: '2px',
                                  left: row.isUnavailable ? '14px' : '2px',
                                  transition: 'left 0.2s',
                                }}
                              />
                            </div>
                          </div>

                          {/* 4. Disable box (on/off toggle switch) */}
                          <div
                            onClick={() => toggleRowProperty(row.id, 'isDisabled')}
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
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Slash size={14} color={subtextColor} />
                              <span>Disable box</span>
                            </div>
                            {/* Toggle Switch */}
                            <div
                              style={{
                                width: '28px',
                                height: '16px',
                                borderRadius: '10px',
                                backgroundColor: row.isDisabled ? '#EF4444' : isLightMode ? '#E5E7EB' : '#3F3F46',
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
                                  left: row.isDisabled ? '14px' : '2px',
                                  transition: 'left 0.2s',
                                }}
                              />
                            </div>
                          </div>

                          {/* 5. Flag box (on/off toggle switch) */}
                          <div
                            onClick={() => toggleRowProperty(row.id, 'isFlagged')}
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
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Flag size={14} color={subtextColor} />
                              <span>Flag box</span>
                            </div>
                            {/* Toggle Switch */}
                            <div
                              style={{
                                width: '28px',
                                height: '16px',
                                borderRadius: '10px',
                                backgroundColor: row.isFlagged ? '#F59E0B' : isLightMode ? '#E5E7EB' : '#3F3F46',
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
                                  left: row.isFlagged ? '14px' : '2px',
                                  transition: 'left 0.2s',
                                }}
                              />
                            </div>
                          </div>

                          {/* 6. Update box */}
                          <div
                            onClick={() => {
                              setActiveActionRowId(null);
                              setTargetBoxId(row.boxId);
                              setShowUpdateModal(true);
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
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <RefreshCw size={14} color={subtextColor} />
                            <span>Update box</span>
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
      </div>

      {/* 6. Filter Modal (Figma Image 5) */}
      <BoxManagementFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        isLightMode={isLightMode}
        onApplyFilters={(filters) => {
          console.log('Applied box filters:', filters);
        }}
      />

      {/* 7. Unlock Box Modal */}
      <UnlockBoxModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        boxId={targetBoxId}
        isLightMode={isLightMode}
        onUnlock={(cabs) => {
          console.log('Unlocked cabinets:', cabs, 'for', targetBoxId);
        }}
      />

      {/* 8. Update Box Modal */}
      <UpdateBoxModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        boxId={targetBoxId}
        isLightMode={isLightMode}
        onUpdate={() => {
          console.log('Updated box:', targetBoxId);
        }}
      />
    </div>
  );
};
