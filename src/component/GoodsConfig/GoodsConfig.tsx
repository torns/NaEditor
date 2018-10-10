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
    templateId: string;
}

class GoodsConfig extends Component<GoodsConfigProps, GoodsConfigState> {
    constructor(props: GoodsConfigProps) {
        super(props);
        const { skuids, templateId } = props.moduleData.configData;
        this.state = {
            skuids,
            templateId,
        };
    }

    skuChange = (skuids: string) => {
        this.setState({
            skuids,
        });
    }

    templateChange = (templateId: string) => {
        this.setState({
            templateId,
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
            skuids, templateId,
        } = this.state;
        return (
            <div>
                <p className="d-title">输入商品</p>
                <Input
                    placeholder="请输入商品id，多个id以英文逗号隔开"
                    value={skuids}
                    onChange={(e) => { this.skuChange(e.target.value); }}
                />
                <p className="d-title">模板选择</p>
                <Input
                    placeholder="请输入模板id，多个id以英文逗号隔开"
                    value={templateId}
                    onChange={(e) => { this.templateChange(e.target.value); }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

export default connect(mapStateToProps, {}, undefined, { withRef: true })(GoodsConfig);