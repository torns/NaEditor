import * as React from 'react';
import { Fragment } from 'react';
import { Row, Col, Button, Upload, Input, Modal } from 'antd';
const Search = Input.Search;

import INTERFACE from '../../common/script/INTERFACE';

export interface ContentProps {
    defaultValue?: string;
    visible?: boolean;
    onOk: (url: string) => void;
}

const uploadProps = {
    name: 'file',
    action: INTERFACE.uploadImage,
    headers: {
        authorization: 'authorization-text',
    },
};

interface ImageInfo {
    name: string;
    url: string;
    isActive: boolean;
}

class PicLibModal extends React.Component<ContentProps, any> {

    static defaultProps = {
        visible: true,
    };

    constructor(props: ContentProps) {
        super(props);
        this.state = {
            imgList: [],
            visible: this.props.visible,
        };
    }

    componentDidMount() {
        const { defaultValue } = this.props;
        console.log(defaultValue);
        fetch(INTERFACE.getImageList, {
            headers: new Headers({
                'Accept': 'application/json', // 通过头指定，获取的数据类型是JSON
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.success) {
                    const { list } = res;
                    const imgList = list.map((v: ImageInfo) => {
                        if (v.url === defaultValue) {
                            v.isActive = true;
                        }
                        return v;
                    });
                    this.setState({
                        imgList,
                    });
                }
            });
    }

    componentWillReceiveProps(nextProps: any) {
        const { visible } = nextProps;
        this.setState({
            visible,
        });
    }

    renderTitle = () => (
        <Fragment>
            <span className="d-title">图片选择器</span>
            <span className="d-desc">(支持格式为xxx)</span>
        </Fragment>
    )

    handleOk = () => {
        const activeList = this.state.imgList.filter((v: ImageInfo) => {
            return v.isActive;
        });
        let result = '';
        if (activeList && activeList[0]) {
            result = activeList[0].url;
        }
        this.props.onOk(result);
        this.setState({
            visible: false,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
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
                    <div className="d-img-mask" />
                </div>
            </Col>
        ));
    }

    render() {
        const { visible } = this.state;
        return (
            <Modal
                className="d-source-manage"
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
                            <Upload {...uploadProps}>
                                <Button className="d-upload-img" type="primary">
                                    上传图片
                            </Button>
                            </Upload>
                        </Col >
                    </Row>
                    <Row>
                        {this.renderImgList()}
                    </Row>
                </div>
                );
            </Modal>
        );
    }
}

export default PicLibModal;
