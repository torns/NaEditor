import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import Module from '../Module';
import { IModuleData, HotspotInfo, IContext } from '../interface';
import isServer from '../../common/script/isServer';


interface FixedProps {
    moduleData: IModuleData;
}

interface FixedState {

}

export default class Fixed extends React.Component<FixedProps, FixedState> {


    static contextTypes = {
        BASE_DATA: PropTypes.object
    }

    rootEl: HTMLDivElement | undefined = undefined;

    constructor(props: FixedProps) {
        super(props);
    }

    componentDidMount() {
        this.rootEl = document.createElement('div');
        if (this.context.BASE_DATA.pageType !== 0) {
            document.body.appendChild(this.rootEl);
        }
    }

    componentWillUnmount() {
        this.rootEl && this.rootEl.remove();
    }

    onClose = () => {
        this.rootEl && this.rootEl.remove();
    }

    renderChild = () => {

        let {
            moduleData: {
                data: {
                    imgUrl,
                    hotspots,
                    vertical,
                    verticalDir,
                    verticalUnit,
                    horizontal,
                    horizontalDir,
                    horizontalUnit,
                    width,
                    widthUnit,
                },
            },
        } = this.props;

        verticalUnit === undefined && (verticalUnit = '%');
        horizontalUnit === undefined && (horizontalUnit = '%');

        let left, right, top, bottom;

        if (verticalDir === 'top') {
            top = `${vertical}${verticalUnit}`;
        } else {
            verticalDir = verticalDir;
            verticalUnit = verticalUnit;
            bottom = `${vertical}${verticalUnit}`;
        }

        if (horizontalDir === 'left') {
            left = `${horizontal}${horizontalUnit}`;
        } else {
            horizontal = horizontal;
            horizontalUnit = horizontalUnit;
            right = `${horizontal}${horizontalUnit}`;
        }

        return (
            <div className="d-fixed"
                style={{
                    left,
                    right,
                    top,
                    bottom,
                    width: `${width ? `${width}${widthUnit}` : 'auto'}`
                }}
            >
                <div className="d-img">
                    <img src={imgUrl} />
                    <div className="d-hotspots-wrap">
                        {hotspots && hotspots.map((v: HotspotInfo) => {
                            <a href={v.url}></a>
                        })}
                    </div>

                </div>
            </div>
        )
    }

    render() {
        const { moduleData } = this.props;
        const isDecorate = this.context.BASE_DATA.pageType === 0;

        // 装修时的展示
        if (isDecorate) {
            return (
                <Module moduleData={moduleData}>
                    <span className="d-hint">定位模块效果请在预览页中查看</span>
                </Module>
            );
        } else {
            if (this.rootEl !== undefined) {
                return ReactDOM.createPortal(
                    this.renderChild(),
                    this.rootEl,
                );
            } else {
                return null;
            }
        }

    }
}