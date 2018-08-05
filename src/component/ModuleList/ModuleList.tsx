import React, { Component } from 'react';
import { addModuleRequest } from '../../actions';
import { connect } from "react-redux";
import axios from 'axios';

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
            list: [
                {
                    cataName: '图文类',
                    cateId: 1,
                    isActive: true,
                    list: [
                        {
                            name: '图片热区',
                            typeId: 2,
                            iconUrl: ''
                        }, {
                            name: '文字',
                            typeId: 3,
                            iconUrl: '',
                        }, {
                            name: '图片轮播',
                            typeId: 4,
                            iconUrl: ''
                        },
                    ]
                }, {
                    cataName: '自定义类',
                    cateId: 2,
                    isActive: false,
                    list: [
                        {
                            name: '自定义代码',
                            typeId: 1,
                            iconUrl: '',
                        }
                    ]
                }
            ]
        }
    }

    async componentDidMount() {
        const result = await axios(INTERFACE.getModuleList);
        if (result.data.success === true) {
            this.setState({
                list: result.data,
            });
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


    render() {

        const { list } = this.state;

        return (
            <div className="d-module-list" >
                {list.map((moduleCate: any, i: number) =>
                    <React.Fragment key={i}>
                        <div className="d-module-cate">
                            <span className="d-cate-name">{moduleCate.cataName}</span>
                        </div>
                        <div className="d-sub-list">
                            {moduleCate.list.map((module: any) =>
                                <div
                                    key={module.typeId}
                                    className="d-module-item"
                                    data-type-id={module.typeId}
                                    draggable={true}
                                    onDoubleClick={(e) => { this.addModule(module.typeId) }}
                                    onDragStart={this.moduleDragStart.bind(this, module.typeId)}
                                >
                                    <div className="d-module-icon" style={{ backgroundImage: module.iconUrl }} />
                                    <span className="d-module-name">{module.name}</span>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    moduleConfig: state.moduleConfig,
    module: state.module,
});

export default connect(mapStateToProps, { addModuleRequest })(ModuleList);