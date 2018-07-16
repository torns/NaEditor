import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
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

    render() {
        return (
            <div>
                <div className="cd-title">{this.props.title}</div>
                <span>图片地址</span>
                <Input placeholder="请输入图片地址"
                    value={this.state.imageUrl}
                    onChange={(e) => { this.setState({ imageUrl: e.target.value }); }}
                />
            </div>
        )
    }
}

ImageHotspotConfig.contextTypes = { store: PropTypes.object };

export default ImageHotspotConfig;