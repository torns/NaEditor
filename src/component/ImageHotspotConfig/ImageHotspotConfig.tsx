import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import PicLib from '../PicLib';
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
        let imgs: ImageInfo[];
        if (props.moduleData.configData === undefined || props.moduleData.configData.imgs === undefined) {
            imgs = [];
        } else {
            imgs = props.moduleData.configData.imgs;
        }
        this.state = {
            imgs,
        };
    }

    componentWillReceiveProps(nextProps: ImageHotspotConfigProps) {
        let imgs: ImageInfo[];
        if (nextProps.moduleData.configData === undefined || nextProps.moduleData.configData.imgs === undefined) {
            imgs = [];
        } else {
            imgs = nextProps.moduleData.configData.imgs;
        }
        this.setState({
            imgs,
        });
    }

    getConfigData() {
        return {
            imgs: this.state.imgs,
        };
    }

    toModuleData(configData: any) {
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

    render() {
        let { imgs } = this.state;
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
                    onChange={(hotspots: HotspotInfo[]) => { console.log(hotspots); }}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(ImageHotspotConfig);
