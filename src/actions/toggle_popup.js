export const TOGGLE_POPUP = 'popup/toggle';

export function popupToggle(dataId) {
    return (dispatch) => dispatch({
        type: TOGGLE_POPUP,
        payload: {
            isVisible: dataId !== undefined,
            selectedImage: dataId
        }
    });
}  