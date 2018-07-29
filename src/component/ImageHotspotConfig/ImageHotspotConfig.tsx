import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import PicLib from '../PicLib';
import { ImageHotspotConfData, ImgaeInfo, ImageHotspotConfigProps, ImageHotspotConfigState } from './interface';
import { IState } from '../interface';

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

class ImageHotspotConfig extends Component<ImageHotspotConfigProps, ImageHotspotConfigState> {

    constructor(props: ImageHotspotConfigProps) {
        super(props);
        const imgs = props.moduleData.configData.imgs;

        this.state = {
            imgs,
        };
    }

    componentWillReceiveProps(nextProps: ImageHotspotConfigProps) {
        this.setState({
            imgs: nextProps.moduleConfig.moduleData.configData.imgs,
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

    imageChange = (index: number, url: string) => {
        let imgs = [];
        if (this.state.imgs !== undefined) {
            imgs = this.state.imgs.map((v, i) => {
                if (index === i) {
                    v.url = url;
                }
                return v;
            });
        } else {
            imgs = [{
                url,
            }];
        }
        this.setState({
            imgs,
        });
    }

    renderImgs = (imgs: ImgaeInfo[]): JSX.Element => {

        const imgItem = (index: number, imgInfo: ImgaeInfo) => (
            <React.Fragment key={index}>
                <span>图片地址</span>
                <PicLib
                    // defaultValue={defaultValue}
                    value={imgInfo.url}
                    onChange={(url) => { this.imageChange(index, url); }}
                />
            </React.Fragment>
        );

        return (
            <div>
                {imgs.map((v, i) => imgItem(i, v))}
                {imgItem(imgs.length, { url: '' })}
            </div>
        );
    }

    renderPlaceholderImg = (imgs: ImgaeInfo[] | undefined) => {
        let index = 0;
        if (imgs !== undefined) {
            index = imgs.length;
        }
        return (
            <React.Fragment>
                <span>图片地址</span>
                <PicLib
                    // defaultValue={defaultValue}
                    value={''}
                    onChange={(url) => { this.imageChange(index, url); }}
                />
            </React.Fragment>
        );
    }

    render() {
        let { imgs } = this.state;
        if (imgs === undefined) {
            imgs = [];
        }
        return (
            <div>
                {this.renderImgs(imgs)}
            </div>
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(ImageHotspotConfig);
