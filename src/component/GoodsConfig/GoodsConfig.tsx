import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';

import { IModuleData, IModuleConfig, IState } from '../interface';

interface GoodsConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

interface GoodsConfigState {
    skuids: string;
}

class GoodsConfig extends Component<GoodsConfigProps, GoodsConfigState> {
    constructor(props: GoodsConfigProps) {
        super(props);
        const { skuids } = props.moduleData.configData;
        this.state = {
            skuids,
        };
    }

    skuChange = (skuids: string) => {
        this.setState({
            skuids,
        });
    }

    getConfigData = () => {
        return this.state;
    }

    toModuleData(configData: any) {
        const { moduleConfig } = this.props;
        const result = Object.assign({}, moduleConfig.moduleData, {
            data: configData,
        });
        return result;
    }

    componentWillReceiveProps(nextProps: GoodsConfigProps) {
        let { skuids } = nextProps.moduleData.configData;
        this.setState({
            skuids,
        });
    }

    render() {
        const {
            skuids,
        } = this.state;
        return (
            <Input
                placeholder="请输入商品id，多个id以英文逗号隔开"
                value={skuids}
                onChange={(e) => { this.skuChange(e.target.value); }}
            />
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

export default connect(mapStateToProps, {}, undefined, { withRef: true })(GoodsConfig);