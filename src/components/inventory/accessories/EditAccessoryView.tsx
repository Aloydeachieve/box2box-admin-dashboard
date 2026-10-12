'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  X,
  Plus,
  Search,
  Check,
} from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';

interface EditAccessoryViewProps {
  accessoryId?: string;
}

export const EditAccessoryView: React.FC<EditAccessoryViewProps> = ({ accessoryId = '1234567' }) => {
  const router = useRouter();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  // Prefilled Form State matching Image 3
  const [sku, setSku] = useState('1234567');
  const [accessoryName, setAccessoryName] = useState('Given name of accessory');
  const [selectedCategory, setSelectedCategory] = useState<string>('Main module');
  const [amount, setAmount] = useState('100,000');
  const [specifications, setSpecifications] = useState(
    'This digital storage unit features a sturdy, ventilated design with tool-free assembly and a 5-year warranty. Ideal for organizing and protecting your valuable data.'
  );
  const [selectedParts, setSelectedParts] = useState<string[]>(['Battery', 'Motherboard', 'Wheels', 'Doors', 'Locks', 'Hinge']);
  const [selectedModel, setSelectedModel] = useState<string>('MyBox-Standard');
  const [uploadedImages, setUploadedImages] = useState<string[]>(['/image/box1.png']);

  // Popover Modals State (Matching Image 3 popovers)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showPartsPicker, setShowPartsPicker] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);

  // Parts Picker temporary selection & search
  const [partsSearch, setPartsSearch] = useState('');
  const [tempParts, setTempParts] = useState<string[]>(['Battery', 'Motherboard', 'Wheels', 'Doors', 'Locks', 'Hinge']);

  // Toast State
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Setup Back navigation
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.back();
    });
    return () => {
      setCustomBack(null);
    };
  }, [router, setCustomBack, setHeaderActions]);

  // Theme Styling Tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#F9FAFB' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  // Available options
  const categoryOptions = ['Main module', 'Extensions'];
  const allPartsOptions = ['Battery', 'Motherboard', 'Wheels', 'Doors', 'Locks', 'Hinge'];
  const modelOptions = ['MyBox-Standard', 'MyBox-Zero'];

  // Handle Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages((prev) => [...prev, imageUrl]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle part selection
  const handleTogglePart = (part: string) => {
    if (tempParts.includes(part)) {
      setTempParts((prev) => prev.filter((p) => p !== part));
    } else {
      setTempParts((prev) => [...prev, part]);
    }
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessoryName.trim()) {
      setActiveToast({
        type: 'flag',
        title: 'Validation Error',
        message: 'Please provide an accessory name',
      });
      return;
    }

    setActiveToast({
      type: 'success',
      title: 'Accessory Updated',
      message: `${accessoryName} has been updated successfully`,
    });

    setTimeout(() => {
      router.back();
    }, 900);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        color: textColor,
        fontFamily: 'var(--font-outfit), sans-serif',
        paddingBottom: '80px',
        maxWidth: '1200px',
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* CARD 1: ABOUT ACCESSORY matching Image 3 */}
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>
            About accessory
          </div>

          {/* Row 1: SKU (Auto-generated) with yellow border & Accessory name */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* SKU (Auto-generated) with yellow border */}
            <div
              style={{
                position: 'relative',
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${yellowColor}`,
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '54px',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                SKU (Auto-generated)
              </span>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  padding: 0,
                  marginTop: '2px',
                }}
              />
            </div>

            {/* Accessory name */}
            <div
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                minHeight: '54px',
                boxSizing: 'border-box',
              }}
            >
              <input
                type="text"
                placeholder="Accessory name"
                value={accessoryName}
                onChange={(e) => setAccessoryName(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: '13px',
                  outline: 'none',
                  padding: 0,
                }}
              />
            </div>
          </div>

          {/* Row 2: Category Trigger (yellow border) & Amount (₦) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Category Select Trigger with yellow border */}
            <div
              onClick={() => setShowCategoryPicker(true)}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${yellowColor}`,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                  Category
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {selectedCategory || 'Select category'}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Amount with ₦ symbol */}
            <div
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                  Amount
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    fontSize: '13px',
                    fontWeight: 600,
                    outline: 'none',
                    padding: 0,
                    marginTop: '2px',
                    width: '100%',
                  }}
                />
              </div>
              <span style={{ fontSize: '15px', color: subtextColor, fontWeight: 700, marginLeft: '8px' }}>
                ₦
              </span>
            </div>
          </div>

          {/* Row 3: Specifications textarea */}
          <div
            style={{
              backgroundColor: inputBg,
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
              Specifications
            </span>
            <textarea
              placeholder="Enter specifications..."
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: textColor,
                fontSize: '13px',
                outline: 'none',
                padding: 0,
                resize: 'none',
                fontFamily: 'inherit',
                lineHeight: '1.5',
              }}
            />
          </div>

          {/* Row 4: Uploaded images with square + button & remove X button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <label
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: inputBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Plus size={20} color={subtextColor} />
            </label>

            {uploadedImages.map((imgUrl, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  overflow: 'visible',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Accessory media ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '9px',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#1E1E20',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    zIndex: 10,
                  }}
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: OTHER matching Image 3 */}
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>
            Other
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Parts Trigger with yellow border */}
            <div
              onClick={() => {
                setTempParts(selectedParts);
                setShowPartsPicker(true);
              }}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${yellowColor}`,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                  Parts
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {selectedParts.length > 0 ? selectedParts.join(', ') : 'Parts'}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Linked Box Model Trigger with yellow border */}
            <div
              onClick={() => setShowModelPicker(true)}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${yellowColor}`,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                  Linked box model
                </span>
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                  {selectedModel || 'Linked box model'}
                </span>
              </div>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>
        </div>

        {/* BOTTOM SUBMIT BUTTON: Update accessory */}
        <div>
          <button
            type="submit"
            style={{
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '8px',
              border: 'none',
              padding: '12px 28px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Update accessory
          </button>
        </div>
      </form>

      {/* ========================================================================= */}
      {/* POPOVER 1: SELECT CATEGORY                                                */}
      {/* ========================================================================= */}
      {showCategoryPicker && (
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
          onClick={() => setShowCategoryPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '340px',
              backgroundColor: '#1C1C1E',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>
                Select category
              </h3>
              <button
                type="button"
                onClick={() => setShowCategoryPicker(false)}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categoryOptions.map((opt) => {
                const isSelected = selectedCategory === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelectedCategory(opt);
                      setShowCategoryPicker(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
                      {opt}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? yellowColor : subtextColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POPOVER 2: SELECT PARTS                                                   */}
      {/* ========================================================================= */}
      {showPartsPicker && (
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
          onClick={() => setShowPartsPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '380px',
              backgroundColor: '#1C1C1E',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>
                Select parts
              </h3>
              <button
                type="button"
                onClick={() => setShowPartsPicker(false)}
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

            {/* Search Input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search"
                value={partsSearch}
                onChange={(e) => setPartsSearch(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#242428',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '10px 36px 10px 14px',
                  fontSize: '13px',
                  color: textColor,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <Search
                size={16}
                color={subtextColor}
                style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}
              />
            </div>

            {/* Parts list with yellow checkboxes */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                maxHeight: '220px',
                overflowY: 'auto',
                paddingRight: '4px',
              }}
            >
              {allPartsOptions
                .filter((p) => p.toLowerCase().includes(partsSearch.toLowerCase()))
                .map((part) => {
                  const isChecked = tempParts.includes(part);
                  return (
                    <div
                      key={part}
                      onClick={() => handleTogglePart(part)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        padding: '4px 0',
                      }}
                    >
                      <span style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
                        {part}
                      </span>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          backgroundColor: isChecked ? yellowColor : 'transparent',
                          border: isChecked ? 'none' : `1px solid ${subtextColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isChecked && <Check size={12} color="#000000" strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Bottom Buttons: Discard & Save */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowPartsPicker(false)}
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
                  textAlign: 'center',
                }}
              >
                Discard
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedParts(tempParts);
                  setShowPartsPicker(false);
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
                  textAlign: 'center',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POPOVER 3: SELECT MODEL                                                   */}
      {/* ========================================================================= */}
      {showModelPicker && (
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
          onClick={() => setShowModelPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '340px',
              backgroundColor: '#1C1C1E',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: textColor, margin: 0 }}>
                Select model
              </h3>
              <button
                type="button"
                onClick={() => setShowModelPicker(false)}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {modelOptions.map((opt) => {
                const isSelected = selectedModel === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelectedModel(opt);
                      setShowModelPicker(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: textColor, fontWeight: 500 }}>
                      {opt}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? yellowColor : subtextColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                  </div>
                );
              })}
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
