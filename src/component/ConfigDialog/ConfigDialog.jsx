import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import 'antd/dist/antd.css';

import UserDefineConfig from '@component/UserDefineConfig';
import { hideConfig } from '@actions';

class ConfigDialog extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { moduleConfig, hideConfig } = this.props;

        if (moduleConfig.isVisiable) {
            return (

                <div className="cd-config-dialog">
                    <Icon type="close" onClick={() => hideConfig()} />
                    <UserDefineConfig title="自定义代码配置" />
                </div>
            )
        } else {
            return null;
        }

    }
}

const mapStateToProps = (state) => {
    return { moduleConfig: state.moduleConfig }
}


export default connect(mapStateToProps, { hideConfig })(ConfigDialog)