import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
import 'antd/dist/antd.css';

import UserDefineConfig from '@component/UserDefineConfig';
import { hideConfig, saveConfigRequest } from '@actions';

class ConfigDialog extends React.Component {

    constructor() {
        super();
        this.state = {
            configData: {},
        }
    }

    handleSubmit() {
        const { form } = this.refs;
        const { saveConfigRequest } = this.props;
        const configData = form.getConfigData();
        const moduleData = form.toModuleData(configData);
        saveConfigRequest({
            configData,
            moduleData,
        });
    }

    render() {
        const { moduleConfig, hideConfig, saveConfigRequest } = this.props;
        const { store } = this.context;


        function renderDialog(moduleConfig) {
            const { moduleData } = moduleConfig;
            const { moduleTypeId } = moduleData;
            switch (moduleTypeId) {
                case 1: //自定义代码
                    return <UserDefineConfig
                        title="自定义代码配置"
                        ref='form'
                        getConfig={() => { }} />
                default:
                    return <div>没有找到该模块的配置项</div>
            }
        }


        if (moduleConfig.isVisiable) {
            return (
                <div className="cd-config-dialog">
                    <Icon type="close" onClick={() => hideConfig()} />
                    {renderDialog(moduleConfig)}
                    <Button onClick={() => hideConfig()}>取消</Button>
                    <Button type="primary"
                        onClick={() => { this.handleSubmit() }}>确定</Button>
                </div>
            )
        } else {
            return null;
        }

    }
}


ConfigDialog.contextTypes = { store: PropTypes.object };

const mapStateToProps = (state) => {
    return { moduleConfig: state.moduleConfig }
}


export default connect(mapStateToProps, { hideConfig, saveConfigRequest })(ConfigDialog)