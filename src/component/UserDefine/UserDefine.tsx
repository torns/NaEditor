import React from 'react';
import $ from 'jquery';
import Module from '../Module';

import { IModuleData } from '../interface';

interface UserDefineProps {
    moduleData: IModuleData;
}

interface UserDefineState {
    code: string;
    isActive: boolean;
}


export default class UserDefine extends React.Component<UserDefineProps, UserDefineState> {

    constructor(props: UserDefineProps) {
        super(props);
        this.state = {
            code: props.moduleData.data.code,
            isActive: props.moduleData.tempData.isActive,
        }
    }

    shouldComponentUpdate(nextProps: UserDefineProps, nextState: UserDefineState) {
        const isActive = nextProps.moduleData.tempData && nextProps.moduleData.tempData.isActive;
        if (this.state.code === nextProps.moduleData.data.code &&
            isActive === this.state.isActive
        ) {
            return false;
        } else {
            return true;
        }
    }

    componentWillReceiveProps(nextProps: UserDefineProps) {
        this.setState({
            code: nextProps.moduleData.data.code,
        })
    }

    /**
     * 执行用户代码片段
     */
    excuteCode() {
        const { code } = this.state;
        const el = this.refs.module;
        let renderCode = code;
        !code && (renderCode = `请在右边配置数据`);
        $(el).html(renderCode);
    }

    componentDidMount() {
        this.excuteCode();
    }

    componentDidUpdate() {
        this.excuteCode();
    }


    /**
     * 
     */

    render() {
        const { code } = this.state;
        return (
            <Module moduleData={this.props.moduleData}>
                <div ref="module">

                </div>
            </Module>
        )
    }


}