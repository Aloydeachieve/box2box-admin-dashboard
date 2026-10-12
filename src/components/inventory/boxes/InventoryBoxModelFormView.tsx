'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronDown,
  Search,
  X,
  Plus,
  Check,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { defaultPartsList } from '@/lib/inventoryMockData';

interface InventoryBoxModelFormViewProps {
  mode: 'create' | 'edit';
  modelId?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const InventoryBoxModelFormView: React.FC<InventoryBoxModelFormViewProps> = ({
  mode,
  modelId = 'mybox-standard',
  onCancel,
  onSuccess,
}) => {
  const router = useRouter();
  const { isLightMode } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form Fields State
  const [sku, setSku] = useState(mode === 'edit' ? '1234567' : 'MBX-' + Math.floor(100000 + Math.random() * 900000));
  const [modelName, setModelName] = useState(mode === 'edit' ? 'MyBox-Standard' : '');
  const [material, setMaterial] = useState<'Wood' | 'Metal' | ''>(mode === 'edit' ? 'Wood' : '');
  const [cabinets, setCabinets] = useState<string>(mode === 'edit' ? '3' : '');
  const [amount, setAmount] = useState<string>(mode === 'edit' ? '100,000' : '');
  const [specifications, setSpecifications] = useState<string>(
    mode === 'edit'
      ? 'This digital storage unit features a sturdy, ventilated design with tool-free assembly and a 5-year warranty. Ideal for organizing and protecting your valuable data.'
      : ''
  );
  const [images, setImages] = useState<string[]>(
    mode === 'edit' ? ['/image/box1.png'] : []
  );
  const [universalParts, setUniversalParts] = useState<string[]>(
    mode === 'edit' ? ['Battery', 'Motherboard', 'Wheels'] : []
  );
  const [cabinetParts, setCabinetParts] = useState<string[]>(
    mode === 'edit' ? ['Doors', 'Locks', 'Hinge'] : []
  );

  // Focus and Dropdown States
  const [activeFocusField, setActiveFocusField] = useState<string | null>(
    mode === 'edit' ? null : 'sku'
  );
  const [materialDropdownOpen, setMaterialDropdownOpen] = useState(false);
  const [universalPartsOpen, setUniversalPartsOpen] = useState(false);
  const [cabinetPartsOpen, setCabinetPartsOpen] = useState(false);
  const [universalPartsSearch, setUniversalPartsSearch] = useState('');
  const [cabinetPartsSearch, setCabinetPartsSearch] = useState('');

  // Toast State
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Theme Colors
  const bgColor = isLightMode ? '#F9FAFB' : '#0B0B0C';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const popupBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const inputBg = isLightMode ? '#F3F4F6' : '#141416';
  const yellowColor = '#F5C842';

  // Parts list filtered by search
  const filteredUniversalParts = defaultPartsList.filter((p) =>
    p.toLowerCase().includes(universalPartsSearch.toLowerCase())
  );
  const filteredCabinetParts = defaultPartsList.filter((p) =>
    p.toLowerCase().includes(cabinetPartsSearch.toLowerCase())
  );

  // Toggle Universal Part
  const toggleUniversalPart = (part: string) => {
    setUniversalParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  // Toggle Cabinet Part
  const toggleCabinetPart = (part: string) => {
    setCabinetParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImages((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Remove Image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Back
  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      setActiveToast({
        type: 'success',
        title: 'Model Created',
        message: `${modelName || 'New model'} created successfully`,
      });
    } else {
      setActiveToast({
        type: 'success',
        title: 'Model Updated',
        message: `${modelName} updated successfully`,
      });
    }

    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/inventory');
      }
    }, 1200);
  };

