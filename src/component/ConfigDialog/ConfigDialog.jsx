import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
import 'antd/dist/antd.css';

import UserDefineConfig from '@component/UserDefineConfig';
import { hideConfig, saveConfigRequest } from '@actions';
import ImageHotspotConfig from '@component/ImageHotspotConfig';
import TextConfig from '@component/TextConfig';
import CarouselConfig from '@component/CarouselConfig';

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
        const { moduleConfig, module, hideConfig, saveConfigRequest } = this.props;
        let activeModule = module.moduleList.filter(v => v.tempData.isActive);
        activeModule = activeModule && activeModule[0];

        function renderDialog(moduleConfig) {
            const { moduleData } = moduleConfig;
            const { moduleTypeId } = moduleData;
            switch (moduleTypeId) {
                case 1: //自定义代码
                    return <UserDefineConfig
                        title="自定义代码配置"
                        ref='form'
                        moduleData={moduleData} />
                case 2: //图片热区
                    return <ImageHotspotConfig
                        title="图片热区配置"
                        ref='form'
                        moduleData={moduleData} />
                case 3: //文字
                    return <TextConfig
                        title="文字模块设置"
                        ref='form'
                        moduleData={moduleData} />
                case 4: //图片轮播
                    return <CarouselConfig
                        title="图片轮播设置"
                        ref='form'
                        moduleData={moduleData} />
                default:
                    return <div>没有找到该模块的配置项</div>
            }
        }


        if (moduleConfig.isVisiable && activeModule !== undefined) {

            let top = 20;
            top += activeModule.tempData.top;

            const { moduleData } = moduleConfig;
            const { moduleName } = moduleData;
            return (
                <div className="d-config-dialog"
                    style={{ top }}>
                    <div className='d-header'>
                        <p className='d-module-name'>{moduleName}</p>
                        <span>
                            <Icon className='d-close' type="close" onClick={() => hideConfig()} />
                            <Icon type="question-circle-o" />
                        </span>
                    </div>
                    <div className='d-content'>
                        {renderDialog(moduleConfig)}
                    </div>
                    <div className='d-footer'>
                        <Button onClick={() => hideConfig()}>取消</Button>
                        <Button type="primary"
                            onClick={() => { this.handleSubmit() }}>确定</Button>
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}


ConfigDialog.contextTypes = { store: PropTypes.object };

const mapStateToProps = (state) => {
    return {
        moduleConfig: state.moduleConfig,
        module: state.module
    }
}


export default connect(mapStateToProps, { hideConfig, saveConfigRequest })(ConfigDialog)