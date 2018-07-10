import { createStore } from 'redux'


function num(state = 0, action) {
    switch (action.type) {
        case 'add':
            let result = state + 1;
            return result;
        default:
            return state;
    }
}

const add = () => {
    return {
        type: 'add',
    }
}

const store = createStore(num);

store.subscribe(function() {
    document.querySelector('#num').innerHTML = store.getState();
})

console.log(store.getState())

const btn = document.querySelector('#add');

btn.addEventListener('click', function() {
    store.dispatch(add());
})

window.store = store;