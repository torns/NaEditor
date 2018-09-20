import React from 'react';
import { Icon, message } from 'antd';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode.react';
import Action from '../../common/script/action';
import { serverAddress } from '../../../config';

interface TopbarProps {
    hasPreview?: boolean;
    hasPublish?: boolean;
    username?: string;
}

interface TopbarState {
    isMounted: boolean;
    isPreviewActive: boolean;
}


class Topbar extends React.Component<TopbarProps, TopbarState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object
    }

    static defaultProps: TopbarProps = {
        hasPreview: true,
        hasPublish: true,
    }

    constructor(props: TopbarProps) {
        super(props);
        this.state = {
            isMounted: false,
            isPreviewActive: false,
        }
    }

    componentDidMount() {
        this.setState({
            isMounted: true,
        });
    }

    closePreview = () => {
        this.setState({
            isPreviewActive: false,
        });
    }

    renderPreview = () => {
        const { pageId, pageInfo: { pageName } } = this.context.BASE_DATA;
        return (
            <div className={`d-preview-wrap ${this.state.isPreviewActive ? 'active' : ''}`}>
                <div className="d-phone">
                    <div className="J_previewContainer d-preview-container">
                    </div>
                </div>
                <div className="d-desc">
                    <div className="d-qrcode">
                        <QRCode value={`${serverAddress}/page/preview?pageId=${pageId}`} />
                    </div>
                    <p>预览页有效期30分钟，发布后永久生效</p>
                    <h2>{pageName}</h2>
                </div>
                <div
                    className="d-close-btn J_closeBtn"
                    onClick={this.closePreview}
                >
                    <Icon type="close" />
                </div>
                <div className="d-canvas-filter"></div>
            </div>
        );
    }

    preview = () => {
        const { pageId } = this.context.BASE_DATA;
        this.setState({
            isPreviewActive: true,
        });
        (document.querySelector('.J_previewContainer') as any).innerHTML = `
		<iframe class="cd-canvas J_canvas" src="/page/preview?pageId=${pageId}">                
		</iframe>`;
    }

    logout = async () => {
        const result = await Action.logout();
        location.href = '/page/login';
    }

    publish = async () => {
        const { pageId } = this.context.BASE_DATA;
        const result = await Action.publishPage(pageId);
        if (result.success) {
            message.success('发布页面成功');
        }
    }

    render() {
        const { hasPreview, hasPublish, username } = this.props;
        const { isMounted } = this.state;
        return (
            <div className="d-top-bar">
                <a className="d-left" href="/">
                    <div className="d-logo">
                        <img src="//naeditor-image.oss-cn-shenzhen.aliyuncs.com/timg.jpg?x-oss-process=image/resize,w_30" />
                    </div>
                    <h2>NaEditor</h2>
                </a>
                <div className="d-right">
                    {hasPreview &&
                        <React.Fragment>
                            <div className="d-line"></div>
                            <div
                                className="J_preview d-preview"
                                onClick={this.preview}
                            >预览</div>
                        </React.Fragment>
                    }
                    {hasPublish &&
                        <React.Fragment>
                            <div className="d-line"></div>
                            <div className="J_publish d-publish" onClick={this.publish}>发布</div>
                        </React.Fragment>
                    }
                    <div className="d-line"></div>
                    <div className="d-username">
                        <span>您好，{username}</span>
                        <Icon type="logout" onClick={this.logout} />
                    </div>
                </div>
                {hasPreview && isMounted && ReactDOM.createPortal(
                    this.renderPreview(),
                    (window as any).document.querySelector('.J_previewWrap'),
                )}
            </div>
        )
    }
}

export default Topbar;
