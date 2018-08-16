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

enum EHorizontalDir {
    Left = "left",
    Right = "right",
}

enum EVerticalDir {
    Top = "top",
    Bottom = "bottom",
}

enum Unit {
    percent = "%",
    px = "px",
}

interface FixedConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

interface FixedConfigState {
    imgUrl: string;
    hotspots: HotspotInfo[];
    horizontal: string;
    vertical: string;
    width: string;
    horizontalDir: EHorizontalDir.Left | EHorizontalDir.Right;
    verticalDir: EVerticalDir.Top | EVerticalDir.Bottom;
    horizontalUnit: Unit,
    verticalUnit: Unit,
    widthUnit: Unit,
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
                    horizontalDir,
                    verticalDir,
                    horizontalUnit,
                    verticalUnit,
                    widthUnit,
                }
            }
        } = props;
        this.state = {
            imgUrl,
            hotspots,
            horizontal,
            width,
            vertical,
            horizontalDir,
            verticalDir,
            horizontalUnit,
            verticalUnit,
            widthUnit,
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
        let { imgUrl,
            hotspots,
            horizontal,
            vertical,
            width,
            horizontalDir,
            verticalDir,
            horizontalUnit,
            verticalUnit,
            widthUnit,
        } = this.state;

        const horizontalBefore = (
            <Select
                defaultValue={horizontalDir || EHorizontalDir.Left}
                onChange={(horizontalDir: any) => { this.setState({ horizontalDir }); }}
                style={{ width: 90 }}>
                <Option value={EHorizontalDir.Left}>距左边</Option>
                <Option value={EHorizontalDir.Right}>距右边</Option>
            </Select>
        );

        const verticalBefore = (
            <Select
                defaultValue={verticalDir || EVerticalDir.Bottom}
                onChange={(verticalDir: any) => { this.setState({ verticalDir }); }}
                style={{ width: 90 }}>
                <Option value={EVerticalDir.Top}>距顶部</Option>
                <Option value={EVerticalDir.Bottom}>距底部</Option>
            </Select>
        );

        const horizontalAfter = (
            <Select
                defaultValue={horizontalUnit || Unit.percent}
                onChange={(horizontalUnit: any) => { this.setState({ horizontalUnit }); }}
                style={{ width: 50 }}>
                <Option value={Unit.percent}>%</Option>
                <Option value={Unit.px}>px</Option>
            </Select>
        );

        const verticalAfter = (
            <Select
                defaultValue={verticalUnit || Unit.percent}
                onChange={(verticalUnit: any) => { this.setState({ verticalUnit }); }}
                style={{ width: 50 }}>
                <Option value={Unit.percent}>%</Option>
                <Option value={Unit.px}>px</Option>
            </Select>
        );

        const widthAfter = (
            <Select
                defaultValue={widthUnit || Unit.percent}
                onChange={(widthUnit: any) => { this.setState({ widthUnit }); }}
                style={{ width: 50 }}>
                <Option value={Unit.percent}>%</Option>
                <Option value={Unit.px}>px</Option>
            </Select>
        );


        return (
            <div>
                <p className="d-title">图片选择</p>
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
                        onChange={(e) => { this.setState({ horizontal: e.target.value }); }}
                        addonBefore={horizontalBefore}
                        placeholder="请输入数字"
                        addonAfter={horizontalAfter}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Input
                        value={vertical}
                        onChange={(e) => { this.setState({ vertical: e.target.value }); }}
                        addonBefore={verticalBefore}
                        placeholder="请输入数字"
                        addonAfter={verticalAfter}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Input
                        value={width}
                        onChange={(e) => { this.setState({ width: e.target.value }); }}
                        addonBefore="宽度"
                        placeholder="请输入数字"
                        addonAfter={widthAfter}
                    />
                </div>
            </div >
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(FixedConfig);
