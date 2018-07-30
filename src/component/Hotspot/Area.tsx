import React from 'react';

interface AreaProps {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface AreaState {
    x: number;
    y: number;
    w: number;
    h: number;
}


class Area extends React.Component<AreaProps, AreaState>{

    constructor(props: AreaProps) {
        super(props);
        const { x, y, w, h } = props;
        this.setState({
            x, y, w, h,
        })
    }

    render() {
        return (
            <div>111</div>
        )
    }
}

export default Area;