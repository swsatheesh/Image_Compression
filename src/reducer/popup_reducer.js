import { TOGGLE_POPUP } from '../actions/toggle_popup';

function popupReducer(state = {}, action) {
  let newState = { ...state };

  switch (action.type) {
    case TOGGLE_POPUP:
      newState = { ...state, ...action.payload };
      break;
  }
  return newState;
}
export default popupReducer;