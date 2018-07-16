import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';

import { popupToggle } from '../actions/toggle_popup';

import { updateImageSpech } from '../actions/image_spec_update';

const options = [
    { value: 'image/jpeg', label: 'JPG' },
    { value: 'image/png', label: 'PNG' },
];

const EditSpecPopup = ({ dispatch, imageUrl, file, imageWidth, imageHeight, imageFormat, selectedImage }) => (
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
                        <div className={'col-md-12 image-spec-format'}>
                            <div className={'form-group col-md-6 padding-left-none'}>
                                <label for="image-width">Format: </label>
                                <Dropdown
                                    options={options}
                                    value={imageFormat}
                                    onChange={(e) => dispatch(updateImageSpech('format', e.value, selectedImage))}
                                    placeholder="Select an option"
                                />
                            </div>
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
    const imageFormat = options.filter((image) => image.value === imageSpec.format)[0];
    return ({
        selectedImage,
        imageUrl,
        file,
        imageWidth: imageSpec.width,
        imageHeight: imageSpec.height,
        imageFormat
    });
}

export default connect(mapStateToProps)(EditSpecPopup);