import React from 'react';
import { render } from 'react-dom';

import ModuleWrap from '@component/ModuleWrap';

export default class CanvasWrap extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }


    render() {



        return (
            <ModuleWrap>
                {this.props.children}
            </ModuleWrap>
        )
    }
}