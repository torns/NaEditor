import React from 'react';
import { render } from 'react-dom';


export default class Moudle extends React.Component {
    constructor(props) {
        super();

    }



    render() {

        return (
            <div className="J_module">
                {this.props.children}
            </div>
        )
    }
}