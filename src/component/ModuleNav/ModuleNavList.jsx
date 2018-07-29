import React from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';

import ModuleNavItem from './ModuleNavItem';
import { showConfig, focusModule, removeModuleRequest } from '../../actions';

const mapStateToProps = (state) => {
    return {
        module: state.module,
        moduleConfig: state.moduleConfig,
    };
};

// interface ModuleNavListProps {
//     onClose: () => void;
//     module: any;
// }

class ModuleNavList extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        const { onClose, module: { moduleList } } = this.props;

        return (
            <div className="d-module-nav-list">
                <div className="d-header">
                    <p className="d-title">模块导航</p>
                    <Icon className="d-close-icon" type="close" onClick={onClose} />
                </div>
                <ul>
                    {moduleList.map((v) => <ModuleNavItem key={v.moduleId} moduleData={v} />)}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps, {
    showConfig,
    focusModule,
    removeModuleRequest,
})(ModuleNavList);