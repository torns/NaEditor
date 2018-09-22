import React, { Component } from 'react';
import { Input } from 'antd';

import { IModuleData, IModuleConfig } from '../interface';
import Module from '../Module';

interface GoodsConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

interface GoodsConfigState {
    moduleData: IModuleData;
}

export default class GoodsConfig extends Component<GoodsConfigProps, GoodsConfigState> {
    constructor(props: GoodsConfigProps) {
        super(props);
        const { moduleData } = props;
        this.state = {
            moduleData,
        };
    }

    goodsChange = (e: change) => {

        this.setState({
            moduleData,
        });
    }

    render() {
        const {
            moduleData,
            moduleData: {
                data: {
                    goodsList,
                },
            },
        } = this.state;
        return <Module moduleData={moduleData}>
            <Input
                value={goodsList}
                onChange={(e) => { this.goodsChange(e.target.value.split(',')); }}
            />
        </Module>;
    }
}
