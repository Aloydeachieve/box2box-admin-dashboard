'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HeaderActionItem {
  label: string;
  onClick: () => void;
  color?: string;
  hasToggle?: boolean;
  isToggled?: boolean;
  disabled?: boolean;
}

interface AdminContextType {
  headerActions: HeaderActionItem[];
  setHeaderActions: (actions: HeaderActionItem[]) => void;
  isLightMode: boolean;
  setIsLightMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  customBack: (() => void) | null;
  setCustomBack: (fn: (() => void) | null) => void;
}

const AdminContext = createContext<AdminContextType>({
  headerActions: [],
  setHeaderActions: () => {},
  isLightMode: false,
  setIsLightMode: () => {},
  customBack: null,
  setCustomBack: () => {},
});

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [headerActions, setHeaderActions] = useState<HeaderActionItem[]>([]);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [customBack, setCustomBack] = useState<(() => void) | null>(null);

  return (
    <AdminContext.Provider
      value={{
        headerActions,
        setHeaderActions,
        isLightMode,
        setIsLightMode,
        customBack,
        setCustomBack,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
