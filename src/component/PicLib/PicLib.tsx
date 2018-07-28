import * as React from 'react';
import { Fragment } from 'react';
import { Input, Button, Modal } from 'antd';
const InputGroup = Input.Group;

import Content from './Contend';

export interface PicLibProps {
    defaultValue?: string;
}

class PicLib extends React.Component<PicLibProps, any> {
    constructor(props: PicLibProps) {
        super(props);
        this.state = {
            isVisiable: false,
        };
    }

    open = () => {

    }

    close = () => {

    }

    handleOk = () => {

    }

    selectedImgChange = () => {

    }

    render() {
        const Title = (
            <Fragment>
                <span className="d-title">图片选择器</span>
                <span className="d-desc">(支持格式为xxx)</span>
            </Fragment>
        );

        const { defaultValue } = this.props;
        const { isVisiable } = this.state;

        const MyModal = () => {
            if (isVisiable === true) {
                return (
                    <Modal
                        className="d-source-manage"
                        visible={isVisiable}
                        title={Title}
                        width={1100}
                        onOk={this.handleOk}
                        onCancel={this.close}
                    >
                        <Content
                            selectedImgChange={this.selectedImgChange}
                            defaultValue={defaultValue}
                        // onOk={this.handleOk}
                        />
                    </Modal >
                );
            } else {
                return null;
            }

        };

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
                <MyModal />
            </InputGroup >

        );

    }
}

export default PicLib;
