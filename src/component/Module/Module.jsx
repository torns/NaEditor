import React from 'react';
import { render } from 'react-dom';

import ModuleWrap from '@component/ModuleWrap';

export default class Moudle extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isFocus: false,
        }

    }

    focusHandle() {
        this.setState({
            isFocus: true
        })
    }


    render() {

        const { isFocus } = this.state;

        return (
            <ModuleWrap
                isFocus={isFocus}
                onFocus={() => { this.focusHandle() }}
            >
                {this.props.children}
            </ModuleWrap>
        )
    }
}