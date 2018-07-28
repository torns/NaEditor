import * as  React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
const { TextArea } = Input;

interface TextConfigProps {
    moduleData: any;
    moduleConfig: any;
}

class TextConfig extends React.Component<TextConfigProps, any> {

    constructor(props: TextConfigProps) {
        super(props);
        let text;
        if (props.moduleData.configData) {
            text = props.moduleData.configData.text;
        } else {
            text = '';
        }
        this.state = {
            text,
        };
    }

    componentWillReceiveProps(nextProps: TextConfigProps) {
        let newtext;
        if (nextProps.moduleData.configData) {
            newtext = nextProps.moduleData.configData.text;
        } else {
            newtext = '';
        }
        this.setState({
            text: newtext,
        });

    }

    getConfigData = () => ({
        text: this.state.text,
    })

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
                <p className="d-text-content">文本内容</p>
                <Input
                    placeholder="请输入文本内容"
                    value={this.state.text}
                    onChange={(e) => { this.setState({ text: e.target.value }); }}
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

export default connect(mapStateToProps, {}, undefined, { withRef: true })(TextConfig);
