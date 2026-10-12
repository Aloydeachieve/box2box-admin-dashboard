'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useAdmin } from '@/components/layout/AdminContext';
import { ToastNotification } from '@/components/common/ToastNotification';

export const NewPartView: React.FC = () => {
  const router = useRouter();
  const { isLightMode, setCustomBack, setHeaderActions } = useAdmin();

  // Form State matching Image 5
  const [sku, setSku] = useState('1234567');
  const [partName, setPartName] = useState('');
  const [category, setCategory] = useState('Main Module');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Toast State
  const [activeToast, setActiveToast] = useState<{
    type: 'flag' | 'unavailable' | 'disable' | 'resolved' | 'success';
    title: string;
    message: string;
  } | null>(null);

  // Styling Tokens
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const inputBg = isLightMode ? '#F9FAFB' : '#18181B';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const yellowColor = '#F5C842';

  const categoryOptions = ['Main Module', 'Extension', 'Locks', 'Camera'];

  // Setup Back navigation and clear top Actions
  useEffect(() => {
    setHeaderActions([]);
    setCustomBack(() => () => {
      router.push('/inventory/parts');
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
      title: 'Part Created',
      message: `Part ${partName} (${sku}) created successfully`,
    });

    setTimeout(() => {
      router.push('/inventory/parts');
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
              <input
                type="text"
                placeholder="Part name"
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
                }}
              />
            </div>
          </div>

          {/* Row 2: Category (Half-width) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategoryDropdown(!showCategoryDropdown);
                }}
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
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', color: subtextColor, fontWeight: 500 }}>
                    Category
                  </span>
                  <span style={{ fontSize: '13px', color: textColor, fontWeight: 600, marginTop: '2px' }}>
                    {category}
                  </span>
                </div>
                <ChevronDown size={16} color={subtextColor} />
              </div>

              {showCategoryDropdown && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '6px',
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    padding: '6px',
                    zIndex: 40,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {categoryOptions.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      style={{
                        padding: '8px 10px',
                        fontSize: '13px',
                        color: category === cat ? yellowColor : textColor,
                        fontWeight: category === cat ? 600 : 500,
                        cursor: 'pointer',
                        borderRadius: '6px',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = isLightMode
                          ? '#F3F4F6'
                          : '#222226')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Square media upload button (+) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {uploadedImages.map((imgUrl, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '10px',
                  backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${borderColor}`,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Part upload ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
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

            <label
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '10px',
                backgroundColor: isLightMode ? '#F3F4F6' : '#222226',
                border: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: subtextColor,
                transition: 'background-color 0.15s ease',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = isLightMode ? '#E5E7EB' : '#2C2C30')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = isLightMode ? '#F3F4F6' : '#222226')
              }
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Plus size={20} color={subtextColor} />
            </label>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON: New part (yellow) matching Image 5 */}
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
              padding: '12px 32px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            New part
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
