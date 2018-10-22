import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Tooltip, message } from 'antd';

import { showConfig, hideConfig, removeModuleRequest, positionModuleRequest, copyModuleRequest } from '../../actions';
import { IModule, IState, IModuleConfig } from '../interface';

interface ModuleBarProps {
    module: IModule;
    positionModuleRequest: (args: any) => void;
    showConfig: any;
    moduleConfig: IModuleConfig;
    hideConfig: any;
    removeModuleRequest: any;
    copyModuleRequest: any;
}

interface ModuleBarState {

}

class ModuleBar extends PureComponent<ModuleBarProps, ModuleBarState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    constructor(props: ModuleBarProps) {
        super(props);
    }

    /**
     * 上移模块
     */
    up = (moduleId: number) => {
        const { pageId } = this.context.BASE_DATA;
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
        }, 0);
        if (preModuleId === -1) {
            message.error('当前模块已是第一个模块');
        } else {
            this.props.positionModuleRequest({
                preModuleId,
                moduleId,
                pageId,
            });
        }
    }

    /**
     * 下移模块
     */
    down = (moduleId: number) => {
        const { pageId } = this.context.BASE_DATA;
        const preModuleId = this.props.module.moduleList.reduce((acc, v, i, array) => {
            if (v.moduleId === moduleId) {
                let nextModule = array[i + 1];
                if (nextModule !== undefined) {
                    acc = nextModule.moduleId;
                }
            }
            return acc;
        }, 0);
        if (preModuleId === undefined) {
            message.error('当前模块已是最后一个模块');
        } else {
            this.props.positionModuleRequest({
                preModuleId,
                moduleId,
                pageId,
            });
        }
    }

    /**
     * 复制模块
     */
    copy = (moduleId: number) => {
        let { pageId } = this.context.BASE_DATA;
        pageId = Number.parseInt(pageId, 10);
        this.props.copyModuleRequest({
            moduleId,
            pageId,
        });
    }

    render() {
        const { pageId } = this.context.BASE_DATA;
        const { showConfig, module, moduleConfig, hideConfig, removeModuleRequest } = this.props;
        const activeModule = module.moduleList.filter((v) => v.tempData && v.tempData.isActive === true);
        const configVisiable = moduleConfig.isVisible;
        const activeModuleData = activeModule && activeModule[0];
        const activeModuleId = activeModuleData && activeModuleData.moduleId;
        let top = 90;
        if (activeModuleData && activeModuleData.tempData) {
            top += activeModuleData.tempData.top || 0;
        }
        if (activeModuleData === undefined) { return null; }

        const removeModule = (moduleId: number) => {
            removeModuleRequest({
                pageId,
                moduleId: activeModuleId,
            });
        };

        return (
            <div
                className="d-module-bar"
                style={{ top }}
            >
                <Tooltip title="模块配置" placement="right">
                    <Icon
                        type="setting"
                        onClick={() => { configVisiable ? hideConfig() : showConfig(activeModuleData); }}
                        style={{ fontSize: '20px', color: `${configVisiable ? '#3089DC' : ''}` }}
                    />
                </Tooltip>
                <Tooltip title="上移" placement="right">
                    <Icon
                        type="caret-up"
                        onClick={this.up.bind(this, activeModuleId)}
                        style={{ fontSize: '20px' }}
                    />
                </Tooltip>
                <Tooltip title="下移" placement="right">
                    <Icon
                        type="caret-down"
                        style={{ fontSize: '20px' }}
                        onClick={this.down.bind(this, activeModuleId)}
                    />
                </Tooltip>
                <Tooltip title="复制" placement="right">
                    <Icon
                        type="copy"
                        style={{ fontSize: '20px' }}
                        onClick={this.copy.bind(this, activeModuleId)}
                    />
                </Tooltip>
                <Tooltip title="删除" placement="right">
                    <Icon
                        type="delete"
                        style={{ fontSize: '20px' }}
                        onClick={() => { removeModule(activeModuleId); }}
                    />
                </Tooltip>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        module: state.module,
        moduleConfig: state.moduleConfig,
    };
};

export default connect(mapStateToProps, {
    showConfig,
    hideConfig,
    removeModuleRequest,
    positionModuleRequest,
    copyModuleRequest,
})(ModuleBar);