import React from 'react';
import { connect } from 'react-redux';

import UploadImage from '../components/upload_image';
import SelectedImage from '../components/selected_image';
import EditSpecPopup from '../components/edit_spec_popup';

export const ImageCompressionContainer = ({ isVisible, imageDataLength, dataIds }) => (
    <div class="container image-compression">
        <div class="col-md-12">
            <UploadImage />
            {
                imageDataLength !== 0 ? (
                    <div>
                        {
                            dataIds.map((id) => (
                                <SelectedImage dataId={id} />
                            ))
                        }
                    </div>
                ) : null
            }
            {
                isVisible ? <EditSpecPopup /> : null
            }
        </div>
    </div>
);

function mapStateToProps({ imageData, popup }) {
    const { isVisible } = popup;
    const dataIds = Object.keys(imageData);
    const imageDataLength = dataIds.length;
    return ({
        isVisible,
        dataIds,
        imageDataLength
    });
}

export default connect(mapStateToProps)(ImageCompressionContainer);