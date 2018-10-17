import React from 'react';
import Module from '../Module';
import PropTypes from 'prop-types';
import { escape, unescape } from 'html-escaper';

import { IModuleData, PageType } from '../interface';
import isServer from '../../common/script/isServer';

interface UserDefineProps {
    moduleData: IModuleData;
}

interface UserDefineState {
    code: string;
    isActive: boolean;
}

export default class UserDefine extends React.Component<UserDefineProps, UserDefineState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    root?: HTMLDivElement;

    constructor(props: UserDefineProps) {
        super(props);
        this.state = {
            code: props.moduleData.data.code,
            isActive: props.moduleData.tempData && props.moduleData.tempData.isActive,
        };
    }

    shouldComponentUpdate(nextProps: UserDefineProps, nextState: UserDefineState) {
        if (this.context.BASE_DATA.pageType === 0) {
            const isActive = nextProps.moduleData.tempData && nextProps.moduleData.tempData.isActive;
            if (this.state.code === nextProps.moduleData.data.code &&
                isActive === this.state.isActive
            ) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    componentWillReceiveProps(nextProps: UserDefineProps) {
        this.setState({
            code: nextProps.moduleData.data.code,
        });
    }

    /**
     * 执行用户代码片段
     */
    async excuteCode() {
        const { code } = this.state;
        const el = this.root;
        if (code === undefined) {
            return;
        }
        let renderCode = unescape(code);
        !code && (renderCode = ``);
        if (!isServer()) {
            await import('zepto');
            // 客户端的script需要执行，所以用zepto
            (window as any).Zepto(el as HTMLDivElement).html(renderCode);
        }
    }

    async componentDidMount() {
        this.excuteCode();
    }

    async componentDidUpdate() {
        const { pageType } = this.context.BASE_DATA;
        // 只有装修页才会需要更新
        if (pageType === PageType.Decorate) {
            this.excuteCode();
        }
    }

    /**
     *
     */
    render() {
        return (
            <Module moduleData={this.props.moduleData}>
                <div ref={(root: HTMLDivElement) => { this.root = root; }} />
            </Module>
        );
    }

}