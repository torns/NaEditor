import React from 'react';

import PicLib from '../PicLib';
import { ImageInfo } from '../ImageHotspotConfig/interface';

interface ImageGroupProps {
    imgs: ImageInfo[];
    onChange: (imgs: ImageInfo[]) => void;
}

interface ImageGroupState { }

class ImageGroup extends React.Component<ImageGroupProps, ImageGroupState> {
    constructor(props: ImageGroupProps) {
        super(props);
    }

    imageChange = (index: number, url: string) => {
        let imgs: ImageInfo[] = [];
        const { imgs: currentImgs } = this.props;
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
        this.props.onChange(imgs);
    }

    moveItem = (preIndex: number, curIndex: number) => {
        let result: ImageInfo[];
        let tempImgs: ImageInfo[] = this.props.imgs.slice(0);    // 深拷贝
        let target: ImageInfo[] = tempImgs.splice(curIndex, 1);
        // 移到最前面
        if (preIndex < 0) {
            result = target.concat(tempImgs);
        } else {
            tempImgs.splice(preIndex, 0, target[0]);
            result = tempImgs;
        }
        this.props.onChange(result);
    }

    upItem = (index: number): void => {
        this.moveItem(index - 1, index);
    }

    downItem = (index: number): void => {
        this.moveItem(index + 1, index);
    }

    removeItem = (index: number): void => {
        const { imgs: currentImgs } = this.props;
        const imgs = currentImgs.filter((v, i) => i !== index);
        this.props.onChange(imgs);
    }

    renderImgs = (imgs: ImageInfo[]): JSX.Element => {

        const imgItem = (index: number, imgInfo: ImageInfo) => (
            <PicLib
                key={index}
                defaultValue={imgInfo.url}
                value={imgInfo.url}
                onChange={(url) => { this.imageChange(index, url); }}
                onUp={() => { this.upItem(index); }}
                onDown={() => { this.downItem(index); }}
                onRemove={() => { this.removeItem(index); }}
            />
        );

        return (
            <React.Fragment>
                {imgs.map((v, i) => imgItem(i, v))}
                {imgItem(imgs.length, { url: '' })}
            </React.Fragment>
        );
    }

    render() {
        const { imgs } = this.props;
        return (
            <div className="d-image-group">
                {this.renderImgs(imgs)}
            </div>
        );
    }
}

export default ImageGroup;