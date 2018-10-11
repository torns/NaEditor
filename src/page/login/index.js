import './index.css';

const form = document.querySelector('#form');
const errorNode = document.querySelector('#errorHint');

form.onsubmit = (e) => {

    var opts = {
        method: 'POST', //请求方法
        body: `username=${document.querySelector('#username input').value}&password=${document.querySelector('#password input').value}`, //请求体
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

    };

    fetch('/api/login', opts)
        .then((response) => {
            //你可以在这个时候将Promise对象转换成json对象:response.json()
            //转换成json对象后return，给下一步的.then处理
            return response.json();
        })
        .then((data) => {
            if (data.success === true) {
                location.href = `/page/manage`
            } else {
                errorNode.innerHTML = data.msg;
            }
        })

    e.preventDefault();

};