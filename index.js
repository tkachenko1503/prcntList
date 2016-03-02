require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

import App from './src/App';
import appStateStream from './src/streams';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<App stateStream={appStateStream} />, document.querySelector("#myApp"));
});
