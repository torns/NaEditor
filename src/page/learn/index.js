import { createStore } from 'redux';


function num(state = 0, action) {
	switch (action.type) {
	case 'add':
	{
		const { time } = action;
		return time;
	}
	default:
		return state;
	}
}

const add = (time) => {
	return {
		type: 'add',
		time,
	};
};

const store = createStore(num);

store.subscribe(function() {
	document.querySelector('#num').innerHTML = store.getState();
});


const btn = document.querySelector('#add');

btn.addEventListener('click', function() {
	store.dispatch(add(Date.now()));
});

window.store = store;