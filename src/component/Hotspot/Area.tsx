import React, { RefObject } from 'react';
import { Icon } from 'antd';
import { AreaInfo } from '../interface';

interface AreaProps {
    index: number;
    x: number;
    y: number;
    w: number;
    h: number;
    onRemove: (index: number) => void;
    onChange: (index: number, area: AreaInfo) => void;
}

interface AreaState {
    initX: number;
    initY: number;
    initW: number;
    initH: number;
    isMoving: boolean;
    movingOffsetX: number;
    movingOffsetY: number;
    // containerOffsetX: number;
    // containerOffsetY: number;
}

class Area extends React.Component<AreaProps, AreaState> {

    constructor(props: AreaProps) {
        super(props);
        let { x, y, w, h } = props;
        x = x || 0;
        y = y || 0;
        w = w || 0;
        h = h || 0;
        this.state = {
            isMoving: false,   // 是否正在拖动
            initX: x,
            initY: y,
            initW: w,
            initH: h,
            movingOffsetX: 0,
            movingOffsetY: 0,
        };
    }

    handleMouseDown = (e: React.MouseEvent) => {
        const {
            nativeEvent: {
                offsetX: movingOffsetX,
                offsetY: movingOffsetY,
            },
        } = e;
        this.setState({
            isMoving: true,
            movingOffsetX,
            movingOffsetY,
        });

    }

    handleMouseUp = () => {
        this.setState({
            isMoving: false,
            movingOffsetX: 0,
            movingOffsetY: 0,
        });
    }

    handleMouseMove = (e: React.MouseEvent) => {
        const { isMoving, movingOffsetX, movingOffsetY } = this.state;
        if (isMoving) {
            const { index, onChange, x, y, w, h } = this.props;
            const {
                nativeEvent: {
                    offsetX,
                    offsetY,
                },
            } = e;
            const currentX = x + offsetX - movingOffsetX;
            const currentY = y + offsetY - movingOffsetY;
            onChange(index, Object.assign({}, { x, y, w, h }, { x: currentX, y: currentY }));
        }

    }

    render() {
        const { x, y, w, h, index, onRemove } = this.props;
        return (
            <div
                className="d-area"
                draggable={false}
                // ref={this.areaRef}
                style={{ left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` }}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
            >
                <div
                    className="d-icon-delete"
                    onClick={() => { onRemove(index); }}
                >
                    <Icon type="delete" />
                </div>
                <p className="d-name">
                    热区{index + 1}
                </p>
            </div >
        );
    }
}

export default Area;