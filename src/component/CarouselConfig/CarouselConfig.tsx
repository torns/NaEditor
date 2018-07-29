import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

import ImageGroup from '../ImageGroup';
import { ImageInfo } from '../interface';
import { CarouselConfigProps, CarouselConfigState } from './interface';

class CarouselConfig extends React.Component<CarouselConfigProps, CarouselConfigState> {

    constructor(props: CarouselConfigProps) {
        super(props);
        const imgs: ImageInfo[] = this.props.moduleConfig.moduleData.data.imgs;
        this.state = {
            imgs,
        };
    }

    getConfigData() {
        return {
            imgs: this.state.imgs,
        };
    }

    toModuleData(configData: any) {
        const { moduleConfig } = this.props;
        const result = Object.assign({}, moduleConfig.moduleData, {
            data: configData,
        });
        return result;
    }

    imageChange = (imgs: ImageInfo[]) => {
        this.setState({
            imgs,
        });
    }

    render() {
        let { imgs } = this.state;
        if (imgs === undefined) {
            imgs = [];
        }
        return (
            <div>
                <ImageGroup
                    imgs={imgs}
                    onChange={(imgs) => { this.imageChange(imgs); }}
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
