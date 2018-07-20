import React, { Component } from 'react';
import Module from '@component/Module';


class Text extends Component {
    constructor(props) {
        super();
    }


    render() {

        const { moduleData } = this.props;
        const { text } = moduleData.data;
        return (
            <Module moduleData={moduleData}>
                <p>{text}</p>
            </ Module>

        )
    }
}

export default Text;