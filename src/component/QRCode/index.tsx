import React from 'react';
import Loadable from 'react-loadable';

const QRCode = Loadable({
    loader: () => import('qrcode.react'),
    loading() {
        return <div>Loading...</div>
    }
});

export default QRCode;