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
        let imgs: ImgaeInfo[];
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
        let imgs: ImgaeInfo[];
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

    imageChange = (index: number, url: string) => {
        let imgs: ImgaeInfo[] = [];
        const { imgs: currentImgs } = this.state;
        if (currentImgs !== undefined && index < currentImgs.length) {
            imgs = currentImgs.map((v, i) => {
                if (index === i) {
                    v.url = url;
                }
                return v;
            }).filter(v => v.url !== '');
        } else {// 新增项
            imgs = (currentImgs || []).concat([{ url }]);
        }
        this.setState({
            imgs,
        });
    }

    renderImgs = (imgs: ImgaeInfo[]): JSX.Element => {

        const imgItem = (index: number, imgInfo: ImgaeInfo) => (
            <PicLib
                key={index}
                defaultValue={imgInfo.url}
                value={imgInfo.url}
                onChange={(url) => { this.imageChange(index, url); }}
            />
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
