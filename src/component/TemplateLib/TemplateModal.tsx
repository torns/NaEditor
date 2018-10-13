import React from 'react';
import { Modal } from 'antd';

interface TemplateLibModalProps {
    isModalVisible: boolean;
    onOk: (templateId: number) => void;
    onCancel: () => void;
}

interface TemplateLibModalState {
    templateId: number;
}

class TemplateLibModal extends React.Component<TemplateLibModalProps, TemplateLibModalState> {
    constructor(props: TemplateLibModalProps) {
        super(props);
    }

    renderTitle() {
        return <p>模板库</p>;
    }

    handleOk() {
        this.props.onOk(this.state.templateId);
    }

    handleCancel() {
        this.props.onCancel();
    }

    render() {
        const { isModalVisible: visible } = this.props;
        return <Modal
            className="d-template-lib-modal"
            visible={visible}
            title={this.renderTitle()}
            width={1100}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
            <div className="d-content">
                312312
            </div>
        </Modal>;
    }
}

export default TemplateLibModal;