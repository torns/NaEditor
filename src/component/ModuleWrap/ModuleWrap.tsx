import React from 'react';
import { connect } from 'react-redux';

import { showConfig, focusModule, addModuleRequest } from '../../actions';
import { IModuleData, IModuleConfig, IState } from '../interface';

interface ModuleWrapProps {
    moduleData: IModuleData;
    moduleRef: HTMLElement;
    addModuleRequest: any;
    moduleConfig: IModuleConfig;
    showConfig: any;
    focusModule: any;
}

interface ModuleWrapState {
    moduleData: IModuleData;
    nextPlaceholder?: HTMLDivElement;
}

const { BASE_DATA } = (window as any);

class ModuleWrap extends React.Component<ModuleWrapProps, ModuleWrapState> {

    constructor(props: ModuleWrapProps) {
        super(props);

        this.state = {
            moduleData: props.moduleData,
        };
    }

    dragOver = (e: React.DragEvent) => {
        const { nextPlaceholder } = this.state;
        const { moduleRef } = this.props;
        if (nextPlaceholder === undefined) {
            const placeholder = document.createElement('div');
            placeholder.className = 'd-next-placeholder';
            placeholder.innerHTML = `松开鼠标模块会被放置到这里`;
            this.setState({
                nextPlaceholder: placeholder,
            }, () => {
                insertAfter(placeholder, moduleRef);
                (window as any).resizeIframe();
            });

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
        }
        e.preventDefault();

    }

    dragLeave = () => {
        this.clearNextPlaceholder();
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

    drop = (e: DragEvent) => {
        const moduleTypeId = Number.parseInt(e.dataTransfer.getData('moduleTypeId'), 10);
        const { addModuleRequest } = this.props;
        const preModuleId = this.state.moduleData.moduleId;
        addModuleRequest({
            preModuleId: preModuleId,
            moduleTypeId,
            pageId: BASE_DATA.pageId,
        });
        this.clearNextPlaceholder();
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
                onDrop={(e: any) => { this.drop(e); }}  // TODO any?
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
})(ModuleWrap);
