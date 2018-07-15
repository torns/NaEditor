import React from 'react';
import $ from 'jquery';
import Module from '@component/Module';


export default class UserDefine extends React.Component {
    constructor(props) {
        super();
        this.state = {
            code: props.moduleData.data.code,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.code === nextProps.moduleData.data.code) {
            return false;
        } else {
            return true;
        }
    }

    componentWillReceiveProps(nextProps) {
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