import React, { Component } from 'react';
import { Icon } from 'antd';

import ModuleNavList from './ModuleNavList';


class ModuleNav extends Component {
    constructor() {
        super();
        this.state = {
            isActive: false,
        }
    }

    onClose = () => {
        this.setState({
            isActive: false,
        })
    }

    open = () => {
        this.setState({
            isActive: true,
        })
    }

    render() {

        const { isActive } = this.state;

        return (
            <div className={`d-module-nav ${isActive ? 'active' : ''}`}>
                <div className="d-btn" onClick={this.open}>
                    <Icon className="d-icon" type='bars' />
                </div>
                <ModuleNavList onClose={this.onClose} />
            </div>
        )
    }
}



export default ModuleNav;