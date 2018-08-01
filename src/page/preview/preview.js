import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Canvas from '../../component/Canvas';

ReactDOM.render(
	<Provider store={store} >
		<Canvas />
	</Provider>,
	document.querySelector('#Container')
);