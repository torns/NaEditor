import React, { MouseEventHandler } from 'react';
import { Modal, Row, Col } from 'antd';

import { ImageInfo, HotspotInfo, AreaInfo } from '../interface';
import HotspotLink from './HotspotLink';
import Area from './Area';

interface HotspotModalProps {
    imgs: ImageInfo[];
    hotspots?: HotspotInfo[];
    isModalVisible: boolean;
    onCancel: () => void;
    onOk: (hotspots: HotspotInfo[]) => void;
}

interface HotspotModalState {
    hotspots: HotspotInfo[];
    areas: AreaInfo[];
}

class HotspotModal extends React.Component<HotspotModalProps, HotspotModalState> {

    imgContainer: any;

    constructor(props: HotspotModalProps) {
        super(props);
        let { hotspots } = this.props;
        if (!hotspots) {
            hotspots = [];
        }
        this.state = {
            hotspots,
            areas: this.hotspotsToAreas(hotspots),
        };
    }

    handleStartDraw = (e: React.MouseEvent) => {
        const { areas: currentAreas } = this.state;
        let areas = currentAreas.slice(0);
        const {
            nativeEvent: {
                offsetX: x,
                offsetY: y,
            },
        } = e;
        areas.push({
            x,
            y,
            w: 0,
            h: 0,
        });
        this.setState({
            areas,
        });
    }

    hotspotsToAreas = (hotspots: HotspotInfo[]): AreaInfo[] => {
        return hotspots.map(v => v.area || {});
    }

    renderImgs = (imgs: ImageInfo[]) => {

        const renderImg = (v: ImageInfo, i: number) => {
            return (
                <img
                    onMouseDown={this.handleStartDraw}
                    key={i}
                    src={v.url}
                    draggable={false}
                />
            );
        };
        return (
            <React.Fragment>
                {imgs.map(renderImg)}
            </React.Fragment>
        );
    }

    linkChange = (index: number, url: string) => {
        const { hotspots: currentHotspots } = this.state;
        let hotspots;
        if (currentHotspots !== undefined && index < currentHotspots.length) {
            hotspots = currentHotspots.map((v, i) => {
                if (index === i) {
                    v.url = url;
                }
                return v;
            }).filter(v => v.url !== '');
        } else {// 新增项
            hotspots = (currentHotspots || []).concat([{ url }]);
        }
        this.setState({
            hotspots,
        });
    }

    linkRemove = (index: number) => {
        const { hotspots: currentHotspots } = this.state;
        const hotspots = currentHotspots.filter((v, i) => i !== index);
        this.setState({
            hotspots,
        });
    }

    linkUp = (index: number) => {
        this.moveLink(index - 1, index);
    }

    linkDown = (index: number) => {
        this.moveLink(index + 1, index);
    }

    moveLink = (preIndex: number, curIndex: number) => {
        let hotspots: HotspotInfo[];
        let temp: HotspotInfo[] = this.props.imgs.slice(0);    // 深拷贝
        let target: HotspotInfo[] = temp.splice(curIndex, 1);
        // 移到最前面
        if (preIndex < 0) {
            hotspots = target.concat(temp);
        } else {
            temp.splice(preIndex, 0, target[0]);
            hotspots = temp;
        }
        this.setState({
            hotspots,
        });
    }

    renderHotspots = (hotspots: HotspotInfo[]) => {

        const renderItem = (v: HotspotInfo, i: number) => {
            return (
                <HotspotLink
                    key={i}
                    value={v.url}
                    onChange={(value) => { this.linkChange(i, value); }}
                    onRemove={() => { this.linkRemove(i); }}
                />
            );
        };

        return (
            <React.Fragment>
                {hotspots.map(renderItem)}
            </React.Fragment>
        );
    }

    renderAreas = (areas: AreaInfo[]) => {

        const renderArea = (v: AreaInfo, i: number) => {
            const {
                x, y, w, h,
            } = v;
            return (
                <Area
                    key={i}
                    index={i}
                    x={x}
                    y={y}
                    w={w}
                    h={h}
                />
            );
        };

        return (
            <React.Fragment>
                {areas.map(renderArea)}
            </React.Fragment>
        );
    }

    handleOk = () => {
        this.props.onOk(this.state.hotspots);
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        let {
            isModalVisible: visible,
            imgs,
            hotspots,
        } = this.props;
        hotspots = hotspots || [];
        const { areas } = this.state;
        return (
            <Modal
                className="d-hotspot-modal"
                visible={visible}
                title="图片热区"
                width="70%"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div className="d-content">
                    <div className="d-imgs-container">
                        {this.renderImgs(imgs)}
                        <ul className="d-areas">
                            {this.renderAreas(areas)}
                        </ul>
                    </div>
                    <div className="d-hotspots-container">
                        {this.renderHotspots(hotspots)}
                    </div>
                </div>
            </Modal>
        );
    }
}

export default HotspotModal;