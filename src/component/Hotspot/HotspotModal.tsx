import React, { MouseEventHandler, RefObject } from 'react';
import { Modal, message } from 'antd';
/// <reference path="../OuterComponent.d.ts" />
import addEventListener from 'rc-util/lib/Dom/addEventListener';

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
    // containerOffsetX: number;
    // containerOffsetY: number;
}

class HotspotModal extends React.Component<HotspotModalProps, HotspotModalState> {

    dragEvent: any;
    dropEvent: any;
    private imgContainer: RefObject<HTMLDivElement> = React.createRef();

    constructor(props: HotspotModalProps) {
        super(props);
        let { hotspots } = this.props;
        if (!hotspots) {
            hotspots = [];
        }
        // const {
        //     offsetLeft: offsetX,
        //     offsetTop: offsetY,
        // } = this.imgContainer;
        this.state = {
            hotspots,
            areas: this.hotspotsToAreas(hotspots),
            currentAreaIndex: -1,    // -1表示当前没有被拖动的热区

        };
        this.dragEvent = addEventListener(document, 'mousemove', this.handleDrag);
        this.dropEvent = addEventListener(document, 'mouseup', this.handleEndDraw);
    }

    componentWillUnmount() {
        this.dragEvent.remove();
        this.dropEvent.remove();
    }

    handleStartDraw = (e: React.MouseEvent) => {
        const { areas: currentAreas } = this.state;
        let areas = currentAreas.slice(0);
        const target: HTMLElement = e.target as HTMLElement;
        const { offsetTop, offsetLeft } = target;
        let {
            nativeEvent: {
                offsetX,
                offsetY,
            },
        } = e;
        offsetX += offsetLeft;
        offsetY += offsetTop;
        areas.push({
            x: offsetX,
            y: offsetY,
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
        const hotspots: HotspotInfo[] = areas.map((v, i) => {
            let result: any;
            if (currentHotspots[i]) {
                result = currentHotspots[i];
                result.area = v;
            } else {  // 新热区
                if (this.isAreaLegal(v)) {
                    result = {
                        area: v,
                        url: '',
                    };
                } else {
                    result = null;
                }
            }
            return result;
        }).filter(v => v);
        this.setState({
            currentAreaIndex: -1,
            hotspots,
            areas: this.hotspotsToAreas(hotspots),
        });
    }

    handleDrag = (e: React.MouseEvent) => {
        const {
            currentAreaIndex,
            areas: currentAreas,
        } = this.state;

        if (currentAreaIndex === -1) { return; }    // 鼠标没有按下
        const target: HTMLElement = e.target as HTMLElement;
        // if (target.tagName.toLocaleLowerCase() !== 'img' && !target.className.includes('d-area')) { return; }
        const { offsetTop, offsetLeft } = target;
        let {
            nativeEvent: {
                offsetX,
                offsetY,
            },
        } = e;
        offsetX += offsetLeft;
        offsetY += offsetTop;
        let area = currentAreas[currentAreaIndex];
        let {
            x: originX,
            y: originY,
        } = area;
        originX = originX || 0;
        originY = originY || 0;
        this.hotSpotChange(currentAreaIndex, Object.assign({}, area, {
            w: offsetX - originX,
            h: offsetY - originY,
        }));
    }

    /**
     * 热区变更处理
     * @param index 热区序号
     * @param area 热区参数变更信息
     */
    hotSpotChange = (index: number, area: AreaInfo) => {
        const {
            areas: currentAreas,
        } = this.state;
        const areas = currentAreas.slice(0);
        areas[index] = area;
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
                    onMouseDown={this.handleStartDraw}
                    onDragStart={(e) => { e.stopPropagation(); }}
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
            });
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
            areas: this.hotspotsToAreas(hotspots),
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

    isAreaLegal(area: AreaInfo) {
        const { x, y, w, h } = area;
        if (w === undefined || w < 50 || h === undefined || h < 50) {
            message.error('热区大小必须大于50*50px');
            return false;
        }
        return true;
    }

    renderHotspots = (hotspots: HotspotInfo[]) => {

        const renderItem = (v: HotspotInfo, i: number) => {
            return (
                <HotspotLink
                    key={i}
                    index={i}
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
            let {
                x = 0, y = 0, w = 0, h = 0,
            } = v;
            return (
                <Area
                    key={i}
                    index={i}
                    onRemove={this.linkRemove}
                    onChange={this.hotSpotChange}
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

    isHotspotsLegal = (hotspots: HotspotInfo[]): boolean => {
        const result = hotspots.reduce((acc: any, v, i) => {
            if (acc !== undefined) {
                return acc;
            }
            if (v.url === '') {
                return i;
            }
        }, undefined);
        if (result === undefined) {
            return true;
        } else {
            message.error(`您还没有配置热区${result + 1}的链接`);
            return false;
        }
    }

    handleOk = () => {
        const { hotspots } = this.state;
        if (this.isHotspotsLegal(hotspots)) {
            this.props.onOk(hotspots);
        }
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
                    <div
                        className="d-imgs-container"
                        draggable={false}
                    >
                        <div
                            className="d-imgs-wrap"
                            draggable={false}
                            ref={this.imgContainer}
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