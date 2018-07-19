import React from "react";
import { Icon, Popover } from "antd";



class ModuleBar extends React.Component {
    constructor() {
        super();


    }

    render() {
        return (
            <div className="d-module-bar">
                <Popover content='模块配置' placement="right">
                    <Icon type="setting" style={{ fontSize: '20px' }} />
                </Popover>
                <Popover content='上移' placement="right">
                    <Icon type="caret-up" style={{ fontSize: '20px' }} />
                </Popover>
                <Popover content='下移' placement="right">
                    <Icon type="caret-down" style={{ fontSize: '20px' }} />
                </Popover>
                <Popover content='删除' placement="right">
                    <Icon type="delete" style={{ fontSize: '20px' }} />
                </Popover>
            </div>
        )
    }


}

export default ModuleBar;