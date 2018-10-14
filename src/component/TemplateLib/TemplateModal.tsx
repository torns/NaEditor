import React from 'react';
import { Modal, Row, Col, Input, Button } from 'antd';
import axios from 'axios';
const Search = Input.Search;
import update from 'immutability-helper';

import './TemplateLibModal.less';
import INTERFACE from '../../common/script/INTERFACE';
import { ITemplateInfo } from '../interface';

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
        return <p>模板库</p>;
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
        this.setState(newState);
    }

    renderTemplateList = () => {
        const { templateList } = this.state;
        return templateList.map((v: templateInfo) => <Col span={3} key={v.id}>
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
            </div>
        </Col>);
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
                <Row>
                    <Col span={4}>
                        <Search
                            placeholder="输入图片名称或关键字"
                        />
                    </Col >
                    <Col span={2} offset={18}>
                        <Button className="d-upload-img" type="primary">
                            新增模板
                        </Button>
                    </Col >
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    {this.renderTemplateList()}
                </Row>
            </div>
        </Modal>;
    }
}

export default TemplateLibModal;