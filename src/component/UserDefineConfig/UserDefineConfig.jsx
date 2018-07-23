import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
const { TextArea } = Input;

class UserDefineConfig extends React.Component {

    constructor(props) {
        super();
        let code;
        if (props.moduleData.configData) {
            code = props.moduleData.configData.code;
        } else {
            code = '';
        }
        this.state = {
            code,
        }
    }


    componentWillReceiveProps(nextProps) {
        let newCode;
        if (nextProps.moduleData.configData) {
            newCode = nextProps.moduleData.configData.code;
        } else {
            newCode = '';
        }
        this.setState({
            code: newCode
        })

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
                <TextArea placeholder="在此输入代码"
                    value={this.state.code}
                    onChange={(e) => { this.setState({ code: e.target.value }); }} />
            </div>
        )
    }
}

UserDefineConfig.contextTypes = { store: PropTypes.object };

export default UserDefineConfig;