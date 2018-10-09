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
        if (skuids) {
            this.requestGoodsInfo(skuids);
        }
    }

    async requestGoodsInfo(skuids: string) {
        const result = (await Axios(INTERFACE.getGoodsInfo, {
            params: {
                skuids,
            },
        })).data;

        if (result.success === true) {
            this.setState({
                goodsList: result.data,
            });
        }
    }

    componentWillReceiveProps(nextProps: GoodsProps) {
        const { skuids } = nextProps.moduleData.data;
        if (skuids !== this.state.skuids) {
            this.setState({
                skuids,
            }, () => {
                this.requestGoodsInfo(skuids);
            });
        }
    }

    renderGoodsList(goodsList: IGoodsInfo[]) {
        return goodsList.map((v, i) => {
            return (
                <div key={v.id}>
                    <img src={v.img} />
                    <p key={v.id}>{v.name}</p>
                    <p>{v.price}</p>
                </div>
            );
        });
    }

    render() {
        const { moduleData } = this.props;
        const { goodsList } = this.state;
        return (
            <Module moduleData={moduleData}>
                {this.renderGoodsList(goodsList)}
            </Module>
        );
    }
}
