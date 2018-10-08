import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';

import { IModuleData, IModuleConfig, IState } from '../interface';
import Module from '../Module';

const mapStateToProps = (state: IState) => {
    return {
        moduleConfig: state.moduleConfig,
    };
};

interface GoodsConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

interface GoodsConfigState {
    moduleData: IModuleData;
}

class GoodsConfig extends Component<GoodsConfigProps, GoodsConfigState> {
    constructor(props: GoodsConfigProps) {
        super(props);
        const { moduleData } = props;
        this.state = {
            moduleData,
        };
    }

    goodsChange = (strArr: string[]) => {

        // this.setState({
        //     moduleData,
        // });
    }

    render() {
        return null;
        // const {
        //     moduleData,
        //     moduleData: {
        //         data: {
        //             goodsList,
        //         },
        //     },
        // } = this.state;
        // return <Module moduleData={moduleData}>
        //     <Input
        //         value={goodsList}
        //         onChange={(e) => { this.goodsChange(e.target.value.split(',')); }}
        //     />
        // </Module>;
    }
}

export default connect(mapStateToProps, {}, undefined, { withRef: true })(GoodsConfig);