import React from 'react';
import { connect } from 'react-redux';

import { showConfig, focusModule, addModuleRequest } from '@actions';

class ModuleWrap extends React.Component {

    constructor(props) {
        super();

        this.state = {
            moduleData: props.moduleData,
            configData: {
            },
            nextPlaceholder: undefined,
        }
    }

    dragOver = (e) => {
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
                window.resizeIframe();

            })


            function insertAfter(newEl, targetEl) {
                var parentEl = targetEl.parentNode;
                if (parentEl.lastChild == targetEl) {
                    parentEl.appendChild(newEl);
                } else {
                    parentEl.insertBefore(newEl, targetEl.nextSibling);
                }
            }
        }
        e.preventDefault();

    }

    dragLeave = (e) => {
        this.clearNextPlaceholder();
    }

    /**
     * 清除dragover时生成的占位元素
     */
    clearNextPlaceholder = () => {
        this.state.nextPlaceholder.remove();
        window.resizeIframe();
        this.setState({
            nextPlaceholder: undefined,
        })
    }

    drop = (e) => {
        const moduleTypeId = Number.parseInt(e.dataTransfer.getData('moduleTypeId'));
        const { addModuleRequest } = this.props;
        const preModuleId = this.state.moduleData.moduleId;
        addModuleRequest({
            preModuleId: preModuleId,
            moduleTypeId,
            pageId: window.BASE_DATA.pageId,
        })
        this.clearNextPlaceholder();
    }

    render() {
        const { moduleData, showConfig, focusModule, } = this.props;
        const { tempData, moduleId } = moduleData;
        let isActive;
        if (tempData) {
            isActive = tempData.isActive;
        }
        return (
            <div className={`J_moduleWrap d-module-wrap ${isActive ? 'active' : ''}`}
                onClick={(e) => { showConfig(moduleData); focusModule(moduleId) }}
                onDragOver={this.dragOver}
                onDragLeave={this.dragLeave}
                onDrop={this.drop}
                dragable='false'
            >
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return { module: state.module }
}

export default connect(mapStateToProps, {
    showConfig,
    focusModule,
    addModuleRequest,
})(ModuleWrap)
