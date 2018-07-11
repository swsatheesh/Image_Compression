import { combineReducers } from 'redux';
import metadata from './metadata';
import imageData from './image_storage';
import popup from './popup_reducer';

export default combineReducers({
    metadata,
    imageData,
    popup
});