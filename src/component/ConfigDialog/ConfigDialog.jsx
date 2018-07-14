import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
import 'antd/dist/antd.css';

import UserDefineConfig from '@component/UserDefineConfig';
import { hideConfig, saveConfig } from '@actions';

class ConfigDialog extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { moduleConfig, hideConfig, saveConfig } = this.props;
        const { store } = this.context;

        if (moduleConfig.isVisiable) {
            return (

                <div className="cd-config-dialog">
                    <Icon type="close" onClick={() => hideConfig()} />
                    <UserDefineConfig title="自定义代码配置" />
                    <Button onClick={() => hideConfig()}>取消</Button>
                    <Button type="primary"
                        onClick={() => { saveConfig() }}>确定</Button>
                </div>
            )
        } else {
            return null;
        }

    }
}


ConfigDialog.contextTypes = { store: PropTypes.object };

const mapStateToProps = (state) => {
    return { moduleConfig: state.moduleConfig }
}


export default connect(mapStateToProps, { hideConfig, saveConfig })(ConfigDialog)