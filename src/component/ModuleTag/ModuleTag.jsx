import React from 'react';

class ModuleTag extends React.Component {

    constructor(props) {
        super();

    }



    render() {
        const { moduleData } = this.props;
        let top, isActive;
        if (moduleData.tempData) {
            top = moduleData.tempData.top;
            isActive = moduleData.tempData.isActive;
        }
        return (
            <div className={`d-module-tag ${isActive ? 'active' : ''}`}
                style={{ top }}
            >{moduleData.moduleName}</div>
        )
    }

}

export default ModuleTag;