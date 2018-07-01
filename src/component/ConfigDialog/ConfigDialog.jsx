import React from 'react';
import 'antd/dist/antd.css';

import UserDefineConfig from '@component/UserDefineConfig';


export default class ConfigDialog extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="cd-config-dialog">
                <UserDefineConfig title="自定义代码配置" />
            </div>
        )
    }
}