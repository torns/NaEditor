import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import { moduleTopChange, moduleHeightChange } from '../../actions';
import ModuleWrap from '../ModuleWrap';
import { IModuleData, IState } from '../interface';

interface ModuleProps {
    moduleData: IModuleData;
    moduleTopChange: any;
    moduleHeightChange: any;
}

interface ModuleState {
    moduleData: IModuleData;
    isEmpty?: boolean;
}

const pageType = (window as any).BASE_DATA.type;

class Module extends React.Component<ModuleProps, ModuleState> {

    private moduleRef: any = React.createRef();

    constructor(props: ModuleProps) {
        super(props);
        this.state = {
            moduleData: props.moduleData,
        };
    }

    componentWillReceiveProps(nextProps: ModuleProps) {
        const { moduleData } = nextProps;
        this.setState({
            moduleData,
        });
        // 模块聚焦后需要滚动到视窗内
        if (moduleData.tempData.isActive === true) {
            this.scrollIntoView();
        }
    }

    componentDidMount() {
        this.reatChange();
        setTimeout(() => {
            this.reatChange();
        }, 1000);
    }

    componentDidUpdate() {
        this.reatChange();
    }

    reatChange() {
        const { moduleTopChange, moduleHeightChange } = this.props;
        const { moduleData } = this.state;
        const clientRect = this.moduleRef.getBoundingClientRect();
        const { height, top } = clientRect;
        if (!moduleData.tempData || top !== moduleData.tempData.top) {
            moduleTopChange(moduleData.moduleId, top);
            if (moduleData.tempData.isActive === true) {
                this.scrollIntoView();
            }
        }
        if (!moduleData.tempData || height !== moduleData.tempData.height) {
            moduleHeightChange(moduleData.moduleId, height);
        }
    }

    scrollIntoView() {
        _.debounce(() => {
            const clientRect = this.moduleRef.getBoundingClientRect();
            const { top } = clientRect;
            const container = document.querySelector('.J_editorInstanceArea');

            // 判断是否在当前屏幕内
            const intersectionObserver = new IntersectionObserver((entries) => {
                const ratio = entries[0].intersectionRatio;
                if (ratio < 1 && container) {
                    // jq动画，待优化
                    $(container).animate(
                        {
                            scrollTop: top - 50,
                        }, {
                            easing: 'swing',
                        },
                    );
                }
                intersectionObserver.unobserve(this.moduleRef);

            });
            intersectionObserver.observe(this.moduleRef);
        }, 0)();
    }

    render() {
        const { moduleData } = this.state;
        const { moduleTypeId } = moduleData;

        return (
            <div
                className={`J_module d-module`}
                data-module-type-id={moduleTypeId}
                ref={ref => this.moduleRef = ref}
            >
                {this.state.isEmpty ? <div className="d-placeholder">请配置模块数据</div> : this.props.children}
                {/* pageType为2为装修 */}
                {pageType === '0' && <ModuleWrap
                    moduleData={moduleData}
                    moduleRef={this.moduleRef}
                />}
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return { module: state.module };   // TODO dispatch临时丢在这里
};

const dispatchProps = {
    moduleTopChange,
    moduleHeightChange,
};

const mergeProps: any = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return Object.assign({}, stateProps, dispatchProps, ownProps);
};

export default connect(mapStateToProps, dispatchProps, mergeProps, { withRef: true })(Module);