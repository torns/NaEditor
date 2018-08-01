import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';

import '@component/Messager';
import '../../db/createStore';
import ConfigDialog from '@component/ConfigDialog';
import ModuleList from '@component/ModuleList';
import ModuleBar from '@component/ModuleBar';
import ModuleTagList from '@component/ModuleTagList';
import Canvas from '@component/Canvas';
import ModuleNav from '@component/ModuleNav';
import store from '@store';

const {
	BASE_DATA: {
		pageId,
	}
} = window;

window.resizeIframe = _.debounce(() => {
	let height = document.querySelector('.J_canvas').contentWindow.document.body.scrollHeight + 'px';
	document.querySelector('iframe.J_canvas').style.height = height;
}, 50);

document.querySelector('.J_preview').addEventListener('click', function () {
	document.querySelector('.J_previewWrap').classList.add('active');
	document.querySelector('.J_previewContainer').innerHTML = `
		<iframe class="cd-canvas J_canvas" src="/page/preview.html?pageId=${pageId}&type=1">                
		</iframe>
	`
});

document.querySelector('.J_previewWrap .J_closeBtn').addEventListener('click', () => {
	document.querySelector('.J_previewWrap').classList.remove('active');
	document.querySelector('.J_previewContainer').innerHTML = '';
})

window.onload = () => {
	document.querySelector('.J_previewWrap').style.display = 'block';
}


window.addEventListener('load', () => {

	ReactDOM.render(
		(<Provider store={store} >
			<Canvas />
		</Provider>),
		document.querySelector('.J_canvas').contentDocument.querySelector('#Container'));


	ReactDOM.render(
		(
			<Provider store={store}>
				<ConfigDialog store={store} />
			</Provider >
		),
		document.querySelector('.J_configDialog')
	);


	ReactDOM.render(
		<Provider store={store}>
			<ModuleList />
		</Provider >,
		document.querySelector('.J_moduleList')
	);

	ReactDOM.render(
		<Provider store={store}>
			<ModuleBar />
		</Provider>,
		document.querySelector('.J_ModuleBar')
	);

	ReactDOM.render(
		<Provider store={store}>
			<ModuleTagList />
		</Provider>,
		document.querySelector('.J_moduleTagList')
	);


	ReactDOM.render(
		<Provider store={store}>
			<ModuleNav />
		</Provider>,
		document.querySelector('.J_moduleNav')
	);
});