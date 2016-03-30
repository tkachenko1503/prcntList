import R from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import flyd from 'flyd';

import App from './components/App';

const actions$ = flyd.stream();
const model$ = flyd.scan(R.flip(App.update), App.init(), actions$);

document.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector("#myApp");

	flyd.on(model => {
	  ReactDOM.render(
	    <App.View actions$={actions$} model={model} />,
	    root
	  );
	}, model$);
});


// LOGGER
flyd.on((a) => {
	console.log('ACTION - ', a.name);
	const payload = a.keys
		.map((v, i) => {
			return '' + v + ' - ' + JSON.stringify(a[i]);
		})
		.join(' | ');
	console.log('payload: ', payload);
}, actions$);
