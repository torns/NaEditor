import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
const { TextArea } = Input;

class UserDefineConfig extends React.Component {

    constructor(props) {
        super();
        this.state = {
            code: props.moduleData.configData.code,
        }
    }

    getConfigData() {
        return {
            code: this.state.code,
        }
    }

    toModuleData(configData) {
        const { store } = this.context;
        const state = store.getState();
        const result = Object.assign({}, state.moduleConfig.moduleData, {
            data: configData,
        })
        return result;
    }

    render() {
        return (
            <div>
                <div className="cd-title">{this.props.title}</div>
                <TextArea placeholder="在此输入代码"
                    value={this.state.code}
                    onChange={(e) => { this.setState({ code: e.target.value }); }} />
            </div>
        )
    }
}

UserDefineConfig.contextTypes = { store: PropTypes.object };

export default UserDefineConfig;