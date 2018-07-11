import React from 'react';
import { connect } from 'react-redux';

import { popupToggle } from '../actions/toggle_popup';

import { updateImageSpech } from '../actions/image_spec_update';

const EditSpecPopup = ({ dispatch, imageUrl, file, imageWidth, imageHeight, selectedImage }) => (
    <div id="image_edit" class="modal" role="dialog">
        <div className={'back-drop'} />
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" onClick={() => dispatch(popupToggle())} class="close" data-dismiss="modal">&times;</button>
                    <div class="modal-title">Image edit</div>
                </div>
                <div class="modal-body">
                    <div className={'col-md-4 image-preview-container padding-none'}>
                        <img className={'edit-image-preview'} src={imageUrl} alt="" />
                        <div>{file}</div>
                    </div>
                    <div className={'col-md-8 padding-right-none'}>
                        <div className={'col-md-12'}>
                            <div className={'form-group col-md-6 padding-left-none'}>
                                <label for="image-width">Width: </label>
                                <input
                                    id={'image-width'} 
                                    value={imageWidth}
                                    class="form-control"
                                    onChange={(e) => dispatch(updateImageSpech('width', Number(e.target.value), selectedImage))}
                                    type="number"
                                />
                            </div>
                            <div className={'form-group col-md-6 padding-none'}>
                                <label for="image-height">Height: </label>
                                <input
                                    id={'image-height'}
                                    value={imageHeight}
                                    class="form-control"
                                    onChange={(e) => dispatch(updateImageSpech('height', Number(e.target.value) === 0 ? null : Number(e.target.value), selectedImage))}
                                    type="number"
                                />
                            </div>
                            <div class="text-info">* Leave the height input box empty, when you wanna set the image height by default.</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" onClick={() => dispatch(popupToggle())} class="btn btn-primary" data-dismiss="modal">Done!!!</button>
                </div>
            </div>

        </div>
    </div>
);

function mapStateToProps({ imageData, popup }) {
    const { selectedImage } = popup;
    const { imageUrl, file, imageSpec } = imageData[selectedImage];
    return ({
        selectedImage,
        imageUrl,
        file,
        imageWidth: imageSpec.width,
        imageHeight: imageSpec.height
    });
}

export default connect(mapStateToProps)(EditSpecPopup);