import { FC, ReactNode, useReducer } from 'react';
import { UIActionEnum, UIContext, uiReducer } from '.';

export interface UIState {
  sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
};

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const openSideMenu = () => {
    dispatch({ type: UIActionEnum.OPEN_SIDEBAR });
  };

  const closeSideMenu = () => dispatch({ type: UIActionEnum.CLOSE_SIDEBAR });
  return (
    <UIContext.Provider value={{ ...state, openSideMenu, closeSideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
