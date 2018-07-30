import React from 'react';

interface AreaProps {
    index: number;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
}

interface AreaState {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
}

class Area extends React.Component<AreaProps, AreaState> {

    constructor(props: AreaProps) {
        super(props);
        let { x, y, w, h } = props;
        this.state = {
            x, y, w, h,
        };
    }

    render() {
        const { x, y, w, h } = this.props;
        return (
            <div
                className="d-area"
                style={{ left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` }}
            />
        );
    }
}

export default Area;