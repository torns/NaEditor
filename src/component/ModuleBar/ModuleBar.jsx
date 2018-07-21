import React from "react";
import { connect } from 'react-redux';
import { Icon, Tooltip } from "antd";

import { showConfig, hideConfig, removeModuleRequest, positionModuleRequest } from '@actions';


class ModuleBar extends React.Component {
    constructor() {
        super();
    }

    /**
     * 上移模块
     */
    up = (moduleId) => {
        const preModuleId = this.props.module.moduleList.reduce((acc, v, i, array) => {
            if (v.moduleId === moduleId) {
                // 如果这不是第一个模块
                if (i > 1) {
                    acc = array[i - 1].moduleId;
                }
            }
            return acc;
        }, undefined);
        this.props.positionModuleRequest({
            preModuleId,
            moduleId,
            pageId: BASE_DATA.pageId,
        })
    }

    render() {
        const { showConfig, module, moduleConfig, hideConfig, removeModuleRequest } = this.props;
        const activeModule = module.moduleList.filter((v) => v.tempData && v.tempData.isActive === true)
        const configVisiable = moduleConfig.isVisiable;
        const activeModuleData = activeModule && activeModule[0];
        return (
            <div className="d-module-bar">
                <Tooltip title='模块配置' placement="right">
                    <Icon type="setting"

                        onClick={() => { configVisiable ? hideConfig() : showConfig(activeModuleData) }}
                        style={{
                            fontSize: '20px',
                            color: `${configVisiable ? '#3089DC' : ''}`
                        }} />
                </Tooltip>
                <Tooltip title='上移' placement="right">
                    <Icon type="caret-up"
                        onClick={this.up.bind(this, activeModuleData && activeModuleData.moduleId)}
                        style={{ fontSize: '20px' }} />
                </Tooltip>
                <Tooltip title='下移' placement="right">
                    <Icon type="caret-down" style={{ fontSize: '20px' }} />
                </Tooltip>
                <Tooltip title='删除' placement="right">
                    <Icon type="delete"
                        style={{ fontSize: '20px' }}
                        onClick={() => {
                            removeModuleRequest({
                                pageId: window.BASE_DATA.pageId,
                                moduleId: activeModuleData && activeModuleData.moduleId
                            })
                        }} />
                </Tooltip>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        module: state.module,
        moduleConfig: state.moduleConfig,
    }
}


export default connect(mapStateToProps, {
    showConfig,
    hideConfig,
    removeModuleRequest,
    positionModuleRequest,
})(ModuleBar)