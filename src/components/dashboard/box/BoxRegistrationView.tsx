'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Box,
  Check,
  Power,
  Wrench,
  Unlock,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  Wifi,
  WifiOff,
  Star,
  MapPin,
  Plus,
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Filter,
  Eye,
  Lock,
} from 'lucide-react';
import { BoxUnit, BoxStatus } from '@/types/box';
import { INITIAL_BOX_UNITS } from '@/lib/boxMockData';
import { RegisterBoxModal } from './RegisterBoxModal';
import { BoxDetailModal } from './BoxDetailModal';
import { BoxConfirmModal, BoxActionType } from './BoxConfirmModal';

interface BoxRegistrationViewProps {
  isLightMode?: boolean;
}

export const BoxRegistrationView: React.FC<BoxRegistrationViewProps> = ({ isLightMode = false }) => {
  const [boxes, setBoxes] = useState<BoxUnit[]>(INITIAL_BOX_UNITS);
  const [activeTab, setActiveTab] = useState<'all' | 'activated' | 'disabled' | 'maintenance' | 'low_battery'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modelFilter, setModelFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedBoxIds, setSelectedBoxIds] = useState<string[]>([]);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Modals state
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [inspectingBox, setInspectingBox] = useState<BoxUnit | null>(null);

  // Confirmation modal state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmActionType, setConfirmActionType] = useState<BoxActionType>('disable');
  const [confirmIsBulk, setConfirmIsBulk] = useState(false);
  const [targetBox, setTargetBox] = useState<BoxUnit | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string; type: 'success' | 'warning' | 'error' } | null>(null);

  const showToast = (title: string, subtitle: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setToastMessage({ title, subtitle, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Color Tokens based on theme
  const cardBg = isLightMode ? '#FFFFFF' : '#161619';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';
  const headingColor = isLightMode ? '#111827' : '#FFFFFF';
  const mutedText = isLightMode ? '#6B7280' : '#8E8E93';
  const subMutedText = isLightMode ? '#9CA3AF' : '#71717A';
  const thBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.06)';
  const trBorder = isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.03)';
  const hoverBg = isLightMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)';
  const primaryText = isLightMode ? '#111827' : '#FFFFFF';

  // Stats Calculations
  const totalBoxesCount = 7935;
  const activeCount = boxes.filter((b) => b.status === 'Activated').length;
  const disabledCount = boxes.filter((b) => b.status === 'Disabled').length;
  const maintenanceCount = boxes.filter((b) => b.status === 'Maintenance').length;
  const lowBatteryCount = boxes.filter((b) => b.batteryHealth.percentage < 20).length;

  // Filtered Boxes
  const filteredBoxes = useMemo(() => {
    return boxes.filter((b) => {
      // Tab filter
      if (activeTab === 'activated' && b.status !== 'Activated') return false;
      if (activeTab === 'disabled' && b.status !== 'Disabled') return false;
      if (activeTab === 'maintenance' && b.status !== 'Maintenance') return false;
      if (activeTab === 'low_battery' && b.batteryHealth.percentage >= 20) return false;

      // Model filter
      if (modelFilter !== 'All' && b.model !== modelFilter) return false;

      // State filter
      if (stateFilter !== 'All' && b.state !== stateFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesBoxId = b.boxId.toLowerCase().includes(q);
        const matchesSerial = b.serialNumber.toLowerCase().includes(q);
        const matchesName = b.name.toLowerCase().includes(q);
        const matchesAddress = b.address.toLowerCase().includes(q);
        const matchesOwner = b.ownerName.toLowerCase().includes(q);
        const matchesCity = b.city.toLowerCase().includes(q);
        if (!matchesBoxId && !matchesSerial && !matchesName && !matchesAddress && !matchesOwner && !matchesCity) {
          return false;
        }
      }

      return true;
    });
  }, [boxes, activeTab, modelFilter, stateFilter, searchQuery]);

  // Bulk Selection Handlers
  const handleSelectAll = () => {
    if (selectedBoxIds.length === filteredBoxes.length) {
      setSelectedBoxIds([]);
    } else {
      setSelectedBoxIds(filteredBoxes.map((b) => b.id));
    }
  };

  const handleToggleSelectBox = (id: string) => {
    setSelectedBoxIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Register New Box
  const handleRegisterBox = (newBox: BoxUnit) => {
    setBoxes((prev) => [newBox, ...prev]);
    showToast('Smart Box Registered', `${newBox.boxId} (${newBox.name}) was successfully initialized.`);
  };

  // Update Box
  const handleUpdateBox = (updated: BoxUnit) => {
    setBoxes((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    if (inspectingBox?.id === updated.id) {
      setInspectingBox(updated);
    }
  };

  // Open Confirm Modal
  const requestConfirmAction = (actionType: BoxActionType, box: BoxUnit | null, isBulk: boolean = false) => {
    setConfirmActionType(actionType);
    setConfirmIsBulk(isBulk);
    setTargetBox(box);
    setConfirmModalOpen(true);
    setActiveActionMenuId(null);
  };

  // Execute Confirmed Action
  const handleExecuteConfirmedAction = () => {
    if (confirmIsBulk) {
      if (confirmActionType === 'disable') {
        setBoxes((prev) =>
          prev.map((b) => (selectedBoxIds.includes(b.id) ? { ...b, status: 'Disabled' as BoxStatus } : b))
        );
        showToast('Boxes Disabled', `${selectedBoxIds.length} units disabled.`, 'warning');
      } else if (confirmActionType === 'activate') {
        setBoxes((prev) =>
          prev.map((b) => (selectedBoxIds.includes(b.id) ? { ...b, status: 'Activated' as BoxStatus } : b))
        );
        showToast('Boxes Activated', `${selectedBoxIds.length} units activated.`);
      } else if (confirmActionType === 'maintenance') {
        setBoxes((prev) =>
          prev.map((b) => (selectedBoxIds.includes(b.id) ? { ...b, status: 'Maintenance' as BoxStatus } : b))
        );
        showToast('Maintenance Scheduled', `${selectedBoxIds.length} units placed in maintenance.`);
      }
      setSelectedBoxIds([]);
    } else if (targetBox) {
      if (confirmActionType === 'disable') {
        const nextStatus: BoxStatus = targetBox.status === 'Disabled' ? 'Activated' : 'Disabled';
        const updated = { ...targetBox, status: nextStatus };
        handleUpdateBox(updated);
        showToast(
          nextStatus === 'Disabled' ? 'Box Disabled' : 'Box Activated',
          `${targetBox.boxId} status changed to ${nextStatus}.`
        );
      } else if (confirmActionType === 'maintenance') {
        const nextStatus: BoxStatus = targetBox.status === 'Maintenance' ? 'Activated' : 'Maintenance';
        const updated = { ...targetBox, status: nextStatus };
        handleUpdateBox(updated);
        showToast(
          nextStatus === 'Maintenance' ? 'Maintenance Active' : 'Maintenance Ended',
          `${targetBox.boxId} set to ${nextStatus}.`
        );
      } else if (confirmActionType === 'unlock_all') {
        const updatedCompartments = targetBox.compartments.map((c) => ({
          ...c,
          isLocked: false,
          lastOpenedAt: 'Just now (Master Unlock)',
        }));
        const updated: BoxUnit = {
          ...targetBox,
          compartments: updatedCompartments,
          eventLogs: [
            {
              id: `ev-${Date.now()}`,
              timestamp: 'Just now',
              eventType: 'unlock',
              title: 'Master Emergency Unlock Triggered',
              description: 'All solenoid door latches released simultaneously via Admin override.',
              actor: 'Stephanie (Superadmin)',
              severity: 'critical',
            },
            ...(targetBox.eventLogs || []),
          ],
        };
        handleUpdateBox(updated);
        showToast('Emergency Unlock Executed', `All doors on ${targetBox.boxId} unlocked.`, 'warning');
      }
    }
  };

  const handleOpenDetailModal = (box: BoxUnit) => {
    setInspectingBox(box);
    setDetailModalOpen(true);
    setActiveActionMenuId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 150,
            padding: '14px 20px',
            borderRadius: '12px',
            backgroundColor:
              toastMessage.type === 'error'
                ? '#EF4444'
                : toastMessage.type === 'warning'
                ? '#D97706'
                : '#10B981',
            color: '#FFFFFF',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideInRight 0.25s ease-out',
          }}
        >
          {toastMessage.type === 'error' ? (
            <XCircle size={20} />
          ) : toastMessage.type === 'warning' ? (
            <AlertTriangle size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>{toastMessage.title}</div>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>{toastMessage.subtitle}</div>
          </div>
        </div>
      )}

      {/* Top Section: Header & Quick Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
        }}
      >
        {/* Card 1: Total Registered Boxes */}
        <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '16px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: mutedText, fontWeight: 600 }}>Total Registered Boxes</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(245, 200, 66, 0.12)',
                color: '#F5C842',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box size={16} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: primaryText }}>
            {totalBoxesCount.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>+12% today</span> • <span style={{ color: mutedText }}>320 Cities nationwide</span>
          </div>
        </div>

        {/* Card 2: Active & Online */}
        <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '16px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: mutedText, fontWeight: 600 }}>Active & Online</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: primaryText }}>
            7,412 <span style={{ fontSize: '13px', fontWeight: 500, color: '#10B981' }}>(93.4%)</span>
          </div>
          <div style={{ fontSize: '11px', color: mutedText, marginTop: '4px' }}>
            Full telemetry & locker availability
          </div>
        </div>

        {/* Card 3: In Maintenance / Disabled */}
        <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '16px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: mutedText, fontWeight: 600 }}>Maintenance & Offline</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Wrench size={16} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: primaryText }}>
            {maintenanceCount + disabledCount}
          </div>
          <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>
            {disabledCount} Disabled • {maintenanceCount} In Maintenance
          </div>
        </div>

        {/* Card 4: Battery & Sensor Health */}
        <div style={{ backgroundColor: cardBg, border: cardBorder, borderRadius: '16px', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: mutedText, fontWeight: 600 }}>Critical Battery (&lt;20%)</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BatteryLow size={16} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: primaryText }}>
            18 <span style={{ fontSize: '12px', fontWeight: 500, color: mutedText }}>units</span>
          </div>
          <div style={{ fontSize: '11px', color: '#F59E0B', marginTop: '4px' }}>
            Technician swap dispatches pending
          </div>
        </div>
      </div>

      {/* Main Container Card: Navigation Tabs, Search, Filters, and Table */}
      <div
        style={{
          backgroundColor: cardBg,
          border: cardBorder,
          borderRadius: '18px',
          padding: '20px 24px',
          boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Top Controls Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          {/* Status Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Boxes', count: boxes.length },
              { id: 'activated', label: 'Activated', count: activeCount },
              { id: 'disabled', label: 'Disabled', count: disabledCount },
              { id: 'maintenance', label: 'Maintenance', count: maintenanceCount },
              { id: 'low_battery', label: 'Low Battery (<20%)', count: lowBatteryCount },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: isActive ? '#F5C842' : isLightMode ? '#F3F4F6' : '#202025',
                    color: isActive ? '#000000' : mutedText,
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'rgba(0, 0, 0, 0.15)' : isLightMode ? '#E5E7EB' : '#2A2A30',
                      color: isActive ? '#000000' : subMutedText,
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action: Register Box Button */}
          <button
            onClick={() => setRegisterModalOpen(true)}
            style={{
              padding: '9px 18px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#F5C842',
              color: '#000000',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Plus size={16} />
            <span>Register New Box</span>
          </button>
        </div>

        {/* Filter & Search Bar Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: isLightMode ? '#F9FAFB' : '#111114',
              border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '0 12px',
              height: '38px',
              width: '100%',
              maxWidth: '360px',
            }}
          >
            <Search size={16} color={mutedText} />
            <input
              type="text"
              placeholder="Search by Box ID, Serial, Owner, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: primaryText,
                fontSize: '13px',
                paddingLeft: '10px',
                width: '100%',
                outline: 'none',
              }}
            />
          </div>

          {/* Filters & View Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Model Filter */}
            <div style={{ position: 'relative' }}>
              <select
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                style={{
                  height: '38px',
                  padding: '0 28px 0 12px',
                  borderRadius: '10px',
                  backgroundColor: isLightMode ? '#F9FAFB' : '#111114',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: primaryText,
                  fontSize: '12px',
                  fontWeight: 500,
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="All">All Models</option>
                <option value="2 Cabinets">2 Cabinets</option>
                <option value="4 Cabinets">4 Cabinets</option>
                <option value="6 Cabinets">6 Cabinets</option>
                <option value="8 Cabinets">8 Cabinets</option>
              </select>
              <ChevronDown
                size={14}
                color={mutedText}
                style={{ position: 'absolute', right: '10px', top: '12px', pointerEvents: 'none' }}
              />
            </div>

            {/* State Filter */}
            <div style={{ position: 'relative' }}>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                style={{
                  height: '38px',
                  padding: '0 28px 0 12px',
                  borderRadius: '10px',
                  backgroundColor: isLightMode ? '#F9FAFB' : '#111114',
                  border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: primaryText,
                  fontSize: '12px',
                  fontWeight: 500,
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="All">All States</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Rivers">Rivers</option>
                <option value="Oyo">Oyo</option>
                <option value="Enugu">Enugu</option>
              </select>
              <ChevronDown
                size={14}
                color={mutedText}
                style={{ position: 'absolute', right: '10px', top: '12px', pointerEvents: 'none' }}
              />
            </div>

            {/* View Mode Toggle: Table vs Visual Grid */}
            <div
              style={{
                display: 'flex',
                backgroundColor: isLightMode ? '#F3F4F6' : '#111114',
                borderRadius: '10px',
                padding: '3px',
                border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('table')}
                title="Table View"
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: viewMode === 'table' ? '#F5C842' : 'transparent',
                  color: viewMode === 'table' ? '#000000' : mutedText,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TableIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Visual Locker Grid View"
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? '#F5C842' : 'transparent',
                  color: viewMode === 'grid' ? '#000000' : mutedText,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Multi-Select Bulk Actions Bar */}
        {selectedBoxIds.length > 0 && (
          <div
            style={{
              marginBottom: '16px',
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: isLightMode ? '#FEF3C7' : 'rgba(245, 200, 66, 0.15)',
              border: '1px solid rgba(245, 200, 66, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.15s ease-out',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 600, color: isLightMode ? '#92400E' : '#F5C842' }}>
              {selectedBoxIds.length} of {filteredBoxes.length} boxes selected
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => requestConfirmAction('activate', null, true)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Check size={14} />
                <span>Activate Selected</span>
              </button>

              <button
                onClick={() => requestConfirmAction('disable', null, true)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Power size={14} />
                <span>Disable Selected</span>
              </button>

              <button
                onClick={() => requestConfirmAction('maintenance', null, true)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(245, 200, 66, 0.5)',
                  backgroundColor: 'transparent',
                  color: isLightMode ? '#92400E' : '#F5C842',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Wrench size={14} />
                <span>Set to Maintenance</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: ENTERPRISE DATA TABLE */}
        {viewMode === 'table' ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
              <thead>
                <tr style={{ borderBottom: thBorder }}>
                  <th style={{ padding: '10px 12px', width: '38px' }}>
                    <input
                      type="checkbox"
                      checked={selectedBoxIds.length > 0 && selectedBoxIds.length === filteredBoxes.length}
                      onChange={handleSelectAll}
                      style={{ cursor: 'pointer', accentColor: '#F5C842' }}
                    />
                  </th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Box ID / Serial</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Owner & Host</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Model & Doors</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Location</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Battery & IoT</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Usage Rate</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600 }}>Rating</th>
                  <th style={{ padding: '10px 12px', fontSize: '11px', color: subMutedText, fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoxes.map((box) => {
                  const isChecked = selectedBoxIds.includes(box.id);
                  const isMenuOpen = activeActionMenuId === box.id;

                  return (
                    <tr
                      key={box.id}
                      onClick={() => handleOpenDetailModal(box)}
                      style={{
                        borderBottom: trBorder,
                        transition: 'background 0.15s',
                        cursor: 'pointer',
                        backgroundColor: isChecked ? (isLightMode ? 'rgba(245, 200, 66, 0.08)' : 'rgba(245, 200, 66, 0.04)') : 'transparent',
                      }}
                      onMouseOver={(e) => {
                        if (!isChecked) e.currentTarget.style.backgroundColor = hoverBg;
                      }}
                      onMouseOut={(e) => {
                        if (!isChecked) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '12px' }} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectBox(box.id)}
                          style={{ cursor: 'pointer', accentColor: '#F5C842' }}
                        />
                      </td>

                      {/* Box ID & Nickname */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              backgroundColor: isLightMode ? '#F3F4F6' : '#222228',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#F5C842',
                              flexShrink: 0,
                            }}
                          >
                            <Box size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>
                              {box.boxId}
                            </div>
                            <div style={{ fontSize: '11px', color: subMutedText }}>
                              {box.name} • <span style={{ fontFamily: 'monospace' }}>{box.serialNumber}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Owner & Host */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={box.ownerAvatar}
                            alt={box.ownerName}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>
                              {box.ownerName}
                            </div>
                            <div style={{ fontSize: '10px', color: mutedText }}>
                              {box.ownerEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Model & Door status chips */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>
                          {box.model}
                        </div>
                        <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
                          {box.compartments.slice(0, 4).map((c) => (
                            <span
                              key={c.id}
                              title={`${c.label}: ${c.status}`}
                              style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '3px',
                                backgroundColor:
                                  c.status === 'Occupied'
                                    ? '#6366F1'
                                    : c.status === 'Available'
                                    ? '#10B981'
                                    : '#F5C842',
                                display: 'inline-block',
                              }}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Location */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontSize: '12px', color: primaryText }}>{box.address}</div>
                        <div style={{ fontSize: '11px', color: subMutedText }}>{box.city}</div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor:
                              box.status === 'Activated'
                                ? 'rgba(16, 185, 129, 0.12)'
                                : box.status === 'Disabled'
                                ? 'rgba(239, 68, 68, 0.12)'
                                : 'rgba(245, 200, 66, 0.12)',
                            color:
                              box.status === 'Activated'
                                ? '#10B981'
                                : box.status === 'Disabled'
                                ? '#EF4444'
                                : '#F5C842',
                          }}
                        >
                          {box.status}
                        </span>
                      </td>

                      {/* Battery & IoT */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {box.batteryHealth.isCharging ? (
                            <BatteryCharging size={14} color="#10B981" />
                          ) : box.batteryHealth.percentage < 20 ? (
                            <BatteryLow size={14} color="#EF4444" />
                          ) : (
                            <BatteryMedium size={14} color="#F5C842" />
                          )}
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 600,
                              color: box.batteryHealth.percentage < 20 ? '#EF4444' : primaryText,
                            }}
                          >
                            {box.batteryHealth.percentage}%
                          </span>
                          <span style={{ fontSize: '11px', color: subMutedText }}>
                            • {box.iotStatus.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </td>

                      {/* Usage Rate */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '50px',
                              height: '6px',
                              borderRadius: '3px',
                              backgroundColor: isLightMode ? '#E5E7EB' : '#2A2A30',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                width: box.usageRate,
                                height: '100%',
                                backgroundColor: '#F5C842',
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>
                            {box.usageRate}
                          </span>
                        </div>
                      </td>

                      {/* Rating */}
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#F5C842' }}>
                          <Star size={12} fill="#F5C842" />
                          <span>{box.rating.toFixed(1)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px', textAlign: 'right', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setActiveActionMenuId(isMenuOpen ? null : box.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: mutedText,
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '6px',
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Dropdown Action Menu */}
                        {isMenuOpen && (
                          <div
                            style={{
                              position: 'absolute',
                              right: '12px',
                              top: '40px',
                              zIndex: 60,
                              backgroundColor: isLightMode ? '#FFFFFF' : '#1A1A1E',
                              border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '10px',
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                              width: '180px',
                              padding: '6px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                              textAlign: 'left',
                            }}
                          >
                            <button
                              onClick={() => handleOpenDetailModal(box)}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                background: 'none',
                                border: 'none',
                                color: primaryText,
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                borderRadius: '6px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <Eye size={14} color="#F5C842" />
                              <span>View Unit Details</span>
                            </button>

                            <button
                              onClick={() => requestConfirmAction('maintenance', box)}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                background: 'none',
                                border: 'none',
                                color: primaryText,
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                borderRadius: '6px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <Wrench size={14} color="#F5C842" />
                              <span>
                                {box.status === 'Maintenance' ? 'Exit Maintenance' : 'Set Maintenance'}
                              </span>
                            </button>

                            <button
                              onClick={() => requestConfirmAction('unlock_all', box)}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                background: 'none',
                                border: 'none',
                                color: primaryText,
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                borderRadius: '6px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <Unlock size={14} color="#EF4444" />
                              <span>Emergency Unlock</span>
                            </button>

                            <div style={{ height: '1px', backgroundColor: isLightMode ? '#E5E7EB' : 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

                            <button
                              onClick={() => requestConfirmAction('disable', box)}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                background: 'none',
                                border: 'none',
                                color: box.status === 'Activated' ? '#EF4444' : '#10B981',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                borderRadius: '6px',
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#2A2A30')}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <Power size={14} />
                              <span>{box.status === 'Activated' ? 'Disable Box' : 'Activate Box'}</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* VIEW 2: VISUAL LOCKER GRID CARDS (Featuring Official Wooden Smart Cabinets) */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredBoxes.map((box) => {
              const isChecked = selectedBoxIds.includes(box.id);

              return (
                <div
                  key={box.id}
                  onClick={() => handleOpenDetailModal(box)}
                  style={{
                    backgroundColor: isLightMode ? '#FFFFFF' : '#141417',
                    border: isChecked
                      ? '2px solid #F5C842'
                      : isLightMode
                      ? '1px solid #E5E7EB'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    position: 'relative',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = isLightMode
                      ? '0 8px 24px rgba(0,0,0,0.06)'
                      : '0 8px 24px rgba(0,0,0,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Top Row: Checkbox, Box ID, Status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleToggleSelectBox(box.id)}
                        style={{ cursor: 'pointer', accentColor: '#F5C842' }}
                      />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText }}>
                        {box.boxId}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '20px',
                        backgroundColor:
                          box.status === 'Activated'
                            ? 'rgba(16, 185, 129, 0.12)'
                            : box.status === 'Disabled'
                            ? 'rgba(239, 68, 68, 0.12)'
                            : 'rgba(245, 200, 66, 0.12)',
                        color:
                          box.status === 'Activated'
                            ? '#10B981'
                            : box.status === 'Disabled'
                            ? '#EF4444'
                            : '#F5C842',
                      }}
                    >
                      {box.status}
                    </span>
                  </div>

                  {/* Physical Cabinet Visual Representation */}
                  <div
                    style={{
                      height: '140px',
                      borderRadius: '12px',
                      backgroundColor: isLightMode ? '#F9FAFB' : '#1B1B1F',
                      border: isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src="/image/box1.png"
                      alt={box.name}
                      style={{ height: '110px', width: 'auto', objectFit: 'contain' }}
                    />

                    {/* Overlay badge with model & capacity */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: '#FFFFFF',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {box.model}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(245, 200, 66, 0.9)',
                        color: '#000000',
                      }}
                    >
                      {box.usageRate} Occupied
                    </div>
                  </div>

                  {/* Box Name & Address */}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: primaryText }}>
                      {box.name}
                    </div>
                    <div style={{ fontSize: '11px', color: mutedText, marginTop: '2px' }}>
                      {box.address}, {box.city}
                    </div>
                  </div>

                  {/* Door Status Pills */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                    {box.compartments.slice(0, 4).map((c) => (
                      <div
                        key={c.id}
                        style={{
                          textAlign: 'center',
                          padding: '4px 2px',
                          borderRadius: '6px',
                          backgroundColor:
                            c.status === 'Occupied'
                              ? 'rgba(99, 102, 241, 0.15)'
                              : c.status === 'Available'
                              ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(245, 200, 66, 0.15)',
                          color:
                            c.status === 'Occupied'
                              ? '#6366F1'
                              : c.status === 'Available'
                              ? '#10B981'
                              : '#F5C842',
                          fontSize: '10px',
                          fontWeight: 700,
                        }}
                      >
                        {c.label.split(' ')[0]}
                      </div>
                    ))}
                  </div>

                  {/* Card Footer: Battery & Owner */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '8px',
                      borderTop: isLightMode ? '1px solid #F3F4F6' : '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '11px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img
                        src={box.ownerAvatar}
                        alt={box.ownerName}
                        style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ color: mutedText, fontWeight: 500 }}>{box.ownerName.split(' ')[0]}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {box.batteryHealth.isCharging ? (
                        <BatteryCharging size={13} color="#10B981" />
                      ) : (
                        <BatteryMedium size={13} color="#F5C842" />
                      )}
                      <span style={{ fontWeight: 600, color: primaryText }}>
                        {box.batteryHealth.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Register New Box Modal */}
      <RegisterBoxModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onRegisterBox={handleRegisterBox}
        isLightMode={isLightMode}
      />

      {/* Inspect Box Detail Modal */}
      <BoxDetailModal
        box={inspectingBox}
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setInspectingBox(null);
        }}
        onUpdateBox={handleUpdateBox}
        onRequestConfirmAction={(actionType, box) => requestConfirmAction(actionType, box, false)}
        isLightMode={isLightMode}
      />

      {/* Keyword Confirm Modal */}
      <BoxConfirmModal
        isOpen={confirmModalOpen}
        actionType={confirmActionType}
        isBulk={confirmIsBulk}
        boxCount={selectedBoxIds.length}
        boxIdentifier={targetBox?.boxId}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleExecuteConfirmedAction}
        isLightMode={isLightMode}
      />
    </div>
  );
};
