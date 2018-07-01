import React from 'react';
import { Input } from 'antd';


export default class UserDefineConfig extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="cd-title">{this.props.title}</div>
                <Input placeholder="Basic usage" />
            </div>
        )
    }
}