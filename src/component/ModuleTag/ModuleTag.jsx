import React from 'react';

class ModuleTag extends React.Component {

    constructor(props) {
        super();

    }



    render() {
        const { moduleData } = this.props;
        let top, isActive, height;
        if (moduleData.tempData) {
            top = moduleData.tempData.top;
            height = moduleData.tempData.height;
            isActive = moduleData.tempData.isActive;
        }
        return (
            <div className={`d-module-tag ${isActive ? 'active' : ''}`}
                style={{ top, maxHeight: isActive ? '' : height }}
            >{moduleData.moduleName}</div>
        )
    }

}

export default ModuleTag;