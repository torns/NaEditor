import React from "react";
import { Icon } from "antd";



class ModuleBar extends React.Component {
    constructor() {
        super();


    }

    render() {
        return (
            <div className="d-module-bar">
                <Icon type="setting" style={{ fontSize: '20px' }} />
                <Icon type="caret-up" style={{ fontSize: '20px' }}/>
                <Icon type="caret-down" style={{ fontSize: '20px' }}/>
                <Icon type="delete" style={{ fontSize: '20px' }}/>
            </div>
        )
    }


}

export default ModuleBar;