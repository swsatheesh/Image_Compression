export const SELECTED_IMAGE = 'compression/selected_image';

import addImageDetails from '../helpers/add_image_details';

export function selectedImage(imageUrl, file, sourceFile, imageSpec) {
    const dataset = addImageDetails(imageUrl, file, sourceFile, imageSpec);
    return (dispatch) => {
        dispatch({
            type: SELECTED_IMAGE,
            payload: {
                [dataset.id]: { ...dataset }
            }
        });
    };
}