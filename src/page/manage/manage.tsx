import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Table, Button, Col, Row, Popover, Popconfirm } from 'antd';
require('antd/dist/antd.css');
import Cookies from 'js-cookie';
import format from 'date-format';
import QRCode from 'qrcode.react';

import { serverAddress } from '../../../config';
import '../../common/script/interceptor';
import TopBar from '../../component/TopBar';
import CreatePageModal from './CreatePageModal';
import INTERFACE from '../../common/script/INTERFACE';

interface IPage {
    id: number;
    pageName: string;
    moduleList: number[];
    created: string;
}

class ManagePage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            pageList: [],
            username: Cookies.get('pin'),
            previewPageId: '',
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = async () => {
        const result = (await Axios(INTERFACE.getPageList)).data;
        const pageList = result.data;
        this.setState({
            pageList,
        });
    }

    deletePage = async (pageId: number) => {
        const result = (await Axios(INTERFACE.deletePage, {
            params: {
                pageId,
            },
        })).data;
        if (result.success === true) {
            this.refreshList();
        }
    }

    onAddOk = () => {
        this.refreshList();
        this.setState({
            isModalVisible: false,
        });
    }

    changePreview = (previewPageId: number) => {
        this.setState({
            previewPageId,
        });
    }

    viewUrl = (url: string) => {
        return (
            <div className="d-popover-wrap">
                <QRCode value={url} />
                <div className="d-copy-link">
                    {url}
                </div>
            </div>
        );
    }

    copyPage = async (pageId: number) => {
        const result = (await Axios(INTERFACE.copyPage, {
            params: {
                pageId,
            },
        })).data;
        if (result.success === true) {
            this.refreshList();
        }
    }

    render() {

        const columns = [{
            title: '页面名称',
            key: 'pageName',
            render: (item: IPage) => {
                return <a href={`/page/view?pageId=${item.id}`} target="_blank">{item.pageName}</a>;
            },
        }, {
            title: '创建时间',
            key: 'created',
            render: (item: IPage) => {
                return format.asString('yyyy-MM-dd hh:mm:ss', new Date(item.created));
            },
        }, {
            title: '操作',
            key: 'action',
            render: (item: IPage) => {
                return (
                    <React.Fragment>
                        <a href={`/page/decorate?pageId=${item.id}`} target="_blank">
                            去装修
                        </a>
                        <Popover content={this.viewUrl(`${serverAddress}/page/view?pageId=${item.id}`)} title="浏览地址" trigger="hover">
                            <a style={{ marginLeft: '10px' }}>获取地址</a>
                        </Popover>
                        <a
                            onClick={(e) => { e.stopPropagation(); this.copyPage(item.id); }}
                            style={{ marginLeft: '10px' }}
                        >
                            复制页面
                        </a>
                        <Popconfirm
                            onConfirm={(e) => { e.stopPropagation(); this.deletePage(item.id); }}
                            title="确定删除该页面吗？"
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ marginLeft: '10px' }}>
                                删除
                            </a>
                        </Popconfirm>
                    </React.Fragment >
                );
            },
        }];

        const { pageList, isModalVisible, username, previewPageId } = this.state;

        return (
            <div>
                <TopBar
                    hasPreview={false}
                    hasPublish={false}
                    username={username}
                />
                <div className="d-main">
                    <div className="d-left">
                        <Row className="d-first-row">
                            <Col>
                                <Button
                                    className="d-create-page"
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            isModalVisible: true,
                                        });
                                    }}
                                >
                                    创建页面
                                </Button>
                                <CreatePageModal
                                    onOk={this.onAddOk}
                                    onCancel={() => {
                                        this.setState({
                                            isModalVisible: false,
                                        });
                                    }}
                                    isModalVisible={isModalVisible}
                                />
                            </Col>
                        </Row>
                        <Table
                            className="d-page-table"
                            columns={columns}
                            dataSource={pageList}
                            rowKey="id"
                            bordered={true}
                            onRow={(record: IPage) => {
                                return {
                                    onClick: () => {
                                        this.changePreview(record.id);
                                    },
                                };
                            }}
                        />
                    </div>
                    <div className="d-right">
                        <div className="d-preview-wrap">
                            {previewPageId &&
                                <React.Fragment>
                                    <div className="d-header" />
                                    <iframe src={`/page/preview?pageId=${previewPageId}`} />
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ReactDOM.render(
    <ManagePage />,
    document.querySelector('#app'),
);