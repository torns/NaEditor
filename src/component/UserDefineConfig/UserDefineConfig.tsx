import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { escape, unescape } from 'html-escaper';

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

    getConfigData = () => {
        const result = {
            code: this.state.code,
        };
        return result;
    }

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
                    value={unescape(this.state.code || '')}
                    onChange={(e) => {
                        const escaped = escape(e.target.value);
                        this.setState({ code: escaped });
                    }}
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
