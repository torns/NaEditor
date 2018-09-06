import React from 'react';
import $ from 'jquery';
import Module from '../Module';
import PropTypes from 'prop-types';
import { escape, unescape } from 'html-escaper';

import { IModuleData } from '../interface';

interface UserDefineProps {
    moduleData: IModuleData;
}

interface UserDefineState {
    code: string;
    isActive: boolean;
}


export default class UserDefine extends React.Component<UserDefineProps, UserDefineState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object
    }

    constructor(props: UserDefineProps) {
        super(props);
        this.state = {
            code: props.moduleData.data.code,
            isActive: props.moduleData.tempData && props.moduleData.tempData.isActive,
        }
    }

    shouldComponentUpdate(nextProps: UserDefineProps, nextState: UserDefineState) {
        if (this.context.BASE_DATA.pageType === 0) {
            const isActive = nextProps.moduleData.tempData && nextProps.moduleData.tempData.isActive;
            if (this.state.code === nextProps.moduleData.data.code &&
                isActive === this.state.isActive
            ) {
                return false;
            } else {
                return true;
            }
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
        if (code === undefined) {
            return;
        }
        let renderCode = unescape(code);
        !code && (renderCode = ``);
        (el as HTMLDivElement).innerHTML = renderCode;
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
        return (
            <Module moduleData={this.props.moduleData}>
                <div ref="module">

                </div>
            </Module>
        )
    }


}