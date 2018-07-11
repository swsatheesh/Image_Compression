import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './app_container';

import createStoreHelper from './utill/store/create_store_helper';

ReactDOM.render(
    <Provider store={createStoreHelper()}>
        <AppContainer />
    </Provider>, document.querySelector('#app-container')
);