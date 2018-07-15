import React from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import store from '@store';
import { showConfig } from '@actions';


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
            configData: {

            }
        }
    }


    render() {
        const { showConfig } = this.props;
        const { moduleData } = this.state;
        const { configData } = moduleData;
        return (
            <div className={`J_module`}
                onClick={() => { showConfig(moduleData) }}
            >
                {this.state.isEmpty ? <div className="d-placeholder">请配置模块数据</div> : this.props.children}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { module: state.module }
}


export default connect(mapStateToProps, { showConfig })(Module)