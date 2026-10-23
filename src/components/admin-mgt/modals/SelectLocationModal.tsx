'use client';

import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';

export type LocationModalMode = 'country' | 'state' | 'city';

interface SelectLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
  initialMode?: LocationModalMode;
  selectedCountry?: string;
  selectedState?: string;
  selectedCity?: string;
  onSelect: (data: { country?: string; state?: string; city?: string }) => void;
}

const COUNTRIES = [{ name: 'Nigeria', flag: '🇳🇬' }];

const STATE_CITY_MAP: Record<string, string[]> = {
  Lagos: ['All', 'Ikeja', 'Victoria Island', 'Lekki', 'Apapa', 'Yaba', 'Ikoyi', 'Maryland'],
  Anambra: ['All', 'Awka', 'Onitsha', 'Nnewi', 'Ekwulobia'],
  Abuja: ['All', 'Wuse II', 'Garki', 'Maitama', 'Asokoro', 'Gwarinpa'],
  Rivers: ['All', 'Port Harcourt', 'Obio-Akpor'],
  Kano: ['All', 'Kano City', 'Fagge', 'Dala'],
  Oyo: ['All', 'Ibadan', 'Ogbomosho', 'Oyo Town'],
  Enugu: ['All', 'Enugu North', 'Nsukka', 'Enugu South'],
};

const ALL_STATES = ['All', 'Lagos', 'Abuja', 'Anambra', 'Rivers', 'Kano', 'Oyo', 'Enugu'];

export const SelectLocationModal: React.FC<SelectLocationModalProps> = ({
  isOpen,
  onClose,
  isLightMode = false,
  initialMode = 'country',
  selectedCountry = 'Nigeria',
  selectedState = '',
  selectedCity = '',
  onSelect,
}) => {
  const [activeTab, setActiveTab] = useState<LocationModalMode>(initialMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState(selectedCountry || 'Nigeria');
  const [state, setState] = useState(selectedState || '');
  const [city, setCity] = useState(selectedCity || '');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      setSearchQuery('');
      if (selectedCountry) setCountry(selectedCountry);
      if (selectedState) setState(selectedState);
      if (selectedCity) setCity(selectedCity);
    }
  }, [isOpen, initialMode, selectedCountry, selectedState, selectedCity]);

  if (!isOpen) return null;

  const modalBg = isLightMode ? '#FFFFFF' : '#1C1C20';
  const borderColor = isLightMode ? '#E5E7EB' : 'rgba(255, 255, 255, 0.08)';
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#8E8E93';
  const yellowColor = '#F5C842';

  // Compute available cities based on currently selected state
  const getAvailableCities = () => {
    if (state && STATE_CITY_MAP[state]) {
      return STATE_CITY_MAP[state];
    }
    // Default list
    return [
      'All',
      'Awka',
      'Ikeja',
      'Victoria Island',
      'Lekki',
      'Onitsha',
      'Wuse II',
      'Port Harcourt',
      'Kano City',
      'Ibadan',
    ];
  };

  const getFilteredItems = () => {
    const q = searchQuery.toLowerCase();
    if (activeTab === 'country') {
      return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (activeTab === 'state') {
      return ALL_STATES.filter((s) => s.toLowerCase().includes(q));
    }
    return getAvailableCities().filter((c) => c.toLowerCase().includes(q));
  };

  const handleSelectCountry = (cName: string) => {
    setCountry(cName);
    onSelect({ country: cName });
    // Advance smoothly to state tab matching Figma Image 2 flow
    setActiveTab('state');
    setSearchQuery('');
  };

  const handleSelectState = (sName: string) => {
    setState(sName);
    onSelect({ state: sName });
    // Advance smoothly to city tab matching Figma Image 2 flow
    setActiveTab('city');
    setSearchQuery('');
  };

  const handleSelectCity = (cName: string) => {
    setCity(cName);
    onSelect({ city: cName });
    onClose();
  };

  const filteredItems = getFilteredItems();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
      }}
      onClick={onClose}
    >
      {/* Fixed Height Modal Card (Rule 8: Standard Modal Sizing & Non-Resizing Standard) */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '380px',
          height: '430px',
          maxHeight: '430px',
          backgroundColor: modalBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-outfit), sans-serif',
          boxSizing: 'border-box',
        }}
      >
        {/* Header (Figma Image 2) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <h3
            style={{
              fontSize: '15.5px',
              fontWeight: 700,
              color: textColor,
              margin: 0,
            }}
          >
            Select location
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isLightMode ? '#F3F4F6' : '#27272A',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: subtextColor,
              transition: 'all 0.15s ease',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 12px',
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            backgroundColor: 'transparent',
            marginBottom: '14px',
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: '12px',
              outline: 'none',
              width: '100%',
            }}
          />
          <Search size={14} color={subtextColor} />
        </div>

        {/* Category Inline Tabs: Country / State / City (Figma Image 2) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            color: subtextColor,
            marginBottom: '14px',
            userSelect: 'none',
          }}
        >
          <span
            onClick={() => setActiveTab('country')}
            style={{
              cursor: 'pointer',
              fontWeight: activeTab === 'country' ? 700 : 500,
              color: activeTab === 'country' ? yellowColor : subtextColor,
              transition: 'color 0.15s ease',
            }}
          >
            Country
          </span>
          <span>/</span>
          <span
            onClick={() => setActiveTab('state')}
            style={{
              cursor: 'pointer',
              fontWeight: activeTab === 'state' ? 700 : 500,
              color: activeTab === 'state' ? yellowColor : subtextColor,
              transition: 'color 0.15s ease',
            }}
          >
            State
          </span>
          <span>/</span>
          <span
            onClick={() => setActiveTab('city')}
            style={{
              cursor: 'pointer',
              fontWeight: activeTab === 'city' ? 700 : 500,
              color: activeTab === 'city' ? yellowColor : subtextColor,
              transition: 'color 0.15s ease',
            }}
          >
            City
          </span>
        </div>

        {/* Scrollable Items List with Constant Fixed Height (Does NOT jump/resize when switching tabs!) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingRight: '4px',
          }}
        >
          {activeTab === 'country' &&
            (filteredItems as typeof COUNTRIES).map((c) => {
              const isSelected = country.toLowerCase() === c.name.toLowerCase();
              return (
                <div
                  key={c.name}
                  onClick={() => handleSelectCountry(c.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>{c.flag}</span>
                    <span
                      style={{
                        fontSize: '13.5px',
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? textColor : subtextColor,
                      }}
                    >
                      {c.name}
                    </span>
                  </div>

                  {/* Circular Radio on Far Right */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: yellowColor,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

          {activeTab === 'state' &&
            (filteredItems as string[]).map((s) => {
              const isSelected = state.toLowerCase() === s.toLowerCase();
              return (
                <div
                  key={s}
                  onClick={() => handleSelectState(s)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? textColor : subtextColor,
                    }}
                  >
                    {s}
                  </span>

                  {/* Circular Radio on Far Right */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: yellowColor,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}

          {activeTab === 'city' &&
            (filteredItems as string[]).map((c) => {
              const isSelected = city.toLowerCase() === c.toLowerCase();
              return (
                <div
                  key={c}
                  onClick={() => handleSelectCity(c)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? textColor : subtextColor,
                    }}
                  >
                    {c}
                  </span>

                  {/* Circular Radio on Far Right */}
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? `2px solid ${yellowColor}` : `1.5px solid ${subtextColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
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
  );
};
