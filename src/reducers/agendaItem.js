import * as types from '../constants/actionTypes';
const defaultState = {
  isShowActions: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.AI_ACTION_MOUSE_OVER:
      return {...state, isShowActions:true, mouseOverId:action.payload};
    case types.AI_ACTION_MOUSE_OUT:
      return {...state, isShowActions:false, mouseOverId:null}
    case types.AI_ACTION_ONOFF_DIALOG:
      return { ...state, showDialog: !state.showDialog, delId:action.payload }
    case types.AI_ACTION_OPEN_MENUITEM:
      return { ...state, anchorEl: action.payload }
    case types.AI_ACTION_CLOSE_MENUITEM:
      return { ...state, anchorEl: null }
    default:
      return state;
  }
}
