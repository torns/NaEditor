import React, { Component, Fragment } from 'react';
import { Row, Col, Upload, Input, Button, Icon, Modal, Card } from 'antd';
import PropTypes from 'prop-types';
const Search = Input.Search;
const InputGroup = Input.Group;


import INTERFACE from '@common/script/INTERFACE';

const uploadProps = {
    name: 'file',
    action: INTERFACE.uploadImage,
    headers: {
        authorization: 'authorization-text',
    },
    onChange() {

    }
}


class Content extends Component {
    constructor(props) {
        super();
        this.state = {
            imgList: [
            ]
        }
    }


    // 选择某图片
    selectImg = (index) => {
        const { imgList: oldImgList } = this.state;
        const imgList = oldImgList.map((v, i) => {
            if (i === index) {
                v.isActive = true;
            } else {
                v.isActive = false;
            }
            return v;
        })
        this.setState({
            imgList,
        })
        this.props.selectedImgChange(imgList.filter(v => v.isActive));
    }



    componentDidMount() {
        const { defaultValue } = this.props;
        fetch(INTERFACE.getImageList, {
            headers: new Headers({
                'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
            })
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {

                if (res.success) {
                    const { list } = res;
                    const imgList = list.map(v => {
                        if (v.url === defaultValue) {
                            v.isActive = true;
                        }
                        return v;
                    })
                    this.setState({
                        imgList,
                    })
                }
            })

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
                        <Upload {...uploadProps}>
                            <Button className='d-upload-img'
                                type='primary'>
                                上传图片
                            </Button>
                        </Upload>
                    </Col >
                </Row>
                <Row>
                    {imgList.map((v, i) => (
                        <Col span={3} key={i}>
                            <div className={`d-img-container ${v.isActive ? 'active' : null}`}
                                onDoubleClick={this.props.onOk}
                                onClick={() => { this.selectImg(i) }}>
                                <div className='d-image'
                                    style={{ backgroundImage: "url(" + v.url + ")" }}
                                >
                                </div>
                                <div className='d-img-mask'></div>
                            </div>
                        </Col>
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
            isVisiable: false,
            selectedImg: props.defaultValue,
        }
    }

    handleOk = (e) => {
        const { onChange } = this.props;
        onChange(this.state.selectedImg)
        console.log(this.state.selectedImg)
        this.close();
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

    componentWillReceiveProps(nextProps) {
        const { defaultValue: selectedImg } = nextProps;
        this.setState({
            selectedImg,
        })
    }

    selectedImgChange = (imageList) => {
        const [{ url }] = imageList;
        console.log(111, url)
        this.setState({
            selectedImg: url,
        })
        this.props.onChange(url);
    }

    render() {

        const Title = (
            <Fragment>
                <span className='d-title'>图片选择器</span>
                <span className='d-desc'>(支持格式为xxx)</span>
            </Fragment>
        )

        const { defaultValue } = this.props;
        const { isVisiable: visible } = this.state;

        console.log(this.state.selectedImg)
        return (
            <InputGroup compact>
                <Input value={this.state.selectedImg}
                    defaultValue={defaultValue}
                    style={{ width: '70%' }}
                    onChange={(e) => { this.selectedImgChange([{ url: e.target.value }]) }} />
                <Button onClick={this.open} style={{ width: '30%' }}>图片库</Button>
                {visible ? <Modal
                    className='d-source-manage'
                    visible={visible}
                    title={Title}
                    width={1100}
                    onOk={this.handleOk}
                    onCancel={this.close}
                >
                    <Content selectedImgChange={this.selectedImgChange}
                        defaultValue={defaultValue}
                        onOk={this.handleOk}
                    />
                </Modal> : null}

            </InputGroup>

        )
    }

}

SourceManage.propTypes = {
    defaultValue: PropTypes.string,
}


export default SourceManage;