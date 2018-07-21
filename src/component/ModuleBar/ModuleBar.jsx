import React from "react";
import { connect } from 'react-redux';
import { Icon, Tooltip, message } from "antd";

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
                    acc = array[i - 2].moduleId;
                }
                if (i === 0) {
                    acc = -1;
                }
            }
            return acc;
        }, undefined);
        if (preModuleId === -1) {
            message.error('当前模块已是第一个模块');
        } else {
            this.props.positionModuleRequest({
                preModuleId,
                moduleId,
                pageId: BASE_DATA.pageId,
            })
        }

    }

    /**
     * 下移模块
     */
    down = (moduleId) => {
        const preModuleId = this.props.module.moduleList.reduce((acc, v, i, array) => {
            if (v.moduleId === moduleId) {
                let nextModule = array[i + 1];
                if (nextModule !== undefined) {
                    acc = nextModule.moduleId;
                }
            }
            return acc;
        }, undefined);
        if (preModuleId === undefined) {
            message.error('当前模块已是最后一个模块');
        } else {
            this.props.positionModuleRequest({
                preModuleId,
                moduleId,
                pageId: BASE_DATA.pageId,
            })
        }

    }

    render() {
        const { showConfig, module, moduleConfig, hideConfig, removeModuleRequest } = this.props;
        const activeModule = module.moduleList.filter((v) => v.tempData && v.tempData.isActive === true)
        const configVisiable = moduleConfig.isVisiable;
        const activeModuleData = activeModule && activeModule[0];
        const activeModuleId = activeModuleData && activeModuleData.moduleId;
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
                        onClick={this.up.bind(this, activeModuleId)}
                        style={{ fontSize: '20px' }} />
                </Tooltip>
                <Tooltip title='下移' placement="right">
                    <Icon type="caret-down"
                        style={{ fontSize: '20px' }}
                        onClick={this.down.bind(this, activeModuleId)} />
                </Tooltip>
                <Tooltip title='删除' placement="right">
                    <Icon type="delete"
                        style={{ fontSize: '20px' }}
                        onClick={() => {
                            removeModuleRequest({
                                pageId: window.BASE_DATA.pageId,
                                moduleId: activeModuleId,
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