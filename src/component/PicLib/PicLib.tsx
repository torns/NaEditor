import * as React from 'react';
import { Input, Button } from 'antd';
const InputGroup = Input.Group;

import PicLibModal from './PicLibModal';

export interface PicLibProps {
    defaultValue?: string;
    value?: string;
    onChange?: (url: string) => void;
}

class PicLib extends React.Component<PicLibProps, any> {
    constructor(props: PicLibProps) {
        super(props);
        const { defaultValue: value } = props;
        this.state = {
            isModalVisible: false,
            value,
        };
    }

    open = () => {
        this.setState({
            isModalVisible: true,
        });
    }

    close = () => {
        this.setState({
            isModalVisible: false,
        });
    }

    handleOk = () => {

    }

    selectedImgChange = () => {

    }

    render() {

        const { defaultValue } = this.props;
        const { isModalVisible } = this.state;

        return (
            <InputGroup compact>
                <Input
                    value={this.state.selectedImg}
                    defaultValue={defaultValue}
                    style={{ width: '70%' }}
                // onChange={(e) => { this.selectedImgChange([{ url: e.target.value }]) }}
                />
                <Button
                    onClick={this.open}
                    style={{ width: '30%' }}
                >
                    图片库
                </Button>
                <PicLibModal visible={isModalVisible} />

            </InputGroup >
        );

    }
}

export default PicLib;
