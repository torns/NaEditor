import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { IState, ImageInfo, IModuleData, IModuleConfig, HotspotInfo } from '../interface';
import PicLib from '../PicLib';
import Hotspot from '../Hotspot';

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

interface LayerConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

interface LayerConfigState {
    imgUrl: string;
    hotspots: HotspotInfo[];
}

class LayerConfig extends Component<LayerConfigProps, LayerConfigState> {

    constructor(props: LayerConfigProps) {
        super(props);
        const {
            moduleData: {
                data: {
                    imgUrl,
                    hotspots,
                },
            },
        } = props;
        this.state = {
            imgUrl,
            hotspots,
        };
    }

    // TODO props:LayerConfigProps
    componentWillReceiveProps(props: any) {
        const {
            moduleData: {
                configData: {
                    imgUrl,
                },
            },
        } = props;
        this.setState({
            imgUrl,
        });
    }

    getConfigData = () => ({
        imgUrl: this.state.imgUrl,
        hotspots: this.state.hotspots,
    })

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
        let { imgUrl, hotspots } = this.state;

        return (
            <div>
                <p className="d-title">浮层图片选择</p>
                <PicLib
                    defaultValue={imgUrl}
                    value={imgUrl}
                    onChange={(imgUrl) => { this.imgChange(imgUrl); }}
                />
                <p className="d-title">热区设置</p>
                <Hotspot
                    imgs={[{ url: imgUrl }]}
                    hotspots={hotspots}
                    onChange={this.hotspotsChange}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(LayerConfig);
