import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import Canvas from '@component/Canvas';
import store from '@store';

class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {

        let sWin = this.refs.iframe.contentWindow;
        let sDom = sWin.document;
        sWin.addEventListener('load', () => {
           
            // 重新赋值一次
            sWin = this.refs.iframe.contentWindow;
            sDom = sWin.document;
            ReactDOM.render(
                <Canvas store={store} />,
                sDom.querySelector('#Container')
            )
        })



    }

    render() {
        return (
            <React.Fragment>
                <div className="cd-control">
                    <button className="J_dbInitial">数据库初始化</button>
                    <button className="J_restore">还原</button>
                    <button className="J_refresh">刷新</button>
                    <div>
                        <label>模块Id:</label>
                        <input className="J_removeModuleInput" />
                        <button className="J_removeModule">删除模块</button>
                    </div>
                    <div>
                        <label>模块Type:</label>
                        <input className="J_addModuleInput" />
                        <button className="J_addModule">添加模块</button>
                    </div>
                    <div id="count"></div>
                </div>
                <div className="J_configDialog">
                </div>
                <div className="d-editor-instance-area J_editorInstanceArea">
                    <div className="cd-iframe-outer-warp">
                        <div className="cd-iframe-warp">
                            <iframe
                                className="cd-canvas J_canvas"
                                src="/page/canvas.html"
                                ref='iframe'
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        state,
    }
}

export default connect(mapStateToProp)(App);