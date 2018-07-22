import React from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';

import { focusModule } from '@actions';

class ModuleTag extends React.Component {

    constructor(props) {
        super();

    }



    render() {
        const { moduleData, focusModule } = this.props;
        const { moduleName } = moduleData;
        let top, isActive, height;
        if (moduleData.tempData) {
            top = moduleData.tempData.top;
            height = moduleData.tempData.height;
            isActive = moduleData.tempData.isActive;
        }
        return (
            <Tooltip title={moduleName} placement="left">
                <div className={`d-module-tag ${isActive ? 'active' : ''}`}
                    style={{ top, maxHeight: isActive ? '' : height }}
                    onClick={() => { focusModule(moduleData.moduleId) }}
                >{moduleName}</div>
            </Tooltip>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        module: state.module,
    }
}


export default connect(mapStateToProps, { focusModule })(ModuleTag);