import React from 'react';
import { render } from 'react-dom';
import localforage from 'localforage';

import Action from '@common/script/action';
import Module from '@component/Module';
import UserDefine from '@component/UserDefine';
import ImageHotspot from '@component/ImageHotspot';
const TopWindow = window.top;
const Messager = TopWindow.Messager;


// const moduleData = [
//     {
//         moduleTypeId: 1,
//         moduleName: '自定321义代码模块',
//         moduleId: 10000,
//         data: {
//             code: `<style>div{color:red;}</style>
//             <div class="a">dsf</div>`
//         }
//     }, {
//         moduleTypeId: 2,
//         moduleName: '图片热区模块',
//         moduleId: 10003,
//         data: {
//             imgSrc: `https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2141015511,3653211916&fm=58&bpow=400&bpoh=400`
//         }
//     }
// ]


// Action.updateModule(moduleData[0]).then(data => {
//     console.log(data);
// });



export default class Canvas extends React.Component {
    constructor() {
        super();
        this.bindGlobalEvent();
    }

    componentWillMount() {
        Messager.trigger('refreshModules');

    }

    /**
     * 绑定全局事件
     */
    bindGlobalEvent() {

        Messager.on('removeModule', (moduleId, moduleData) => {
            this.setState({
                moduleData,
            })
        })

        Messager.on('addModule', (req, moduleData) => {
            this.setState({
                moduleData,
            })
        })

        Messager.on('refreshModules', (req, moduleData) => {
            this.setState({
                moduleData,
            })
        })


    }

    render() {

        if (!this.state) {
            return null;
        }
        const moduleData = this.state.moduleData;

        function getModuleList(moduleData) {
            if(!moduleData){
                return <div></div>
            }
            return moduleData.map((v, i) => {
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
            <div>
                {getModuleList(moduleData)}
            </div>
        )
    }
}

window.Canvas = Canvas;