import * as React from 'react';
import { Row, Col, Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
const FormItem = Form.Item;

import '../../common/script/interceptor';
import INTERFACE from '../../common/script/INTERFACE';
import axios from 'axios';

export interface ContentProps {
    defaultValue?: string;
    onOk: () => void;
    onCancel: () => void;
    isModalVisible?: boolean;
}

interface PageFormProps extends FormComponentProps {
}

class PageForm extends React.Component<PageFormProps, any> {

    handleSubmit = () => {
        return new Promise((resolve, reject) => {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    const result = await axios(INTERFACE.addPage, {
                        params: values,
                    });
                    resolve(result);
                }
            });
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="页面名称">
                    {getFieldDecorator('pageName', {
                        rules: [{ required: true, message: '请输入页面名称' }],
                    })(
                        <Input placeholder="页面名称" />,
                    )}
                </FormItem>
            </Form>
        );
    }
}

const PageFormWrap = Form.create()(PageForm);

class CreateModalModal extends React.Component<ContentProps, any> {

    form: any = {};

    constructor(props: ContentProps) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = async () => {
        const result = (await this.form.handleSubmit()).data;
        if (result.success) {
            this.props.onOk();
        }
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
                <PageFormWrap
                    wrappedComponentRef={(form: any) => {
                        this.form = form;
                    }}
                />
            </Modal>
        );
    }
}

export default CreateModalModal;
