import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader'

import '../../db/createStore';
import store from '../../store';
import ConfigDialog from '../../component/ConfigDialog';
import ModuleList from '../../component/ModuleList';
import ModuleBar from '../../component/ModuleBar';
import ModuleTagList from '../../component/ModuleTagList';
import Canvas from '../../component/Canvas';
import ContextProvider from '../../component/ContextProvider';
import ModuleNav from '../../component/ModuleNav';
import Topbar from '../../component/TopBar';


class Decorate extends React.Component<any, any> {

    static contextTypes = {
        BASE_DATA: PropTypes.object
    }

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        (window as any).resizeIframe = _.debounce(() => {
            const iframeWin = (window as any).document.querySelector('.J_canvas').contentWindow;
            let height = iframeWin.document.body.scrollHeight + 'px';
            (window as any).document.querySelector('iframe.J_canvas').style.height = height;
        }, 50);
    }

    iframeLoaded = () => {

        const { BASE_DATA } = this.context;

        class Iframe extends React.Component {
            render() {
                return (
                    <Provider store={store} >
                        <ContextProvider BASE_DATA={BASE_DATA}>
                            <Canvas />
                        </ContextProvider>
                    </Provider>
                );
            }
        }

        let Node = hot(module)(Iframe);

        ReactDOM.render(
            <Node />,
            (window as any).document.querySelector('.J_canvas').contentWindow.document.querySelector('#Container')
        )
    }

    closePreview = () => {
        (window as any).document.querySelector('.J_previewWrap').classList.remove('active');
        (window as any).document.querySelector('.J_previewContainer').innerHTML = '';
    }

    render() {
        const { username } = this.context.BASE_DATA;
        return (
            <div className="cd-main-area J_mainArea">
                <div className="J_topBar">
                    <Topbar username={username} />
                </div>
                <div className="J_moduleList">
                    <ModuleList />
                </div>
                <div className='J_previewWrap d-preview-wrap'>
                    <div className="d-phone">
                        <div className="J_previewContainer d-preview-container">
                        </div>
                    </div>
                    <div
                        className="d-close-btn J_closeBtn"
                        onClick={this.closePreview}
                    ></div>
                    <div className="d-canvas-filter"></div>
                </div>
                <div className="d-editor-instance-area J_editorInstanceArea">
                    <div className="J_moduleTagList">
                        <ModuleTagList />
                    </div>
                    <div className="J_ModuleBar">
                        <ModuleBar />
                    </div>
                    <div className="J_configDialog">
                        <ConfigDialog />
                    </div>
                    <div className="J_moduleNav">
                        <ModuleNav />
                    </div>
                    <div className="cd-iframe-outer-warp">
                        <div className="cd-iframe-warp">
                            <iframe
                                className="cd-canvas J_canvas"
                                src="/page/canvas.html"
                                onLoad={this.iframeLoaded}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(Decorate);