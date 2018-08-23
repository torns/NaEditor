import * as React from 'react';
import { Row, Col, Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const FormItem = Form.Item;

import INTERFACE from '../../common/script/INTERFACE';
import axios from 'axios';

export interface ContentProps {
    defaultValue?: string;
    onOk: (url: string) => void;
    onCancel: () => void;
    isModalVisible?: boolean;
}

interface PageFormProps extends FormComponentProps {
}

class PageForm extends React.Component<PageFormProps, any> {

    handleSubmit = () => {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem label="页面名称"
                >
                    {getFieldDecorator('pageName', {
                        rules: [{ required: true, message: '请输入页面名称' }],
                    })(
                        <Input placeholder="页面名称" />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const PageFormWrap = Form.create()(PageForm);


class CreateModalModal extends React.Component<ContentProps, any> {

    constructor(props: ContentProps) {
        super(props);
        this.state = {
            imgList: [],
        };
    }

    form: any = {};

    handleSubmit = () => {
        console.log(this.form);
        this.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleOk = () => {
        this.handleSubmit();
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        const { isModalVisible: visible } = this.props;
        return (
            <Modal
                className="d-pic-lib-modal"
                visible={visible}
                title="新建页面"
                width={500}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <PageFormWrap wrappedComponentRef={(form: any) => {
                    this.form = form;
                }} />
            </Modal>
        );
    }
}

export default CreateModalModal;
