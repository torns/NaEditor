import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { ImageHotspotConfData, ImageInfo, ImageHotspotConfigProps, ImageHotspotConfigState } from './interface';
import { IState, HotspotInfo } from '../interface';
import ImageGroup from '../ImageGroup';
import Hotspot from '../Hotspot';

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

class ImageHotspotConfig extends Component<ImageHotspotConfigProps, ImageHotspotConfigState> {

    constructor(props: ImageHotspotConfigProps) {
        super(props);
        const { imgs, hotspots } = this.getDataFromProps(props);
        this.state = {
            imgs,
            hotspots,
        };
    }

    getDataFromProps(props: ImageHotspotConfigProps) {
        let imgs: ImageInfo[];
        let hotspots: HotspotInfo[];
        if (props.moduleData.configData === undefined) {
            hotspots = [];
            imgs = [];
        } else {
            const configData: ImageHotspotConfData = props.moduleData.configData;
            imgs = configData ? configData.imgs || [] : [];
            hotspots = configData ? configData.hotspots || [] : [];
        }
        return {
            imgs,
            hotspots,
        };
    }

    componentWillReceiveProps(nextProps: ImageHotspotConfigProps) {
        const { imgs, hotspots } = this.getDataFromProps(nextProps);
        this.setState({
            imgs,
            hotspots,
        });
    }

    getConfigData() {
        return {
            imgs: this.state.imgs,
            hotspots: this.state.hotspots,
        };
    }

    toModuleData(configData: ImageHotspotConfData) {
        const { moduleConfig } = this.props;
        const result = Object.assign({}, moduleConfig.moduleData, {
            data: configData,
        });
        return result;
    }

    imageChange = (imgs: ImageInfo[]) => {
        this.setState({
            imgs,
        });
    }

    hotspotsChange = (hotspots: HotspotInfo[]) => {
        this.setState({
            hotspots,
        });
    }

    render() {
        let { imgs, hotspots } = this.state;
        if (imgs === undefined) {
            imgs = [];
        }
        return (
            <div>
                <p>图片选择</p>
                <ImageGroup
                    imgs={imgs}
                    onChange={(imgs: ImageInfo[]) => { this.imageChange(imgs); }}
                />
                <Hotspot
                    imgs={imgs}
                    hotspots={hotspots}
                    onChange={this.hotspotsChange}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(ImageHotspotConfig);
