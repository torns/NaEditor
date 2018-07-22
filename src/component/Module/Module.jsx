import React from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import store from '@store';
import $ from 'jquery';

import { moduleTopChange, moduleHeightChange } from '@actions';
import ModuleWrap from '@component/ModuleWrap';

class Module extends React.Component {
    constructor(props) {
        super();
        let isEmpty;    //是否为空模块（无配置数据）
        // if (props.moduleData) {
        //     if (props.moduleData.data && Object.keys(props.moduleData.data).length === 0) {
        //         isEmpty = true;
        //     } else {
        //         isEmpty = false;
        //     }
        // }
        this.state = {
            // isEmpty,
            moduleData: props.moduleData,
            moduleRef: undefined,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { moduleData } = nextProps;
        this.setState({
            moduleData,
        })
    }

    componentDidMount() {
        this.setState({
            moduleRef: this.moduleRef,
        })
        this.reatChange();
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
    // let container = $('.J_editorInstanceArea');
    // let scrollTop = req.scrollTop;
    // const Distance = GlobalConfig.SlideTopDistance;
    // container.animate({
    //     scrollTop: scrollTop < Distance ? 0 : scrollTop - Distance
    // }, 'normal', 'swing', function() {});
    scrollIntoView() {
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

    }

    render() {
        const { showConfig } = this.props;
        const { moduleData } = this.state;

        return (
            <div className={`J_module d-module`}
                ref={ref => this.moduleRef = ref}>
                {this.state.isEmpty ? <div className="d-placeholder">请配置模块数据</div> : this.props.children}
                <ModuleWrap moduleData={moduleData}
                    moduleRef={this.state.moduleRef} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { module: state.module }
}


export default connect(mapStateToProps, { moduleTopChange, moduleHeightChange })(Module)