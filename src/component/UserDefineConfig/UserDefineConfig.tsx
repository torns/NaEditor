import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { TextArea } = Input;

interface UserDefineConfigProps {
    moduleData: any;
    moduleConfig: any;
}

class UserDefineConfig extends React.Component<UserDefineConfigProps, any> {

    constructor(props: UserDefineConfigProps) {
        super(props);
        let code;
        if (props.moduleData.configData) {
            code = props.moduleData.configData.code;
        } else {
            code = '';
        }
        this.state = {
            code,
        };
    }

    componentWillReceiveProps(nextProps: UserDefineConfigProps) {
        let newCode;
        if (nextProps.moduleData.configData) {
            newCode = nextProps.moduleData.configData.code;
        } else {
            newCode = '';
        }
        this.setState({
            code: newCode,
        });

    }

    getConfigData = () => ({ code: this.state.code });

    toModuleData(configData: any) {
        const { moduleConfig } = this.props;
        const result = Object.assign({}, moduleConfig.moduleData, {
            data: configData,
        });
        return result;
    }

    render() {
        return (
            <div>
                <TextArea
                    placeholder="在此输入代码"
                    value={this.state.code}
                    onChange={(e) => { this.setState({ code: e.target.value }); }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    moduleConfig: state.moduleConfig,
    module: state.module,
});

export default connect(mapStateToProps, {}, undefined, { withRef: true })(UserDefineConfig);
