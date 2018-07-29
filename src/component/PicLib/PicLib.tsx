import * as React from 'react';
import { Input, Button, Icon } from 'antd';
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

    componentWillReceiveProps(nextProps: PicLibProps) {
        const { value } = nextProps;
        this.setState({
            value,
        });
    }

    open = () => {
        this.setState({
            isModalVisible: true,
        });
    }

    handleChange = (url: string) => {
        this.setState({
            value: url,
            isModalVisible: false,
        });
        if (this.props.onChange !== undefined) {
            this.props.onChange(url);
        }

    }

    closeModal = () => {
        this.setState({
            isModalVisible: false,
        });
    }

    renderModal = (isModalVisible: boolean) => {
        const { value: defaultValue } = this.state;
        return (isModalVisible ?
            <PicLibModal
                defaultValue={defaultValue}
                isModalVisible={isModalVisible}
                onOk={(url: string) => { this.handleChange(url); }}
                onCancel={this.closeModal}
            /> : null);
    }

    render() {

        const { defaultValue } = this.props;
        const { isModalVisible, value } = this.state;

        return (
            <InputGroup compact>
                <Input
                    value={value}
                    onChange={(e) => { this.handleChange(e.target.value); }}
                    defaultValue={defaultValue}
                    style={{ width: '70%' }}
                />
                <Button
                    onClick={this.open}
                    style={{ width: '30%' }}
                >
                    <Icon type="picture" />
                    图片库
                </Button>
                {this.renderModal(isModalVisible)}
            </InputGroup >
        );

    }
}

export default PicLib;
