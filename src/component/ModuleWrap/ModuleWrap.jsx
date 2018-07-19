import React from 'react';
import { connect } from 'react-redux';

import { showConfig, focusModule } from '@actions';

class ModuleWrap extends React.Component {

    constructor(props) {
        super();

        this.state = {
            moduleData: props.moduleData,
            configData: {
            }
        }
    }

    render() {
        const { moduleData, showConfig, focusModule, } = this.props;
        const { moduleId, tempData } = moduleData;
        return (
            <div className={`J_moduleWrap d-module-wrap ${tempData && tempData.isActive ? 'active' : ''}`}
                onClick={(e) => { showConfig(moduleData); focusModule(moduleId) }}>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return { module: state.module }
}

export default connect(mapStateToProps, { showConfig, focusModule })(ModuleWrap)