  return (
    <div
      style={{
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
      }}
      onClick={() => {
        if (materialDropdownOpen) setMaterialDropdownOpen(false);
        if (universalPartsOpen) setUniversalPartsOpen(false);
        if (cabinetPartsOpen) setCabinetPartsOpen(false);
      }}
    >
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

      {/* Top Header Row with Back Chevron */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: textColor,
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.15s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#E5E7EB' : '#222226')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <ChevronLeft size={22} />
        </button>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {mode === 'create' ? 'New box model' : 'Edit box model'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* SECTION 1: ABOUT BOX */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '28px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 20px 0',
            }}
          >
            About box
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '18px 20px',
            }}
          >
            {/* SKU (Auto-generated) */}
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'sku'
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '2px' }}>
                  SKU (Auto-generated)
                </div>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  onFocus={() => setActiveFocusField('sku')}
                  onBlur={() => setActiveFocusField(null)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: textColor,
                    padding: 0,
                  }}
                />
              </div>
            </div>

            {/* Model Name */}
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'modelName'
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '2px' }}>
                  Model name
                </div>
                <input
                  type="text"
                  placeholder="Model name"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  onFocus={() => setActiveFocusField('modelName')}
                  onBlur={() => setActiveFocusField(null)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: textColor,
                    padding: 0,
                  }}
                />
              </div>
            </div>

            {/* Material Dropdown */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setMaterialDropdownOpen(!materialDropdownOpen);
                  setUniversalPartsOpen(false);
                  setCabinetPartsOpen(false);
                  setActiveFocusField('material');
                }}
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'material' || materialDropdownOpen
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '2px' }}>
                    Material
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: material ? textColor : subtextColor,
                    }}
                  >
                    {material || 'Select material'}
                  </div>
                </div>
                <ChevronDown size={18} color={subtextColor} />
              </div>

              {/* Material Dropdown Popup with Radio Buttons */}
              {materialDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    right: 0,
                    backgroundColor: popupBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '12px',
                    padding: '12px 16px',
                    zIndex: 50,
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: textColor,
                      marginBottom: '10px',
                    }}
                  >
                    Select material
                  </div>
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: borderColor,
                      marginBottom: '12px',
                    }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(['Wood', 'Metal'] as const).map((mat) => {
                      const isSelected = material === mat;
                      return (
                        <div
                          key={mat}
                          onClick={() => {
                            setMaterial(mat);
                            setMaterialDropdownOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: textColor,
                          }}
                        >
                          {/* Radio Button */}
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: `2px solid ${isSelected ? yellowColor : subtextColor}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'border-color 0.15s ease',
                            }}
                          >
                            {isSelected && (
                              <div
                                style={{
                                  width: '9px',
                                  height: '9px',
                                  borderRadius: '50%',
                                  backgroundColor: yellowColor,
                                }}
                              />
                            )}
                          </div>
                          <span>{mat}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Number of Cabinets */}
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'cabinets'
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '2px' }}>
                  Number of cabinets
                </div>
                <input
                  type="text"
                  placeholder="3"
                  value={cabinets}
                  onChange={(e) => setCabinets(e.target.value)}
                  onFocus={() => setActiveFocusField('cabinets')}
                  onBlur={() => setActiveFocusField(null)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: textColor,
                    padding: 0,
                  }}
                />
              </div>
            </div>

            {/* Amount with Naira Currency Symbol on the Right */}
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'amount'
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '2px' }}>
                    Amount
                  </div>
                  <input
                    type="text"
                    placeholder="100,000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onFocus={() => setActiveFocusField('amount')}
                    onBlur={() => setActiveFocusField(null)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: textColor,
                      padding: 0,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: textColor,
                    paddingLeft: '8px',
                    userSelect: 'none',
                  }}
                >
                  ₦
                </span>
              </div>
            </div>

            {/* Placeholder column to align with Figma 2-column grid */}
            <div />

            {/* Specifications (Full Width) */}
            <div style={{ gridColumn: 'span 2' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'specifications'
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '4px' }}>
                  Specifications
                </div>
                <textarea
                  placeholder="Enter specifications..."
                  rows={3}
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                  onFocus={() => setActiveFocusField('specifications')}
                  onBlur={() => setActiveFocusField(null)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: textColor,
                    padding: 0,
                    resize: 'none',
                    fontFamily: 'inherit',
                    lineHeight: 1.5,
                  }}
                />
              </div>
            </div>

            {/* Images Upload / Preview Row */}
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* + Box Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: textColor,
                  transition: 'background-color 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isLightMode ? '#E5E7EB' : '#222226')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = inputBg)}
              >
                <Plus size={20} />
              </button>

              {/* Uploaded Image Thumbnails with (X) Badge */}
              {images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    overflow: 'visible',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: '#1E1E22',
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt="Box thumbnail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Circular Close/Delete Badge matching Image 4 */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                      padding: 0,
                    }}
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: PARTS */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            padding: '28px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: textColor,
              margin: '0 0 20px 0',
            }}
          >
            Parts
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '18px 20px',
            }}
          >
            {/* Universal Parts Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setUniversalPartsOpen(!universalPartsOpen);
                  setCabinetPartsOpen(false);
                  setMaterialDropdownOpen(false);
                  setActiveFocusField('universalParts');
                }}
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'universalParts' || universalPartsOpen
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ overflow: 'hidden', paddingRight: '8px' }}>
                  <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '2px' }}>
                    Universal parts
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: universalParts.length > 0 ? textColor : subtextColor,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {universalParts.length > 0
                      ? universalParts.join(', ')
                      : 'Universal parts'}
                  </div>
                </div>
                <ChevronDown size={18} color={subtextColor} style={{ flexShrink: 0 }} />
              </div>

              {/* Universal Parts Dropdown Modal matching Image 2 */}
              {universalPartsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    width: '320px',
                    backgroundColor: popupBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '14px',
                    padding: '16px',
                    zIndex: 60,
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>
                      Select parts
                    </span>
                    <button
                      type="button"
                      onClick={() => setUniversalPartsOpen(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: subtextColor,
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Search bar with magnifying glass on right */}
                  <div
                    style={{
                      position: 'relative',
                      marginBottom: '14px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      value={universalPartsSearch}
                      onChange={(e) => setUniversalPartsSearch(e.target.value)}
                      style={{
                        width: '100%',
                        height: '36px',
                        backgroundColor: isLightMode ? '#F3F4F6' : '#141416',
                        border: `1px solid ${borderColor}`,
                        borderRadius: '8px',
                        padding: '0 34px 0 12px',
                        fontSize: '13px',
                        color: textColor,
                        outline: 'none',
                      }}
                    />
                    <Search
                      size={15}
                      color={subtextColor}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* Checkbox List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredUniversalParts.map((part) => {
                      const isChecked = universalParts.includes(part);
                      return (
                        <div
                          key={part}
                          onClick={() => toggleUniversalPart(part)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '6px 4px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                          }}
                        >
                          <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                            {part}
                          </span>

                          {/* Yellow Checked Square */}
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              backgroundColor: isChecked ? yellowColor : 'transparent',
                              border: isChecked ? `1px solid ${yellowColor}` : `1px solid ${subtextColor}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Cabinet Parts Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCabinetPartsOpen(!cabinetPartsOpen);
                  setUniversalPartsOpen(false);
                  setMaterialDropdownOpen(false);
                  setActiveFocusField('cabinetParts');
                }}
                style={{
                  position: 'relative',
                  borderRadius: '10px',
                  border:
                    activeFocusField === 'cabinetParts' || cabinetPartsOpen
                      ? `1px solid ${yellowColor}`
                      : `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ overflow: 'hidden', paddingRight: '8px' }}>
                  <div style={{ fontSize: '11px', color: subtextColor, marginBottom: '2px' }}>
                    Cabinet parts
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: cabinetParts.length > 0 ? textColor : subtextColor,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cabinetParts.length > 0
                      ? cabinetParts.join(', ')
                      : 'Cabinet parts'}
                  </div>
                </div>
                <ChevronDown size={18} color={subtextColor} style={{ flexShrink: 0 }} />
              </div>

              {/* Cabinet Parts Dropdown Modal matching Image 3 */}
              {cabinetPartsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    width: '320px',
                    backgroundColor: popupBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '14px',
                    padding: '16px',
                    zIndex: 60,
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700, color: textColor }}>
                      Select parts
                    </span>
                    <button
                      type="button"
                      onClick={() => setCabinetPartsOpen(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: subtextColor,
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Search bar with magnifying glass on right */}
                  <div
                    style={{
                      position: 'relative',
                      marginBottom: '14px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      value={cabinetPartsSearch}
                      onChange={(e) => setCabinetPartsSearch(e.target.value)}
                      style={{
                        width: '100%',
                        height: '36px',
                        backgroundColor: isLightMode ? '#F3F4F6' : '#141416',
                        border: `1px solid ${borderColor}`,
                        borderRadius: '8px',
                        padding: '0 34px 0 12px',
                        fontSize: '13px',
                        color: textColor,
                        outline: 'none',
                      }}
                    />
                    <Search
                      size={15}
                      color={subtextColor}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* Checkbox List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredCabinetParts.map((part) => {
                      const isChecked = cabinetParts.includes(part);
                      return (
                        <div
                          key={part}
                          onClick={() => toggleCabinetPart(part)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '6px 4px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                          }}
                        >
                          <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                            {part}
                          </span>

                          {/* Yellow Checked Square */}
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              backgroundColor: isChecked ? yellowColor : 'transparent',
                              border: isChecked ? `1px solid ${yellowColor}` : `1px solid ${subtextColor}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {isChecked && <Check size={13} color="#000000" strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM SUBMIT BUTTON */}
        <div>
          <button
            type="submit"
            style={{
              backgroundColor: yellowColor,
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              padding: '11px 28px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(245, 200, 66, 0.3)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(245, 200, 66, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(245, 200, 66, 0.3)';
            }}
          >
            {mode === 'create' ? 'Add new model' : 'Update model'}
          </button>
        </div>
      </form>
    </div>
  );
};
