import { SELECTED_IMAGE } from '../actions/selected_image';
import { UPLOAD_DOCUMENT_SUCCESS } from '../actions/image_upload_status';
import { UPDATE_IMAGE_SPEC } from '../actions/image_spec_update';
import { TOGGLE_POPUP } from '../actions/toggle_popup';

function imageStorage(state = {}, action) {
  let newState = { ...state };
  const { payload } = action;
  switch (action.type) {
    case SELECTED_IMAGE:
      newState = { ...state, ...payload };
      break;
    case UPLOAD_DOCUMENT_SUCCESS:
      newState = { ...state };
      newState[payload.id] = { ...newState[payload.id], ...payload.data };
      break;
    case UPDATE_IMAGE_SPEC:
      newState = { ...state };
      newState[payload.id] = { 
        ...newState[payload.id], imageSpec: {
          ...newState[payload.id].imageSpec, ...payload.data
        } 
      };
      break;
    case TOGGLE_POPUP: 
      newState = { ...state };
      if (payload.isVisible) {
        newState[payload.selectedImage] = { ...newState[payload.selectedImage], downloadLink: '' };
      }
  }
  return newState;
}
export default imageStorage;