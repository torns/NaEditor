import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Module from '../Module';
import { IModuleData, HotspotInfo } from '../interface';
import { ImageInfo } from '../ImageHotspotConfig/interface';
import Hotspot from '../Hotspot';
import LazyImage from '../LazyImage';

interface ImageHotspotProps {
    moduleData: IModuleData;
}

interface ImageHotspotState {
    imgs: ImageInfo[];
}

export default class ImageHotspot extends PureComponent<ImageHotspotProps, ImageHotspotState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    constructor(props: ImageHotspotProps) {
        super(props);
        const { imgs } = props.moduleData.data;
        this.state = {
            imgs,
        };
    }

    renderImgs = (imgs: ImageInfo[]) => {
        return (
            <div className="d-img-wrap">
                {imgs.map((v, i) => (
                    <LazyImage key={i} src={v.url} />
                ))}
            </div>
        );
    }

    renderHotspots = (Hotspot: HotspotInfo[]) => {
        const Rate = 1;
        const isDecorate = this.context.BASE_DATA.pageType === 0;
        return (
            <div className="d-hotspot-wrap">
                {Hotspot && Hotspot.map((v, i) => {
                    const { area } = v;
                    if (area === undefined) {
                        return null;
                    }
                    const { x, y, w, h } = area;
                    const top = `${(y || 0) * Rate}px`;
                    const left = `${(x || 0) * Rate}px`;
                    const width = `${(w || 0) * Rate}px`;
                    const height = `${(h || 0) * Rate}px`;
                    return (
                        <a style={{ top, left, width, height }} key={i} href={v.url} >
                            {isDecorate && <span>热区{i + 1}</span>}
                        </a>
                    );
                })
                }
            </div>
        );
    }

    render() {
        let {
            moduleData,
            moduleData: {
                data: {
                    imgs,
                    hotspots,
                },
            },
        } = this.props;

        if (imgs === undefined) {
            imgs = [];
        }
        return (
            <Module moduleData={moduleData}>
                {this.renderImgs(imgs)}
                {this.renderHotspots(hotspots)}
            </ Module>
        );
    }
}