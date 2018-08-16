import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { IState, ImageInfo, IModuleData, IModuleConfig, HotspotInfo } from '../interface';
import PicLib from '../PicLib';
import Hotspot from '../Hotspot';
import { Input, Select } from 'antd';
const Option = Select.Option;

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

interface FixedConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

interface FixedConfigState {
    imgUrl: string;
    hotspots: HotspotInfo[];
    horizontal: number;
    vertical: number;
    width: number;
}

class FixedConfig extends Component<FixedConfigProps, FixedConfigState> {

    constructor(props: FixedConfigProps) {
        super(props);
        const {
            moduleData: {
                data: {
                    imgUrl,
                    hotspots,
                    horizontal,
                    width,
                    vertical,
                }
            }
        } = props;
        this.state = {
            imgUrl,
            hotspots,
            horizontal,
            width,
            vertical,
        }
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


    imgChange = (imgUrl: string) => {
        this.setState({
            imgUrl,
        });
    }

    hotspotsChange = (hotspots: HotspotInfo[]) => {
        this.setState({
            hotspots,
        });
    }

    render() {
        let { imgUrl, hotspots, horizontal, vertical, width } = this.state;

        const horizontalBefore = (
            <Select defaultValue="left" style={{ width: 90 }}>
                <Option value="left">距左边</Option>
                <Option value="right">距右边</Option>
            </Select>
        );

        const verticalBefore = (
            <Select defaultValue="bottom" style={{ width: 90 }}>
                <Option value="top">距顶部</Option>
                <Option value="bottom">距底部</Option>
            </Select>
        );

        const After = (
            <Select defaultValue="percent" style={{ width: 50 }}>
                <Option value="percent">%</Option>
                <Option value="px">px</Option>
            </Select>
        );

        return (
            <div>
                <p className="d-title">定位图片选择</p>
                <PicLib
                    defaultValue={imgUrl}
                    value={imgUrl}
                    onChange={(imgUrl) => { this.imgChange(imgUrl) }}
                />
                <p className="d-title">热区配置</p>
                <Hotspot
                    imgs={[{ url: imgUrl }]}
                    hotspots={hotspots}
                    onChange={this.hotspotsChange}
                />
                <p className="d-title">定位位置</p>
                <div>
                    <Input
                        value={horizontal}
                        onChange={(e) => { this.setState({ horizontal: Number.parseInt(e.target.value, 10) }); }}
                        addonBefore={horizontalBefore}
                        placeholder="请输入数字"
                        addonAfter={After}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Input
                        value={vertical}
                        onChange={(e) => { this.setState({ vertical: Number.parseInt(e.target.value, 10) }); }}
                        addonBefore={verticalBefore}
                        placeholder="请输入数字"
                        addonAfter={After}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Input
                        value={width}
                        onChange={(e) => { this.setState({ width: Number.parseInt(e.target.value, 10) }); }}
                        addonBefore="宽度"
                        placeholder="请输入数字"
                        addonAfter={After}
                    />
                </div>
            </div >
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(FixedConfig);
