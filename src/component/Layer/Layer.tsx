import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import Module from '../Module';
import { IModuleData, HotspotInfo, IContext } from '../interface';


interface LayerProps {
    moduleData: IModuleData;
}

interface LayerState {

}



export default class Layer extends React.Component<LayerProps, LayerState> {


    constructor(props: LayerProps) {
        super(props);
    }

    static contextTypes = {
        BASE_DATA: PropTypes.object
    }

    rootEl: HTMLDivElement | undefined = undefined;

    componentDidMount() {
        this.rootEl = document.createElement('div');
        this.rootEl.classList.add('d-layer');
        if (this.context.BASE_DATA.pageType !== 0) {
            document.body.appendChild(this.rootEl);
        }
    }

    componentWillUnmount() {
        this.closeModal();
    }

    onClose = () => {
        this.closeModal();
    }

    closeModal = () => {
        this.rootEl && this.rootEl.remove();
    }

    preventScroll = (e: React.TouchEvent) => {
        e.preventDefault();
        e.cancelable = true;
    }

    renderChild = () => {

        let {
            moduleData: {
                data: {
                    imgUrl,
                    hotspots,
                },
            },
        } = this.props;
        if (!imgUrl) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="d-img">
                    <img src={imgUrl} />
                    <div
                        className="d-close"
                        onClick={this.onClose} >
                        <Icon type="close" />
                    </div>
                    <div className="d-hotspots-wrap">
                        {hotspots && hotspots.map((v: HotspotInfo) => {
                            <a href={v.url}></a>
                        })}
                    </div>

                </div>
                <div className="d-mask" onClick={this.onClose} onTouchMove={this.preventScroll}></div>
            </React.Fragment>
        )
    }

    render() {
        const { moduleData } = this.props;
        const { pageType } = this.context.BASE_DATA;

        // 装修时的展示
        if (pageType === 0) {
            return (
                <Module moduleData={moduleData}>
                    <span className="d-hint">浮层模块效果请在预览页中查看</span>
                </Module>
            );
        } else {
            return this.rootEl ? ReactDOM.createPortal(
                this.renderChild(),
                this.rootEl,
            ) : null;
        }

    }
}