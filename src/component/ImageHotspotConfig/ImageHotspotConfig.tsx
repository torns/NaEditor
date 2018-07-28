import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import PicLib from '../PicLib';

interface ImageHotspotConfigProps {
    moduleData: any;    // TODO 转换为interface
    moduleConfig: any;
}

const mapStateToProps = (state: any) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

class ImageHotspotConfig extends Component<ImageHotspotConfigProps, any> {

    constructor(props: ImageHotspotConfigProps) {
        super(props);
        let imageUrl;
        if (props.moduleData.configData) {
            imageUrl = props.moduleData.configData.imageUrl;
        } else {
            imageUrl = '';
        }
        this.state = {
            imageUrl,
        };
    }

    componentWillReceiveProps(nextProps: ImageHotspotConfigProps) {
        let newImageUrl;
        if (nextProps.moduleData.configData) {
            newImageUrl = nextProps.moduleData.configData.imageUrl;
        } else {
            newImageUrl = '';
        }
        this.setState({
            imageUrl: newImageUrl,
        });
    }

    getConfigData() {
        return {
            imageUrl: this.state.imageUrl,
        };
    }

    toModuleData(configData: any) {
        const { moduleConfig } = this.props;
        const result = Object.assign({}, moduleConfig.moduleData, {
            data: configData,
        });
        return result;
    }

    imageChange = (imageUrl: string) => {
        this.setState({
            imageUrl,
        });
    }

    render() {
        const defaultValue = (() => {
            let result;
            try {
                result = this.props.moduleData.configData.imageUrl;
            } catch (error) {
                result = '';
            }
            return result;
        })();

        const { imageUrl } = this.state;

        return (
            <div>
                <span>图片地址</span>
                <PicLib
                    defaultValue={defaultValue}
                    value={imageUrl}
                    onChange={(url) => { this.imageChange(url); }}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(ImageHotspotConfig);
