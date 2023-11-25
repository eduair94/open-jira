import { UIActionEnum, UIState } from '.';

type UIActionType =
  | {
      type: UIActionEnum.OPEN_SIDEBAR;
    }
  | {
      type: UIActionEnum.CLOSE_SIDEBAR;
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
    default:
      return state;
  }
};
