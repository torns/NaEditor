import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { IState, ImageInfo, IModuleData, IModuleConfig } from '../interface';
import PicLib from '../PicLib';

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

interface LayerConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

interface LayerConfigState {
    imgUrl: string;
}

class LayerConfig extends Component<LayerConfigProps, LayerConfigState> {

    constructor(props: LayerConfigProps) {
        super(props);
        const {
            moduleData: {
                data: {
                    imgUrl,
                }
            }
        } = props;
        this.state = {
            imgUrl,
        }
    }


    getConfigData = () => ({
        imgUrl: this.state.imgUrl,
    })

    toModuleData(configData: any) {
        const { moduleConfig } = this.props;
        const result = Object.assign({}, moduleConfig.moduleData, {
            data: configData,
        });
        return result;
    }


    onChange = (imgUrl: string) => {
        this.setState({
            imgUrl,
        });
    }

    render() {
        let { imgUrl } = this.state;

        return (
            <div>
                <p>浮层图片选择</p>
                <PicLib
                    defaultValue={imgUrl}
                    value={imgUrl}
                    onChange={(imgUrl) => { this.onChange(imgUrl) }}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(LayerConfig);
