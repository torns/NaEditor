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
            list: [],
        }
    }

    async componentDidMount() {
        const result = (await axios(INTERFACE.getModuleList)).data;
        if (result.success === true) {
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
        if (list.length > 0) {
            return (
                <div className="d-module-list" >
                    {list.map((moduleCate: any, i: number) =>
                        <React.Fragment key={i}>
                            <div className="d-module-cate">
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