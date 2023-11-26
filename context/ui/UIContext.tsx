'use client';

import { createContext } from 'react';

interface ContextProps {
  sideMenuOpen: boolean;
  closeSideMenu: () => void;
  openSideMenu: () => void;
  isAddingEntry: boolean;
  setIsAddingEntry: (payload: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
  isDragging: boolean;
  setTheme: (theme: string) => void;
  theme: string;
}

export const UIContext = createContext({} as ContextProps);
