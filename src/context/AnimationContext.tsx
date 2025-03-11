import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AnimationContextType {
  enabled: boolean;
  defaultDuration: number;
  defaultDelay: number;
  defaultThreshold: number;
  defaultDirection: 'up' | 'down' | 'left' | 'right' | 'none';
  defaultDistance: number;
  toggleAnimations: () => void;
  updateSettings: (settings: Partial<AnimationSettings>) => void;
}

interface AnimationSettings {
  defaultDuration: number;
  defaultDelay: number;
  defaultThreshold: number;
  defaultDirection: 'up' | 'down' | 'left' | 'right' | 'none';
  defaultDistance: number;
}

const defaultSettings: AnimationSettings = {
  defaultDuration: 0.6,
  defaultDelay: 0,
  defaultThreshold: 0.1,
  defaultDirection: 'up',
  defaultDistance: 20,
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [enabled, setEnabled] = useState(true);
  const [settings, setSettings] = useState<AnimationSettings>(defaultSettings);

  const toggleAnimations = () => {
    setEnabled((prev) => !prev);
  };

  const updateSettings = (newSettings: Partial<AnimationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const value = {
    enabled,
    ...settings,
    toggleAnimations,
    updateSettings,
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};

export default AnimationContext; 