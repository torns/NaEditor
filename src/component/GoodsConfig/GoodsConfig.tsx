import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';

import { IState } from '../interface';
import { GoodsConfigProps, GoodsConfigState } from './interface';
import TemplateLib from '../TemplateLib';

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

    templateChange = (templateId: number) => {
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
        const { moduleTypeId: moduleType } = this.props.moduleData;
        const {
            skuids, templateId,
        } = this.state;
        return (
            <div>
                <p className="d-title">输入商品（暂时只有10个商品，1~10）</p>
                <Input
                    placeholder="请输入商品id，多个id以英文逗号隔开"
                    value={skuids}
                    onChange={(e) => { this.skuChange(e.target.value); }}
                />
                <p className="d-title">模板选择</p>
                <TemplateLib
                    moduleType={moduleType}
                    value={templateId}
                    onChange={(templateId: number) => { this.templateChange(templateId); }}
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