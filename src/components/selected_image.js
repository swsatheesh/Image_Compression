import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FormData from 'form-data';

import { uploadSuccess, uploadFail } from '../actions/image_upload_status';

import { popupToggle } from '../actions/toggle_popup';

class SelectedImage extends Component {
    constructor(props) {
        super(props);
        this.imageCompressor = this.imageCompressor.bind(this);
    }
    imageCompressor() {
        event.preventDefault();

        const { dispatch, sourceFile, dataId, imageSpec } = this.props;

        const formData = new FormData();
        var details = JSON.stringify({...imageSpec});

        formData.append('file', sourceFile);
        formData.append('details', details);

        axios({
            method: 'post',
            url: '/files',
            data: formData
        })
            .then((response) => dispatch(uploadSuccess(response, dataId)))
            .catch(error => dispatch(uploadFail(error)));
    }
    render() {
        const { imageUrl, fileName, downloadLink, dispatch, dataId } = this.props;
        return imageUrl !== '' ? (
            <div className="selected-image">
                <img src={imageUrl} alt="Selected Image...." />
                <label className="image-label" htmlFor={'Selected Image....'}>{fileName}</label>
                <button type="button" onClick={() => { dispatch(popupToggle(dataId)); }} class="btn btn-light">Edit!</button>
                <span className={'convert-btn-container'}>
                    <button type="submit" onClick={this.imageCompressor} className={'btn btn-success'}>Upload!</button>
                </span>
                {
                    downloadLink !== '' ? (
                        <a 
                            target="_blank" 
                            role="button" 
                            className={'btn btn-primary'} 
                            href={`../../${downloadLink}`} 
                            download={downloadLink.split('/').pop()}
                        >download</a>
                    ) : null
                }
            </div>
        ) : (
            <div className={'user-instruction'}>Please select the image</div>
        );
    }
}

function mapStateToProps({ imageData }, ownprops) {
    const { imageUrl, file, downloadLink, sourceFile, imageSpec } = imageData[ownprops.dataId];
    return ({
        imageUrl,
        downloadLink,
        sourceFile,
        dataId: ownprops.dataId,
        fileName: file,
        imageSpec
    });
}

export default connect(mapStateToProps)(SelectedImage);