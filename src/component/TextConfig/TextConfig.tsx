import * as  React from 'react';
import { connect } from 'react-redux';
import { Input, Slider } from 'antd';
import { IState } from '../interface';
// import ColorPicker from 'rc-color-picker';
const { TextArea } = Input;

interface TextConfigProps {
    moduleData: any;
    moduleConfig: any;
}

interface TextConfigState {
    text: string;
    fontWeight: number;
    fontSize: number;
    color: string;
}

class TextConfig extends React.Component<TextConfigProps, TextConfigState> {

    constructor(props: TextConfigProps) {
        super(props);
        let { text, fontSize, fontWeight, color } = props.moduleData.configData;
        this.state = {
            text,
            fontSize,
            fontWeight,
            color,
        };
    }

    componentWillReceiveProps(nextProps: TextConfigProps) {
        let { text, fontSize, fontWeight, color } = nextProps.moduleData.configData;
        this.setState({
            text,
            fontSize,
            fontWeight,
            color,
        });
    }

    getConfigData = () => this.state

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
                <p className="d-title">字体大小</p>
                <Slider
                    min={12}
                    max={40}
                    defaultValue={14}
                    value={this.state.fontSize}
                    range={false}
                    onChange={(fontSize: any) => { this.setState({ fontSize }); }}
                />
                <p className="d-title">字体粗细</p>
                <Slider
                    min={100}
                    max={900}
                    defaultValue={400}
                    value={this.state.fontWeight}
                    onChange={(fontWeight: any) => { this.setState({ fontWeight }); }}
                />
                {/* <p className="d-title">字体颜色</p>
                    <ColorPicker />
                <p /> */}
                <p className="d-title">文本内容</p>
                <TextArea
                    placeholder="请输入文本内容"
                    value={this.state.text}
                    autosize
                    onChange={(e) => { this.setState({ text: e.target.value }); }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

export default connect(mapStateToProps, {}, undefined, { withRef: true })(TextConfig);
