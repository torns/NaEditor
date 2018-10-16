import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
// import 'intersection-observer';

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

const Placeholder = {
    2: '//naeditor-image.oss-cn-shenzhen.aliyuncs.com/rq.jpg',
    // 4: '//naeditor-image.oss-cn-shenzhen.aliyuncs.com/lbt.jpg',
};

class Module extends React.Component<ModuleProps, ModuleState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    private moduleRef: any = React.createRef();

    constructor(props: ModuleProps) {
        super(props);
        const { moduleData } = props;
        if (moduleData.tempData === undefined) {
            moduleData.tempData = {
                isActive: false,
                top: 0,
                height: 0,
            };
        }
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
        debounce(() => {
            const clientRect = this.moduleRef.getBoundingClientRect();
            const { top } = clientRect;
            const container = document.querySelector('.J_editorInstanceArea');

            // 判断是否在当前屏幕内
            const intersectionObserver = new IntersectionObserver((entries) => {
                const ratio = entries[0].intersectionRatio;
                if (ratio < 1 && container) {
                    animate(top - 50, 200);
                }
                this.moduleRef && intersectionObserver.unobserve(this.moduleRef);

            });
            intersectionObserver.observe(this.moduleRef);
        }, 0)();

        function animate(end: number, time: number) {

            const el = (window as any).document.querySelector('.J_editorInstanceArea');
            let currentTop = el.scrollTop;
            const unit = (end - currentTop) / (time / 16);

            function step() {
                if (currentTop === end) {
                    return;
                }
                currentTop += unit;
                if (Math.abs(currentTop - end) < Math.abs(unit)) {
                    currentTop = end;
                } else {
                    window.requestAnimationFrame(step);
                }
                el.scrollTop = currentTop;
            }
            window.requestAnimationFrame(step);
        }
    }

    render() {
        const {
            moduleData,
            moduleData: {
                tempData: {
                    isActive,
                },
                moduleTypeId,
                configData,
            },
        } = this.state;
        const isDecorate = this.context.BASE_DATA.pageType === 0;
        let moduleStyle = {};
        let isEmpty = false;
        if (isDecorate) {
            isEmpty = JSON.stringify(configData) === '{}';
            moduleStyle = { ...{ minHeight: '50px' } };
            if (isEmpty) {
                moduleStyle = {
                    ...moduleStyle, ...{
                        backgroundImage: 'url(' + Placeholder[2] + ')',
                        height: '180px',
                    },
                };
            }
        }

        return (
            <div
                className={`J_module d-module ${isActive ? 'active' : ''}`}
                data-module-type-id={moduleTypeId}
                ref={ref => this.moduleRef = ref}
                style={moduleStyle}
            >
                {!isEmpty && this.props.children}
                {isDecorate && <ModuleWrap
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