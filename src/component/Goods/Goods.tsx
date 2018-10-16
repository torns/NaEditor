import React, { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { IModuleData, IGoodsInfo, IContext } from '../interface';
import Module from '../Module';
import Axios from '../../../node_modules/axios';
import INTERFACE from '../../common/script/INTERFACE';
import addStyle from '../../common/script/addStyle';
import isServer from '../../common/script/isServer';

if (!isServer()) {
    (window as any).React = React;
    (window as any).template = {};
}

interface GoodsProps {
    moduleData: IModuleData;
}

interface GoodsState {
    skuids: string;
    goodsList: IGoodsInfo[];
    templateId?: number;
    style?: string;
    template?: any;
}

export default class Goods extends Component<GoodsProps, GoodsState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

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

    renderFunction = () => { return null; };

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

    async fetchTemplate(templateId: number) {
        const result = (await Axios(INTERFACE.getTemplateInfo, {
            params: {
                id: templateId,
            },
        })).data;
        if (result.success) {
            const { templateBabeled, style, id } = result.data;
            const { BASE_DATA: { pageType } } = this.context as IContext;
            new Function(templateBabeled)();
            const template = (window as any).template[id];
            this.setState({
                style,
                template,
            });
        }
    }

    componentWillReceiveProps(nextProps: GoodsProps) {
        const { skuids, templateId } = nextProps.moduleData.data;
        if (skuids !== this.state.skuids) {
            this.setState({
                skuids,
            }, () => {
                this.requestGoodsInfo(skuids);
            });
        }
        if (templateId !== this.state.templateId) {
            this.setState({
                templateId,
            }, () => {
                this.fetchTemplate(templateId);
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

    componentDidUpdate(prevProps: GoodsProps, prevState: GoodsState) {
        const { style, template, templateId } = this.state;
        if (style && style !== prevState.style) {
            addStyle(style, this.context.BASE_DATA.pageType, `${templateId}`);
        }
    }

    componentDidCatch(err: any) {
        console.log(err);
    }

    render() {
        const { moduleData } = this.props;
        const { template } = this.state;
        return (
            <Module moduleData={moduleData}>
                {typeof template === 'function' ? template.call(this) : null}
            </Module>
        );
    }
}
