import { UIActionEnum } from '@/interfaces';
import { UIState } from '.';

type UIActionType =
  | {
      type: UIActionEnum.OPEN_SIDEBAR;
    }
  | {
      type: UIActionEnum.CLOSE_SIDEBAR;
    }
  | {
      type: UIActionEnum.IS_ADDING_ENTRY;
      payload: boolean;
    }
  | {
      type: UIActionEnum.START_DRAGGING;
    }
  | {
      type: UIActionEnum.END_DRAGGING;
    }
  | {
      type: UIActionEnum.SET_THEME;
      payload: string;
    };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case UIActionEnum.CLOSE_SIDEBAR:
      return {
        ...state,
        sideMenuOpen: false,
      };
    case UIActionEnum.OPEN_SIDEBAR:
      return {
        ...state,
        sideMenuOpen: true,
      };
    case UIActionEnum.IS_ADDING_ENTRY:
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case UIActionEnum.START_DRAGGING:
      return {
        ...state,
        isDragging: true,
      };
    case UIActionEnum.END_DRAGGING:
      return {
        ...state,
        isDragging: false,
      };
    case UIActionEnum.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
