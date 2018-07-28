import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
const { TextArea } = Input;

import PicLib from '../PicLib';

class CarouselConfig extends React.Component {

    constructor(props) {
        super();
        let imageList;
        if (props.moduleData.configData) {
            imageList = props.moduleData.configData.imageList;
        } else {
            imageList = ['', ''];
        }
        this.state = {
            imageList,
        }
    }


    getConfigData() {
        return {
            imageList: this.state.imageList,
        }
    }

    toModuleData(configData) {
        const { store } = this.context;
        const state = store.getState();
        const result = Object.assign({}, state.moduleConfig.moduleData, {
            data: configData,
        })
        return result;
    }

    render() {
        let { imageList } = this.state;
        imageList = imageList || ['', ''];
        return (
            <div>
                <span>第一张图</span>
                <Input placeholder="请输入图片地址"
                    value={imageList[0] || ''}
                    onChange={(e) => {
                        this.setState({
                            imageList: imageList.map((v, i) => {
                                return i === 0 ? e.target.value : v;
                            })
                        });
                    }}
                />
                <span>第二张图</span>
                <Input placeholder="请输入图片地址"
                    value={imageList[1] || ''}
                    onChange={(e) => {
                        this.setState({
                            imageList: imageList.map((v, i) => {
                                return i === 1 ? e.target.value : v;
                            })
                        });
                    }}
                />
                <PicLib />
            </div>
        )
    }
}

CarouselConfig.contextTypes = { store: PropTypes.object };

export default CarouselConfig;