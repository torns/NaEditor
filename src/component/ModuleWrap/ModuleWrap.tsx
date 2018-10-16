import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showConfig, focusModule, addModuleRequest, allModuleTopChange } from '../../actions';
import { IModuleData, IModuleConfig, IState } from '../interface';

interface ModuleWrapProps {
    moduleData: IModuleData;
    moduleRef: HTMLElement;
    addModuleRequest: any;
    allModuleTopChange: any;
    moduleConfig: IModuleConfig;
    showConfig: any;
    focusModule: any;
}

interface ModuleWrapState {
    moduleData: IModuleData;
    nextPlaceholder?: HTMLDivElement;
}

class ModuleWrap extends React.Component<ModuleWrapProps, ModuleWrapState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    constructor(props: ModuleWrapProps) {
        super(props);

        this.state = {
            moduleData: props.moduleData,
        };
    }

    dragOver = (e: React.DragEvent) => {
        const { nextPlaceholder, moduleData } = this.state;
        const { moduleRef, allModuleTopChange } = this.props;
        if (nextPlaceholder === undefined) {
            const placeholder = document.createElement('div');
            placeholder.className = 'd-next-placeholder';
            placeholder.innerHTML = `松开鼠标模块会被放置到这里`;
            this.setState({
                nextPlaceholder: placeholder,
            }, () => {
                insertAfter(placeholder, moduleRef);
                (window as any).resizeIframe();

                // 刷新本模块之后所有模块的top值
                // TODO 有性能问题，暂时屏蔽
                // allModuleTopChange(moduleData.moduleId, placeholder.clientHeight);
            });

        }
        e.preventDefault();
        e.stopPropagation();
    }

    dragLeave = (e: React.DragEvent) => {
        const { moduleData, nextPlaceholder } = this.state;
        const { allModuleTopChange } = this.props;
        let topChange = 0;
        if (nextPlaceholder !== undefined) {
            topChange = -nextPlaceholder.clientHeight;
        }
        // 本模块之后所有模块的top值还原
        // TODO 有性能问题，暂时屏蔽
        // allModuleTopChange(moduleData.moduleId, topChange);
        this.clearNextPlaceholder();
        e.stopPropagation();
    }

    /**
     * 清除dragover时生成的占位元素
     */
    clearNextPlaceholder = () => {
        const { nextPlaceholder } = this.state;
        if (nextPlaceholder) {
            nextPlaceholder.remove();
        }
        (window as any).resizeIframe();
        this.setState({
            nextPlaceholder: undefined,
        });
    }

    drop = async (e: React.DragEvent) => {
        const { pageId } = this.context.BASE_DATA;
        const moduleTypeId = Number.parseInt(e.dataTransfer.getData('moduleTypeId'), 10);
        const { addModuleRequest } = this.props;
        const preModuleId = this.state.moduleData.moduleId;
        addModuleRequest({
            preModuleId: preModuleId,
            moduleTypeId,
            pageId,
        });
        this.clearNextPlaceholder();
        e.stopPropagation();
    }

    render() {
        const {
            moduleData,
            moduleData: {
                tempData,
                moduleId,
            },
            moduleConfig: {
                isVisible: isConfigVisible,
            },
            showConfig,
            focusModule } = this.props;
        let isActive: boolean = false;
        if (tempData) {
            isActive = tempData.isActive;
        }

        return (
            <div
                className={`J_moduleWrap d-module-wrap ${isActive ? 'active' : ''}`}
                onClick={(e) => { showConfig(moduleData); if (!isActive) { focusModule(moduleId); } }}
                onDragOver={this.dragOver}
                onDragLeave={this.dragLeave}
                onDrop={this.drop}
                draggable={false}
            />
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
    focusModule,
    addModuleRequest,
    allModuleTopChange,
})(ModuleWrap);

function insertAfter(newEl: HTMLElement, targetEl: HTMLElement) {
    let parentEl = targetEl.parentNode;
    if (parentEl === null) {
        return;
    }
    if (parentEl.lastChild === targetEl) {
        parentEl.appendChild(newEl);
    } else {
        parentEl.insertBefore(newEl, targetEl.nextSibling);
    }
}