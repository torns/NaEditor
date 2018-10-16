import './index.css';

const form = document.querySelector('#form');
const errorNode = document.querySelector('#errorHint');

form.onsubmit = (e) => {

	// var opts = {
	//     method: 'POST', //请求方法
	//     body: `username=${document.querySelector('#username input').value}&password=${document.querySelector('#password input').value}`, //请求体
	//     headers: {
	//         'Content-Type': 'application/x-www-form-urlencoded',
	//     },

	// };

	// fetch('/api/login', opts)
	//     .then((response) => {
	//         //你可以在这个时候将Promise对象转换成json对象:response.json()
	//         //转换成json对象后return，给下一步的.then处理
	//         return response.json();
	//     })
	//     .then((data) => {
	//         // if (data.success === true) {
	//         //     location.href = `/page/manage`
	//         // } else {
	//         //     errorNode.innerHTML = data.msg;
	//         // }
	//     })
	// console.log($);
	// $.post({
	//     url: '/api/login',
	//     data: {
	//         username: document.querySelector('#username input').value,
	//         password: document.querySelector('#password input').value
	//     },
	//     success: function(data) {
	//         console.log(data);
	//     }
	// });

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var data = JSON.parse(xhr.responseText);
			if (data.success === true) {
				location.href = '/page/manage';
			} else {
				errorNode.innerHTML = data.msg;
			}

		}
	};

	xhr.open('POST', '/api/login', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(`username=${document.querySelector('#username input').value}&password=${document.querySelector('#password input').value}`);

	e.preventDefault();

};