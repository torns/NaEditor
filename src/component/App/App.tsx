import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React, { RefObject } from 'react';

import Canvas from '../Canvas';
import store from '../../store';
import { IState } from '../interface';

interface AppProps {

}

interface AppState {

}

class App extends React.Component<AppProps, AppState> {

    private iframe: RefObject<HTMLIFrameElement> = React.createRef();

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {

        let sWin = (this.iframe as any).contentWindow;
        let sDom = sWin.document;
        sWin.addEventListener('load', () => {

            // 重新赋值一次
            sWin = (this.iframe as any).contentWindow;
            sDom = sWin.document;
            ReactDOM.render(
                <Canvas />,
                sDom.querySelector('#Container'),
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="J_configDialog" />
                <div className="d-editor-instance-area J_editorInstanceArea">
                    <div className="cd-iframe-outer-warp">
                        <div className="cd-iframe-warp">
                            <iframe
                                className="cd-canvas J_canvas"
                                src="/page/canvas.html"
                                ref={this.iframe}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProp = (state: IState) => {
    return {
        state,
    };
};

export default connect(mapStateToProp)(App);