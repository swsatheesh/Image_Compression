import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectedImage } from '../actions/selected_image';

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.imageUpload = null;
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        // this.uploadHandler = this.uploadHandler.bind(this);
    }
    fileChangedHandler(event) {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            var image = new Image();
            image.src = reader.result;
            image.onload = () => {
                const imageSpec = {
                    width: image.width,
                    height: image.height
                }
                this.props.dispatch(selectedImage(reader.result, file.name, this.imageUpload.files[0], imageSpec));
            };
        }
        reader.readAsDataURL(file)
    }
    // uploadHandler() {
    //     event.preventDefault();

    //     const { dispatch } = this.props;

    //     const formData = new FormData();

    //     formData.append('file', this.imageUpload.files[0]);

    //     axios({
    //         method: 'post',
    //         url: '/files',
    //         data: formData
    //     })
    //         .then((response, path) => dispatch(uploadSuccess(response, path)))
    //         .catch(error => dispatch(uploadFail(error)));
    // }
    render() {
        return (
            <div className="image-upload-container">
                <div className="image-upload-title">
                    <div>
                        The tool is to convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.
                    </div>
                    <div>
                        The tool is just an extention of npm sharp package.
                    </div>
                </div>
                <div className="image-selection-input">
                    <span>Choose your images </span>
                    <form>
                        <label for="file-upload" class="custom-file-upload">
                            <i class="fa fa-cloud-upload"></i> Choose!!!
                        </label>
                        <input ref={(e) => { this.imageUpload = e; }} id="file-upload" type="file" name="file" onChange={this.fileChangedHandler} />
                    </form>
                </div>
            </div>
        );
    }
}


function mapStateToProps() {
    return ({
        //
    });
}

export default connect(mapStateToProps)(UploadImage);