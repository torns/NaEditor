import React, { Component } from 'react';
import Module from '../Module';

import { IModuleData } from '../interface';

interface TextProps {
    moduleData: IModuleData;
}

class Text extends Component<TextProps, {}> {
    constructor(props: TextProps) {
        super(props);
    }

    render() {

        const { moduleData } = this.props;
        const { text, fontWeight, fontSize } = moduleData.data;
        return (
            <Module moduleData={moduleData}>
                <p style={{ fontWeight, fontSize }}>{text}</p>
            </ Module>
        );
    }
}

export default Text;