import React, { Component, Fragment } from 'react';
import { Row, Col, Upload, Input, Button, Icon, Modal } from 'antd';
const Search = Input.Search;


class Content extends Component {
    constructor(props) {
        super();
        this.state = {
            imgList: [
                {
                    src: 'https://sfault-avatar.b0.upaiyun.com/278/772/2787724954-5695bc46c1306_big64',
                    alt: '1',
                }, {
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                    alt: '1',
                }
            ]
        }
    }

    render() {
        const { imgList } = this.state;
        return (
            <div className='d-content'>
                <Row>
                    <Col span={4}>
                        <Search
                            placeholder="输入图片名称或关键字"
                        />
                    </Col >
                    <Col span={2} offset={18}>
                        <Upload>
                            <Button className='d-upload-img'
                                type='primary'>
                                上传图片
                            </Button>
                        </Upload>
                    </Col >
                </Row>
                <Row>
                    {imgList.map((v, i) => (
                        <img key={i} src={v.src} />
                    ))}
                </Row>
            </div>
        )
    }
}




class SourceManage extends Component {
    constructor(props) {
        super();
        this.state = {
            isVisiable: false
        }
    }

    handleOk = (e) => {
        console.log(e)
    }

    open = () => {
        this.setState({
            isVisiable: true,
        })
    }

    close = () => {
        this.setState({
            isVisiable: false,
        })
    }

    render() {

        const Title = (
            <Fragment>
                <span className='d-title'>图片选择器</span>
                <span className='d-desc'>(支持格式为xxx)</span>
            </Fragment>
        )

        const { isVisiable: visible } = this.state;

        return (
            <Fragment>
                <Button onClick={this.open}>打开图片管理</Button>
                <Modal
                    className='d-source-manage'
                    visible={visible}
                    title={Title}
                    width={1100}
                    onOk={this.handleOk}
                    onCancel={this.close}
                >
                    <Content />
                </Modal>
            </Fragment>

        )
    }

}

export default SourceManage;