import React from 'react';
import { render } from 'react-dom';

import Module from '@component/Module';
import UserDefine from '@component/UserDefine';
import ImageHotspot from '@component/ImageHotspot';

function bindEvent() {
    const topWindow = window.top;
    const topDom = topWindow.document;
    topDom.querySelector('.J_removeModule').on('click', () => {

    })
}


const moduleData = [
    {
        moduleTypeId: 1,
        moduleName: '自定义代码模块',
        moduleId: 10000,
        data: {
            code: `<style>div{color:red;}</style>
            <div class="a">dsf</div>`
        }
    }, {
        moduleTypeId: 2,
        moduleName: '图片热区模块',
        moduleId: 10003,
        data: {
            imgSrc: `https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2141015511,3653211916&fm=58&bpow=400&bpoh=400`
        }
    }
]

export default class Canvas extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            moduleData,
        })
    }


    static removeModule(moduleId) {
        const { moduleData } = this.state;
        const newModuleData = moduleData.filter(v => v.moduleId !== moduleId);
        this.setState({
            moduleData: newModuleData,
        })
    }

    render() {

        const moduleData = this.state.moduleData;

        function getModuleList(moduleData) {
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
                <button onClick={() => { Canvas.removeModule() }}>移除模块</button>
                {getModuleList(moduleData)}
            </div>
        )
    }
}

window.Canvas = Canvas;