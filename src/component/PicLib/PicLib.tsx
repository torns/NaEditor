import * as React from 'react';
import { Input, Button, Icon } from 'antd';
const InputGroup = Input.Group;

import PicLibModal from './PicLibModal';

export interface PicLibProps {
    defaultValue?: string;
    value?: string;
    onChange?: (url: string) => void;
    onUp: any;
    onDown: any;
    onRemove: any;
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

        const { defaultValue, onUp, onDown, onRemove } = this.props;
        const { isModalVisible, value } = this.state;

        return (
            <InputGroup
                compact
                className="d-pic-lib"
            >
                <div
                    style={{ width: '8%' }}
                    className="d-item d-position"
                >
                    <Icon className="d-icon-up" type="caret-up" onClick={onUp} />
                    <Icon className="d-icon-down" type="caret-down" onClick={onDown} />
                </div>
                <Button
                    className="d-item d-piclib-text"
                    onClick={this.open}
                    style={{ width: '25%' }}
                >
                    <Icon type="picture" />
                    图片库
                </Button>
                <Input
                    className="d-item"
                    placeholder="输入图片路径或从图片库中选择"
                    value={value}
                    onChange={(e) => { this.handleChange(e.target.value); }}
                    defaultValue={defaultValue}
                    style={{ width: '58%', fontSize: '13px' }}
                />
                <Button
                    className="d-item d-delete"
                    style={{ width: '8%' }}
                    onClick={onRemove}
                >
                    <Icon type="delete" />
                </Button>
                {this.renderModal(isModalVisible)}
            </InputGroup >
        );

    }
}

export default PicLib;
