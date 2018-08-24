import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Table, Button, Col, Row, Popconfirm } from 'antd';
require('antd/dist/antd.css');

import TopBar from '../../component/TopBar';
import CreatePageModal from './CreatePageModal';
import INTERFACE from '../../common/script/INTERFACE';

interface IPage {
    id: number;
    pageName: string;
    moduleList: number[];
}

class ManagePage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            pageList: [],
        }
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
            }
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

    renderModal = () => {

        return (
            <div>321</div>
        )
    }

    render() {

        const columns = [{
            title: '页面名称',
            key: 'pageName',
            render: (item: IPage) => {
                return <a href={`/page/view?pageId=${item.id}`} target="_blank">{item.pageName}</a>
            }
        }, {
            title: '操作',
            key: 'action',
            render: (item: IPage) => {
                return (
                    <React.Fragment>
                        <a href={`/page/decorate?pageId=${item.id}`} target="_blank">
                            去装修
                        </a>
                        <Popconfirm
                            onConfirm={() => this.deletePage(item.id)}
                            title="确定删除该页面吗？"
                            okText="确定"
                            cancelText="取消">
                            <a style={{ marginLeft: '10px' }}>
                                删除
                            </a>
                        </Popconfirm>
                    </React.Fragment>
                );
            }
        }];

        const { pageList, isModalVisible } = this.state;

        return (
            <div>
                <TopBar
                    hasPreview={false}
                    hasPublish={false}
                />
                <div className="d-main">
                    <Row>
                        <Col>
                            <Button onClick={() => {
                                this.setState({
                                    isModalVisible: true,
                                });
                            }}>创建页面</Button>
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
                        columns={columns}
                        dataSource={pageList}
                        rowKey="id" />
                </div>
            </div>

        )
    }
}

ReactDOM.render(
    <ManagePage />,
    document.querySelector('#app'),
)