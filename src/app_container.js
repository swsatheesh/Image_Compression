import React from 'react';

import NavBarContainer from './container/nav_bar_container';
import ImageCompressionContainer from './container/image_compression_container';

import './style/style.scss';

export const AppContainer = () => (
    <div>
        <NavBarContainer />
        <ImageCompressionContainer />
    </div>
);

export default AppContainer;