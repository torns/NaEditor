import React from 'react';
import { Button, Modal } from 'antd';
import TemplateLibModal from './TemplateModal';

interface TemplateLibProps {
    value: number;
    onChange: (templateId: number) => void;
    moduleType: number;
}

interface TemplateLibState {
    value: number;
    isModalVisible: boolean;
}

class TemplateLib extends React.Component<TemplateLibProps, TemplateLibState> {

    static getDerivedStateFromProps(nextProps: TemplateLibProps, prevState: TemplateLibState) {
        const { value } = nextProps;
        if (value !== prevState.value) {
            return {
                value,
            };
        }
    }

    constructor(props: TemplateLibProps) {
        super(props);
        const { value } = this.props;
        this.state = {
            value,
            isModalVisible: false,
        };
    }

    handleChange = (templateId: number) => {
        this.props.onChange(templateId);
        this.closeModal();
    }

    open = () => {
        this.setState({
            isModalVisible: true,
        });
    }

    renderModal = (isModalVisible: boolean) => {
        return (isModalVisible ?
            <TemplateLibModal
                isModalVisible={isModalVisible}
                moduleType={this.props.moduleType}
                value={this.state.value}
                onOk={(templateId: number) => { this.handleChange(templateId); }}
                onCancel={this.closeModal}
            /> : null);
    }

    closeModal = () => {
        this.setState({
            isModalVisible: false,
        });
    }

    render() {
        const { isModalVisible } = this.state;
        return (
            <div>
                <Button
                    onClick={this.open}
                >模板库
                </Button>
                {this.renderModal(isModalVisible)}
            </div>
        );
    }
}

export default TemplateLib;