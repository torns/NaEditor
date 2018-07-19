import React from 'react';
import { render } from 'react-dom';
import localforage from 'localforage';
import { connect } from 'react-redux';

import Messager from '@component/Messager';
import Action from '@common/script/action';
import Module from '@component/Module';
import UserDefine from '@component/UserDefine';
import ImageHotspot from '@component/ImageHotspot';
import { fetchModuleList, focusModule } from '@actions';

const { BASE_DATA } = window.top


class Canvas extends React.Component {
    constructor(props, context) {
        super();
        this.bindGlobalEvent();
    }

    componentWillMount() {
        // 初始化模块
        this.props.fetchModuleList(BASE_DATA.pageId);
    }


    componentDidMount() {
        
    }

    /**
     * 绑定全局事件
     */
    bindGlobalEvent() {

        Messager.on('removeModule', (moduleId, result) => {
            if (result.result === true) {
                const newModuleData = this.state.moduleData.filter(v => v.moduleId !== moduleId);
                this.setState({
                    moduleData: newModuleData,
                })
            }

        })

        Messager.on('addModule', (req, moduleData) => {
            const oldModuleData = this.state.moduleData;
            this.setState({
                moduleData: [...oldModuleData, ...[moduleData]],
            })
        })

        Messager.on('refreshModules', (req, moduleData) => {
            this.setState({
                moduleData,
            })
        })
    }


    render() {

        const moduleList = this.props.moduleList;
        if (!moduleList) {
            return null;
        }

        function getModuleList(moduleList) {

            if (!moduleList) {
                return <div></div>
            }

            return moduleList.map((v, i) => {
                const { moduleId, moduleTypeId } = v;
                switch (moduleTypeId) {
                    case 1:
                        return <UserDefine key={i} moduleData={v} />
                        break;
                    case 2:
                        return <ImageHotspot key={i} moduleData={v} />
                        break;
                    default:
                        return <div key={i} />
                        break;
                }
            })
        }


        return (
            <React.Fragment>
                {getModuleList(moduleList)}
            </React.Fragment>
        )
    }
}



const mapStateToProps = (state) => {
    return { moduleList: state.module.moduleList }
}


export default connect(mapStateToProps, { fetchModuleList, focusModule })(Canvas)
