import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Modal } from 'antd';
import SourceManage from '../SourceManage';
const { TextArea } = Input;

class ImageHotspotConfig extends React.Component {

    constructor(props) {
        super();
        let imageUrl;
        if (props.moduleData.configData) {
            imageUrl = props.moduleData.configData.imageUrl;
        } else {
            imageUrl = '';
        }
        this.state = {
            imageUrl,
        }
    }


    componentWillReceiveProps(nextProps) {
        let newImageUrl;
        if (nextProps.moduleData.configData) {
            newImageUrl = nextProps.moduleData.configData.imageUrl;
        } else {
            newImageUrl = '';
        }
        this.setState({
            imageUrl: newImageUrl
        })

    }

    getConfigData() {
        return {
            imageUrl: this.state.imageUrl,
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

    imageChange = (imageUrl) => {
        this.setState({
            imageUrl,
        })
    }

    render() {
        const defaultValue = (() => {
            let result;
            try {
                result = this.props.moduleData.configData.imageUrl
            } catch (error) {
                result = '';
            }
            return result;
        })();

        return (
            <div>
                <span>图片地址</span>
                <SourceManage onChange={this.imageChange}
                    defaultValue={defaultValue} />
            </div>
        )
    }
}

ImageHotspotConfig.contextTypes = { store: PropTypes.object };

export default ImageHotspotConfig;