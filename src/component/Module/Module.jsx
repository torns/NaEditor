import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import { moduleTopChange, moduleHeightChange } from '@actions';
import ModuleWrap from '@component/ModuleWrap';

class Module extends React.Component {
    constructor(props) {
        super();
        this.moduleRef = React.createRef();
        this.state = {
            moduleData: props.moduleData,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { moduleData } = nextProps;
        this.setState({
            moduleData,
        })
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
                if (ratio < 1) {
                    // jq动画，待优化
                    $(container).animate(
                        {
                            scrollTop: top - 50,
                        }, {
                            easing: 'swing'
                        }
                    )
                }
                intersectionObserver.unobserve(this.moduleRef);

            });
            intersectionObserver.observe(this.moduleRef);
        }, 0)();
    }

    render() {
        const { moduleData } = this.state;

        return (
            <div className={`J_module d-module`}
                ref={ref => this.moduleRef = ref}>
                {this.state.isEmpty ? <div className="d-placeholder">请配置模块数据</div> : this.props.children}
                <ModuleWrap moduleData={moduleData}
                    moduleRef={this.moduleRef}
                    dragable='false' />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { module: state.module }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapStateToProps, {
    moduleTopChange,
    moduleHeightChange
}, mergeProps)(Module);