import React from 'react';
import $ from 'jquery';
import Module from '@component/Module';


export default class extends Module {
    constructor() {
        super();
    }

    /**
     * 执行用户代码片段
     */
    excuteCode() {
        const { code } = this.props.moduleData.data;
        const el = this.refs.module;
        $(el).append(code);

        // console.log(code);
        // const { code } = this.props;
        // eval(code);
    }

    componentDidMount() {
        this.excuteCode();
    }

    /**
     * 
     */

    render() {
        return (
            <div className="J_module" ref="module">
            </div>

        )
    }


}