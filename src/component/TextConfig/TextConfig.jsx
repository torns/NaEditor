import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
const { TextArea } = Input;

class TextConfig extends React.Component {

    constructor(props) {
        super();
        let text;
        if (props.moduleData.configData) {
            text = props.moduleData.configData.text;
        } else {
            text = '';
        }
        this.state = {
            text,
        }
    }


    componentWillReceiveProps(nextProps) {
        let newtext;
        if (nextProps.moduleData.configData) {
            newtext = nextProps.moduleData.configData.text;
        } else {
            newtext = '';
        }
        this.setState({
            text: newtext
        })

    }

    getConfigData() {
        return {
            text: this.state.text,
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
                <p className='d-text-content'>文本内容</p>
                <Input placeholder="请输入文本内容"
                    value={this.state.text}
                    onChange={(e) => { this.setState({ text: e.target.value }); }}
                />
            </div>
        )
    }
}

TextConfig.contextTypes = { store: PropTypes.object };

export default TextConfig;