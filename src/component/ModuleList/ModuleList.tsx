import React, { Component } from 'react';
import { addModuleRequest } from '../../actions';
import { connect } from "react-redux";
import axios from 'axios';
import { Icon } from 'antd';

import './ModuleList.scss';
import { IState } from '../interface';
import INTERFACE from '../../common/script/INTERFACE';

interface ModuleListProps {
    addModuleRequest: (args: any) => void;
}

interface ModuleListState {
    list: any;
}

class ModuleList extends Component<ModuleListProps, ModuleListState> {
    constructor(props: ModuleListProps) {
        super(props);
        this.addModule = this.addModule.bind(this);
        this.state = {
            list: [],
        }
    }

    async componentDidMount() {
        const result = (await axios(INTERFACE.getModuleList)).data;
        if (result.success === true) {
            const list = result.data.map((v: any) => {
                v.isActive = true;
                return v;
            })
            this.setState({
                list,
            });

            // 将moduleList挂载到上，供其他地方调用
        }
    }

    addModule(moduleTypeId: number) {
        const { addModuleRequest } = this.props;
        const args = {
            moduleTypeId,
            pageId: (window as any).BASE_DATA.pageId,
        }
        addModuleRequest(args);
    }

    moduleDragStart = (moduleTypeId: string, e: DragEvent) => {
        e.dataTransfer.setData('moduleTypeId', moduleTypeId);
    }

    activeChange = (index: number) => {
        const { list } = this.state;
        const newList = list.map((v: any, i: number) => {
            if (i === index) {
                v.isActive = !v.isActive;
            }
            return v;
        })
        this.setState({
            list: newList,
        });
    }

    render() {

        const { list } = this.state;
        if (list.length > 0) {
            return (
                <div className="d-module-list" >
                    {list.map((moduleCate: any, i: number) =>
                        <React.Fragment key={i}>
                            <div
                                className={`d-module-cate ${moduleCate.isActive === true ? 'active' : ''}`}
                                onClick={() => { this.activeChange(i) }}
                            >
                                <Icon type="caret-right" />
                                <span className="d-cate-name">{moduleCate.name}</span>
                            </div>
                            <div className="d-sub-list">
                                {moduleCate.list.map((module: any, i: number) =>
                                    <div
                                        key={module.moduleTypeId}
                                        className="d-module-item"
                                        data-type-id={module.moduleTypeId}
                                        draggable={true}
                                        onDoubleClick={(e) => { this.addModule(module.moduleTypeId) }}
                                        onDragStart={this.moduleDragStart.bind(this, module.moduleTypeId)}
                                    >
                                        <div className="d-module-icon">
                                            <span style={{ backgroundImage: `url(${module.iconUrl})` }}></span>
                                        </div>
                                        <span className="d-module-name">{module.moduleName}</span>
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state: IState) => ({
    moduleConfig: state.moduleConfig,
    module: state.module,
});

export default connect(mapStateToProps, { addModuleRequest })(ModuleList);