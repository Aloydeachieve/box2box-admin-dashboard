'use client';

import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (locationName: string) => void;
  currentLocation: string;
}

type Step = 'country' | 'state' | 'city';

interface LocationItem {
  id: string;
  name: string;
  icon?: string;
}

const COUNTRIES: LocationItem[] = [
  { id: 'all_country', name: 'All', icon: '🌐' },
  { id: 'ng', name: 'Nigeria', icon: '🇳🇬' },
  { id: 'gh', name: 'Ghana', icon: '🇬🇭' },
  { id: 'ke', name: 'Kenya', icon: '🇰🇪' },
];

const STATES: Record<string, LocationItem[]> = {
  ng: [
    { id: 'all_state', name: 'All' },
    { id: 'lagos', name: 'Lagos' },
    { id: 'abuja', name: 'Abuja' },
    { id: 'anambra', name: 'Anambra' },
    { id: 'rivers', name: 'Rivers' },
    { id: 'oyo', name: 'Oyo' },
  ],
  default: [
    { id: 'all_state', name: 'All' },
    { id: 'lagos', name: 'Lagos' },
    { id: 'abuja', name: 'Abuja' },
  ],
};

const CITIES: Record<string, LocationItem[]> = {
  lagos: [
    { id: 'all_city', name: 'All' },
    { id: 'ikeja', name: 'Ikeja' },
    { id: 'lekki', name: 'Lekki' },
    { id: 'ajah', name: 'Ajah' },
    { id: 'victoria_island', name: 'Victoria Island' },
  ],
  anambra: [
    { id: 'all_city', name: 'All' },
    { id: 'awka', name: 'Awka' },
    { id: 'onitsha', name: 'Onitsha' },
    { id: 'tangrida', name: 'Tangrida' },
  ],
  abuja: [
    { id: 'all_city', name: 'All' },
    { id: 'garki', name: 'Garki' },
    { id: 'wuse', name: 'Wuse 2' },
    { id: 'maitama', name: 'Maitama' },
  ],
  default: [
    { id: 'all_city', name: 'All' },
    { id: 'ikeja', name: 'Ikeja' },
    { id: 'lekki', name: 'Lekki' },
  ],
};

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentLocation,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('country');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCountry, setSelectedCountry] = useState<string>('Nigeria');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('ng');
  const [selectedState, setSelectedState] = useState<string>('Lagos');
  const [selectedStateId, setSelectedStateId] = useState<string>('lagos');
  const [selectedCity, setSelectedCity] = useState<string>('Ikeja');

  if (!isOpen) return null;

  const handleCountrySelect = (item: LocationItem) => {
    setSelectedCountry(item.name);
    setSelectedCountryId(item.id);
    if (item.id === 'all_country') {
      setSelectedState('All');
      setSelectedCity('All');
    } else {
      // Sweep to state step as shown in Figma Screenshot 4
      setCurrentStep('state');
    }
  };

  const handleStateSelect = (item: LocationItem) => {
    setSelectedState(item.name);
    setSelectedStateId(item.id);
    if (item.id === 'all_state') {
      setSelectedCity('All');
    } else {
      // Sweep to city step as shown in Figma Screenshot 5
      setCurrentStep('city');
    }
  };

  const handleCitySelect = (item: LocationItem) => {
    setSelectedCity(item.name);
  };

  const handleSave = () => {
    let result = '';
    if (selectedCity && selectedCity !== 'All') {
      result = `${selectedCity}, ${selectedState}`;
    } else if (selectedState && selectedState !== 'All') {
      result = `${selectedState}, ${selectedCountry}`;
    } else {
      result = selectedCountry;
    }
    onSave(result);
    onClose();
  };

  const availableStates = STATES[selectedCountryId] || STATES.default;
  const availableCities = CITIES[selectedStateId] || CITIES.default;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: '#161619',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '24px 20px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Header from Figma Screenshot 3 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Select target location
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#8E8E93',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search input with magnifying glass */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            style={{
              width: '100%',
              height: '38px',
              backgroundColor: '#1E1E22',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0 36px 0 12px',
              color: '#FFFFFF',
              fontSize: '13px',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <Search
            size={15}
            color="#8E8E93"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Breadcrumb Navigation Tabs matching Figma Screenshot 3, 4, 5 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            marginBottom: '16px',
            color: '#71717A',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            paddingBottom: '8px',
          }}
        >
          <button
            onClick={() => setCurrentStep('country')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontWeight: currentStep === 'country' ? 700 : 500,
              color: currentStep === 'country' ? '#FFFFFF' : '#71717A',
              fontSize: '12px',
            }}
          >
            Country
          </button>
          <span>/</span>
          <button
            onClick={() => setCurrentStep('state')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontWeight: currentStep === 'state' ? 700 : 500,
              color: currentStep === 'state' ? '#FFFFFF' : '#71717A',
              fontSize: '12px',
            }}
          >
            State
          </button>
          <span>/</span>
          <button
            onClick={() => setCurrentStep('city')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontWeight: currentStep === 'city' ? 700 : 500,
              color: currentStep === 'city' ? '#FFFFFF' : '#71717A',
              fontSize: '12px',
            }}
          >
            City
          </button>
        </div>

        {/* Sliding Step Content Container */}
        <div style={{ minHeight: '140px', overflowY: 'auto', marginBottom: '20px' }}>
          {/* STEP 1: Country */}
          {currentStep === 'country' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {COUNTRIES.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
                const isSelected = selectedCountry === item.name;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCountrySelect(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(245, 200, 66, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '15px' }}>{item.icon}</span>
                      <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: isSelected ? 600 : 400 }}>
                        {item.name}
                      </span>
                    </div>

                    {/* Yellow Checkbox matching Figma */}
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        backgroundColor: isSelected ? '#F5C842' : 'transparent',
                        border: isSelected ? 'none' : '1px solid #71717A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && <Check size={12} color="#000000" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 2: State */}
          {currentStep === 'state' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {availableStates.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
                const isSelected = selectedState === item.name;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleStateSelect(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(245, 200, 66, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: isSelected ? 600 : 400 }}>
                      {item.name}
                    </span>

                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        backgroundColor: isSelected ? '#F5C842' : 'transparent',
                        border: isSelected ? 'none' : '1px solid #71717A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && <Check size={12} color="#000000" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 3: City */}
          {currentStep === 'city' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {availableCities.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
                const isSelected = selectedCity === item.name;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCitySelect(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(245, 200, 66, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: isSelected ? 600 : 400 }}>
                      {item.name}
                    </span>

                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '3px',
                        backgroundColor: isSelected ? '#F5C842' : 'transparent',
                        border: isSelected ? 'none' : '1px solid #71717A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && <Check size={12} color="#000000" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Action Buttons: Discard & Save matching Figma */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              height: '42px',
              backgroundColor: '#D1D5DB',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              height: '42px',
              backgroundColor: '#F5C842',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
