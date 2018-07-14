import React from 'react';
import $ from 'jquery';
import Module from '@component/Module';


export default class UserDefine extends React.Component {
    constructor(props) {
        super();


    }

    /**
     * 执行用户代码片段
     */
    excuteCode() {
        const { code } = this.props.moduleData.data;
        const el = this.refs.module;
        $(el).append(code);
    }

    componentDidMount() {
        this.excuteCode();
    }

    /**
     * 
     */

    render() {
        return (
            <Module moduleData={this.props.moduleData}>
                <div ref="module"></div>
            </Module>
        )
    }


}