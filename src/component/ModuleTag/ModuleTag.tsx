import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';

import { focusModule } from '../../actions';
import { IModuleData, IState } from '../interface';

interface ModuleTagProps {
    moduleData: IModuleData;
    focusModule: (moduleId: number) => void;
}

interface ModuleTagState {

}

class ModuleTag extends PureComponent<ModuleTagProps, ModuleTagState> {

    constructor(props: ModuleTagProps) {
        super(props);
    }

    render() {
        const {
            moduleData,
            moduleData: {
                moduleName,
            },
            focusModule,
        } = this.props;
        let top;
        let isActive;
        let height;
        if (moduleData.tempData) {
            top = moduleData.tempData.top;
            height = moduleData.tempData.height;
            isActive = moduleData.tempData.isActive;
        }
        return (
            <Tooltip title={moduleName} placement="left">
                <div
                    className={`d-module-tag ${isActive ? 'active' : ''}`}
                    style={{ top, maxHeight: isActive ? '' : height }}
                    onClick={() => { focusModule(moduleData.moduleId); }}
                >{moduleName}
                </div>
            </Tooltip>
        );
    }

}

const mapStateToProps = (state: IState) => {
    return {
        module: state.module,
    };
};

export default connect(mapStateToProps, { focusModule })(ModuleTag);