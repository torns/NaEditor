import React from 'react';
import { Modal, Row, Col } from 'antd';

import { ImageInfo, HotspotInfo } from '../interface';
import HotspotLink from './HotspotLink';

interface HotspotModalProps {
    imgs: ImageInfo[];
    hotspots?: HotspotInfo[];
    isModalVisible: boolean;
    onCancel: () => void;
    onOk: (hotspots: HotspotInfo[]) => void;
}

interface HotspotModalState {
    hotspots: HotspotInfo[];
}

class HotspotModal extends React.Component<HotspotModalProps, HotspotModalState> {
    constructor(props: HotspotModalProps) {
        super(props);
        let { hotspots } = this.props;
        if (!hotspots) {
            hotspots = [];
        }
        this.setState({
            hotspots,
        });
    }

    renderImgs = (imgs: ImageInfo[]) => {
        return (
            <React.Fragment>
                {imgs.map((v) => (<img src={v.url} />))}
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
                    value={v.url}
                    onChange={(value) => { this.linkChange(i, value); }}
                    onRemove={() => { this.linkRemove(i); }}
                    onUp={() => { this.linkUp(i); }}
                    onDown={() => { this.linkDown(i); }}
                />
            );
        };

        return (
            <React.Fragment>
                {hotspots.map(renderItem)}
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
        return (
            <Modal
                className="d-hotspot-modal"
                visible={visible}
                title="图片热区"
                width={1100}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div className="d-content">
                    <div className="d-imgs-container">
                        {this.renderImgs(imgs)}
                    </div>
                    <div className="d-links-container">
                        {this.renderHotspots(hotspots)}
                    </div>
                </div>
            </Modal>
        );
    }
}

export default HotspotModal;