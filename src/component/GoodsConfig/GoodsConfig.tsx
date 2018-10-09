import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';

import { IModuleData, IModuleConfig, IState } from '../interface';
import Module from '../Module';

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

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
        const { moduleData } = props;
        const { data: { skuids } } = moduleData;
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

    render() {
        const {
            skuids,
        } = this.state;

        return (
            <Input
                value={skuids}
                onChange={(e) => { this.skuChange(e.target.value); }}
            />
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(GoodsConfig);