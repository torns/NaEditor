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
        }
    }

    handleSubmit() {
        const { form } = this.refs;
        const { saveConfigRequest } = this.props;
        const configData = form.getConfigData();
        let moduleData = form.toModuleData(configData);
        moduleData.configData = configData;
        saveConfigRequest(moduleData);
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
                        moduleData={moduleData} />
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