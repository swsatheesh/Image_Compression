export const UPDATE_IMAGE_SPEC = 'update/image/spech';

export function updateImageSpech(spec, value, id) {
    const data = {
        [spec]: value
    };
    return (dispatch) => {
        dispatch({
            type: UPDATE_IMAGE_SPEC,
            payload: {
                id,
                data
            }
        });
    };
} 