'use client';

import { UIActionEnum } from '@/interfaces';
import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from '.';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  theme: string;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  theme: 'dark',
};

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const openSideMenu = () => {
    dispatch({ type: UIActionEnum.OPEN_SIDEBAR });
  };
  const setIsAddingEntry = (payload: boolean) => {
    dispatch({ type: UIActionEnum.IS_ADDING_ENTRY, payload });
  };

  const startDragging = () => {
    dispatch({ type: UIActionEnum.START_DRAGGING });
  };

  const endDragging = () => {
    dispatch({ type: UIActionEnum.END_DRAGGING });
  };

  const setTheme = (theme: string) => {
    dispatch({ type: UIActionEnum.SET_THEME, payload: theme });
  };

  const closeSideMenu = () => dispatch({ type: UIActionEnum.CLOSE_SIDEBAR });
  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
        setTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
