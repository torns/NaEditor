import React from 'react';
import { Input } from 'antd';

interface ColorPickerProps {
    value: string;
    onChange: (hex: string) => void;
}

interface ColorPickerState {
    visible: boolean;
}

class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
    constructor(props: ColorPickerProps) {
        super(props);
    }

    render() {
        const { onChange, value } = this.props;
        console.log(value);
        return (
            <div />
        );
    }

}

export default ColorPicker;