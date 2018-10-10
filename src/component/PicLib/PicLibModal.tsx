import * as React from 'react';
import { Fragment } from 'react';
import { Row, Col, Button, Upload, Input, Modal } from 'antd';
const Search = Input.Search;

import INTERFACE from '../../common/script/INTERFACE';
import axios from 'axios';

export interface ContentProps {
    defaultValue?: string;
    onOk: (url: string) => void;
    onCancel: () => void;
    isModalVisible?: boolean;
}

const uploadProps = {
    name: 'file',
    action: INTERFACE.uploadImage,
    headers: {
        authorization: 'authorization-text',
    },
    showUploadList: false,
};

interface ImageInfo {
    name: string;
    url: string;
    isActive: boolean;
}

class PicLibModal extends React.Component<ContentProps, any> {

    constructor(props: ContentProps) {
        super(props);
        this.state = {
            imgList: [],
        };
    }

    componentDidMount() {
        this.refreshImageList();
    }

    refreshImageList = async () => {
        const { defaultValue } = this.props;
        const result = (await axios(INTERFACE.getImageList)).data;
        if (result.success === true) {
            const imgList = result.data.map((v: any) => {
                const { name, url } = v;
                let isActive = false;
                if (url === defaultValue) {
                    isActive = true;
                }
                return { name, url, isActive };
            });
            this.setState({
                imgList,
            });
        }
    }

    renderTitle = () => {
        return [
            <span className="d-title" key={1}>图片选择器</span>,
            <span className="d-desc" key={2}>(支持格式为xxx)</span>,
        ];
    }

    handleOk = () => {
        const activeList = this.state.imgList.filter((v: ImageInfo) => {
            return v.isActive;
        });
        let result = '';
        if (activeList && activeList[0]) {
            result = activeList[0].url;
        }
        this.props.onOk(result);
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    selectImg = (url: string) => {
        const imgList = this.state.imgList.map((v: ImageInfo) => {
            if (v.url === url) {
                v.isActive = true;
            } else {
                v.isActive = false;
            }
            return v;
        });
        this.setState({
            imgList,
        });
    }

    renderImgList = () => {
        const { imgList } = this.state;
        return imgList.map((v: ImageInfo, i: number) => (
            <Col span={3} key={i}>
                <div
                    className={`d-img-container ${v.isActive ? 'active' : ''}`}
                    onDoubleClick={this.handleOk}
                    onClick={() => { this.selectImg(v.url); }}
                >
                    <div
                        className="d-image"
                        style={{ backgroundImage: `url(${v.url})` }}
                    />
                    <p className="d-image-name" title={v.name}>{v.name}</p>
                    <div className="d-img-mask" />
                </div>
            </Col>
        ));
    }

    uploadChange = (e: any) => {
        if (e.event) {
            setTimeout(() => {
                this.refreshImageList();
            }, 1000);
        }
    }

    render() {
        const { isModalVisible: visible } = this.props;
        return (
            <Modal
                className="d-pic-lib-modal"
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
                            <Upload {...uploadProps} onChange={this.uploadChange}>
                                <Button className="d-upload-img" type="primary">
                                    上传图片
                            </Button>
                            </Upload>
                        </Col >
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        {this.renderImgList()}
                    </Row>
                </div>
            </Modal>
        );
    }
}

export default PicLibModal;
