import React from 'react';
import { Modal, Row, Col, Input, Button, Icon, Tooltip, Popconfirm, message } from 'antd';
import axios from 'axios';
const { Search } = Input;
import update from 'immutability-helper';

import './TemplateLibModal.less';
import INTERFACE from '../../common/script/INTERFACE';
import { ITemplateInfo } from '../interface';
import EditTemplateModal from './EditTemplateModal';
import { EditType } from './interface';

interface templateInfo extends ITemplateInfo {
    active: boolean;
}

interface TemplateLibModalProps {
    isModalVisible: boolean;
    moduleType: number;
    value: number;
    onOk: (templateId: number) => void;
    onCancel: () => void;
}

interface TemplateLibModalState {
    templateId: number;
    templateList: templateInfo[];
    isEditModal: boolean;
    editType: EditType;
    editingTemplateId: number;
}

class TemplateLibModal extends React.Component<TemplateLibModalProps, TemplateLibModalState> {

    // static getDerivedStateFromProps(nextProps: TemplateLibModalProps, prevState: TemplateLibModalState) {
    //     const { value } = nextProps;
    //     if (value !== prevState.templateId) {
    //         return {
    //             templateId: value,
    //         };
    //     }
    // }

    constructor(props: TemplateLibModalProps) {
        super(props);
        this.state = {
            templateId: this.props.value,
            templateList: [],
            isEditModal: false,
            editingTemplateId: -1,
            editType: EditType.Add,
        };
    }

    componentDidMount() {
        this.fetchTemplateList();
    }

    fetchTemplateList = async () => {
        const { moduleType } = this.props;
        const type = 0;

        const result = (await axios(INTERFACE.getTemplateList, {
            params: {
                moduleType,
                type,
            },
        })).data;
        if (result.success) {
            this.setState({
                templateList: result.data.map((v: templateInfo) => {
                    if (v.id === this.state.templateId) {
                        v.active = true;
                    } else {
                        v.active = false;
                    }
                    return v;
                }),
            });
        }
    }

    renderTitle() {
        return <span className="d-title">模板库</span>;
    }

    handleOk = () => {
        this.props.onOk(this.state.templateId);
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    selectTemplate = (templateId: number) => {
        const newState = update(this.state, {
            templateList: {
                $apply: (templateList: templateInfo[]) => {
                    return templateList.map(v => {
                        if (v.id === templateId) {
                            v.active = true;
                        } else {
                            v.active = false;
                        }
                        return v;
                    });
                },
            },
            templateId: { $set: templateId },
        });
        this.setState(Object.assign({}, this.state, newState));
    }

    closeEditModal = () => {
        this.setState({
            isEditModal: false,
        });
    }

    editModalOk = () => {
        this.fetchTemplateList();
        this.closeEditModal();
    }

    /**
     * 渲染编辑模板弹框
     */
    renderEditTemplate = () => {
        const { editType, editingTemplateId, isEditModal } = this.state;
        return isEditModal ? <EditTemplateModal
            visible={this.state.isEditModal}
            editType={editType}
            onCancel={() => { this.closeEditModal(); }}
            onOk={() => { this.editModalOk(); }}
            templateId={editType === EditType.Edit ? editingTemplateId : undefined}
        /> : null;
    }

    showEditModal = (templateId: number) => {
        this.setState({
            isEditModal: true,
            editType: EditType.Edit,
            editingTemplateId: templateId,
        });
    }

    /**
     * 删除模板
     */
    deleteTemplate = async (id: number) => {
        const result = (await axios(INTERFACE.deleteTemplate, {
            params: {
                id,
            },
        })).data;
        if (result.success) {
            message.success('删除成功！');
            this.fetchTemplateList();
        } else {
            message.success(result.msg);
        }
    }

    renderTemplateList = () => {
        const { templateList } = this.state;
        return templateList.map((v: templateInfo, i: number) => <Col span={3} key={i}>
            <div
                className={`d-template-container ${v.active ? 'active' : ''}`}
                onDoubleClick={this.handleOk}
                onClick={() => { this.selectTemplate(v.id); }}
            >
                <div
                    className="d-template"
                    style={{ backgroundImage: `url(${v.imgUrl ? v.imgUrl : '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539512672741&di=330c4174f3e7254e271baea3f49217c8&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F41%2F24%2F82G58PICnZi_1024.png'})` }}
                />
                <p className="d-template-name" title={v.name}>{v.name}</p>
                <div className="d-template-mask" />
                <div className="d-operate">
                    <Tooltip title="编辑模板" placement="top">
                        <Icon
                            type="setting"
                            style={{ fontSize: '20px' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.showEditModal(v.id);
                            }}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="确定要删除该模板吗？"
                        placement="bottom"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={(e) => {
                            e.stopPropagation();
                            this.deleteTemplate(v.id);
                        }}
                    >
                        <Tooltip title="删除模板" placement="top">
                            <Icon
                                type="delete"
                                style={{ fontSize: '20px' }}
                            />
                        </Tooltip>
                    </Popconfirm>
                </div>
            </div>
        </Col >);
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
                <Row key={1}>
                    <Col span={4}>
                        <Search
                            placeholder="输入图片名称或关键字"
                        />
                    </Col >
                    <Col span={2} offset={18}>
                        <Button
                            className="d-upload-img"
                            type="primary"
                            onClick={() => {
                                this.setState({
                                    editType: EditType.Add,
                                    isEditModal: true,
                                });
                            }}
                        >
                            新增模板
                        </Button>
                    </Col >
                </Row>
                <Row style={{ marginTop: '10px' }} key={2}>
                    {this.renderTemplateList()}
                </Row>
            </div>
            {this.renderEditTemplate()}
        </Modal>;
    }
}

export default TemplateLibModal;