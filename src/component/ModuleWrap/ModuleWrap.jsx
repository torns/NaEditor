import React from 'react';
import { connect } from 'react-redux';

import { showConfig, focusModule } from '@actions';

class ModuleWrap extends React.Component {

    constructor(props) {
        super();

        this.state = {
            moduleData: props.moduleData,
            configData: {
            },
            isActive: props.moduleData.tempData && props.moduleData.tempData.isActive,
        }
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
                onClick={(e) => { showConfig(moduleData); focusModule(moduleId) }}>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return { module: state.module }
}

export default connect(mapStateToProps, { showConfig, focusModule })(ModuleWrap)
