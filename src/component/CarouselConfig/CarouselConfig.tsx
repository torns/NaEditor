import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

import PicLib from '../PicLib';

interface CarouselConfigProps {
    moduleData: any;
    moduleConfig: any;
}

class CarouselConfig extends React.Component<CarouselConfigProps, any> {

    constructor(props: CarouselConfigProps) {
        super(props);
        let imageList;
        if (props.moduleData.configData) {
            imageList = props.moduleData.configData.imageList;
        } else {
            imageList = ['', ''];
        }
        this.state = {
            imageList,
        };
    }

    getConfigData() {
        return {
            imageList: this.state.imageList,
        };
    }

    toModuleData(configData: any) {
        const { moduleConfig } = this.props;
        const result = Object.assign({}, moduleConfig.moduleData, {
            data: configData,
        });
        return result;
    }

    imageChange = (index: number, url: string) => {
        const { imageList } = this.state;
        this.setState({
            imageList: imageList.map((v: any, i: number) => {
                return i === index ? url : v;
            }),
        });
    }

    render() {
        let { imageList } = this.state;
        imageList = imageList || ['', ''];
        return (
            <div>
                <span>第一张图</span>
                <Input
                    placeholder="请输入图片地址"
                    value={imageList[0] || ''}
                    onChange={(e) => { this.imageChange(0, e.target.value); }}
                />
                <span>第二张图</span>
                <Input
                    placeholder="请输入图片地址"
                    value={imageList[1] || ''}
                    onChange={(e) => { this.imageChange(1, e.target.value); }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

export default connect(mapStateToProps, {}, undefined, { withRef: true })(CarouselConfig);
