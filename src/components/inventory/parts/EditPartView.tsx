'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';
import { initialBoxParts } from '@/lib/inventoryMockData';
import { PartsSearchDropdown } from './PartsSearchDropdown';

interface EditPartViewProps {
  partId?: string;
}

export const EditPartView: React.FC<EditPartViewProps> = ({ partId = 'bp-1' }) => {
  const router = useRouter();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  // Find part or fallback
  const existingPart = initialBoxParts.find((p) => p.id === partId) || initialBoxParts[0];

  // Form State matching Image 5
  const [sku, setSku] = useState(existingPart?.sku || '1234567');
  const [partName, setPartName] = useState(existingPart?.name || 'Given name of accessory');
  const [category, setCategory] = useState(existingPart?.category || 'Main module');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    existingPart?.image || '/image/box1.png',
  ]);

  // Toast State
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Styling Tokens matching Rule 6
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : 'transparent';
  const inputBg = isLightMode ? '#F9FAFB' : '#141416';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  const categoryOptions = ['Main module', 'Extension', 'Locks', 'Camera'];

  // Setup Back navigation and clear top Actions
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.back();
    });
    return () => {
      setCustomBack(null);
    };
  }, [router, setCustomBack, setHeaderActions]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partName.trim()) {
      setActiveToast({
        type: 'flag',
        title: 'Validation Error',
        message: 'Please provide a part name',
      });
      return;
    }

    setActiveToast({
      type: 'success',
      title: 'Part Updated',
      message: `Part ${partName} (${sku}) updated successfully`,
    });

    setTimeout(() => {
      router.back();
    }, 800);
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
      onClick={() => {
        if (showCategoryDropdown) setShowCategoryDropdown(false);
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* CARD: ABOUT PART matching Image 5 */}
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
            About part
          </div>

          {/* Row 1: SKU & Part name */}
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

            {/* Part name */}
            <div
              style={{
                backgroundColor: inputBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '54px',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                Part name
              </span>
              <input
                type="text"
                placeholder="Given name of accessory"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 500,
                  outline: 'none',
                  padding: 0,
                  marginTop: '2px',
                }}
              />
            </div>
          </div>

          {/* Row 2: Category (Half-width) with Opaque Search Dropdown */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            <PartsSearchDropdown
              label="Category"
              value={category}
              options={categoryOptions}
              isOpen={showCategoryDropdown}
              onToggle={() => setShowCategoryDropdown(!showCategoryDropdown)}
              onClose={() => setShowCategoryDropdown(false)}
              onSelect={(cat) => setCategory(cat)}
              isLightMode={isLightMode}
              searchPlaceholder="Search category..."
            />
          </div>

          {/* Row 3: Media Upload with '+' and Previews matching Image 5 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
            <label
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '8px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                border: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
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

            {/* Uploaded Image Previews with Circular Delete Icon */}
            {uploadedImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLightMode ? '#F9FAFB' : '#1C1C20',
                }}
              >
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SUBMIT BUTTON: Update part (matching Image 5) */}
        <div>
          <button
            type="submit"
            style={{
              backgroundColor: yellowColor,
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              padding: '12px 28px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(245, 200, 66, 0.25)',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Update part
          </button>
        </div>
      </form>

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
