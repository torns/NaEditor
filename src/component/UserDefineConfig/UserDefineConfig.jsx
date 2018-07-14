import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
const { TextArea } = Input;

class UserDefineConfig extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="cd-title">{this.props.title}</div>
                <TextArea placeholder="Basic usage" />
            </div>
        )
    }
}


export default UserDefineConfig;