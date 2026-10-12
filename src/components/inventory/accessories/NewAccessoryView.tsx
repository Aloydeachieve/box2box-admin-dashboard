'use client';

import React, { useState } from 'react';
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

export const NewAccessoryView: React.FC = () => {
  const router = useRouter();
  const { isLightMode } = useAdmin();

  // Form State
  const [sku, setSku] = useState('1234567');
  const [accessoryName, setAccessoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [selectedParts, setSelectedParts] = useState<string[]>(['Battery', 'Motherboard', 'Wheels', 'Doors', 'Locks', 'Hinge']);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Popover Modals State (Image 3)
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
      title: 'Accessory Created',
      message: `${accessoryName} has been created successfully`,
    });

    setTimeout(() => {
      router.push('/inventory/accessories');
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
        {/* CARD 1: ABOUT ACCESSORY matching Image 2 */}
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
            {/* SKU (Auto-generated) */}
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
                }}
              />
            </div>
          </div>

          {/* Row 2: Category Dropdown & Amount */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Category Selector */}
            <div
              onClick={() => setShowCategoryPicker(true)}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '13px', color: selectedCategory ? textColor : subtextColor }}>
                {selectedCategory || 'Category'}
              </span>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Amount with Naira symbol */}
            <div
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                boxSizing: 'border-box',
              }}
            >
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <span style={{ fontSize: '15px', fontWeight: 600, color: subtextColor }}>
                ₦
              </span>
            </div>
          </div>

          {/* Row 3: Specifications Textarea */}
          <div
            style={{
              backgroundColor: inputBg,
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              padding: '14px',
              minHeight: '90px',
              boxSizing: 'border-box',
            }}
          >
            <textarea
              placeholder="Specifications"
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
                resize: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Media Upload Area matching Image 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {uploadedImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '8px',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={img} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <X size={10} />
                </button>
              </div>
            ))}

            {/* Square + button */}
            <label
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '8px',
                backgroundColor: inputBg,
                border: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
            >
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              <Plus size={18} color={subtextColor} />
            </label>
          </div>
        </div>

        {/* CARD 2: OTHER matching Image 2 */}
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
            {/* Parts Dropdown */}
            <div
              onClick={() => {
                setTempParts(selectedParts);
                setShowPartsPicker(true);
              }}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '13px', color: selectedParts.length > 0 ? textColor : subtextColor }}>
                {selectedParts.length > 0 ? `${selectedParts.length} parts selected` : 'Parts'}
              </span>
              <ChevronDown size={16} color={subtextColor} />
            </div>

            {/* Linked box model Dropdown */}
            <div
              onClick={() => setShowModelPicker(true)}
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '54px',
                cursor: 'pointer',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '13px', color: selectedModel ? textColor : subtextColor }}>
                {selectedModel || 'Linked box model'}
              </span>
              <ChevronDown size={16} color={subtextColor} />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON: New accessory (yellow) */}
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
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            New accessory
          </button>
        </div>
      </form>

      {/* POPOVER 1: SELECT CATEGORY matching Image 3 Box 1 */}
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
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
                Select category
              </h3>
              <button
                onClick={() => setShowCategoryPicker(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
              {categoryOptions.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <div
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryPicker(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {cat}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? `5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        boxSizing: 'border-box',
                        transition: 'all 0.15s ease',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* POPOVER 2: SELECT PARTS matching Image 3 Box 2 */}
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
              maxWidth: '360px',
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
                Select parts
              </h3>
              <button
                onClick={() => setShowPartsPicker(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
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
                  height: '38px',
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '0 36px 0 12px',
                  color: textColor,
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <Search size={15} color={subtextColor} style={{ position: 'absolute', right: '12px' }} />
            </div>

            {/* Parts List with Yellow Checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
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
                        padding: '8px 4px',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                        {part}
                      </span>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          backgroundColor: isChecked ? yellowColor : 'transparent',
                          border: isChecked ? 'none' : `1.5px solid ${subtextColor}`,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setShowPartsPicker(false)}
                style={{
                  flex: 1,
                  height: '40px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
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
                  height: '40px',
                  borderRadius: '8px',
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

      {/* POPOVER 3: SELECT MODEL matching Image 3 Box 3 */}
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
              backgroundColor: cardBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              fontFamily: 'var(--font-outfit), sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: textColor, margin: 0 }}>
                Select model
              </h3>
              <button
                onClick={() => setShowModelPicker(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subtextColor,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
              {modelOptions.map((model) => {
                const isSelected = selectedModel === model;
                return (
                  <div
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setShowModelPicker(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: textColor, fontWeight: 500 }}>
                      {model}
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? `5px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                        boxSizing: 'border-box',
                        transition: 'all 0.15s ease',
                      }}
                    />
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
