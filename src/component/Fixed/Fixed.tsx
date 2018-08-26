import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import Module from '../Module';
import { IModuleData, HotspotInfo, IContext } from '../interface';


interface FixedProps {
    moduleData: IModuleData;
}

interface FixedState {

}

const body = document.body;

const rootEl = document.createElement('div');

export default class Fixed extends React.Component<FixedProps, FixedState> {


    static contextTypes = {
        BASE_DATA: PropTypes.object
    }

    constructor(props: FixedProps) {
        super(props);
    }

    componentDidMount() {
        if (this.context.BASE_DATA.pageType !== 0) {
            body.appendChild(rootEl);
        }
    }

    componentWillUnmount() {
        rootEl.remove();
    }

    onClose = () => {
        rootEl.remove();
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
            return ReactDOM.createPortal(
                this.renderChild(),
                rootEl,
            );
        }

    }
}