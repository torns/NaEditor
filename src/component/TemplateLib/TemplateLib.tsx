import React from 'react';
import { Button, Modal } from 'antd';
import TemplateLibModal from './TemplateModal';

interface TemplateLibProps {
    value: number;
    onChange?: (templateId: number) => void;
}

interface TemplateLibState {
    value: number;
    isModalVisible: boolean;
}

class TemplateLib extends React.Component<TemplateLibProps, TemplateLibState> {
    constructor(props: TemplateLibProps) {
        super(props);
    }

    handleChange = (templateId: number) => {
        this.setState({
            value: templateId,
        });
    }

    renderModal = (isModalVisible: boolean) => {
        return (isModalVisible ?
            <TemplateLibModal
                isModalVisible={isModalVisible}
                onOk={(templateId: number) => { this.handleChange(templateId); }}
                onCancel={this.closeModal}
            /> : null);
    }

    closeModal = () => {

    }

    render() {
        const { isModalVisible } = this.state;
        return (
            <div>

                <Button>模板库</Button>
                {this.renderModal(isModalVisible)}
            </div>
        );
    }
}

export default TemplateLib;