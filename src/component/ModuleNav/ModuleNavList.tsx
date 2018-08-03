import React from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';

import ModuleNavItem from './ModuleNavItem';
import { showConfig, focusModule, removeModuleRequest } from '../../actions';
import { IState, IModuleData } from '../interface';

interface ModuleNavListProps {
    onClose: () => void;
    module: any;
}

interface ModuleNavListState {
    currentDrag?: number;
}

class ModuleNavList extends React.Component<ModuleNavListProps, ModuleNavListState> {

    constructor(props: ModuleNavListProps) {
        super(props);
        this.state = {
            currentDrag: undefined,
        }
    }

    /**
     * 当前被拖动的元素发生改变
     */
    onDragedChange = (moduleId: number | undefined) => {
        this.setState({
            currentDrag: moduleId,
        });
    }

    render() {

        const { onClose, module: { moduleList } } = this.props;
        const { currentDrag } = this.state;

        return (
            <div className="d-module-nav-list">
                <div className="d-header">
                    <p className="d-title">模块导航</p>
                    <Icon className="d-close-icon" type="close" onClick={onClose} />
                </div>
                <ul>
                    {moduleList.map((v: IModuleData) => (
                        <ModuleNavItem
                            key={v.moduleId}
                            moduleData={v}
                            onDragedChange={this.onDragedChange}
                            currentDrag={currentDrag}
                        />
                    ))}
                </ul>
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
    focusModule,
    removeModuleRequest,
})(ModuleNavList);