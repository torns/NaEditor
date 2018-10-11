const isServer = typeof window === 'undefined';

let protocol;
if (isServer) {
    protocol = 'http://';
} else {
    protocol = '//';
}


let host;
// host = `47.107.69.189`; //远程
host = `127.0.0.1`; //本地

// dev
module.exports = {
    host,
    serverAddress: `${protocol}h5editor.cn`,
    staticAddress: `${protocol}static.h5editor.cn`,
    viewAddress: `${protocol}view.h5editor.cn`,
}