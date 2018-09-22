import React, { Component } from 'react';

import { IModuleData } from '../interface';
import Module from '../Module';

interface GoodsProps {
    moduleData: IModuleData;
}

export default class Goods extends Component<GoodsProps, any> {
    constructor(props: GoodsProps) {
        super(props);
        const { moduleData } = this.props;
        this.state = {
            moduleData,
        };
    }

    render() {
        const { moduleData } = this.state;
        return <Module moduleData={moduleData}>
            <div>das</div>
        </Module>;
    }
}
