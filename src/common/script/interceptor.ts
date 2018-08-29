import axios from 'axios';

axios.interceptors.response.use(function (res) {
    if (res.status === 200 && res.data.success === false && res.data.msg === 'no login') {
        location.href = '/page/login';
    }
    return res;
});