import React, { Component } from 'react';

import { IModuleData, IGoodsInfo } from '../interface';
import Module from '../Module';
import Axios from '../../../node_modules/axios';
import INTERFACE from '../../common/script/INTERFACE';

interface GoodsProps {
    moduleData: IModuleData;
}

interface GoodsState {
    skuids: string;
    goodsList: IGoodsInfo[];
}

export default class Goods extends Component<GoodsProps, GoodsState> {
    constructor(props: GoodsProps) {
        super(props);
        const { moduleData } = this.props;
        let { data: { skuids, goodsList } } = moduleData;
        goodsList = goodsList || [];
        this.state = {
            skuids,
            goodsList,
        };
    }

    async requestGoodsInfo(skuids: string) {
        let result = await Axios.get(INTERFACE.getGoodsInfo, {
            params: {
                skuids,
            },
        });
        result = await result.data();
        console.log(result);
    }

    componentWillReceiveProps(nextProps: GoodsProps) {
        const { skuids } = nextProps.moduleData.data;
        this.setState({
            skuids,
        }, () => {
            this.requestGoodsInfo(skuids);
        });
    }

    render() {
        const { moduleData } = this.props;
        return (
            <Module moduleData={moduleData}>
                <div>d3213as</div>
            </Module>
        );
    }
}
