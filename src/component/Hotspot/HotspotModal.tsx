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
    currentAreaIndex: number;
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
            currentAreaIndex: -1,    // -1表示当前没有被拖动的热区
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
            currentAreaIndex: areas.length - 1,
        });
    }

    handleEndDraw = () => {
        const {
            hotspots: currentHotspots,
            areas,
        } = this.state;
        const hotspots = areas.map((v, i) => {
            let result: HotspotInfo;
            if (currentHotspots[i]) {
                result = currentHotspots[i];
                result.area = v;
            } else {  // 新热区
                result = {
                    area: v,
                    url: '',
                };
            }
            return result;
        });
        this.setState({
            currentAreaIndex: -1,
            hotspots,
        });
    }

    handleDrag = (e: React.MouseEvent) => {
        const {
            currentAreaIndex,
            areas: currentAreas,
        } = this.state;

        if (currentAreaIndex === -1) { return; }    // 鼠标没有按下
        const {
            nativeEvent: {
                offsetX,
                offsetY,
            },
        } = e;
        const areas = currentAreas.slice(0);
        let area = areas[currentAreaIndex];
        let {
            x: originX,
            y: originY,
        } = area;
        originX = originX || 0;
        originY = originY || 0;
        area = Object.assign({}, area, {
            w: offsetX - originX,
            h: offsetY - originY,
        });
        areas[currentAreaIndex] = area;
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
        } = this.props;
        const { areas, hotspots } = this.state;
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
                    <div className="d-imgs-container" >
                        <div
                            className="d-imgs-wrap"
                            onMouseMove={this.handleDrag}
                            onMouseDown={this.handleStartDraw}
                            onMouseUp={this.handleEndDraw}
                        >
                            {this.renderImgs(imgs)}
                            {this.renderAreas(areas)}
                        </div>
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