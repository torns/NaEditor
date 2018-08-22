import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Table, Button } from 'antd';

import TopBar from '../../component/TopBar';
import INTERFACE from '../../common/script/INTERFACE';

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

    render() {

        const columns = [{
            title: '页面名称',
            dataIndex: 'pageName',
            key: 'pageName',
        }, {
            title: 'Action',
            key: 'action',
            render: () => {
                console.log(arguments)
                return (
                    <Button onClick={() => { }}>
                        去装修
                    </Button>
                )
            }
        }];

        const { pageList } = this.state;

        return (
            <div>
                <TopBar />
                <div className="d-main">
                    <Table columns={columns} dataSource={pageList} />
                </div>
            </div>

        )
    }
}

ReactDOM.render(
    <ManagePage />,
    document.querySelector('#app'),
)